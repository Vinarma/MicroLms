// Initialize demo data for the LMS
export const initializeDemoData = () => {
  // Check if demo data already exists
  const users = localStorage.getItem('lms_users');
  
  if (!users) {
    // Create demo users
    const demoUsers = [
      {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex@demo.com',
        password: 'demo123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        enrolledCourses: ['course-1', 'course-4', 'course-ai-1', 'course-react-1'],
        completedLessons: ['lesson-1-1', 'lesson-1-2', 'lesson-4-1', 'lesson-ai-1-1'],
        quizScores: {
          'quiz-1-1': 95,
          'quiz-4-1': 88,
          'quiz-ai-1-1': 92
        },
        assignmentScores: {
          'assign-ai-1': 90
        },
        totalPoints: 850,
        streak: 5,
        lastLoginDate: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah@demo.com',
        password: 'demo123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        enrolledCourses: ['course-ml-1', 'course-react-1', 'course-cn-1'],
        completedLessons: ['lesson-ml-1-1', 'lesson-ml-1-2', 'lesson-react-1-1'],
        quizScores: {
          'quiz-ml-1-1': 98,
          'quiz-react-1-1': 96
        },
        assignmentScores: {
          'assign-ml-1': 95,
          'assign-react-1': 92
        },
        totalPoints: 1200,
        streak: 12,
        lastLoginDate: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Michael Rodriguez',
        email: 'michael@demo.com',
        password: 'demo123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        enrolledCourses: ['course-dsa-1', 'course-cn-1'],
        completedLessons: ['lesson-dsa-1-1', 'lesson-cn-1-1', 'lesson-cn-1-2'],
        quizScores: {
          'quiz-dsa-1-1': 87,
          'quiz-cn-1-1': 91
        },
        assignmentScores: {
          'assign-dsa-1': 88
        },
        totalPoints: 720,
        streak: 3,
        lastLoginDate: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Emily Watson',
        email: 'emily@demo.com',
        password: 'demo123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        enrolledCourses: ['course-2', 'course-3', 'course-7', 'course-8'],
        completedLessons: ['lesson-2-1', 'lesson-2-2', 'lesson-3-1', 'lesson-7-1'],
        quizScores: {
          'quiz-2-1': 93,
          'quiz-3-1': 89,
          'quiz-7-1': 94
        },
        assignmentScores: {},
        totalPoints: 680,
        streak: 7,
        lastLoginDate: new Date().toISOString()
      },
      {
        id: '5',
        name: 'David Kim',
        email: 'david@demo.com',
        password: 'demo123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        enrolledCourses: ['course-ai-1', 'course-ml-1', 'course-cloud-1'],
        completedLessons: ['lesson-ai-1-1', 'lesson-ai-1-2', 'lesson-ml-1-1'],
        quizScores: {
          'quiz-ai-1-1': 100,
          'quiz-ml-1-1': 95,
          'quiz-cloud-1-1': 92
        },
        assignmentScores: {
          'assign-ai-1': 98,
          'assign-ml-1': 97
        },
        totalPoints: 950,
        streak: 15,
        lastLoginDate: new Date().toISOString()
      }
    ];

    localStorage.setItem('lms_users', JSON.stringify(demoUsers));
    console.log('Demo data initialized with 5 users');
  }
};

// Call this on app load
if (typeof window !== 'undefined') {
  initializeDemoData();
}
