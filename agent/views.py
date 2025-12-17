from django.shortcuts import render , redirect ,get_object_or_404
from django.http import HttpResponse
from accounts.models import * 

from .models import * 
from django.contrib import messages
from django.db.models import Sum
from agent.models import * 
from customer.models import *
from datetime import date
from django.contrib.auth.hashers import make_password
from datetime import date as today_date
from django.db import transaction
import calendar

# Create your views here.



def edit_agent_profile(request):

    # 🔐 Agent login check
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = get_object_or_404(AgentProfile, id=agent_id)

    if request.method == "POST":

        # 🧾 Basic Info
        agent.full_name = request.POST.get("full_name")
        agent.mobile = request.POST.get("mobile")
        agent.email = request.POST.get("email")

        # 📍 Address
        agent.address = request.POST.get("address")
        agent.state = request.POST.get("state")
        agent.district = request.POST.get("district")
        agent.tehsil = request.POST.get("tehsil")
        agent.village = request.POST.get("village")
        agent.pincode = request.POST.get("pincode")

        # 🏢 Agency Info
        agent.agency_name = request.POST.get("agency_name")
        agent.agency_phone = request.POST.get("agency_phone")

        # 👤 Personal
        agent.age = request.POST.get("age")
        agent.gender = request.POST.get("gender")

        # 🖼️ Photo update (optional)
        if request.FILES.get("photo"):
            agent.photo = request.FILES.get("photo")

        agent.save()

        messages.success(request, "Profile updated successfully")
        return redirect("agent_profile")  # ya agent_dashboard

    return render(request, "agent/edit_profile.html", {
        "agent": agent
    })






def agent_logout(request):
    request.session.flush()
    return redirect("/")



def ProfilePage(request):
    # login check
    if "agent_id" not in request.session:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    return render(request, "agent/profile.html", {
        "agent": agent
    })

def Agent_Customers(request):

    # 🔐 Agent login check
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = get_object_or_404(AgentProfile, id=agent_id)

    # 📋 Active allotted customers
    allotments = AllotedCustomer.objects.filter(
        agent=agent,
        is_active=True
    )

    customers = []

    for a in allotments:
        # 🔹 per customer extra (today)
        ex = (
            ExtraDelivery.objects.filter(
                delivery__customer=a.customer,
                delivery__date=date.today()
            )
            .aggregate(total=Sum("quantity"))
            .get("total") or 0
        )

        customers.append({
            "id": a.id,
            "customer": a.customer,
            "PB": a.PB,
            "BH": a.BH,
            "HT": a.HT,
            "TIMES": a.TIMES,
            "HINDU": a.HINDU,
            "EX": ex,   # 🔥 IMPORTANT
        })

    # 📊 Totals
    totals = allotments.aggregate(
        total_pb=Sum("PB"),
        total_bh=Sum("BH"),
        total_ht=Sum("HT"),
        total_times=Sum("TIMES"),
        total_hindu=Sum("HINDU"),
    )

    # 🧮 Total EX (agent-wise today)
    total_ex = sum(c["EX"] for c in customers)

    total_papers = (
        (totals["total_pb"] or 0) +
        (totals["total_bh"] or 0) +
        (totals["total_ht"] or 0) +
        (totals["total_times"] or 0) +
        (totals["total_hindu"] or 0) +
        total_ex
    )

    return render(request, "agent/customers.html", {
        "customers": customers,
        "totals": totals,
        "total_ex": total_ex,
        "total_papers": total_papers,
    })












# ✏️ Edit Alloted Customer
def edit_alloted_customer(request, id):

    # 🔐 Agent login check
    if "agent_id" not in request.session:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    # 🧾 Fetch record (agent safety check)
    allotment = get_object_or_404(
        AllotedCustomer,
        id=id,
        agent=agent
    )

    # 💾 Update record
    if request.method == "POST":
        allotment.PB = request.POST.get("PB", 0)
        allotment.BH = request.POST.get("BH", 0)
        allotment.HT = request.POST.get("HT", 0)
        allotment.TIMES = request.POST.get("TIMES", 0)
        allotment.HINDU = request.POST.get("HINDU", 0)
        allotment.is_active = True

        allotment.save()

        return redirect("/agent/customers")  # ya jahan se aaye ho

    context = {
        "allotment": allotment
    }

    return render(request, "agent/editcustomer.html", context)


