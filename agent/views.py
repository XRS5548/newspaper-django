from django.shortcuts import render , redirect ,get_object_or_404
from django.http import HttpResponse
from accounts.models import * 

from .models import * 

from django.db.models import Sum
from datetime import date


# Create your views here.




def ProfilePage(request):
    # login check
    if "agent_id" not in request.session:
        return redirect("agent_login")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    return render(request, "agent/profile.html", {
        "agent": agent
    })



def agent_attendance(request):

    # 🔐 Agent login check
    if "agent_id" not in request.session:
        return redirect("agentlogin")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    # 📋 Allotted customers of this agent
    customers = AllotedCustomer.objects.filter(
        agent=agent,
        is_active=True
    )

    # 📊 Totals (bottom summary table)
    totals = customers.aggregate(
        total_pb=Sum("PB"),
        total_bh=Sum("BH"),
        total_ht=Sum("HT"),
        total_times=Sum("TIMES"),
        total_hindu=Sum("HINDU"),
    )

    # 🧮 Extra papers (EX)
    total_ex = ExtraDelivery.objects.filter(
    delivery__agent=agent,
    delivery__date=date.today()
).aggregate(
    total_ex=Sum("quantity")
)["total_ex"] or 0

    total_papers = (
        (totals["total_pb"] or 0) +
        (totals["total_bh"] or 0) +
        (totals["total_ht"] or 0) +
        (totals["total_times"] or 0) +
        (totals["total_hindu"] or 0) +
        total_ex
    )

    context = {
        "customers": customers,
        "totals": totals,
        "total_ex": total_ex,
        "total_papers": total_papers,
    }

    return render(request, "agent/attendance.html", context)



def agent_deliveries(request):

    # 🔐 Agent login check
    if "agent_id" not in request.session:
        return redirect("agentlogin")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    # 📦 All deliveries of this agent (latest first)
    deliveries = NewspaperDelivery.objects.filter(
        agent=agent
    ).select_related(
        "customer",
    ).order_by("-date")

    context = {
        "agent": agent,
        "deliveries": deliveries,
    }

    return render(request, "agent/deleverys.html", context)












# ✏️ Edit Alloted Customer
def edit_alloted_customer(request, id):

    # 🔐 Agent login check
    if "agent_id" not in request.session:
        return redirect("agentlogin")

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
        return redirect("agentlogin")

    agent = AgentProfile.objects.get(id=request.session["agent_id"])

    # 🧾 Customers jinka agent allot nahi hua
    # (jin ki AllotedCustomer me entry nahi hai)
    available_customers = CustomerProfile.objects.exclude(
        agent_allotments__is_active=True
    )

    # ➕ Add selected customers
    if request.method == "POST":
        selected_customers = request.POST.getlist("customers")

        for cust_id in selected_customers:
            customer = CustomerProfile.objects.get(id=cust_id)

            # safety: double entry na ho
            if not AllotedCustomer.objects.filter(
                customer=customer,
                is_active=True
            ).exists():
                AllotedCustomer.objects.create(
                    agent=agent,
                    customer=customer
                )

        return redirect("/agent/customers")

    context = {
        "customers": available_customers
    }

    return render(request, "agent/addcustomer.html", context)




def add_delivery(request):

    # 🔐 Agent login check
    if "agent_id" not in request.session:
        return redirect("agentlogin")

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