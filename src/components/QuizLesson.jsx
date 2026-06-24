import { useState } from 'react';
import { Award, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export function QuizLesson({ lesson, isCompleted, previousScore, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = lesson.quiz || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate score
      const correctAnswers = questions.filter((q, index) => 
        q.correctAnswer === selectedAnswers[index]
      ).length;
      const score = Math.round((correctAnswers / questions.length) * 100);
      setShowResults(true);
      onComplete(score);
    }
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(true);
  };

  const calculateScore = () => {
    const correctAnswers = questions.filter((q, index) => 
      q.correctAnswer === selectedAnswers[index]
    ).length;
    return Math.round((correctAnswers / questions.length) * 100);
  };

  if (!quizStarted && !isCompleted) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{lesson.title}</h1>
            <p className="text-gray-600 mb-6">
              Test your knowledge with {questions.length} questions
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700">
                You need to score 70% or higher to pass this quiz. Good luck!
              </p>
            </div>
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults || (isCompleted && !quizStarted)) {
    const score = showResults ? calculateScore() : previousScore || 0;
    const correctAnswers = questions.filter((q, index) => 
      q.correctAnswer === selectedAnswers[index]
    ).length;

    return (
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
              score >= 70 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {score >= 70 ? (
                <CheckCircle className="w-12 h-12 text-green-600" />
              ) : (
                <XCircle className="w-12 h-12 text-red-600" />
              )}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {score >= 70 ? 'Congratulations!' : 'Keep Learning!'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              {score >= 70 
                ? 'You passed the quiz!' 
                : 'You need 70% to pass. Try again!'}
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-5xl font-bold text-gray-900 mb-2">{score}%</div>
              <p className="text-gray-600">
                {correctAnswers} out of {questions.length} correct
              </p>
            </div>

            {/* Question Review */}
            <div className="text-left mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Review Your Answers</h3>
              <div className="space-y-3">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Correct answer: </span>
                            {question.options[question.correctAnswer]}
                          </p>
                          {!isCorrect && userAnswer !== undefined && (
                            <p className="text-sm text-red-600">
                              <span className="font-medium">Your answer: </span>
                              {question.options[userAnswer]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleRetake}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mx-auto"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span className="font-medium text-gray-900">
                {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswers[currentQuestionIndex] === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestionIndex] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestionIndex] === undefined}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