# 🗑️ Delete Alloted Customer
def delete_alloted_customer(request, id):

    if "agent_id" not in request.session:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    allotment = get_object_or_404(
        AllotedCustomer,
        id=id,
        agent=agent
    )

    allotment.delete()

    return redirect("/agent/customers")



def add_alloted_customer(request):

    # 🔐 Agent login check
    if "agent_id" not in request.session:
        return redirect("/agentlogin")

    agent = get_object_or_404(
        AgentProfile,
        id=request.session["agent_id"]
    )

    # ✅ Customers jinke liye koi ACTIVE allotment nahi hai
    available_customers = CustomerProfile.objects.exclude(
        id__in=AllotedCustomer.objects.filter(
            is_active=True
        ).values_list("customer_id", flat=True)
    )

    # ➕ Add selected customers
    if request.method == "POST":
        selected_customers = request.POST.getlist("customers")

        for cust_id in selected_customers:
            customer = get_object_or_404(CustomerProfile, id=cust_id)

            # safety: double active entry na bane
            AllotedCustomer.objects.get_or_create(
                agent=agent,
                customer=customer,
                defaults={"is_active": True}
            )

        return redirect("/agent/customers")

    return render(
        request,
        "agent/addcustomer.html",
        {"customers": available_customers}
    )



def add_delivery(request):
    

    # 🔐 Agent login check
    if "agent_id" not in request.session:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    # 🧾 Sirf allotted customers
    alloted_customers = AllotedCustomer.objects.filter(
        agent=agent,
        is_active=True
    ).select_related("customer")

    newspapers = Newspaper.objects.all()

    if request.method == "POST":

        customer_id = request.POST.get("customer")
        delivery_date = request.POST.get("date")
        is_delivered = request.POST.get("is_delivered") == "on"
        remarks = request.POST.get("remarks", "")

        # 🔍 Customer & purchase fetch
        customer = AllotedCustomer.objects.get(
            id=customer_id,
            agent=agent
        ).customer

       

        # 📰 Main delivery entry
        delivery = NewspaperDelivery.objects.create(
            customer=customer,
            agent=agent,
            date=delivery_date,
            is_delivered=is_delivered,
            remarks=remarks
        )

        # ➕ Extra delivery (optional)
        extra_paper = request.POST.get("extra_newspaper")
        extra_qty = request.POST.get("extra_quantity")

        if extra_paper and extra_qty:
            ExtraDelivery.objects.create(
                delivery=delivery,
                newspaper_id=extra_paper,
                quantity=int(extra_qty)
            )

        return redirect("/agent/delevery")

    context = {
        "alloted_customers": alloted_customers,
        "newspapers": newspapers,
        "today": date.today()
    }

    return render(request, "agent/adddelivery.html", context)




def agent_hokers(request):

    # 🔐 Agent login check
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    try:
        agent = AgentProfile.objects.get(id=agent_id)
    except AgentProfile.DoesNotExist:
        request.session.flush()
        return redirect("/agentlogin")

    # 📋 Hokers allotted to this agent
    hokers = (
        AllotedHoker.objects
        .select_related("hoker")
        .filter(agent=agent)
        .order_by("-is_active", "hoker__full_name")
    )

    context = {
        "hokers": hokers
    }

    return render(request, "agent/hokers.html", context)



