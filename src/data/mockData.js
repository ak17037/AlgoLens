export const PROFILES = [
  {
    id: 'arjun',
    name: 'Arjun Kumar',
    handle: 'ak123',
    platformsConnected: ['LeetCode', 'Codeforces', 'CodeChef', 'GeeksforGeeks'],
    avatar: 'AK',
    overallSolved: 324,
    targetSolved: 500,
    consistencyRate: 80,
    normalizedRating: 1250,
    goalProgress: 64.8,
    streakDays: 21,
    weeklyGrowth: 18.5,
    platforms: {
      leetcode: {
        handle: 'arjun_k123',
        solved: 210,
        easy: 95,
        medium: 98,
        hard: 17,
        contestRating: 1715,
        globalRank: 'Top 8.4%',
        activeStreak: 21
      },
      codeforces: {
        handle: 'ak_cf',
        rating: 1250,
        rankTier: 'Pupil',
        maxRating: 1310,
        contestsCount: 18,
        solvedCount: 84
      },
      codechef: {
        handle: 'arjun_chef',
        stars: '3★',
        rating: 1620,
        globalRank: 12450,
        solvedCount: 65
      },
      gfg: {
        handle: 'arjun_gfg',
        score: 450,
        problemsSolved: 110,
        instituteRank: 14
      }
    },
    topicMastery: [
      { name: 'Arrays', score: 0.94, solved: 92, totalAttempts: 98, accuracy: 94, status: 'Mastered' },
      { name: 'Strings', score: 0.88, solved: 64, totalAttempts: 73, accuracy: 88, status: 'Strong' },
      { name: 'Trees', score: 0.45, solved: 28, totalAttempts: 52, accuracy: 54, status: 'Needs Practice' },
      { name: 'Graphs', score: 0.40, solved: 14, totalAttempts: 35, accuracy: 40, status: 'Vulnerable' },
      { name: 'DP', score: 0.30, solved: 16, totalAttempts: 53, accuracy: 30, status: 'Critical Gap' }
    ],
    readinessByRole: {
      faang: 64,
      fintech: 58,
      startups: 76
    },
    coachQuotes: [
      {
        tag: 'Weekly Focus',
        text: 'This week, focus on Graphs — solve 15 Graph problems (BFS/DFS cycles), 5 Tree, 3 DP.',
        type: 'priority'
      },
      {
        tag: 'Contest Diagnosis',
        text: 'Contest rating dropped on Div.3 because too much time goes to implementation — practice timed Medium problems.',
        type: 'warning'
      },
      {
        tag: 'Pacing Forecast',
        text: 'At your current velocity of 22 problems/week, your 500 problems target is about 6 weeks away.',
        type: 'info'
      }
    ]
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    handle: 'priyacodes',
    platformsConnected: ['LeetCode', 'Codeforces', 'CodeChef'],
    avatar: 'PS',
    overallSolved: 542,
    targetSolved: 600,
    consistencyRate: 92,
    normalizedRating: 1580,
    goalProgress: 90.3,
    streakDays: 48,
    weeklyGrowth: 24.2,
    platforms: {
      leetcode: {
        handle: 'priya_sharma',
        solved: 380,
        easy: 120,
        medium: 210,
        hard: 50,
        contestRating: 1940,
        globalRank: 'Top 3.2%',
        activeStreak: 48
      },
      codeforces: {
        handle: 'priya_expert',
        rating: 1580,
        rankTier: 'Specialist',
        maxRating: 1625,
        contestsCount: 32,
        solvedCount: 190
      },
      codechef: {
        handle: 'priya_c',
        stars: '4★',
        rating: 1890,
        globalRank: 3200,
        solvedCount: 140
      },
      gfg: {
        handle: 'priya_gfg',
        score: 720,
        problemsSolved: 210,
        instituteRank: 3
      }
    },
    topicMastery: [
      { name: 'Arrays', score: 0.98, solved: 140, totalAttempts: 144, accuracy: 97, status: 'Mastered' },
      { name: 'Strings', score: 0.92, solved: 95, totalAttempts: 102, accuracy: 93, status: 'Mastered' },
      { name: 'Trees', score: 0.85, solved: 78, totalAttempts: 90, accuracy: 87, status: 'Strong' },
      { name: 'Graphs', score: 0.68, solved: 46, totalAttempts: 65, accuracy: 71, status: 'Improving' },
      { name: 'DP', score: 0.60, solved: 52, totalAttempts: 84, accuracy: 62, status: 'Needs Practice' }
    ],
    readinessByRole: {
      faang: 84,
      fintech: 78,
      startups: 92
    },
    coachQuotes: [
      {
        tag: 'Interview Readiness',
        text: 'Tree and String patterns are interview-ready. Transition to 2D DP and Minimum Spanning Trees.',
        type: 'priority'
      },
      {
        tag: 'Speed Optimization',
        text: 'Average solve time for Medium problems is 16 minutes. Target sub-12 minutes for Google rounds.',
        type: 'info'
      },
      {
        tag: 'Contest Target',
        text: 'Candidate Master is reachable within 4 Codeforces rounds at your current +45 delta average.',
        type: 'priority'
      }
    ]
  },
  {
    id: 'alex',
    name: 'Alex Chen',
    handle: 'alexp_cp',
    platformsConnected: ['LeetCode', 'Codeforces', 'CodeChef', 'AtCoder'],
    avatar: 'AC',
    overallSolved: 780,
    targetSolved: 800,
    consistencyRate: 96,
    normalizedRating: 1820,
    goalProgress: 97.5,
    streakDays: 112,
    weeklyGrowth: 15.0,
    platforms: {
      leetcode: {
        handle: 'alex_chen',
        solved: 520,
        easy: 150,
        medium: 270,
        hard: 100,
        contestRating: 2180,
        globalRank: 'Guardian (Top 0.8%)',
        activeStreak: 112
      },
      codeforces: {
        handle: 'alexp_cf',
        rating: 1820,
        rankTier: 'Candidate Master',
        maxRating: 1890,
        contestsCount: 54,
        solvedCount: 310
      },
      codechef: {
        handle: 'alex_c',
        stars: '5★',
        rating: 2040,
        globalRank: 980,
        solvedCount: 220
      },
      gfg: {
        handle: 'alex_gfg',
        score: 980,
        problemsSolved: 320,
        instituteRank: 1
      }
    },
    topicMastery: [
      { name: 'Arrays', score: 0.99, solved: 180, totalAttempts: 182, accuracy: 99, status: 'Mastered' },
      { name: 'Strings', score: 0.96, solved: 130, totalAttempts: 135, accuracy: 96, status: 'Mastered' },
      { name: 'Trees', score: 0.94, solved: 110, totalAttempts: 116, accuracy: 95, status: 'Mastered' },
      { name: 'Graphs', score: 0.88, solved: 88, totalAttempts: 98, accuracy: 90, status: 'Strong' },
      { name: 'DP', score: 0.82, solved: 95, totalAttempts: 115, accuracy: 83, status: 'Strong' }
    ],
    readinessByRole: {
      faang: 96,
      fintech: 91,
      startups: 98
    },
    coachQuotes: [
      {
        tag: 'Elite Refinement',
        text: 'Focus on Hard DP with bitmasking and advanced Segment Trees to push past 1900 CF rating.',
        type: 'priority'
      },
      {
        tag: 'Mock Interviews',
        text: 'Technical readiness is at 96%. Shift practice to system design and concurrency edge cases.',
        type: 'info'
      }
    ]
  }
];

