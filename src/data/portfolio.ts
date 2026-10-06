export const profile = {
  name: 'Vinod Kesavan',
  firstName: 'VINOD',
  lastName: 'KESAVAN',
  role: 'Software Development Engineer',
  focus: 'Backend Tooling & Microservices',
  tagline:
    'Building test-execution platforms, CI pipelines and developer-automation systems that keep large backends honest.',
  email: 'kvnkmoodindigo@gmail.com',
  phone: '+91-9392299240',
  phoneHref: 'tel:+919392299240',
  github: 'GitHub',
  location: 'Bangalore, India',
  college: "Vignan's Institute of Information Technology",
  degree: 'B.Tech — Computer Science & Engineering',
  cgpa: '8.94 / 10',
  collegeYears: '2020 – 2024',
  collegeLocation: 'Visakhapatnam, India',
}

export const coursework = [
  'Data Structures & Algorithms',
  'DBMS',
  'Computer Networks',
  'Operating Systems',
  'OOP Concepts',
  'Web Development',
]

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  color: string
  points: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'PhonePe',
    role: 'Software Engineer (Quality) — Backend Tooling & Automation',
    period: 'Sep 2025 — Present',
    location: 'Bangalore, India',
    color: '#68cbcb',
    points: [
      'Core backend contributor for AutoTest, PhonePe’s centralized test-execution platform — integrated with GitLab CI to trigger parallel pipelines and aggregate results across 33+ PODs.',
      'Building the new AutoTest MCP from scratch: core backend APIs for live pipeline status tracking, report data aggregation, and selective failed-test rerun logic.',
      'Engineered REST CRUD microservices for pipeline configuration, separating test-setup rules into a dedicated schema so bad run history stops breaking future test runs.',
      'Built a Developer Support Bot backend integrated with Godric (internal LLM Gateway) — RAG + token-based auth over platform docs to automate onboarding and cut manual support requests.',
      'Authored test suites for new UserService deployments and refactored integration pipelines across UserService and UserMeta, lifting backend stability from an 87% baseline.',
    ],
  },
  {
    company: 'SenseHQ',
    role: 'Software Development Engineer (in Test) — Backend Tooling & Automation',
    period: 'Jul 2024 — Aug 2025 · Intern + Full-Time',
    location: 'Bangalore, India',
    color: '#586596',
    points: [
      'Served as secondary on-call engineer — triaged production alerts, handled escalation queues, and resolved 30+ high-priority CE (Customer Engineering) tickets.',
      'Patched 6 critical bugs in the backend orchestrator service layer handling J2 execution flows, resolving customer-blocking pipeline stalls.',
      'Built CI/CD pipelines in Jenkins to automate test-suite execution on staging environments ahead of production deployments.',
      'Built the backend and web automation suite from scratch for J2 services — 150+ integration test scripts, 40+ Cypress suites, and 150+ Endtest flows for release gating.',
    ],
  },
  {
    company: 'TechCurators',
    role: 'Problem Setter & Reviewer Intern',
    period: 'Mar 2023 — Jun 2023',
    location: 'New Delhi, India',
    color: '#FFA639',
    points: [
      'Authored 50+ original programming problems on Data Structures, Algorithms, OOP, and C++ for technical coding assessments.',
      'Reviewed problem statements, wrote reference solutions in C++ and Java, and verified edge-case test data.',
    ],
  },
]

export interface Project {
  title: string
  subtitle: string
  description: string
  tags: string[]
  color: string
  image: string
  imageAlt: string
}

export const projects: Project[] = [
  {
    title: 'AutoTest MCP',
    subtitle: 'PhonePe · Test-Execution Platform',
    description:
      'Model-Context-Protocol server for PhonePe’s centralized test execution — live pipeline status, cross-POD report aggregation, and selective rerun of failed tests, all queryable by AI agents.',
    tags: ['Spring Boot', 'Microservices', 'GitLab CI', 'MCP'],
    color: '#68cbcb',
    image: '/src/assets/project-autotest.jpg',
    imageAlt: 'Visualization of parallel test pipeline lanes',
  },
  {
    title: 'Developer Support Bot',
    subtitle: 'PhonePe · RAG over Platform Docs',
    description:
      'Backend for an internal support bot wired into Godric, PhonePe’s LLM gateway — token-based auth, retrieval-augmented answers over platform documentation, and automated onboarding flows.',
    tags: ['LLM Gateway', 'RAG', 'REST APIs', 'Auth'],
    color: '#FFA639',
    image: '/src/assets/project-bot.jpg',
    imageAlt: 'AI assistant with orbiting knowledge panels',
  },
  {
    title: 'Expense Tracker',
    subtitle: 'Personal · Microservices App',
    description:
      'Full-stack expense tracker with a React Native mobile app and Spring Boot microservices backend — API Gateway with JWT auth routing traffic across services, containerized with Docker and deployed to AWS via CI/CD.',
    tags: ['React Native', 'Spring Boot', 'AWS', 'Docker'],
    color: '#586596',
    image: '/src/assets/project-expense.jpg',
    imageAlt: 'Fintech dashboard in 3D space',
  },
]

export interface SkillGroup {
  label: string
  color: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    color: '#68cbcb',
    items: ['Java', 'C++', 'Python', 'C', 'JavaScript', 'SQL'],
  },
  {
    label: 'Backend & Frameworks',
    color: '#586596',
    items: ['Spring Boot', 'Microservices', 'REST APIs', 'Spring Cloud', 'PostgreSQL', 'ReactJS'],
  },
  {
    label: 'DevOps, Testing & Tools',
    color: '#FFA639',
    items: ['Git', 'Linux', 'GitLab CI', 'Jenkins', 'Docker', 'AWS', 'Cypress', 'Endtest', 'Postman'],
  },
]

export const codingProfiles = [
  { platform: 'LeetCode', metric: 'Knight', note: 'Contest rating tier', color: '#68cbcb' },
  { platform: 'CodeChef', metric: '1677', note: 'Highest rating', color: '#FFA639' },
  { platform: 'HackerEarth', metric: 'Elite', note: 'Problem-solving tier', color: '#586596' },
  { platform: 'HackerRank', metric: '33,569', note: 'Hackos earned', color: '#d14444' },
]

export const heroStats = [
  { value: '33+', label: 'PODs orchestrated' },
  { value: '150+', label: 'Integration scripts' },
  { value: '3', label: 'Companies shipped at' },
  { value: '8.94', label: 'CGPA · B.Tech CSE' },
]

export const marqueeSkills = [
  'JAVA',
  'C++',
  'SPRING BOOT',
  'MICROSERVICES',
  'REST APIS',
  'DOCKER',
  'AWS',
  'GITLAB CI',
  'JENKINS',
  'POSTGRESQL',
  'CYPRESS',
  'REACT',
  'PYTHON',
  'LINUX',
  'SYSTEM DESIGN',
]
