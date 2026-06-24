import { useState } from 'react';
import { ArrowLeft, PlayCircle, CheckCircle, Award, Clock, FileText } from 'lucide-react';
import { VideoLesson } from './VideoLesson';
import { QuizLesson } from './QuizLesson';
import { AssignmentView } from './AssignmentView';

export function CourseView({ course, user, onLessonComplete, onQuizComplete, onAssignmentComplete, onBack }) {
  const [selectedLesson, setSelectedLesson] = useState(course.lessons[0]);

  const completedLessons = course.lessons.filter((l) => user.completedLessons.includes(l.id)).length;
  const progress = Math.round((completedLessons / course.lessons.length) * 100);

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
  };

  const getLessonIcon = (type) => {
    switch (type) {
      case 'video':
        return PlayCircle;
      case 'quiz':
        return Award;
      case 'assignment':
        return FileText;
      default:
        return PlayCircle;
    }
  };

  const getLessonColor = (type) => {
    switch (type) {
      case 'video':
        return 'text-blue-600';
      case 'quiz':
        return 'text-purple-600';
      case 'assignment':
        return 'text-orange-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-gray-50">
      {/* Sidebar - Lesson List */}
      <div className="lg:w-80 bg-white border-r border-gray-200 overflow-y-auto shadow-lg">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </button>

          <h2 className="font-bold text-xl text-gray-900 mb-4">{course.title}</h2>
          
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600 font-medium">Course Progress</span>
              <span className="font-bold text-purple-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500 shadow-md"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg shadow-sm">
              <Award className="w-4 h-4" />
              {completedLessons}/{course.lessons.length}
            </div>
          </div>
        </div>

        <div className="p-3">
          {course.lessons.map((lesson, index) => {
            const isCompleted = user.completedLessons.includes(lesson.id);
            const isSelected = selectedLesson?.id === lesson.id;
            const LessonIcon = getLessonIcon(lesson.type);

            return (
              <button
                key={lesson.id}
                onClick={() => handleLessonSelect(lesson)}
                className={`w-full text-left p-4 rounded-xl mb-2 transition-all duration-300 transform hover:scale-102 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-500 shadow-md' 
                    : 'hover:bg-gray-50 border-2 border-transparent hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-purple-600 bg-purple-100' : 'border-gray-300'
                      }`}>
                        <span className="text-xs font-semibold text-gray-600">{index + 1}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <LessonIcon className={`w-4 h-4 ${getLessonColor(lesson.type)}`} />
                      <span className="text-xs font-semibold text-gray-500 uppercase">
                        {lesson.type}
                      </span>
                    </div>
                    <p className="font-semibold text-sm text-gray-900 mb-1">{lesson.title}</p>
                    {lesson.duration && (
                      <p className="text-xs text-gray-500">{lesson.duration}</p>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
        {selectedLesson ? (
          <div>
            {selectedLesson.type === 'video' ? (
              <VideoLesson 
                lesson={selectedLesson}
                isCompleted={user.completedLessons.includes(selectedLesson.id)}
                onComplete={() => onLessonComplete(selectedLesson.id)}
              />
            ) : selectedLesson.type === 'quiz' ? (
              <QuizLesson 
                lesson={selectedLesson}
                isCompleted={user.completedLessons.includes(selectedLesson.id)}
                previousScore={user.quizScores[selectedLesson.id]}
                onComplete={(score) => {
                  onQuizComplete(selectedLesson.id, score);
                  onLessonComplete(selectedLesson.id);
                }}
              />
            ) : selectedLesson.type === 'assignment' && selectedLesson.assignment && onAssignmentComplete ? (
              <AssignmentView 
                assignment={selectedLesson.assignment}
                userId={user.id}
                onComplete={(score) => {
                  onAssignmentComplete(selectedLesson.id, score);
                  onLessonComplete(selectedLesson.id);
                }}
              />
            ) : null}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a lesson to begin</p>
          </div>
        )}
      </div>
    </div>
  );
}
