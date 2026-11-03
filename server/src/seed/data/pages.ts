import { SOCIAL_LINKS as social } from './site';

/**
 * Starter content for the footer "Company" pages. Editors should review and
 * replace it (especially the privacy policy) before launch.
 */

const text = (value: string, extra: Record<string, unknown> = {}) => ({ type: 'text', text: value, ...extra });
const paragraph = (value: string) => ({ type: 'paragraph', children: [text(value)] });
const heading = (value: string, level = 2) => ({ type: 'heading', level, children: [text(value)] });
const list = (items: string[]) => ({
  type: 'list',
  format: 'unordered',
  children: items.map((item) => ({ type: 'list-item', children: [text(item)] })),
});

const seo = (metaTitle: string, metaDescription: string) => ({ metaTitle, metaDescription, metaRobots: 'index_follow' });

export const ABOUT_PAGE = {
  title: 'About us',
  subtitle: 'Consumer-focused news from Bangladesh: consumer rights, market watch and enforcement drives.',
  content: [
    paragraph(
      'Multiply News is a consumer news portal from Bangladesh. We report from markets, factories and shops to show readers what they pay for, and what they really get.',
    ),
    heading('What we cover'),
    list([
      'Consumer rights and complaints',
      'Market prices and market watch',
      'Enforcement drives by BSTI, the National Consumer Rights Protection Directorate and other authorities',
    ]),
    heading('Our promise'),
    paragraph('Accurate, on-the-spot video reporting that helps consumers make better decisions.'),
  ],
  seo: seo('About us — Multiply News', 'Who we are: Multiply News, the consumer-focused video news portal from Bangladesh.'),
};

export const ADVERTISE_PAGE = {
  title: 'Advertise with us',
  subtitle: 'Reach consumers across Bangladesh on our website, YouTube, Facebook and Instagram.',
  content: [
    paragraph('Multiply News reaches an engaged audience of consumers every day through video reports and reels.'),
    heading('Advertising options'),
    list(['Website banners and in-feed ads', 'Sponsored video segments', 'Social media campaigns on Facebook and Instagram']),
    paragraph('Contact our team for rates and a media kit.'),
  ],
  contactEmail: null,
  contactPhone: '01315-668822',
  buttons: [{ label: 'Message us on Messenger', url: social.messenger, variant: 'red', isExternal: true }],
  seo: seo('Advertise with us — Multiply News', 'Advertise with Multiply News: website banners, sponsored videos and social media campaigns.'),
};

export const PRIVACY_POLICY_PAGE = {
  title: 'Privacy policy',
  lastUpdated: '2026-11-03',
  content: [
    paragraph('This page explains what information Multiply News collects when you visit our website and how it is used.'),
    heading('Information we collect'),
    paragraph(
      'We do not ask you to create an account. Like most websites, our servers and partners (such as Google AdSense, YouTube, Facebook and Instagram) may collect technical data like your browser type and pages visited, and may use cookies.',
    ),
    heading('Embedded content'),
    paragraph('Videos and posts on this site are embedded from YouTube, Facebook and Instagram, which follow their own privacy policies.'),
    heading('Contact'),
    paragraph('Questions about this policy? Contact us using the details on our Contact page.'),
  ],
  seo: seo('Privacy policy — Multiply News', 'How Multiply News handles information collected on its website, cookies and embedded content.'),
};

export const CONTACT_PAGE = {
  title: 'Contact',
  subtitle: 'Send us a news tip, a consumer complaint or a business enquiry.',
  content: [paragraph('Our team reads every message. For news tips, Messenger is the fastest way to reach us.')],
  showContactDetails: true,
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Razzak+Plaza+Moghbazar+Dhaka',
  buttons: [
    { label: 'Send a tip on Messenger', url: social.messenger, variant: 'red', isExternal: true },
    { label: 'Facebook page', url: social.facebook, variant: 'dark', isExternal: true },
  ],
  seo: seo('Contact — Multiply News', 'Contact Multiply News: address, phone and Messenger for news tips and consumer complaints.'),
};
