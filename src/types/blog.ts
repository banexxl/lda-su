import { TeamMember } from './team-member';

export type BlogCategoryProps = {
  label: string;
  path: string;
};

export type Blog = {
  id: string;
  title: string;
  heroUrl: string;
  tags?: string[];
  createdAt: Date;
  category: string;
  coverUrl: string;
  favorited: boolean;
  description: string;
  author: TeamMember;
};
