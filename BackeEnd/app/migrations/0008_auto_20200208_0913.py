# Generated by Django 3.0.2 on 2020-02-08 04:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20200208_0910'),
    ]

    operations = [
        migrations.AlterField(
            model_name='organization',
            name='email',
            field=models.TextField(unique=True),
        ),
        migrations.AlterField(
            model_name='organization',
            name='org_name',
            field=models.TextField(unique=True),
        ),
        migrations.AlterField(
            model_name='organization',
            name='phone',
            field=models.TextField(unique=True),
        ),
        migrations.AlterField(
            model_name='recycler',
            name='email',
            field=models.TextField(unique=True),
        ),
        migrations.AlterField(
            model_name='recycler',
            name='phone',
            field=models.TextField(unique=True),
        ),
        migrations.AlterField(
            model_name='recycler',
            name='username',
            field=models.TextField(unique=True),
        ),
    ]