export const courses = [
  // Microsoft Office Suite
  {
    id: 'course-1',
    title: 'Microsoft Excel Fundamentals',
    description: 'Master Excel basics including formulas, functions, charts, and data analysis. Perfect for beginners.',
    category: 'Microsoft Office',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    instructor: 'Sarah Mitchell',
    duration: '2h 30m',
    level: 'Beginner',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Introduction to Excel Interface',
        type: 'video',
        duration: '15m',
        videoUrl: 'https://www.youtube.com/embed/RjvMS3DEFIc'
      },
      {
        id: 'lesson-1-2',
        title: 'Basic Formulas and Functions',
        type: 'video',
        duration: '20m',
        videoUrl: 'https://www.youtube.com/embed/6K51HJdLPGo'
      },
      {
        id: 'quiz-1-1',
        title: 'Excel Basics Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q1',
            question: 'Which function is used to add numbers in Excel?',
            options: ['SUM()', 'ADD()', 'TOTAL()', 'PLUS()'],
            correctAnswer: 0
          },
          {
            id: 'q2',
            question: 'What does the $ symbol do in cell references?',
            options: ['Converts to currency', 'Makes reference absolute', 'Adds a dollar sign', 'None of the above'],
            correctAnswer: 1
          },
          {
            id: 'q3',
            question: 'Which shortcut selects all cells in a worksheet?',
            options: ['Ctrl+S', 'Ctrl+A', 'Ctrl+X', 'Ctrl+Z'],
            correctAnswer: 1
          }
        ]
      },
      {
        id: 'lesson-1-3',
        title: 'Creating Charts and Graphs',
        type: 'video',
        duration: '18m',
        videoUrl: 'https://www.youtube.com/embed/DAU0Ggr_rv8'
      },
      {
        id: 'quiz-1-2',
        title: 'Charts and Data Visualization Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q4',
            question: 'Which chart type is best for showing trends over time?',
            options: ['Pie Chart', 'Line Chart', 'Bar Chart', 'Scatter Plot'],
            correctAnswer: 1
          },
          {
            id: 'q5',
            question: 'What is a pivot table used for?',
            options: ['Drawing shapes', 'Summarizing data', 'Creating macros', 'Printing'],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Microsoft Word Professional Documents',
    description: 'Learn to create professional documents, reports, and templates using Microsoft Word.',
    category: 'Microsoft Office',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop',
    instructor: 'Michael Chen',
    duration: '1h 45m',
    level: 'Beginner',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Document Formatting Basics',
        type: 'video',
        duration: '12m',
        videoUrl: 'https://www.youtube.com/embed/Ie_tvJLqMYk'
      },
      {
        id: 'lesson-2-2',
        title: 'Styles and Templates',
        type: 'video',
        duration: '15m',
        videoUrl: 'https://www.youtube.com/embed/YLAj3wQ0q6U'
      },
      {
        id: 'quiz-2-1',
        title: 'Word Formatting Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q6',
            question: 'What is the shortcut for bold text?',
            options: ['Ctrl+I', 'Ctrl+B', 'Ctrl+U', 'Ctrl+T'],
            correctAnswer: 1
          },
          {
            id: 'q7',
            question: 'What feature helps maintain consistent formatting?',
            options: ['Themes', 'Styles', 'Colors', 'Fonts'],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: 'course-3',
    title: 'PowerPoint Presentation Mastery',
    description: 'Create stunning presentations that engage and persuade your audience.',
    category: 'Microsoft Office',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    instructor: 'Emily Rodriguez',
    duration: '2h 15m',
    level: 'Intermediate',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'Presentation Design Principles',
        type: 'video',
        duration: '18m',
        videoUrl: 'https://www.youtube.com/embed/Iwpi1Lm6dFo'
      },
      {
        id: 'lesson-3-2',
        title: 'Animations and Transitions',
        type: 'video',
        duration: '14m',
        videoUrl: 'https://www.youtube.com/embed/NA_kkMQp3VU'
      },
      {
        id: 'quiz-3-1',
        title: 'PowerPoint Essentials Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q8',
            question: 'What is the recommended font size for presentations?',
            options: ['10-12 pt', '18-24 pt', '28-32 pt', '40-44 pt'],
            correctAnswer: 2
          }
        ]
      }
    ]
  },

  // Web Development
  {
    id: 'course-4',
    title: 'HTML & CSS Fundamentals',
    description: 'Build beautiful, responsive websites from scratch with HTML5 and CSS3.',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=800&h=600&fit=crop',
    instructor: 'David Kim',
    duration: '3h 20m',
    level: 'Beginner',
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'HTML Structure and Semantics',
        type: 'video',
        duration: '22m',
        videoUrl: 'https://www.youtube.com/embed/qz0aGYrrlhU'
      },
      {
        id: 'lesson-4-2',
        title: 'CSS Styling Basics',
        type: 'video',
        duration: '25m',
        videoUrl: 'https://www.youtube.com/embed/yfoY53QXEnI'
      },
      {
        id: 'quiz-4-1',
        title: 'HTML/CSS Basics Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q9',
            question: 'Which tag is used for the largest heading?',
            options: ['<head>', '<h6>', '<h1>', '<heading>'],
            correctAnswer: 2
          },
          {
            id: 'q10',
            question: 'What does CSS stand for?',
            options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style System', 'Colorful Style Sheets'],
            correctAnswer: 1
          }
        ]
      },
      {
        id: 'lesson-4-3',
        title: 'Responsive Design with Flexbox',
        type: 'video',
        duration: '20m',
        videoUrl: 'https://www.youtube.com/embed/fYq5PXgSsbE'
      }
    ]
  },
  {
    id: 'course-5',
    title: 'JavaScript for Beginners',
    description: 'Learn JavaScript programming from basics to interactive web applications.',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop',
    instructor: 'Rachel Adams',
    duration: '4h 10m',
    level: 'Beginner',
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'JavaScript Variables and Data Types',
        type: 'video',
        duration: '18m',
        videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk'
      },
      {
        id: 'lesson-5-2',
        title: 'Functions and Control Flow',
        type: 'video',
        duration: '24m',
        videoUrl: 'https://www.youtube.com/embed/xUI5Tsl2JpY'
      },
      {
        id: 'quiz-5-1',
        title: 'JavaScript Fundamentals Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q11',
            question: 'Which keyword declares a constant variable?',
            options: ['var', 'let', 'const', 'static'],
            correctAnswer: 2
          },
          {
            id: 'q12',
            question: 'What is the correct way to write a JavaScript array?',
            options: ['var colors = "red", "green"', 'var colors = (1:"red", 2:"green")', 'var colors = ["red", "green"]', 'var colors = {"red", "green"}'],
            correctAnswer: 2
          }
        ]
      }
    ]
  },
  {
    id: 'course-6',
    title: 'React Development Basics',
    description: 'Build modern web applications with React, the popular JavaScript library.',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    instructor: 'Tom Wilson',
    duration: '3h 45m',
    level: 'Intermediate',
    lessons: [
      {
        id: 'lesson-6-1',
        title: 'Introduction to React Components',
        type: 'video',
        duration: '20m',
        videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8'
      },
      {
        id: 'lesson-6-2',
        title: 'State and Props',
        type: 'video',
        duration: '22m',
        videoUrl: 'https://www.youtube.com/embed/4pO-HcG2igk'
      },
      {
        id: 'quiz-6-1',
        title: 'React Basics Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q13',
            question: 'What hook is used for state management?',
            options: ['useEffect', 'useState', 'useContext', 'useReducer'],
            correctAnswer: 1
          }
        ]
      }
    ]
  },

  // Design Tools
  {
    id: 'course-7',
    title: 'Adobe Photoshop Essentials',
    description: 'Master photo editing and digital design with Adobe Photoshop.',
    category: 'Design Tools',
    thumbnail: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=600&fit=crop',
    instructor: 'Lisa Thompson',
    duration: '3h 30m',
    level: 'Beginner',
    lessons: [
      {
        id: 'lesson-7-1',
        title: 'Photoshop Interface Overview',
        type: 'video',
        duration: '15m',
        videoUrl: 'https://www.youtube.com/embed/IyR_uYsRdPs'
      },
      {
        id: 'lesson-7-2',
        title: 'Layers and Selections',
        type: 'video',
        duration: '20m',
        videoUrl: 'https://www.youtube.com/embed/3rG0ML87YYo'
      },
      {
        id: 'quiz-7-1',
        title: 'Photoshop Basics Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q14',
            question: 'What is the shortcut for creating a new layer?',
            options: ['Ctrl+J', 'Ctrl+Shift+N', 'Ctrl+N', 'Ctrl+L'],
            correctAnswer: 1
          },
          {
            id: 'q15',
            question: 'Which tool is used for removing backgrounds?',
            options: ['Brush Tool', 'Magic Wand/Quick Selection', 'Eraser Tool', 'Crop Tool'],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: 'course-8',
    title: 'Figma UI/UX Design',
    description: 'Design beautiful user interfaces and prototypes with Figma.',
    category: 'Design Tools',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    instructor: 'James Park',
    duration: '2h 50m',
    level: 'Intermediate',
    lessons: [
      {
        id: 'lesson-8-1',
        title: 'Getting Started with Figma',
        type: 'video',
        duration: '16m',
        videoUrl: 'https://www.youtube.com/embed/FTFaQWZBqQ8'
      },
      {
        id: 'lesson-8-2',
        title: 'Components and Auto Layout',
        type: 'video',
        duration: '25m',
        videoUrl: 'https://www.youtube.com/embed/Cx2dkpBxst8'
      },
      {
        id: 'quiz-8-1',
        title: 'Figma Fundamentals Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q16',
            question: 'What is a component in Figma?',
            options: ['A color style', 'A reusable design element', 'A plugin', 'A frame type'],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: 'course-9',
    title: 'Canva Design for Everyone',
    description: 'Create stunning graphics and social media content with Canva.',
    category: 'Design Tools',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop',
    instructor: 'Nina Patel',
    duration: '1h 30m',
    level: 'Beginner',
    lessons: [
      {
        id: 'lesson-9-1',
        title: 'Canva Basics and Templates',
        type: 'video',
        duration: '12m',
        videoUrl: 'https://www.youtube.com/embed/5qap5aO4i9A'
      },
      {
        id: 'lesson-9-2',
        title: 'Creating Social Media Graphics',
        type: 'video',
        duration: '18m',
        videoUrl: 'https://www.youtube.com/embed/OOy0ZPZzwAg'
      },
      {
        id: 'quiz-9-1',
        title: 'Canva Essentials Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q17',
            question: 'What is Canva primarily used for?',
            options: ['Video editing', 'Graphic design', '3D modeling', 'Web development'],
            correctAnswer: 1
          }
        ]
      }
    ]
  }
];
