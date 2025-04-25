const quizzes = [
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
  }
];

module.exports = quizzes; 