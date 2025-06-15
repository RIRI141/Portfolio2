import { WorkData } from "@/types/work";

export const workData: WorkData[] = [
    {
      id: 1,
      title: "Monogatari",
      subtitle: "EC site for who lives in Vancouver",
      image: "/assets/img/work-banner/Monogatari.png",
      description: "Here in Vancouver, problems can arise when you buy many items locally but find too much to take home, or find something missing when you arrive there. Monogatari makes it easier for you to buy and sell with your memories.",
      detailedDescription: "This application is a simple e-commerce site where users can browse local items, view details, and purchase with ease. Built using modern frontend tools.",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js", "Nest.js", "Prisma", "Supabase" ,"JWT", "Jest", "Githubactions", "GraphQL"],
      projectDetails: {
        period: "2024年3月 - 2024年6月",
        teamSize: "4members (Two Frontend, Two backend)",
        role: "Frontend",
        status: "リリース済み"
      },
      links: {
        demo: "https://monogatari-demo.com",
        github: "https://github.com/username/monogatari"
      },
      nextProject: "E-Commerce Platform"
    },
    {
      id: 2,
      title: "Quizoo",
      subtitle: "Quiz app",
      image:  "/assets/img/work-banner/Quizoo.png",
      description: "Building a app like Kahoot. Dive into the intuitive, easy, yet profound world of quizzes with your friends!",
      detailedDescription: "Our app combines playful visuals with smooth real-time syncing, aiming to be fun for players and easy for hosts to manage.",
      technologies: ["Next.js", "Tailwind CSS", "Node.js", "Prisma", "FireBase", "WebSocket", "Supabase"],
      projectDetails: {
        period: "2024/April",
        teamSize: "4members (Frontend2名、バックエンド3名、デザイナー1名)",
        role: "Frontend",
        status: "Deployed",
      },
      links: {
        demo: "https://ecommerce-demo.com",
        github: "https://github.com/username/ecommerce-platform"
      },
      nextProject: "AI Dashboard"
    },
    {
      id: 3,
      title: "Evolvie",
      subtitle: "Catch real movie information",
      image:  "/assets/img/work-banner/Evolvie.png",
      description: "Get to know the top 20 most popular movies and animations in the world!",
      detailedDescription: "Use TMDB's api to get the latest information from past movie/anime information. Uses vanilla javascript.",
      technologies: ["Javascript", "HTML", "CSS", "Gsap"],
      projectDetails: {
        period: "2023年10月 - 2024年2月",
        teamSize: "5名 (フロントエンド2名、バックエンド2名、MLエンジニア1名)",
        role: "フロントエンドリーダー",
        status: "運用中"
      },
      links: {
        demo: "https://ai-dashboard-demo.com",
        github: "https://github.com/username/ai-dashboard"
      },
      nextProject: "Monogatari"
    }
  ];