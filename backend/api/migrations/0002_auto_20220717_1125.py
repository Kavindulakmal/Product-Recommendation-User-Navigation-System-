# Generated by Django 3.2.14 on 2022-07-17 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Camera',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('location', models.TextField(max_length=255)),
            ],
        ),
        migrations.RenameField(
            model_name='feedback',
            old_name='shelf',
            new_name='camera',
        ),
    ]
