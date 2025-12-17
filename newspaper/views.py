from django.shortcuts import render , redirect

def home(request):
    return render(request,"home.html")


def IndexPage(request):
    return redirect("/index.html")