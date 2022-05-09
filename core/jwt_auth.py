import jwt
from datetime import datetime, timedelta

from django.conf import settings
from rest_framework import exceptions, authentication


class JWTAuthentication(authentication.TokenAuthentication):
    def authenticate(self, request):
        auth = authentication.get_authorization_header(request).split()
        print('AUTH HEAD', auth)
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            data = decode_token(token)

            return data, None  # Included the None to allow unpacking for data
        raise exceptions.AuthenticationFailed('Unauthenticated!')


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
    except Exception as err:
        raise exceptions.AuthenticationFailed({'message': 'Invalid Token Provided', 'error': str(err)})
