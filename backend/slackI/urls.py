from django.urls import path

from .views import CreateTokenApiView, GetConversationApiView

urlpatterns = [
    path('tokens/', CreateTokenApiView.as_view(), name="home"),
    path('conversation/', GetConversationApiView.as_view(), name='conversation')
]
