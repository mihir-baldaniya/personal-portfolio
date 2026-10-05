/* ==========================================================================
   Mihir Baldaniya – Portfolio Script
   --------------------------------------------------------------------------
   1.  Element references
   2.  Footer year
   3.  Mobile menu
   4.  Active navigation link
   5.  Empty "#" links
   6.  Page load & loader
   7.  Scroll reveal animation
   8.  Project image tilt
   9.  Header scroll effect
   10. Image protection
   11. Keyboard shortcut blocking
   12. Contact form (Web3Forms)
   ========================================================================== */

(() => {
  "use strict";

  /* ------------------------------------------------------------------------
     1. Element references
     ------------------------------------------------------------------------ */
  const body = document.body;
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = [...document.querySelectorAll("main section[id]")];

  /* ------------------------------------------------------------------------
     2. Footer year
     ------------------------------------------------------------------------ */
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------------
     3. Mobile menu
     ------------------------------------------------------------------------ */
  // Close the menu and reset the button's accessibility labels
  const closeMenu = () => {
    body.classList.remove("menu-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Open navigation");
  };

  // Open / close when the hamburger button is clicked
  toggle?.addEventListener("click", () => {
    const isOpen = body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  // Close after choosing a link
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  // Close with the Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  // Close when the screen grows past the mobile breakpoint (700px, same as CSS)
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });

  /* ------------------------------------------------------------------------
     4. Active navigation link
     Highlights the nav link of the section currently in the middle of the screen.
     ------------------------------------------------------------------------ */
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      // Only count a section as "current" when it crosses the middle band of the viewport
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ------------------------------------------------------------------------
     5. Empty "#" links
     Stops placeholder links from jumping to the top of the page.
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });

  /* ------------------------------------------------------------------------
     6. Page load & loader
     Once everything has loaded: fade the page in, keep the loader on screen
     for 2 seconds, split it open, then remove it and unlock scrolling.
     ------------------------------------------------------------------------ */
  const LOADER_DELAY = 2000; // how long the loader stays visible (ms)
  const LOADER_ANIMATION = 900; // must match the panel transition in the CSS (ms)

  window.addEventListener("load", () => {
    body.classList.add("page-ready");

    const loader = document.getElementById("page-loader");
    if (!loader) return;

    setTimeout(() => {
      // Start the split-open animation
      loader.classList.add("loader-finish");
      // After the animation ends, unlock scrolling and remove the loader
      setTimeout(() => {
        body.classList.add("page-loaded");
        loader.remove();
      }, LOADER_ANIMATION);
    }, LOADER_DELAY);
  });

  /* ------------------------------------------------------------------------
     7. Scroll reveal animation
     Adds the .reveal class to the listed elements and .visible once they scroll
     into view. Every 2nd item slides in from the left, every 3rd from the right.
     ------------------------------------------------------------------------ */
  const revealItems = document.querySelectorAll(`
    .section-title,
    .statement,
    .copy-column,
    .project,
    .skill-block,
    .tech-section,
    .education,
    .resume-item,
    .resume-download,
    .contact-intro,
    .contact-layout
  `);

  revealItems.forEach((element, index) => {
    element.classList.add("reveal");
    if (index % 3 === 1) element.classList.add("from-left");
    if (index % 3 === 2) element.classList.add("from-right");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          // Animate only once
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );
    revealItems.forEach((element) => revealObserver.observe(element));
  } else {
    // Very old browsers: skip the animation and show everything
    revealItems.forEach((element) => element.classList.add("visible"));
  }

  /* ------------------------------------------------------------------------
     8. Project image tilt
     Small 3D tilt that follows the mouse. Disabled on small screens.
     ------------------------------------------------------------------------ */
  document.querySelectorAll(".project-image").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      if (window.innerWidth <= 700) return;
      const rect = card.getBoundingClientRect();
      // Mouse position inside the card, from -0.5 (left/top) to 0.5 (right/bottom)
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 2}deg) rotateX(${-y * 2}deg) translateY(-6px)`;
    });

    // Return to the normal (CSS-controlled) position
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  /* ------------------------------------------------------------------------
     9. Header scroll effect
     Adds .scrolled to the header after the page is scrolled a little.
     ------------------------------------------------------------------------ */
  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 24);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* ------------------------------------------------------------------------
     10. Image protection
     Blocks dragging and the right-click menu on images.
     ------------------------------------------------------------------------ */
  document.querySelectorAll("img").forEach((img) => {
    img.setAttribute("draggable", "false");
    img.addEventListener("dragstart", (event) => event.preventDefault());
    img.addEventListener("contextmenu", (event) => event.preventDefault());
  });

  /* ------------------------------------------------------------------------
     11. Keyboard shortcut blocking
     Blocks dev-tools, view-source and save shortcuts. This is only a basic
     deterrent: it cannot truly protect the page, since anyone can still open
     dev tools from the browser menu.
     ------------------------------------------------------------------------ */
  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    const ctrlShift = event.ctrlKey && event.shiftKey;

    const isBlocked =
      key === "f12" || // dev tools
      (ctrlShift && (key === "i" || key === "j")) || // Ctrl+Shift+I / J (dev tools, console)
      (event.ctrlKey && (key === "u" || key === "s")); // Ctrl+U (view source) / Ctrl+S (save)

    if (isBlocked) event.preventDefault();
  });

  /* ------------------------------------------------------------------------
     12. Contact form (Web3Forms)
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    const WEB3FORMS_URL = "https://api.web3forms.com/submit";
    const WEB3FORMS_KEY = "ed647462-3d28-49dc-b84d-a028d55f69c2";
    const SUBMIT_LABEL = "Send Message ↗";
    const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.getElementById("form-success");

    // Each field: its input, its error element and a validator.
    // A validator returns an error message, or "" when the value is fine.
    const fields = {
      name: {
        input: document.getElementById("name"),
        error: document.getElementById("name-error"),
        validate: (value) => (value ? "" : "Please enter your name."),
      },
      email: {
        input: document.getElementById("email"),
        error: document.getElementById("email-error"),
        validate: (value) => {
          if (!value) return "Please enter your email.";
          if (!EMAIL_PATTERN.test(value)) return "Please enter a valid email address.";
          return "";
        },
      },
      subject: {
        input: document.getElementById("subject"),
        error: document.getElementById("subject-error"),
        validate: (value) => (value ? "" : "Please enter a subject."),
      },
      message: {
        input: document.getElementById("message"),
        error: document.getElementById("message-error"),
        validate: (value) => (value ? "" : "Please enter your message."),
      },
    };

    // Remove the red border and error text from one field
    const clearFieldError = ({ input, error }) => {
      input.style.borderColor = "";
      error.textContent = "";
    };

    // Show an error under the field and turn its border red
    const showFieldError = ({ input, error }, message) => {
      error.textContent = message;
      input.style.borderColor = "var(--danger)";
    };

    // Validate every field. Returns true only if all of them are valid.
    const validateForm = () => {
      let isValid = true;
      Object.values(fields).forEach((field) => {
        const message = field.validate(field.input.value.trim());
        if (message) {
          showFieldError(field, message);
          isValid = false;
        }
      });
      return isValid;
    };

    // Send the form data to Web3Forms and report the result to the visitor
    const sendMessage = async () => {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("from_name", "Mihir Baldaniya Portfolio");
      Object.entries(fields).forEach(([name, { input }]) => {
        formData.append(name, input.value.trim());
      });

      try {
        const response = await fetch(WEB3FORMS_URL, { method: "POST", body: formData });
        const result = await response.json();

        if (result.success) {
          formStatus.textContent = "Message sent successfully! Thank you.";
          formStatus.classList.add("show");
          contactForm.reset();
        } else {
          formStatus.textContent = result.message || "Unable to send message. Please try again.";
          console.error("Web3Forms error:", result);
        }
      } catch (error) {
        // Network problem or invalid response
        console.error("Contact form error:", error);
        formStatus.textContent = "Something went wrong. Please try again.";
      }
    };

    // Submit handler
    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Reset the previous state
      Object.values(fields).forEach(clearFieldError);
      formStatus.textContent = "";

      if (!validateForm()) {
        formStatus.textContent = "Please fill in all fields.";
        return;
      }

      // Disable the button while sending to avoid double submits
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";

      await sendMessage();

      submitButton.disabled = false;
      submitButton.textContent = SUBMIT_LABEL;
    });

    // Clear a field's error (and the status message) as soon as the visitor types
    Object.values(fields).forEach((field) => {
      field.input.addEventListener("input", () => {
        clearFieldError(field);
        formStatus.textContent = "";
      });
    });
  }
})();
