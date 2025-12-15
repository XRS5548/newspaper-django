from django.contrib import admin
from . import models
# Register your models here.
@admin.register(models.ExtraDelivery)
class ExtraDelivery(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email')  # fields optional
    pass

@admin.register(models.AllotedCustomer)
class AllotedCustomer(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email')  # fields optional
    pass
