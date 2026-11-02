/** Default Site Settings, Navigation, Ad Settings and Live Stream entries. */

const social = {
  facebook: 'https://www.facebook.com/multiplynews',
  facebookReels: 'https://www.facebook.com/multiplynews/reels/',
  messenger: 'https://m.me/multiplynews',
  youtube: 'https://www.youtube.com/@Multiply_News',
  youtubeSubscribe: 'https://www.youtube.com/@Multiply_News?sub_confirmation=1',
  youtubeVideos: 'https://www.youtube.com/@Multiply_News/videos',
  youtubeShorts: 'https://www.youtube.com/@Multiply_News/shorts',
  youtubeLive: 'https://www.youtube.com/@Multiply_News/streams',
  instagram: 'https://www.instagram.com/multiply_news/',
};

export const SOCIAL_LINKS = social;

export const SITE_SETTINGS = {
  siteName: 'Multiply News',
  tagline: 'Consumer news portal, Bangladesh',
  description:
    'Consumer-focused news portal from Bangladesh: consumer rights, market watch and enforcement drives.',
  instagramHandle: '@multiply_news',
  contact: {
    addressLines: '383 Moghbazar, Razzak Plaza\nDhaka 1217, Bangladesh',
    phoneDisplay: '01315-668822',
    phoneE164: '+8801315668822',
  },
  social,
  copyrightText: 'All rights reserved.',
  developerCredit: { label: 'Traideas', url: '#', isExternal: false },
  defaultSeo: {
    metaTitle: 'Multiply News — Consumer News Portal, Bangladesh',
    metaDescription:
      'Consumer-focused news portal from Bangladesh: consumer rights, market watch, enforcement drives and video reports.',
    metaRobots: 'index_follow',
  },
  organizationSchema: {
    name: 'Multiply News',
    url: 'https://multiplynews.com',
    sameAs: [
      { label: 'Facebook', url: social.facebook, isExternal: true },
      { label: 'YouTube', url: social.youtube, isExternal: true },
      { label: 'Instagram', url: social.instagram, isExternal: true },
    ],
  },
};

const link = (label: string, url: string, isExternal = false) => ({ label, url, isExternal });

const headerMenu = [
  link('Home', '#top'),
  link('Latest Videos', '#latest'),
  link('Reels', '#reels'),
  link('Facebook', '#facebook'),
  link('Instagram', '#instagram'),
  link('Live', social.youtubeLive, true),
  link('Send a Tip', '#tip'),
];

export const NAVIGATION = {
  headerMenu,
  drawerMenu: [...headerMenu.slice(0, 5), link('Shorts', social.youtubeShorts, true), ...headerMenu.slice(5)],
  footerColumns: [
    {
      title: 'Watch',
      links: [link('Latest videos', '#latest'), link('Shorts', social.youtubeShorts, true), link('Live', social.youtubeLive, true)],
    },
    {
      title: 'Company',
      links: [
        link('About us', '/about-us'),
        link('Advertise with us', '/advertise'),
        link('Privacy policy', '/privacy-policy'),
        link('Contact', '/contact'),
      ],
    },
    {
      title: 'Follow',
      links: [link('Facebook', social.facebook, true), link('YouTube', social.youtube, true), link('Instagram', social.instagram, true)],
    },
  ],
};

const AD_SLOT_KEYS = [
  'topLeaderboard',
  'heroRectangle',
  'videoInFeed',
  'midLeaderboard',
  'reelsLeaderboard',
  'facebookHalfPage',
  'instagramRectangle',
  'mobileAnchor',
];

export const AD_SETTINGS = {
  adsEnabled: true,
  adsenseClientId: '',
  slots: AD_SLOT_KEYS.map((slotKey) => ({ slotKey, adsenseSlotId: '', enabled: true })),
};

export const LIVE_STREAM = { isLive: false };
