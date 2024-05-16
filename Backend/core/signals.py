# # health/signals.py
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import Patient, ClinicalRecord

# @receiver(post_save, sender=Patient)
# def create_clinical_record(sender, instance, created, **kwargs):
#     if created:
#         ClinicalRecord.objects.create(patient=instance)
