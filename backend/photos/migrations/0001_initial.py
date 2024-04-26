# Generated by Django 5.0.4 on 2024-04-21 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('width', models.IntegerField(blank=True, null=True)),
                ('height', models.IntegerField(blank=True, null=True)),
                ('url', models.URLField()),
                ('photographer', models.CharField(blank=True, max_length=100, null=True)),
                ('photographer_url', models.URLField(blank=True, null=True)),
                ('photographer_id', models.IntegerField()),
                ('avg_color', models.CharField(blank=True, max_length=7, null=True)),
                ('src_original', models.URLField(blank=True, null=True)),
                ('src_large2x', models.URLField(blank=True, null=True)),
                ('src_large', models.URLField(blank=True, null=True)),
                ('src_medium', models.URLField(blank=True, null=True)),
                ('src_small', models.URLField(blank=True, null=True)),
                ('src_portrait', models.URLField(blank=True, null=True)),
                ('src_landscape', models.URLField(blank=True, null=True)),
                ('src_tiny', models.URLField(blank=True, null=True)),
                ('alt', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
    ]