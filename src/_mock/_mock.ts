import { sub } from 'date-fns';

import {
  _id,
  _ratings,
  _tourNames,
} from './assets';

// ----------------------------------------------------------------------

export const _mock = {
  id: (index: number) => _id[index],
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  tourName: (index: number) => _tourNames[index],
  number: {
    rating: (index: number) => _ratings[index],
  },
  // Image
  image: {
    cover: (index: number) => `/assets/images/cover/cover_${index + 1}.jpg`,
    avatar: (index: number) => `/assets/images/avatar/avatar_${index + 1}.jpg`,
    travel: (index: number) => `/assets/images/travel/travel_${index + 1}.jpg`,
    company: (index: number) => `/assets/images/company/company_${index + 1}.png`,
    product: (index: number) => `/assets/images/z_product/product_${index + 1}.png`,
    portrait: (index: number) => `/assets/images/portrait/portrait_${index + 1}.jpg`,
    career: (index: number) => `/assets/images/career/career_${index + 1}.jpg`,
    marketing: (index: number) => `/assets/images/marketing/marketing_${index + 1}.jpg`,
    course: (index: number) => `/assets/images/course/course_${index + 1}.jpg`,
  },
  video: (index: number) =>
    [
      `https://www.dropbox.com/s/odzycivuo9cy5rg/video_01.mp4?dl=0`,
      `https://www.dropbox.com/s/7cx04n8rr4w5rbg/video_02.mp4?dl=0`,
    ][index],
};
