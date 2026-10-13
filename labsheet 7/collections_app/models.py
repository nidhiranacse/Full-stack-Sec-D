from django.db import models


class Fruit(models.Model):
    """
    Unordered item matrix representing fruits collection.
    """
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    season = models.CharField(max_length=50)
    nutritional_benefit = models.CharField(max_length=200)
    in_stock = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Fruit"
        verbose_name_plural = "Fruits"

    def __str__(self):
        return f"{self.name} ({self.category})"


class EventStudent(models.Model):
    """
    Ordered indices collection representing selected event students.
    """
    student_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=120)
    email = models.EmailField()
    event_name = models.CharField(max_length=100)
    registration_rank = models.PositiveIntegerField(
        help_text="Ordered priority index"
    )
    score = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=20,
        choices=[
            ('Confirmed', 'Confirmed'),
            ('Shortlisted', 'Shortlisted'),
            ('Pending', 'Pending')
        ],
        default='Confirmed'
    )
    registered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['registration_rank']
        verbose_name = "Selected Event Student"
        verbose_name_plural = "Selected Event Students"

    def __str__(self):
        return f"#{self.registration_rank} - {self.name} ({self.student_id})"
