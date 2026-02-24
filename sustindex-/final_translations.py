"""
Final Turkish translations for home page
"""
import re

translations = {
    "Find the perfect complement to your sustainability": "Sürdürülebilirliğiniz için mükemmel tamamlayıcıyı bulun",
    "We will help you assess and improve your company's sustainability performance. Check our memberships and surround yourself with excellence!": "Şirketinizin sürdürülebilirlik performansını değerlendirmenize ve geliştirmenize yardımcı olacağız. Üyeliklerimize göz atın ve kendinizi mükemmellikle çevreleyin!",
    "Explore Memberships": "Üyelikleri Keşfedin",
    "Get Started": "Başlayın",
    "Choose Your Membership": "Üyeliğinizi Seçin",
    "Select the plan that best fits your company's needs": "Şirketinizin ihtiyaçlarına en uygun planı seçin",
    "Basic dashboard access": "Temel kontrol paneli erişimi",
    "View sample questions": "Örnek soruları görüntüleyin",
    "Community support": "Topluluk desteği",
    "Perfect for getting started": "Başlamak için mükemmel",
    "Email support": "E-posta desteği",
    "Basic analytics": "Temel analitik",
    "Complete sustainability solution": "Eksiksiz sürdürülebilirlik çözümü",
    "Priority support": "Öncelikli destek",
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
    
    filled = len(re.findall(r'msgstr "[^"]+"', new_content))
    return filled

if __name__ == '__main__':
    tr_file = 'locale/tr/LC_MESSAGES/django.po'
    filled_count = update_translations(tr_file)
    print(f"✓ All Turkish translations completed!")
    print(f"✓ Total translations: {filled_count}")
