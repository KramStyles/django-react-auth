import jwt
from datetime import datetime, timedelta

from django.conf import settings
from rest_framework import exceptions


def gen_token(data, token_type=''):
    if token_type:
        expire_at = datetime.utcnow() + timedelta(days=7)
    else:
        expire_at = datetime.utcnow() + timedelta(seconds=300)

    return jwt.encode({
        'data': data,
        'exp': expire_at
    }, settings.SECRET_KEY, algorithm='HS512')


def decode_token(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS512')
        return payload
    except Exception:
        raise exceptions.AuthenticationFailed('Invalid Token Provided')
