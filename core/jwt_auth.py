import jwt
from datetime import datetime, timedelta

from django.conf import settings


def gen_token(data, token_type=''):
    if token_type:
        expire_at = datetime.utcnow() + timedelta(days=7)
    else:
        expire_at = datetime.utcnow() + timedelta(seconds=300)

    return jwt.encode({
        'data': data,
        'exp': expire_at
    }, settings.SECRET_KEY, algorithm='HS512')
