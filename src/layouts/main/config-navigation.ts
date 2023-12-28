import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const aldaLinks = [
  {
    order: '6',
    subheader: 'ALDA',
    cover: '/assets/images/menu/menu_alda.jpg',
    items: [
      { title: 'ALDA', path: paths.alda.alda },
      { title: 'LDA Knjaževac', path: paths.alda.ldaKnjazevac },
      { title: 'LDA MOstar', path: paths.alda.ldaMostar },
      { title: 'LDA Zavidovići', path: paths.alda.ldaZavidovici },
      { title: 'LDA Prijedor', path: paths.alda.ldaPrijedor },
      { title: 'LDA Sisak', path: paths.alda.ldaSisak },
      { title: 'LDA Osijek', path: paths.alda.ldaCSS },
      { title: 'LDA Brtobigla/Verteneglio', path: paths.alda.ldaBrtobiglaverteneglio },
      { title: 'LDA Kosovo', path: paths.alda.ldaKosovo },
      { title: 'LDA Nikšić', path: paths.alda.ldaNiksic },
      { title: 'LDA Gruzija', path: paths.alda.ldaGeorgia },
      { title: 'LDA Armenia', path: paths.alda.ldaArmenia },
      { title: 'LDA Dnjepropetrovsk', path: paths.alda.ldaDnjepropetrovsk },
      { title: 'LDA Albania', path: paths.alda.ldaAlbania },
    ],
  }
];

export const europaLinks = [
  {
    order: '6',
    subheader: 'Europe',
    cover: '/assets/images/menu/menu_alda.jpg',
    items: [
      { title: 'Council of Europe', path: paths.europe.councilOfEurope },
      { title: 'Europa', path: paths.europe.europa },
      { title: 'European Commission', path: paths.europe.europeanComission },
      { title: 'EU Delegation to Serbia', path: paths.europe.europeanComission },
      { title: 'Wolverhampton', path: paths.europe.wolverhampton },
    ],
  }
];

export const suboticaLinks = [
  {
    order: '6',
    subheader: 'Subotica',
    cover: '/assets/images/menu/menu_alda.jpg',
    items: [
      { title: 'Subotica.rs', path: paths.subotica.suRS },
      { title: 'Subotica.info', path: paths.subotica.suInfo },
      { title: 'Subotica.com', path: paths.subotica.suCOM },
    ],
  }
];

export const navConfig = [
  { title: 'Naslovna', path: paths.home },
  {
    title: 'O nama',
    path: '/o-nama',
    children: [
      {
        // subheader: 'Subheader 1',
        isNew: true,
        // cover: 'image.jpg',
        items: [
          { title: 'Stanka', path: paths.stanka },
          { title: 'Silvija', path: paths.silvija },
          { title: 'Boris', path: paths.boris },
        ],
      },
    ],
  },
  {
    title: 'Projekti',
    path: '/projekti',
    children: [
      {
        // subheader: 'Subheader 1',
        isNew: true,
        // cover: 'image.jpg',
        items: [
          { title: 'Svi projekti', path: paths.allProjects },
          { title: 'Završeni projekti', path: paths.pastProjects },
          { title: 'Projekti u toku', path: paths.currentProjects },
        ],
      },
    ],
  },
  {
    title: 'Aktivnosti',
    path: '/aktivnosti',
    children: [
      {
        // subheader: 'Subheader 1',
        isNew: true,
        // cover: 'image.jpg',
        items: [
          { title: 'ALDA', path: paths.activitiesALDA },
          { title: 'LDA', path: paths.activitiesLDA },
        ],
      },
    ],
  },
  {
    title: 'Publikacije',
    path: '/publikacije',
  },
];
