
from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('signup.html', views.signup, name='signup'),
    path('login.html', views.user_login, name='login'),
    path('home.html', views.home, name='home'),
    path('calorie.html', views.calorie, name='calorie'),
    path('healthcalc.html', views.healthcalc, name='healthcalc'),
    path('caloriesburned.html', views.caloriesburned, name='caloriesburned'),
    path('exercise.html', views.exercise, name='exercise'),
    path('additionalinfo.html', views.additionalinfo, name='additionalinfo'),
    path('userprofile.html', views.userprofile, name='userprofile'),
    path('welcomeemail.html', views.welcomeemail, name='welcomeemail'),
]