def add_hoker(request):

    # 🔐 Agent login check
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    try:
        agent = AgentProfile.objects.get(id=agent_id)
    except AgentProfile.DoesNotExist:
        request.session.flush()
        return redirect("/agentlogin")

    if request.method == "POST":
        data = request.POST
        files = request.FILES

        # 🛑 Required fields validation
        required_fields = [
            "full_name", "mobile", "password",
            "address", "state", "district",
            "tehsil", "village", "pincode",
            "age", "gender"
        ]

        for field in required_fields:
            if not data.get(field):
                messages.error(request, "All required fields must be filled.")
                return redirect("add_hoker")

        # 📱 Mobile validation
        if not data["mobile"].isdigit() or len(data["mobile"]) != 10:
            messages.error(request, "Invalid mobile number.")
            return redirect("add_hoker")

        # 🔐 Password length
        if len(data["password"]) < 4:
            messages.error(request, "Password must be at least 6 characters.")
            return redirect("add_hoker")

        # 🔁 Duplicate checks
        if HokerProfile.objects.filter(mobile=data["mobile"]).exists():
            messages.error(request, "Hoker with this mobile already exists.")
            return redirect("add_hoker")

        if data.get("email") and HokerProfile.objects.filter(email=data["email"]).exists():
            messages.error(request, "Email already in use.")
            return redirect("add_hoker")

        try:
            with transaction.atomic():

                # 👤 Create Hoker
                hoker = HokerProfile.objects.create(
                    full_name=data["full_name"],
                    mobile=data["mobile"],
                    email=data.get("email", ""),
                    address=data["address"],
                    state=data["state"],
                    district=data["district"],
                    tehsil=data["tehsil"],
                    village=data["village"],
                    pincode=data["pincode"],
                    age=data["age"],
                    gender=data["gender"],
                    photo=files.get("photo"),
                    password=make_password(data["password"])
                )

                # 🔗 Auto allot hoker to agent
                AllotedHoker.objects.create(
                    agent=agent,
                    hoker=hoker,
                    is_active=True
                )

        except Exception:
            messages.error(request, "Something went wrong. Please try again.")
            return redirect("add_hoker")

        messages.success(request, "Hoker added successfully.")
        return redirect("/agent/hockers/add/")

    return render(request, "agent/add_hoker.html")







def hoker_attendance_calendar(request, hoker_id):

    # 🔐 Agent login
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.filter(id=agent_id).first()
    if not agent:
        return redirect("/agentlogin")

    # 🔒 Hoker belongs to agent
    if not AllotedHoker.objects.filter(
        agent=agent,
        hoker_id=hoker_id,
        is_active=True
    ).exists():
        return redirect("agent_hokers")

    hoker = HokerProfile.objects.get(id=hoker_id)

    # 📅 Month & Year
    today = date.today()
    year = int(request.GET.get("year", today.year))
    month = int(request.GET.get("month", today.month))

    # 🔁 Month overflow handling
    if month < 1:
        month = 12
        year -= 1
    elif month > 12:
        month = 1
        year += 1

    # 🗓️ Calendar structure
    calendar_data = calendar.monthcalendar(year, month)

    # 📊 Attendance queryset
    attendance_qs = HokerAttendance.objects.filter(
        hoker=hoker,
        date__year=year,
        date__month=month
    )

    # 🎯 Attendance buckets (TEMPLATE FRIENDLY)
    full_days = []
    half_days = []
    absent_days = []

    for att in attendance_qs:
        if att.is_present and att.half_time:
            half_days.append(att.date.day)
        elif att.is_present:
            full_days.append(att.date.day)
        else:
            absent_days.append(att.date.day)

    context = {
        "hoker": hoker,
        "calendar": calendar_data,
        "full_days": full_days,
        "half_days": half_days,
        "absent_days": absent_days,
        "month": month,
        "year": year,
        "prev_month": month - 1,
        "next_month": month + 1,
    }

    return render(request, "agent/hoker_attendance.html", context)

def add_hoker_attendance(request, hoker_id):

    # 🔐 Agent login
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.filter(id=agent_id).first()
    if not agent:
        return redirect("/agentlogin")

    # 🔒 Hoker belongs to agent
    if not AllotedHoker.objects.filter(agent=agent, hoker_id=hoker_id).exists():
        return redirect("agent_hokers")

    hoker = HokerProfile.objects.get(id=hoker_id)

    # 📅 Month / Year (for redirect back)
    month = int(request.GET.get("month", today_date.today().month))
    year = int(request.GET.get("year", today_date.today().year))

    if request.method == "POST":
        att_date = request.POST.get("date")
        status = request.POST.get("status")
        remarks = request.POST.get("remarks", "")

        if not att_date or not status:
            messages.error(request, "Date and status are required.")
            return redirect(request.path)

        # 🚫 Future date block
        if att_date > str(today_date.today()):
            messages.error(request, "Future date attendance is not allowed.")
            return redirect(request.path)

        # 🔄 Create or Update attendance
        attendance, created = HokerAttendance.objects.get_or_create(
            hoker=hoker,
            date=att_date
        )

        if status == "present":
            attendance.is_present = True
            attendance.half_time = False

        elif status == "half":
            attendance.is_present = True
            attendance.half_time = True

        elif status == "absent":
            attendance.is_present = False
            attendance.half_time = False

        attendance.remarks = remarks
        attendance.save()

        if created:
            messages.success(request, "Attendance added successfully.")
        else:
            messages.success(request, "Attendance updated successfully.")

        return redirect(
            f"/agent/hockers/{hoker.id}/attendance/?month={month}&year={year}"
        )

    return render(request, "agent/add_hoker_attendance.html", {
        "hoker": hoker,
        "month": month,
        "year": year,
    })



