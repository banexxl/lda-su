import { TeamMember } from './team-member';

export type ActivityCategoryProps = {
  label: string;
  path: string;
};


export type ActivityStatusProps = 'completed' | 'in-progress' | 'to-do'

export type Activity = {
  _id: string;
  activityURL: string;
  title: string;
  subTitle1: string;
  subTitle2: string;
  subTitle3: string;
  heroUrl: string;
  publishedDate: Date;
  fromDate: Date;
  toDate: Date;
  category: string;
  coverUrl: string;
  // favorited: boolean;
  // favoritedNumber: number;
  description1: string;
  description2: string;
  description3: string;
  description4: string;
  description5: string;
  author: TeamMember;
  status: ActivityStatusProps;
};
