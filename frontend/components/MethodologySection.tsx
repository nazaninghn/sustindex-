'use client';

import Link from 'next/link';

export default function MethodologySection() {
  return (
    <section id="methodology" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral mb-4">
            Assessment Methodology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our sustainability assessment follows a structured approach based on international standards.
          </p>
        </div>

        {/* Methodology Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-gray-50 rounded-r-2xl border-l-4 border-primary p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
              1
            </div>
            <h5 className="text-xl font-bold text-neutral mb-3">
              Environmental Assessment
            </h5>
            <p className="text-gray-600 leading-relaxed">
              Waste management, energy usage, carbon footprint, and water conservation practices.
            </p>
          </div>

          <div className="bg-gray-50 rounded-r-2xl border-l-4 border-primary p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
              2
            </div>
            <h5 className="text-xl font-bold text-neutral mb-3">
              Social Responsibility
            </h5>
            <p className="text-gray-600 leading-relaxed">
              Employee training, diversity policies, community engagement, and health & safety measures.
            </p>
          </div>

          <div className="bg-gray-50 rounded-r-2xl border-l-4 border-primary p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
              3
            </div>
            <h5 className="text-xl font-bold text-neutral mb-3">
              Corporate Governance
            </h5>
            <p className="text-gray-600 leading-relaxed">
              Board independence, transparency, ethics programs, and stakeholder engagement.
            </p>
          </div>

          <div className="bg-gray-50 rounded-r-2xl border-l-4 border-primary p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
              4
            </div>
            <h5 className="text-xl font-bold text-neutral mb-3">
              Scoring & Grading
            </h5>
            <p className="text-gray-600 leading-relaxed">
              Weighted scoring system with A+ to D grades and detailed improvement recommendations.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in">
          <Link
            href="/register"
            className="inline-block px-10 py-4 bg-gold text-neutral rounded-lg font-bold text-lg hover:bg-[#FFC107] transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            Begin Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
