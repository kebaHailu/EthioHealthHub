from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey


# Create your models here.
class Blog(models.Model):
    content_type=models.ForeignKey(ContentType,on_delete=models.CASCADE)
    object_id=models.PositiveBigIntegerField()
    doctor_id = GenericForeignKey()
    title = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField()
    blog_pic=models.CharField(max_length=255, null=True, blank=True)
    
class BlogComment(models.Model):
    blog_id = models.ForeignKey(Blog, on_delete=models.CASCADE)
    content = models.TextField()
    content_type=models.ForeignKey(ContentType,on_delete=models.CASCADE)
    object_id=models.PositiveBigIntegerField()
    user_id = GenericForeignKey()

class Testimonial(models.Model):
    content_type=models.ForeignKey(ContentType,on_delete=models.CASCADE)
    object_id=models.PositiveBigIntegerField()
    patient_id = GenericForeignKey()
    content = models.TextField()
    

