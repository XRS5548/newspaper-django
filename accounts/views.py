from django.shortcuts import render , redirect
from django.http import HttpResponse
from . import models
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password , check_password
from django.forms.models import model_to_dict
from django.db import IntegrityError
import calendar
from datetime import date

def customersignup(request):

    if request.method == "POST":

        # 📥 form data
        name = request.POST.get("name")
        mobile = request.POST.get("mobile")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirm_password")

        # 🔴 Required fields check
        if not all([name, mobile, email, password, confirm_password]):
            messages.error(request, "All required fields must be filled")
            return render(request, "customerregister.html")

        # 🔴 Password match
        if password != confirm_password:
            messages.error(request, "Passwords do not match")
            return render(request, "customerregister.html")

        # 🔴 Duplicate checks
        if models.CustomerProfile.objects.filter(email=email).exists():
            messages.error(request, "Email already registered")
            return render(request, "customerregister.html")

        if models.CustomerProfile.objects.filter(mobile=mobile).exists():
            messages.error(request, "Mobile number already registered")
            return render(request, "customerregister.html")

        try:
            models.CustomerProfile.objects.create(
                name=name,
                surname=request.POST.get("surname"),
                mobile=mobile,
                email=email,

                address=request.POST.get("address"),
                state=request.POST.get("state"),
                district=request.POST.get("district"),
                tehsil=request.POST.get("tehsil"),
                village=request.POST.get("village"),
                pincode=request.POST.get("pincode"),

                age=request.POST.get("age"),
                gender=request.POST.get("gender"),
                photo=request.FILES.get("photo"),

                password=make_password(password),
            )

            messages.success(request, "Account created successfully")
            return redirect("customerlogin")

        except IntegrityError:
            messages.error(request, "Database error: duplicate or invalid data")

        except Exception as e:
            messages.error(request, f"Something went wrong: {str(e)}")

    return render(request, "customerregister.html")

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






def agent_signup(request):
    if request.method == "POST":

        # 📥 form data
        full_name = request.POST.get("full_name")
        mobile = request.POST.get("mobile")
        email = request.POST.get("email")
        password = request.POST.get("password")

        # 🔴 Basic validation
        if not all([full_name, mobile, email, password]):
            messages.error(request, "All required fields must be filled")
            return render(request, "agentregister.html")

        # 🔴 Duplicate checks
        if models.AgentProfile.objects.filter(email=email).exists():
            messages.error(request, "Email already registered")
            return render(request, "agentregister.html")

        if models.AgentProfile.objects.filter(mobile=mobile).exists():
            messages.error(request, "Mobile number already registered")
            return render(request, "agentregister.html")

        try:
            models.AgentProfile.objects.create(
                full_name=full_name,
                mobile=mobile,
                email=email,

                address=request.POST.get("address"),
                state=request.POST.get("state"),
                district=request.POST.get("district"),
                tehsil=request.POST.get("tehsil"),
                village=request.POST.get("village"),
                pincode=request.POST.get("pincode"),

                agency_name=request.POST.get("agency_name"),
                agency_phone=request.POST.get("agency_phone"),

                age=request.POST.get("age"),
                gender=request.POST.get("gender"),

                photo=request.FILES.get("photo"),
                password=make_password(password),
            )

            messages.success(request, "Agent registered successfully")
            return redirect("agentlogin")

        except IntegrityError:
            messages.error(request, "Database error: duplicate or invalid data")

        except Exception as e:
            messages.error(request, f"Something went wrong: {str(e)}")

    return render(request, "agentregister.html")


def agent_login(request):
    error = None

    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        try:
            agent = models.AgentProfile.objects.get(email=email)

            if check_password(password, agent.password):
                # session set
                request.session["agent_id"] = agent.id
                request.session["agent_name"] = agent.full_name

                return redirect("agent/")  # change if needed
            else:
                error = "Invalid password"

        except models.AgentProfile.DoesNotExist:
            error = "Agent not found"

    return render(request, "agentlogin.html", {"error": error})