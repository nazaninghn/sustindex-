'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import api, { attemptAPI } from '@/lib/api';
import Navbar from '@/components/Navbar';

interface Question {
  id: number;
  text: string;
  category_name: string;
  allow_multiple: boolean;
  attachment?: string;
  choices: Choice[];
}

interface Choice {
  id: number;
  text: string;
  score: number;
}

interface Answer {
  question: number;
  choice?: number;
  choices_ids?: number[];
}

export default function QuestionnairePage() {
  const router = useRouter();
  const params = useParams();
  const surveyId = parseInt(params.id as string);
  const { user, loading: authLoading } = useAuth();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<number, Answer>>(new Map());
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Map<number, File[]>>(new Map());

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && surveyId) {
      initQuestionnaire();
    }
  }, [user, surveyId]);

  const initQuestionnaire = async () => {
    try {
      // Create attempt
      const attempt = await attemptAPI.createAttempt(surveyId);
      setAttemptId(attempt.id);

      // Load questions
      const response = await api.get(`/surveys/${surveyId}/questions/`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Failed to initialize:', error);
      alert('Failed to start questionnaire');
      router.push('/surveys');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId: number, choiceId: number, allowMultiple: boolean) => {
    const newAnswers = new Map(answers);
    
    if (allowMultiple) {
      const current = newAnswers.get(questionId);
      const currentChoices = current?.choices_ids || [];
      
      if (currentChoices.includes(choiceId)) {
        // Remove choice
        const filtered = currentChoices.filter(id => id !== choiceId);
        if (filtered.length > 0) {
          newAnswers.set(questionId, { question: questionId, choices_ids: filtered });
        } else {
          newAnswers.delete(questionId);
        }
      } else {
        // Add choice
        newAnswers.set(questionId, {
          question: questionId,
          choices_ids: [...currentChoices, choiceId]
        });
      }
    } else {
      newAnswers.set(questionId, { question: questionId, choice: choiceId });
    }
    
    setAnswers(newAnswers);
  };

  const handleFileUpload = (questionId: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const newFiles = new Map(uploadedFiles);
    const currentFiles = newFiles.get(questionId) || [];
    const filesArray = Array.from(files);
    
    newFiles.set(questionId, [...currentFiles, ...filesArray]);
    setUploadedFiles(newFiles);
  };

  const removeFile = (questionId: number, fileIndex: number) => {
    const newFiles = new Map(uploadedFiles);
    const currentFiles = newFiles.get(questionId) || [];
    currentFiles.splice(fileIndex, 1);
    
    if (currentFiles.length > 0) {
      newFiles.set(questionId, currentFiles);
    } else {
      newFiles.delete(questionId);
    }
    
    setUploadedFiles(newFiles);
  };

  const saveAnswer = async (questionId: number) => {
    const answer = answers.get(questionId);
    if (!answer || !attemptId) return;

    try {
      // Save answer
      const response = await api.post('/answers/', {
        attempt: attemptId,
        ...answer
      });

      // Upload files if any
      const files = uploadedFiles.get(questionId);
      if (files && files.length > 0 && response.data.id) {
        for (const file of files) {
          const formData = new FormData();
          formData.append('answer', response.data.id.toString());
          formData.append('title', file.name);
          formData.append('file', file);

          await api.post('/documents/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
      }
    } catch (error) {
      console.error('Failed to save answer:', error);
      throw error;
    }
  };

  const handleNext = async () => {
    const currentQuestion = questions[currentIndex];
    
    try {
      await saveAnswer(currentQuestion.id);
      
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    } catch (error) {
      alert('Failed to save answer. Please try again.');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!attemptId) return;
    
    // Check if current question is answered
    const currentQuestion = questions[currentIndex];
    const currentAnswer = answers.get(currentQuestion.id);
    
    if (!currentAnswer) {
      alert('Please answer the current question before submitting.');
      return;
    }
    
    setSubmitting(true);
    try {
      // Save last answer
      await saveAnswer(currentQuestion.id);

      // Complete attempt
      await attemptAPI.completeAttempt(attemptId);
      
      router.push(`/results/${attemptId}`);
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to submit questionnaire. Please try again.');
      setSubmitting(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Loading questionnaire...</div>
      </div>
    );
  }

  if (!user || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const currentAnswer = answers.get(currentQuestion.id);
  const currentFiles = uploadedFiles.get(currentQuestion.id) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="mb-6">
              <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                {currentQuestion.category_name}
              </span>
            </div>

            <div 
              className="text-xl text-neutral mb-8 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentQuestion.text }}
            />

            {/* Question Attachment */}
            {currentQuestion.attachment && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <i className="fas fa-paperclip text-blue-600 mr-2"></i>
                <a 
                  href={currentQuestion.attachment} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View Attachment
                </a>
              </div>
            )}

            {/* Choices */}
            <div className="space-y-3 mb-6">
              {currentQuestion.choices.map((choice) => {
                const isSelected = currentQuestion.allow_multiple
                  ? currentAnswer?.choices_ids?.includes(choice.id)
                  : currentAnswer?.choice === choice.id;

                return (
                  <button
                    key={choice.id}
                    onClick={() => handleAnswer(currentQuestion.id, choice.id, currentQuestion.allow_multiple)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded ${
                        currentQuestion.allow_multiple ? 'rounded-md' : 'rounded-full'
                      } border-2 mr-3 flex items-center justify-center ${
                        isSelected ? 'border-primary bg-primary' : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <i className="fas fa-check text-white text-xs"></i>
                        )}
                      </div>
                      <span className="text-neutral">{choice.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {currentQuestion.allow_multiple && (
              <p className="text-sm text-gray-500 mb-4">
                <i className="fas fa-info-circle mr-1"></i>
                You can select multiple answers
              </p>
            )}

            {/* File Upload Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <i className="fas fa-upload mr-2"></i>
                Upload Supporting Documents (Optional)
              </label>
              
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(currentQuestion.id, e.target.files)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer"
              />

              {/* Uploaded Files List */}
              {currentFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {currentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <i className="fas fa-file text-primary mr-3"></i>
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        onClick={() => removeFile(currentQuestion.id, index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-gray-200 text-neutral rounded-lg font-semibold hover:bg-gray-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting || !currentAnswer}
                className="px-8 py-3 bg-success text-white rounded-lg font-semibold hover:bg-success/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-check mr-2"></i>
                    Submit Assessment
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!currentAnswer}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
