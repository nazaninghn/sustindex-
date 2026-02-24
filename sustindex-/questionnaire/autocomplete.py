try:
    from dal import autocomplete
    DAL_AVAILABLE = True
except ImportError:
    DAL_AVAILABLE = False
    
from django.db.models import Q
from .models import Category


if DAL_AVAILABLE:
    class CategoryAutocomplete(autocomplete.Select2QuerySetView):
        """Autocomplete view for Category model"""
        
        def get_queryset(self):
            if not self.request.user.is_authenticated or not self.request.user.is_staff:
                return Category.objects.none()
            
            qs = Category.objects.all()
            
            if self.q:
                qs = qs.filter(
                    Q(name__icontains=self.q) |
                    Q(description__icontains=self.q)
                )
            
            qs = qs.order_by('order', 'name')
            
            return qs
else:
    # Fallback if dal is not available
    CategoryAutocomplete = None
