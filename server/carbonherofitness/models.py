from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Custom User Model with Profile Picture
class User(AbstractUser):
    carbon_footprint = models.FloatField(default=0)
    total_points = models.PositiveIntegerField(default=0)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    groups = models.ManyToManyField(Group, related_name='carbonhero_user_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='carbonhero_user_permissions', blank=True)
    # Additional fields as needed

class Activity(models.Model):
    name = models.CharField(max_length=255)
    average_emission = models.FloatField()  # in some unit, e.g., kg of CO2 per activity

class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    quantity = models.FloatField()  # e.g., number of miles driven, kWh of electricity, etc.
    emission = models.FloatField()  # calculated emission for this specific activity instance

class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reduction_target = models.FloatField()  # percentage or absolute value
    deadline = models.DateField()

class Challenge(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    points = models.PositiveIntegerField()
    challenge_image = models.ImageField(upload_to='challenge_images/', null=True, blank=True)  # Optional image for the challenge

class UserChallenge(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=100, choices=[('ONGOING', 'Ongoing'), ('COMPLETED', 'Completed')])

class Badge(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    points_required = models.PositiveIntegerField()

class Reward(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    partner_business = models.CharField(max_length=255)
    points_required = models.PositiveIntegerField()
    reward_image = models.ImageField(upload_to='reward_images/', null=True, blank=True)  # Optional image for the reward

class UserReward(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reward = models.ForeignKey(Reward, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Friend(models.Model):
    user = models.ForeignKey(User, related_name="requester", on_delete=models.CASCADE)
    friend = models.ForeignKey(User, related_name="approver", on_delete=models.CASCADE)

class Group(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    members = models.ManyToManyField(User)

class Content(models.Model):
    title = models.CharField(max_length=255)
    content_type = models.CharField(max_length=100, choices=[('ARTICLE', 'Article'), ('VIDEO', 'Video')])
    content_link = models.URLField()
    description = models.TextField()
    content_image = models.ImageField(upload_to='content_images/', null=True, blank=True)  # Optional image for the content

class OffsetProject(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    total_offset_available = models.FloatField()  # total offset capacity of the project
    total_offset_claimed = models.FloatField(default=0)  # offsets claimed through the app

class UserContribution(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(OffsetProject, on_delete=models.CASCADE)
    amount = models.FloatField()  # monetary contribution or other units
    offset_claimed = models.FloatField()  # amount of offset claimed for the contribution

# Add any additional model definitions, relationships, managers, and custom methods as needed.
