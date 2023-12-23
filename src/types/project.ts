import { TeamMember } from './team-member';

type ProjectType = 'economy' | 'democracy' | 'eu-integrations' | 'cultural-heritage' | 'interethnic-dialogue' | 'migrations' | 'youth' | 'other'

export type Project = {
  _id: string;
  link: string;
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
  startDateTime: Date,
  endDateTime: Date,
  favorited: boolean;
  favoritedNumber: number;
  organizers: TeamMember[];
};
