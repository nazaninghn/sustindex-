from dal import autocomplete
from django.db.models import Q
from .models import Category


class CategoryAutocomplete(autocomplete.Select2QuerySetView):
    """Autocomplete view for Category model"""
    
    def get_queryset(self):
        # امنیت: فقط کاربران احراز هویت شده و staff
        if not self.request.user.is_authenticated or not self.request.user.is_staff:
            return Category.objects.none()
        
        qs = Category.objects.all()
        
        # فیلتر بر اساس جستجوی کاربر
        if self.q:
            qs = qs.filter(
                Q(name__icontains=self.q) |
                Q(description__icontains=self.q)
            )
        
        # فقط دسته‌بندی‌های فعال
        qs = qs.order_by('order', 'name')
        
        return qs
