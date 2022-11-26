from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Loyalty(models.Model):
    """ Handle user loyalty points """

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.user.username


class Camera(models.Model):
    """ Handle camera information """

    location = models.TextField(max_length=255)

    def __str__(self):
        return '{} {}'.format(self.id, self.location)


class Incident(models.Model):
    """ Handle mask and fraud related incidents """

    MASK = 0
    FRAUD = 1

    INCIDENT_TYPE = [
        (MASK, 'Not wearing mask'),
        (FRAUD, 'Risky Behaviour')
    ]

    type = models.PositiveSmallIntegerField(choices=INCIDENT_TYPE, default=MASK)
    media_file = models.FileField(upload_to='uploads/')
    date_time = models.DateField(auto_now_add=True, blank=True)
    camera_id = models.ForeignKey(Camera, on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self):
        return '{} - {}'.format(self.type, self.date_time)


class Shelf(models.Model):
    """ Handle shelf details """

    location = models.TextField(max_length=255)

    def __str__(self):
        return str(self.id)


class FeedBack(models.Model):
    """ Handle product feedbacks """

    camera = models.ForeignKey(Camera, on_delete=models.CASCADE)
    top_3_feedback = models.TextField(max_length=255)

    def __str__(self):
        return str(self.camera)


class Product(models.Model):
    """ Handle product details """

    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    shelf = models.ForeignKey(Shelf, on_delete=models.DO_NOTHING)
    discount = models.FloatField()
    loyalty_points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return '{} {}'.format(self.name, self.id)


class Order(models.Model):
    """ Handle order details """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ManyToManyField(Product, through='OrderedProduct', related_name='orders')
    date_time = models.DateTimeField(auto_now_add=True)
    discount = models.FloatField(null=True, blank=True, default=0)

    def __str__(self):
        return '{} {}'.format(self.id, self.user)


class OrderedProduct(models.Model):
    """ Handle product in order """

    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return '{} {}'.format(self.order, self.product)


class Crowd(models.Model):
    """ Handle crowd data """

    crowd_count = models.IntegerField(default=0)
    media_file = models.FileField(upload_to='uploads/', default='default.png')
    date_time = models.DateTimeField(default=datetime.now)
    date_time.editable = True

    def __str__(self):
        return str(self.date_time)


class LoyaltyDiscount(models.Model):
    """ Handle loyalty point based discount """

    points = models.PositiveIntegerField(default=0)
    discount = models.FloatField(default=0)

    def __str__(self):
        return '{} {}'.format(self.points, self.discount)


