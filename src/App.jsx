/**
 * MicroLMS - Advanced Learning Management System
 * 
 * Features:
 * - User Authentication (Login, Register, Forgot Password)
 * - Dashboard with statistics and 3D animations
 * - Course Catalog with search and filtering
 * - Video Lessons, Interactive Quizzes, and Assignments
 * - Leaderboard/Scoreboard with rankings
 * - Mini Educational Games (Code Quiz, Memory Match, Typing Challenge)
 * - User Profile with progress tracking
 * - Points and streak system
 * 
 * Courses Available:
 * - AI & Machine Learning (AI, ML)
 * - Web Development (HTML/CSS, JavaScript, React)
 * - Computer Science (Computer Networks, Data Structures & Algorithms)
 * - Cloud & DevOps (AWS)
 * - Microsoft Office Suite (Excel, Word, PowerPoint)
 * - Design Tools (Photoshop, Figma, Canva)
 * 
 * Demo Credentials:
 * Email: alex@demo.com | Password: demo123
 * Email: sarah@demo.com | Password: demo123
 * 
 * Or create your own account!
 */

import { useState, useEffect } from 'react';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { NewDashboard } from './components/NewDashboard';
import { NewCourseList } from './components/NewCourseList';
import { CourseView } from './components/CourseView';
import { ProfilePage } from './components/ProfilePage';
import { Scoreboard } from './components/Scoreboard';
import { MiniGames } from './components/MiniGames';
import { Sidebar } from './components/Sidebar';
import { getCurrentUser, setCurrentUser, updateUser } from './utils/auth';
import { courses as oldCourses } from './data/courses';
import { newCourses } from './data/newCourses';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import './utils/initializeDemo';

export default function App() {
  const [authView, setAuthView] = useState('login');
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setCurrentUser(loggedInUser);
  };

  const handleRegister = (newUser) => {
    setUser(newUser);
    setCurrentUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentUser(null);
    setCurrentView('dashboard');
    
    toast.info('Logged out', {
      description: 'See you soon! 👋'
    });
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
  };

  const handleEnrollCourse = (courseId) => {
    if (user && !user.enrolledCourses.includes(courseId)) {
      const course = allCourses.find(c => c.id === courseId);
      const updatedUser = {
        ...user,
        enrolledCourses: [...user.enrolledCourses, courseId]
      };
      setUser(updatedUser);
      updateUser(updatedUser);
      setCurrentUser(updatedUser);
      
      toast.success('Enrolled! 🎉', {
        description: `You're now enrolled in ${course?.title}`
      });
    }
  };

  const handleLessonComplete = (lessonId) => {
    if (user && !user.completedLessons.includes(lessonId)) {
      const updatedUser = {
        ...user,
        completedLessons: [...user.completedLessons, lessonId],
        totalPoints: user.totalPoints + 10
      };
      setUser(updatedUser);
      updateUser(updatedUser);
      setCurrentUser(updatedUser);
      
      toast.success('Lesson completed! ✨', {
        description: '+10 points earned'
      });
    }
  };

  const handleQuizComplete = (quizId, score) => {
    if (user) {
      const points = Math.floor(score / 10) * 5; // 5 points per 10% score
      const updatedUser = {
        ...user,
        quizScores: {
          ...user.quizScores,
          [quizId]: score
        },
        totalPoints: user.totalPoints + points
      };
      setUser(updatedUser);
      updateUser(updatedUser);
      setCurrentUser(updatedUser);
      
      toast.success(`Quiz completed! 🎯`, {
        description: `Score: ${score}% | +${points} points`
      });
    }
  };

  const handleAssignmentComplete = (assignmentId, score) => {
    if (user) {
      const points = Math.floor(score / 10) * 10; // 10 points per 10% score
      const updatedUser = {
        ...user,
        assignmentScores: {
          ...user.assignmentScores,
          [assignmentId]: score
        },
        totalPoints: user.totalPoints + points
      };
      setUser(updatedUser);
      updateUser(updatedUser);
      setCurrentUser(updatedUser);
      
      toast.success('Assignment submitted! 📝', {
        description: `Score: ${score}% | +${points} points`
      });
    }
  };

  const handleGameScoreUpdate = (points) => {
    if (user) {
      const updatedUser = {
        ...user,
        totalPoints: user.totalPoints + points
      };
      setUser(updatedUser);
      updateUser(updatedUser);
      setCurrentUser(updatedUser);
      
      toast.success('Great job! 🎮', {
        description: `+${points} points from mini game`
      });
    }
  };

  // Authentication screens
  if (!user) {
    if (authView === 'register') {
      return (
        <Register
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    }

    if (authView === 'forgot-password') {
      return (
        <ForgotPassword
          onBackToLogin={() => setAuthView('login')}
        />
      );
    }

    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthView('register')}
        onSwitchToForgotPassword={() => setAuthView('forgot-password')}
      />
    );
  }

  const allCourses = [...oldCourses, ...newCourses];

  // Main app with sidebar navigation
  return (
    <>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar 
          currentView={currentView} 
          onViewChange={setCurrentView}
          onLogout={handleLogout}
          user={user}
        />
        
        <main className="flex-1 overflow-y-auto">
          {currentView === 'dashboard' && (
            <NewDashboard 
              user={user} 
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'courses' && (
            <NewCourseList 
              user={user}
              onCourseSelect={handleCourseSelect}
              onEnroll={handleEnrollCourse}
            />
          )}

          {currentView === 'course-detail' && selectedCourse && (
            <CourseView 
              course={selectedCourse}
              user={user}
              onLessonComplete={handleLessonComplete}
              onQuizComplete={handleQuizComplete}
              onAssignmentComplete={handleAssignmentComplete}
              onBack={() => setCurrentView('courses')}
            />
          )}

          {currentView === 'profile' && (
            <ProfilePage 
              user={user}
              onCourseSelect={handleCourseSelect}
            />
          )}

          {currentView === 'scoreboard' && (
            <Scoreboard currentUserId={user.id} />
          )}

          {currentView === 'games' && (
            <MiniGames 
              userId={user.id}
              onScoreUpdate={handleGameScoreUpdate}
            />
          )}
        </main>
      </div>
      <Toaster />
    </>
  );
}