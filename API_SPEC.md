# API Specification - Nexulon AI

RESTful API with JWT authentication and comprehensive endpoints for career platform.

---

## 📋 Base URL

```
Development:  http://localhost:8000/api
Staging:      https://staging-api.nexulon.ai/api
Production:   https://api.nexulon.ai/api
```

## 🔐 Authentication

### Headers Required
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### JWT Token Format
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "roles": ["user"],
  "iat": 1234567890,
  "exp": 1234571490
}
```

---

## 🔌 Endpoints

### Auth Endpoints

#### Register
```
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe"
}

Response: 201 Created
{
  "id": "uuid",
  "email": "user@example.com",
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "expires_in": 900
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "first_name": "John"
  },
  "expires_in": 900
}
```

#### Refresh Token
```
POST /auth/refresh
Authorization: Bearer <refresh_token>

Response: 200 OK
{
  "access_token": "eyJ...",
  "expires_in": 900
}
```

#### Logout
```
POST /auth/logout
Authorization: Bearer <access_token>

Response: 204 No Content
```

---

### User Endpoints

#### Get Current User
```
GET /users/me
Authorization: Bearer <access_token>

Response: 200 OK
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "johndoe",
  "first_name": "John",
  "last_name": "Doe",
  "avatar_url": "https://...",
  "is_verified": true,
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### Update User Profile
```
PATCH /users/me
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "first_name": "Jonathan",
  "avatar_url": "https://...",
  "bio": "Software Engineer with 5 years experience"
}

Response: 200 OK
{ ...updated user object }
```

#### Change Password
```
POST /users/me/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "current_password": "OldPass123!",
  "new_password": "NewPass456!"
}

Response: 200 OK
{ "message": "Password changed successfully" }
```

---

### Career Profile Endpoints

#### Get Career Profile
```
GET /users/me/career
Authorization: Bearer <access_token>

Response: 200 OK
{
  "id": "uuid",
  "current_title": "Senior Backend Engineer",
  "current_company": "Tech Corp",
  "experience_level": "senior",
  "years_experience": 5,
  "skills": ["Python", "Django", "PostgreSQL"],
  "certifications": ["AWS Solutions Architect"],
  "preferred_locations": ["San Francisco", "Remote"],
  "looking_for_job": true,
  "profile_completion_percentage": 85
}
```

#### Update Career Profile
```
PATCH /users/me/career
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "current_title": "Principal Engineer",
  "experience_level": "lead",
  "skills": ["Python", "Go", "Kubernetes"],
  "salary_expectation_min": 180000,
  "salary_expectation_max": 250000,
  "looking_for_job": true
}

Response: 200 OK
{ ...updated career profile }
```

---

### Resume Endpoints

#### Upload Resume
```
POST /resumes
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

file: <binary pdf/docx>
title: "Main Resume - Backend"
is_primary: true

Response: 201 Created
{
  "id": "uuid",
  "title": "Main Resume - Backend",
  "file_url": "https://s3.../resume_123.pdf",
  "ats_score": 82,
  "uploaded_at": "2024-01-15T10:30:00Z"
}
```

#### Get Resumes
```
GET /resumes
Authorization: Bearer <access_token>

Response: 200 OK
[
  {
    "id": "uuid",
    "title": "Main Resume",
    "ats_score": 82,
    "is_primary": true,
    "uploaded_at": "2024-01-15T10:30:00Z"
  },
  ...
]
```

#### Optimize Resume
```
POST /resumes/{id}/optimize
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "job_title": "Senior Backend Engineer",
  "job_description": "..."
}

Response: 200 OK
{
  "suggestions": [
    {
      "type": "add_skill",
      "text": "Add 'Kubernetes' to skills section"
    },
    {
      "type": "rewrite",
      "text": "Enhance bullet point #3 with metrics..."
    }
  ],
  "optimized_ats_score": 88,
  "estimated_match_score": 92
}
```

