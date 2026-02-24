"""
Update Turkish translations with new strings
"""
import re

new_translations = {
    "Welcome Back": "Tekrar Hoş Geldiniz",
    "Please login to your account": "Lütfen hesabınıza giriş yapın",
    "Username": "Kullanıcı Adı",
    "Enter your username": "Kullanıcı adınızı girin",
    "Enter your password": "Şifrenizi girin",
    "Password": "Şifre",
    "Register here": "Buradan kayıt olun",
    "Measure, track, and improve your company's sustainability performance": "Şirketinizin sürdürülebilirlik performansını ölçün, takip edin ve geliştirin",
    "Create your account to get started": "Başlamak için hesabınızı oluşturun",
    "Email": "E-posta",
    "Confirm Password": "Şifreyi Onayla",
    "Login here": "Buradan giriş yapın",
}

def update_translations(po_file_path):
    with open(po_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    pattern = r'msgid "([^"]+)"\nmsgstr ""'
    
    def replace_empty_msgstr(match):
        msgid = match.group(1)
        if msgid in new_translations:
            return f'msgid "{msgid}"\nmsgstr "{new_translations[msgid]}"'
        return match.group(0)
    
    new_content = re.sub(pattern, replace_empty_msgstr, content)
    
    with open(po_file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    filled = len(re.findall(r'msgstr "[^"]+"', new_content))
    return filled

if __name__ == '__main__':
    tr_file = 'locale/tr/LC_MESSAGES/django.po'
    filled_count = update_translations(tr_file)
    print(f"✓ Turkish translations updated!")
    print(f"✓ Total translations: {filled_count}")
