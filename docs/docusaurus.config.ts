import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'JSON Server Mock Plus',
  tagline: 'Crie servidores REST API mockados com documentação de Swagger automática, e muito mais!',
  favicon: 'favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://rubensflinco.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/json-server-plus/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'rubensflinco', // Usually your GitHub org/user name.
  projectName: 'json-server-plus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/rubensflinco/json-server-plus/tree/main/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'JSON Server Mock Plus',
      logo: {
        alt: 'JSON Server Mock Plus Logo',
        src: 'android-chrome-512x512.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentação',
        },
        {
          href: 'https://github.com/rubensflinco/json-server-plus',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/json-server-mock-plus',
          label: 'NPM',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentação',
          items: [
            {
              label: 'Introdução',
              to: '/docs/intro',
            },
            {
              label: 'Instalação',
              to: '/docs/installation',
            },
            {
              label: 'Guia de Uso',
              to: '/docs/usage',
            },
          ],
        },
        {
          title: 'Comunidade',
          items: [
            {
              label: 'GitHub Issues',
              href: 'https://github.com/rubensflinco/json-server-plus/issues',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/rubensflinco/json-server-plus/discussions',
            },
          ],
        },
        {
          title: 'Mais',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/rubensflinco/json-server-plus',
            },
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/package/json-server-mock-plus',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} JSON Server Mock Plus. Construído com Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