---

### Job Endpoints

#### Search Jobs
```
GET /jobs?
  search=backend&
  location=San%20Francisco&
  experience_level=senior&
  remote_type=hybrid&
  min_salary=150000&
  page=1&
  limit=20

Authorization: Bearer <access_token>

Response: 200 OK
{
  "count": 145,
  "next": "https://.../jobs?page=2",
  "previous": null,
  "results": [
    {
      "id": "uuid",
      "title": "Senior Backend Engineer",
      "company_name": "Tech Corp",
      "location": "San Francisco, CA",
      "salary_min": 180000,
      "salary_max": 250000,
      "description": "...",
      "required_skills": ["Python", "Go"],
      "experience_level": "senior",
      "remote_type": "hybrid",
      "posted_date": "2024-01-10T08:00:00Z"
    },
    ...
  ]
}
```

#### Get Job Details
```
GET /jobs/{id}
Authorization: Bearer <access_token>

Response: 200 OK
{
  "id": "uuid",
  "title": "Senior Backend Engineer",
  "company_name": "Tech Corp",
  "description": "...",
  "salary_min": 180000,
  "salary_max": 250000,
  "required_skills": ["Python", "Go"],
  "nice_to_have_skills": ["Kubernetes"],
  "experience_level": "senior",
  "location": "San Francisco, CA",
  "remote_type": "hybrid",
  "employment_type": "Full-time",
  "posted_date": "2024-01-10T08:00:00Z",
  "deadline_date": "2024-02-10T08:00:00Z"
}
```

#### Get Recommendations
```
GET /jobs/recommendations?limit=10
Authorization: Bearer <access_token>

Response: 200 OK
[
  {
    "id": "uuid",
    "title": "Senior Backend Engineer",
    "match_score": 92,
    "match_reasons": [
      "Skills match: 100%",
      "Experience level match: 95%",
      "Location preference: Remote available"
    ],
    ...
  },
  ...
]
```

#### Save Job
```
POST /jobs/{id}/save
Authorization: Bearer <access_token>

Response: 201 Created
{ "message": "Job saved successfully" }
```

#### Remove Saved Job
```
DELETE /saved-jobs/{id}
Authorization: Bearer <access_token>

Response: 204 No Content
```

---

### Application Endpoints

#### Apply to Job
```
POST /applications
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "job_id": "uuid",
  "resume_id": "uuid",
  "cover_letter": "I'm very interested..."
}

Response: 201 Created
{
  "id": "uuid",
  "job_id": "uuid",
  "status": "applied",
  "match_score": 85,
  "applied_at": "2024-01-15T10:30:00Z"
}
```

#### Get Applications
```
GET /applications?status=applied&sort=-applied_at&page=1&limit=20
Authorization: Bearer <access_token>

Response: 200 OK
{
  "count": 23,
  "results": [
    {
      "id": "uuid",
      "job": {
        "id": "uuid",
        "title": "Senior Backend Engineer",
        "company_name": "Tech Corp"
      },
      "status": "applied",
      "match_score": 85,
      "applied_at": "2024-01-15T10:30:00Z",
      "last_updated": "2024-01-15T10:30:00Z"
    },
    ...
  ]
}
```

#### Get Application Details
```
GET /applications/{id}
Authorization: Bearer <access_token>

Response: 200 OK
{
  "id": "uuid",
  "job": { ...full job object },
  "status": "applied",
  "match_score": 85,
  "cover_letter": "...",
  "resume_used": { ...resume object },
  "applied_at": "2024-01-15T10:30:00Z",
  "last_updated": "2024-01-15T10:30:00Z",
  "notes": "Follow up on Friday"
}
```

#### Update Application Status
```
PATCH /applications/{id}
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "status": "interview",
  "notes": "Interview scheduled for Jan 20 at 10 AM"
}

Response: 200 OK
{ ...updated application object }
```

---

### Interview Endpoints

