from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.CustomerProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email')  # fields optional
    pass

@admin.register(models.AgentProfile)
class CustomerProfileAdmin(admin.ModelAdmin):
    # list_display = ('id', 'name', 'email')  # fields optional
    pass