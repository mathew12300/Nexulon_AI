"""
Django Settings for Nexulon AI
Production-ready configuration
"""

import os
import sys
from pathlib import Path
from datetime import timedelta
from urllib.parse import urlparse
from decouple import config

# Build paths inside the project. This settings file lives at the project root.
BASE_DIR = Path(__file__).resolve().parent

# SECURITY
SECRET_KEY = config(
    'SECRET_KEY',
    default='dev-key-change-in-production-7f6c946a1b294f52b837a05a13f6d284',
)


def env_bool(name, default=False):
    value = config(name, default=default)
    if isinstance(value, bool):
        return value
    normalized = str(value).strip().lower()
    if normalized in {'1', 'true', 'yes', 'on', 'debug', 'development', 'dev'}:
        return True
    if normalized in {'0', 'false', 'no', 'off', 'release', 'production', 'prod'}:
        return False
    return bool(default)


DEBUG = env_bool('DEBUG', default=False)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')

# CORS
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001,http://localhost:5173,http://127.0.0.1:5173'
).split(',')

# Applications
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt',
    'drf_spectacular',
    'django_celery_beat',
    'django_celery_results',
    'django_filters',
    # Local apps
    'apps.users',
    'apps.careers',
    'apps.jobs',
    'apps.applications',
    'apps.ai',
    'apps.interviews',
]

# Middleware
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
DATABASE_URL = config('DATABASE_URL', default='')
DB_ENGINE = config('DB_ENGINE', default='django.db.backends.sqlite3')
if DATABASE_URL:
    parsed_database_url = urlparse(DATABASE_URL)
    if parsed_database_url.scheme in {'postgres', 'postgresql'}:
        DB_ENGINE = 'django.db.backends.postgresql'
        DATABASES = {
            'default': {
                'ENGINE': DB_ENGINE,
                'NAME': parsed_database_url.path.lstrip('/'),
                'USER': parsed_database_url.username or '',
                'PASSWORD': parsed_database_url.password or '',
                'HOST': parsed_database_url.hostname or 'localhost',
                'PORT': parsed_database_url.port or 5432,
                'ATOMIC_REQUESTS': True,
                'CONN_MAX_AGE': 600,
            }
        }
    elif parsed_database_url.scheme == 'sqlite':
        DB_ENGINE = 'django.db.backends.sqlite3'
        DATABASES = {
            'default': {
                'ENGINE': DB_ENGINE,
                'NAME': parsed_database_url.path or str(BASE_DIR / 'db.sqlite3'),
                'ATOMIC_REQUESTS': True,
            }
        }
    else:
        raise ValueError(f'Unsupported DATABASE_URL scheme: {parsed_database_url.scheme}')
if DB_ENGINE == 'django.db.backends.sqlite3':
    DATABASES = {
        'default': {
            'ENGINE': DB_ENGINE,
            'NAME': config('DB_NAME', default=str(BASE_DIR / 'db.sqlite3')),
            'ATOMIC_REQUESTS': True,
        }
    }
elif not DATABASE_URL:
    DATABASES = {
        'default': {
            'ENGINE': DB_ENGINE,
            'NAME': config('DB_NAME', default='nexulon_db'),
            'USER': config('DB_USER', default='postgres'),
            'PASSWORD': config('DB_PASSWORD', default='postgres'),
            'HOST': config('DB_HOST', default='localhost'),
            'PORT': config('DB_PORT', default=5432),
            'ATOMIC_REQUESTS': True,
            'CONN_MAX_AGE': 600,
        }
    }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = config(
    'STATICFILES_STORAGE',
    default='django.contrib.staticfiles.storage.StaticFilesStorage',
)

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'EXCEPTION_HANDLER': 'apps.common.exception_handler.custom_exception_handler',
    'THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle',
    ],
    'THROTTLE_RATES': {
        'anon': '20/hour',
        'user': '100/hour',
    },
}

