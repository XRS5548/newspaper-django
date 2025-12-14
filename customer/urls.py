
from django.contrib import admin
from django.urls import path , include
from . import views

urlpatterns = [
    path("",views.dashboard,name="Dashboard_of_customer"),
    path("profile",views.dashboardProfile,name="Dashboard_of_customer"),
    path("calender",views.dashboardCalender,name="Dashboard_of_customer"),
    path("papers",views.dashboardPapers,name="Dashboard_of_customer"),
    path("agents",views.agentPaymentDashboard,name="Dashboard_of_customer"),
    path("logout",views.logout,name="Dashboard_of_customer"),
    path("addpaper",views.dashboardAddpaper,name="Dashboard_of_customer"),
    path("addbooklet",views.dashboardAddBooklet,name="Dashboard_of_customer"),
    



    path("calender/<int:year>/<int:month>/", views.dashboardCalender, name="calendar" )
    



]
