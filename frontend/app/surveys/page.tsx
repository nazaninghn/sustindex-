'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { surveyAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Survey {
  id: number;
  name: string;
  description: string;
  total_questions: number;
  is_active: boolean;
}

export default function SurveysPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadSurveys();
    }
  }, [user]);

  const loadSurveys = async () => {
    try {
      const data = await surveyAPI.getSurveys();
      // Make sure data is an array
      if (Array.isArray(data)) {
        setSurveys(data);
      } else if (data && Array.isArray(data.results)) {
        // If API returns paginated data
        setSurveys(data.results);
      } else {
        setSurveys([]);
      }
    } catch (error) {
      console.error('Failed to load surveys:', error);
      setSurveys([]);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/dashboard" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-neutral mb-2">
              Available Surveys
            </h1>
            <p className="text-gray-600 text-lg">
              Choose a sustainability assessment to begin
            </p>
          </div>

          {/* Surveys Grid */}
          {surveys.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <i className="fas fa-clipboard-list text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-bold text-neutral mb-2">No Surveys Available</h3>
              <p className="text-gray-600">Please contact administrator to add surveys.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveys.map((survey) => (
                <div
                  key={survey.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 border-2 border-transparent hover:border-primary"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <i className="fas fa-clipboard-check text-primary text-xl"></i>
                    </div>
                    <span className="px-3 py-1 bg-success/10 text-success text-sm font-semibold rounded-full">
                      Active
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral mb-2">
                    {survey.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {survey.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <i className="fas fa-question-circle mr-2"></i>
                    <span>{survey.total_questions} questions</span>
                  </div>

                  <Link
                    href={`/questionnaire/${survey.id}`}
                    className="block w-full py-3 bg-primary text-white text-center rounded-lg font-semibold hover:bg-primary/90 transition-all"
                  >
                    Start Assessment
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