export const PLATFORM_SPECS = [
  {
    name: 'LeetCode',
    type: 'Practice & Contests',
    scoringMetric: 'Easy / Med / Hard + Contest Elo',
    sampleMetric: '350 solved (1780 Elo)',
    fetchType: 'GraphQL API & Submission history',
    metricsPulled: ['Easy / Medium / Hard counts', 'Contest Rating & History', 'Topic Tags distribution', 'Submission streak & acceptance rate']
  },
  {
    name: 'Codeforces',
    type: 'Competitive Contests',
    scoringMetric: 'Elo Rating & Division Titles',
    sampleMetric: '1250 rating (Pupil)',
    fetchType: 'Official REST API',
    metricsPulled: ['Real-time Elo rating', 'Rank tiers & delta logs', 'Contest submission verdicts', 'Problem tag mastery']
  },
  {
    name: 'CodeChef',
    type: 'Rankings & Long Contests',
    scoringMetric: 'Star Ranking Tier',
    sampleMetric: '3★ (1620 rating)',
    fetchType: 'Public profile parser / API',
    metricsPulled: ['Star tier (1★ - 7★)', 'Global & Country ranks', 'Division contest placements', 'Problem count by difficulty']
  },
  {
    name: 'GeeksforGeeks',
    type: 'Campus & Topic Practice',
    scoringMetric: 'Practice Score & POTD',
    sampleMetric: '450 score',
    fetchType: 'User stats parser',
    metricsPulled: ['Composite practice score', 'Problem of the Day streaks', 'College / Institute rankings', 'Course completions']
  }
];

