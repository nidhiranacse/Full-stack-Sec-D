from django import forms


class ContactForm(forms.Form):
    """
    Task 8.3: Professional Contact Us Form
    Validates user input parameters before forwarding them to server logs.
    """
    DEPARTMENT_CHOICES = [
        ('support', 'Technical Support & Development'),
        ('academic', 'Academic & Lab Feedback'),
        ('general', 'General Inquiry'),
        ('partnership', 'Collaboration & Partnership'),
    ]

    full_name = forms.CharField(
        max_length=100,
        min_length=2,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'e.g. Kartik Sharma'
        }),
        label="Full Name"
    )

    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-input',
            'placeholder': 'user@domain.com'
        }),
        label="Email Address"
    )

    department = forms.ChoiceField(
        choices=DEPARTMENT_CHOICES,
        required=True,
        widget=forms.Select(attrs={
            'class': 'form-input'
        }),
        label="Inquiry Category"
    )

    subject = forms.CharField(
        max_length=150,
        min_length=4,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-input',
            'placeholder': 'Subject of your message'
        }),
        label="Subject Line"
    )

    message = forms.CharField(
        min_length=10,
        max_length=2000,
        required=True,
        widget=forms.Textarea(attrs={
            'class': 'form-input textarea',
            'rows': 5,
            'placeholder': 'Please detail your feedback or inquiry here (minimum 10 characters)...'
        }),
        label="Feedback / Message Body"
    )

    def clean_message(self):
        message = self.cleaned_data.get('message', '').strip()
        if len(message) < 10:
            raise forms.ValidationError("Message must contain at least 10 meaningful characters.")
        return message