def hoker_profile(request, hoker_id):

    # 🔐 Agent login check
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.filter(id=agent_id).first()
    if not agent:
        return redirect("/agentlogin")

    # 🔒 Check hoker belongs to this agent
    if not AllotedHoker.objects.filter(
        agent=agent,
        hoker_id=hoker_id,
        is_active=True
    ).exists():
        return redirect("agent_hokers")

    # 📄 Hoker profile
    hoker = HokerProfile.objects.filter(id=hoker_id).first()
    if not hoker:
        return redirect("agent_hokers")

    return render(request, "agent/hoker_profile.html", {
        "hoker": hoker
    })






def edit_hoker_profile(request, hoker_id):

    # 🔐 Agent login check
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.filter(id=agent_id).first()
    if not agent:
        return redirect("/agentlogin")

    # 🔒 Check hoker belongs to this agent
    if not AllotedHoker.objects.filter(
        agent=agent,
        hoker_id=hoker_id,
        is_active=True
    ).exists():
        return redirect("agent_hokers")

    hoker = HokerProfile.objects.filter(id=hoker_id).first()
    if not hoker:
        return redirect("agent_hokers")

    if request.method == "POST":
        hoker.full_name = request.POST.get("full_name")
        hoker.mobile = request.POST.get("mobile")
        hoker.email = request.POST.get("email")
        hoker.age = request.POST.get("age")
        hoker.gender = request.POST.get("gender")

        hoker.address = request.POST.get("address")
        hoker.state = request.POST.get("state")
        hoker.district = request.POST.get("district")
        hoker.tehsil = request.POST.get("tehsil")
        hoker.village = request.POST.get("village")
        hoker.pincode = request.POST.get("pincode")

        # 📷 Photo update (optional)
        if request.FILES.get("photo"):
            hoker.photo = request.FILES["photo"]

        hoker.save()
        messages.success(request, "Hoker profile updated successfully.")

        return redirect(f"/agent/hockers/{hoker.id}/profile/")

    return render(request, "agent/edit_hoker_profile.html", {
        "hoker": hoker
    })



def hoker_payments(request, hoker_id):

    # 🔐 Agent login
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.filter(id=agent_id).first()
    if not agent:
        return redirect("/agentlogin")

    # 🔒 Check hoker belongs to this agent
    if not AllotedHoker.objects.filter(
        agent=agent,
        hoker_id=hoker_id,
        is_active=True
    ).exists():
        return redirect("agent_hokers")

    hoker = HokerProfile.objects.filter(id=hoker_id).first()
    if not hoker:
        return redirect("agent_hokers")

    # 💰 Payments of this hoker
    payments = HokerPayment.objects.filter(
        hoker=hoker,
        agent=agent
    ).order_by("-date")

    # 📊 Total paid amount
    total_paid = payments.aggregate(
        total=Sum("amount")
    )["total"] or 0

    context = {
        "hoker": hoker,
        "payments": payments,
        "total_paid": total_paid,
    }

    return render(request, "agent/hoker_payments.html", context)




def add_hoker_payment(request, hoker_id):

    # 🔐 Agent login
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.filter(id=agent_id).first()
    if not agent:
        return redirect("/agentlogin")

    # 🔒 Check hoker belongs to this agent
    if not AllotedHoker.objects.filter(
        agent=agent,
        hoker_id=hoker_id,
        is_active=True
    ).exists():
        return redirect("agent_hokers")

    hoker = HokerProfile.objects.filter(id=hoker_id).first()
    if not hoker:
        return redirect("agent_hokers")

    if request.method == "POST":
        amount = request.POST.get("amount")
        remarks = request.POST.get("remarks", "")

        if not amount:
            messages.error(request, "Amount is required.")
            return redirect(request.path)

        # 💰 Save payment
        HokerPayment.objects.create(
            hoker=hoker,
            agent=agent,
            amount=amount,
            remarks=remarks,
            date=date.today()
        )

        messages.success(request, "Payment added successfully.")

        return redirect(f"/agent/hockers/{hoker.id}/payments/")

    return render(request, "agent/add_hoker_payment.html", {
        "hoker": hoker
    })




