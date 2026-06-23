import type { StrapiApp } from '@strapi/strapi/admin';

import deloitteLogo from './assets/deloitte-logo.png';
import { installDocumentTitleRebrand } from './extensions/documentTitle';
import theme from './extensions/theme';
import translations from './extensions/translations';

export default {
  config: {
    auth: {
      logo: deloitteLogo,
    },
    menu: {
      logo: deloitteLogo,
    },
    theme,
    translations: {
      en: translations,
    },
    tutorials: false,
    notifications: { releases: false },
  },
  bootstrap(_app: StrapiApp) {
    installDocumentTitleRebrand();
  },
};
