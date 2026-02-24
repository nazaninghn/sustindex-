'use client';

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral mb-4">
            Professional Sustainability Assessment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your company receives a sustainability score based on 30 indicators across Environmental, Social, and Governance categories.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-chart-line text-white text-3xl"></i>
            </div>
            <h4 className="text-2xl font-bold text-neutral mb-4 text-center">
              Comprehensive Scoring
            </h4>
            <p className="text-gray-600 text-center leading-relaxed">
              Detailed analysis across all sustainability dimensions with weighted scoring methodology.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-file-pdf text-white text-3xl"></i>
            </div>
            <h4 className="text-2xl font-bold text-neutral mb-4 text-center">
              Professional Reports
            </h4>
            <p className="text-gray-600 text-center leading-relaxed">
              Executive-ready PDF reports with benchmarking and improvement recommendations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
              <i className="fas fa-shield-alt text-white text-3xl"></i>
            </div>
            <h4 className="text-2xl font-bold text-neutral mb-4 text-center">
              Industry Standards
            </h4>
            <p className="text-gray-600 text-center leading-relaxed">
              Based on internationally recognized sustainability frameworks and best practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
