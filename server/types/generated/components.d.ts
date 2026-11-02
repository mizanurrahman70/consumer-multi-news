import type { Schema, Struct } from '@strapi/strapi';

export interface AdsAdSlot extends Struct.ComponentSchema {
  collectionName: 'components_ads_ad_slots';
  info: {
    description: 'AdSense settings for one ad position';
    displayName: 'Ad slot';
    icon: 'dashboard';
  };
  attributes: {
    adsenseSlotId: Schema.Attribute.String;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    slotKey: Schema.Attribute.Enumeration<
      [
        'topLeaderboard',
        'heroRectangle',
        'videoInFeed',
        'midLeaderboard',
        'reelsLeaderboard',
        'facebookHalfPage',
        'instagramRectangle',
        'mobileAnchor',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface EmbedYoutubeVideo extends Struct.ComponentSchema {
  collectionName: 'components_embed_youtube_videos';
  info: {
    description: 'Paste a YouTube link. The video ID and an empty title are filled in on save.';
    displayName: 'YouTube video';
    icon: 'play';
  };
  attributes: {
    customThumbnail: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    youtubeId: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 11;
      }>;
    youtubeUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeCtaCard extends Struct.ComponentSchema {
  collectionName: 'components_home_cta_cards';
  info: {
    description: 'Title, text and up to 2 buttons';
    displayName: 'CTA card';
    icon: 'message';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    text: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

export interface HomeFooterBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_footer_banners';
  info: {
    description: 'Red photo banner above the footer';
    displayName: 'Footer banner';
    icon: 'picture';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    buttons: Schema.Attribute.Component<'shared.button', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
        },
        number
      >;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
      }>;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    description: 'Featured video at the top of the home page';
    displayName: 'Hero';
    icon: 'star';
  };
  attributes: {
    kicker: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 40;
      }> &
      Schema.Attribute.DefaultTo<'Latest on YouTube'>;
    meta: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
      }> &
      Schema.Attribute.DefaultTo<'Multiply News \u00B7 YouTube'>;
    video: Schema.Attribute.Component<'embed.youtube-video', false> &
      Schema.Attribute.Required;
  };
}

export interface NavFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_nav_footer_columns';
  info: {
    description: 'A titled list of footer links';
    displayName: 'Footer column';
    icon: 'bulletList';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 40;
      }>;
  };
}

export interface SeoOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_seo_open_graphs';
  info: {
    description: 'Overrides for Facebook/WhatsApp sharing';
    displayName: 'Open Graph';
    icon: 'share';
  };
  attributes: {
    ogDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.Enumeration<
      ['website', 'article', 'video_other']
    > &
      Schema.Attribute.DefaultTo<'website'>;
  };
}

export interface SeoOrganization extends Struct.ComponentSchema {
  collectionName: 'components_seo_organizations';
  info: {
    description: 'NewsMediaOrganization structured data';
    displayName: 'Organization';
    icon: 'house';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    sameAs: Schema.Attribute.Component<'shared.link', true>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: 'Pill button with a colour variant';
    displayName: 'Button';
    icon: 'cursor';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    variant: Schema.Attribute.Enumeration<['yellow', 'dark', 'red', 'light']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'dark'>;
  };
}

export interface SharedContact extends Struct.ComponentSchema {
  collectionName: 'components_shared_contacts';
  info: {
    description: 'Address and phone shown in the footer';
    displayName: 'Contact';
    icon: 'phone';
  };
  attributes: {
    addressLines: Schema.Attribute.Text & Schema.Attribute.Required;
    email: Schema.Attribute.Email;
    phoneDisplay: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 30;
      }>;
    phoneE164: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'A labelled link';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
      }>;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
  };
}

export interface SharedSectionHeading extends Struct.ComponentSchema {
  collectionName: 'components_shared_section_headings';
  info: {
    description: 'Section title with an optional right-side link';
    displayName: 'Section heading';
    icon: 'layer';
  };
  attributes: {
    linkLabel: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    linkUrl: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500;
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 80;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Search engine and social sharing metadata';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.Enumeration<
      ['index_follow', 'noindex_follow', 'noindex_nofollow']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'index_follow'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    openGraph: Schema.Attribute.Component<'seo.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'All social profile URLs (https://)';
    displayName: 'Social links';
    icon: 'earth';
  };
  attributes: {
    facebook: Schema.Attribute.String & Schema.Attribute.Required;
    facebookReels: Schema.Attribute.String & Schema.Attribute.Required;
    instagram: Schema.Attribute.String & Schema.Attribute.Required;
    messenger: Schema.Attribute.String & Schema.Attribute.Required;
    youtube: Schema.Attribute.String & Schema.Attribute.Required;
    youtubeLive: Schema.Attribute.String & Schema.Attribute.Required;
    youtubeShorts: Schema.Attribute.String & Schema.Attribute.Required;
    youtubeSubscribe: Schema.Attribute.String & Schema.Attribute.Required;
    youtubeVideos: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'ads.ad-slot': AdsAdSlot;
      'embed.youtube-video': EmbedYoutubeVideo;
      'home.cta-card': HomeCtaCard;
      'home.footer-banner': HomeFooterBanner;
      'home.hero': HomeHero;
      'nav.footer-column': NavFooterColumn;
      'seo.open-graph': SeoOpenGraph;
      'seo.organization': SeoOrganization;
      'shared.button': SharedButton;
      'shared.contact': SharedContact;
      'shared.link': SharedLink;
      'shared.section-heading': SharedSectionHeading;
      'shared.seo': SharedSeo;
      'shared.social-links': SharedSocialLinks;
    }
  }
}
