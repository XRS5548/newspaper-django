
from django.contrib import admin
from django.urls import path , include
from . import views

urlpatterns = [
    path("",views.ProfilePage,name="Profile Page"),
    path("profile",views.ProfilePage,name="Profile Page"),
    path("customers",views.Agent_Customers,name="Attendace Page"),
    path("hockers",views.agent_hokers,name="Delevery Page"),    
    path("logout",views.agent_logout,name="Delevery Page"),
    path("deliveries/", views.all_deliveries, name="agent_deliveries"),
    path("hockers/add/", views.add_hoker, name="add_hoker"),
    path("profile/edit/", views.edit_agent_profile, name="agent_edit_profile"),
    path("bills/", views.agent_all_bills, name="agent_all_bills"),
     path("bills/create/", views.agent_create_bill, name="agent_create_bill"),

       # ✅ EDIT & DELETE
    path("bills/<int:bill_id>/edit/", views.agent_edit_bill, name="agent_edit_bill"),
    path("bills/<int:bill_id>/delete/", views.agent_delete_bill, name="agent_delete_bill"),
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
    path(
    "hockers/<int:hoker_id>/attendance/",
    views.hoker_attendance_calendar,
    name="hoker_attendance"
),

path(
    "hockers/<int:hoker_id>/attendance/add/",
    views.add_hoker_attendance,
    name="add_hoker_attendance"
),

path(
    "hockers/<int:hoker_id>/profile/",
    views.hoker_profile,
    name="hoker_profile"
),
path(
    "hockers/<int:hoker_id>/edit/",
    views.edit_hoker_profile,
    name="edit_hoker_profile"
),
path(
    "hockers/<int:hoker_id>/payments/",
    views.hoker_payments,
    name="hoker_payments"
),

path(
    "hockers/<int:hoker_id>/payments/add/",
    views.add_hoker_payment,
    name="add_hoker_payment"
),

path(
    "payments/",
    views.all_hoker_payments,
    name="all_hoker_payments"
),
path(
    "deliveries/<int:customer_id>/add/",
    views.add_delivery_record,
    name="add_delivery"
)


]
