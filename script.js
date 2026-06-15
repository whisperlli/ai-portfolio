const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");
const lightboxCount = document.getElementById("lightboxCount");
const lightboxViewport = document.getElementById("lightboxViewport");
const lightboxZoomIn = document.getElementById("lightboxZoomIn");
const lightboxZoomOut = document.getElementById("lightboxZoomOut");
const lightboxZoomReset = document.getElementById("lightboxZoomReset");

const lightboxGalleries = {
  "ai-collab": [
    "assets/workflow/ai-collab-01.png",
    "assets/workflow/ai-collab-02.png",
    "assets/workflow/ai-collab-03.png",
    "assets/workflow/ai-collab-04.png",
    "assets/workflow/ai-collab-05.png",
    "assets/workflow/ai-collab-06.png",
  ],
  "cad-workflow": [
    "assets/workflow/cad-process/cad-process-00-final.png",
    "assets/workflow/cad-process/cad-process-01-requirements.png",
    "assets/workflow/cad-process/cad-process-02-plan.png",
    "assets/workflow/cad-process/cad-process-03-rules.png",
    "assets/workflow/cad-process/cad-process-04-lisp.png",
  ],
  "shoe-detail": [
    "assets/workflow/shoe-detail/shoe-detail-00-final.png",
    "assets/workflow/shoe-detail/shoe-detail-01-brief.png",
    "assets/workflow/shoe-detail/shoe-detail-02-output.png",
    "assets/workflow/shoe-detail/shoe-detail-03-skill.png",
    "assets/workflow/shoe-detail/shoe-detail-04-iteration.png",
    "assets/workflow/shoe-detail/shoe-detail-05-delivery.png",
    "assets/workflow/shoe-detail/shoe-detail-06-rules.png",
    "assets/workflow/shoe-detail/shoe-detail-07-psd.png",
  ],
};

let activeLightboxItems = [];
let activeLightboxIndex = 0;
let lightboxZoom = 1;

function setLightboxZoom(value) {
  lightboxZoom = Math.min(3, Math.max(0.75, value));
  lightbox.style.setProperty("--lightbox-zoom", lightboxZoom);
  lightboxViewport?.classList.toggle("is-zoomed", lightboxZoom > 1);
  if (lightboxZoomReset) {
    lightboxZoomReset.textContent = `${Math.round(lightboxZoom * 100)}%`;
  }
}

function resetLightboxView() {
  setLightboxZoom(1);
  if (lightboxViewport) {
    lightboxViewport.scrollTop = 0;
    lightboxViewport.scrollLeft = 0;
  }
}

function renderLightbox() {
  const src = activeLightboxItems[activeLightboxIndex];
  if (!src) return;

  lightboxImage.src = src;
  resetLightboxView();
  lightbox.classList.toggle("single", activeLightboxItems.length <= 1);
  lightboxCount.textContent =
    activeLightboxItems.length > 1 ? `${activeLightboxIndex + 1} / ${activeLightboxItems.length}` : "";
}

function openLightbox(src, galleryName) {
  const gallery = lightboxGalleries[galleryName];
  activeLightboxItems = gallery?.length ? gallery : [src];
  activeLightboxIndex = Math.max(0, activeLightboxItems.indexOf(src));
  renderLightbox();

  if (typeof lightbox.showModal === "function") {
    lightbox.showModal();
  } else {
    window.open(src, "_blank", "noreferrer");
  }
}

function moveLightbox(direction) {
  if (activeLightboxItems.length <= 1) return;
  activeLightboxIndex =
    (activeLightboxIndex + direction + activeLightboxItems.length) % activeLightboxItems.length;
  renderLightbox();
}

