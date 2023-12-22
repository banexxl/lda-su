import { TeamMember } from './team-member';

export type Project = {
  _id: string;
  title: string;
  subTitle: string[],
  parargaph1: string;
  parargaph2: string;
  parargaph3: string;
  parargaph4: string;
  parargaph5: string;
  parargaph6: string;
  parargaph7: string;
  parargaph8: string;
  projectType: string;
  coverUrl: string;
  gallery: string[];
  locations: string[];
  published: Date;
  timeBetween: string,
  favorited: boolean;
  favoritedNumber: number;
  organizers: TeamMember[];
};
