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
    "Learn all about Vesu Markets and the Vesu Risk Framework. Find lend, borrow & liquidate manuals and documentation to build your own lending experience on top of Vesu.",
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
      image: "img/hero-background.jpg",
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
          {
            type: "search",
            position: "right",
          },
          {
            to: "/intro",
            activeBasePath: "docs",
            label: "Get started",
            position: "right",
          },
          {
            to: "/blog",
            activeBasePath: "docs",
            label: "Read Blog",
            position: "right",
          },
          {
            href: "https://vesu.xyz/app/",
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
                label: "Whitepaper",
                to: "/explore/whitepaper",
              },
              {
                label: "Architecture",
                to: "/dev-guides/architecture",
              },
              {
                label: "DeFi Spring",
                to: "/explore/defi-spring",
              },
            ],
          },
          {
            title: "Docs",
            items: [
              {
                label: "User Guides",
                to: "/user-guides/connect",
              },
              {
                label: "Developer Guides",
                to: "/dev-guides/architecture",
              },
            ],
          },
          {
            title: "Risk",
            items: [
              {
                label: "Risk Framework",
                to: "/risk/risk-framework",
              },
              {
                label: "Risk Ratings",
                to: "/risk/risk-ratings",
              },
              {
                label: "Risk Reports",
                to: "/risk/risk-framework",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "Security",
                to: "/security/security-basics",
              },
              {
                label: "Contracts",
                to: "/dev-guides/contract-addresses",
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
      announcementBar: {
        id: "vesu-1-0-release", // Any value that will identify this message.
        content:
          '<div class="announcement-bar"><a href="https://docs.vesu.xyz/blog/vesu-is-here/" target="_blank" rel="noopener"><span>Vesu launched on Starknet, learn more in the announcement post!</span> <span style="margin-left:1rem">Learn more</span> <span style="margin-left:0.25rem">→</span></a></div>',
        backgroundColor: "rgb(210, 215, 254)", // Defaults to `#fff`.
        textColor: "rgb(22 31 49)", // Defaults to `#000`.
        isCloseable: true, // Defaults to `true`.
      },
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
          showLastUpdateTime: true,
          editUrl: "https://github.com/vesuxyz/docs/edit/master/",
        },
        blog: {
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
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.alias["@site"] = path.resolve(__dirname);
      return webpackConfig;
    },
  },
};

export default config;
