# Generated by Django 2.2.3 on 2020-04-23 06:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('slackI', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='conversation',
            old_name='channel_id',
            new_name='channel',
        ),
    ]
