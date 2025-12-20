from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("about/", views.about, name="about"),
    path("blog/", views.blog, name="blog"),
    path("contact/", views.contact, name="contact"),
    path("development/", views.development, name="development"),
    path("digital/", views.digital, name="digital"),
    path("hmm/", views.hmm, name="hmm"),
    path("mobile/", views.mobile, name="mobile"),
    path("newfranchise/", views.newfranchise, name="newfranchise"),
    path("payment/", views.payment, name="payment"),
    path("powerpoint/", views.powerpoint, name="powerpoint"),
    path("search/", views.search, name="search"),
    path("seo/", views.seo, name="seo"),
    path("service/", views.service, name="service"),
    path("sign/", views.sign, name="sign"),
    path("sitemap/", views.sitemap, name="sitemap"),
    path("ux/", views.ux, name="ux"),
]
