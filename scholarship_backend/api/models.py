from django.db import models
from django.contrib.auth.models import User

class Scholarship(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    eligibility = models.TextField()
    deadline = models.DateField()
    funding_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.title

class Application(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE)
    scholarship = models.ForeignKey(Scholarship, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="Pending")
    submitted_at = models.DateTimeField(auto_now_add=True)
    transcript = models.FileField(upload_to='transcripts/')
    recommendation_letter = models.FileField(upload_to='recommendation_letters/')

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['student', 'scholarship'], name='unique_student_scholarship')
        ]

    def __str__(self):
        return f"{self.student.username} - {self.scholarship.title}"