'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🌱</span>
            <span className="text-2xl font-bold text-primary">Sustindex</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {user && (
              <Link 
                href="/dashboard" 
                className="text-neutral hover:text-primary transition-colors font-medium"
              >
                Dashboard
              </Link>
            )}
            <Link 
              href="/about" 
              className="text-neutral hover:text-primary transition-colors font-medium"
              >
              About
            </Link>
            
            {/* Language Selector */}
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:border-primary transition-colors cursor-pointer font-medium"
            >
              <option value="en">🇬🇧 EN</option>
              <option value="tr">🇹🇷 TR</option>
            </select>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/history"
                  className="text-neutral hover:text-primary transition-colors font-medium"
                >
                  <i className="fas fa-history mr-1"></i>
                  History
                </Link>
                <Link
                  href="/profile"
                  className="text-neutral hover:text-primary transition-colors font-medium"
                >
                  <i className="fas fa-user mr-1"></i>
                  {user.username}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2.5 bg-gray-200 text-neutral rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