def all_hoker_payments(request):

    # 🔐 Agent login check
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.filter(id=agent_id).first()
    if not agent:
        return redirect("/agentlogin")

    # 💰 All payments done by this agent
    payments = HokerPayment.objects.filter(
        agent=agent
    ).select_related("hoker").order_by("-date")

    # 📊 Total amount paid by agent
    total_paid = payments.aggregate(
        total=Sum("amount")
    )["total"] or 0

    context = {
        "payments": payments,
        "total_paid": total_paid,
    }

    return render(request, "agent/all_payments.html", context)





def all_deliveries(request):

    # 🔐 Agent login check
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.filter(id=agent_id).first()
    if not agent:
        return redirect("/agentlogin")

    # 🔒 Agent ke hokers
    hoker_ids = AllotedHoker.objects.filter(
        agent=agent,
        is_active=True
    ).values_list("hoker_id", flat=True)

    # 📦 All deliveries of agent hokers
    deliveries = HokerDelivery.objects.filter(
        hoker_id__in=hoker_ids
    ).select_related("hoker", "customer").order_by("-date")

    context = {
        "deliveries": deliveries,
    }

    return render(request, "agent/all_deliveries.html", context)


def add_delivery_record(request, customer_id):

    # 🔐 Agent login check
    agent_id = request.session.get("agent_id")
    if not agent_id:
        return redirect("/agentlogin")

    agent = get_object_or_404(AgentProfile, id=agent_id)

    # 🔒 Customer belongs to this agent?
    allotment = AllotedCustomer.objects.filter(
        agent=agent,
        customer_id=customer_id,
        is_active=True
    ).first()

    if not allotment:
        messages.error(request, "Unauthorized customer access")
        return redirect("agent_deliveries")

    customer = allotment.customer

    # ✅ Hokers allotted to this agent
    hokers = HokerProfile.objects.filter(
        id__in=AllotedHoker.objects.filter(
            agent=agent,
            is_active=True
        ).values_list("hoker_id", flat=True)
    )

    newspapers = Newspaper.objects.all()

    # ================= POST =================
    if request.method == "POST":

        delivery_date = request.POST.get("date")
        hoker_id = request.POST.get("hoker")
        status = request.POST.get("status")
        remarks = request.POST.get("remarks", "")

        newspaper_present = request.POST.get("newspaper") == "yes"
        booklet_present = request.POST.get("booklet") == "yes"

        if not delivery_date or not hoker_id:
            messages.error(request, "Date and hoker are required")
            return redirect(request.path)

        hoker = get_object_or_404(HokerProfile, id=hoker_id)

        # 🔍 CHECK: delivery already exists?
        delivery = HokerDelivery.objects.filter(
            customer=customer,
            date=delivery_date
        ).first()

        if delivery:
            # ✅ UPDATE existing delivery
            delivery.hoker = hoker
            delivery.is_delivered = (status == "delivered")
            delivery.newspaper_present = newspaper_present
            delivery.booklet_present = booklet_present
            delivery.remarks = remarks
            delivery.save()
        else:
            # ➕ CREATE new delivery
            delivery = HokerDelivery.objects.create(
                customer=customer,
                date=delivery_date,
                hoker=hoker,
                is_delivered=(status == "delivered"),
                newspaper_present=newspaper_present,
                booklet_present=booklet_present,
                remarks=remarks,
            )

        # ================= EXTRA DELIVERY LOGIC =================
        
        print(request.POST)


        for paper in newspapers:
            qty = request.POST.get(f"extra_{paper.id}", "0")

            try:
                qty = int(qty)
            except ValueError:
                qty = 0

            # 🔍 check existing extra entry
            extra = ExtraDelivery.objects.filter(
                delivery=delivery,
                newspaper=paper
            ).first()

            if qty > 0:
                if extra:
                    # ✏️ update quantity
                    extra.quantity = qty
                    extra.save()
                else:
                    # ➕ create new extra
                    ExtraDelivery.objects.create(
                        delivery=delivery,
                        newspaper=paper,
                        quantity=qty
                    )
            else:
                # 🗑️ remove extra if qty = 0
                if extra:
                    extra.delete()

        messages.success(
            request,
            "Delivery record updated successfully (date-wise)"
        )
        return redirect("agent_deliveries")

    # ================= GET =================
    return render(request, "agent/add_delivery.html", {
        "customer": customer,
        "hokers": hokers,
        "newspapers": newspapers,
        "today": date.today(),
    })





