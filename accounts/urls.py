
from django.contrib import admin
from django.urls import path , include
from . import views

urlpatterns = [
    path("customersignup",views.customersignup,name="customer_register"),
    path("customerlogin",views.customerlogin,name="Customer_login_form"),   
    path("agentsignup",views.agent_signup,name="Agetn Signup page"),
    path("agentlogin",views.agent_login,name="Agetn Login page"),


]
