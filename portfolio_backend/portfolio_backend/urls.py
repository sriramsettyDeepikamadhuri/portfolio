from django.contrib import admin
from django.urls import path
from analytics.views import TrackVisitor

urlpatterns = [
    # 🌟 This MUST be exact. It routes 'http://127.0.0' cleanly
    path('admin/', admin.site.urls),
    
    # This handles your incoming React tracker payloads
    path('api/track/', TrackVisitor.as_view(), name='track_visitor'),
]
