from django.shortcuts import render

def index(request):
    return render(request, "website/index.html")

def about(request):
    return render(request, "website/about.html")

def blog(request):
    return render(request, "website/blog.html")

def contact(request):
    return render(request, "website/contact.html")

def development(request):
    return render(request, "website/development.html")

def digital(request):
    return render(request, "website/digital.html")

def hmm(request):
    return render(request, "website/HMM.html")

def mobile(request):
    return render(request, "website/mobile.html")

def newfranchise(request):
    return render(request, "website/newfranchise.html")

def payment(request):
    return render(request, "website/payment.html")

def powerpoint(request):
    return render(request, "website/powerpoint.html")

def search(request):
    return render(request, "website/search.html")

def seo(request):
    return render(request, "website/seo.html")

def service(request):
    return render(request, "website/service.html")

def sign(request):
    return render(request, "website/sign.html")

def sitemap(request):
    return render(request, "website/sitemap.html")

def ux(request):
    return render(request, "website/ux.html")
