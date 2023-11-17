from rest_framework import viewsets, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.core.files.storage import FileSystemStorage

from .models import (User, Activity, UserActivity, Goal, Challenge, UserChallenge, 
                     Badge, Reward, UserReward, Friend, Group, Content, OffsetProject, UserContribution)
from .serializers import (UserSerializer, ActivitySerializer, UserActivitySerializer, GoalSerializer, ChallengeSerializer,
                          UserChallengeSerializer, BadgeSerializer, RewardSerializer, UserRewardSerializer, FriendSerializer,
                          GroupSerializer, ContentSerializer, OffsetProjectSerializer, UserContributionSerializer)

# Activity Views
class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

class UserActivityViewSet(viewsets.ModelViewSet):
    queryset = UserActivity.objects.all()
    serializer_class = UserActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

# ... similarly for other models ...

# Goal Views
class GoalViewSet(viewsets.ModelViewSet):
    queryset = Goal.objects.all()
    serializer_class = GoalSerializer
    permission_classes = [permissions.IsAuthenticated]

# ... continue for other models ...

# Maybe a Dashboard view to aggregate data for a user
class DashboardView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = self.request.user
        data = {
            # Aggregate data for the user's dashboard
            'carbon_footprint': user.carbon_footprint,
            'total_points': user.total_points,
            # ... other relevant data
        }
        return Response(data)

class UploadProfilePictureView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        file_obj = request.data['file']
        fs = FileSystemStorage()
        filename = fs.save(file_obj.name, file_obj)
        uploaded_file_url = fs.url(filename)

        user = request.user
        user.profile_picture = filename
        user.save()

        return Response({'url': uploaded_file_url}, status=status.HTTP_201_CREATED)

# ... Rest of your views ...
