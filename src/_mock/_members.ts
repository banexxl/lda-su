import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const _members = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  photo: `/assets/images/portrait/portrait_${index + 1}.jpg`,
  socialLinks: {
    facebook: `facebook/aaa`,
    instagram: `instagram/aaa`,
    linkedin: `linkedin/aaa`,
    twitter: `twitter/aaa`,
  },
}));
