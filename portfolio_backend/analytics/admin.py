from django.contrib import admin
from .models import VisitorLog, ContactMessage # Imported ContactMessage

# Your existing VisitorLogAdmin code stays right here...

# 🌟 NEW: Renders an elegant inbox grid for your portfolio text messages
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('timestamp', 'name', 'email', 'message')
    search_fields = ('name', 'email', 'message')
    ordering = ('-timestamp',) # Fresh messages always pop up on top
