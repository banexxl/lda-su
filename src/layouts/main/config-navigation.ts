import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

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
  { title: 'Naslovna', path: paths.home },
  {
    title: 'O nama',
    path: '#',
    children: [
      {
        title: 'Tim',
        path: '#',
        children: [
          { title: 'Stanka', path: '/about-us/team/stanka' },
          { title: 'Silvija', path: '/about-us/team/silvija' },
          { title: 'Boris', path: '/about-us/team/boris' },
        ],
      },
      { title: 'Docs', path: '/about-us/docs' },
    ],
  },
  {
    title: 'Projekti',
    path: '#',
    children: [
      { title: 'Regionalna platforma za učešće i dijalog mladih', path: '/projects/regionalna-platforma-za-ucesce-i-dijalog-mladih' },
      { title: 'Lokalni građanski monitor Local Civic Monitor', path: '/projects/lokalni-gradjanski-monitor' },
      { title: 'CLINK Kulturno nasleđe', path: '/projects/clink-kulturno-nasledje' },
      { title: 'Balkan Kaleidoskop', path: '/projects/balkan-kaledioskop' },
      { title: 'New Intercultural Concept', path: '/projects/novi-interkulturalni-koncept' },
      { title: 'Svako je dugme važno', path: '/projects/svako-je-dugme-vazno' },
      { title: 'Mreža za razvoj Subotice', path: '/projects/mreza-za-razvoj-subotice' },
      { title: 'Balkan Compact', path: '/projects/balkan-koncept' },
      {
        title: 'Završeni projekti',
        path: '/projects/zavrseni-projekti',
        children: [
          { title: 'SNET.EU', path: '/projects/zavrseni-projekti/snet-eu' },
          { title: 'LOKALNE KOALICIJE ZA RAZVOJ ZAJEDNICE', path: '/projects/zavrseni-projekti/lokalne-koalicije-za-razvoj-zajenice' },
          { title: 'VOJVOĐANSKA INICIJATIVA ZA EU', path: '/projects/zavrseni-projekti/vojvodjanska-inicijativa-za-eu' },
          { title: 'RADIMO LI DOSTOJANSTVENO', path: '/projects/zavrseni-projekti/radimo-li-dostojanstveno' },
          {
            title: 'Regionalna partnerstva za gradove',
            path: '/projects/zavrseni-projekti/regionalna-partnerstva-za-gradove',
            children: [
              { title: 'O projektu', path: '/projects/zavrseni-projekti/regionalna-partnerstva-za-gradove/o-projektu' },
              { title: 'Vesti', path: '/projects/zavrseni-projekti/regionalna-partnerstva-za-gradove/vesti' },
              { title: 'Mostar', path: '/projects/zavrseni-projekti/regionalna-partnerstva-za-gradove/mostar' },
              { title: 'Wolverhampton', path: '/projects/zavrseni-projekti/regionalna-partnerstva-za-gradove/wolverhampton' },
              { title: 'Duzijanca', path: '/projects/zavrseni-projekti/regionalna-partnerstva-za-gradove/duzijanca' },
            ]
          },
          { title: 'Evropske i naše teme', path: '/projects/zavrseni-projekti/evropske-i-nase-teme' },
          {
            title: 'Mikrokredit',
            path: '/projects/zavrseni-projekti/mikrokredit',
            children: [
              { title: 'Vesti', path: '/projects/zavrseni-projekti/mikrokredit/vesti' },
              { title: 'Uslovi', path: '/projects/zavrseni-projekti/mikrokredit/uslovi' }
            ]
          },
          { title: 'Lokalne koalicije za eu integracije', path: '/projects/zavrseni-projekti/lokalne-koalicije-za-eu-integracije' },
          {
            title: 'Lokalne koalicije za toleranciju',
            path: '/projects/zavrseni-projekti/lokalne-koalicije-za-toleranciju',
            children: [
              { title: 'O projektu', path: '/projects/zavrseni-projekti/lokalne-koalicije-za-toleranciju/o-projektu' },
              { title: 'Aktivnosti', path: '/projects/zavrseni-projekti/lokalne-koalicije-za-toleranciju/aktivnosti' }
            ]
          },
          { title: 'Mladi su zakon', path: '/projects/zavrseni-projekti/mladi-su-zakon' },
        ],
      },
      { title: 'Townlab MEET', path: '/projects/townlab-meet' },
    ],
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
      { title: 'Programi lokalnih partnera', path: '/about-us/docs' },
      { title: 'Lokalne koalicije za razvoj zajednice', path: '/about-us/docs' },
      { title: 'Mreža za razvoj Subotice', path: '/about-us/docs' },
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
