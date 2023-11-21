from rest_framework import serializers
from .models import (User, Activity, UserActivity, Goal, Challenge, UserChallenge, 
                     Badge, Reward, UserReward, Friend, Group, Content, OffsetProject, UserContribution)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'carbon_footprint', 'total_points', 'friends')  # and other relevant fields

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'

class UserActivitySerializer(serializers.ModelSerializer):
    activity = ActivitySerializer()
    
    class Meta:
        model = UserActivity
        fields = ('user', 'activity', 'date_recorded', 'carbon_emission')

class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Goal
        fields = '__all__'

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = '__all__'

class UserChallengeSerializer(serializers.ModelSerializer):
    challenge = ChallengeSerializer()
    
    class Meta:
        model = UserChallenge
        fields = ('user', 'challenge', 'status', 'date_joined')

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = '__all__'

class RewardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = '__all__'

class UserRewardSerializer(serializers.ModelSerializer):
    reward = RewardSerializer()

    class Meta:
        model = UserReward
        fields = ('user', 'reward', 'date_claimed')

class FriendSerializer(serializers.ModelSerializer):
    friend = UserSerializer()

    class Meta:
        model = Friend
        fields = ('user', 'friend', 'date_became_friends')

class GroupSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True)

    class Meta:
        model = Group
        fields = ('name', 'description', 'members')

class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = '__all__'

class OffsetProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = OffsetProject
        fields = '__all__'

class UserContributionSerializer(serializers.ModelSerializer):
    offset_project = OffsetProjectSerializer()

    class Meta:
        model = UserContribution
        fields = ('user', 'offset_project', 'amount_contributed', 'date_contributed')