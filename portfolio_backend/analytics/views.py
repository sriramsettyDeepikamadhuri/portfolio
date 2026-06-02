import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import VisitorLog, ContactMessage # Imported the new model cleanly

class TrackVisitor(APIView):
    def post(self, request):
        # 1. Check if this request is a regular page track or an actual form submission
        is_form_submission = request.data.get('isForm', False)

        if is_form_submission:
            # Extract form inputs sent by React
            name = request.data.get('name', 'Anonymous')
            email = request.data.get('email', '')
            message = request.data.get('message', '')

            # Save the message text into your new database table
            ContactMessage.objects.create(
                name=name,
                email=email,
                message=message
            )
            return Response({"status": "message_saved"}, status=status.HTTP_201_CREATED)

        # 2. Otherwise, treat it as a standard scroll/click visitor log
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')

        lookup_ip = '8.8.8.8' if ip in ['127.0.0.1', 'localhost', '::1'] else ip
        user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown')
        page = request.data.get('page', 'Home')

        device = "Desktop"
        ua_lower = user_agent.lower()
        if "mobile" in ua_lower or "android" in ua_lower or "iphone" in ua_lower:
            device = "Mobile"
        elif "tablet" in ua_lower or "ipad" in ua_lower:
            device = "Tablet"

        country, city = "Unknown", "Unknown"
        try:
            response = requests.get(f"http://ip-api.com{lookup_ip}", timeout=3).json()
            if response.get('status') == 'success':
                country = response.get('country', 'Unknown')
                city = response.get('city', 'Unknown')
        except Exception:
            pass 

        VisitorLog.objects.create(
            ip_address=ip,
            user_agent=user_agent,
            page_viewed=page,
            device_type=device,
            country=country,
            city=city
        )
        return Response({"status": "logged"}, status=status.HTTP_201_CREATED)
