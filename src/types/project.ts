import { TeamMember } from './team-member';

export type Project = {
  id: string;
  title: string;
  subTitle: string[],
  description: string[];
  projectType: string;
  createdAt: string;
  coverUrl: string;
  gallery: string[];
  location: string;
  duration: string;
  published: Date;
  timeBetween: {
    start: Date;
    end: Date;
  };
  favorited: boolean;
  favoritedNumber: number;
  languages: string[];
  organizers: TeamMember[];
};
