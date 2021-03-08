from urllib import request, error
from django.template.defaultfilters import slugify
from django.core.files.base import ContentFile
from django.core.files import File
from .models import CustomUser


def save_profile_picture(backend, user, response, *args, **kwargs):
    if backend.name == "facebook":
        fb_profile_url = (
            f"https://graph.facebook.com/{response['id']}/picture?type=square"
        )
        dest_request = request.Request(fb_profile_url)
        dest_request.add_header(
            "Authorization", f"Bearer {response['access_token']}"
        )

        try:
            avatar = request.urlopen(dest_request)
            account = CustomUser.objects.filter(email=user).first()
            account.picture.save(
                slugify(response["name"] + " social") + ".jpg",
                ContentFile(avatar.read()),
            )
            account.save()
        except error.HTTPError:
            print(error.HTTPError.info)

    if backend.name == "google-oauth2":
        try:
            avatar = request.urlopen(response["picture"])
            account = CustomUser.objects.filter(email=user).first()
            account.picture.save(
                slugify(response["name"] + " social") + ".jpg",
                ContentFile(avatar.read()),
            )
            account.save()
        except error.HTTPError:
            print(error.HTTPError.info)
