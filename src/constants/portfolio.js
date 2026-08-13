import {
  FaCss3Alt,
  FaCode,
  FaDatabase,
  FaEnvelope,
  FaGithub,
  FaGitAlt,
  FaGraduationCap,
  FaHtml5,
  FaLinkedin,
  FaNodeJs,
  FaReact,
  FaTools,
} from "react-icons/fa";
import {
  SiExpress,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiPostman,
  SiRender,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { TbApi, TbBrandVscode } from "react-icons/tb";

export const profile = {
  name: "Praveen Kumar T",
  role: "Full-Stack Developer",
  location: "Madurai, Tamil Nadu, India",
  email: "praveenkumar2k4.t@gmail.com",
  phone: "+91 6374948623",
  avatar: "/pk.png",
  resume: "/assets/resume.pdf",
  githubUser: "praveenkumart18",
  availability: "Available for internships and fresher opportunities",
  headline: "Building reliable MERN applications with clean interfaces and practical backend thinking.",
  summary:
    "MCA student and full-stack developer focused on React, Node.js, Express, MongoDB, REST APIs, and recruiter-friendly product experiences. I enjoy turning messy real-world workflows into simple dashboards, forms, and admin tools.",
};

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/praveenkumart18",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/praveenkumart18/",
    icon: FaLinkedin,
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: FaEnvelope,
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Profile", href: "#profile" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const roles = [
  "MERN Stack Developer",
  "React Frontend Developer",
  "Node.js API Developer",
  "Fresher Software Engineer",
];

export const heroStats = [
  { value: "07+", label: "Core projects" },
  { value: "MCA", label: "Computer Applications" },
  { value: "API", label: "Postman trained" },
];

export const profileHighlights = [
  {
    label: "Current Focus",
    value: "Building full-stack MERN applications with secure auth, dashboards, and clean REST APIs.",
  },
  {
    label: "Strength",
    value: "Converting real-world workflows into simple user journeys, admin views, and reusable components.",
  },
  {
    label: "Role Fit",
    value: "Frontend, backend, MERN stack, API testing, and fresher software engineering teams.",
  },
];

export const education = [
  {
    degree: "MCA - Master of Computer Applications",
    place: "Kongu Engineering College",
    period: "2024 - 2026",
    detail: "Focused on modern web development, software engineering fundamentals, and application architecture.",
  },
  {
    degree: "B.Sc Computer Science",
    place: "Mannar Thirumalai Naicker College",
    period: "2021 - 2024",
    detail: "Built a foundation in programming, databases, web technologies, and problem solving.",
  },
];

export const workingStyle = [
  "Start with the workflow, user role, and data model before building screens.",
  "Keep components reusable, readable, and easy to extend for new features.",
  "Test APIs with Postman and keep frontend states clear for loading, empty, and error cases.",
  "Prefer practical UI decisions that help recruiters and users scan information quickly.",
];

export const skillGroups = [
  {
    title: "Frontend",
    icon: FaReact,
    skills: [
      { name: "React", icon: FaReact, level: 88 },
      { name: "Java Script", icon: SiJavascript, level: 86 },
      { name: "Vite", icon: SiVite, level: 82 },
      { name: "HTML", icon: FaHtml5, level: 90 },
      { name: "CSS", icon: FaCss3Alt, level: 86 },
    ],
  },
  {
    title: "Backend",
    icon: FaNodeJs,
    skills: [
      { name: "Node.js", icon: FaNodeJs, level: 82 },
      { name: "Express.js", icon: SiExpress, level: 80 },
      { name: "REST APIs", icon: TbApi, level: 84 },
    ],
  },
  {
    title: "Database",
    icon: FaDatabase,
    skills: [
      { name: "MongoDB", icon: SiMongodb, level: 80 },
      { name: "MySQL", icon: SiMysql, level: 76 },
      { name: "PostgreSQL", icon: SiPostgresql, level: 72 },
      { name: "Schema Design", icon: FaDatabase, level: 74 },
    ],
  },
  {
    title: "Tools",
    icon: FaTools,
    skills: [
      { name: "Git", icon: FaGitAlt, level: 84 },
      { name: "GitHub", icon: FaGithub, level: 86 },
      { name: "Postman", icon: SiPostman, level: 82 },
      { name: "VS Code", icon: TbBrandVscode, level: 92 },
      { name: "Vercel", icon: SiVercel, level: 76 },
      { name: "Render", icon: SiRender, level: 74 },
    ],
  },
];