def agent_all_bills(request):

    # 🔐 Agent login check
    if "agent_id" not in request.session:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.get(
        id=request.session["agent_id"]
    )

    # 📄 All bills generated by this agent
    bills = MonthlyBill.objects.filter(
        agent=agent
    ).select_related("customer").order_by("-year", "-month")

    # 📊 Summary (optional but useful)
    total_bills = bills.count()

    total_amount = sum(
        bill.total_amount for bill in bills
    )

    paid_amount = sum(
        bill.total_amount for bill in bills if bill.is_paid
    )

    pending_amount = total_amount - paid_amount

    context = {
        "bills": bills,

        # summary
        "total_bills": total_bills,
        "total_amount": total_amount,
        "paid_amount": paid_amount,
        "pending_amount": pending_amount,
    }

    return render(
        request,
        "agent/all_bills.html",
        context
    )





def agent_create_bill(request):

    if "agent_id" not in request.session:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    customers = CustomerProfile.objects.filter(
        agent_allotments__agent=agent,
        agent_allotments__is_active=True
    ).distinct()

    today = date.today()
    months = list(range(1, 13))

    if request.method == "POST":
        customer_id = request.POST.get("customer")
        month = int(request.POST.get("month"))
        year = int(request.POST.get("year"))
        last_submit_date = request.POST.get("last_submit_date")

        customer = CustomerProfile.objects.get(id=customer_id)

        # ❌ Duplicate bill block
        if MonthlyBill.objects.filter(
            customer=customer,
            month=month,
            year=year
        ).exists():
            return redirect("agent_all_bills")

        # ================== STEP 1: PER DAY PRICE ==================
        purchases = PurchaseNewspaper.objects.filter(
            customer=customer,
            is_active=True
        ).select_related("newspaper")

        price_per_day = sum(p.newspaper.price for p in purchases)

        # ================== STEP 2: DELIVERED DAYS ==================
        deliveries = HokerDelivery.objects.filter(
            customer=customer,
            date__year=year,
            date__month=month,
            is_delivered=True
        )

        days_on_delivery = sorted(
            list(set(d.date.day for d in deliveries))
        )

        total_delivery_days = len(days_on_delivery)

        # ================== STEP 3: EXTRA DELIVERIES ==================
        extras = ExtraDelivery.objects.filter(
            delivery__in=deliveries
        )

        extra_quantity = extras.aggregate(
            total=Sum("quantity")
        )["total"] or 0

        # ================== STEP 4: PAYMENT CALCULATION ==================
        base_amount = total_delivery_days * price_per_day
        extra_amount = extra_quantity * price_per_day

        total_amount = base_amount + extra_amount

        # ================== STEP 5: SAVE BILL ==================
        MonthlyBill.objects.create(
            customer=customer,
            agent=agent,
            month=month,
            year=year,
            days_on_delivery=days_on_delivery,
            total_delivery_days=total_delivery_days,
            base_amount=base_amount,
            late_charges=0,
            total_amount=total_amount,
            last_submit_date=last_submit_date
        )

        return redirect("agent_all_bills")

    context = {
        "customers": customers,
        "months": months,
        "current_month": today.month,
        "current_year": today.year,
    }

    return render(request, "agent/create_bill.html", context)


def agent_edit_bill(request, bill_id):

    # 🔐 Agent login check
    if "agent_id" not in request.session:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    bill = get_object_or_404(
        MonthlyBill,
        id=bill_id,
        agent=agent
    )

    if request.method == "POST":
        bill.base_amount = request.POST.get("base_amount")
        bill.late_charges = request.POST.get("late_charges")
        bill.total_amount = request.POST.get("total_amount")
        bill.last_submit_date = request.POST.get("last_submit_date")

        # Paid / Unpaid
        bill.is_paid = True if request.POST.get("is_paid") == "on" else False

        bill.save()
        return redirect("agent_all_bills")

    context = {
        "bill": bill
    }

    return render(request, "agent/edit_bill.html", context)


def agent_delete_bill(request, bill_id):

    if "agent_id" not in request.session:
        return redirect("/agentlogin")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    bill = get_object_or_404(
        MonthlyBill,
        id=bill_id,
        agent=agent
    )

    bill.delete()
    return redirect("agent_all_bills")

