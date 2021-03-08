# Generated by Django 3.1.5 on 2021-02-13 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("housing", "0004_auto_20210211_1639"),
    ]

    operations = [
        migrations.AlterField(
            model_name="housing",
            name="latitude",
            field=models.DecimalField(
                decimal_places=10, default=0.0, max_digits=19
            ),
        ),
        migrations.AlterField(
            model_name="housing",
            name="longitude",
            field=models.DecimalField(
                decimal_places=10, default=0.0, max_digits=19
            ),
        ),
    ]
