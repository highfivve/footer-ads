// footer-ad.ts
export const footerAd = () => {
    if (typeof document !== "undefined") {
        // Select all the DOM elements to manipulate
        const stickyAdContainer = document.getElementsByClassName("h5v-sticky-ad-container")[0];
        const closeButton = document.getElementsByClassName("h5v-sticky-ad-close-button")[0];

        // For testing ads content
        const getRandomAdImage = (adContainer, width, height) => {
            const image = document.createElement("img")
            image.src = `https://random.imagecdn.app/${width}/${height}`
            adContainer.appendChild(image)
        }

        // Close button behaviour - animate and remove the dom eventually
        closeButton?.addEventListener("click", () => {
            if (stickyAdContainer) {
                stickyAdContainer.classList.add('h5v-footerAd--hidden'); // Slide down out of the viewport including the close button
                stickyAdContainer.addEventListener(
                    "transitionend",
                    () => {
                        stickyAdContainer.remove() // Remove the container from the DOM after animation
                    },
                    { once: true }
                ) // Ensure the event listener is executed only once
            }
        })

        // Differentiating between mobile and desktop viewports
        const adjustAdLayout = () => {
            if (stickyAdContainer) {
                if (window.innerWidth <= 768) {
                    if (stickyAdContainer) {
                        getRandomAdImage(stickyAdContainer, window.innerWidth, 100)
                    }
                } else {
                    getRandomAdImage(stickyAdContainer, window.innerWidth, 150)
                    // adjust the layout. e.g.,  adContainer.style.bottom = '1rem';
                }
            }
        }

        // Initial layout adjustment
        adjustAdLayout()
    }
}
