from rest_framework import serializers
from api.models import *


class ProductSerializer(serializers.ModelSerializer):
    """ Serialize the products """

    class Meta:
        model = Product
        fields = '__all__'


class ProductDiscountSerializer(serializers.ModelSerializer):
    """ Serialize the products and discount """

    class Meta:
        model = Product
        fields = ['id', 'name', 'discount']


class ShelfSerializer(serializers.ModelSerializer):
    """ Serialize the shelf """

    class Meta:
        model = Shelf
        fields = '__all__'


class FeedBackSerializer(serializers.ModelSerializer):
    """ Serialize feedbacks """

    class Meta:
        model = FeedBack
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['top_3_feedback'] = [expression.strip() for expression in representation['top_3_feedback'].strip().split(',')]
        return representation


class IncidentSerializer(serializers.ModelSerializer):
    """ Serialize incident """

    type = serializers.SerializerMethodField()

    class Meta:
        model = Incident
        fields = '__all__'

    def get_type(self, obj):
        return obj.get_type_display()


class CrowdSerializer(serializers.ModelSerializer):
    """ Serialize crowd model """

    class Meta:
        model = Crowd
        fields = '__all__'


class OrderedProductSerializer(serializers.ModelSerializer):
    """ Serialize ordered product """

    class Meta:
        model = OrderedProduct
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    """ Serialize ordered product """

    product = ProductSerializer(read_only=True, many=True)

    class Meta:
        model = Order
        fields = ['user', 'product', 'date_time', 'discount', 'product']


