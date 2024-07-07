from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views import *

urlpatterns = [

    path('register/', RegistrationView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', AuthenticationView.as_view()),    
    path('users/', FetchUsers.as_view()),    
    path('edit_user/', EditProfile.as_view()),    


]

urlpatterns = format_suffix_patterns(urlpatterns)