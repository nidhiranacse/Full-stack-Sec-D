# TASK 8.3 — Professional Contact Us Form

The Contact Us form:

- Uses POST.
- Includes `{% csrf_token %}`.
- Collects `name` and `message`.
- Strips whitespace from submitted values.
- Checks that both fields contain data.
- Logs valid feedback on the server.
- Uses Django messages for confirmation.
- Redirects back to the Contact page after successful submission.

The submitted message is not printed to the browser as a server response.
