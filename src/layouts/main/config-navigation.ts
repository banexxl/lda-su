import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const aboutUsLinks = [
  {
    order: '1',
    subheader: 'Team',
    cover: 'https://lda-su.s3.eu-central-1.amazonaws.com/Untitled.png',
    items: [
      { title: 'Stanka', path: paths.teamMembers.stanka },
      { title: 'Silvija', path: paths.teamMembers.silvija },
      { title: 'Boris', path: paths.teamMembers.boris },
    ],
  },
]

export const pageLinks = [
  {
    order: '6',
    subheader: 'Travel',
    cover: '/assets/images/menu/menu_travel.jpg',
    items: [
      { title: 'Landing', path: paths.travel.root },
      { title: 'Tours', path: paths.travel.tours },
      { title: 'Tour', path: paths.travel.tour },
      { title: 'Checkout', path: paths.travel.checkout },
      { title: 'Order Completed', path: paths.travel.orderCompleted },
      { title: 'Blog Posts', path: paths.travel.posts },
      { title: 'Blog Post', path: paths.travel.post },
      { title: 'About', path: paths.travel.about },
      { title: 'Contact', path: paths.travel.contact },
    ],
  }
];


export const navConfig = [
  { title: 'Home', path: '/' },
  {
    title: 'About Us',
    path: paths.aboutUs,
    children: [aboutUsLinks[0]]
  }
];
