import { ObjectId } from "mongodb";
import { ProjectStatus, ProjectType } from "./project";

export type ProjectSummary = {
  _id: ObjectId,
  title: string,
  projectSummaryURL: string,
  gallery: string[];
  locations: string[];
  projectStartDateTime: Date,
  projectEndDateTime: Date,
  organizers: string[],
  category: ProjectType;
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
