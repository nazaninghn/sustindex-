'use client';

import { useLanguage } from '@/lib/LanguageContext';

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      icon: 'fa-chart-line',
      gradient: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-50',
    },
    {
      icon: 'fa-file-contract',
      gradient: 'from-blue-500 to-indigo-600',
      iconBg: 'bg-blue-50',
    },
    {
      icon: 'fa-shield-check',
      gradient: 'from-amber-500 to-orange-600',
      iconBg: 'bg-amber-50',
    },
    {
      icon: 'fa-clock',
      gradient: 'from-purple-500 to-pink-600',
      iconBg: 'bg-purple-50',
    },
    {
      icon: 'fa-users-cog',
      gradient: 'from-cyan-500 to-blue-600',
      iconBg: 'bg-cyan-50',
    },
    {
      icon: 'fa-lightbulb',
      gradient: 'from-rose-500 to-red-600',
      iconBg: 'bg-rose-50',
    },
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-50/50 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-semibold text-sm mb-6">
            <i className="fas fa-star"></i>
            <span>{t.features.badge}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.features.title}
            <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {t.features.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`fas ${feature.icon} text-2xl bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}></i>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                {t.features.items[index].title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {t.features.items[index].description}
              </p>
              <div className="mt-6 flex items-center text-emerald-600 font-semibold group-hover:gap-2 transition-all">
                <span className="text-sm">Learn more</span>
                <i className="fas fa-arrow-right text-sm opacity-0 group-hover:opacity-100 transition-opacity"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-24 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>
          
          <div className="relative grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl font-bold">500+</div>
              <div className="text-emerald-100">{t.features.stats.companies}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">10K+</div>
              <div className="text-emerald-100">{t.features.stats.reports}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">95%</div>
              <div className="text-emerald-100">{t.features.stats.satisfaction}</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-bold">24/7</div>
              <div className="text-emerald-100">{t.features.stats.support}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
