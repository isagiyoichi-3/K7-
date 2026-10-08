export const profile = {
  name: 'Vinod Kesavan',
  firstName: 'VINOD',
  lastName: 'KESAVAN',
  role: 'Software Engineer',
  focus: 'Backend Platforms & Microservices',
  tagline:
    'I build developer platforms, CI pipelines and microservices that keep large-scale backends honest.',
  email: 'kvnkmoodindigo@gmail.com',
  phone: '+91-9392299240',
  phoneHref: 'tel:+919392299240',
  github: 'GitHub',
  location: 'Bangalore, India',
}

export interface ExperienceItem {
  company: string
  role: string
  period: string
  location: string
  shade: string
  points: string[]
}

export const experience: ExperienceItem[] = [
  {
    company: 'PhonePe',
    role: 'Software Engineer — Platform & Backend Engineering',
    period: 'Sep 2025 — Present',
    location: 'Bangalore, India',
    shade: '#ffffff',
    points: [
      'Core backend engineer for AutoTest, PhonePe’s centralized code-verification platform — integrated with GitLab CI to trigger parallel pipelines and aggregate results across 33+ PODs.',
      'Building the AutoTest MCP from scratch: backend APIs for live pipeline status, report aggregation and selective rerun orchestration — all queryable by AI agents.',
      'Engineered REST CRUD microservices for pipeline configuration, separating setup rules into a dedicated schema so bad run history stops breaking future executions.',
      'Built a Developer Support Bot backend on an internal LLM gateway — RAG pipeline with token-based auth over platform docs, automating onboarding and cutting manual support load.',
      'Owned UserService deployment pipelines and refactored integration flows across UserService and UserMeta, lifting backend reliability from an 87% baseline.',
    ],
  },
  {
    company: 'SenseHQ',
    role: 'Software Development Engineer — Backend & Platform',
    period: 'Jul 2024 — Aug 2025 · Intern + Full-Time',
    location: 'Bangalore, India',
    shade: '#c2c2c2',
    points: [
      'Served as secondary on-call engineer — triaged production alerts, handled escalation queues, and resolved 30+ high-priority customer-engineering tickets.',
      'Patched 6 critical bugs in the backend orchestrator service layer handling J2 execution flows, resolving customer-blocking pipeline stalls.',
      'Built CI/CD pipelines in Jenkins automating build, deploy and verification flows on staging ahead of production releases.',
      'Designed and built the service-validation framework for J2 from scratch — 150+ integration scripts, 40+ UI suites and 150+ end-to-end flows as deployment gates.',
    ],
  },
  {
    company: 'TechCurators',
    role: 'Algorithm Problem Author & Reviewer Intern',
    period: 'Mar 2023 — Jun 2023',
    location: 'New Delhi, India',
    shade: '#9a9a9a',
    points: [
      'Authored 50+ original DSA and OOP problems in C++ and Java for large-scale technical assessments.',
      'Reviewed problem statements, wrote reference solutions, and verified edge-case data for correctness.',
    ],
  },
]

export interface Project {
  title: string
  subtitle: string
  description: string
  tags: string[]
  imageAlt: string
}

export const projects: Project[] = [
  {
    title: 'Expense Tracker',
    subtitle: 'Personal · Full-Stack Microservices App',
    description:
      'Full-stack expense tracker with a React Native mobile app and a Spring Boot microservices backend — an API Gateway with JWT auth routing traffic across services, containerized with Docker and deployed to AWS through CI/CD pipelines.',
    tags: ['React Native', 'Spring Boot', 'AWS', 'Docker', 'JWT', 'CI/CD'],
    imageAlt: 'Fintech dashboard rendered in monochrome 3D space',
  },
]

export interface SkillGroup {
  label: string
  shade: string
  items: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    label: 'Languages',
    shade: '#ffffff',
    items: ['Java', 'C++', 'Python', 'C', 'JavaScript', 'SQL'],
  },
  {
    label: 'Backend & Frameworks',
    shade: '#c2c2c2',
    items: ['Spring Boot', 'Microservices', 'REST APIs', 'Spring Cloud', 'PostgreSQL', 'ReactJS'],
  },
  {
    label: 'DevOps & Tools',
    shade: '#9a9a9a',
    items: ['Git', 'Linux', 'GitLab CI', 'Jenkins', 'Docker', 'AWS', 'Postman'],
  },
]

export const codingProfiles = [
  { platform: 'LeetCode', metric: 'Knight', note: 'Contest rating tier' },
  { platform: 'HackerEarth', metric: 'Elite', note: 'Problem-solving tier' },
  { platform: 'HackerRank', metric: '33,569', note: 'Hackos earned' },
]

export const heroStats = [
  { value: '33+', label: 'PODs orchestrated' },
  { value: '150+', label: 'Integration scripts' },
  { value: '6', label: 'Critical bugs patched' },
  { value: '50+', label: 'DSA problems authored' },
]

export const terminalCard = [
  { key: 'role', value: 'Software Engineer' },
  { key: 'edu', value: 'B.Tech CSE · 2024 passout' },
  { key: 'stack', value: 'Java · Spring Boot · Microservices' },
  { key: 'ships', value: 'CI pipelines, developer platforms, REST APIs' },
  { key: 'location', value: 'Bangalore, India' },
  { key: 'status', value: 'Building developer platforms @ PhonePe' },
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
  'REACT',
  'PYTHON',
  'LINUX',
  'SYSTEM DESIGN',
  'MCP',
]
