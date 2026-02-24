'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative mt-20 bg-gradient-to-br from-primary to-[#2d6a4f] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Sustainability Performance Assessment for Companies
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Measure, score, and improve your sustainability performance with professional reporting based on international standards.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-gold">30+</div>
                <div className="text-sm opacity-80 uppercase tracking-wider">Sustainability Indicators</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold">3</div>
                <div className="text-sm opacity-80 uppercase tracking-wider">Core Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold">A-D</div>
                <div className="text-sm opacity-80 uppercase tracking-wider">Grade Scale</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-gold text-neutral rounded-lg font-bold text-lg hover:bg-[#FFC107] transition-all hover:shadow-2xl hover:-translate-y-1 text-center"
              >
                Start Assessment
              </Link>
              <Link
                href="#methodology"
                className="px-8 py-4 border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 hover:border-white transition-all text-center"
              >
                View Methodology
              </Link>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl animate-fade-in-delay">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
              <h3 className="text-2xl font-bold text-neutral">Sustainability Dashboard</h3>
              <div className="px-6 py-2 bg-success text-white rounded-full font-bold text-xl">
                A-
              </div>
            </div>

            <div className="space-y-6">
              {/* Environmental */}
              <MetricCard
                score={85}
                label="Environmental"
                color="bg-success"
                mounted={mounted}
              />

              {/* Social */}
              <MetricCard
                score={78}
                label="Social"
                color="bg-accent"
                mounted={mounted}
              />

              {/* Governance */}
              <MetricCard
                score={92}
                label="Governance"
                color="bg-warning"
                mounted={mounted}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ score, label, color, mounted }: { score: number; label: string; color: string; mounted: boolean }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-3">
        <span className="text-neutral font-semibold text-lg">{label}</span>
        <span className="text-4xl font-bold text-primary">{score}</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          style={{ width: mounted ? `${score}%` : '0%', transition: 'width 1.5s ease 0.5s' }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}
