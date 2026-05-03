import type { MetadataRoute } from 'next';
import { profilesData } from 'src/_mock/profile-data';
import { getAbsoluteUrl, seoConfig } from 'src/lib/seo';
import activityServices from 'src/services/activities-services';
import projectsServices from 'src/services/project-services';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
     const [activities, projects, projectSummaries] = await Promise.all([
          activityServices().getAllActivities(),
          projectsServices().getAllProjects(),
          projectsServices().getAllProjectSummaries(),
     ]);

     const lastModified = new Date();

     const staticRoutes: MetadataRoute.Sitemap = [
          { url: getAbsoluteUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
          { url: getAbsoluteUrl('/o-nama'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
          { url: getAbsoluteUrl('/kontakt'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
          { url: getAbsoluteUrl('/postavi-pitanje'), lastModified, changeFrequency: 'weekly', priority: 0.8 },
          { url: getAbsoluteUrl('/publikacije'), lastModified, changeFrequency: 'weekly', priority: 0.75 },
          { url: getAbsoluteUrl('/podrska'), lastModified, changeFrequency: 'monthly', priority: 0.7 },
          { url: getAbsoluteUrl('/projekti/u-toku'), lastModified, changeFrequency: 'weekly', priority: 0.75 },
          { url: getAbsoluteUrl('/projekti/zavrseni'), lastModified, changeFrequency: 'weekly', priority: 0.75 },
          { url: getAbsoluteUrl('/aktivnosti/u-toku'), lastModified, changeFrequency: 'weekly', priority: 0.75 },
          { url: getAbsoluteUrl('/aktivnosti/arhiva'), lastModified, changeFrequency: 'weekly', priority: 0.75 },
          { url: getAbsoluteUrl('/pretraga'), lastModified, changeFrequency: 'weekly', priority: 0.6 },
     ];

     const categoryRoutes: MetadataRoute.Sitemap = Array.from(new Set((activities ?? []).map((activity) => activity.category)))
          .filter(Boolean)
          .map((category) => ({
               url: getAbsoluteUrl(`/aktivnosti/${category}`),
               lastModified,
               changeFrequency: 'weekly',
               priority: 0.7,
          }));

     const activityRoutes: MetadataRoute.Sitemap = (activities ?? []).map((activity) => ({
          url: getAbsoluteUrl(`/aktivnost/${activity.activityURL}`),
          lastModified: activity.publishedDate ? new Date(activity.publishedDate) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
     }));

     const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map((project) => ({
          url: getAbsoluteUrl(`/projektna-aktivnost/${project.projectURL}`),
          lastModified: project.published ? new Date(project.published) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
     }));

     const projectSummaryRoutes: MetadataRoute.Sitemap = (projectSummaries ?? []).map((projectSummary) => ({
          url: getAbsoluteUrl(`/pregled-projekta/${projectSummary.projectSummaryURL}`),
          lastModified: projectSummary.projectEndDateTime ? new Date(projectSummary.projectEndDateTime) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
     }));

     const profileRoutes: MetadataRoute.Sitemap = profilesData.map((profile) => ({
          url: getAbsoluteUrl(`/profil/${profile.id}`),
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.65,
     }));

     return [
          ...staticRoutes,
          ...categoryRoutes,
          ...activityRoutes,
          ...projectRoutes,
          ...projectSummaryRoutes,
          ...profileRoutes,
     ];
}