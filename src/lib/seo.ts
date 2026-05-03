import type { Metadata } from 'next';

type SeoImage = {
     url: string;
     width?: number;
     height?: number;
     alt?: string;
};

type SeoOpenGraph = {
     title?: string;
     description?: string;
     url?: string;
     images?: SeoImage[];
};

type SeoTwitter = {
     card?: 'summary' | 'summary_large_image';
     title?: string;
     description?: string;
     images?: string[];
};

type SeoRobots = {
     index?: boolean;
     follow?: boolean;
};

export type SeoInput = {
     title?: string;
     description?: string;
     keywords?: string[];
     path?: string;
     canonicalUrl?: string;
     openGraph?: SeoOpenGraph;
     twitter?: SeoTwitter;
     robots?: SeoRobots;
};

const resolveSiteUrl = () => {
     if (process.env.NEXT_PUBLIC_SITE_URL) {
          return process.env.NEXT_PUBLIC_SITE_URL;
     }

     if (process.env.VERCEL_URL) {
          return `https://${process.env.VERCEL_URL}`;
     }

     return 'http://localhost:3000';
};

export const seoConfig = {
     siteName: 'LDA Subotica',
     defaultTitle: 'LDA Subotica',
     titleTemplate: '%s | LDA Subotica',
     description:
          'LDA Subotica predstavlja projekte, aktivnosti, publikacije i inicijative usmerene na lokalnu demokratiju, gradjansko ucesce i razvoj zajednice.',
     siteUrl: resolveSiteUrl(),
     defaultOgImage: '/assets/images/seo-cover.jpg',
     keywords: [
          'LDA Subotica',
          'lokalna demokratija',
          'civilno drustvo',
          'projekti',
          'aktivnosti',
          'publikacije',
          'Subotica',
     ],
     robots: {
          index: true,
          follow: true,
     },
};

const uniqueKeywords = (keywords: string[]) => Array.from(new Set(keywords.filter(Boolean)));

export const getAbsoluteUrl = (path = '/') => new URL(path, seoConfig.siteUrl).toString();

const resolveSeoTitle = (title?: string) => {
     if (!title || title === seoConfig.defaultTitle) {
          return seoConfig.defaultTitle;
     }

     return `${title} | ${seoConfig.siteName}`;
};

const resolveImages = (images?: SeoImage[]) => {
     const source = images && images.length > 0
          ? images
          : [{ url: seoConfig.defaultOgImage, width: 1200, height: 630, alt: seoConfig.siteName }];

     return source.map((image) => ({
          ...image,
          url: image.url.startsWith('http') ? image.url : getAbsoluteUrl(image.url),
     }));
};

export const generateSeoMetadata = (input: SeoInput = {}): Metadata => {
     const title = input.title ?? seoConfig.defaultTitle;
     const description = input.description ?? seoConfig.description;
     const canonical = input.canonicalUrl ?? getAbsoluteUrl(input.path ?? '/');
     const openGraphImages = resolveImages(input.openGraph?.images);
     const twitterImages = (input.twitter?.images && input.twitter.images.length > 0
          ? input.twitter.images
          : openGraphImages.map((image) => image.url)
     ).map((image) => (image.startsWith('http') ? image : getAbsoluteUrl(image)));

     return {
          title,
          description,
          keywords: uniqueKeywords([...seoConfig.keywords, ...(input.keywords ?? [])]),
          alternates: {
               canonical,
          },
          openGraph: {
               type: 'website',
               locale: 'sr_RS',
               siteName: seoConfig.siteName,
               title: input.openGraph?.title ?? resolveSeoTitle(title),
               description: input.openGraph?.description ?? description,
               url: input.openGraph?.url ?? canonical,
               images: openGraphImages,
          },
          twitter: {
               card: input.twitter?.card ?? 'summary_large_image',
               title: input.twitter?.title ?? resolveSeoTitle(title),
               description: input.twitter?.description ?? description,
               images: twitterImages,
          },
          robots: {
               index: input.robots?.index ?? seoConfig.robots.index,
               follow: input.robots?.follow ?? seoConfig.robots.follow,
          },
     };
};

export const defaultMetadata: Metadata = {
     metadataBase: new URL(seoConfig.siteUrl),
     applicationName: seoConfig.siteName,
     title: {
          default: seoConfig.defaultTitle,
          template: seoConfig.titleTemplate,
     },
     description: seoConfig.description,
     keywords: seoConfig.keywords,
     alternates: {
          canonical: '/',
     },
     openGraph: {
          type: 'website',
          locale: 'sr_RS',
          siteName: seoConfig.siteName,
          title: seoConfig.defaultTitle,
          description: seoConfig.description,
          url: seoConfig.siteUrl,
          images: resolveImages(),
     },
     twitter: {
          card: 'summary_large_image',
          title: seoConfig.defaultTitle,
          description: seoConfig.description,
          images: resolveImages().map((image) => image.url),
     },
     robots: seoConfig.robots,
     icons: {
          icon: '/favicon.ico',
     },
};