from django.shortcuts import render, redirect
import requests
import json
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import authenticate, login
from .forms import AdditionalInfoForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def home(request):
    return render(request, 'home.html')


def userprofile(request):
    if request.method == "POST":
        logout(request)
        return redirect('home.html')
    else:
        return render(request, 'userprofile.html')


def additionalinfo(request):
    if request.method == "POST":
        form = AdditionalInfoForm(request.POST)
        if form.is_valid():
            user_profile = form.save(commit=False)
            user_profile.user = request.user
            user_profile.save()
            messages.success(request, 'Successfully signed up!')
            welcomeemail(user_profile)
            return redirect('login.html')
    else:
        form = AdditionalInfoForm()

    return render(request, 'additionalinfo.html', {'form': form})


def signup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(
                request, "Your account has been successfully created!")
            return redirect('additionalinfo.html')
        else:
            messages.error(
                request, "Error creating account. Please check the form.")
            print(form.errors)
    else:
        form = UserCreationForm()

    return render(request, 'signup.html', {'form': form})


def user_login(request):
    if request.method == "POST":
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(request, username=username, password=password)

            if user is not None:
                login(request, user)
                return redirect('home.html')
            else:
                messages.error(
                    request, "Invalid login credentials. Please try again.")
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})


def welcomeemail(user):
    subject = 'Welcome to HealthyYou!'
    html_message = render_to_string('welcomeemail.html', {'user': user})
    plain_message = strip_tags(html_message)
    from_email = 'healthyyou144@gmail.com'
    recipient_list = [user.email]
    send_mail(subject, plain_message, from_email,
              recipient_list, html_message=html_message)


@login_required(login_url='login.html')
def calorie(request):
    if request.method == 'POST':
        query = request.POST.get('query')
        api_url = 'https://api.api-ninjas.com/v1/nutrition?query='
        api_request = requests.get(
            api_url + query, headers={'X-Api-Key': 'b43aSNLjduQcsWaEDQZYuQ==jSapZRh9vZ3cup9l'})
        try:
            api = json.loads(api_request.content)
            print(api_request.content)
        
            if not api:
                api = "not_found"
                return render(request, 'calorie.html', {'api': api})

        except Exception as e:
            api = "error"
            print(e)
            return render(request, 'calorie.html', {'api': api})

        return render(request, 'calorie.html', {'api': api})
    else:
        return render(request, 'calorie.html', {'query': "Enter a valid query"})


@login_required(login_url='login.html')
def healthcalc(request):
    return render(request, 'healthcalc.html')


@login_required(login_url='login.html')
def exercise(request):
    if request.method == 'POST':
        muscle = request.POST.get('query1')
        api_url = 'https://api.api-ninjas.com/v1/exercises?muscle={}'.format(
            muscle)

        api_request = requests.get(api_url, params={'muscle': muscle}, headers={
                                   'X-Api-Key': 'b43aSNLjduQcsWaEDQZYuQ==jSapZRh9vZ3cup9l'})
        try:
            api = json.loads(api_request.content)
            print(api_request.content)
        except Exception as e:
            api = "There was an error!"
            print(e)
            return render(request, 'exercise.html', {'api': api})

        return render(request, 'exercise.html', {'api': api})
    else:
        return render(request, 'exercise.html', {'query': "Enter a valid query"})


@login_required(login_url='login.html')
def caloriesburned(request):
    if request.method == 'POST':
        activity_name = request.POST.get('activity')
        activity, name = activity_name.split('|')
        weight_kg = float(request.POST.get('weight'))
        weight = weight_kg * 2.20462
        duration = request.POST.get('duration')
        api_url = f'https://api.api-ninjas.com/v1/caloriesburned?activity={activity}&weight={weight}&duration={duration}'
        headers = {'X-Api-Key': 'b43aSNLjduQcsWaEDQZYuQ==jSapZRh9vZ3cup9l'}
        api_request = requests.get(api_url, headers=headers)
        try:
            api_data = json.loads(api_request.content)
            print(api_request.content)
        except Exception as e:
            api = "error"
            print(e)
            return render(request, 'caloriesburned.html', {'api': api})
        matching_entries = [
            entry for entry in api_data if entry['name'] == name]
        return render(request, 'caloriesburned.html', {'api': matching_entries})
    else:
        return render(request, 'caloriesburned.html', {'query': "Enter a valid query"})
