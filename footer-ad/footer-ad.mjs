/**
 * Disable rendering the footer ad format for certain advertisers by specifying them here.
 * Most of the times you would use this for partners who ship their own special format or behaviour.
 *
 * @type {number[]}
 */
const disallowedAdvertiserIds = [];

/**
 * This wraps functionality to show and hide an interactive desktop footer ad component with a close
 * button depending on some parameters.
 *
 * @param event googletag.events.SlotRenderEndedEvent
 *
 * @see https://developers.google.com/publisher-tag/reference#googletag.events.slotrenderendedevent
 */
const renderFooterAd = (event) => {
  const slot = event.slot;
  const footerAdContainerElement = document.body.querySelector(
    "[data-ref=h5-footer-ad-container]"
  );
  const footerAdElement = document.body.querySelector("#h5_footer_ad");

  if (
    !footerAdContainerElement ||
    !footerAdElement ||
    slot.getSlotElementId() !== "h5_footer_ad" ||
    // don't render anything if slot render returns empty
    event.isEmpty ||
    // don't render for excluded advertiser ids
    (!!event.advertiserId &&
      disallowedAdvertiserIds.includes(event.advertiserId)) ||
    // minimum is 768px width - h5_footer_ad only on desktop!
    window.matchMedia("(max-width: 767px)").matches
  ) {
    // remove the container, it could interfere with the rest of the page
    if (
      footerAdContainerElement &&
      slot.getSlotElementId() === "h5_footer_ad"
    ) {
      footerAdContainerElement.remove();
    }

    return;
  }

  // add close button only once - that's enough. Happens on ad reload
  if (document.body.querySelector("[data-ref=footer-ad-close-button]")) {
    return;
  }

  const footerAdElementClose = document.createElement("button");
  footerAdElementClose.classList.add("h5-footer-ad-close");
  footerAdElementClose.setAttribute("aria-label", "Anzeige entfernen");
  footerAdElementClose.setAttribute("data-ref", "footer-ad-close-button");

  footerAdElement.classList.add("h5-footer-ad");

  // for the combination of high ad (> 200px) and low vertical screen resolution, we shift the ad 70px
  // to the bottom.
  if (
    Array.isArray(event.size) &&
    event.size[1] > 200 &&
    window.matchMedia("(max-height: 800px)").matches
  ) {
    footerAdElement.classList.add("is-shifted-bottom");
  }

  footerAdContainerElement.classList.add("h5-footer-ad-container");
  footerAdContainerElement.appendChild(footerAdElementClose);

  footerAdElementClose.addEventListener("click", () =>
    footerAdContainerElement.remove()
  );
};

export const setupFooterAdListener = () => {
  window.googletag = window.googletag || { cmd: [] };
  window.googletag.cmd.push((googletag) =>
    googletag.pubads().addEventListener("slotRenderEnded", renderFooterAd)
  );
};
