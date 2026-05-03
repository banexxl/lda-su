import type { Metadata } from 'next';

export type SeoProps = {
     title: string;
     description: string;
     path?: string;
     keywords?: string[];
     image?: string;
     noIndex?: boolean;
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

export const siteConfig = {
     name: 'LDA Subotica',
     description:
          'LDA Subotica predstavlja projekte, aktivnosti, publikacije i inicijative usmerene na lokalnu demokratiju, gradjansko ucesce i razvoj zajednice.',
     siteUrl: resolveSiteUrl(),
     defaultImage: '/assets/images/seo-cover.jpg',
     keywords: [
          'LDA Subotica',
          'lokalna demokratija',
          'civilno drustvo',
          'projekti',
          'aktivnosti',
          'publikacije',
          'Subotica',
     ],
};

const toAbsoluteUrl = (path: string) => new URL(path, siteConfig.siteUrl).toString();

export const buildSeoMetadata = ({
     title,
     description,
     path = '/',
     keywords = [],
     image = siteConfig.defaultImage,
     noIndex = false,
}: SeoProps): Metadata => {
     const canonicalUrl = toAbsoluteUrl(path);
     const imageUrl = toAbsoluteUrl(image);

     return {
          title,
          description,
          keywords: [...siteConfig.keywords, ...keywords],
          alternates: {
               canonical: canonicalUrl,
          },
          openGraph: {
               title,
               description,
               url: canonicalUrl,
               siteName: siteConfig.name,
               locale: 'sr_RS',
               type: 'website',
               images: [
                    {
                         url: imageUrl,
                         width: 1200,
                         height: 630,
                         alt: title,
                    },
               ],
          },
          twitter: {
               card: 'summary_large_image',
               title,
               description,
               images: [imageUrl],
          },
          robots: noIndex
               ? {
                    index: false,
                    follow: false,
               }
               : {
                    index: true,
                    follow: true,
               },
          icons: {
               icon: '/favicon.ico',
          },
     };
};