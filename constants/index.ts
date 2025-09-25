import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
export const months = [
  { value: "01", label: "January - 2025" },
  { value: "02", label: "February - 2025" },
  { value: "03", label: "March - 2025" },
  { value: "04", label: "April - 2025" },
  { value: "05", label: "May - 2025" },
  { value: "06", label: "June - 2025" },
  { value: "07", label: "July - 2025" },
  { value: "08", label: "August - 2025" },
  { value: "09", label: "September - 2025" },
  { value: "10", label: "October - 2025" },
  { value: "11", label: "November - 2025" },
  { value: "12", label: "December - 2025" },
];
export const popularCategories = [
  {
    slug: "leadership-strategic-management",
    name: "Leadership & Strategic Management",
  },
  {
    slug: "financial-management-investment-analysis",
    name: "Financial Management & Investment Analysis",
  },
  {
    slug: "project-management-planning",
    name: "Project Management & Planning",
  },
  {
    slug: "human-resources-management-training",
    name: "Human Resources Management & Training",
  },
  {
    slug: "public-relations-corporate-communication",
    name: "Public Relations & Corporate Communication",
  },
  {
    slug: "data-analytics-ai-decision-making",
    name: "Data Analytics, AI & Decision-Making",
  },
];

export const quickAccessLinks = [
  { href: "/", label: "Home" },
  { href: "/training-courses", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Blogs" },
  { href: "/sitemap", label: "Sitemap" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

export const socialLinks = [
  { href: "#", Icon: FaFacebookF },
  { href: "#", Icon: FaInstagram },
  { href: "#", Icon: FaXTwitter  },
  { href: "#", Icon: FaLinkedinIn },
];

export const orderedMonths = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export const durationOptions = [
  { value: 5, label: "1 Week" },
  { value: 10, label: "2 Weeks" },
];

// API Endpoints
export const API_ENDPOINTS = {
  CATEGORIES: '/training-courses',
  COURSES: '/courses',
  CITIES: '/training-cities',
  UPCOMING_COURSES: '/get-upcoming-courses',
  BLOGS: '/blogs',
  SITEMAP: '/sitemap',
} as const;

export const services = [
  {
    icon: "https://euroqst.com/assets/images/service-icon3.svg",
    title: "In-house Courses",
    description: "EuroQuest International offers offer customized training courses within the organization."
  },
  {
    icon: "https://euroqst.com/assets/images/service-icon2.svg",
    title: "Classroom Courses", 
    description: "EuroQuest International offer training courses held in carefully selected locations in cities and capitals worldwide"
  },
  {
    icon: "https://euroqst.com/assets/images/service-icon1.svg",
    title: "Online Courses",
    description: "EuroQuest International offers offer flexible training courses delivered remotely."
  }
];