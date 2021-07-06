/**
 * ## Ad Sticky
 *
 * Initializes the close button for the sticky ad.
 */
export const initAdSticky = () => {
  const adSticky = window.document.querySelector("[data-ref=sticky-ad]");
  const closeButton = window.document.querySelector(
    "[data-ref=sticky-ad-close]"
  );

  if (adSticky && closeButton) {
    closeButton.addEventListener(
      "click",
      () => {
        // hide the ad slot
        adSticky.style.setProperty("display", "none");

        // destroy the slot so it doesn't get reloaded or refreshed by accident
        window.googletag.cmd.push((googletag) => {
          const slot = googletag
            .pubads()
            .getSlots()
            .find(
              (slot) => slot.getAdUnitPath() === "/12345/highfivve/h5_stickyad"
            );

          // there are cases where the ad slot is not there. This may be the case when
          // * the ad slot has already been deleted (user clicked two times on the button)
          // * some weird ad blocker stuff
          // * ad reload may have already removed the slot
          if (slot) {
            window.googletag.destroySlots([slot]);
          }
        });
      },
      // the slot can only be hidden once
      { once: true, passive: true }
    );
  }
};