document.querySelectorAll(".work-card[data-target]").forEach((card) => {
  card.addEventListener("click", () => {
    const target = document.querySelector(card.dataset.target);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const video = card.querySelector("video");
  if (video) {
    card.addEventListener("mouseenter", () => video.play().catch(() => {}));
    card.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  }
});

const giftMainVideo = document.getElementById("giftMainVideo");
const giftThumbs = document.querySelectorAll(".gift-thumb");
const giftThumbnails = document.querySelector(".gift-thumbnails");

function resetGiftPreview(video) {
  if (!video) return;
  video.pause();
  video.currentTime = 0;
}

giftThumbnails?.addEventListener("pointerover", (event) => {
  const thumb = event.target.closest(".gift-thumb");
  if (!thumb || !giftThumbnails.contains(thumb) || thumb.dataset.previewing === "true") return;
  thumb.dataset.previewing = "true";
  const preview = thumb.querySelector("video");
  preview?.play().catch(() => {});
});

giftThumbnails?.addEventListener("pointerout", (event) => {
  const thumb = event.target.closest(".gift-thumb");
  if (!thumb || !giftThumbnails.contains(thumb) || thumb.contains(event.relatedTarget)) return;
  delete thumb.dataset.previewing;
  resetGiftPreview(thumb.querySelector("video"));
});

giftThumbnails?.addEventListener("click", (event) => {
  const thumb = event.target.closest(".gift-thumb");
  if (!thumb || !giftThumbnails.contains(thumb) || !giftMainVideo) return;

  event.preventDefault();

  giftThumbs.forEach((item) => {
    item.classList.remove("active");
    item.setAttribute("aria-pressed", "false");
  });

  thumb.classList.add("active");
  thumb.setAttribute("aria-pressed", "true");

  giftMainVideo.pause();
  giftMainVideo.poster = thumb.dataset.poster;
  giftMainVideo.src = thumb.dataset.video;
  giftMainVideo.load();
  giftMainVideo.play().catch(() => {});
});

const workflowImage = document.getElementById("workflowImage");
const workflowStep = document.getElementById("workflowStep");
const workflowTitle = document.getElementById("workflowTitle");
const workflowDesc = document.getElementById("workflowDesc");
const workflowFrame = document.querySelector(".screenshot-frame");
const cadWorkflowImage = document.getElementById("cadWorkflowImage");
const cadShotFrame = document.getElementById("cadShotFrame");
const cadShotStep = document.getElementById("cadShotStep");
const cadShotTitle = document.getElementById("cadShotTitle");
const cadShotDesc = document.getElementById("cadShotDesc");
const shoeWorkflowImage = document.getElementById("shoeWorkflowImage");
const shoeShotFrame = document.getElementById("shoeShotFrame");
const shoeShotStep = document.getElementById("shoeShotStep");
const shoeShotTitle = document.getElementById("shoeShotTitle");
const shoeShotDesc = document.getElementById("shoeShotDesc");

document.querySelectorAll(".ai-evidence-list button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".ai-evidence-list button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    workflowImage.src = button.dataset.shot;
    workflowFrame.dataset.lightbox = button.dataset.shot;
    workflowFrame.dataset.gallery = "ai-collab";
    workflowStep.textContent = button.dataset.step;
    workflowTitle.textContent = button.dataset.title;
    workflowDesc.textContent = button.dataset.desc;
  });
});

document.querySelectorAll(".cad-evidence-list button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".cad-evidence-list button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    cadWorkflowImage.src = button.dataset.shot;
    cadWorkflowImage.alt = button.dataset.title;
    cadWorkflowImage.style.objectPosition = button.dataset.position;
    cadShotFrame.dataset.lightbox = button.dataset.shot;
    cadShotStep.textContent = button.dataset.step;
    cadShotTitle.textContent = button.dataset.title;
    cadShotDesc.textContent = button.dataset.desc;
    cadShotFrame.setAttribute("aria-label", `查看${button.dataset.title}`);
  });
});

