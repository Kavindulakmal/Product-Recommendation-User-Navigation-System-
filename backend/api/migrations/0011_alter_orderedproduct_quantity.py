# Generated by Django 3.2.14 on 2022-07-26 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_rename_loayalty_points_product_loyalty_points'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderedproduct',
            name='quantity',
            field=models.IntegerField(default=0),
        ),
    ]
