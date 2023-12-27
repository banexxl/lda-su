import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const pageLinks = [
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
    path: paths.aboutUs,
    children: [
      {
        title: 'Tim',
        path: '#',
        children: [
          { title: 'Stanka', path: paths.stanka },
          { title: 'Silvija', path: paths.silvija },
          { title: 'Boris', path: paths.boris },
        ],
      },
      { title: 'Dokumenti', path: paths.docs },
      { title: 'Kontakt', path: paths.contact },
    ],
  },
  {
    title: 'Projekti',
    path: '#',
    children: [
      { title: 'Svi projekti', path: paths.allProjects },
      { title: 'Završeni projekti', path: paths.pastProjects },
      { title: 'Projekti u toku', path: paths.currentProjects }
      // children: [
      //   { title: 'Pregled i analiza lokalne prakse u opštinama Bačka Topola, Kanjiža, Subotica, Ruma,Sombor', path: '/projects/pregled-i-analiza-lokalne-prakse-u-opstinama-subotica-backa-topola-kanjiza-ruma-sombor' },
      //   { title: 'Regionalna platforma za učešće i dijalog mladih', path: '/projects/regionalna-platforma-za-ucesce-i-dijalog-mladih' },
      //   { title: 'Lokalni građanski monitor Local Civic Monitor', path: '/projects/lokalni-gradjanski-monitor' },
      //   { title: 'CLINK Kulturno nasleđe', path: '/projects/clink-kulturno-nasledje' },
      //   { title: 'Balkan Kaleidoskop', path: '/projects/balkan-kaledioskop' },
      //   { title: 'New Intercultural Concept', path: '/projects/novi-interkulturalni-koncept' },
      //   { title: 'Svako je dugme važno', path: '/projects/svako-je-dugme-vazno' },
      //   { title: 'Mreža za razvoj Subotice', path: '/projects/mreza-za-razvoj-subotice' },
      //   { title: 'Balkan Compact', path: '/projects/balkan-koncept' },
      //   { title: 'snet.eu', path: '/projects/snet-eu' },
      //   { title: 'Lokalne koalicije za razvoj zajenice', path: '/projects/lokalne-koalicije-za-razvoj-zajenice' },
      //   { title: 'Vojvođanska inicijativa za eu', path: '/projects/vojvodjanska-inicijativa-za-eu' },
      //   { title: 'Radim li dostojanstveno', path: '/projects/radimo-li-dostojanstveno' },
      //   { title: 'Regionalna partnerstva za gradove', path: '/projects/regionalna-partnerstva-za-gradove' },
      //   { title: 'Evropske i naše teme', path: '/projects/evropske-i-nase-teme' },
      //   { title: 'Mikrokredit', path: '/projects/mikrokredit' },
      //   { title: 'Townlab MEET', path: '/projects/townlab-meet' },
      //   { title: 'Mladi su zakon', path: '/projects/mladi-su-zakon' },
      //   { title: 'Lokalne koalicije za eu integracije', path: '/projects/lokalne-koalicije-za-eu-integracije' },
      //   { title: 'Lokalne koalicije za toleranciju', path: '/projects/lokalne-koalicije-za-toleranciju' },
      //   { title: 'Vesti', path: '/projects/regionalna-partnerstva-za-gradove/vesti' },
      //   { title: 'Mostar', path: '/projects/regionalna-partnerstva-za-gradove/mostar' },
      //   { title: 'Wolverhampton', path: '/projects/regionalna-partnerstva-za-gradove/wolverhampton' },
      //   { title: 'Duzijanca', path: '/projects/regionalna-partnerstva-za-gradove/duzijanca' },
      // ],
    ]

  },

  {
    title: 'Aktivnosti',
    path: '#',
    children: [
      { title: 'ALDA', path: '/aktivnosti/alda' },
      {
        title: 'EU kutak',
        path: '#',
        children: [
          { title: 'Dan Evrope - 9.maj', path: '/aktivnosti/au-kutak/dan-evrope' },
          { title: 'Eu info point', path: '/aktivnosti/eu-kutak/eu-info-point' },
        ],
      },
      { title: 'Vojvodjanska inicijativa za EU', path: '/aktivnosti/vojvodjanska-inicijativa-za-eu' },
      {
        title: 'Gradovi interkulturalnosti',
        path: '#',
        children: [
          { title: 'Vesti', path: '/aktivnosti/gradovi-interkulturalnosti/vesti' },
        ],
      },
      { title: 'Regionalna platforma za učešće i dijalog mladih', path: '/aktivnosti/regionalna-platforma-za-ucesce-i-dijalog-mladih' },
      {
        title: 'Mladi',
        path: '#',
        children: [
          { title: 'Volontiranje u Subotici', path: '/aktivnosti/mladi/volontiranje-u-subotici' },
          { title: 'Volontiranje u inostranstvu', path: '/aktivnosti/mladi/volontiranje-u-inostranstvu' },
          { title: 'Dešavanja', path: '/aktvnosti/mladi/desavanja' },
          { title: 'Šta je Volonterizam?', path: '/aktivnosti/mladi/sta-je-volonterizam' }
        ],
      },
      { title: 'Programi lokalnih partnera', path: '/docs' },
      { title: 'Lokalne koalicije za razvoj zajednice', path: '/docs' },
      { title: 'Mreža za razvoj Subotice', path: '/docs' },
    ],
  },
  {
    title: 'Publikacije',
    path: '#',
    children: [
      { title: 'ALDA', path: '/publikacije/alda' },
      { title: 'LDA', path: '/publikacije/lda' },
    ],
  },
];
