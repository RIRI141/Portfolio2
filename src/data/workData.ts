import { WorkData } from "@/types/work";

export const workData: WorkData[] = [
    {
      id: 1,
      title: "Monogatari",
      subtitle: "EC site for who lives in Vancouver",
      image: "/assets/img/work-banner/Monogatari.png",
      description: "Here in Vancouver, problems can arise when you buy many items locally but find too much to take home, or find something missing when you arrive there. Monogatari makes it easier for you to buy and sell with your memories.",
      detailedDescription: "React、Next.js、TypeScriptを使用して構築され、滑らかなアニメーションとレスポンシブデザインを特徴としています。ユーザー体験を最優先に設計されたモダンなインターフェースが、没入感のある体験を提供します。",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "MongoDB", "Vercel"],
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
      description: "Building apps like Kahoot.",
      detailedDescription: "Our app combines playful visuals with smooth real-time syncing, aiming to be fun for players and easy for hosts to manage.",
      technologies: ["Next.js", "Tailwind CSS", "Node.js", "Redis", "Docker", "AWS", "Stripe"],
      projectDetails: {
        period: "2024/April",
        teamSize: "4members (Frontend2名、バックエンド3名、デザイナー1名)",
        role: "Frontend",
        status: "Deployed"
      },
      links: {
        demo: "https://ecommerce-demo.com",
        github: "https://github.com/username/ecommerce-platform"
      },
      nextProject: "AI Dashboard"
    },
    {
      id: 3,
      title: "AI Dashboard",
      subtitle: "データ分析・可視化プラットフォーム",
      image:  "/assets/img/work-banner/Monogatari.png",
      description: "機械学習とデータ分析を活用したビジネスインテリジェンスダッシュボードです。リアルタイムデータ処理と美しい可視化を提供します。",
      detailedDescription: "Python、React、D3.jsを組み合わせて構築された高度な分析プラットフォーム。大量のデータをリアルタイムで処理し、直感的なグラフとチャートで表示します。機械学習モデルによる予測機能も搭載しています。",
      technologies: ["React", "Python", "FastAPI", "D3.js", "Chart.js", "PostgreSQL", "Redis", "Docker"],
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