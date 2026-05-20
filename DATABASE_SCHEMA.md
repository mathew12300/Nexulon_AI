# Database Schema - Nexulon AI

## Core Models

### User
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

### CareerProfile
```sql
CREATE TABLE career_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    current_title VARCHAR(255),
    current_company VARCHAR(255),
    industry VARCHAR(100),
    experience_level VARCHAR(50), -- entry, mid, senior, lead, executive
    years_experience INT,
    bio TEXT,
    skills TEXT[], -- Array of skills
    certifications TEXT[],
    preferred_locations VARCHAR(500)[],
    preferred_industries VARCHAR(100)[],
    salary_expectation_min INT,
    salary_expectation_max INT,
    employment_type VARCHAR(50)[], -- Full-time, Part-time, Contract
    remote_preference VARCHAR(50), -- On-site, Hybrid, Remote
    looking_for_job BOOLEAN DEFAULT FALSE,
    profile_completion_percentage INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_career_profiles_user ON career_profiles(user_id);
CREATE INDEX idx_career_profiles_skills ON career_profiles USING GIN(skills);
```

### Resume
```sql
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255),
    file_url VARCHAR(500) NOT NULL,
    file_name VARCHAR(255),
    file_size INT,
    content TEXT, -- Parsed resume text
    is_primary BOOLEAN DEFAULT FALSE,
    ats_score INT, -- 0-100 ATS optimization score
    keywords_found TEXT[],
    format VARCHAR(50), -- pdf, docx, txt
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    optimized_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resumes_user ON resumes(user_id);
CREATE INDEX idx_resumes_primary ON resumes(user_id, is_primary);
```

### Job
```sql
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    job_url VARCHAR(500),
    location VARCHAR(255),
    remote_type VARCHAR(50), -- On-site, Hybrid, Remote
    employment_type VARCHAR(50), -- Full-time, Part-time, Contract
    salary_min INT,
    salary_max INT,
    currency VARCHAR(10),
    experience_level VARCHAR(50),
    required_skills TEXT[],
    nice_to_have_skills TEXT[],
    industry VARCHAR(100),
    posted_date TIMESTAMP,
    deadline_date TIMESTAMP,
    source VARCHAR(100), -- LinkedIn, Indeed, Company site, etc
    is_active BOOLEAN DEFAULT TRUE,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_jobs_active ON jobs(is_active);
CREATE INDEX idx_jobs_company ON jobs(company_id);
CREATE INDEX idx_jobs_skills ON jobs USING GIN(required_skills);
CREATE INDEX idx_jobs_posted ON jobs(posted_date);
```

### Application
```sql
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL,
    status VARCHAR(50), -- applied, viewed, shortlisted, interview, rejected, offer
    match_score INT, -- 0-100 matching percentage
    cover_letter TEXT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    response_received_at TIMESTAMP,
    notes TEXT,
    is_bookmarked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_job ON applications(job_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_match ON applications(match_score);
```

### Company
```sql
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    website VARCHAR(500),
    logo_url VARCHAR(500),
    description TEXT,
    industry VARCHAR(100),
    company_size VARCHAR(50), -- 1-10, 11-50, 51-200, 201-500, 500+
    founded_year INT,
    headquarters_location VARCHAR(255),
    ratings DECIMAL(3, 2), -- 0-5 rating
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_companies_name ON companies(name);
```

### Interview
```sql
CREATE TABLE interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
    interview_type VARCHAR(50), -- mock, scheduled, feedback
    topic VARCHAR(255), -- Job title or topic
    difficulty_level VARCHAR(50), -- beginner, intermediate, advanced
    score INT, -- 0-100
    duration_minutes INT,
    questions_asked TEXT[],
    user_answers TEXT[],
    ai_feedback TEXT,
    transcript TEXT,
    scheduled_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_interviews_user ON interviews(user_id);
CREATE INDEX idx_interviews_completed ON interviews(completed_at);
```

### SavedJob
```sql
CREATE TABLE saved_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, job_id)
);

CREATE INDEX idx_saved_jobs_user ON saved_jobs(user_id);
```

### UserNotification
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50), -- job_match, application_status, message, system
    title VARCHAR(255),
    message TEXT,
    related_id UUID, -- Job ID, Application ID, etc
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);
```

### SubscriptionPlan
```sql
CREATE TABLE subscription_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    price_monthly DECIMAL(10, 2),
    price_yearly DECIMAL(10, 2),
    features TEXT[], -- Array of feature slugs
    max_applications INT,
    max_resumes INT,
    ai_features_enabled BOOLEAN,
    priority_support BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### UserSubscription
```sql
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id),
    status VARCHAR(50), -- active, cancelled, suspended
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    auto_renew BOOLEAN DEFAULT TRUE,
    stripe_subscription_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_subscriptions_status ON user_subscriptions(status);
```

### AIModelUsage
```sql
CREATE TABLE ai_model_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    model_name VARCHAR(100),
    feature VARCHAR(100), -- resume_optimization, interview, job_matching
    tokens_used INT,
    cost DECIMAL(10, 4),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_usage_user ON ai_model_usage(user_id);
CREATE INDEX idx_ai_usage_date ON ai_model_usage(timestamp);
```

---

## Relationships Overview

```
User (1) ──── (N) CareerProfile
User (1) ──── (N) Resume
User (1) ──── (N) Application
User (1) ──── (N) Interview
User (1) ──── (N) SavedJob
User (1) ──── (N) Notification
User (1) ──── (1) UserSubscription
Job (1) ──── (N) Application
Job (1) ──── (N) SavedJob
Company (1) ──── (N) Job
Application (1) ──── (N) Interview
Resume (1) ──── (N) Application
```

---

## Performance Considerations

- Indexes on frequently queried fields (user_id, status, timestamps)
- GIN indexes for array fields
- Partition large tables by date if needed
- Archive old interviews and notifications
- Cache job search results with Redis

---

## Data Retention Policy

- User soft delete (retention 30 days)
- Application history: Retain for 2 years
- Interview data: Retain for 1 year
- Notifications: Retain for 90 days
- AI usage logs: Retain for 1 year for analytics

