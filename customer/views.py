from django.shortcuts import render , redirect
from django.http import HttpResponse
from accounts.models import *
from django.contrib import messages
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password , check_password
from django.forms.models import model_to_dict
from agent.models import *
from django.db.models import Sum

from .models import *

import calendar
from datetime import date
from django.utils import timezone


def dashboard(request):
    if 'user_id' not in request.session:
        return redirect('/customerlogin')
    user = CustomerProfile.objects.get(id=request.session['user_id'])
    return render(request,"customer/profile.html",context={"user":model_to_dict(user)})



def dashboardProfile(request):
    if 'user_id' not in request.session:
        return redirect('/customerlogin')
    user = CustomerProfile.objects.get(id=request.session['user_id'])
    return render(request,"customer/profile.html",context={"user":model_to_dict(user)})




today = date.today()

def dashboardCalender(request, year=today.year, month=today.month):

    if "user_id" not in request.session:
        return redirect("customerlogin/")

    customer = CustomerProfile.objects.get(id=request.session["user_id"])

    # active subscription
    purchase = PurchaseNewspaper.objects.filter(
        customer=customer,
        is_active=True
    ).first()

    # calendar structure
    cal = calendar.monthcalendar(year, month)

    # deliveries for this month
    deliveries = NewspaperDelivery.objects.filter(
        customer=customer,
        date__year=year,
        date__month=month,
        is_delivered=True
    )

    # delivered day numbers [1,5,10...]
    delivered_days = [d.date.day for d in deliveries]

    # payment calculation
    price_per_day = purchase.newspaper.price if purchase else 0
    this_month_payment = len(delivered_days) * price_per_day

    # remaining (example – later payment table se)
    remaining_payment = 0
    total_payment = this_month_payment + remaining_payment

    # month navigation
    prev_month = month - 1 if month > 1 else 12
    prev_year  = year if month > 1 else year - 1

    next_month = month + 1 if month < 12 else 1
    next_year  = year if month < 12 else year + 1

    context = {
        "calendar": cal,
        "month_name": calendar.month_name[month],
        "year": year,
        "month": month,
        "delivered_days": delivered_days,

        "prev_year": prev_year,
        "prev_month": prev_month,
        "next_year": next_year,
        "next_month": next_month,

        # payment
        "price_per_day": price_per_day,
        "this_month_payment": this_month_payment,
        "remaining_payment": remaining_payment,
        "total_payment": total_payment,

        "upi_link": "upi://pay?pa=xxxx@upi",
        "qr_code_url": "/static/qr.png",
    }

    return render(request, "customer/calender.html", context)



def dashboardPapers(request):
    # 🔐 Session check
    if "user_id" not in request.session:
        return redirect("customerlogin")

    customer_id = request.session["user_id"]
    customer = CustomerProfile.objects.get(id=customer_id)

    # 📄 Added newspapers only
    newspapers = PurchaseNewspaper.objects.filter(customer=customer)

    # 📘 Added booklets only
    booklets = PurchaseBooklet.objects.filter(customer=customer)

    # 💳 Pending (added but not subscribed)
    pending_newspapers = newspapers.filter(is_active=False)
    pending_booklets = booklets.filter(is_active=False)
    total_amount = (
    sum(p.newspaper.price for p in pending_newspapers)*30 +
    sum(b.booklet.price for b in pending_booklets)*4
    )
    context = {
        "total_amount" :total_amount,
        "customer": customer,
        "newspapers": newspapers,
        "booklets": booklets,
        "pending_newspapers": pending_newspapers,
        "pending_booklets": pending_booklets,
    }

    return render(request, "customer/papers.html", context)






def dashboardAddpaper(request):

    if "user_id" not in request.session:
        return redirect("customerlogin")

    customer = CustomerProfile.objects.get(
        id=request.session["user_id"]
    )

    newspapers = Newspaper.objects.all()

    # already subscribed newspaper ids
    subscribed_ids = list(
        PurchaseNewspaper.objects.filter(
            customer=customer
        ).values_list("newspaper_id", flat=True)
    )

    if request.method == "POST":
        selected_ids = list(
            map(int, request.POST.getlist("newspaper"))
        )

        # 🗑️ DELETE unselected newspapers
        PurchaseNewspaper.objects.filter(
            customer=customer
        ).exclude(
            newspaper_id__in=selected_ids
        ).delete()

        # ➕ ADD selected newspapers (if not exists)
        for paper_id in selected_ids:
            paper = Newspaper.objects.get(id=paper_id)

            PurchaseNewspaper.objects.get_or_create(
                customer=customer,
                newspaper=paper,
                defaults={
                    "start_date": timezone.now().date()
                }
            )

        return redirect("/dashboard/papers")

    return render(request, "customer/addpaper.html", {
        "newspapers": newspapers,
        "subscribed_ids": subscribed_ids
    })




def dashboardAddBooklet(request):

    if "user_id" not in request.session:
        return redirect("customerlogin")

    customer = CustomerProfile.objects.get(
        id=request.session["user_id"]
    )

    booklets = Booklet.objects.all()

    # already added booklet ids
    subscribed_ids = list(
        PurchaseBooklet.objects.filter(
            customer=customer
        ).values_list("booklet_id", flat=True)
    )

    if request.method == "POST":
        selected_ids = list(
            map(int, request.POST.getlist("booklet"))
        )

        # 🗑️ DELETE unselected booklets
        PurchaseBooklet.objects.filter(
            customer=customer
        ).exclude(
            booklet_id__in=selected_ids
        ).delete()

        # ➕ ADD selected booklets (if not exists)
        for booklet_id in selected_ids:
            booklet = Booklet.objects.get(id=booklet_id)

            PurchaseBooklet.objects.get_or_create(
                customer=customer,
                booklet=booklet,
                defaults={
                    "start_date": timezone.now().date()
                }
            )

        return redirect("/dashboard/papers")

    return render(request, "customer/addbooklets.html", {
        "booklets": booklets,
        "subscribed_ids": subscribed_ids
    })




def agentPaymentDashboard(request):

    # 🔐 customer login check
    if "user_id" not in request.session:
        return redirect("customerlogin")

    customer_id = request.session["user_id"]

    # 📦 DB se agent + paper data
    allotments = AllotedCustomer.objects.select_related(
        "agent", "customer"
    ).filter(
        customer_id=customer_id,
        is_active=True
    )

    agents_data = []

    for allot in allotments:
        agent = allot.agent

        agents_data.append({
            "agent": {
                "full_name": agent.full_name,
                "mobile": agent.mobile,
                "email": agent.email,
                "agency": agent.agency_name,
                "area": agent.district,
                "photo":agent.photo   # ya jo bhi area field ho
            },

            # 📰 papers & quantities (from DB)
            "papers": {
                "PB": allot.PB,
                "BH": allot.BH,
                "HT": allot.HT,
                "TIMES": allot.TIMES,
                "HINDU": allot.HINDU,
            },

            "allotted_on": allot.allotted_on.date(),
        })

    context = {
        "agents_data": agents_data
    }

    return render(
        request,
        "customer/agents.html",
        context
    )


def logout(request):
    request.session.flush()
    return redirect("/customerlogin")