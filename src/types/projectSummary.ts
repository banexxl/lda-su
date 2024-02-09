import { ProjectStatus } from "./project";

export type ProjectSummary = {
  _id: string,
  projectSummaryTitle: string,
  projectSummaryURL: string,
  gallery: string[];
  locations: string[];
  projectStartDateTime: Date,
  projectEndDateTime: Date,
  organizers: string[],
  category: string;
  applicants: string[],
  donators: string[];
  publications: string[];
  links: string[];
  projectSummaryCoverURL: string,
  projectSummaryDescriptions: string[],
  projectSummarySubtitles: string[],
  projectSummarySubtitleURLs: string[],
  projectSummaryDateTime: string[],
  status: ProjectStatus,
};
