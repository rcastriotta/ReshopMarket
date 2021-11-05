import { ILFlag } from '@components/icons/language/ILFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { CNFlag } from '@components/icons/language/CNFlag';
import { USFlag } from '@components/icons/language/USFlag';
import { DEFlag } from '@components/icons/language/DEFlag';
import { ESFlag } from '@components/icons/language/ESFlag';

export const siteSettings = {
  name: 'ReshopMarket',
  description: 'Markeplace for new and used items',
  author: {
    name: 'Storebor, Inc.',
    websiteUrl: 'https://storebor.com',
    address: '',
  },
  logo: {
    url: '/assets/images/logo.svg',
    alt: 'BoroBazar',
    href: '/',
    width: 128,
    height: 30,
  },
  defaultLanguage: 'en',
  currencyCode: 'USD',
  site_header: {
    menu: [
      {
        id: 1,
        path: '/search?category=3',
        label: 'Top Brands',
        subMenu: [
          {
            id: 1,
            path: '/search?brand=4578',
            label: 'Nike',
          },
          {
            id: 2,
            path: '/search?brand=54',
            label: 'Adidas',
          },
          {
            id: 3,
            path: '/search?brand=9318',
            label: 'Lululemon Athletica',
          },
          {
            id: 4,
            path: '/search?brand=319',
            label: 'Apple',
          },
          {
            id: 5,
            path: '/search?brand=3908',
            label: 'Louis Vuitton',
          },
          {
            id: 6,
            path: '/search?brand=3476',
            label: 'Kate Spade',
          },
          {
            id: 7,
            path: '/search?brand=1400',
            label: 'Coach',
          },
          {
            id: 8,
            path: '/search?brand=4591',
            label: 'Nintendo',
          },
          {
            id: 9,
            path: '/search?brand=7190',
            label: 'Rae Dunn',
          },
          {
            id: 10,
            path: '/search?brand=4239',
            label: 'Michael Kors',
          },
        ],
      },
      {
        id: 2,
        path: '/search?category=1',
        label: 'Women',
      },
      {
        id: 3,
        path: '/search?category=2',
        label: 'Men',
      },
      {
        id: 4,
        path: '/search?category=3',
        label: 'Kids',
      },
      {
        id: 5,
        path: '/search?category=7',
        label: 'Electronics',
      },
      {
        id: 6,
        path: '/search?category=1611',
        label: 'Toys',
      },
      {
        id: 7,
        path: '/search?category=6',
        label: 'Beauty',
      },
      {
        id: 8,
        path: '/search?category=8',
        label: 'Sports & Outdoor',
      },
    ],
    languageMenu: [
      {
        id: 'ar',
        name: 'عربى - AR',
        value: 'ar',
        icon: <SAFlag />,
      },
      {
        id: 'zh',
        name: '中国人 - ZH',
        value: 'zh',
        icon: <CNFlag />,
      },
      {
        id: 'en',
        name: 'English - EN',
        value: 'en',
        icon: <USFlag />,
      },
      {
        id: 'de',
        name: 'Deutsch - DE',
        value: 'de',
        icon: <DEFlag />,
      },
      {
        id: 'he',
        name: 'rעברית - HE',
        value: 'he',
        icon: <ILFlag />,
      },
      {
        id: 'es',
        name: 'Español - ES',
        value: 'es',
        icon: <ESFlag />,
      },
    ],
  },
};