export const projects = [
  {
    id: "hostelhub",
    title: "HostelHub",
    category: "Full Stack",
    type: "Featured Full Stack",
    repo: "https://github.com/viratpk18/HostelHub",
    demo: "",
    imageTone: "cyan",
    image: "/assets/projects/hostelhub.png",
    featured: true,
    summary:
      "A MERN Stack Hostel Management System featuring role-based dashboards for Admin, Warden, and Students.",
    description:
      "HostelHub centralizes hostel operations into role-aware dashboards with secure authentication, workflow tracking, and operational modules for daily campus management. It features a complete complaint management system, leave approval workflows, room allocations, and student check-ins.",
    outcome:
      "Demonstrates multi-role access control, secure authentication state management, and real-world administrative dashboards.",
    architecture: ["React.js Frontend", "Node.js & Express API", "MongoDB Databases", "JWT Role Auth"],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
    features: [
      "Role-based dashboards (Admin, Warden, Student)",
      "Student complaint management & tracking",
      "Student leave request & approval workflow",
      "Room allocation & hostel admin controls",
      "Secure JWT authentication and route guards",
    ],
  },
  {
    id: "switchchat",
    title: "SwitchChat",
    category: "Chat Applications",
    type: "Featured Chat App",
    repo: "https://github.com/praveenkumart18/SwitchChat",
    demo: "https://switch-chat.vercel.app",
    imageTone: "violet",
    image: "/assets/projects/switchchat.png",
    featured: true,
    summary:
      "A modern real-time chat application featuring secure authentication, active rooms, and responsive UI.",
    description:
      "SwitchChat is a highly interactive chat platform designed for real-time messaging. Built with WebSockets, it synchronizes user message states, active chat rooms, online user statuses, and offers a smooth responsive interface compatible with mobile and desktop screens.",
    outcome:
      "Shows competence in WebSocket-based state syncing, dynamic message state lists, and instant responsive UI styling.",
    architecture: ["React UI Engine", "Socket.io Channels", "Express API Service", "MongoDB message logs"],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    features: [
      "Real-time message transmission & room channels",
      "User authentication and profile settings",
      "Online indicator for active users list",
      "Fully responsive and premium dark-mode UI",
    ],
  },
  {
    id: "taskmanager",
    title: "Employee Task Manager",
    category: "Productivity",
    type: "Featured Productivity / Full Stack",
    repo: "https://github.com/praveenkumart18/Employee-Task-Manager",
    demo: "https://employee-task-manager-frontend.vercel.app",
    imageTone: "blue",
    image: "/assets/projects/taskmanager.png",
    featured: true,
    summary:
      "A task management platform for assigning, tracking, and managing employee tasks with dashboard counters.",
    description:
      "Employee Task Manager is an administrative productivity platform. Admins can assign tasks to specific employees, track progress in real-time, view analytics counters, and manage status updates. Employees receive personal boards where they can track, complete, and update their task status.",
    outcome:
      "Highlights administrative workflow automation, dashboard KPI visualization, and cross-user role coordination.",
    architecture: ["React Admin Interface", "Express Router APIs", "MongoDB Collections", "Token Authorization"],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Task assignment & monitoring panel",
      "Employee personal task tracking dashboard",
      "Real-time counter and analytics charts",
      "Interactive status boards (To Do / In Progress / Done)",
    ],
  },
  {
    id: "busticket",
    title: "Bus Ticket Booking System",
    category: "Full Stack",
    type: "Booking Platform",
    repo: "https://github.com/viratpk18/Bus-ticket-booking-system",
    demo: "",
    imageTone: "teal",
    image: "/assets/projects/busticket.png",
    featured: false,
    summary:
      "An online reservation platform featuring interactive bus seat bookings, route searches, and admin panels.",
    description:
      "This reservation system coordinates public transport discovery and seat booking. Users can search for routes between cities, browse schedules, pick specific vacant seats on an interactive map, and manage reservations. Admins have access to route and scheduling controls.",
    outcome:
      "Demonstrates data consistency for grid bookings, transaction states, and search indexing patterns.",
    architecture: ["Vite Route Listing UI", "Express Scheduling Backend", "MongoDB Reservations", "React grid state"],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Dynamic interactive seat grid selection",
      "Bus route schedule search & filters",
      "User booking history and receipts",
      "Admin panel to manage buses and schedules",
    ],
  },
  {
    id: "taskflow",
    title: "TaskFlow",
    category: "Productivity",
    type: "Productivity App",
    repo: "https://github.com/praveenkumart18/TaskFlow",
    demo: "https://taskflow-pk.vercel.app",
    imageTone: "cyan",
    image: "/assets/projects/taskflow.png",
    featured: false,
    summary:
      "A task and productivity management application designed for organizing daily activities and focus.",
    description:
      "TaskFlow helps developers and students manage tasks and focus. It includes task prioritization lists, pomodoro timer widgets to structure study sessions, daily goal trackers, and clean data persistency so task lists stay updated across browser reloads.",
    outcome:
      "Highlights clean component design, browser storage integration, and client-side productivity tool state mechanics.",
    architecture: ["React Component Layouts", "LocalState Controllers", "HTML5 LocalStorage Engine", "Tailwind style"],
    stack: ["React.js", "Tailwind CSS", "LocalStorage"],
    features: [
      "Task creation, prioritization & tag filtering",
      "Integrated Pomodoro study timer",
      "Daily progress metric circles",
      "Local browser storage database persistence",
    ],
  },
  {
    id: "flappybird",
    title: "Flappy Bird",
    category: "Games",
    type: "Web Game",
    repo: "https://github.com/praveenkumart18/Flappy-Bird",
    demo: "https://praveenkumart18.github.io/Flappy-Bird/",
    imageTone: "green",
    image: "/assets/projects/flappybird.png",
    featured: false,
    summary:
      "A browser-based Flappy Bird clone with canvas physics, score tracking, themes, and gameplay controls.",
    description:
      "This Flappy Bird clone is built on HTML5 Canvas. It features smooth rendering loops, pixel-accurate collision detection, customizable bird skins and pipe themes, high-score tracking using browser storage, and complete pause/resume states to control the game loop.",
    outcome:
      "Shows knowledge of game rendering loops, canvas coordinates, collision mathematics, and keyboard physics.",
    architecture: ["Canvas Rendering Loop", "JavaScript Physics Engine", "LocalStorage High Score", "CSS Themes"],
    stack: ["HTML5 Canvas", "JavaScript", "CSS3"],
    features: [
      "Smooth HTML5 Canvas animation loop",
      "Collision detection & physics calculations",
      "Customizable skins and obstacle themes",
      "Pause and resume options with scoreboards",
    ],
  },
  {
    id: "snakegame",
    title: "Snake Game",
    category: "Games",
    type: "Web Game",
    repo: "https://github.com/praveenkumart18/Snake-Game",
    demo: "https://pksnakegame.vercel.app/",
    imageTone: "teal",
    image: "/assets/projects/snakegame.png",
    featured: false,
    summary:
      "An interactive JavaScript Snake Game featuring responsive keyboard/mobile controls and score tracking.",
    description:
      "A modern browser adaptation of the retro arcade Snake game. The grid-based logic ensures perfect snake movement, self-collision detection, randomized food generation, score multipliers, and dynamic speed scaling as score increases.",
    outcome:
      "Demonstrates grid coordinate calculations, frame-rate speed scaling, and responsive keyboard event handling.",
    architecture: ["HTML5 Grid Coordinates", "JavaScript Game Interval", "LocalStorage High Score", "Responsive Layout"],
    stack: ["HTML5 Canvas", "JavaScript", "CSS3"],
    features: [
      "Grid movement coordination",
      "Self and boundary collision alerts",
      "High score leaderboard persistence",
      "Fluid responsive keyboard and touch overlays",
    ],
  },
];

export const experience = [
  {
    title: "MERN Workshop",
    meta: "Hands-on full-stack development",
    icon: FaCode,
    details:
      "Built practical understanding of React, Express APIs, MongoDB integration, and deployment-oriented project structure.",
  },
  {
    title: "Postman Student Expert",
    meta: "API fundamentals and testing",
    icon: SiPostman,
    details:
      "Practiced API requests, collections, environments, authorization patterns, and repeatable backend testing workflows.",
  },
  {
    title: "Hackathons",
    meta: "Collaborative problem solving",
    icon: FaGraduationCap,
    details:
      "Worked on time-boxed software ideas, translating requirements into usable interfaces and working prototypes.",
  },
  {
    title: "IBM Z Datathon",
    meta: "Data-driven challenge",
    icon: FaDatabase,
    details:
      "Participated in a competitive data challenge focused on analysis, structured thinking, and clear presentation of outcomes.",
  },
];

export const filters = ["All", "Full Stack", "Chat Applications", "Productivity", "Games"];
