'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

export default function MethodologySection() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: 'fa-leaf',
      color: 'from-emerald-500 to-green-600',
    },
    {
      icon: 'fa-users',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      icon: 'fa-building',
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: 'fa-chart-bar',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  const frameworks = [
    { icon: 'fa-globe', color: 'text-emerald-400' },
    { icon: 'fa-chart-pie', color: 'text-blue-400' },
    { icon: 'fa-bullseye', color: 'text-purple-400' },
    { icon: 'fa-certificate', color: 'text-amber-400' },
  ];

  return (
    <section id="methodology" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm mb-6">
            <i className="fas fa-cogs"></i>
            <span>{t.methodology.badge}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.methodology.title}
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.methodology.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.methodology.subtitle}
          </p>
        </div>

        {/* Methodology Steps */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-xl"
            >
              {/* Step Number */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 ml-12 group-hover:scale-110 transition-transform shadow-lg`}>
                <i className={`fas ${step.icon} text-white text-2xl`}></i>
              </div>

              {/* Content */}
              <h5 className="text-2xl font-bold text-gray-900 mb-4">
                {t.methodology.steps[index].title}
              </h5>
              <p className="text-gray-600 leading-relaxed">
                {t.methodology.steps[index].description}
              </p>

              {/* Progress Indicator */}
              <div className="mt-6 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${step.color} rounded-full`} style={{ width: `${(index + 1) * 25}%` }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Frameworks Section */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {t.methodology.frameworks.title}
              </h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {t.methodology.frameworks.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              {frameworks.map((framework, index) => (
                <div key={index} className="space-y-3">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto hover:scale-110 transition-transform">
                    <i className={`fas ${framework.icon} text-3xl ${framework.color}`}></i>
                  </div>
                  <div className="font-bold text-lg">{t.methodology.frameworks.items[index].name}</div>
                  <div className="text-sm text-gray-400">{t.methodology.frameworks.items[index].desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 animate-fade-in">
          <Link
            href="/register"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all hover:shadow-2xl hover:shadow-emerald-500/50 hover:-translate-y-1"
          >
            {t.methodology.cta}
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </Link>
          <p className="mt-4 text-gray-500">{t.methodology.ctaSubtext}</p>
        </div>
      </div>
    </section>
  );
}
