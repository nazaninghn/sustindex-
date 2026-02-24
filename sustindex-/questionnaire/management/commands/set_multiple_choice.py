from django.core.management.base import BaseCommand
from questionnaire.models import Question, Category


class Command(BaseCommand):
    help = 'Enable or disable multiple choice for questions'

    def add_arguments(self, parser):
        parser.add_argument(
            '--enable',
            action='store_true',
            help='Enable multiple choice',
        )
        parser.add_argument(
            '--disable',
            action='store_true',
            help='Disable multiple choice',
        )
        parser.add_argument(
            '--all',
            action='store_true',
            help='Apply to all questions',
        )
        parser.add_argument(
            '--category',
            type=str,
            help='Apply to specific category',
        )
        parser.add_argument(
            '--ids',
            type=str,
            help='Apply to specific question IDs (comma-separated)',
        )
        parser.add_argument(
            '--show',
            action='store_true',
            help='Show current status of all questions',
        )

    def handle(self, *args, **options):
        if options['show']:
            self.show_questions()
            return

        if not options['enable'] and not options['disable']:
            self.stdout.write(self.style.ERROR('Please specify --enable or --disable'))
            return

        value = options['enable']
        queryset = Question.objects.all()

        # Filter by category
        if options['category']:
            try:
                category = Category.objects.get(name__icontains=options['category'])
                queryset = queryset.filter(category=category)
                self.stdout.write(f"Filtering by category: {category.name}")
            except Category.DoesNotExist:
                self.stdout.write(self.style.ERROR(f"Category '{options['category']}' not found"))
                return

        # Filter by IDs
        if options['ids']:
            ids = [int(x.strip()) for x in options['ids'].split(',') if x.strip().isdigit()]
            queryset = queryset.filter(id__in=ids)
            self.stdout.write(f"Filtering by IDs: {ids}")

        # Apply changes
        count = queryset.update(allow_multiple=value)
        
        action = "enabled" if value else "disabled"
        self.stdout.write(
            self.style.SUCCESS(f'Successfully {action} multiple choice for {count} questions')
        )

    def show_questions(self):
        """Show all questions with their multiple choice status"""
        questions = Question.objects.all().order_by('category', 'order')
        
        self.stdout.write("\n" + "="*80)
        self.stdout.write("ALL QUESTIONS")
        self.stdout.write("="*80)
        
        current_category = None
        for q in questions:
            if current_category != q.category:
                current_category = q.category
                self.stdout.write(f"\n{current_category.name}")
                self.stdout.write("-" * 80)
            
            status = "✅ Multiple" if q.allow_multiple else "❌ Single"
            text = q.text[:60].replace('<p>', '').replace('</p>', '')
            self.stdout.write(f"  {q.id:3d}. {status} | {text}...")
