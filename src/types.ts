export interface VideoProject {
  id: string;
  title: string;
  youtubeUrl?: string;
  videoUrl?: string;
  views?: string;
  category: string;
  description: string;
  thumbnail?: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  email: string;
  location: string;
  avatar?: string;
  socials: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}
