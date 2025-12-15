from django.db import models



from django.db import models

class AgentProfile(models.Model):
    # basic info
    full_name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=10)
    email = models.EmailField(unique=True)

    # address
    address = models.TextField()
    state = models.CharField(max_length=50)
    district = models.CharField(max_length=50)
    tehsil = models.CharField(max_length=50)
    village = models.CharField(max_length=50)
    pincode = models.CharField(max_length=6)

    # agency info
    agency_name = models.CharField(max_length=100)
    agency_phone = models.CharField(max_length=10)

    # personal
    age = models.PositiveIntegerField()
    gender = models.CharField(
        max_length=10,
        choices=[
            ('male', 'Male'),
            ('female', 'Female'),
            ('other', 'Other')
        ]
    )

    photo = models.ImageField(upload_to='agents/')
    password = models.CharField(max_length=150)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.full_name



class CustomerProfile(models.Model):

    agent = models.ForeignKey(
        AgentProfile,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="customers"
    )

    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    mobile = models.CharField(max_length=10)
    email = models.EmailField(unique=True)

    address = models.TextField()
    state = models.CharField(max_length=50)
    district = models.CharField(max_length=50)
    tehsil = models.CharField(max_length=50)
    village = models.CharField(max_length=50)
    pincode = models.CharField(max_length=6)

    age = models.PositiveIntegerField()
    gender = models.CharField(
        max_length=10,
        choices=[
            ('male', 'Male'),
            ('female', 'Female'),
            ('other', 'Other')
        ]
    )

    # 🔥 FIX HERE
    photo = models.ImageField(upload_to='')  
    password = models.CharField(max_length=150,default="")

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

