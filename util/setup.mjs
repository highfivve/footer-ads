let currentListener = undefined;

const setupGoogletagCmd = () => ({
  push: (fn) =>
    fn({
      pubads: () => ({
        addEventListener: (name, listener) => {
          currentListener = listener;
        },
        getSlots: () => ({
          find: (fn) => {
            fn({ slot: { getAdUnitPath: () => undefined } });
            return undefined;
          },
        }),
      }),
    }),
});

const sampleImage = (width, height) => {
  const img = document.createElement("img");
  img.setAttribute("width", width);
  img.setAttribute("height", height);
  img.setAttribute("src", `https://placekitten.com/${width}/${height}`);
  return img;
};

export const setupAd = (sizes, domId, setupListener) => {
  window.onload = () => {
    currentListener = undefined;

    window.googletag = {
      cmd: setupGoogletagCmd(),
      destroySlots: () => undefined,
    };

    const event = {
      slot: {
        getSlotElementId: () => domId,
      },
      advertiserId: 1337,
      isEmpty: false,
    };

    setupListener();

    document.querySelector("button").addEventListener("click", () => {
      const footerAd = document.getElementById(domId);
      if (footerAd) {
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        if (currentListener) {
          currentListener({ ...event, size });
        }
        footerAd.querySelector("img")?.remove();
        footerAd.appendChild(sampleImage(size[0], size[1]));
      }
    });
  };
};
