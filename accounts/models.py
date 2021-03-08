from django.db import models
from django.contrib.auth.models import (
    User,
    AbstractUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of username
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password
        """
        print("creating user", email, password, extra_fields)
        extra_fields.setdefault("is_active", True)
        if not email:
            raise ValueError(_("Email is required to register a new user"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser, PermissionsMixin):
    """
    custom user - overrides django defaults
    """

    username = None
    email = models.EmailField(verbose_name="email address", unique=True)
    name = models.CharField(max_length=150, null=True)
    join_date = models.DateTimeField(
        verbose_name="join date", auto_now_add=True
    )
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    about = models.CharField(null=True, max_length=250)
    picture = models.ImageField(
        default="default.jpg", upload_to="profile_pics", max_length=1000
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email}"
