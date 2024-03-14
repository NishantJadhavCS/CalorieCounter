from django import forms
from .models import UserProfile

class AdditionalInfoForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['email', 'age', 'gender', 'height', 'weight']