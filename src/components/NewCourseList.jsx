import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookOpen, Clock, User, Star, Search } from 'lucide-react';
import { Input } from './ui/input';
import { courses as oldCourses } from '../data/courses';
import { newCourses } from '../data/newCourses';

export function NewCourseList({ user, onCourseSelect, onEnroll }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allCourses = [...oldCourses, ...newCourses];

  const categories = ['All', ...Array.from(new Set(allCourses.map(c => c.category)))];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Explore Courses
          </h1>
          <p className="text-xl text-gray-600">Discover and enroll in amazing courses</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 rounded-2xl border-2 focus:border-purple-500 text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => {
            const isEnrolled = user.enrolledCourses.includes(course.id);
            const courseLessons = course.lessons.length;
            const courseCompleted = course.lessons.filter((l) => user.completedLessons.includes(l.id)).length;
            const progress = courseLessons > 0 ? Math.round((courseCompleted / courseLessons) * 100) : 0;

            return (
              <Card
                key={course.id}
                className="card-3d bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer"
                style={{ 
                  transformStyle: 'preserve-3d',
                  animation: `slideUp 0.5s ease-out ${index * 0.05}s both`
                }}
                onClick={() => onCourseSelect(course)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className={`${
                      course.level === 'Beginner' ? 'bg-green-500' :
                      course.level === 'Intermediate' ? 'bg-yellow-500' :
                      'bg-red-500'
                    } text-white`}>
                      {course.level}
                    </Badge>
                  </div>
                  {isEnrolled && progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-2">
                      <div className="flex items-center justify-between text-white text-sm">
                        <span>{progress}% Complete</span>
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </div>
                      <div className="w-full bg-white/30 h-1 rounded-full mt-1">
                        <div 
                          className="bg-white h-1 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                      {course.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons.length} Lessons</span>
                  </div>

                  {isEnrolled ? (
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCourseSelect(course);
                      }}
                    >
                      Continue Learning
                    </Button>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEnroll(course.id);
                      }}
                    >
                      Enroll Now
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <style>{`
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
