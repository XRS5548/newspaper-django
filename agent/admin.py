from django.contrib import admin
from . import models
from accounts.models import HokerProfile
# Register your models here.
@admin.register(models.ExtraDelivery)
class ExtraDelivery(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email')  # fields optional
    pass

@admin.register(models.AllotedCustomer)
class AllotedCustomer(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email')  # fields optional
    pass



@admin.register(models.HokerPayment)
class AllotedCustomer(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email')  # fields optional
    pass


@admin.register(models.AllotedHoker)
class AllotedCustomer(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email')  # fields optional
    pass

@admin.register(models.HokerAttendance)
class AllotedCustomer(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email')  # fields optional
    pass


@admin.register(HokerProfile)
class AllotedCustomer(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email')  # fields optional
    pass

