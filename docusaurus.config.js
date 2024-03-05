// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The Vesu Documentation',
  tagline: 'Learn about earning, borrowing and building with Vesu',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.vesu.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'vesuxyz', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/hero-background.jpg',
      navbar: {
        style: 'dark',
        title: null,
        logo: {
          alt: 'Vesu Knowledge Hub logo',
          src: 'img/logo.png',
        },
        hideOnScroll: true,
        items: [
          {
            type: 'search',
            position: 'right',
          },
          {
            to: '/blog',
            activeBasePath: 'docs',
            label: 'Vesu Blog',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Explore',
            items: [
              {
                label: 'Vesu Blog',
                href: '/blog',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/vesuxyz',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Vesu.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        // Do dark theme by default
        defaultMode: 'dark',
        // Hides the switch in the navbar
        // Useful if you want to support a single color mode
        disableSwitch: true,
      },
      announcementBar: {
        id: 'vesu-1-0-release', // Any value that will identify this message.
        content:
          '<div class="announcement-bar"><a href="https://docs.vesu.xyz/blog/welcome/" target="_blank" rel="noopener"><span>Vesu will land on Starknet soon!</span> <span style="margin-left:1rem">Learn more</span> <span style="margin-left:0.25rem">→</span></a></div>',
        backgroundColor: 'rgb(210, 215, 254)', // Defaults to `#fff`.
        textColor: 'rgb(22 31 49)', // Defaults to `#000`.
        isCloseable: true, // Defaults to `true`.
      },
    }),

    presets: [
      [
        'classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        {
          docs: {
            routeBasePath: '/',
            path: 'docs',
            sidebarPath: require.resolve('./sidebars.js'),
            showLastUpdateTime: true,
            editUrl:
              'https://github.com/vesuxyz/docs/edit/master/',
          },
          blog: {
            showReadingTime: true,
          },
          theme: {
            customCss: require.resolve('./src/css/custom.scss'),
          },
          pages: {
            path: 'src/pages',
            routeBasePath: '/',
            include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],
            exclude: [
              '**/_*.{js,jsx,ts,tsx,md,mdx}',
              '**/_*/**',
              '**/*.test.{js,jsx,ts,tsx}',
              '**/__tests__/**',
            ],
            mdxPageComponent: '@theme/MDXPage',
            remarkPlugins: [],
            rehypePlugins: [],
            beforeDefaultRemarkPlugins: [],
            beforeDefaultRehypePlugins: [],
          },
          sitemap: {
            changefreq: 'weekly',
            priority: 0.5,
            ignorePatterns: ['/lp/**'],
            filename: 'sitemap.xml',
          },
        },
      ],
    ],

    plugins: [
      'docusaurus-plugin-sass'
    ]
};

export default config;
