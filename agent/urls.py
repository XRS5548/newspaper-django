
from django.contrib import admin
from django.urls import path , include
from . import views

urlpatterns = [
    path("",views.ProfilePage,name="Profile Page"),
    path("profile",views.ProfilePage,name="Profile Page"),
    path("customers",views.agent_attendance,name="Attendace Page"),
    path("delevery",views.agent_deliveries,name="Delevery Page"),
     path(
        "editcustomer/<int:id>/",
        views.edit_alloted_customer,
        name="edit_alloted_customer"
    ),
    path(
        "editcustomer/delete/<int:id>/",
        views.delete_alloted_customer,
        name="delete_alloted_customer"
    ),

    path(
        "addcustomer/",
        views.add_alloted_customer,
        name="add_alloted_customer"
    ),

    path(
        "adddelivery/",
        views.add_delivery,
        name="add_delivery"
    ),

]
