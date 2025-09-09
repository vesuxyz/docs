// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Vesu Knowledge Hub",
  tagline:
    "Learn how to use and build on Vesu. Supply, borrow, and multiply crypto assets on Starknet",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://vesu.xyz",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "vesuxyz", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/vesu.png",
      metadata: [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'https://vesu.xyz/img/vesu.png' },
      { name: 'twitter:title', content: 'Vesu Knowledge Hub' },
      { name: 'twitter:description', content: 'Learn how to use and build on Vesu. Supply, borrow, and multiply crypto assets on Starknet.' },
      { property: 'og:image', content: 'https://vesu.xyz/img/vesu.png' },
      { property: 'og:url', content: 'https://docs.vesu.xyz/' },
      { property: 'og:locale', content: 'en' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Vesu Knowledge Hub' },
      { property: 'og:description', content: 'Learn how to use and build on Vesu. Supply, borrow, and multiply crypto assets on Starknet.' }
      ],
      algolia: {
        appId: 'QOJ022CPNR',
        apiKey: 'bdc1c4e96d4e886d1b993bd5aa909c54',
        indexName: 'vesu',
        searchPagePath: 'search',
      },

      navbar: {
        style: "dark",
        title: null,
        logo: {
          alt: "Vesu Knowledge Hub logo",
          src: "img/logo-light-mode.png",
          srcDark: "img/logo.png",
        },
        hideOnScroll: true,
        items: [
          { // Uses the algolia search plugin (see config below)
            type: "search",
            position: "right",
          },
          {
            to: "/explore",
            activeBasePath: "docs",
            label: "Read Docs",
            position: "right",
          },
          {
            to: "/blog",
            activeBasePath: "Read Docs",
            label: "Read Blog",
            position: "right",
          },
          {
            href: "https://vesu.xyz",
            label: "Launch App",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Explore",
            items: [
              {
                label: "Glossary",
                to: "/explore/glossary",
              },
              {
                label: "STRK Rewards",
                to: "/explore/rewards",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Twitter",
                href: "https://twitter.com/vesuxyz",
              },
              {
                label: "GitHub",
                href: "https://github.com/vesuxyz",
              },
              {
                label: "Discord",
                href: "https://discord.gg/G9Gxgujj8T",
              },
              {
                label: "Telegram",
                href: "https://telegram.me/VesuChat",
              },
            ],
          },
          {
            title: "Security",
            items: [
              {
                label: "Audits",
                to: "/security/audits",
              },
              {
                label: "Bug Bounty",
                href: "https://immunefi.com/bounty/vesu",
              },
              {
                label: "Monitoring",
                to: "/security/monitoring",
              },
              {
                label: "Contact",
                to: "/security",
              },
            ],
          },
        {
            title: "Legal",
            items: [
              {
                label: "Terms of Service",
                href: "https://vesu.xyz/terms-of-services",
              },
              {
                label: "Privacy Policy",
                href: "https://vesu.xyz/privacy",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/vesuxyz",
              },
              {
                label: "Dune",
                href: "https://dune.com/vesu",
              },
              {
                label: "Defillama",
                href: "https://defillama.com/protocol/vesu",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Motion Labs AG.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        // Do dark theme by default
        defaultMode: "dark",
        // Hides the switch in the navbar
        // Useful if you want to support a single color mode
        disableSwitch: false,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',

        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',

        indexName: 'YOUR_INDEX_NAME',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: false,

        // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
        insights: false,
      },
      // announcementBar: {
      //   id: "vesu-1-0-release", // Any value that will identify this message.
      //   content:
      //     '<div class="announcement-bar"><a href="https://docs.vesu.xyz/blog/vesu-is-here/" target="_blank" rel="noopener"><span>Vesu launched on Starknet, learn more in the announcement post!</span> <span style="margin-left:1rem">Learn more</span> <span style="margin-left:0.25rem">→</span></a></div>',
      //   backgroundColor: "rgb(210, 215, 254)", // Defaults to `#fff`.
      //   textColor: "rgb(22 31 49)", // Defaults to `#000`.
      //   isCloseable: true, // Defaults to `true`.
      // },
    }),

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          routeBasePath: "/",
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: false,
          editUrl: "https://github.com/vesuxyz/docs/main/",
        },
        blog: {
          blogSidebarTitle: 'Blog posts',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
        pages: {
          path: "src/pages",
          routeBasePath: "/",
          include: ["**/*.{js,jsx,ts,tsx,md,mdx}"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
          mdxPageComponent: "@theme/MDXPage",
          remarkPlugins: [],
          rehypePlugins: [],
          beforeDefaultRemarkPlugins: [],
          beforeDefaultRehypePlugins: [],
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/lp/**"],
          filename: "sitemap.xml",
        },
      },
    ],
  ],

  plugins: ["docusaurus-plugin-sass"],
};

export default config;
