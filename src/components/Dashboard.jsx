import { courses } from '../data/courses';
import { TrendingUp, BookOpen, Award, Clock } from 'lucide-react';

export function Dashboard({ user, onCourseSelect }) {
  const enrolledCourses = courses.filter(c => user.enrolledCourses.includes(c.id));
  
  const totalLessons = enrolledCourses.reduce((acc, course) => acc + course.lessons.length, 0);
  const completedCount = user.completedLessons.length;
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  const quizzesTaken = Object.keys(user.quizScores).length;
  const averageScore = quizzesTaken > 0 
    ? Math.round(Object.values(user.quizScores).reduce((a, b) => a + b, 0) / quizzesTaken)
    : 0;

  const stats = [
    { label: 'Courses Enrolled', value: enrolledCourses.length, icon: BookOpen, color: 'blue' },
    { label: 'Overall Progress', value: `${overallProgress}%`, icon: TrendingUp, color: 'green' },
    { label: 'Quizzes Completed', value: quizzesTaken, icon: Award, color: 'purple' },
    { label: 'Average Score', value: `${averageScore}%`, icon: Award, color: 'orange' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600">Continue your learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Continue Learning Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {enrolledCourses.slice(0, 2).map((course) => {
            const courseLessons = course.lessons.length;
            const completedLessons = course.lessons.filter(l => 
              user.completedLessons.includes(l.id)
            ).length;
            const progress = Math.round((completedLessons / courseLessons) * 100);

            return (
              <div 
                key={course.id} 
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onCourseSelect(course)}
              >
                <div className="flex flex-col sm:flex-row">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full sm:w-48 h-48 object-cover"
                  />
                  <div className="p-6 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded">
                        {course.category}
                      </span>
                      <span className="text-xs text-gray-500">{course.level}</span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {completedLessons}/{courseLessons} lessons
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            {user.completedLessons.slice(-5).reverse().map((lessonId, index) => {
              const course = courses.find(c => c.lessons.some(l => l.id === lessonId));
              const lesson = course?.lessons.find(l => l.id === lessonId);
              
              if (!course || !lesson) return null;

              return (
                <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{lesson.title}</p>
                    <p className="text-sm text-gray-600">{course.title}</p>
                  </div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
              );
            })}
            {user.completedLessons.length === 0 && (
              <p className="text-center text-gray-500 py-4">No activity yet. Start learning!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
