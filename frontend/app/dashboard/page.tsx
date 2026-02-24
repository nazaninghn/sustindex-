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

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

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

  const completedAttempts = attempts.filter(a => a.is_completed);
  const averageScore = completedAttempts.length > 0
    ? Math.round(completedAttempts.reduce((sum, a) => sum + a.total_score, 0) / completedAttempts.length)
    : 0;
  const latestAttempt = completedAttempts[0];

  const getGradeColor = (grade: string) => {
    if (grade?.startsWith('A')) return 'text-success';
    if (grade?.startsWith('B')) return 'text-accent';
    if (grade?.startsWith('C')) return 'text-warning';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-br from-primary to-[#2d6a4f] rounded-2xl shadow-lg p-8 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Welcome back, {user.first_name || user.username}! 👋
                </h1>
                <p className="text-white/90 text-lg">
                  {user.company_name ? `${user.company_name} - ` : ''}
                  {user.membership_type.charAt(0).toUpperCase() + user.membership_type.slice(1)} Member
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-5xl text-white/80"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Assessments</p>
                  <p className="text-3xl font-bold text-primary mt-1">{completedAttempts.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-clipboard-list text-primary text-xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Average Score</p>
                  <p className="text-3xl font-bold text-success mt-1">
                    {averageScore > 0 ? averageScore : '-'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-chart-line text-success text-xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Latest Grade</p>
                  <p className={`text-3xl font-bold mt-1 ${latestAttempt ? getGradeColor(latestAttempt.overall_grade) : 'text-gray-400'}`}>
                    {latestAttempt?.overall_grade || '-'}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-trophy text-gold text-xl"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">In Progress</p>
                  <p className="text-3xl font-bold text-accent mt-1">
                    {attempts.filter(a => !a.is_completed).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <i className="fas fa-hourglass-half text-accent text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Score Breakdown */}
          {latestAttempt && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral mb-6">Latest Assessment Breakdown</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <ScoreBar
                  title="Environmental"
                  score={latestAttempt.environmental_score}
                  color="success"
                  icon="fa-leaf"
                />
                <ScoreBar
                  title="Social"
                  score={latestAttempt.social_score}
                  color="accent"
                  icon="fa-users"
                />
                <ScoreBar
                  title="Governance"
                  score={latestAttempt.governance_score}
                  color="warning"
                  icon="fa-balance-scale"
                />
              </div>
            </div>
          )}

          {/* Actions & Recent Activity */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Start New Assessment */}
            <div className="bg-gradient-to-br from-primary to-[#2d6a4f] rounded-2xl shadow-lg p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-plus text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold">Start New Assessment</h3>
              </div>
              <p className="mb-6 opacity-90">
                Begin a new sustainability assessment to measure your company's ESG performance.
              </p>
              <Link
                href="/surveys"
                className="inline-block px-6 py-3 bg-gold text-neutral rounded-lg font-bold hover:bg-[#FFC107] transition-all hover:shadow-lg"
              >
                Browse Surveys
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-neutral mb-6">Recent Activity</h3>
              {completedAttempts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-inbox text-4xl mb-4 opacity-50"></i>
                  <p>No assessments yet</p>
                  <p className="text-sm mt-2">Start your first assessment to see your progress here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedAttempts.slice(0, 3).map((attempt) => (
                    <Link
                      key={attempt.id}
                      href={`/results/${attempt.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral">{attempt.survey_name}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(attempt.completed_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getGradeColor(attempt.overall_grade)}`}>
                              {attempt.overall_grade}
                            </div>
                            <div className="text-sm text-gray-500">
                              {Math.round(attempt.total_score)}%
                            </div>
                          </div>
                          <i className="fas fa-chevron-right text-gray-400"></i>
                        </div>
                      </div>
                    </Link>
                  ))}
                  {completedAttempts.length > 3 && (
                    <Link
                      href="/history"
                      className="block text-center text-primary hover:underline font-medium"
                    >
                      View all assessments →
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ScoreBar({ title, score, color, icon }: { title: string; score: number; color: string; icon: string }) {
  const colorClasses = {
    success: { bg: 'bg-success', text: 'text-success' },
    accent: { bg: 'bg-accent', text: 'text-accent' },
    warning: { bg: 'bg-warning', text: 'text-warning' },
  };

  const colors = colorClasses[color as keyof typeof colorClasses];

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <i className={`fas ${icon} ${colors.text} mr-2`}></i>
          <span className="font-semibold text-neutral">{title}</span>
        </div>
        <span className={`text-2xl font-bold ${colors.text}`}>
          {Math.round(score)}
        </span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colors.bg} transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
