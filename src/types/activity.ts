export type ActivityCategoryProps = {
  label: string;
  path: string;
};


export type ActivityStatusProps = 'completed' | 'in-progress' | 'to-do'

export type Activity = {
  _id: string;
  activityURL: string;
  title: string;
  gallery: string[];
  coverURL: string;
  links: string[];
  publishedDate: Date;
  category: string;
  favorited: boolean;
  favoritedNumber: number;
  descriptions: string;
  author: string;
  status: ActivityStatusProps;
  list: string[];
  listTitle: string;
  publications?: string[];
  quillEditorData: string;
};
