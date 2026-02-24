'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative mt-16 sm:mt-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white overflow-hidden min-h-[calc(100vh-4rem)] sm:min-h-screen flex items-center">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Particles - Hidden on mobile for performance */}
      <div className="absolute inset-0 hidden md:block">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white/30 transition-all text-xs sm:text-sm">
              <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-emerald-400"></span>
              </span>
              <span className="font-semibold tracking-wide">{t.hero.badge}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-tight mb-2 sm:mb-4">
                {t.hero.title}
                <span className="block bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                  {t.hero.titleHighlight}
                </span>
                <span className="block">{t.hero.titleEnd}</span>
              </h1>
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-95 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 py-4 sm:py-6 lg:py-8 border-y border-white/20">
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  30+
                </div>
                <div className="text-xs sm:text-sm md:text-base opacity-90 mt-1 sm:mt-2 font-medium">{t.hero.stats.indicators}</div>
              </div>
              <div className="text-center border-x border-white/20 group">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  3
                </div>
                <div className="text-xs sm:text-sm md:text-base opacity-90 mt-1 sm:mt-2 font-medium">{t.hero.stats.categories}</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-yellow-300 to-amber-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  A-D
                </div>
                <div className="text-xs sm:text-sm md:text-base opacity-90 mt-1 sm:mt-2 font-medium">{t.hero.stats.grading}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link
                href="/register"
                className="group relative px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-gray-900 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg overflow-hidden transition-all hover:shadow-2xl hover:shadow-yellow-500/50 hover:-translate-y-1 text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  {t.hero.cta}
                  <i className="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link
                href="#features"
                className="group px-6 sm:px-8 py-4 sm:py-5 bg-white/10 backdrop-blur-sm border-2 border-white/40 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:bg-white/20 hover:border-white transition-all text-center flex items-center justify-center gap-2 sm:gap-3"
              >
                {t.hero.ctaSecondary}
                <i className="fas fa-chevron-down group-hover:translate-y-1 transition-transform"></i>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 sm:pt-6 opacity-90">
              <div className="flex items-center gap-2 group">
                <i className="fas fa-shield-check text-emerald-300 text-lg sm:text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-xs sm:text-sm font-medium">{t.hero.trust.iso}</span>
              </div>
              <div className="flex items-center gap-2 group">
                <i className="fas fa-lock text-emerald-300 text-lg sm:text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-xs sm:text-sm font-medium">{t.hero.trust.secure}</span>
              </div>
              <div className="flex items-center gap-2 group">
                <i className="fas fa-chart-line text-emerald-300 text-lg sm:text-xl group-hover:scale-110 transition-transform"></i>
                <span className="text-xs sm:text-sm font-medium">{t.hero.trust.realtime}</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Dashboard Preview */}
          <div className="relative animate-fade-in-delay mt-8 lg:mt-0">
            {/* Floating Elements - Hidden on mobile */}
            <div className="absolute -top-4 sm:-top-8 -right-4 sm:-right-8 w-20 sm:w-32 h-20 sm:h-32 bg-yellow-400/20 rounded-2xl sm:rounded-3xl rotate-12 animate-float blur-xl hidden md:block"></div>
            <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-24 sm:w-40 h-24 sm:h-40 bg-emerald-400/20 rounded-2xl sm:rounded-3xl -rotate-12 animate-float delay-1000 blur-xl hidden md:block"></div>

            <div className="relative bg-white/98 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-white/20 hover:shadow-emerald-500/20 transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 lg:mb-10 pb-4 sm:pb-6 border-b-2 border-gray-100">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900">{t.hero.dashboard.title}</h3>
                <div className="px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl sm:rounded-2xl font-black text-xl sm:text-2xl lg:text-3xl shadow-lg hover:scale-110 transition-transform cursor-pointer">
                  A-
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                <MetricCard
                  score={85}
                  label={t.hero.dashboard.environmental}
                  icon="fa-leaf"
                  color="from-emerald-500 via-green-500 to-teal-600"
                  mounted={mounted}
                />

                <MetricCard
                  score={78}
                  label={t.hero.dashboard.social}
                  icon="fa-users"
                  color="from-blue-500 via-indigo-500 to-purple-600"
                  mounted={mounted}
                />

                <MetricCard
                  score={92}
                  label={t.hero.dashboard.governance}
                  icon="fa-building"
                  color="from-amber-500 via-orange-500 to-red-600"
                  mounted={mounted}
                />
              </div>

              {/* Bottom Stats */}
              <div className="mt-6 sm:mt-8 lg:mt-10 pt-6 sm:pt-8 border-t border-gray-100 grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 text-center">
                <div className="group cursor-pointer">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-600 group-hover:scale-110 transition-transform">12</div>
                  <div className="text-xs text-gray-500 mt-1 sm:mt-2 font-medium">{t.hero.dashboard.completed}</div>
                </div>
                <div className="group cursor-pointer">
                  <div className="text-2xl sm:text-3xl font-black text-blue-600 group-hover:scale-110 transition-transform">5</div>
                  <div className="text-xs text-gray-500 mt-1 sm:mt-2 font-medium">{t.hero.dashboard.inProgress}</div>
                </div>
                <div className="group cursor-pointer">
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 group-hover:scale-110 transition-transform">98%</div>
                  <div className="text-xs text-gray-500 mt-1 sm:mt-2 font-medium">{t.hero.dashboard.accuracy}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 sm:w-8 h-10 sm:h-12 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1 sm:w-1.5 h-2 sm:h-3 bg-white/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ score, label, icon, color, mounted }: { score: number; label: string; icon: string; color: string; mounted: boolean }) {
  return (
    <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-all cursor-pointer">
      <div className="flex items-center justify-between mb-3 sm:mb-4 lg:mb-5">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${color} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
            <i className={`fas ${icon} text-white text-base sm:text-lg lg:text-xl`}></i>
          </div>
          <span className="text-gray-900 font-bold text-sm sm:text-base lg:text-xl">{label}</span>
        </div>
        <span className="text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-br from-gray-700 to-gray-900 bg-clip-text text-transparent">{score}</span>
      </div>
      <div className="h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          style={{ width: mounted ? `${score}%` : '0%', transition: 'width 2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s' }}
          className={`h-full bg-gradient-to-r ${color} rounded-full shadow-lg relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
