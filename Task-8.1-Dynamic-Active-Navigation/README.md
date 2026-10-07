# TASK 8.1 — Dynamic Active Navigation Highlight

The master template uses:

`{% if active_page == 'home' %}active{% endif %}`

and equivalent conditions for About and Contact.

Each view passes its own `active_page` value so the current navigation item receives the active CSS class.
