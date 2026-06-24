import type { Core } from '@strapi/strapi';

export const PUBLIC_ACTIONS = [
  'api::banner.banner.find',
  'api::banner.banner.findOne',
  'api::event.event.find',
  'api::event.event.findOne',
  'api::venue.venue.find',
  'api::venue.venue.findOne',
  'api::restaurant.restaurant.find',
  'api::restaurant.restaurant.findOne',
];

export const AUTHENTICATED_ACTIONS = [
  ...PUBLIC_ACTIONS,
  'api::reservation.reservation.find',
  'api::reservation.reservation.findOne',
  'api::reservation.reservation.create',
];

export async function ensurePermissions(
  strapi: Core.Strapi,
  roleType: string,
  actions: string[],
) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: roleType },
  });

  if (!role) return;

  for (const action of actions) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: { action, role: role.id },
    });

    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: role.id },
      });
    }
  }
}
