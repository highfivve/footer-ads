/**
 * ## Ad Sticky
 *
 * Initializes the close button for the sticky ad.
 */
export const initAdSticky = () => {
  const targetSelector = "#h5v_content_1";
  const fadeOutClass = "header-ad--fadeOut";
  const headerAd = document.querySelector('[data-ref="header-ad"]');
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      console.log(entry);

      if (
        // user scrolls down
        entry.isIntersecting ||
        // user starts below observed DOM
        (!entry.isIntersecting && entry.boundingClientRect.y < 0)
      ) {
        headerAd.classList.add(fadeOutClass);
      } else if (entry.boundingClientRect.y >= 0) {
        headerAd.classList.remove(fadeOutClass);
      }
    },
    {
      rootMargin: "0px",
    }
  );
  const target = document.querySelector(targetSelector);
  if(target) {
    observer.observe(target);
  } else {
    console.warn(`no target found to observe with selector '${targetSelector}'`);
    observer.disconnect();
  }

  // close button implementation
  const closeButton = document.querySelector(
    '[data-ref="header-ad-close-button"]'
  );
  if( closeButton) {
    closeButton.addEventListener("click", () => {
      headerAd.classList.add(fadeOutClass);
      observer.disconnect();
    });
  } else {
    console.warn('no close button found for sticky header ad');
  }

};
