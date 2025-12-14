from django.db import models
from accounts.models import CustomerProfile, AgentProfile
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

class NewspaperDelivery(models.Model):
    customer = models.ForeignKey(CustomerProfile, on_delete=models.CASCADE)
    agent = models.ForeignKey(AgentProfile, on_delete=models.SET_NULL, null=True)
    purchase = models.ForeignKey(PurchaseNewspaper, on_delete=models.CASCADE)

    date = models.DateField()
    is_delivered = models.BooleanField(default=False)

    remarks = models.CharField(max_length=200, blank=True)

    def __str__(self):
        status = "Delivered" if self.is_delivered else "Not Delivered"
        return f"{self.customer} - {self.date} - {status}"




class AgentPayment(models.Model):
    agent = models.ForeignKey(AgentProfile, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    remarks = models.CharField(max_length=200, blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.agent} - {self.amount}"
