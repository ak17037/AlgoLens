AlgoLens

Competitive Programming Analytics and Visualization Platform

AlgoLens is a React-based web application designed to help students understand their competitive programming progress. Students often use platforms such as LeetCode, Codeforces, CodeChef, and GeeksforGeeks, but each platform provides different statistics.

The main idea of AlgoLens is to bring important coding statistics into one dashboard and present them using simple charts, progress indicators, goals, and topic analysis.

Note: The current version is a frontend prototype and uses mock data. Real platform API integration and backend functionality are part of the future scope.

1. Problem Statement

Students preparing for DSA and coding interviews usually practice on multiple platforms. It becomes difficult to answer questions like:

How good am I overall?

Which DSA topics are weak?

Am I improving consistently?

How close am I to my target?

What should I practice more?

AlgoLens tries to solve this problem by providing a single visual dashboard for coding progress.

2. Objectives

The main objectives of AlgoLens are:

Combine coding performance information in one place.

Show problems solved and other important statistics.

Identify strong and weak DSA topics.

Track coding goals.

Show a basic interview-readiness concept.

Present information using an easy-to-understand dashboard.

Create a foundation for future real API integration.

3. Main Idea

The basic working of AlgoLens is:

Coding Platform Data
        ↓
     Organize Data
        ↓
      Analytics
        ↓
 Topic / Goal Analysis
        ↓
  Visual Dashboard
        ↓
 Student Insights

In the current project, the platform data is stored as JavaScript mock data.

4. Technology Stack

Technology

Purpose

React

Building the user interface

JavaScript

Application logic and calculations

CSS

Styling and responsive design

Vite

Development and build tool

Lucide React

Icons

SVG

Radar chart visualization

I selected React because the application contains many reusable components such as cards, navigation elements, charts, and dashboard sections.

5. Project Structure

The important source structure is:

src/
│
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── RadarChart.jsx
│   ├── Sidebar.jsx
│   └── TopHeader.jsx
│
├── data/
│   ├── conversionMap.js
│   └── mockData.js
│
├── pages/
│   ├── DashboardPage.jsx
│   ├── GoalsReadinessPage.jsx
│   ├── OverviewPage.jsx
│   └── TechStackPage.jsx
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx

Important files

App.jsx
Acts as the main controller of the application. It manages page navigation, selected profile, sidebar state, and page transitions.

mockData.js
Contains sample student profiles, platform statistics, topic scores, goals, and readiness data.

conversionMap.js
Contains basic rating conversion/normalization logic for comparing different platforms.

RadarChart.jsx
Creates the interactive DSA skill radar chart using SVG.

6. Application Flow

The application starts from main.jsx.

index.html
    ↓
main.jsx
    ↓
App.jsx
    ↓
Selected Page
    ↓
Page Components
    ↓
Data from mockData.js
    ↓
Charts / Cards / Progress

The user can move between different sections using the sidebar.

The intended sections include:

Overview
Current Progress
Analytics
Goals & Readiness
Dashboard
Tech Stack

7. Profile System

The project contains sample profiles such as:

Arjun Kumar
Priya Sharma
Alex Chen

Each profile contains information such as:

Name
Handle
Problems solved
Rating
Streak
Consistency
Goal progress
Platform statistics
Topic mastery
Interview readiness

The selected profile is stored in React state. When the profile changes, the dashboard updates automatically.

8. Platform Data

AlgoLens currently represents four platforms:

LeetCode

Solved
Easy / Medium / Hard
Contest Rating
Global Rank
Streak

Codeforces

Rating
Rank
Maximum Rating
Contests
Solved Problems

CodeChef

Stars
Rating
Global Rank
Solved Problems

GeeksforGeeks

Score
Problems Solved
Institute Rank

At present these values are mock data rather than live platform data.

9. Data Normalization

Different coding platforms use different rating systems. Therefore, directly comparing their ratings is not always accurate.

AlgoLens contains conversionMap.js to demonstrate basic normalization.

The concept is:

Platform Rating
      ↓
Conversion Formula
      ↓
Estimated Common Level

The current formulas are only a basic prototype. A real system would require more data and statistical analysis.

10. Dashboard

The dashboard is the main analytics section.

It shows important metrics such as:

Problems Solved
Consistency
Rating
Goal Progress

It also shows topic-wise performance and weak areas.

The purpose is to give the student a quick answer to:

"How am I performing right now?"

11. Topic Mastery

Each DSA topic contains information such as:

Topic Name
Score
Problems Solved
Attempts
Accuracy
Status

For example:

Arrays   → 94%
Strings  → 88%
Trees    → 45%
Graphs   → 40%
DP       → 30%

The current project uses simple rules:

85% or above → Mastered
Below 60%    → Needs Focus
Otherwise    → Developing

This makes it easy for a student to identify weak areas.

12. Radar Chart

The radar chart is used to visually represent DSA skills.

The chart contains topics such as:

