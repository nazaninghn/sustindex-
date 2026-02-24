'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { attemptAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Document {
  id: number;
  title: string;
  file: string;
  uploaded_at: string;
  file_size_display: string;
}

interface Answer {
  id: number;
  question_text: string;
  choice_text?: string;
  choices_display?: string;
  notes?: string;
  total_score: number;
  documents: Document[];
}

interface Attempt {
  id: number;
  survey_name: string;
  completed_at: string;
  total_score: number;
  environmental_score: number;
  social_score: number;
  governance_score: number;
  overall_grade: string;
  recommendations: Recommendation[];
  answers: Answer[];
}

interface Recommendation {
  category: string;
  priority: string;
  suggestion: string;
}

export default function ResultsPage() {
  const router = useRouter();
  const params = useParams();
  const attemptId = parseInt(params.id as string);
  const { user, loading: authLoading } = useAuth();
  
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && attemptId) {
      loadResults();
    }
  }, [user, attemptId]);

  const loadResults = async () => {
    try {
      const data = await attemptAPI.getAttempt(attemptId);
      setAttempt(data);
    } catch (error) {
      console.error('Failed to load results:', error);
      alert('Failed to load results');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-success';
    if (grade.startsWith('B')) return 'text-accent';
    if (grade.startsWith('C')) return 'text-warning';
    return 'text-red-500';
  };

  const getGradeBg = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-success';
    if (grade.startsWith('B')) return 'bg-accent';
    if (grade.startsWith('C')) return 'bg-warning';
    return 'bg-red-500';
  };

  const handleExport = () => {
    window.print();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Loading results...</div>
      </div>
    );
  }

  if (!user || !attempt) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`inline-block px-8 py-4 ${getGradeBg(attempt.overall_grade)} text-white rounded-2xl text-6xl font-bold mb-4`}>
              {attempt.overall_grade}
            </div>
            <h1 className="text-4xl font-bold text-neutral mb-2">
              Assessment Complete!
            </h1>
            <p className="text-gray-600 text-lg">
              {attempt.survey_name}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Completed on {new Date(attempt.completed_at).toLocaleDateString()}
            </p>
          </div>

          {/* Overall Score */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold text-neutral mb-4">Overall Score</h2>
            <div className="text-6xl font-bold text-primary mb-2">
              {Math.round(attempt.total_score)}
            </div>
            <p className="text-gray-600">out of 100</p>
          </div>

          {/* ESG Scores */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <ScoreCard
              title="Environmental"
              score={attempt.environmental_score}
              icon="fa-leaf"
              color="success"
            />
            <ScoreCard
              title="Social"
              score={attempt.social_score}
              icon="fa-users"
              color="accent"
            />
            <ScoreCard
              title="Governance"
              score={attempt.governance_score}
              icon="fa-balance-scale"
              color="warning"
            />
          </div>

          {/* Recommendations */}
          {attempt.recommendations && attempt.recommendations.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral mb-6">
                <i className="fas fa-lightbulb text-gold mr-2"></i>
                Recommendations
              </h2>
              <div className="space-y-4">
                {attempt.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-primary bg-gray-50 p-4 rounded-r-lg"
                  >
                    <div className="flex items-center mb-2">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mr-3">
                        {rec.category}
                      </span>
                      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                        rec.priority === 'High' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {rec.priority} Priority
                      </span>
                    </div>
                    <p className="text-gray-700">{rec.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Answers */}
          {attempt.answers && attempt.answers.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-neutral mb-6">
                <i className="fas fa-list-check mr-2"></i>
                Your Answers
              </h2>
              <div className="space-y-6">
                {attempt.answers.map((answer, index) => (
                  <div key={answer.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <span className="text-sm text-gray-500 font-semibold">Question {index + 1}</span>
                        <div 
                          className="text-neutral font-medium mt-1"
                          dangerouslySetInnerHTML={{ __html: answer.question_text }}
                        />
                      </div>
                      <div className="ml-4 px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">
                        {answer.total_score} pts
                      </div>
                    </div>
                    
                    <div className="ml-4 pl-4 border-l-2 border-primary/30">
                      <p className="text-gray-700">
                        <i className="fas fa-check-circle text-success mr-2"></i>
                        {answer.choices_display || answer.choice_text}
                      </p>
                      
                      {/* Uploaded Documents */}
                      {answer.documents && answer.documents.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-sm text-gray-600 font-semibold">
                            <i className="fas fa-paperclip mr-1"></i>
                            Uploaded Documents:
                          </p>
                          {answer.documents.map((doc) => (
                            <a
                              key={doc.id}
                              href={doc.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                            >
                              <i className="fas fa-file-alt text-blue-600 mr-3"></i>
                              <div className="flex-1">
                                <p className="text-sm text-blue-700 font-medium group-hover:underline">
                                  {doc.title}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {doc.file_size_display} • {new Date(doc.uploaded_at).toLocaleDateString()}
                                </p>
                              </div>
                              <i className="fas fa-external-link-alt text-blue-600 text-sm"></i>
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Notes/Comments */}
                      {answer.notes && answer.notes.trim() && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                          <p className="text-sm text-gray-600 font-semibold mb-1">
                            <i className="fas fa-comment-dots text-amber-600 mr-1"></i>
                            Notes:
                          </p>
                          <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {answer.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center print:hidden">
            <button
              onClick={handleExport}
              className="px-8 py-3 bg-gold text-white rounded-lg font-semibold hover:bg-gold/90 transition-all text-center"
            >
              <i className="fas fa-download mr-2"></i>
              Export to PDF
            </button>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all text-center"
            >
              Back to Dashboard
            </Link>
            <Link
              href="/surveys"
              className="px-8 py-3 bg-gray-200 text-neutral rounded-lg font-semibold hover:bg-gray-300 transition-all text-center"
            >
              Start New Assessment
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ScoreCard({ title, score, icon, color }: { title: string; score: number; icon: string; color: string }) {
  const colorClasses = {
    success: 'bg-success',
    accent: 'bg-accent',
    warning: 'bg-warning',
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral">{title}</h3>
        <div className={`w-10 h-10 ${colorClasses[color as keyof typeof colorClasses]}/10 rounded-full flex items-center justify-center`}>
          <i className={`fas ${icon} ${colorClasses[color as keyof typeof colorClasses].replace('bg-', 'text-')} text-lg`}></i>
        </div>
      </div>
      <div className="text-4xl font-bold text-primary mb-3">
        {Math.round(score)}
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color as keyof typeof colorClasses]} transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
