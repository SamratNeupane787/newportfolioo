import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Samrat Neupane",
  initials: "SN",
  url: "https://samratneupane.com.np",
  location: "Kathmandu, Nepal",
  locationLink: "https://www.google.com/maps/place/Kathmandu",
  description:
    "SEO Specialist & Full-Stack Developer. I turn search into revenue and ideas into shipped products.",
  summary:
    "I'm Samrat Neupane, a Computer Engineering graduate (2026) from Kathmandu. I work as an SEO Specialist & Full-Stack Developer at Griffity Studios, where I took a client ecommerce site from near-zero visibility to **265K Google Search impressions** and **6.76K clicks in 8 months**. I also build full-stack products end to end — from an expert-booking platform with Khalti and FonePay payments to a Chrome extension that pulls a website's design tokens straight into Figma.",
  avatarUrl: "/samrat.jpg",
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Vue.js",
    "NestJS",
    "PostgreSQL",
    "TypeORM",
    "TailwindCSS",
    "SEO",
    "Google Search Console",
    "GA4",
    "Ahrefs",
    "Semrush",
    "Technical SEO",
    "Schema Markup",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    {
      href: "https://blog.samratneupane.com.np/",
      icon: NotebookIcon,
      label: "Blog",
    },
  ],
  contact: {
    email: "samratneupane.official@gmail.com",
    tel: "+9779842750382",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/SamratNeupane787",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/samrat-neupane",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/samratneupane6",
        icon: Icons.x,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "Griffity Studios",
      href: "#",
      badges: [],
      location: "Lalitpur, Nepal",
      title: "SEO Specialist & Full-Stack Developer",
      logoUrl: "",
      start: "March 2024",
      end: "Present",
      description:
        "Took a client ecommerce site from near-zero visibility to 265K Google Search impressions and 6.76K clicks in 8 months (avg. position 8.2) by rebuilding on-page SEO, technical structure, and content. Run a recurring SEO content calendar and reporting system across two client accounts, write long-form SEO content structured for both traditional search and AI answer engines (ChatGPT, Perplexity, Gemini), and deliver technical SEO audits and campaign strategies for ecommerce and hospitality clients.",
    },
    {
      company: "Bookedhere.com & Schoolbitez.com",
      href: "https://bookedhere.com",
      badges: [],
      location: "Remote",
      title: "Frontend Developer (Part-Time)",
      logoUrl: "",
      start: "August 2025",
      end: "April 2026",
      description:
        "Redesigned the user onboarding flow, date-selector component, and business profile page layouts in Next.js, improving usability across the booking journey.",
    },
    {
      company: "Aruna Software",
      href: "https://aruna.software",
      badges: [],
      location: "Remote",
      title: "Frontend Developer Intern (Part-Time)",
      logoUrl: "",
      start: "October 2024",
      end: "April 2025",
      description:
        "Redesigned the user onboarding flow, date-selector component, and business profile page layouts in Vue.js as part of a small development team.",
    },
  ],
  education: [
    {
      school: "Advanced College of Engineering and Management",
      href: "https://acem.edu.np",
      degree: "Bachelor's Degree, Computer Engineering",
      logoUrl: "",
      start: "2022",
      end: "2026",
    },
  ],
  projects: [
    {
      title: "ChromaPick",
      href: "https://chromapick.click",
      active: true,
      description:
        "Chrome extension that extracts true brand colors, gradients, and typography from any website's computed styles — then exports them as Figma Variables, design tokens JSON, Tailwind config, and CSS variables. Free tier with a $10 lifetime Pro.",
      technologies: [
        "TypeScript",
        "Chrome Extension",
        "Next.js",
        "Supabase",
        "Dodo Payments",
      ],
      links: [
        {
          type: "Website",
          href: "https://chromapick.click",
          icon: Icons.globe,
        },
      ],
      image: "/projects/chromapick.jpg",
    },
    {
      title: "Sodham",
      href: "https://sodham.com",
      active: true,
      description:
        "1-on-1 expert-booking platform for the Nepal market, built end to end: authentication, profiles, service listings, booking and payment flows (Khalti, FonePay), and calendar sync.",
      technologies: ["Next.js 14", "NestJS", "TypeORM", "PostgreSQL"],
      links: [
        {
          type: "Website",
          href: "https://sodham.com",
          icon: Icons.globe,
        },
      ],
      image: "/projects/sodham.jpg",
    },
    {
      title: "SkillHunt",
      href: "https://skillhunt.vercel.app",
      active: true,
      description:
        "Hackathon-launching platform where companies create events and hire freshers based on their event performance.",
      technologies: ["Next.js", "NextAuth", "TailwindCSS", "MongoDB"],
      links: [
        {
          type: "Website",
          href: "https://skillhunt.vercel.app",
          icon: Icons.globe,
        },
      ],
      image: "/projects/skillhunt.jpg",
    },
    {
      title: "RemoteJobNepal",
      href: "https://remotejobnepal.com",
      active: true,
      description:
        "Frontend for a remote-jobs listing platform targeting the Nepal market.",
      technologies: ["React", "Next.js", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://remotejobnepal.com",
          icon: Icons.globe,
        },
      ],
      image: "/projects/remotejobnepal.jpg",
    },
    {
      title: "Upkraft.ai",
      href: "https://upkraft.ai",
      active: true,
      description: "Frontend for an AI-focused SaaS product.",
      technologies: ["React", "Next.js", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://upkraft.ai",
          icon: Icons.globe,
        },
      ],
      image: "/projects/upkraft.jpg",
    },
    {
      title: "Online Bouquet Maker",
      href: "https://onlinebouquetmaker.com",
      active: true,
      description:
        "Free virtual bouquet designer: arrange hand-drawn flowers, pick wrapping and ribbon, then share an animated reveal link or export a PNG to send to someone you love.",
      technologies: ["JavaScript", "SVG", "Canvas"],
      links: [
        {
          type: "Website",
          href: "https://onlinebouquetmaker.com",
          icon: Icons.globe,
        },
      ],
      image: "/projects/bouquet.jpg",
    },
  ],
} as const;
