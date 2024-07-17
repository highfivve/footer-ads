/**
 * ## Ad Sticky
 *
 * Initializes the close button for the sticky ad.
 */
export const initAdSticky = () => {
  const navbarSelector = "header";
  const navbar = document.querySelector(navbarSelector);
  const targetSelector = "#h5v_content_1, #h5v_content_2";
  const targets = document.querySelectorAll(targetSelector);
  const target = targets.length > 0 ? targets.item(0) : null;

  const fadeOutClass = "header-ad--fadeOut";
  const navbarhiddenClass = "header-ad--navbarHidden";
  const headerAd = document.querySelector('[data-ref="header-ad"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // this is the fade out target
        if (entry.target === target) {
          console.log('target', entry.target);
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

        } else if(entry.target === navbar) {
          console.log('navbar', entry.target);
          if(entry.isIntersecting) {
            headerAd.classList.remove(navbarhiddenClass);
          } else {
            headerAd.classList.add(navbarhiddenClass);
          }
        }
        });
      },
    {
      rootMargin: "0px",
    }
  );

  if(target) {
    observer.observe(target);
    if(navbar) {
      observer.observe(navbar);
    }
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
