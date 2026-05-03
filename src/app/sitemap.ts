import type { MetadataRoute } from 'next';
import { profilesData } from 'src/_mock/profile-data';
import { siteConfig } from 'src/utils/seo';
import activityServices from 'src/services/activities-services';
import projectsServices from 'src/services/project-services';

const toAbsoluteUrl = (path: string) => new URL(path, siteConfig.siteUrl).toString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
     const [activities, projects, projectSummaries] = await Promise.all([
          activityServices().getAllActivities(),
          projectsServices().getAllProjects(),
          projectsServices().getAllProjectSummaries(),
     ]);

     const staticRoutes: MetadataRoute.Sitemap = [
          { url: toAbsoluteUrl('/'), lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
          { url: toAbsoluteUrl('/o-nama'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
          { url: toAbsoluteUrl('/kontakt'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
          { url: toAbsoluteUrl('/postavi-pitanje'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
          { url: toAbsoluteUrl('/publikacije'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
          { url: toAbsoluteUrl('/podrska'), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
          { url: toAbsoluteUrl('/projekti/u-toku'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
          { url: toAbsoluteUrl('/projekti/zavrseni'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
          { url: toAbsoluteUrl('/aktivnosti/u-toku'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
          { url: toAbsoluteUrl('/aktivnosti/arhiva'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
          { url: toAbsoluteUrl('/pretraga'), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
     ];

     const categoryRoutes: MetadataRoute.Sitemap = Array.from(new Set((activities ?? []).map((activity) => activity.category)))
          .filter(Boolean)
          .map((category) => ({
               url: toAbsoluteUrl(`/aktivnosti/${category}`),
               lastModified: new Date(),
               changeFrequency: 'weekly',
               priority: 0.7,
          }));

     const activityRoutes: MetadataRoute.Sitemap = (activities ?? []).map((activity) => ({
          url: toAbsoluteUrl(`/aktivnost/${activity.activityURL}`),
          lastModified: activity.publishedDate ? new Date(activity.publishedDate) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
     }));

     const projectRoutes: MetadataRoute.Sitemap = (projects ?? []).map((project) => ({
          url: toAbsoluteUrl(`/projektna-aktivnost/${project.projectURL}`),
          lastModified: project.published ? new Date(project.published) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
     }));

     const projectSummaryRoutes: MetadataRoute.Sitemap = (projectSummaries ?? []).map((projectSummary) => ({
          url: toAbsoluteUrl(`/pregled-projekta/${projectSummary.projectSummaryURL}`),
          lastModified: projectSummary.projectEndDateTime ? new Date(projectSummary.projectEndDateTime) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
     }));

     const profileRoutes: MetadataRoute.Sitemap = profilesData.map((profile) => ({
          url: toAbsoluteUrl(`/profil/${profile.id}`),
          lastModified: new Date(),
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