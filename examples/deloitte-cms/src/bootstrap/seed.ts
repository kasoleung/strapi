import type { Core } from '@strapi/strapi';

type StrapiWithDocuments = Core.Strapi & {
  documents: (uid: string) => {
    create: (params: { data: Record<string, unknown>; status?: string }) => Promise<{
      documentId: string;
    }>;
    findMany: (params?: { limit?: number }) => Promise<unknown[]>;
  };
};

export async function seedContent(strapi: Core.Strapi) {
  const documents = (strapi as StrapiWithDocuments).documents;

  const existing = await strapi.db.query('api::venue.venue').findMany({ limit: 1 });
  if (existing.length > 0) return;

  const hall = await documents('api::venue.venue').create({
    data: {
      name: 'Hall 1C',
      address: '1 Expo Drive, Wan Chai, Hong Kong',
      latitude: 22.2832,
      longitude: 114.1731,
      description: 'Main exhibition hall with harbourfront access.',
      level: 'Level 1',
      openingHours: '8:00 AM - 10:00 PM',
    },
    status: 'published',
  });

  const entrance = await documents('api::venue.venue').create({
    data: {
      name: 'Grand Entrance',
      address: '1 Expo Drive, Wan Chai, Hong Kong',
      latitude: 22.2825,
      longitude: 114.1725,
      description: 'Primary visitor entrance and registration point.',
      level: 'Ground',
      openingHours: '7:30 AM - 11:00 PM',
    },
    status: 'published',
  });

  await documents('api::venue.venue').create({
    data: {
      name: 'Harbour Concourse',
      address: '1 Expo Drive, Wan Chai, Hong Kong',
      latitude: 22.2838,
      longitude: 114.1738,
      description: 'Waterfront walkway connecting halls and dining.',
      level: 'Level 2',
      openingHours: '9:00 AM - 9:00 PM',
    },
    status: 'published',
  });

  const artEvent = await documents('api::event.event').create({
    data: {
      title: 'Art + Tech Showcase',
      slug: 'art-tech-showcase',
      description:
        'Immersive installations and digital creators across the harbourfront halls.',
      startDate: '2026-07-08T10:00:00.000Z',
      endDate: '2026-07-08T18:30:00.000Z',
      featured: true,
      hall: 'Hall 1C',
      location: hall.documentId,
    },
    status: 'published',
  });

  await documents('api::event.event').create({
    data: {
      title: 'Sustainability Forum',
      slug: 'sustainability-forum',
      description: 'Panel discussions on green building and smart venue operations.',
      startDate: '2026-07-09T09:00:00.000Z',
      endDate: '2026-07-09T17:00:00.000Z',
      featured: false,
      hall: 'Hall 3E',
      location: hall.documentId,
    },
    status: 'published',
  });

  await documents('api::event.event').create({
    data: {
      title: 'Innovation Expo',
      slug: 'innovation-expo',
      description: 'Startup demos and investor meetups throughout the atrium.',
      startDate: '2026-07-10T11:00:00.000Z',
      endDate: '2026-07-10T19:00:00.000Z',
      featured: false,
      hall: 'Hall 5B',
      location: entrance.documentId,
    },
    status: 'published',
  });

  await documents('api::banner.banner').create({
    data: {
      title: 'Art + Tech Showcase',
      description:
        'Immersive installations and digital creators across the harbourfront halls.',
      linkType: 'event',
      order: 1,
      active: true,
      gradientStart: '#1A2B4A',
      gradientEnd: '#4A3F8C',
      event: artEvent.documentId,
    },
    status: 'published',
  });

  await documents('api::banner.banner').create({
    data: {
      title: 'Harbour Summit',
      description: 'Keynotes and networking across the waterfront concourse.',
      linkType: 'none',
      order: 2,
      active: true,
      gradientStart: '#5BBFB3',
      gradientEnd: '#2D9CDB',
    },
    status: 'published',
  });

  await documents('api::restaurant.restaurant').create({
    data: {
      name: 'Harbour Table',
      slug: 'harbour-table',
      cuisine: 'Modern Cantonese',
      priceRange: 'premium',
      description:
        'Business lunch sets and harbour-view dinner seating for event guests.',
      level: 'Level 4',
      openingTimes: '11:30 AM - 9:30 PM',
      maxPartySize: 8,
      availableSlots: ['12:00 PM', '1:30 PM', '6:30 PM'],
      gradientStart: '#1A2B4A',
      gradientEnd: '#2D9CDB',
      venue: hall.documentId,
    },
    status: 'published',
  });

  await documents('api::restaurant.restaurant').create({
    data: {
      name: 'Atrium Kitchen',
      slug: 'atrium-kitchen',
      cuisine: 'International Buffet',
      priceRange: 'moderate',
      description: 'Quick buffet service between sessions with vegetarian options.',
      level: 'Level 2',
      openingTimes: '10:00 AM - 8:00 PM',
      maxPartySize: 6,
      availableSlots: ['11:30 AM', '2:00 PM', '5:30 PM'],
      gradientStart: '#5BBFB3',
      gradientEnd: '#3A9E94',
      venue: entrance.documentId,
    },
    status: 'published',
  });
}
