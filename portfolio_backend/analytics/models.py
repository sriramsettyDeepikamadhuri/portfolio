from django.db import models

# 🌍 1. The original Visitor tracking table (RESTORED)
class VisitorLog(models.Model):
    ip_address = models.GenericIPAddressField()
    user_agent = models.CharField(max_length=255)
    page_viewed = models.CharField(max_length=255)
    country = models.CharField(max_length=100, default="Unknown")
    city = models.CharField(max_length=100, default="Unknown")
    device_type = models.CharField(max_length=100, default="Unknown")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.page_viewed} by {self.city}, {self.country} ({self.ip_address})"


# ✉️ 2. The brand new Contact messages table
class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
