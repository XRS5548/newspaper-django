from django.shortcuts import render , redirect
from django.http import HttpResponse
from . import models
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password , check_password
from django.forms.models import model_to_dict

import calendar
from datetime import date


# Create your views here.
def customersignup(request):

    if request.method == "POST":
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        if password != confirm_password:
            return render(request, "signup.html", {
                "error": "Passwords do not match"
            })

        models.CustomerProfile.objects.create(
            name=request.POST.get("name"),
            surname=request.POST.get("surname"),
            mobile=request.POST.get("mobile"),
            email=request.POST.get("email"),
            address=request.POST.get("address"),
            state=request.POST.get("state"),
            district=request.POST.get("district"),
            tehsil=request.POST.get("tehsil"),
            village=request.POST.get("village"),
            pincode=request.POST.get("pincode"),
            age=request.POST.get("age"),
            gender=request.POST.get("gender"),
            photo=request.FILES.get("photo"),
            password= make_password(request.POST.get("password"))
        )

        return redirect("customerlogin")
    return render(request,"customerregister.html")



def customerlogin(request):
    ismsg = False
    iserror=False
    msg = ""

    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            user = models.CustomerProfile.objects.get(email = email)
            if check_password(password,user.password) : 
                request.session['user_id'] = user.id
                request.session['user_name'] = user.name
                request.session['user_email'] = user.email
                return redirect("dashboard/")
            else:
                msg = "Invailid Username or password"
                iserror = True
                ismsg = True
        except models.CustomerProfile.DoesNotExist:
            ismsg = True
            iserror = True
            msg = "Invailid Username or password"

    return render(request,"customerlogin.html",context={
        "ismsg" :ismsg,
        "iserror":iserror,
        "msg":msg
    })



