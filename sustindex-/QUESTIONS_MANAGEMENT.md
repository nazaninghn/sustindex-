# 📝 Questions Management Guide for Render Deployment

## 🎯 How to Add Questions in Render

### Method 1: Admin Panel (Recommended for Live Site)

**Step 1: Access Admin Panel**
```
URL: https://your-app-name.onrender.com/en/admin/
Username: admin
Password: admin123
```

**Step 2: Add Categories**
1. Go to **"Categories"** section
2. Click **"Add Category"**
3. Fill in:
   - **Name**: Category name (e.g., "Technology")
   - **Description**: Brief description
   - **Order**: Display order (1, 2, 3...)
4. Click **"Save"**

**Step 3: Add Questions**
1. Go to **"Questions"** section
2. Click **"Add Question"**
3. Fill in:
   - **Category**: Select from dropdown
   - **Text**: Your question text
   - **Order**: Question order within category
   - **Active**: Check this box
4. In the **"Choices"** section (inline):
   - **Text**: Answer option text
   - **Score**: Points for this choice (0-10)
   - **Order**: Display order of choices
5. Add 3-5 choices per question
6. Click **"Save"**

### Method 2: Database Scripts (For Bulk Addition)

**Option A: Update setup.py (Before Deployment)**
- Modify `setup.py` with new questions
- Redeploy to Render
- Questions will be added automatically

**Option B: Run add_questions.py (After Deployment)**
```bash
# In Render console or local environment connected to production DB
python add_questions.py
```

### Method 3: Django Shell (Advanced Users)

**Access Django Shell in Render:**
1. Go to Render Dashboard
2. Select your service
3. Go to "Shell" tab
4. Run: `python manage.py shell`

**Add questions via shell:**
```python
from questionnaire.models import Category, Question, Choice

# Create category
cat = Category.objects.create(
    name="New Category",
    description="Description here",
    order=5
)

# Create question
q = Question.objects.create(
    category=cat,
    text="Your question here?",
    order=1,
    is_active=True
)

# Add choices
Choice.objects.create(question=q, text="Option 1", score=10, order=1)
Choice.objects.create(question=q, text="Option 2", score=5, order=2)
Choice.objects.create(question=q, text="Option 3", score=0, order=3)
```

## 📊 Question Categories & Scoring

### Recommended Categories:
1. **Environment** (Environmental Impact)
2. **Social Responsibility** (Social Impact)
3. **Corporate Governance** (Management & Ethics)
4. **Economic Sustainability** (Financial & Economic)
5. **Innovation & Technology** (Tech & Innovation)
6. **Supply Chain** (Supplier Relations)

### Scoring Guidelines:
- **10 points**: Excellent/Best practice
- **7-8 points**: Good/Above average
- **4-6 points**: Average/Developing
- **1-3 points**: Below average/Needs improvement
- **0 points**: Poor/Not implemented

### Question Types:
- **Multiple Choice**: 3-5 options with different scores
- **Yes/No/Partial**: Simple 3-option questions
- **Scale Questions**: 5-point scale (0, 2, 4, 6, 8, 10)
- **Frequency Questions**: Never, Rarely, Sometimes, Often, Always

## 🔄 Managing Existing Questions

### Edit Questions:
1. Admin Panel → Questions
2. Click on question to edit
3. Modify text, choices, or scores
4. Save changes

### Deactivate Questions:
1. Admin Panel → Questions
2. Uncheck "Active" checkbox
3. Question won't appear in questionnaire

### Delete Questions:
1. Admin Panel → Questions
2. Select questions to delete
3. Choose "Delete selected questions" action
4. Confirm deletion

## 📈 Question Analytics

### View Question Performance:
1. Admin Panel → Questionnaire Attempts
2. Click on specific attempt
3. See answers and scores per question

### Export Data:
1. Admin Panel → Questions or Attempts
2. Select items
3. Choose export action
4. Download CSV/Excel file

## 🌍 Multi-language Questions

### Add Turkish Translations:
1. Update translation files in `locale/tr/LC_MESSAGES/django.po`
2. Add translations for new question text
3. Compile messages: `python manage.py compilemessages`
4. Redeploy to Render

### Translation Format:
```po
msgid "Your English question text?"
msgstr "Türkçe soru metniniz?"
```

## 🚀 Best Practices

### Question Writing:
- ✅ Clear and specific language
- ✅ Avoid technical jargon
- ✅ One concept per question
- ✅ Balanced answer options
- ✅ Consistent scoring scale

### Category Organization:
- ✅ Logical grouping
- ✅ Balanced number of questions per category
- ✅ Clear category descriptions
- ✅ Proper ordering

### Scoring System:
- ✅ Consistent point scale
- ✅ Clear differentiation between options
- ✅ Meaningful score ranges
- ✅ Balanced total possible scores

## 🔧 Troubleshooting

### Common Issues:
1. **Questions not appearing**: Check "Active" status
2. **Wrong order**: Adjust "Order" field
3. **Missing translations**: Update translation files
4. **Scoring issues**: Verify choice scores

### Database Reset (Emergency):
```python
# In Django shell - USE WITH CAUTION
from questionnaire.models import *
Question.objects.all().delete()
Category.objects.all().delete()
# Then run setup.py again
```

## 📞 Support

For questions about question management:
1. Check this guide first
2. Test in local environment
3. Use admin panel for live changes
4. Contact development team for complex modifications

---

**Remember**: Always test questions in a staging environment before adding to production!