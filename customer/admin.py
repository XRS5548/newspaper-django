from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Newspaper)
class CustomerProfileAdmin(admin.ModelAdmin):
    pass

@admin.register(Booklet)
class CustomerProfileAdmin(admin.ModelAdmin):
    pass
@admin.register(PurchaseBooklet)
class CustomerProfileAdmin(admin.ModelAdmin):
    pass
@admin.register(PurchaseNewspaper)
class CustomerProfileAdmin(admin.ModelAdmin):
    pass

@admin.register(AgentPayment)
class CustomerProfileAdmin(admin.ModelAdmin):
    pass