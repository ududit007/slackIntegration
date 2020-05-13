"""
WSGI config for slackIntegration project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os
import site
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
site.addsitedir('/home/ubuntu/.local/lib/python3.6/site-packages')
sys.path.append(BASE_DIR)
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'slackIntegration.settings.staging')

application = get_wsgi_application()
