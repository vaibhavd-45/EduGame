const Quiz = require('./models/Quiz');
const mongoose = require('mongoose');

const sampleQuizzes = [
  {
    title: 'Basic Mathematics',
    description: 'Test your basic math skills with this quiz!',
    category: 'Math',
    difficulty: 'Beginner',
    questions: [
      {
        question: 'What is 2 + 2?',
        options: [
          { text: '3', isCorrect: false },
          { text: '4', isCorrect: true },
          { text: '5', isCorrect: false },
          { text: '6', isCorrect: false }
        ],
        explanation: '2 + 2 equals 4',
        points: 10
      },
      {
        question: 'What is 5 × 6?',
        options: [
          { text: '25', isCorrect: false },
          { text: '30', isCorrect: true },
          { text: '35', isCorrect: false },
          { text: '40', isCorrect: false }
        ],
        explanation: '5 × 6 equals 30',
        points: 10
      }
    ]
  },
  {
    title: "React Fundamentals",
    description: "Test your knowledge of React basics and core concepts",
    category: "Programming",
    difficulty: "Beginner",
    questions: [
      {
        question: "What is React?",
        options: [
          { text: "A JavaScript library for building user interfaces", isCorrect: true },
          { text: "A programming language", isCorrect: false },
          { text: "A database management system", isCorrect: false },
          { text: "A web server", isCorrect: false }
        ],
        explanation: "React is a JavaScript library developed by Facebook for building user interfaces, particularly single-page applications.",
        points: 10
      },
      {
        question: "What is JSX?",
        options: [
          { text: "A syntax extension for JavaScript that lets you write HTML-like code in JavaScript", isCorrect: true },
          { text: "A new programming language", isCorrect: false },
          { text: "A database query language", isCorrect: false },
          { text: "A styling framework", isCorrect: false }
        ],
        explanation: "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.",
        points: 10
      },
      {
        question: "What is a React component?",
        options: [
          { text: "A reusable piece of code that returns a React element", isCorrect: true },
          { text: "A database table", isCorrect: false },
          { text: "A server-side script", isCorrect: false },
          { text: "A CSS framework", isCorrect: false }
        ],
        explanation: "Components are the building blocks of React applications. They are reusable pieces of code that return React elements.",
        points: 10
      },
      {
        question: "What is the purpose of the useState hook?",
        options: [
          { text: "To add state to functional components", isCorrect: true },
          { text: "To connect to a database", isCorrect: false },
          { text: "To style components", isCorrect: false },
          { text: "To handle routing", isCorrect: false }
        ],
        explanation: "The useState hook allows you to add state to functional components in React.",
        points: 10
      },
      {
        question: "What is the virtual DOM in React?",
        options: [
          { text: "A lightweight copy of the actual DOM that React uses for performance optimization", isCorrect: true },
          { text: "A database system", isCorrect: false },
          { text: "A styling system", isCorrect: false },
          { text: "A server-side rendering technique", isCorrect: false }
        ],
        explanation: "The virtual DOM is a lightweight copy of the actual DOM that React uses to optimize performance by minimizing direct DOM manipulation.",
        points: 10
      }
    ],
    timeLimit: 10,
    passingScore: 70
  },
  {
    title: "React Hooks and State Management",
    description: "Test your knowledge of React Hooks and state management",
    category: "Programming",
    difficulty: "Intermediate",
    questions: [
      {
        question: "What is the useEffect hook used for?",
        options: [
          { text: "To perform side effects in functional components", isCorrect: true },
          { text: "To create new components", isCorrect: false },
          { text: "To style components", isCorrect: false },
          { text: "To handle routing", isCorrect: false }
        ],
        explanation: "The useEffect hook is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.",
        points: 10
      },
      {
        question: "What is the purpose of the useContext hook?",
        options: [
          { text: "To consume values from a React context", isCorrect: true },
          { text: "To create new contexts", isCorrect: false },
          { text: "To handle form submissions", isCorrect: false },
          { text: "To manage routing", isCorrect: false }
        ],
        explanation: "The useContext hook allows you to consume values from a React context without using a Context.Consumer component.",
        points: 10
      },
      {
        question: "What is Redux?",
        options: [
          { text: "A predictable state container for JavaScript apps", isCorrect: true },
          { text: "A styling framework", isCorrect: false },
          { text: "A database system", isCorrect: false },
          { text: "A testing framework", isCorrect: false }
        ],
        explanation: "Redux is a predictable state container for JavaScript applications, commonly used with React for state management.",
        points: 10
      },
      {
        question: "What is the purpose of the useReducer hook?",
        options: [
          { text: "To manage complex state logic in functional components", isCorrect: true },
          { text: "To handle routing", isCorrect: false },
          { text: "To style components", isCorrect: false },
          { text: "To connect to a database", isCorrect: false }
        ],
        explanation: "The useReducer hook is used to manage complex state logic in functional components, similar to how Redux works.",
        points: 10
      },
      {
        question: "What is the difference between props and state?",
        options: [
          { text: "Props are read-only and passed from parent to child, while state is managed within a component", isCorrect: true },
          { text: "Props are for styling, state is for data", isCorrect: false },
          { text: "Props are for routing, state is for styling", isCorrect: false },
          { text: "Props are for databases, state is for UI", isCorrect: false }
        ],
        explanation: "Props are read-only and passed from parent to child components, while state is managed within a component and can be changed.",
        points: 10
      }
    ],
    timeLimit: 15,
    passingScore: 70
  },
  {
    title: "Advanced React Concepts",
    description: "Test your knowledge of advanced React concepts and patterns",
    category: "Programming",
    difficulty: "Advanced",
    questions: [
      {
        question: "What is React.memo?",
        options: [
          { text: "A higher-order component for memoizing functional components", isCorrect: true },
          { text: "A database caching system", isCorrect: false },
          { text: "A styling framework", isCorrect: false },
          { text: "A testing utility", isCorrect: false }
        ],
        explanation: "React.memo is a higher-order component that memoizes a functional component to prevent unnecessary re-renders.",
        points: 10
      },
      {
        question: "What is the purpose of useCallback?",
        options: [
          { text: "To memoize functions to prevent unnecessary re-renders", isCorrect: true },
          { text: "To handle form submissions", isCorrect: false },
          { text: "To manage routing", isCorrect: false },
          { text: "To style components", isCorrect: false }
        ],
        explanation: "useCallback is a hook that memoizes functions to prevent unnecessary re-renders in child components.",
        points: 10
      },
      {
        question: "What is the difference between controlled and uncontrolled components?",
        options: [
          { text: "Controlled components have their state managed by React, while uncontrolled components manage their own state", isCorrect: true },
          { text: "Controlled components are for forms, uncontrolled are for displays", isCorrect: false },
          { text: "Controlled components are for routing, uncontrolled are for styling", isCorrect: false },
          { text: "Controlled components are for databases, uncontrolled are for UI", isCorrect: false }
        ],
        explanation: "Controlled components have their state managed by React, while uncontrolled components manage their own state internally.",
        points: 10
      },
      {
        question: "What is the purpose of useRef?",
        options: [
          { text: "To create a mutable reference that persists across re-renders", isCorrect: true },
          { text: "To handle routing", isCorrect: false },
          { text: "To style components", isCorrect: false },
          { text: "To connect to a database", isCorrect: false }
        ],
        explanation: "useRef is a hook that creates a mutable reference that persists across re-renders, commonly used for accessing DOM elements or storing mutable values.",
        points: 10
      },
      {
        question: "What is the purpose of React.lazy?",
        options: [
          { text: "To enable code splitting and lazy loading of components", isCorrect: true },
          { text: "To handle form submissions", isCorrect: false },
          { text: "To manage routing", isCorrect: false },
          { text: "To style components", isCorrect: false }
        ],
        explanation: "React.lazy is a function that enables code splitting and lazy loading of components, improving initial load performance.",
        points: 10
      }
    ],
    timeLimit: 20,
    passingScore: 70
  },
  {
    title: "React Performance and Best Practices",
    description: "Test your knowledge of React performance optimization and best practices",
    category: "Programming",
    difficulty: "Advanced",
    questions: [
      {
        question: "What is the purpose of React.memo?",
        options: [
          { text: "To prevent unnecessary re-renders of functional components", isCorrect: true },
          { text: "To create new components", isCorrect: false },
          { text: "To handle routing", isCorrect: false },
          { text: "To style components", isCorrect: false }
        ],
        explanation: "React.memo is a higher-order component that memoizes a functional component to prevent unnecessary re-renders when props haven't changed.",
        points: 10
      },
      {
        question: "What is the purpose of useMemo?",
        options: [
          { text: "To memoize expensive computations and prevent unnecessary recalculations", isCorrect: true },
          { text: "To handle form submissions", isCorrect: false },
          { text: "To manage routing", isCorrect: false },
          { text: "To style components", isCorrect: false }
        ],
        explanation: "useMemo is a hook that memoizes expensive computations and prevents unnecessary recalculations when dependencies haven't changed.",
        points: 10
      },
      {
        question: "What is the purpose of useCallback?",
        options: [
          { text: "To memoize functions to prevent unnecessary re-renders of child components", isCorrect: true },
          { text: "To handle form submissions", isCorrect: false },
          { text: "To manage routing", isCorrect: false },
          { text: "To style components", isCorrect: false }
        ],
        explanation: "useCallback is a hook that memoizes functions to prevent unnecessary re-renders of child components that receive these functions as props.",
        points: 10
      },
      {
        question: "What is the purpose of React.lazy?",
        options: [
          { text: "To enable code splitting and lazy loading of components", isCorrect: true },
          { text: "To handle form submissions", isCorrect: false },
          { text: "To manage routing", isCorrect: false },
          { text: "To style components", isCorrect: false }
        ],
        explanation: "React.lazy is a function that enables code splitting and lazy loading of components, improving initial load performance.",
        points: 10
      },
      {
        question: "What is the purpose of useRef?",
        options: [
          { text: "To create a mutable reference that persists across re-renders", isCorrect: true },
          { text: "To handle routing", isCorrect: false },
          { text: "To style components", isCorrect: false },
          { text: "To connect to a database", isCorrect: false }
        ],
        explanation: "useRef is a hook that creates a mutable reference that persists across re-renders, commonly used for accessing DOM elements or storing mutable values.",
        points: 10
      }
    ],
    timeLimit: 15,
    passingScore: 70
  },
  {
    title: "React Testing and Debugging",
    description: "Test your knowledge of React testing and debugging techniques",
    category: "Programming",
    difficulty: "Intermediate",
    questions: [
      {
        question: "What is Jest?",
        options: [
          { text: "A JavaScript testing framework commonly used with React", isCorrect: true },
          { text: "A styling framework", isCorrect: false },
          { text: "A database system", isCorrect: false },
          { text: "A state management library", isCorrect: false }
        ],
        explanation: "Jest is a JavaScript testing framework commonly used with React for unit testing, integration testing, and snapshot testing.",
        points: 10
      },
      {
        question: "What is React Testing Library?",
        options: [
          { text: "A library for testing React components in a way that resembles how users interact with them", isCorrect: true },
          { text: "A styling framework", isCorrect: false },
          { text: "A database system", isCorrect: false },
          { text: "A state management library", isCorrect: false }
        ],
        explanation: "React Testing Library is a library for testing React components in a way that resembles how users interact with them, focusing on behavior rather than implementation details.",
        points: 10
      },
      {
        question: "What is the purpose of the React DevTools?",
        options: [
          { text: "To inspect and debug React components in the browser", isCorrect: true },
          { text: "To style components", isCorrect: false },
          { text: "To manage routing", isCorrect: false },
          { text: "To connect to a database", isCorrect: false }
        ],
        explanation: "React DevTools is a browser extension that allows you to inspect and debug React components, view component hierarchy, and monitor component state and props.",
        points: 10
      },
      {
        question: "What is the purpose of error boundaries in React?",
        options: [
          { text: "To catch JavaScript errors anywhere in the component tree and display a fallback UI", isCorrect: true },
          { text: "To handle routing", isCorrect: false },
          { text: "To style components", isCorrect: false },
          { text: "To connect to a database", isCorrect: false }
        ],
        explanation: "Error boundaries are React components that catch JavaScript errors anywhere in their child component tree and display a fallback UI instead of crashing the whole app.",
        points: 10
      },
      {
        question: "What is the purpose of the React Profiler?",
        options: [
          { text: "To measure the rendering performance of React components", isCorrect: true },
          { text: "To handle routing", isCorrect: false },
          { text: "To style components", isCorrect: false },
          { text: "To connect to a database", isCorrect: false }
        ],
        explanation: "The React Profiler is a tool that measures the rendering performance of React components, helping identify performance bottlenecks.",
        points: 10
      }
    ],
    timeLimit: 15,
    passingScore: 70
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing quizzes
    await Quiz.deleteMany({});
    
    // Insert sample quizzes
    await Quiz.insertMany(sampleQuizzes);
    
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

module.exports = seedDatabase; 