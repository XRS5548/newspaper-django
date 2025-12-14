
from django.contrib import admin
from django.urls import path , include
from . import views

urlpatterns = [
    path("customersignup",views.customersignup,name="customer_register"),
    path("customerlogin",views.customerlogin,name="Customer_login_form"),   

]
