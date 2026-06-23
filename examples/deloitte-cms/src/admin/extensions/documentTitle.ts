const BRAND_NAME = 'Deloitte';

const STRAPI_TITLE_SUFFIX = /\s*\|\s*Strapi$/;

function rebrandTitle(title: string): string {
  if (STRAPI_TITLE_SUFFIX.test(title)) {
    return title.replace(STRAPI_TITLE_SUFFIX, ` | ${BRAND_NAME}`);
  }

  if (title === 'Strapi Admin' || title === 'Strapi') {
    return BRAND_NAME;
  }

  return title;
}

export function installDocumentTitleRebrand() {
  const descriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'title');

  if (!descriptor?.get || !descriptor?.set) {
    return;
  }

  Object.defineProperty(document, 'title', {
    get: descriptor.get,
    set(value: string) {
      descriptor.set!.call(document, rebrandTitle(value));
    },
    configurable: descriptor.configurable,
    enumerable: descriptor.enumerable,
  });

  document.title = rebrandTitle(document.title);
}
