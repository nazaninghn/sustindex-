"""
Dashboard Turkish translations
"""
import re

translations = {
    "Ready to assess your sustainability?": "Sürdürülebilirliğinizi değerlendirmeye hazır mısınız?",
    "Start a new questionnaire to evaluate your company's sustainability performance and get detailed insights.": "Şirketinizin sürdürülebilirlik performansını değerlendirmek ve detaylı bilgiler almak için yeni bir anket başlatın.",
    "Start Your First Questionnaire": "İlk Anketinizi Başlatın",
    "Total Score": "Toplam Puan",
}

def update_translations(po_file_path):
    with open(po_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    pattern = r'msgid "([^"]+)"\nmsgstr ""'
    
    def replace_empty_msgstr(match):
        msgid = match.group(1)
        if msgid in translations:
            return f'msgid "{msgid}"\nmsgstr "{translations[msgid]}"'
        return match.group(0)
    
    new_content = re.sub(pattern, replace_empty_msgstr, content)
    
    with open(po_file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    tr_file = 'locale/tr/LC_MESSAGES/django.po'
    update_translations(tr_file)
    print("✓ Dashboard translations completed!")
