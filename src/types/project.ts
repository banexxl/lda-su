export type ProjectType = 'economy' | 'democracy' | 'eu-integrations' | 'culture' | 'intercultural-dialogue' | 'migrations' | 'youth' | 'other'
export type ProjectStatus = 'completed' | 'in-progress'

export type Project = {
  _id: string;
  projectSummaryURL: string;
  projectURL: string;
  links: string[];
  title: string;
  subTitle: string,
  paragraphs: string[];
  hasTranslation: boolean;
  title_eng: string;
  subTitle_eng: string,
  paragraphs_eng: string[];
  category: ProjectType;
  //coverUrl: string;
  gallery: string[];
  locations: string[];
  published: Date;
  dateFrom: Date;
  dateTo: Date;
  // favorited: boolean;
  // favoritedNumber: number;
  organizers: string[];
  subOrganizers: string[];
  applicants: string[];
  donators: string[];
  publications: string[];
  status: ProjectStatus;
  showProjectDetails: boolean;
  showList: boolean;
  showListOnBottom: boolean;
  listTitle: string;
  list: string[];
  quillEditorData: string;
};
