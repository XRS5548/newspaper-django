from django.shortcuts import render , redirect

def home(request):
    return render(request,"home.html")


def IndexPage(request):
    return redirect("/index.html")

def custom_404(request, exception):
    return render(request, '404.html', status=404)