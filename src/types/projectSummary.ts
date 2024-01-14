import { ProjectStatus } from "./project";

export type ProjectSummary = {
  _id: string,
  projectSummaryTitle: string,
  projectSummaryURL: string,
  gallery: string[];
  locations: string[];
  projectStartDateTime: Date,
  projectEndDateTime: Date,
  publishedDateTime: Date,
  organizers: string[],
  category: string;
  applicants: string[],
  donators: string[];
  publications: string[];
  projectSummaryCoverURL: string,
  projectSummary1Description: string,
  projectSummary1Subtitle: string,
  projectSummary1SubtitleURL: string,
  projectSummary1DateTime: string,
  projectSummary2DateTime: string,
  projectSummary2Description: string,
  projectSummary2ImageURL: string,
  projectSummary2Subtitle: string,
  projectSummary2SubtitleURL: string,
  projectSummary3DateTime: string,
  projectSummary3Description: string,
  projectSummary3ImageURL: string,
  projectSummary3Subtitle: string,
  projectSummary3SubtitleURL: string,
  projectSummary4DateTime: string,
  projectSummary4Description: string,
  projectSummary4ImageURL: string,
  projectSummary4Subtitle: string,
  projectSummary4SubtitleURL: string,
  projectSummary5DateTime: string,
  projectSummary5Description: string,
  projectSummary5ImageURL: string,
  projectSummary5Subtitle: string,
  projectSummary5SubtitleURL: string,
  projectSummary6DateTime: string,
  projectSummary6Description: string,
  projectSummary6ImageURL: string,
  projectSummary6Subtitle: string,
  projectSummary6SubtitleURL: string,
  status: ProjectStatus,
};
