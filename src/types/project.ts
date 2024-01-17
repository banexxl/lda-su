type ProjectType = 'economy' | 'democracy' | 'eu-integrations' | 'cultural-heritage' | 'interethnic-dialogue' | 'migrations' | 'youth' | 'other'
export type ProjectStatus = 'completed' | 'in-progress'

export type Project = {
  _id: string;
  projectSummaryURL: string;
  projectURL: string;
  links: string[];
  title: string;
  subTitle: string,
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  paragraph4: string;
  paragraph5: string;
  paragraph6: string;
  paragraph7: string;
  paragraph8: string;
  category: ProjectType;
  coverUrl: string;
  gallery: string[];
  locations: string[];
  published: Date;
  startDateTime: Date,
  endDateTime: Date,
  // favorited: boolean;
  // favoritedNumber: number;
  organizers: string[];
  applicants: string[];
  donators: string[];
  publications: string[];
  status: ProjectStatus
};
