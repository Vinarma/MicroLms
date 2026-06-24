import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { FileText, Upload, CheckCircle2, Clock, Award } from 'lucide-react';
import { saveAssignmentSubmission, getAssignmentSubmission } from '../utils/storage';

export function AssignmentView({ assignment, userId, onComplete }) {
  const [submission, setSubmission] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const existing = getAssignmentSubmission(userId, assignment.id);
    if (existing) {
      setSubmission(existing.submission);
      setFileUrl(existing.fileUrl || '');
      setIsSubmitted(existing.submitted);
      setScore(existing.score || 0);
    }
  }, [userId, assignment.id]);

  const handleSubmit = () => {
    // Simulate grading - in real app, this would be done by instructor
    const autoScore = Math.floor(Math.random() * 20) + 80; // Random score between 80-100
    
    const submissionData = {
      submission,
      fileUrl,
      submitted: true,
      score: autoScore,
      submittedAt: new Date().toISOString()
    };

    saveAssignmentSubmission(userId, assignment.id, submissionData);
    setIsSubmitted(true);
    setScore(autoScore);
    onComplete(autoScore);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-8 h-8" />
                <h1 className="text-3xl font-bold">{assignment.title}</h1>
              </div>
              <p className="text-indigo-100 text-lg">{assignment.description}</p>
            </div>
            {isSubmitted && (
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center min-w-[120px]">
                <Award className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-bold">{score}%</div>
                <div className="text-xs text-indigo-100">Your Score</div>
              </div>
            )}
          </div>
        </div>

        <div className="p-8">
          {/* Assignment Details */}
          <div className="mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5 text-purple-600" />
                <span>Max Score: <span className="font-semibold">{assignment.maxScore} points</span></span>
              </div>
              {assignment.dueDate && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <span>Due: <span className="font-semibold">{assignment.dueDate}</span></span>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Instructions</h3>
              <ul className="space-y-3">
                {assignment.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submission Area */}
          {!isSubmitted ? (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-3">Your Submission</label>
                <Textarea
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                  placeholder="Write your assignment submission here... You can include your findings, code explanations, or analysis."
                  className="min-h-[300px] border-2 border-gray-200 rounded-xl focus:border-purple-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">File/Link (Optional)</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="Paste GitHub link, Google Drive link, or file URL"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="px-6 border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <Upload className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={!submission.trim()}
                  className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Submit Assignment
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Assignment Submitted!</h3>
              <p className="text-gray-600 mb-6">
                Your assignment has been submitted and graded automatically.
              </p>

              {/* Display submission */}
              <div className="bg-white rounded-xl p-6 text-left mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Your Submission:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{submission}</p>
                {fileUrl && (
                  <div className="mt-4">
                    <span className="font-semibold text-gray-700">File/Link: </span>
                    <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
                      {fileUrl}
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-6">
                <div className="text-4xl font-bold mb-2">{score} / {assignment.maxScore}</div>
                <p className="text-sm opacity-90">Excellent work! Keep it up!</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
