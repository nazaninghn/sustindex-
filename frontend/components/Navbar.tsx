'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-lg z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 group-hover:scale-110 transition-transform">
              <img 
                src="/logo.png" 
                alt="Sustindex Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Sustindex
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {user && (
              <Link 
                href="/dashboard" 
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium flex items-center gap-2"
              >
                <i className="fas fa-chart-line"></i>
                Dashboard
              </Link>
            )}
            <a 
              href="#features" 
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              {t.nav.features}
            </a>
            <a 
              href="#methodology" 
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              {t.nav.methodology}
            </a>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              {t.nav.about}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === 'en'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🇬🇧 EN
              </button>
              <button
                onClick={() => setLanguage('tr')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  language === 'tr'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🇹🇷 TR
              </button>
            </div>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/history"
                  className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
                >
                  <i className="fas fa-history"></i>
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <i className="fas fa-user text-emerald-600"></i>
                  <span className="font-medium">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2.5 text-gray-700 font-semibold hover:text-emerald-600 transition-colors"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  {t.nav.register}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-fade-in">
            <div className="flex flex-col gap-4">
              {user && (
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 hover:text-emerald-600 transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <i className="fas fa-chart-line mr-2"></i>
                  Dashboard
                </Link>
              )}
              <a 
                href="#features" 
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.features}
              </a>
              <a 
                href="#methodology" 
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.methodology}
              </a>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-emerald-600 transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.nav.about}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1 w-fit">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    language === 'en'
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  🇬🇧 EN
                </button>
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    language === 'tr'
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-600'
                  }`}
                >
                  🇹🇷 TR
                </button>
              </div>

              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-gray-700 hover:text-emerald-600 transition-colors font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-user mr-2"></i>
                    {user.username}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-6 py-2.5 text-gray-700 font-semibold hover:text-emerald-600 transition-colors text-center border border-gray-300 rounded-xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.login}
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t.nav.register}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
