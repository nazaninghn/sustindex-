'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { attemptAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Attempt {
  id: number;
  survey_name: string;
  completed_at: string;
  started_at: string;
  is_completed: boolean;
  total_score: number;
  environmental_score: number;
  social_score: number;
  governance_score: number;
  overall_grade: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      loadAttempts();
    }
  }, [user]);

  const loadAttempts = async () => {
    try {
      const data = await attemptAPI.getMyAttempts();
      // Make sure data is an array
      if (Array.isArray(data)) {
        setAttempts(data);
      } else if (data && Array.isArray(data.results)) {
        // If API returns paginated data
        setAttempts(data.results);
      } else {
        setAttempts([]);
      }
    } catch (error) {
      console.error('Failed to load attempts:', error);
      setAttempts([]);
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

  const filteredAttempts = attempts.filter(a => {
    if (filter === 'completed') return a.is_completed;
    if (filter === 'in-progress') return !a.is_completed;
    return true;
  });

  const getGradeColor = (grade: string) => {
    if (grade?.startsWith('A')) return 'text-success';
    if (grade?.startsWith('B')) return 'text-accent';
    if (grade?.startsWith('C')) return 'text-warning';
    return 'text-red-500';
  };

  const getGradeBg = (grade: string) => {
    if (grade?.startsWith('A')) return 'bg-success';
    if (grade?.startsWith('B')) return 'bg-accent';
    if (grade?.startsWith('C')) return 'bg-warning';
    return 'bg-red-500';
  };

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
              Assessment History
            </h1>
            <p className="text-gray-600 text-lg">
              View all your sustainability assessments
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-3xl font-bold text-primary">{attempts.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-3xl font-bold text-success">
                {attempts.filter(a => a.is_completed).length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-600 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-warning">
                {attempts.filter(a => !a.is_completed).length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-600 text-sm">Average Score</p>
              <p className="text-3xl font-bold text-accent">
                {attempts.filter(a => a.is_completed).length > 0
                  ? Math.round(
                      attempts
                        .filter(a => a.is_completed)
                        .reduce((sum, a) => sum + a.total_score, 0) /
                        attempts.filter(a => a.is_completed).length
                    )
                  : '-'}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow p-4 mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({attempts.length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'completed'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Completed ({attempts.filter(a => a.is_completed).length})
              </button>
              <button
                onClick={() => setFilter('in-progress')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  filter === 'in-progress'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                In Progress ({attempts.filter(a => !a.is_completed).length})
              </button>
            </div>
          </div>

          {/* Attempts List */}
          {filteredAttempts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <i className="fas fa-inbox text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-bold text-neutral mb-2">No Assessments Found</h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all'
                  ? 'Start your first assessment to see it here'
                  : `No ${filter} assessments found`}
              </p>
              <Link
                href="/surveys"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
              >
                Start New Assessment
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-neutral">
                          {attempt.survey_name}
                        </h3>
                        {attempt.is_completed ? (
                          <span className="px-3 py-1 bg-success/10 text-success text-sm font-semibold rounded-full">
                            Completed
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-warning/10 text-warning text-sm font-semibold rounded-full">
                            In Progress
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>
                          <i className="fas fa-calendar mr-2"></i>
                          Started: {new Date(attempt.started_at).toLocaleDateString()}
                        </span>
                        {attempt.is_completed && (
                          <span>
                            <i className="fas fa-check-circle mr-2"></i>
                            Completed: {new Date(attempt.completed_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {attempt.is_completed ? (
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className={`text-4xl font-bold ${getGradeColor(attempt.overall_grade)}`}>
                            {attempt.overall_grade}
                          </div>
                          <div className="text-sm text-gray-500">
                            {Math.round(attempt.total_score)}%
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Link
                            href={`/results/${attempt.id}`}
                            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all text-center"
                          >
                            View Results
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={`/questionnaire/${attempt.id}`}
                        className="px-6 py-3 bg-warning text-white rounded-lg font-semibold hover:bg-warning/90 transition-all"
                      >
                        Continue
                      </Link>
                    )}
                  </div>

                  {attempt.is_completed && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Environmental</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-success"
                                style={{ width: `${attempt.environmental_score}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-success">
                              {Math.round(attempt.environmental_score)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Social</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-accent"
                                style={{ width: `${attempt.social_score}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-accent">
                              {Math.round(attempt.social_score)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Governance</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-warning"
                                style={{ width: `${attempt.governance_score}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-warning">
                              {Math.round(attempt.governance_score)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
