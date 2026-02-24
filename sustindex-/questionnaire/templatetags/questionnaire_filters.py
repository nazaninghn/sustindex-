from django import template

register = template.Library()


@register.filter
def get(dictionary, key):
    """
    Template filter to get value from dictionary
    Usage: {{ my_dict|get:key }}
    """
    if dictionary is None:
        return None
    return dictionary.get(key)


@register.filter
def in_list(value, list_values):
    """
    Check if value is in list
    Usage: {% if choice.id|in_list:selected_choices %}
    """
    if list_values is None:
        return False
    return value in list_values
