import { courses } from '../data/courses';
import { Award, BookOpen, TrendingUp, Calendar, CheckCircle, Clock } from 'lucide-react';

export function ProfilePage({ user, onCourseSelect }) {
  const enrolledCourses = courses.filter(c => user.enrolledCourses.includes(c.id));
  
  const totalLessons = enrolledCourses.reduce((acc, course) => acc + course.lessons.length, 0);
  const completedCount = user.completedLessons.length;
  const overallProgress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  
  const quizzesTaken = Object.keys(user.quizScores).length;
  const averageScore = quizzesTaken > 0 
    ? Math.round(Object.values(user.quizScores).reduce((a, b) => a + b, 0) / quizzesTaken)
    : 0;

  const getCourseProgress = (course) => {
    const courseLessons = course.lessons.length;
    const completedLessons = course.lessons.filter(l => 
      user.completedLessons.includes(l.id)
    ).length;
    return Math.round((completedLessons / courseLessons) * 100);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 md:p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white flex items-center justify-center">
              <span className="text-4xl font-bold">{user.name.charAt(0)}</span>
            </div>
          )}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-blue-100 mb-4">{user.email}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">{enrolledCourses.length} Courses</span>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">{quizzesTaken} Quizzes Completed</span>
                </div>
              </div>
              <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">{overallProgress}% Overall Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Stats */}
        <div className="space-y-6">
          {/* Learning Stats */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Learning Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Lessons Completed</p>
                    <p className="font-bold text-gray-900">{completedCount}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overall Progress</p>
                    <p className="font-bold text-gray-900">{overallProgress}%</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Award className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Quiz Score</p>
                    <p className="font-bold text-gray-900">{averageScore}%</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-bold text-gray-900">Jan 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-3">
              {completedCount >= 5 && (
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-3 text-center">
                  <div className="text-3xl mb-1">🏆</div>
                  <p className="text-xs font-medium text-gray-700">5 Lessons</p>
                </div>
              )}
              {enrolledCourses.length >= 3 && (
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 text-center">
                  <div className="text-3xl mb-1">📚</div>
                  <p className="text-xs font-medium text-gray-700">3 Courses</p>
                </div>
              )}
              {averageScore >= 80 && (
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 text-center">
                  <div className="text-3xl mb-1">⭐</div>
                  <p className="text-xs font-medium text-gray-700">80% Average</p>
                </div>
              )}
              {quizzesTaken >= 3 && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 text-center">
                  <div className="text-3xl mb-1">🎯</div>
                  <p className="text-xs font-medium text-gray-700">Quiz Master</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Enrolled Courses */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-lg text-gray-900 mb-4">My Courses</h2>
            
            {enrolledCourses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet</p>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Browse Courses
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {enrolledCourses.map((course) => {
                  const progress = getCourseProgress(course);
                  const completedLessons = course.lessons.filter(l => 
                    user.completedLessons.includes(l.id)
                  ).length;

                  return (
                    <div 
                      key={course.id}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => onCourseSelect(course)}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-full sm:w-40 h-32 object-cover"
                        />
                        <div className="p-4 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded">
                              {course.category}
                            </span>
                            <span className="text-xs text-gray-500">{course.level}</span>
                          </div>
                          
                          <h3 className="font-bold text-gray-900 mb-2">{course.title}</h3>
                          
                          <div className="mb-3">
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
                              <CheckCircle className="w-4 h-4" />
                              {completedLessons}/{course.lessons.length} lessons
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Quiz Scores */}
          {quizzesTaken > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Recent Quiz Scores</h2>
              <div className="space-y-3">
                {Object.entries(user.quizScores).slice(-5).reverse().map(([quizId, score]) => {
                  const course = courses.find(c => c.lessons.some(l => l.id === quizId));
                  const quiz = course?.lessons.find(l => l.id === quizId);
                  
                  if (!course || !quiz) return null;

                  return (
                    <div key={quizId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{quiz.title}</p>
                        <p className="text-xs text-gray-600">{course.title}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        score >= 80 ? 'bg-green-100 text-green-700' :
                        score >= 70 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {score}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
