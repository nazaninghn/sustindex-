'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12 group-hover:scale-110 transition-transform">
                <img 
                  src="/logo.png" 
                  alt="Sustindex Logo" 
                  className="w-full h-full object-contain brightness-0 invert"
                />
              </div>
              <span className="text-2xl font-bold text-white">
                Sustindex
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              {language === 'en' 
                ? 'Comprehensive ESG assessment platform helping companies measure, improve, and report their sustainability performance.'
                : 'Şirketlerin sürdürülebilirlik performansını ölçmelerine, geliştirmelerine ve raporlamalarına yardımcı olan kapsamlı ESG değerlendirme platformu.'
              }
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">
              {language === 'en' ? 'Quick Links' : 'Hızlı Bağlantılar'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>
                  {language === 'en' ? 'About Us' : 'Hakkımızda'}
                </Link>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>
                  {language === 'en' ? 'Features' : 'Özellikler'}
                </a>
              </li>
              <li>
                <a href="#methodology" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>
                  {language === 'en' ? 'Methodology' : 'Metodoloji'}
                </a>
              </li>
              <li>
                <Link href="/register" className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <i className="fas fa-chevron-right text-xs"></i>
                  {language === 'en' ? 'Get Started' : 'Başlayın'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">
              {language === 'en' ? 'Contact' : 'İletişim'}
            </h4>
            <ul className="space-y-3">
              <li className="text-gray-400 flex items-start gap-3">
                <i className="fas fa-envelope text-emerald-400 mt-1"></i>
                <span>info@sustindex.com</span>
              </li>
              <li className="text-gray-400 flex items-start gap-3">
                <i className="fas fa-phone text-emerald-400 mt-1"></i>
                <span>+90 (XXX) XXX XX XX</span>
              </li>
              <li className="text-gray-400 flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-emerald-400 mt-1"></i>
                <span>Istanbul, Turkey</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Sustindex. {language === 'en' ? 'All rights reserved.' : 'Tüm hakları saklıdır.'}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
              {language === 'en' ? 'Privacy Policy' : 'Gizlilik Politikası'}
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
              {language === 'en' ? 'Terms of Service' : 'Hizmet Şartları'}
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
              {language === 'en' ? 'Cookie Policy' : 'Çerez Politikası'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
