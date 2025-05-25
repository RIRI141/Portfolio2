export interface WorkData {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    description: string;
    detailedDescription: string;
    technologies: string[];
    projectDetails: {
      period: string;
      teamSize: string;
      role: string;
      status: string;
    };
    links: {
      demo?: string;
      github?: string;
    };
    nextProject?: string;
  }
  
  