#### Start Mock Interview
```
POST /interviews
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "interview_type": "mock",
  "topic": "Senior Backend Engineer",
  "difficulty_level": "advanced",
  "application_id": "uuid" (optional)
}

Response: 201 Created
{
  "id": "uuid",
  "status": "started",
  "questions": [
    "Tell me about your experience with distributed systems",
    "How would you design a scalable caching layer?",
    ...
  ]
}
```

#### Submit Interview Response
```
POST /interviews/{id}/submit
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

question_index: 0
audio_file: <binary audio>

Response: 200 OK
{ "message": "Response recorded and processing..." }
```

#### Get Interview Results
```
GET /interviews/{id}
Authorization: Bearer <access_token>

Response: 200 OK
{
  "id": "uuid",
  "topic": "Senior Backend Engineer",
  "score": 78,
  "questions": [
    {
      "question": "...",
      "user_answer": "...",
      "feedback": "Good answer, consider adding...",
      "score": 75
    },
    ...
  ],
  "overall_feedback": "...",
  "strengths": ["Communication", "Problem-solving"],
  "areas_to_improve": ["System design depth"],
  "completed_at": "2024-01-15T11:30:00Z"
}
```

---

### Notification Endpoints

#### Get Notifications
```
GET /notifications?is_read=false&limit=20
Authorization: Bearer <access_token>

Response: 200 OK
[
  {
    "id": "uuid",
    "type": "application_status",
    "title": "Application Status Updated",
    "message": "Your application to Tech Corp has been moved to interview stage",
    "is_read": false,
    "created_at": "2024-01-15T10:30:00Z"
  },
  ...
]
```

#### Mark Notification as Read
```
PATCH /notifications/{id}
Authorization: Bearer <access_token>
Content-Type: application/json

{ "is_read": true }

Response: 200 OK
{ ...updated notification }
```

---

## ❌ Error Responses

### Validation Error (400)
```json
{
  "code": "VALIDATION_ERROR",
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters"
  }
}
```

### Unauthorized (401)
```json
{
  "code": "UNAUTHORIZED",
  "message": "Invalid or expired token"
}
```

### Forbidden (403)
```json
{
  "code": "FORBIDDEN",
  "message": "You don't have permission to access this resource"
}
```

### Not Found (404)
```json
{
  "code": "NOT_FOUND",
  "message": "Resource not found"
}
```

### Rate Limited (429)
```json
{
  "code": "RATE_LIMITED",
  "message": "Too many requests",
  "retry_after": 60
}
```

### Server Error (500)
```json
{
  "code": "INTERNAL_ERROR",
  "message": "An unexpected error occurred",
  "request_id": "req_xyz123"
}
```

---

## 📊 Pagination

Default pagination with cursor-based support:

```
GET /endpoint?limit=20&page=1
GET /endpoint?limit=20&cursor=abc123xyz

Response:
{
  "count": 145,
  "next": "https://.../endpoint?page=2",
  "previous": "https://.../endpoint?page=1",
  "results": [...]
}
```

---

## 🔄 Webhooks

### Subscribe to Events
```
POST /webhooks/subscribe
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "event": "application.status_changed",
  "url": "https://myapp.com/webhooks/application"
}

Response: 201 Created
{
  "id": "webhook_123",
  "event": "application.status_changed",
  "url": "https://myapp.com/webhooks/application"
}
```

### Webhook Payload
```json
{
  "id": "webhook_123",
  "event": "application.status_changed",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "application_id": "uuid",
    "old_status": "applied",
    "new_status": "interview"
  }
}
```

---

## 🔐 Rate Limits

- **Authenticated Users**: 100 requests/minute
- **Public Endpoints**: 20 requests/minute
- **Burst Limit**: 50 requests/second
- **Daily Limit**: 10,000 requests/day

---

**Last Updated**: 2024
**API Version**: v1
**Maintained By**: Backend Team
