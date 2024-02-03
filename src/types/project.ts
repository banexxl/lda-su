type ProjectType = 'economy' | 'democracy' | 'eu-integrations' | 'cultural-heritage' | 'interethnic-dialogue' | 'migrations' | 'youth' | 'other'
export type ProjectStatus = 'completed' | 'in-progress'

export type Project = {
  _id: string;
  projectSummaryURL: string;
  // projectURL: string;
  links: string[];
  title: string;
  subTitle: string,
  paragraphs: string[];
  category: ProjectType;
  //coverUrl: string;
  gallery: string[];
  locations: string[];
  published: Date;
  // favorited: boolean;
  // favoritedNumber: number;
  organizers: string[];
  applicants: string[];
  donators: string[];
  publications: string[];
  status: ProjectStatus
};
