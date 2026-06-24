export const newCourses = [
  // AI & Machine Learning
  {
    id: 'course-ai-1',
    title: 'Introduction to Artificial Intelligence',
    description: 'Explore the fundamentals of AI, machine learning algorithms, and real-world applications.',
    category: 'AI & Machine Learning',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    instructor: 'Dr. Sarah Chen',
    duration: '4h 30m',
    level: 'Beginner',
    lessons: [
      {
        id: 'lesson-ai-1-1',
        title: 'What is Artificial Intelligence?',
        type: 'video',
        duration: '20m',
        videoUrl: 'https://www.youtube.com/embed/ad79nYk2keg'
      },
      {
        id: 'lesson-ai-1-2',
        title: 'AI Applications in Real World',
        type: 'video',
        duration: '25m',
        videoUrl: 'https://www.youtube.com/embed/mJeNghZXtMo'
      },
      {
        id: 'quiz-ai-1-1',
        title: 'AI Fundamentals Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q-ai-1',
            question: 'What is the main goal of Artificial Intelligence?',
            options: [
              'To replace all human jobs',
              'To create machines that can perform tasks requiring human intelligence',
              'To build robots only',
              'To make computers faster'
            ],
            correctAnswer: 1
          },
          {
            id: 'q-ai-2',
            question: 'Which of these is an AI application?',
            options: ['Microsoft Word', 'Voice assistants like Siri', 'Calculator', 'Notepad'],
            correctAnswer: 1
          },
          {
            id: 'q-ai-3',
            question: 'What is Machine Learning?',
            options: [
              'Teaching machines to build themselves',
              'A subset of AI where machines learn from data',
              'Programming robots',
              'Building hardware'
            ],
            correctAnswer: 1
          }
        ]
      },
      {
        id: 'assignment-ai-1-1',
        title: 'AI Use Case Analysis',
        type: 'assignment',
        assignment: {
          id: 'assign-ai-1',
          title: 'Identify and Analyze an AI Application',
          description: 'Research and document a real-world AI application',
          maxScore: 100,
          instructions: [
            'Choose an AI application used in daily life (e.g., Netflix recommendations, spam filters)',
            'Describe how the AI system works',
            'Explain what data it uses to make decisions',
            'Discuss the benefits and potential concerns',
            'Submit a 500-word report'
          ]
        }
      }
    ]
  },
  {
    id: 'course-ml-1',
    title: 'Machine Learning Fundamentals',
    description: 'Learn supervised and unsupervised learning, neural networks, and build your first ML models.',
    category: 'AI & Machine Learning',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    instructor: 'Prof. Michael Zhang',
    duration: '5h 15m',
    level: 'Intermediate',
    lessons: [
      {
        id: 'lesson-ml-1-1',
        title: 'Introduction to Machine Learning',
        type: 'video',
        duration: '22m',
        videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU'
      },
      {
        id: 'lesson-ml-1-2',
        title: 'Supervised vs Unsupervised Learning',
        type: 'video',
        duration: '28m',
        videoUrl: 'https://www.youtube.com/embed/rHeaoaiBM6Y'
      },
      {
        id: 'quiz-ml-1-1',
        title: 'ML Basics Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q-ml-1',
            question: 'In supervised learning, what do we use to train the model?',
            options: ['Labeled data', 'Random data', 'Unlabeled data', 'No data'],
            correctAnswer: 0
          },
          {
            id: 'q-ml-2',
            question: 'Which algorithm is used for classification?',
            options: ['Linear Regression', 'K-Means', 'Decision Trees', 'PCA'],
            correctAnswer: 2
          }
        ]
      },
      {
        id: 'lesson-ml-1-3',
        title: 'Neural Networks Explained',
        type: 'video',
        duration: '30m',
        videoUrl: 'https://www.youtube.com/embed/aircAruvnKk'
      },
      {
        id: 'assignment-ml-1-1',
        title: 'Build Your First ML Model',
        type: 'assignment',
        assignment: {
          id: 'assign-ml-1',
          title: 'Create a Simple Classification Model',
          description: 'Build a basic machine learning classifier',
          maxScore: 100,
          instructions: [
            'Choose a dataset (Iris, Wine, or similar)',
            'Implement a classification algorithm (Decision Tree or Logistic Regression)',
            'Train the model and evaluate its accuracy',
            'Document your process and results',
            'Submit code and a brief report'
          ]
        }
      }
    ]
  },
  // React Advanced
  {
    id: 'course-react-1',
    title: 'Advanced React Development',
    description: 'Master React hooks, context API, performance optimization, and modern patterns.',
    category: 'Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    instructor: 'Jessica Lee',
    duration: '6h 00m',
    level: 'Advanced',
    lessons: [
      {
        id: 'lesson-react-1-1',
        title: 'Advanced React Hooks',
        type: 'video',
        duration: '35m',
        videoUrl: 'https://www.youtube.com/embed/LlvBzyy-558'
      },
      {
        id: 'lesson-react-1-2',
        title: 'Context API and State Management',
        type: 'video',
        duration: '30m',
        videoUrl: 'https://www.youtube.com/embed/35lXWvCuM8o'
      },
      {
        id: 'quiz-react-1-1',
        title: 'React Hooks Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q-react-1',
            question: 'Which hook is used for side effects?',
            options: ['useState', 'useEffect', 'useContext', 'useMemo'],
            correctAnswer: 1
          },
          {
            id: 'q-react-2',
            question: 'What does useMemo do?',
            options: [
              'Manages state',
              'Memoizes expensive calculations',
              'Handles side effects',
              'Creates context'
            ],
            correctAnswer: 1
          },
          {
            id: 'q-react-3',
            question: 'When should you use useCallback?',
            options: [
              'To fetch data',
              'To memoize functions and prevent re-renders',
              'To manage forms',
              'To handle errors'
            ],
            correctAnswer: 1
          }
        ]
      },
      {
        id: 'lesson-react-1-3',
        title: 'Performance Optimization Techniques',
        type: 'video',
        duration: '28m',
        videoUrl: 'https://www.youtube.com/embed/uojLJFt9SzY'
      },
      {
        id: 'assignment-react-1-1',
        title: 'Build a Full-Stack React App',
        type: 'assignment',
        assignment: {
          id: 'assign-react-1',
          title: 'Create a Task Management Application',
          description: 'Build a complete React application with advanced features',
          maxScore: 100,
          instructions: [
            'Implement Context API for global state management',
            'Use custom hooks for reusable logic',
            'Add authentication flow (mock)',
            'Implement CRUD operations for tasks',
            'Optimize performance with useMemo and useCallback',
            'Submit GitHub repository link'
          ]
        }
      }
    ]
  },
  // Computer Networks
  {
    id: 'course-cn-1',
    title: 'Computer Networks Fundamentals',
    description: 'Understand networking concepts, protocols, TCP/IP, and network security basics.',
    category: 'Computer Science',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
    instructor: 'Dr. Robert Johnson',
    duration: '4h 45m',
    level: 'Intermediate',
    lessons: [
      {
        id: 'lesson-cn-1-1',
        title: 'Introduction to Computer Networks',
        type: 'video',
        duration: '25m',
        videoUrl: 'https://www.youtube.com/embed/3QhU9jd03a0'
      },
      {
        id: 'lesson-cn-1-2',
        title: 'OSI Model and TCP/IP Protocol Suite',
        type: 'video',
        duration: '30m',
        videoUrl: 'https://www.youtube.com/embed/vv4y_uOneC0'
      },
      {
        id: 'quiz-cn-1-1',
        title: 'Network Basics Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q-cn-1',
            question: 'How many layers are in the OSI model?',
            options: ['5', '7', '4', '6'],
            correctAnswer: 1
          },
          {
            id: 'q-cn-2',
            question: 'What does TCP stand for?',
            options: [
              'Transfer Control Protocol',
              'Transmission Control Protocol',
              'Total Control Protocol',
              'Technical Computer Protocol'
            ],
            correctAnswer: 1
          },
          {
            id: 'q-cn-3',
            question: 'Which layer handles routing?',
            options: ['Application', 'Transport', 'Network', 'Data Link'],
            correctAnswer: 2
          }
        ]
      },
      {
        id: 'lesson-cn-1-3',
        title: 'IP Addressing and Subnetting',
        type: 'video',
        duration: '32m',
        videoUrl: 'https://www.youtube.com/embed/s_Ntt6eTn94'
      },
      {
        id: 'assignment-cn-1-1',
        title: 'Network Design Project',
        type: 'assignment',
        assignment: {
          id: 'assign-cn-1',
          title: 'Design a Small Office Network',
          description: 'Create a network topology for a small business',
          maxScore: 100,
          instructions: [
            'Design network topology for 50 users',
            'Include proper subnetting scheme',
            'Specify hardware requirements (routers, switches)',
            'Document security measures',
            'Create network diagram',
            'Submit design document with diagrams'
          ]
        }
      }
    ]
  },
  // Data Structures & Algorithms
  {
    id: 'course-dsa-1',
    title: 'Data Structures & Algorithms',
    description: 'Master essential data structures and algorithms for coding interviews and software development.',
    category: 'Computer Science',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
    instructor: 'Alex Kumar',
    duration: '7h 20m',
    level: 'Intermediate',
    lessons: [
      {
        id: 'lesson-dsa-1-1',
        title: 'Arrays and Linked Lists',
        type: 'video',
        duration: '28m',
        videoUrl: 'https://www.youtube.com/embed/NobHlGUjV3g'
      },
      {
        id: 'quiz-dsa-1-1',
        title: 'Data Structures Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q-dsa-1',
            question: 'What is the time complexity of accessing an element in an array?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
            correctAnswer: 2
          },
          {
            id: 'q-dsa-2',
            question: 'Which data structure uses LIFO principle?',
            options: ['Queue', 'Stack', 'Array', 'Tree'],
            correctAnswer: 1
          }
        ]
      },
      {
        id: 'lesson-dsa-1-2',
        title: 'Trees and Graph Algorithms',
        type: 'video',
        duration: '35m',
        videoUrl: 'https://www.youtube.com/embed/1WxLM2hwL-U'
      },
      {
        id: 'assignment-dsa-1-1',
        title: 'Algorithm Implementation Challenge',
        type: 'assignment',
        assignment: {
          id: 'assign-dsa-1',
          title: 'Implement Core Algorithms',
          description: 'Code essential algorithms from scratch',
          maxScore: 100,
          instructions: [
            'Implement Binary Search Tree with insert, delete, and search',
            'Implement QuickSort or MergeSort',
            'Implement BFS and DFS for graphs',
            'Write test cases for all implementations',
            'Analyze time and space complexity',
            'Submit code with documentation'
          ]
        }
      }
    ]
  },
  // Cloud Computing
  {
    id: 'course-cloud-1',
    title: 'Cloud Computing with AWS',
    description: 'Learn cloud computing concepts and hands-on AWS services including EC2, S3, and Lambda.',
    category: 'Cloud & DevOps',
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop',
    instructor: 'Maria Garcia',
    duration: '5h 30m',
    level: 'Intermediate',
    lessons: [
      {
        id: 'lesson-cloud-1-1',
        title: 'Introduction to Cloud Computing',
        type: 'video',
        duration: '20m',
        videoUrl: 'https://www.youtube.com/embed/M988_fsOSWo'
      },
      {
        id: 'lesson-cloud-1-2',
        title: 'AWS Core Services Overview',
        type: 'video',
        duration: '30m',
        videoUrl: 'https://www.youtube.com/embed/JIbIYCM48to'
      },
      {
        id: 'quiz-cloud-1-1',
        title: 'Cloud Computing Quiz',
        type: 'quiz',
        quiz: [
          {
            id: 'q-cloud-1',
            question: 'What does IaaS stand for?',
            options: [
              'Internet as a Service',
              'Infrastructure as a Service',
              'Integration as a Service',
              'Information as a Service'
            ],
            correctAnswer: 1
          },
          {
            id: 'q-cloud-2',
            question: 'Which AWS service is used for object storage?',
            options: ['EC2', 'S3', 'RDS', 'Lambda'],
            correctAnswer: 1
          }
        ]
      }
    ]
  }
];
