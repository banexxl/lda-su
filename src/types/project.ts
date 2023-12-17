import { IAuthorProps } from './author';
import { ISocialLinks } from './socials';

// ----------------------------------------------------------------------

export type Project = {
  id: string;
  title: string;
  subTitle: string[],
  description: string[];
  projectType: string;
  createdAt: string;
  coverUrl: string;
  gallery: string[];
  location: string;
  duration: string;
  timeBetween: {
    start: Date;
    end: Date;
  };
  favorited: boolean;
  favoritedNumber: number;
  languages: string[];
  organizers: IAuthorProps[];
  shareLinks: ISocialLinks;
};
