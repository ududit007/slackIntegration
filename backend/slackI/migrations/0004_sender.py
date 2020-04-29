# Generated by Django 2.2.3 on 2020-04-27 08:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('slackI', '0003_auto_20200424_1110'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sender',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('real_name', models.CharField(blank=True, max_length=50, null=True)),
                ('display_name', models.CharField(blank=True, max_length=50, null=True)),
                ('email', models.EmailField(blank=True, max_length=100, null=True)),
                ('sender_id', models.CharField(blank=True, max_length=50, null=True)),
                ('channel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='slackI.Channel')),
            ],
            options={
                'verbose_name': 'Sender',
                'db_table': 'sender',
            },
        ),
    ]