from django.db import models
from accounts.models import CustomerProfile, AgentProfile, HokerProfile
# Create your models here.
from django.utils import timezone


class Newspaper(models.Model):
    name = models.CharField(max_length=100)
    language = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name
    
class Booklet(models.Model):
    title = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title
    
class PurchaseNewspaper(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    newspaper = models.ForeignKey(Newspaper, on_delete=models.CASCADE)

    start_date = models.DateField()
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.customer} - {self.newspaper}"
    
class PurchaseBooklet(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    booklet = models.ForeignKey(Booklet, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)

    start_date = models.DateField(default=timezone.now())


    def __str__(self):
        return f"{self.customer} - {self.booklet}"




class AgentPayment(models.Model):
    agent = models.ForeignKey(AgentProfile, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    remarks = models.CharField(max_length=200, blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.agent} - {self.amount}"


class HokerPayment(models.Model):
    hoker = models.ForeignKey(HokerProfile, on_delete=models.CASCADE)
    agent = models.ForeignKey(AgentProfile, on_delete=models.CASCADE)

    amount = models.DecimalField(max_digits=8, decimal_places=2)
    remarks = models.CharField(max_length=200, blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.hoker} - ₹{self.amount}"

class HokerAttendance(models.Model):
    hoker = models.ForeignKey(HokerProfile, on_delete=models.CASCADE)
    date = models.DateField()

    is_present = models.BooleanField(default=True)
    half_time = models.BooleanField(default=False)   # 🟡 NEW
    remarks = models.CharField(max_length=200, blank=True)

    class Meta:
        unique_together = ('hoker', 'date')

    def __str__(self):
        if self.half_time:
            status = "Half Day"
        else:
            status = "Present" if self.is_present else "Absent"

        return f"{self.hoker} - {self.date} - {status}"
class AllotedHoker(models.Model):
    agent = models.ForeignKey(AgentProfile, on_delete=models.CASCADE)
    hoker = models.ForeignKey(HokerProfile, on_delete=models.CASCADE)

    is_active = models.BooleanField(default=True)
    allotted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.hoker} → {self.agent}"