# JWT Settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=15),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': config('JWT_SECRET_KEY', default=SECRET_KEY),
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
}

# Celery Configuration
CELERY_BROKER_URL = config('CELERY_BROKER_URL', default='redis://localhost:6379/0')
CELERY_RESULT_BACKEND = config('CELERY_RESULT_BACKEND', default='redis://localhost:6379/0')
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = 'UTC'
CELERY_TASK_ALWAYS_EAGER = DEBUG

# Redis Cache
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': config('REDIS_URL', default='redis://localhost:6379/1'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'PARSER_KWARGS': {'encoding': 'utf8'},
            'CONNECTION_POOL_KWARGS': {'retry_on_timeout': True},
        },
    }
}

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'file': {
            'format': '{levelname} {asctime} {name} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR / 'logs' / 'nexulon.log',
            'formatter': 'file',
            'maxBytes': 1024 * 1024 * 10,  # 10MB
            'backupCount': 10,
        },
    },
    'root': {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {'level': 'INFO'},
        'apps': {'level': 'DEBUG'},
    },
}

# Security Settings (Production)
IS_RUNSERVER = 'runserver' in sys.argv
if not DEBUG:
    SECURE_SSL_REDIRECT = env_bool('SECURE_SSL_REDIRECT', default=not IS_RUNSERVER)
    SESSION_COOKIE_SECURE = env_bool('SESSION_COOKIE_SECURE', default=not IS_RUNSERVER)
    CSRF_COOKIE_SECURE = env_bool('CSRF_COOKIE_SECURE', default=not IS_RUNSERVER)
    SECURE_HSTS_SECONDS = config('SECURE_HSTS_SECONDS', default=0 if IS_RUNSERVER else 31536000, cast=int)
    SECURE_HSTS_INCLUDE_SUBDOMAINS = env_bool('SECURE_HSTS_INCLUDE_SUBDOMAINS', default=not IS_RUNSERVER)
    SECURE_HSTS_PRELOAD = env_bool('SECURE_HSTS_PRELOAD', default=not IS_RUNSERVER)
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_SECURITY_POLICY = {
        'default-src': ("'self'",),
        'script-src': ("'self'", "'unsafe-inline'"),
        'style-src': ("'self'", "'unsafe-inline'"),
        'img-src': ("'self'", 'data:', 'https:'),
    }

# External Services
OPENAI_API_KEY = config('OPENAI_API_KEY', default='')
OPENROUTER_API_KEY = config('OPENROUTER_API_KEY', default='')
OPENROUTER_MODEL = config('OPENROUTER_MODEL', default='openai/gpt-4o-mini')
ELASTICSEARCH_HOST = config('ELASTICSEARCH_HOST', default='localhost:9200')
AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID', default='')
AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY', default='')
AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME', default='')
AWS_S3_REGION_NAME = config('AWS_S3_REGION_NAME', default='us-east-1')

# Email Configuration
EMAIL_BACKEND = config(
    'EMAIL_BACKEND',
    default='django.core.mail.backends.console.EmailBackend'
)
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='noreply@nexulon.ai')

# Feature Flags
FEATURES = {
    'JOB_MATCHING': config('FEATURE_JOB_MATCHING', default=True, cast=bool),
    'AI_RESUME_OPTIMIZATION': config('FEATURE_RESUME_OPT', default=True, cast=bool),
    'INTERVIEW_PREP': config('FEATURE_INTERVIEW', default=True, cast=bool),
    'AUTO_APPLY': config('FEATURE_AUTO_APPLY', default=False, cast=bool),
}

# API Documentation
SPECTACULAR_SETTINGS = {
    'TITLE': 'Nexulon AI API',
    'DESCRIPTION': 'AI-powered career platform API',
    'VERSION': '1.0.0',
    'SERVE_PERMISSIONS': ['rest_framework.permissions.AllowAny'],
    'SCHEMA_PATH_PREFIX': '/api/v1',
}
