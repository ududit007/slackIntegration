# Generated by Django 2.2.3 on 2020-04-23 06:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Channel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('channel_id', models.CharField(max_length=20)),
                ('channel_name', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Channel',
                'verbose_name_plural': 'Channel',
                'db_table': 'channel',
            },
        ),
        migrations.CreateModel(
            name='Token',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token_team', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Token',
                'verbose_name_plural': 'Token',
                'db_table': 'token',
            },
        ),
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(blank=True, max_length=200, null=True)),
                ('message_date', models.DateTimeField()),
                ('sender_id', models.CharField(max_length=20)),
                ('channel_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='slackI.Channel')),
            ],
            options={
                'verbose_name': 'Conversation',
                'verbose_name_plural': 'Conversation',
                'db_table': 'conversation',
            },
        ),
        migrations.AddField(
            model_name='channel',
            name='token_team',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='slackI.Token'),
        ),
    ]
