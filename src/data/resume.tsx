import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Samrat Neupane",
  initials: "SN",
  url: "https://samratneupane.com.np",
  location: "Kathmandu, Nepal",
  locationLink: "https://www.google.com/maps/place/Kathmandu",
  description: "",
  summary:
    "Hi there , I am Samrat Neupane. I am a Computer Engineering !! student who loves to write codes and I love travelling.",
  avatarUrl: "/samrat.jpg",
  skills: ["React", "Next.js", "Node.js", "C++", "Ruby on Rails"],
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
        url: "https://www.linkedin.com/in/samrat-neupane-36394b213/",
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
      company: "Aruna Software",
      href: "https://aruna.software",
      badges: [],
      location: "Remote",
      title: "FrontEnd Developer Intern",
      logoUrl: "/atomic.png",
      start: "October 2024",
      end: "April 2025",
      description: "Worked as an frontend developer intern",
    },
  ],

  projects: [
    {
      title: "Skillhunt",
      href: "https://skill-hunt.vercel.app/",

      active: true,
      description:
        "Skillhunt is the platform which a company can create events and hire the freshers based on the perfomance on that event.Currently working on this project",
      technologies: [
        "Next.js",
        "NextAuth",
        "TailwindCSS",
        "Mongodb",
        "Aceternity UI",
      ],
      links: [
        {
          type: "Website",
          href: "https://skill-hunt.vercel.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/image.png",
    },
    {
      title: "Ride Booking App",
      href: "https://gadibook.samratneupane.com.np/",

      active: true,
      description:
        "Book rides in just simple click pay with the feasible payment method",
      technologies: [
        "Next.js",
        "Clerk",
        "TailwindCSS",
        "Stripe",
        "Aceternity UI",
        "MapBox Api",
      ],
      links: [
        {
          type: "Website",
          href: "https://gadibook.samratneupane.com.np/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/gadibook.png",
    },

    {
      title: "EV Chargers Website with Custom Admin Panel",
      href: "https://codingfunda.samratneupane.com.np/",

      active: true,
      description:
        "Ev chargers selling websit with custom admin panel to add and update the prducts",
      technologies: [
        "Next.js",
        "TailwindCSS",
        "Shadcn",
        "Mongodb",
        "Next auth",
      ],
      links: [
        {
          type: "Website",
          href: "https://ev.samratneupane.com.np/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/evchargers.png",
    },

    {
      title: "Movie Saving website",
      href: "https://moviewebsite.samratneupane.com.np/",

      active: true,
      description: "Save the movies that you want to watch so you won't forget",
      technologies: ["Next.js", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://moviewebsite.samratneupane.com.np/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/movie.png",
    },
  ],
} as const;
