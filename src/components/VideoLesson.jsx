import { useState } from 'react';
import { CheckCircle, Play } from 'lucide-react';

export function VideoLesson({ lesson, isCompleted, onComplete }) {
  const [hasWatched, setHasWatched] = useState(isCompleted);

  const handleVideoEnd = () => {
    setHasWatched(true);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Play className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{lesson.title}</h1>
          </div>
          {lesson.duration && (
            <p className="text-gray-600">Duration: {lesson.duration}</p>
          )}
        </div>

        {/* Video Player */}
        <div className="bg-black rounded-xl overflow-hidden mb-6 aspect-video">
          {lesson.videoUrl ? (
            <iframe
              src={lesson.videoUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => {
                // Simulate video watch for demo
                setTimeout(() => setHasWatched(true), 3000);
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white">Video content would appear here</p>
            </div>
          )}
        </div>

        {/* Complete Button */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          {isCompleted ? (
            <div className="flex items-center gap-3 text-green-600">
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">Lesson completed! Great job!</span>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-4">
                {hasWatched 
                  ? "Mark this lesson as complete to track your progress."
                  : "Watch the video to mark this lesson as complete."}
              </p>
              <button
                onClick={onComplete}
                disabled={!hasWatched}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  hasWatched
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Mark as Complete
              </button>
            </div>
          )}
        </div>

        {/* Additional Resources */}
        <div className="mt-6 bg-blue-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">Key Takeaways</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Practice the concepts covered in this lesson</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Take notes on important points for future reference</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Review the material if needed before moving to the next lesson</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