document.querySelectorAll(".shoe-evidence-list button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".shoe-evidence-list button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    shoeWorkflowImage.src = button.dataset.shot;
    shoeWorkflowImage.alt = button.dataset.title;
    shoeWorkflowImage.style.objectPosition = button.dataset.position;
    shoeShotFrame.dataset.lightbox = button.dataset.shot;
    shoeShotStep.textContent = button.dataset.step;
    shoeShotTitle.textContent = button.dataset.title;
    shoeShotDesc.textContent = button.dataset.desc;
    shoeShotFrame.setAttribute("aria-label", `查看${button.dataset.title}`);
  });
});

document.querySelectorAll("[data-lightbox]").forEach((trigger) => {
  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const src = trigger.dataset.lightbox;
    if (!src) return;
    openLightbox(src, trigger.dataset.gallery);
  });
});

closeLightbox.addEventListener("click", () => lightbox.close());
lightboxPrev.addEventListener("click", (event) => {
  event.stopPropagation();
  moveLightbox(-1);
});

lightboxNext.addEventListener("click", (event) => {
  event.stopPropagation();
  moveLightbox(1);
});

lightboxZoomIn?.addEventListener("click", (event) => {
  event.stopPropagation();
  setLightboxZoom(lightboxZoom + 0.25);
});

lightboxZoomOut?.addEventListener("click", (event) => {
  event.stopPropagation();
  setLightboxZoom(lightboxZoom - 0.25);
});

lightboxZoomReset?.addEventListener("click", (event) => {
  event.stopPropagation();
  resetLightboxView();
});

lightboxImage.addEventListener("click", (event) => {
  event.stopPropagation();
  setLightboxZoom(lightboxZoom > 1 ? 1 : 1.75);
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.open) lightbox.close();
  if (event.key === "ArrowLeft" && lightbox.open) moveLightbox(-1);
  if (event.key === "ArrowRight" && lightbox.open) moveLightbox(1);
  if ((event.key === "+" || event.key === "=") && lightbox.open) {
    event.preventDefault();
    setLightboxZoom(lightboxZoom + 0.25);
  }
  if (event.key === "-" && lightbox.open) {
    event.preventDefault();
    setLightboxZoom(lightboxZoom - 0.25);
  }
  if (event.key === "0" && lightbox.open) {
    event.preventDefault();
    resetLightboxView();
  }
});

const phoneText = document.getElementById("phoneText");
const togglePhone = document.getElementById("togglePhone");
let phoneVisible = false;

togglePhone.addEventListener("click", () => {
  phoneVisible = !phoneVisible;
  phoneText.textContent = phoneVisible ? "17740677811" : "177****7811";
  togglePhone.textContent = phoneVisible ? "隐藏" : "显示";
});

const revealItems = document.querySelectorAll(
  ".work-card, .case-layout, .workflow-case, .workflow-card, .tools-layout, .about-section"
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(24px)";
  item.style.transition = "opacity .6s ease, transform .6s ease";
  observer.observe(item);
});

const style = document.createElement("style");
style.textContent = `.is-visible{opacity:1!important;transform:translateY(0)!important}`;
document.head.appendChild(style);

const hero = document.querySelector(".hero");
const heroOrnaments = document.querySelector(".hero-ornaments");

if (hero && heroOrnaments && window.matchMedia("(pointer: fine)").matches) {
  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 66;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 51;

    hero.style.setProperty("--bg-x", `${-x * 0.85}px`);
    hero.style.setProperty("--bg-y", `${-y * 0.65}px`);
    hero.style.setProperty("--title-x", `${x * 0.32}px`);
    hero.style.setProperty("--title-y", `${y * 0.28}px`);
    hero.style.setProperty("--ornament-x", `${x * 1.15}px`);
    hero.style.setProperty("--ornament-y", `${y * 1.05}px`);
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--bg-x", "0px");
    hero.style.setProperty("--bg-y", "0px");
    hero.style.setProperty("--title-x", "0px");
    hero.style.setProperty("--title-y", "0px");
    hero.style.setProperty("--ornament-x", "0px");
    hero.style.setProperty("--ornament-y", "0px");
  });
}
