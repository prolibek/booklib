from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings

import os, jwt, datetime

from .models import RefreshToken

def send_activation_mail(mail, token, request):

    url = get_current_site(request=request)
    token = token
    absolute_url = f'{url}/users/activate/{token}'

    subject = "BookLib account activation"
    message = f'To fully authorize your account, please, tap the following link: {absolute_url}'

    send_mail(
        subject=subject,
        message=message,
        from_email=os.environ.get('EMAIL_HOST_USER'),
        recipient_list=[mail]
    )

# Add device to payload (not neccessary but..)

def generate_jwt_tokens(user, device):
    time_now = datetime.datetime.utcnow()

    payload = {
        'id': user.id,
        'created_at': time_now.isoformat(),
    }

    access_token = jwt.encode({ 
        **payload, 
        'exp_at': (time_now + datetime.timedelta(minutes=settings.ACCESS_TOKEN_EXPIRATION)).isoformat()
        }, 
        settings.SECRET_KEY,  
        algorithm='HS256'
        )
    refresh_token = jwt.encode({ 
        **payload, 
        'exp_at': (time_now + datetime.timedelta(minutes=settings.REFRESH_TOKEN_EXPIRATION)).isoformat(),
        },
        settings.SECRET_KEY,
        algorithm='HS256'
        )

    print(refresh_token)
    
    RefreshToken.objects.create(user=user, token=refresh_token, device=device)
    
    return access_token, refresh_token
    
    