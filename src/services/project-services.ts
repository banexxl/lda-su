import { asAnon } from "src/lib/db/rls";
import { toPlain } from "src/lib/db/serialize";
import { Project } from "src/types/project";
import { ProjectSummary } from "src/types/projectSummary";
import { Publication } from "src/types/publication";

const mapPublication = (row: any): Publication => ({
     _id: row.id,
     publicationTitle: row.publication_title,
     publicationURL: row.publication_url,
     publicationImageURL: row.publication_image_url,
});

const MAX_ENTRY_DESCRIPTION_LENGTH = 300;

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');

const getEntryDescription = (entry: any): string => {
     const firstParagraph = entry.paragraphs?.[0];
     if (firstParagraph) {
          return firstParagraph;
     }

     if (entry.quill_editor_data) {
          const text = stripHtml(entry.quill_editor_data).trim();
          return text.length > MAX_ENTRY_DESCRIPTION_LENGTH
               ? `${text.slice(0, MAX_ENTRY_DESCRIPTION_LENGTH)}...`
               : text;
     }

     return '';
};

const mapProjectSummary = (row: any): ProjectSummary => {
     const entries = [...(row.project_activities ?? [])].sort(
          (a: any, b: any) => new Date(a.published).getTime() - new Date(b.published).getTime()
     );

     return {
          _id: row.id,
          title: row.title,
          projectSummaryURL: row.project_summary_url,
          gallery: row.gallery ?? [],
          locations: row.locations ?? [],
          projectStartDateTime: row.project_start_date_time,
          projectEndDateTime: row.project_end_date_time,
          organizers: row.organizers ?? [],
          category: row.category,
          applicants: row.applicants ?? [],
          donators: row.donators ?? [],
          publications: row.publications ?? [],
          links: row.links ?? [],
          projectSummaryCoverURL: row.project_summary_cover_url,
          projectSummaryDescriptions: entries.map(getEntryDescription),
          projectSummarySubtitles: entries.map((e) => e.title),
          projectSummarySubtitleURLs: entries.map((e) => `/projektna-aktivnost/${e.project_url}`),
          projectSummaryDateTime: entries.map((e) => e.published),
          status: row.status,
     };
};

const mapProject = (row: any): Project => ({
     _id: row.id,
     projectSummaryURL: row.project_summaries?.project_summary_url
          ? `/pregled-projekta/${row.project_summaries.project_summary_url}`
          : '',
     projectURL: row.project_url,
     links: row.links ?? [],
     title: row.title,
     subTitle: row.sub_title,
     paragraphs: row.paragraphs ?? [],
     hasTranslation: row.has_translation,
     title_eng: row.title_eng,
     subTitle_eng: row.sub_title_eng,
     paragraphs_eng: row.paragraphs_eng ?? [],
     category: row.category,
     gallery: row.gallery ?? [],
     locations: row.locations ?? [],
     published: row.published,
     organizers: row.organizers ?? [],
     subOrganizers: row.sub_organizers ?? [],
     applicants: row.applicants ?? [],
     donators: row.donators ?? [],
     publications: row.publications ?? [],
     status: row.status,
     showProjectDetails: row.show_project_details,
     showList: row.show_list,
     showListOnBottom: row.show_list_on_bottom,
     listTitle: row.list_title,
     list: row.list ?? [],
     quillEditorData: row.quill_editor_data,
});

const shuffle = <T,>(items: T[]): T[] => {
     const copy = [...items];
     for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
     }
     return copy;
};

const projectsServices = () => {

     // project summaries with their sr-locale child activities embedded
     const summaryInclude = { project_activities: { where: { locale: 'sr' } } } as const;
     const projectInclude = { project_summaries: { select: { project_summary_url: true } } } as const;

     const getAllPublications = async () => {
          try {
               const rows = await asAnon((tx) => tx.publications.findMany({
                    orderBy: { publication_uploaded_date_time: 'desc' },
               }));
               return toPlain(rows).map(mapPublication);
          } catch {
               return [];
          }
     };

     const getAllProjectSummaries = async () => {
          try {
               const rows = await asAnon((tx) => tx.project_summaries.findMany({
                    where: { locale: 'sr' },
                    include: summaryInclude,
                    orderBy: { project_end_date_time: { sort: 'desc', nulls: 'last' } },
               }));
               return toPlain(rows).map(mapProjectSummary);
          } catch {
               return [];
          }
     };

     const getInProgressProjectSummaries = async () => {
          try {
               const rows = await asAnon((tx) => tx.project_summaries.findMany({
                    where: { locale: 'sr', status: 'in-progress' },
                    include: summaryInclude,
                    orderBy: { project_end_date_time: { sort: 'desc', nulls: 'last' } },
               }));
               return toPlain(rows).map(mapProjectSummary);
          } catch {
               return [];
          }
     };

     const getCompletedProjectSummaries = async () => {
          try {
               const rows = await asAnon((tx) => tx.project_summaries.findMany({
                    where: { locale: 'sr', status: 'completed' },
                    include: summaryInclude,
                    orderBy: { project_end_date_time: { sort: 'desc', nulls: 'last' } },
               }));
               return toPlain(rows).map(mapProjectSummary);
          } catch {
               return [];
          }
     };

     const getRandomCompletedProjectSummaries = async () => {
          try {
               const rows = await asAnon((tx) => tx.project_summaries.findMany({
                    where: { locale: 'sr', status: 'completed' },
                    include: summaryInclude,
               }));
               return shuffle(toPlain(rows)).slice(0, 5).map(mapProjectSummary);
          } catch {
               return [];
          }
     };

     const getProjectSummaryByLink = async (link: string): Promise<ProjectSummary | undefined> => {
          try {
               const row = await asAnon((tx) => tx.project_summaries.findFirst({
                    where: { locale: 'sr', project_summary_url: link },
                    include: summaryInclude,
               }));
               if (!row) return undefined;
               return mapProjectSummary(toPlain(row));
          } catch (error: any) {
               console.log({ message: error?.message });
               return undefined;
          }
     };

     const getAllProjects = async () => {
          try {
               const rows = await asAnon((tx) => tx.project_activities.findMany({
                    where: { locale: 'sr' },
                    include: projectInclude,
               }));
               return toPlain(rows).map(mapProject);
          } catch {
               return [];
          }
     };

     const getProjectByLink = async (projectURL: string): Promise<Project | undefined> => {
          try {
               const row = await asAnon((tx) => tx.project_activities.findFirst({
                    where: { locale: 'sr', project_url: projectURL },
                    include: projectInclude,
               }));
               if (!row) return undefined;
               return mapProject(toPlain(row));
          } catch (error: any) {
               console.log({ message: error?.message });
               return undefined;
          }
     };

     const getSearchTermResults = async (searchTerm: string) => {
          try {
               const rows = await asAnon((tx) => tx.project_activities.findMany({
                    where: { locale: 'sr', sub_title: { contains: searchTerm, mode: 'insensitive' } },
                    include: projectInclude,
                    take: 5,
               }));
               return toPlain(rows).map(mapProject);
          } catch {
               return [];
          }
     };

     return {
          getAllPublications,
          getAllProjects,
          getSearchTermResults,
          getCompletedProjectSummaries,
          getRandomCompletedProjectSummaries,
          getProjectByLink,
          getAllProjectSummaries,
          getProjectSummaryByLink,
          getInProgressProjectSummaries
     }
}

export default projectsServices
