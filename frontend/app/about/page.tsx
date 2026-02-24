import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-neutral mb-4">
              About Sustindex
            </h1>
            <p className="text-xl text-gray-600">
              Professional Sustainability Assessment Platform
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-neutral mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Sustindex is dedicated to helping companies measure, understand, and improve their sustainability performance. 
              We provide comprehensive ESG (Environmental, Social, and Governance) assessments based on international standards 
              and best practices.
            </p>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-neutral mb-6">What We Offer</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-chart-line text-primary text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral mb-2">Comprehensive Assessment</h3>
                  <p className="text-gray-600">
                    Detailed evaluation across 30+ sustainability indicators covering Environmental, Social, and Governance aspects.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-file-pdf text-success text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral mb-2">Professional Reports</h3>
                  <p className="text-gray-600">
                    Executive-ready reports with detailed analysis, benchmarking, and actionable recommendations.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-shield-alt text-accent text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral mb-2">Industry Standards</h3>
                  <p className="text-gray-600">
                    Based on internationally recognized frameworks including GRI, SASB, and UN SDGs.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-lightbulb text-warning text-xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral mb-2">Actionable Insights</h3>
                  <p className="text-gray-600">
                    Receive prioritized recommendations to improve your sustainability performance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-neutral mb-6">Our Methodology</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="text-lg font-bold text-neutral mb-2">1. Environmental Assessment</h3>
                <p className="text-gray-600">
                  Evaluate waste management, energy usage, carbon footprint, water conservation, and environmental policies.
                </p>
              </div>

              <div className="border-l-4 border-success pl-4">
                <h3 className="text-lg font-bold text-neutral mb-2">2. Social Responsibility</h3>
                <p className="text-gray-600">
                  Assess employee training, diversity & inclusion, community engagement, health & safety measures.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-4">
                <h3 className="text-lg font-bold text-neutral mb-2">3. Corporate Governance</h3>
                <p className="text-gray-600">
                  Review board independence, transparency, ethics programs, and stakeholder engagement.
                </p>
              </div>

              <div className="border-l-4 border-warning pl-4">
                <h3 className="text-lg font-bold text-neutral mb-2">4. Scoring & Grading</h3>
                <p className="text-gray-600">
                  Weighted scoring system with grades from A+ to D, providing clear performance indicators.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-primary to-[#2d6a4f] rounded-2xl shadow-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6 opacity-90">
              Begin your sustainability journey today
            </p>
            <Link
              href="/register"
              className="inline-block px-8 py-4 bg-gold text-neutral rounded-lg font-bold text-lg hover:bg-[#FFC107] transition-all hover:shadow-2xl"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
