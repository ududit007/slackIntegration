# Generated by Django 2.2.3 on 2020-05-14 07:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slackI', '0005_auto_20200429_1223'),
    ]

    operations = [
        migrations.AddField(
            model_name='token',
            name='team_id',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='token',
            name='team_name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
