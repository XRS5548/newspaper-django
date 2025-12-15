from django.db import models
from accounts.models import * 
from customer.models import * 

# Create your models here.
class AllotedCustomer(models.Model):
    agent = models.ForeignKey(
        AgentProfile,
        on_delete=models.CASCADE,
        related_name="alloted_customers"
    )
    customer = models.ForeignKey(
        CustomerProfile,
        on_delete=models.CASCADE,
        related_name="agent_allotments"
    )

    # paper quantities (direct & simple)
    PB = models.PositiveIntegerField(default=0)
    BH = models.PositiveIntegerField(default=0)
    HT = models.PositiveIntegerField(default=0)
    TIMES = models.PositiveIntegerField(default=0)
    HINDU = models.PositiveIntegerField(default=0)

    is_active = models.BooleanField(default=True)
    allotted_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer} → {self.agent}"
    

class ExtraDelivery(models.Model):
    delivery = models.ForeignKey(NewspaperDelivery, on_delete=models.CASCADE)
    newspaper = models.ForeignKey(Newspaper, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()