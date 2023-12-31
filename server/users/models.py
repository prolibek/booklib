from django.db import models
from django.contrib.auth.models import AbstractUser

import uuid

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True, max_length=255)
    username = models.CharField(unique=True, max_length=16)

    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

    first_name = models.CharField(max_length=30, null=True)
    last_name = models.CharField(max_length=63, null=True)

    date_joined = models.DateTimeField(auto_now_add=True)

    is_email_confirmed = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'

class Rank(models.Model):
    score = models.IntegerField(default=0)
    rank = models.IntegerField(default=1)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def update_rank(self):
        if pow(2, (self.rank - 1)) * 100 <= self.score:
            self.rank += 1
            self.save()

class RefreshToken(models.Model):
    token = models.CharField(max_length=255, unique=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    # defining device id lays on client side
    device = models.CharField(max_length=255)

class ActivationToken(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)