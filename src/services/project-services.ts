import { supabase } from "src/lib/supabase";
import { Project } from "src/types/project";
import { ProjectSummary } from "src/types/projectSummary";
import { Publication } from "src/types/publication";

const mapPublication = (row: any): Publication => ({
     _id: row.id,
     publicationTitle: row.publication_title,
     publicationURL: row.publication_url,
     publicationImageURL: row.publication_image_url,
});

const mapProjectSummary = (row: any): ProjectSummary => {
     const entries = [...(row.project_summary_entries ?? [])].sort(
          (a: any, b: any) => a.sort_order - b.sort_order
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
          projectSummaryDescriptions: entries.map((e) => e.description),
          projectSummarySubtitles: entries.map((e) => e.subtitle),
          projectSummarySubtitleURLs: entries.map((e) => e.subtitle_url),
          projectSummaryDateTime: entries.map((e) => e.entry_date_time),
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

     const getAllPublications = async () => {
          const { data, error } = await supabase
               .from('publications')
               .select('*')
               .order('publication_uploaded_date_time', { ascending: false });

          if (error) {
               return [];
          }
          return (data ?? []).map(mapPublication);
     };

     const getAllProjectSummaries = async () => {
          const { data, error } = await supabase
               .from('project_summaries')
               .select('*, project_summary_entries(*)')
               .eq('locale', 'sr')
               .order('project_end_date_time', { ascending: false });

          if (error) {
               return [];
          }
          return (data ?? []).map(mapProjectSummary);
     };

     const getInProgressProjectSummaries = async () => {
          const { data, error } = await supabase
               .from('project_summaries')
               .select('*, project_summary_entries(*)')
               .eq('locale', 'sr')
               .eq('status', 'in-progress')
               .order('project_end_date_time', { ascending: false });

          if (error) {
               return [];
          }
          return (data ?? []).map(mapProjectSummary);
     };

     const getCompletedProjectSummaries = async () => {
          const { data, error } = await supabase
               .from('project_summaries')
               .select('*, project_summary_entries(*)')
               .eq('locale', 'sr')
               .eq('status', 'completed')
               .order('project_end_date_time', { ascending: false });

          if (error) {
               return [];
          }
          return (data ?? []).map(mapProjectSummary);
     };

     const getRandomCompletedProjectSummaries = async () => {
          const { data, error } = await supabase
               .from('project_summaries')
               .select('*, project_summary_entries(*)')
               .eq('locale', 'sr')
               .eq('status', 'completed');

          if (error) {
               return [];
          }
          return shuffle(data ?? []).slice(0, 5).map(mapProjectSummary);
     };

     const getProjectSummaryByLink = async (link: string): Promise<ProjectSummary | undefined> => {
          const { data, error } = await supabase
               .from('project_summaries')
               .select('*, project_summary_entries(*)')
               .eq('locale', 'sr')
               .eq('project_summary_url', link)
               .maybeSingle();

          if (error || !data) {
               if (error) console.log({ message: error.message });
               return undefined;
          }
          return mapProjectSummary(data);
     };

     const getAllProjects = async () => {
          const { data, error } = await supabase
               .from('project_activities')
               .select('*, project_summaries(project_summary_url)')
               .eq('locale', 'sr');

          if (error) {
               return [];
          }
          return (data ?? []).map(mapProject);
     };

     const getProjectByLink = async (projectURL: string): Promise<Project | undefined> => {
          const { data, error } = await supabase
               .from('project_activities')
               .select('*, project_summaries(project_summary_url)')
               .eq('locale', 'sr')
               .eq('project_url', projectURL)
               .maybeSingle();

          if (error || !data) {
               if (error) console.log({ message: error.message });
               return undefined;
          }
          return mapProject(data);
     };

     const getSearchTermResults = async (searchTerm: string) => {
          const { data, error } = await supabase
               .from('project_activities')
               .select('*, project_summaries(project_summary_url)')
               .eq('locale', 'sr')
               .ilike('sub_title', `%${searchTerm}%`)
               .limit(5);

          if (error) {
               return [];
          }
          return (data ?? []).map(mapProject);
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
