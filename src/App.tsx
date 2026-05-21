import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Briefcase,
  Sparkles,
  Upload,
  LogOut,
  MapPin,
  Wand2,
} from "lucide-react";

type WorkMode = "remote" | "hybrid" | "onsite" | "any";

type JobMatch = {
  title: string;
  company: string;
  location: string;
  match_score: number;
  salary: string;
  reason: string;
  skills: string[];
  application_status: string;
};

type ResumeAnalysis = {
  summary: string;
  strengths: string[];
  gaps: string[];
  keywords: string[];
  jobs: JobMatch[];
  application_plan: string[];
  cover_letter: string;
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");

  const [targetRole, setTargetRole] = useState("");
  const [location, setLocation] = useState("");

  const [workMode, setWorkMode] = useState<WorkMode>("remote");

  const [autoApply, setAutoApply] = useState(false);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [error, setError] = useState("");

  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const firstName = useMemo(() => {
    const name = email.split("@")[0]?.replace(/[._-]/g, " ");

    return name ? name.split(" ")[0] : "candidate";
  }, [email]);

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setError("Enter email and password.");
      return;
    }

    setError("");
    setIsLoggedIn(true);
  }

  async function handleAnalyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!resumeFile && !resumeText.trim()) {
      setError("Upload resume or paste text.");
      return;
    }

    const body = new FormData();

    if (resumeFile) body.append("resume", resumeFile);

    if (resumeText.trim())
      body.append("resume_text", resumeText.trim());

    body.append("target_role", targetRole);

    body.append("location", location);

    body.append("work_mode", workMode);

    body.append("auto_apply", String(autoApply));

    setIsAnalyzing(true);

    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/resume/analyze/`,
        {
          method: "POST",
          body,
        }
      );

      if (!response.ok) {
        const payload = await response.json().catch(() => null);

        throw new Error(
          payload?.detail ?? "Resume analysis failed."
        );
      }

      setAnalysis(await response.json());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Resume analysis failed."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  if (!isLoggedIn) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
        <div className="background-grid"></div>

        <div className="absolute left-[-120px] top-[-120px] h-[320px] w-[320px] rounded-full bg-purple-600/30 blur-3xl"></div>

        <div className="absolute bottom-[-120px] right-[-120px] h-[320px] w-[320px] rounded-full bg-cyan-500/20 blur-3xl"></div>

        <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl items-center gap-16 px-6 py-10 lg:grid-cols-2">
          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="gradient-text text-sm font-bold uppercase tracking-[0.4em]">
              Nexulon AI
            </p>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Your{" "}
              <span className="gradient-text">
                Autonomous AI Career
              </span>{" "}
              Operating System.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-400">
              Upload resumes, match jobs intelligently,
              generate applications automatically, and let AI
              manage your career pipeline.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="primary-button">
                Launch Workspace
              </button>

              <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
                Watch Demo
              </button>
            </div>

            <div className="mt-14 grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: Brain,
                  title: "AI Match",
                  value: "98%",
                },
                {
                  icon: Briefcase,
                  title: "Applications",
                  value: "12K+",
                },
                {
                  icon: Sparkles,
                  title: "Automation",
                  value: "24/7",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass-card float-animation p-5"
                >
                  <item.icon className="mb-4 text-cyan-400" />

                  <p className="text-3xl font-black">
                    {item.value}
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}

          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            onSubmit={handleLogin}
            className="glass-card rounded-[32px] p-8"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-black">
                Welcome Back
              </h2>

              <p className="mt-2 text-slate-400">
                Login to your AI workspace.
              </p>
            </div>

            <div>
              <label className="text-sm text-slate-300">
                Email
              </label>

              <input
                type="email"
                className="input-modern mt-2"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
              />
            </div>

            <div className="mt-5">
              <label className="text-sm text-slate-300">
                Password
              </label>

              <input
                type="password"
                className="input-modern mt-2"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="primary-button mt-6 w-full"
            >
              Enter AI Workspace
            </button>
          </motion.form>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="background-grid"></div>

      {/* HEADER */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="gradient-text text-xs font-bold uppercase tracking-[0.4em]">
              Nexulon AI
            </p>

            <h1 className="mt-1 text-2xl font-black">
              AI Career Workspace
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold capitalize">
                {firstName}
              </p>

              <p className="text-sm text-slate-400">
                AI Candidate
              </p>
            </div>

            <button
              onClick={() => setIsLoggedIn(false)}
              className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}

      <section className="relative z-10 mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[420px_1fr]">
        {/* LEFT PANEL */}

        <form
          onSubmit={handleAnalyze}
          className="glass-card h-fit rounded-[30px] p-6"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/10 p-3">
              <Upload className="text-cyan-400" />
            </div>

            <div>
              <h2 className="text-xl font-black">
                Resume Intelligence
              </h2>

              <p className="text-sm text-slate-400">
                AI powered resume analysis engine.
              </p>
            </div>
          </div>

          {/* FILE */}

          <label className="mt-6 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-white/5 text-center transition hover:border-cyan-400 hover:bg-cyan-500/5">
            <Upload
              size={42}
              className="mb-4 text-cyan-400"
            />

            <p className="font-semibold">
              {resumeFile
                ? resumeFile.name
                : "Upload Resume"}
            </p>

            <p className="mt-2 text-sm text-slate-400">
              PDF / DOCX / TXT
            </p>

            <input
              type="file"
              className="hidden"
              accept=".txt,.pdf,.doc,.docx"
              onChange={(event) =>
                setResumeFile(
                  event.target.files?.[0] ?? null
                )
              }
            />
          </label>

          {/* TEXTAREA */}

          <textarea
            className="input-modern mt-6 min-h-[140px]"
            placeholder="Paste resume text..."
            value={resumeText}
            onChange={(event) =>
              setResumeText(event.target.value)
            }
          />

          {/* TARGET ROLE */}

          <input
            className="input-modern mt-5"
            value={targetRole}
            onChange={(event) =>
              setTargetRole(event.target.value)
            }
            placeholder="Target Role"
          />

          {/* LOCATION */}

          <div className="relative mt-5">
            <MapPin className="absolute left-4 top-4 text-slate-500" />

            <input
              className="input-modern pl-12"
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              placeholder="Location"
            />
          </div>

          {/* WORK MODE */}

          <select
            className="input-modern mt-5"
            value={workMode}
            onChange={(event) =>
              setWorkMode(event.target.value as WorkMode)
            }
          >
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
            <option value="any">Any</option>
          </select>

          {/* AUTO APPLY */}

          <label className="mt-5 flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={autoApply}
              onChange={(event) =>
                setAutoApply(event.target.checked)
              }
            />

            <span>
              AI prepares applications automatically for
              approval.
            </span>
          </label>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            disabled={isAnalyzing}
            type="submit"
            className="primary-button mt-6 w-full"
          >
            {isAnalyzing
              ? "Analyzing Resume..."
              : "Analyze Resume"}
          </button>
        </form>

        {/* RIGHT SIDE */}

        <div className="space-y-6">
          {!analysis ? (
            <div className="glass-card rounded-[30px] p-10">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-purple-500/10 p-3">
                  <Wand2 className="text-purple-400" />
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    AI Ready
                  </h2>

                  <p className="text-slate-400">
                    Upload your resume to start analysis.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* SUMMARY */}

              <div className="glass-card rounded-[30px] p-6">
                <div className="flex flex-wrap gap-3">
                  {analysis.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>

                <h2 className="mt-6 text-3xl font-black">
                  Resume Intelligence Report
                </h2>

                <p className="mt-4 leading-8 text-slate-400">
                  {analysis.summary}
                </p>
              </div>

              {/* JOBS */}

              <div className="space-y-5">
                {analysis.jobs.map((job) => (
                  <div
                    key={`${job.company}-${job.title}`}
                    className="glass-card rounded-[30px] p-6 transition hover:-translate-y-1"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div>
                        <h3 className="text-2xl font-black">
                          {job.title}
                        </h3>

                        <p className="mt-2 text-slate-400">
                          {job.company} · {job.location} ·{" "}
                          {job.salary}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 px-5 py-4 text-center">
                        <p className="text-3xl font-black">
                          {job.match_score}%
                        </p>

                        <p className="text-xs uppercase tracking-wider">
                          Match
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 leading-7 text-slate-400">
                      {job.reason}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {job.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                      <p className="text-cyan-400">
                        {job.application_status.replace(
                          /_/g,
                          " "
                        )}
                      </p>

                      <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10">
                        Review Application
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}