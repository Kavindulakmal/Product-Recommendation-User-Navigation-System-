from django.contrib import admin
from api.models import *


@admin.register(Incident)
class IncidentAdmin(admin.ModelAdmin):
    pass


@admin.register(Shelf)
class ShelfAdmin(admin.ModelAdmin):
    pass


@admin.register(Loyalty)
class LoyaltyAdmin(admin.ModelAdmin):
    pass

@admin.register(LoyaltyDiscount)
class LoyaltyDiscountAdmin(admin.ModelAdmin):
    pass


@admin.register(FeedBack)
class FeedBackAdmin(admin.ModelAdmin):
    pass


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    pass


class OrderedProductInline(admin.StackedInline):
    """ Inline views of Services belongs to the category """
    model = OrderedProduct
    extra = 0


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderedProductInline]


@admin.register(OrderedProduct)
class OrderedProductAdmin(admin.ModelAdmin):
    pass


@admin.register(Crowd)
class CrowdAdmin(admin.ModelAdmin):
    pass


@admin.register(Camera)
class CameraAdmin(admin.ModelAdmin):
    pass




