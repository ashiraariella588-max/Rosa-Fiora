// =========================
// PEONY ANIMATION
// =========================

const peony = document.querySelector(".Information .Peony");
const section = document.querySelector(".Information");

if (peony && section) {
    window.addEventListener("scroll", () => {

        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.75;

        if (sectionTop < triggerPoint) {
            clearTimeout(peony._showTimer);
            peony._showTimer = setTimeout(() => {
                peony.classList.add("show");
            }, 500);
        } else {
            clearTimeout(peony._showTimer);
            peony.classList.remove("show");
        }

    });
}


gsap.registerPlugin(ScrollTrigger);

const mapSection = document.querySelector(".map-section");
const mapIframe = document.querySelector("#map iframe");

if (mapSection && mapIframe) {
    const mapZoomMotion = gsap.matchMedia();

    mapZoomMotion.add(
        "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => gsap.fromTo(mapIframe,
            { scale: 1 },
            {
                scale: 1.32,
                transformOrigin: "center center",
                ease: "none",
                scrollTrigger: {
                    trigger: mapSection,
                    start: "top top",
                    end: () => `+=${window.innerHeight}`,
                    scrub: 0.8
                }
            }
        )
    );

    mapZoomMotion.add(
        "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
        () => gsap.fromTo(mapIframe,
            { scale: 1.12 },
            {
                scale: 1,
                transformOrigin: "center center",
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: mapSection,
                    start: "top bottom",
                    endTrigger: ".map-info",
                    end: "center center",
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            }
        )
    );
}

const occasionSection = document.querySelector(".occasion-showcase");
const occasionRing = occasionSection?.querySelector(".occasion-ring");
const occasionCurrent = occasionSection?.querySelector(".occasion-current");

