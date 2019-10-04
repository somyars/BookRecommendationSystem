"""
Django settings for book_recommendation project.

Generated by 'django-admin startproject' 

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""
# Reference: https://buildmedia.readthedocs.org/media/pdf/django-tastypie/latest/django-tastypie.pdf
# Includes the setup and configuration required for the Django Tastypie API
import os

# Build paths inside project: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Secret key
SECRET_KEY = '#l$&am418x4l447$!qfkm7=!j5!9ev*optgov8k*2gs_yl)64r'

DEBUG = True

ALLOWED_HOSTS = []

# Application definition

# Added api, tastypie and corsheaders to the installed apps
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
	'api',
	'corsheaders',
	'tastypie'
]

# Auto-generated
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
	'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'book_recommendation.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

# For whitelisting all the domains
CORS_ORIGIN_ALLOW_ALL = True	

WSGI_APPLICATION = 'book_recommendation.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

#DATABASES = {
#    'default': {
#       'ENGINE': 'django.db.backends.sqlite3',
#       'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#    }
#}

#DATABASES = {
#    'default': {
#        'ENGINE': 'sql_server.pyodbc',
#        'NAME': 'sh6361_Database',
#        'HOST': 'infodata16.mbs.tamu.edu',
#        'USER': 'sh6361',
#       'PASSWORD': 'Mays6361',
#        'OPTIONS': {
#            'driver': 'SQL Server Native Client 11.0',
#        }
#    }
#}

# MariaDB connection configuartion
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'ISTM622',
        'USER': 'user',
        'PASSWORD': 'kul',
        'HOST': '3.18.109.224',
        'PORT': '3306',
		'OPTIONS' : {
			'init_command' :'SET default_storage_engine=INNODB',
		}
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
			'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'
