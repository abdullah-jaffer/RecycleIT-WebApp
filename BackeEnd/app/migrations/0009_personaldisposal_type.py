# Generated by Django 3.0.2 on 2020-05-27 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_auto_20200208_0913'),
    ]

    operations = [
        migrations.AddField(
            model_name='personaldisposal',
            name='type',
            field=models.CharField(choices=[('PUB', 'Public'), ('PER', 'Personal')], default='PER', max_length=3),
        ),
    ]