if (occasionSection && occasionRing) {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(occasionRing, {
            rotationY: -720,
            ease: "none",
            scrollTrigger: {
                trigger: occasionSection,
                start: "top top",
                end: () => `+=${window.innerHeight * 3}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: self => {
                    if (!occasionCurrent) return;
                    const loopProgress = (self.progress * 2) % 1;
                    const rotation = loopProgress * 360;
                    let cardNumber = 1;

                    if (rotation >= 35 && rotation < 125) cardNumber = 2;
                    else if (rotation >= 125 && rotation < 235) cardNumber = 3;
                    else if (rotation >= 235 && rotation < 325) cardNumber = 4;

                    occasionCurrent.textContent = String(cardNumber).padStart(2, "0");
                }
            }
        });
    });
}

const mobileHero = document.querySelector(".layout");
const mobileBestSellers = document.querySelector(".Information");
const mobilePeonyVideo = document.querySelector(".peony-video video");
const mobilePeonySection = document.querySelector(".peony-transition");

if (mobileHero && mobileBestSellers && mobilePeonyVideo && mobilePeonySection) {
    gsap.matchMedia().add(
        "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
            const heroScroll = gsap.timeline({
                scrollTrigger: {
                    trigger: mobileHero,
                    start: "top top",
                    end: "+=124%",
                    scrub: 0.8,
                    pin: mobilePeonySection,
                    pinSpacing: false,
                    anticipatePin: 1
                }
            });

            heroScroll.to(mobileHero, {
                backgroundColor: "#6A0F39",
                duration: 0.3,
                ease: "none"
            }, 0).to(mobilePeonySection, {
                clipPath: "inset(0% 0 0 0)",
                duration: 0.45,
                ease: "none"
            }, 0).to(mobilePeonyVideo, {
                scale: 1.85,
                transformOrigin: "50% 85%",
                duration: 0.75,
                ease: "none"
            }, 0).to(mobilePeonySection, {
                opacity: 0,
                duration: 0.3,
                ease: "none"
            }, 0.7);

            gsap.fromTo(mobileBestSellers,
                { clipPath: "inset(100% 0 0 0)" },
                {
                    clipPath: "inset(0% 0 0 0)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: mobileBestSellers,
                        start: "top bottom",
                        end: "top top",
                        scrub: true
                    }
                }
            );
        }
    );
}

const heroTitle = document.querySelector(".animate-text");

if (heroTitle) {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ delay: 0.15 })
            .from(heroTitle, {
                opacity: 0,
                y: 32,
                scale: 0.97,
                duration: 1,
                ease: "power3.out"
            });
    });
}

const bouquetSection = document.querySelector(".custom-bouquet");

if (bouquetSection) {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const bouquetImageFrame = bouquetSection.querySelector(".bouquet-image");
        const bouquetImage = bouquetSection.querySelector(".bouquet-image img");
        const bouquetContent = bouquetSection.querySelector(".bouquet-content");

        let bouquetFrameDelay;
        let bouquetFrameExpansion;

        const expandBouquetFrame = () => {
            bouquetFrameDelay?.kill();
            bouquetFrameExpansion?.kill();
            bouquetFrameDelay = gsap.delayedCall(1, () => {
                bouquetFrameExpansion = gsap.to(bouquetImageFrame, {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    borderRadius: 0,
                    duration: 1,
                    ease: "power2.inOut",
                    overwrite: "auto"
                });
            });
        };

        const resetBouquetFrame = () => {
            bouquetFrameDelay?.kill();
            bouquetFrameExpansion?.kill();
            gsap.set(bouquetImageFrame, {
                clearProps: "top,right,bottom,left,borderRadius"
            });
        };

        ScrollTrigger.create({
            trigger: bouquetSection,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * 1.2, 1000)}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            onEnter: expandBouquetFrame,
            onEnterBack: () => {
                bouquetFrameDelay?.kill();
                bouquetFrameExpansion?.reverse();
            },
            onLeaveBack: resetBouquetFrame,
            invalidateOnRefresh: true
        });

        const bouquetTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: bouquetSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8
            }
        });

        bouquetTimeline
            .fromTo(bouquetImage, {
                yPercent: 3,
                filter: "blur(5px)"
            }, {
                yPercent: -3,
                filter: "blur(2px)",
                ease: "none"
            })
            .fromTo(bouquetContent, {
                autoAlpha: 0.55,
                y: 32
            }, {
                autoAlpha: 1,
                y: 0,
                ease: "none"
            }, 0.12);

    });
}


// =========================
// BEST SELLERS ANIMATION
// =========================

gsap.from(".animatition", {
    scrollTrigger: {
        trigger: ".animatition",
        start: "top 85%",
        toggleActions: "play none none reverse"
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});
gsap.from(".lulu", {
    scrollTrigger: {
        trigger: ".lulu",
        start: "top 85%",
        toggleActions: "play none none reverse"
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});
const mapInfo = document.querySelector(".map-info");

if (mapInfo) {
    const mapInfoMotion = gsap.matchMedia();

    mapInfoMotion.add(
        "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => gsap.fromTo(mapInfo,
            { y: 90, autoAlpha: 0 },
            {
                y: 0,
                autoAlpha: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: mapInfo,
                    start: "top bottom",
                    end: "top 20%",
                    scrub: 0.8
                }
            }
        )
    );

    mapInfoMotion.add(
        "(min-width: 769px) and (prefers-reduced-motion: no-preference)",
        () => gsap.from(mapInfo, {
            y: 250,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: mapInfo,
                start: "top 95%",
                    end: "center center",
                scrub: 1
            }
        })
    );
}

const footer = document.querySelector(".site-footer");

if (footer) {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const footerTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: footer,
                start: "top 88%",
                toggleActions: "play none none reverse"
            }
        });

        footerTimeline
            .from(footer.querySelectorAll(".footer-main > div"), {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            })
            .from(footer.querySelector(".footer-bottom"), {
                opacity: 0,
                y: 10,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.2");
    });
}

const glassButton = new Button({
    text: "View on Google",
    size: 16,
    type: "pill",
    tintOpacity: 0.2,
    warp: true,

    onClick: () => {
        window.open(
            "https://www.google.com/maps?cid=8361335798451601103&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA",
            "_blank"
        );
    }
});

document.querySelector("#glass-button").appendChild(glassButton.element);

gsap.from(".reviews-header h4", {
    scrollTrigger: {
        trigger: ".reviews-header",
        start: "top 80%",
        toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out"
});

gsap.from(".reviews-header h2", {
    scrollTrigger: {
        trigger: ".reviews-header",
        start: "top 80%",
        toggleActions: "play none none reverse"
    },
    y: 70,
    opacity: 0,
    rotateX: -70,
    scale: 0.85,
    transformOrigin: "center bottom",
    duration: 1.2,
    ease: "back.out(1.5)"
});
const glassButton2 = new Button({
    text: "VIEW ALL",
    size: 16,
    type: "pill",
    tintOpacity: 0.2,
    warp: true,

    onClick: () => {
        window.open(
            "bouquets.html"
        );
    }
});
document.querySelector("#glass-button2").appendChild(glassButton2.element);

const bouquetGlassButton = new Button({
    text: "Request a Custom Bouquet",
    size: 16,
    type: "pill",
    tintOpacity: 0.2,
    warp: true,
    baseIntensity: 0.04
    
});
document.querySelector("#bouquet-glass-button").appendChild(bouquetGlassButton.element);