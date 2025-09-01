// Utility to update meta tags dynamically from website settings
export const updateMetaTags = (settings: any) => {
  if (!settings?.seo) return;

  // Update page title
  const titleEl = document.getElementById('page-title') as HTMLTitleElement;
  if (titleEl && settings.seo.meta_title) {
    titleEl.textContent = settings.seo.meta_title;
  }

  // Update meta title
  const metaTitleEl = document.getElementById('meta-title') as HTMLMetaElement;
  if (metaTitleEl && settings.seo.meta_title) {
    metaTitleEl.setAttribute('content', settings.seo.meta_title);
  }

  // Update meta description
  const metaDescEl = document.getElementById('meta-description') as HTMLMetaElement;
  if (metaDescEl && settings.seo.meta_description) {
    metaDescEl.setAttribute('content', settings.seo.meta_description);
  }

  // Update meta keywords
  const metaKeywordsEl = document.getElementById('meta-keywords') as HTMLMetaElement;
  if (metaKeywordsEl && settings.seo.meta_keywords) {
    metaKeywordsEl.setAttribute('content', settings.seo.meta_keywords);
  }

  // Update Open Graph title
  const ogTitleEl = document.getElementById('og-title') as HTMLMetaElement;
  if (ogTitleEl && settings.seo.og_title) {
    ogTitleEl.setAttribute('content', settings.seo.og_title);
  }

  // Update Open Graph description
  const ogDescEl = document.getElementById('og-description') as HTMLMetaElement;
  if (ogDescEl && settings.seo.og_description) {
    ogDescEl.setAttribute('content', settings.seo.og_description);
  }

  // Update Open Graph image
  const ogImageEl = document.getElementById('og-image') as HTMLMetaElement;
  if (ogImageEl && settings.seo.og_image) {
    ogImageEl.setAttribute('content', settings.seo.og_image);
  }

  // Update Twitter title
  const twitterTitleEl = document.getElementById('twitter-title') as HTMLMetaElement;
  if (twitterTitleEl && settings.seo.twitter_title) {
    twitterTitleEl.setAttribute('content', settings.seo.twitter_title);
  }

  // Update Twitter description
  const twitterDescEl = document.getElementById('twitter-description') as HTMLMetaElement;
  if (twitterDescEl && settings.seo.twitter_description) {
    twitterDescEl.setAttribute('content', settings.seo.twitter_description);
  }

  // Update Twitter image
  const twitterImageEl = document.getElementById('twitter-image') as HTMLMetaElement;
  if (twitterImageEl && settings.seo.twitter_image) {
    twitterImageEl.setAttribute('content', settings.seo.twitter_image);
  }
};