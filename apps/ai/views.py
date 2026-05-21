"""Resume analysis and job matching endpoints."""

import json
import logging
from typing import Any

import requests
from django.conf import settings
from rest_framework import serializers, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)


class ResumeAnalyzeSerializer(serializers.Serializer):
    resume = serializers.FileField(required=False)
    resume_text = serializers.CharField(required=False, allow_blank=True)
    target_role = serializers.CharField(required=False, allow_blank=True, max_length=160)
    location = serializers.CharField(required=False, allow_blank=True, max_length=160)
    work_mode = serializers.ChoiceField(
        required=False,
        choices=("remote", "hybrid", "onsite", "any"),
        default="remote",
    )
    auto_apply = serializers.BooleanField(required=False, default=False)

    def validate(self, attrs):
        if not attrs.get("resume") and not attrs.get("resume_text"):
            raise serializers.ValidationError("Upload a resume or paste resume text.")
        return attrs


class ResumeAnalyzeView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        serializer = ResumeAnalyzeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resume_text = serializer.validated_data.get("resume_text", "").strip()
        uploaded_resume = serializer.validated_data.get("resume")
        if uploaded_resume:
            resume_text = _read_resume_text(uploaded_resume) or resume_text

        context = {
            "target_role": serializer.validated_data.get("target_role", ""),
            "location": serializer.validated_data.get("location", ""),
            "work_mode": serializer.validated_data.get("work_mode", "remote"),
            "auto_apply": serializer.validated_data.get("auto_apply", False),
        }

        analysis = _analyze_with_openrouter(resume_text, context)
        if analysis is None:
            analysis = _fallback_analysis(resume_text, context)

        return Response(analysis, status=status.HTTP_200_OK)


def _read_resume_text(uploaded_resume) -> str:
    raw = uploaded_resume.read()
    for encoding in ("utf-8", "utf-16", "latin-1"):
        try:
            return raw.decode(encoding, errors="ignore").strip()
        except UnicodeDecodeError:
            continue
    return ""


def _analyze_with_openrouter(resume_text: str, context: dict[str, Any]) -> dict[str, Any] | None:
    api_key = getattr(settings, "OPENROUTER_API_KEY", "")
    if not api_key:
        return None

    prompt = f"""
Analyze this resume for a job-search assistant. Return strict JSON only with:
summary string, strengths string[], gaps string[], keywords string[], jobs array,
application_plan array, and cover_letter string.

Each job must include title, company, location, match_score number, salary, reason, skills string[],
and application_status. For application_status use "drafted" when auto_apply is true, otherwise "ready_for_review".
Do not claim a real external application was submitted.

Preferences:
Target role: {context.get("target_role") or "best-fit roles"}
Location: {context.get("location") or "open"}
Work mode: {context.get("work_mode") or "remote"}
Auto apply requested: {context.get("auto_apply")}

Resume:
{resume_text[:12000]}
""".strip()

    try:
        response = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:5173",
                "X-Title": "Nexulon AI",
            },
            json={
                "model": getattr(settings, "OPENROUTER_MODEL", "openai/gpt-4o-mini"),
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a career agent. Return valid JSON and never fabricate completed external submissions.",
                    },
                    {"role": "user", "content": prompt},
                ],
                "response_format": {"type": "json_object"},
            },
            timeout=45,
        )
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]
        return json.loads(content)
    except (requests.RequestException, KeyError, IndexError, json.JSONDecodeError) as exc:
        logger.warning("OpenRouter resume analysis failed: %s", exc)
        return None


def _fallback_analysis(resume_text: str, context: dict[str, Any]) -> dict[str, Any]:
    lowered = resume_text.lower()
    common_skills = [
        "python",
        "django",
        "react",
        "typescript",
        "sql",
        "aws",
        "machine learning",
        "data analysis",
        "api",
        "leadership",
    ]
    keywords = [skill.title() for skill in common_skills if skill in lowered][:8]
    if not keywords:
        keywords = ["Communication", "Problem Solving", "Project Delivery"]

    target_role = context.get("target_role") or "Software Engineer"
    location = context.get("location") or "Remote"
    status_label = "drafted" if context.get("auto_apply") else "ready_for_review"

    jobs = [
        {
            "title": target_role,
            "company": "Nexulon Talent Network",
            "location": location,
            "match_score": 86,
            "salary": "Competitive",
            "reason": "Strong overlap with the resume keywords and preferred work mode.",
            "skills": keywords[:5],
            "application_status": status_label,
        },
        {
            "title": f"Associate {target_role}",
            "company": "CareerBridge AI",
            "location": "Remote",
            "match_score": 78,
            "salary": "Market aligned",
            "reason": "Good fit with room to tailor the resume toward the role requirements.",
            "skills": keywords[:4],
            "application_status": status_label,
        },
        {
            "title": f"{target_role} - Growth Team",
            "company": "LaunchWorks",
            "location": context.get("work_mode", "Hybrid").title(),
            "match_score": 72,
            "salary": "Not listed",
            "reason": "Relevant background, but the application should highlight measurable outcomes.",
            "skills": keywords[:3],
            "application_status": status_label,
        },
    ]

    return {
        "summary": "Resume parsed locally. Add OPENROUTER_API_KEY for deeper AI analysis and richer job recommendations.",
        "strengths": [
            "Clear reusable skills were found in the resume.",
            "Profile can be matched against multiple role levels.",
            "Application drafts can be generated once the user confirms consent.",
        ],
        "gaps": [
            "Add quantified achievements where possible.",
            "Include exact tools, frameworks, and impact metrics for stronger matching.",
        ],
        "keywords": keywords,
        "jobs": jobs,
        "application_plan": [
            "Tailor resume headline to the selected job title.",
            "Generate a short cover letter from the strongest matching skills.",
            "Queue applications for review before any external submission.",
        ],
        "cover_letter": (
            f"I am interested in the {target_role} role. My background aligns with "
            f"{', '.join(keywords[:4])}, and I can contribute quickly to the team."
        ),
    }
