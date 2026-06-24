import { Card } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, Trophy, Target, TrendingUp, Award, Flame, Clock, Star } from 'lucide-react';
import { Progress } from './ui/progress';
import { courses as oldCourses } from '../data/courses';
import { newCourses } from '../data/newCourses';

export function NewDashboard({ user, onNavigate }) {
  const allCourses = [...oldCourses, ...newCourses];
  const enrolledCourses = allCourses.filter(c => user.enrolledCourses.includes(c.id));
  
  const totalLessons = enrolledCourses.reduce((sum, course) => sum + course.lessons.length, 0);
  const completedLessons = user.completedLessons.length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const stats = [
    {
      icon: BookOpen,
      label: 'Courses Enrolled',
      value: enrolledCourses.length,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Target,
      label: 'Lessons Completed',
      value: completedLessons,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Trophy,
      label: 'Total Points',
      value: user.totalPoints,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Flame,
      label: 'Day Streak',
      value: user.streak,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const quickActions = [
    { label: 'Browse Courses', icon: BookOpen, action: () => onNavigate('courses'), gradient: 'from-blue-600 to-cyan-600' },
    { label: 'View Leaderboard', icon: Trophy, action: () => onNavigate('scoreboard'), gradient: 'from-yellow-500 to-orange-500' },
    { label: 'Play Mini Games', icon: Award, action: () => onNavigate('games'), gradient: 'from-purple-600 to-pink-600' },
    { label: 'My Profile', icon: Star, action: () => onNavigate('profile'), gradient: 'from-indigo-600 to-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header with 3D effect */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden"
               style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" 
                 style={{ animation: 'float 6s ease-in-out infinite' }} />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"
                 style={{ animation: 'float 8s ease-in-out infinite 1s' }} />
            
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                Welcome back, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-xl text-white/90 mb-6">
                Ready to continue your learning journey?
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-300" />
                  <span className="font-semibold">{user.streak} Day Streak!</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span className="font-semibold">{user.totalPoints} Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid with 3D cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="card-3d bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                style={{ 
                  transformStyle: 'preserve-3d',
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className={`${stat.bgColor} p-6`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl mb-3 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Progress Overview */}
        <Card className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Progress</h2>
              <p className="text-gray-600">Keep up the great work!</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {progressPercentage}%
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>

          <Progress value={progressPercentage} className="h-4 mb-4" />

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">{completedLessons}</div>
                  <div className="text-sm text-gray-600">Lessons Done</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">{totalLessons - completedLessons}</div>
                  <div className="text-sm text-gray-600">Remaining</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-gray-800">{Object.keys(user.quizScores).length}</div>
                  <div className="text-sm text-gray-600">Quizzes Passed</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="card-3d bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    animation: `slideUp 0.5s ease-out ${index * 0.1 + 0.4}s both`
                  }}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-2xl mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="font-semibold text-gray-800">{action.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Continue Learning */}
        {enrolledCourses.length > 0 && (
          <Card className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Continue Learning</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.slice(0, 3).map((course, index) => {
                const courseLessons = course.lessons.length;
                const courseCompleted = course.lessons.filter(l => user.completedLessons.includes(l.id)).length;
                const courseProgress = Math.round((courseCompleted / courseLessons) * 100);

                return (
                  <div
                    key={course.id}
                    className="card-3d bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                    onClick={() => onNavigate('courses')}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover shadow-md"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{course.title}</h3>
                        <p className="text-xs text-gray-600">{course.instructor}</p>
                      </div>
                    </div>
                    <Progress value={courseProgress} className="h-2 mb-2" />
                    <div className="text-sm text-gray-600">{courseProgress}% Complete</div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
