// footer-ad.ts
export const footerAd = () => {
    if (typeof document !== "undefined") {
        // Select all the DOM elements to manipulate
        const stickyAdContainer = document.getElementById("h5v-sticky-ad-container")
        const closeButton = document.getElementById("h5v-sticky-ad-close-button")
        const closeButtonText = document.getElementById("close-button-text")
        const design1Button = document.getElementById("d-1")
        const design2Button = document.getElementById("d-2")
        const design3Button = document.getElementById("d-3")

        // Use design-1 initially
        if (stickyAdContainer) {
            stickyAdContainer.classList.add("design-1")
        }

        // Apply css properties based on the clicked button
        design1Button?.addEventListener("click", () => {
            stickyAdContainer?.classList.add("design-1")
            stickyAdContainer?.classList.remove("design-2")
            stickyAdContainer?.classList.remove("design-3")
            if (closeButtonText) closeButtonText.style.display = "block"
        })

        design2Button?.addEventListener("click", () => {
            stickyAdContainer?.classList.remove("design-1")
            stickyAdContainer?.classList.add("design-2")
            stickyAdContainer?.classList.remove("design-3")
            if (closeButtonText) closeButtonText.style.display = "block"
        })

        design3Button?.addEventListener("click", () => {
            stickyAdContainer?.classList.remove("design-1")
            stickyAdContainer?.classList.remove("design-2")
            stickyAdContainer?.classList.add("design-3")
            // Show only an arrow
            if (closeButtonText) closeButtonText.style.display = "none"
        })

        // For testing ads content
        const getRandomAdImage = (adContainer, width, height) => {
            const image = window.document.createElement("img")
            image.src = `https://random.imagecdn.app/${width}/${height}`
            adContainer.appendChild(image)
        }

        // Close button behaviour - animate and remove the dom eventually
        closeButton?.addEventListener("click", () => {
            if (stickyAdContainer) {
                stickyAdContainer.style.transform = "translateY(120%)" // Slide down out of the viewport including the close button
                stickyAdContainer.addEventListener(
                    "transitionend",
                    () => {
                        stickyAdContainer.remove() // Remove the container from the DOM after animation
                    },
                    { once: true }
                ) // Ensure the event listener is executed only once
            }
        })

        const showAd = () => {
            if (stickyAdContainer) {
                stickyAdContainer.style.transform = "translateY(0)" // Slide up into the viewport
            }
        }

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
        showAd() // Show the ad initially
    }
}
