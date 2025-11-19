"""
Complete all Turkish translations
"""
import re

# Complete Turkish translations dictionary
all_translations = {
    # Auth & User
    "Free": "Ücretsiz",
    "Silver": "Gümüş",
    "Gold": "Altın",
    "Membership Type": "Üyelik Türü",
    "Company Name": "Şirket Adı",
    "Phone": "Telefon",
    "Registration Date": "Kayıt Tarihi",
    "User": "Kullanıcı",
    "Users": "Kullanıcılar",
    "Username": "Kullanıcı Adı",
    "Email": "E-posta",
    "Password": "Şifre",
    "Confirm Password": "Şifreyi Onayla",
    "Login": "Giriş",
    "Logout": "Çıkış",
    "Register": "Kayıt Ol",
    "Dashboard": "Kontrol Paneli",
    
    # Navigation
    "Questionnaire": "Anket",
    "Courses": "Kurslar",
    "All rights reserved.": "Tüm hakları saklıdır.",
    "Actions": "İşlemler",
    "Date": "Tarih",
    "Status": "Durum",
    "Score": "Puan",
    "Save": "Kaydet",
    
    # Home Page
    "Welcome to Sustindex": "Sustindex'e Hoş Geldiniz",
    "Corporate Sustainability Assessment System": "Kurumsal Sürdürülebilirlik Değerlendirme Sistemi",
    "Free Membership": "Ücretsiz Üyelik",
    "Limited access to basic features": "Temel özelliklere sınırlı erişim",
    "Free Registration": "Ücretsiz Kayıt",
    "Silver Membership": "Gümüş Üyelik",
    "One-time questionnaire response": "Tek seferlik anket yanıtı",
    "Receive report": "Rapor alın",
    "Gold Membership": "Altın Üyelik",
    "Unlimited questionnaire responses": "Sınırsız anket yanıtları",
    "Detailed reports": "Detaylı raporlar",
    "Access to e-learning platform": "E-öğrenme platformuna erişim",
    "Consulting services": "Danışmanlık hizmetleri",
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
    
    # Login
    "Welcome Back": "Tekrar Hoş Geldiniz",
    "Please login to your account": "Lütfen hesabınıza giriş yapın",
    "Enter your username": "Kullanıcı adınızı girin",
    "Enter your password": "Şifrenizi girin",
    "Register here": "Buradan kayıt olun",
    "Measure, track, and improve your company's sustainability performance": "Şirketinizin sürdürülebilirlik performansını ölçün, takip edin ve geliştirin",
    "Don't have an account?": "Hesabınız yok mu?",
    "Logging in...": "Giriş yapılıyor...",
    
    # Register
    "Company Registration": "Şirket Kaydı",
    "Create your account to get started": "Başlamak için hesabınızı oluşturun",
    "Already registered?": "Zaten kayıtlı mısınız?",
    "Login here": "Buradan giriş yapın",
    "Creating account...": "Hesap oluşturuluyor...",
    
    # Dashboard
    "Completed Questionnaires": "Tamamlanan Anketler",
    "Start New Questionnaire": "Yeni Anket Başlat",
    "Questionnaire History": "Anket Geçmişi",
    "Completed": "Tamamlandı",
    "In Progress": "Devam Ediyor",
    "View Result": "Sonucu Görüntüle",
    "Continue": "Devam Et",
    "You haven't completed any questionnaires yet": "Henüz hiç anket tamamlamadınız",
    "Ready to assess your sustainability?": "Sürdürülebilirliğinizi değerlendirmeye hazır mısınız?",
    "Start a new questionnaire to evaluate your company's sustainability performance and get detailed insights.": "Şirketinizin sürdürülebilirlik performansını değerlendirmek ve detaylı bilgiler almak için yeni bir anket başlatın.",
    "Start Your First Questionnaire": "İlk Anketinizi Başlatın",
    "Total Score": "Toplam Puan",
    
    # Questionnaire
    "Sustainability Assessment Questionnaire": "Sürdürülebilirlik Değerlendirme Anketi",
    "Question": "Soru",
    "Submit Questionnaire": "Anketi Gönder",
    "Back to Dashboard": "Kontrol Paneline Dön",
    "Questionnaire Result": "Anket Sonucu",
    "Your Total Score": "Toplam Puanınız",
    "Completion Date": "Tamamlanma Tarihi",
    "Download PDF Report": "PDF Raporu İndir",
    "Membership Limit": "Üyelik Sınırı",
    "With Silver membership, you can only respond to the questionnaire once.": "Gümüş üyelikle ankete yalnızca bir kez yanıt verebilirsiniz.",
    "For unlimited access, please upgrade to Gold membership.": "Sınırsız erişim için lütfen Altın üyeliğe yükseltin.",
    
    # E-Learning
    "Access Restricted": "Erişim Kısıtlı",
    "The e-learning platform is only available for Gold members.": "E-öğrenme platformu yalnızca Altın üyeler için kullanılabilir.",
    "Lessons": "Dersler",
    "minutes": "dakika",
    "Attachments": "Ekler",
    "Mark as Completed": "Tamamlandı Olarak İşaretle",
    "You have completed this lesson": "Bu dersi tamamladınız",
    "View Course": "Kursu Görüntüle",
    "No courses have been created for you yet.": "Henüz sizin için hiç kurs oluşturulmadı.",
    
    # Profile
    "Complete Company Information": "Şirket Bilgilerini Tamamlayın",
    "Help us know more about your company": "Şirketiniz hakkında daha fazla bilgi edinmemize yardımcı olun",
    "Skip for now": "Şimdilik atla",
    
    # Models
    "Company Profile": "Şirket Profili",
    "Company Profiles": "Şirket Profilleri",
    "Registration Number": "Kayıt Numarası",
    "Address": "Adres",
    "Website": "Web Sitesi",
    "Industry": "Sektör",
    "Employee Count": "Çalışan Sayısı",
    "Logo": "Logo",
    "Additional Data": "Ek Veriler",
    "Membership History": "Üyelik Geçmişi",
    "Membership Histories": "Üyelik Geçmişleri",
    "Start Date": "Başlangıç Tarihi",
    "End Date": "Bitiş Tarihi",
    "Active": "Aktif",
    "Course": "Kurs",
    "Title": "Başlık",
    "Description": "Açıklama",
    "Thumbnail": "Küçük Resim",
    "Created At": "Oluşturulma Tarihi",
    "Lesson": "Ders",
    "Content": "İçerik",
    "Video URL": "Video URL",
    "Order": "Sıra",
    "Duration (minutes)": "Süre (dakika)",
    "Lesson Attachment": "Ders Eki",
    "Lesson Attachments": "Ders Ekleri",
    "File": "Dosya",
    "Uploaded At": "Yüklenme Tarihi",
    "Lesson Progress": "Ders İlerlemesi",
    "Completed At": "Tamamlanma Tarihi",
    "Category": "Kategori",
    "Categories": "Kategoriler",
    "Name": "Ad",
    "Display Order": "Görüntüleme Sırası",
    "Question Text": "Soru Metni",
    "Questions": "Sorular",
    "Choice": "Seçenek",
    "Choices": "Seçenekler",
    "Choice Text": "Seçenek Metni",
    "Questionnaire Attempt": "Anket Denemesi",
    "Questionnaire Attempts": "Anket Denemeleri",
    "Started At": "Başlangıç Zamanı",
    "Answer": "Cevap",
    "Answers": "Cevaplar",
    "Attempt": "Deneme",
    "Selected Choice": "Seçilen Seçenek",
    "Answered At": "Cevaplanma Zamanı",
    "Report": "Rapor",
    "Reports": "Raporlar",
    "Generated At": "Oluşturulma Zamanı",
    "PDF File": "PDF Dosyası",
    "Report Section": "Rapor Bölümü",
    "Report Sections": "Rapor Bölümleri",
    "Section Title": "Bölüm Başlığı",
    "Company": "Şirket",
}

def fill_translations(po_file_path):
    """Fill empty msgstr entries with Turkish translations"""
    with open(po_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match msgid and empty msgstr
    pattern = r'msgid "([^"]+)"\nmsgstr ""'
    
    def replace_empty_msgstr(match):
        msgid = match.group(1)
        if msgid in all_translations:
            return f'msgid "{msgid}"\nmsgstr "{all_translations[msgid]}"'
        return match.group(0)
    
    # Replace all empty msgstr with translations
    new_content = re.sub(pattern, replace_empty_msgstr, content)
    
    with open(po_file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    # Count translations
    filled = len(re.findall(r'msgstr "[^"]+"', new_content))
    empty = len(re.findall(r'msgstr ""', new_content))
    return filled, empty

if __name__ == '__main__':
    tr_file = 'locale/tr/LC_MESSAGES/django.po'
    filled_count, empty_count = fill_translations(tr_file)
    print(f"✓ Turkish translations completed!")
    print(f"✓ Filled translations: {filled_count}")
    print(f"✓ Empty translations: {empty_count}")
    print(f"✓ Total available: {len(all_translations)}")
