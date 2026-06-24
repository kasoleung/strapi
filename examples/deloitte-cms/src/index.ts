import type { Core } from '@strapi/strapi';
import {
  AUTHENTICATED_ACTIONS,
  ensurePermissions,
  PUBLIC_ACTIONS,
} from './bootstrap/permissions';
import { seedContent } from './bootstrap/seed';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePermissions(strapi, 'public', PUBLIC_ACTIONS);
    await ensurePermissions(strapi, 'authenticated', AUTHENTICATED_ACTIONS);
    await seedContent(strapi);
  },
};
