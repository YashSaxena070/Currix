import {
  Code,
  Compass,
  Gamepad2,
  GraduationCap,
  Headphones,
  Languages,
  LayoutTemplate,
  Library,
  MapPin,
  PenTool,
  User,
} from "lucide-react";

export const DUMMY_RESUME_DATA = {
  title: "My Resume",
  theme: "01",
  colorPalette: ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
  profileInfo: {
    fullName: "John Doe",
    designation: "Software Engineer",
    summary:
      "Passionate software engineer with 5+ years of experience in building scalable web applications. Skilled in React, Node.js, and Cloud Architecture.",
    profileImg: "",
    profilePreviewUrl: "",
  },
  contactInfo: {
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.com",
  },
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      startDate: "2015-09",
      endDate: "2019-05",
    },
  ],
  workExperience: [
    {
      company: "Tech Solutions Inc.",
      role: "Senior Developer",
      startDate: "2021-06",
      endDate: "",
      description:
        "Leading the frontend team in migrating legacy applications to React. Improved performance by 40%.",
    },
    {
      company: "StartUp Hub",
      role: "Full Stack Developer",
      startDate: "2019-06",
      endDate: "2021-05",
      description:
        "Developed and maintained multiple client projects using MERN stack.",
    },
  ],
  projects: [
    {
      title: "E-commerce Platform",
      description:
        "A full-featured e-commerce platform with payment gateway integration.",
      github: "https://github.com/johndoe/ecommerce",
      liveDemo: "https://shop.johndoe.com",
    },
  ],
  skills: [
    { name: "React", progress: 90 },
    { name: "Node.js", progress: 85 },
    { name: "MongoDB", progress: 80 },
    { name: "AWS", progress: 70 },
  ],
  certifications: [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2022",
    },
  ],
  languages: [
    { name: "English", progress: 100 },
    { name: "Spanish", progress: 60 },
  ],
  interests: ["Reading", "Traveling", "Photography"],
};

import freeImg from "../assets/free.png";
import premiumImg1 from "../assets/1st.png";
import premiumImg2 from "../assets/2nd.png";

export const resumeTemplates = [
  {
    id: "01",
    name: "Modern Clean",
    thumbnailImg: freeImg,
  },
  {
    id: "02",
    name: "Professional",
    thumbnailImg: premiumImg1,
  },
  {
    id: "03",
    name: "Creative",
    thumbnailImg: premiumImg2,
  },
  {
    id: "04",
    name: "Executive",
    thumbnailImg: premiumImg1,
  },
  {
    id: "05",
    name: "Minimalist",
    thumbnailImg: premiumImg2,
  },
  {
    id: "06",
    name: "Tech Lead",
    thumbnailImg: premiumImg1,
  },
  {
    id: "07",
    name: "Designer",
    thumbnailImg: premiumImg2,
  },
  {
    id: "08",
    name: "Startup",
    thumbnailImg: premiumImg1,
  },
];

export const themeColorPalette = {
  themeOne: [
    ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
    ["#FFF5F5", "#FED7D7", "#FEB2B2", "#F56565", "#742A2A"],
    ["#F0FFF4", "#C6F6D5", "#9AE6B4", "#48BB78", "#22543D"],
    ["#FFFFF0", "#FEFCBF", "#FAF089", "#ECC94B", "#744210"],
    ["#F7FAFC", "#E2E8F0", "#CBD5E0", "#A0AEC0", "#2D3748"],
  ],
};