export const RADAR_PRESETS = {
  arjun: {
    label: "Arjun's Profile (DP & Graph Gaps)",
    values: [0.94, 0.88, 0.45, 0.40, 0.30]
  },
  balanced: {
    label: 'All-Rounder Balanced (75%+ across)',
    values: [0.85, 0.82, 0.78, 0.76, 0.72]
  },
  beginner: {
    label: 'Foundation Builder (Arrays & Strings only)',
    values: [0.80, 0.75, 0.25, 0.20, 0.15]
  },
  master: {
    label: 'FAANG Ready (90%+ All Topics)',
    values: [0.98, 0.95, 0.92, 0.90, 0.88]
  }
};

export const TECH_STACK = [
  {
    layer: '01. HTML & CSS',
    subtitle: 'Semantic Markup & Modern CSS Architecture',
    techs: [
      { name: 'Semantic HTML5', role: 'Accessible structural elements (<header>, <main>, <section>, <aside>, <footer>)' },
      { name: 'CSS Variables & Tokens', role: 'Curated design system with HSL colors, typography & fluid sizing tokens' },
      { name: 'Responsive Flexbox & Grid', role: 'Multi-column dashboard layouts, hero grids & adaptive cards' },
      { name: 'Glassmorphism & Transitions', role: 'Backdrop blur filters, interactive hover states & micro-animations' }
    ]
  },
  {
    layer: '02. JavaScript & Git',
    subtitle: 'ES6+ Logic & Clean Component Architecture',
    techs: [
      { name: 'Modern ES6+ Syntax', role: 'Arrow functions, destructuring, spread operators & template literals' },
      { name: 'Array & Object Methods', role: 'Data transformations via .map(), .filter(), .reduce() and .findIndex()' },
      { name: 'Modular Folder Structure', role: 'Clean separation of /pages, /components, /data and styling' },
      { name: 'GitHub & Clean Code', role: 'Semantic commit practices, strict naming conventions & oxlint standards' }
    ]
  },
  {
    layer: '03. DOM Manipulation',
    subtitle: 'Event Handling & Dynamic UI Rendering',
    techs: [
      { name: 'Reactive DOM Updates', role: 'State-driven UI re-rendering without manual imperativism' },
      { name: 'Synthetic Event Handling', role: 'onClick, onChange, onKeyDown and hover event listeners' },
      { name: 'Interactive SVG Trigonometry', role: 'Dynamic radar polygon calculations using Math.sin() and Math.cos()' },
      { name: 'Smooth Animation Frames', role: 'RequestAnimationFrame interpolation for radar chart morphing' }
    ]
  },
  {
    layer: '04. React Fundamentals',
    subtitle: 'Component Hierarchy & State Management',
    techs: [
      { name: 'JSX & Functional Components', role: 'Reusable, modular component tree with declarative markup' },
      { name: 'Props & Unidirectional Flow', role: 'Parent-to-child data pipelines and callback event passing' },
      { name: 'useState Hook', role: 'Local state management for profile switching, sliders & active filters' },
      { name: 'useEffect Hook', role: 'Lifecycle handling for keyboard navigation, timers & chart animations' }
    ]
  }
];