Arrays
Strings
Trees
Graphs
Dynamic Programming

The chart is created manually using SVG.

For each topic, the application calculates its position using basic trigonometry:

X = centerX + radius × cos(angle)
Y = centerY + radius × sin(angle)

The points are then connected to create the radar shape.

This helped me understand how mathematical calculations can be used to create interactive visualizations.

13. Radar Animation

The radar chart uses requestAnimationFrame() to animate changes.

The flow is:

User changes value
       ↓
React state updates
       ↓
New radar values
       ↓
Animation starts
       ↓
Chart gradually changes

This gives a smoother user experience.

The chart also contains sliders, so users can change skill values interactively.

14. Goals and Readiness

The Goals & Readiness section allows the student to set a target number of problems.

For example:

Current Solved = 350
Target = 500

Progress is calculated as:

350 / 500 × 100 = 70%

The project also shows how many problems remain.

The readiness section contains sample benchmarks such as:

FAANG / Tier-1
FinTech / Quant
Startups

These are currently predefined values used to demonstrate the concept.

15. React State Management

I used React's built-in:

useState()
useEffect()

instead of an external state-management library.

State is used for things such as:

Current page
Selected profile
Sidebar state
Radar values
Goal values

The general React data flow is:

Parent Component
      ↓
Child Component
      ↓
User Interaction
      ↓
Callback
      ↓
Parent State Update
      ↓
UI Re-render

16. Responsive Design

CSS media queries are used to make the dashboard responsive.

On smaller screens:

Large grids
    ↓
Smaller grids
    ↓
Single-column layout

This allows the application to work on both desktop and smaller screens.

17. Future Scope

The current project is a frontend prototype. In the future, I would add:

Real Platform APIs

Connect:

LeetCode
Codeforces
CodeChef
GeeksforGeeks

and fetch actual user statistics.

Backend and Database

A backend could store:

Users
Platform Accounts
Problems
Submissions
Goals
Historical Analytics

Automatic Analytics

Instead of mock scores, the system could calculate topic mastery using:

Accuracy
Problems Solved
Difficulty
Recent Performance
Consistency

Recommendation System

The application could automatically suggest what to practice next.

For example:

Weakest Topic → Dynamic Programming

Recommendation:
Practice 10 DP problems

18. Applications

AlgoLens can be useful for:

Students

Track DSA and coding preparation.

Interview Preparation

Compare current skills with a target level.

Competitive Programmers

Understand topic strengths and weaknesses.

Teachers

A future multi-user version could help teachers monitor student progress.

College Placement Training

Colleges could use the system to track students' coding preparation.

19. Advantages

Simple and student-friendly dashboard.

Multiple coding-platform concepts in one place.

Visual representation of DSA skills.

Goal tracking.

Weak-topic identification.

Interactive radar chart.

Easy to extend with real data later.

Good demonstration of React component-based development.

20. Limitations

The current version has some limitations:

It uses mock data.

There is no backend.

There is no database.

There is no real platform API integration.

Authentication is not implemented.

Readiness scores are predefined.

Rating conversion is only a basic approximation.

Data is not permanently stored.

These limitations are acceptable for the current college-project prototype but would need to be addressed in a production version.

21. Current Architecture

              React Application
                     |
              ┌──────┴──────┐
              |             |
            Pages       Components
              |             |
              └──────┬──────┘
                     |
                  Mock Data
                     |
              ┌──────┴──────┐
              |             |
          Analytics     Visualization
              |             |
              └──────┬──────┘
                     |
                 Dashboard

22. Future Architecture

The future version could work like:

Coding Platforms
       ↓
     APIs
       ↓
    Backend
       ↓
    Database
       ↓
 Data Normalization
       ↓
    Analytics
       ↓
Recommendations
       ↓
 React Dashboard

This would turn the current prototype into a complete analytics platform.

23. Important Project Issue

While reviewing the project, I found that App.jsx references:

ProblemPage
AnalyticsPage

but these files are not present in the supplied project.

Therefore, these references should be fixed before final submission if the project needs to build successfully.

There are also some older navigation components that are not part of the current main navigation and can be cleaned up.

24. Learning Outcomes

Through this project, I learned and practiced:

React components

React state

Props and callbacks

JavaScript

CSS

Responsive design

SVG visualization

Basic data analysis

Data organization

User interaction

Building a dashboard-style application

The project also helped me understand that a good application needs both a clear user interface and a proper data structure behind it.

25. Conclusion

AlgoLens is a web-based competitive programming analytics project created to help students understand their coding progress.

Instead of only showing the number of solved problems, the project tries to provide more useful information such as:

Overall Progress
      +
Topic Strength
      +
Weak Areas
      +
Goals
      +
Readiness

The current version demonstrates the frontend and analytics concept using mock data.

In the future, real coding-platform APIs, a backend, database, automatic analytics, and a recommendation system can be added.

The main idea of AlgoLens is:

Coding Data → Analysis → Understanding → Better Preparation
