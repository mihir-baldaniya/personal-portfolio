(() => {
  "use strict";

  /* =========================================
     BASIC ELEMENTS
  ========================================= */

  const body = document.body;

  const toggle = document.querySelector(".menu-toggle");

  const menu = document.querySelector(".site-nav");

  const links = [
    ...document.querySelectorAll('.site-nav a[href^="#"]')
  ];

  const sections = [
    ...document.querySelectorAll("main section[id]")
  ];

  const year = document.querySelector("#year");


  /* =========================================
     CURRENT YEAR
  ========================================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =========================================
     MOBILE MENU
  ========================================= */

  const closeMenu = () => {
    body.classList.remove("menu-open");

    toggle?.setAttribute(
      "aria-expanded",
      "false"
    );

    toggle?.setAttribute(
      "aria-label",
      "Open navigation"
    );
  };


  toggle?.addEventListener("click", () => {

    const open =
      body.classList.toggle("menu-open");

    toggle.setAttribute(
      "aria-expanded",
      String(open)
    );

    toggle.setAttribute(
      "aria-label",
      open
        ? "Close navigation"
        : "Open navigation"
    );

  });


  /* Close mobile menu after clicking a link */

  links.forEach((link) => {

    link.addEventListener(
      "click",
      closeMenu
    );

  });


  /* Escape key closes mobile menu */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  /* =========================================
     ACTIVE NAVIGATION SECTION
  ========================================= */

  if (
    "IntersectionObserver" in window &&
    sections.length
  ) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            links.forEach((link) => {

              const href =
                link.getAttribute("href");

              link.classList.toggle(
                "active",
                href === `#${entry.target.id}`
              );

            });

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach((section) => {

      observer.observe(section);

    });

  }


  /* =========================================
     EMPTY HASH LINKS
  ========================================= */

  document
    .querySelectorAll('a[href="#"]')
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          event.preventDefault();

        }
      );

    });


  /* =========================================
     RESIZE
  ========================================= */

  window.addEventListener(
    "resize",
    () => {

      if (window.innerWidth > 700) {
        closeMenu();
      }

    }
  );

})();


/* =========================================
   PORTFOLIO MOTION SYSTEM
========================================= */


/* =========================================
   PAGE LOAD
========================================= */

window.addEventListener(
  "load",
  () => {

    document.body.classList.add(
      "page-ready"
    );

  }
);


/* =========================================
   SCROLL REVEAL
========================================= */

const revealItems =
  document.querySelectorAll(
    `
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
    `
  );


revealItems.forEach(
  (element, index) => {

    element.classList.add("reveal");

    if (index % 3 === 1) {

      element.classList.add(
        "from-left"
      );

    }

    if (index % 3 === 2) {

      element.classList.add(
        "from-right"
      );

    }

  }
);


if (
  "IntersectionObserver" in window
) {

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -50px 0px"
      }
    );


  revealItems.forEach(
    (element) => {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  revealItems.forEach(
    (element) => {

      element.classList.add(
        "visible"
      );

    }
  );

}


/* =========================================
   PROJECT IMAGE MOUSE TILT
   Disabled on mobile/touch
========================================= */

document
  .querySelectorAll(".project-image")
  .forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        if (window.innerWidth <= 700) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
            rect.width -
          0.5;

        const y =
          (event.clientY - rect.top) /
            rect.height -
          0.5;

        card.style.transform =
          `perspective(900px)
           rotateY(${x * 2}deg)
           rotateX(${-y * 2}deg)
           translateY(-6px)`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.transform = "";

      }
    );

  });


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

const header =
  document.querySelector(
    ".site-header"
  );


const updateHeader = () => {

  if (!header) {
    return;
  }

  header.classList.toggle(
    "scrolled",
    window.scrollY > 24
  );

};


updateHeader();


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


/* =========================================
   IMAGE PROTECTION
========================================= */

document
  .querySelectorAll("img")
  .forEach((img) => {

    img.setAttribute(
      "draggable",
      "false"
    );


    img.addEventListener(
      "dragstart",
      (event) => {

        event.preventDefault();

      }
    );


    img.addEventListener(
      "contextmenu",
      (event) => {

        event.preventDefault();

      }
    );

  });


/* =========================================
   BASIC KEYBOARD PROTECTION
========================================= */

document.addEventListener(
  "keydown",
  (event) => {

    /* F12 */

    if (event.key === "F12") {

      event.preventDefault();

      return;
    }


    /* Ctrl + Shift + I */

    if (
      event.ctrlKey &&
      event.shiftKey &&
      event.key.toLowerCase() === "i"
    ) {

      event.preventDefault();

      return;
    }


    /* Ctrl + Shift + J */

    if (
      event.ctrlKey &&
      event.shiftKey &&
      event.key.toLowerCase() === "j"
    ) {

      event.preventDefault();

      return;
    }


    /* Ctrl + U */

    if (
      event.ctrlKey &&
      event.key.toLowerCase() === "u"
    ) {

      event.preventDefault();

      return;
    }


    /* Ctrl + S */

    if (
      event.ctrlKey &&
      event.key.toLowerCase() === "s"
    ) {

      event.preventDefault();

      return;
    }

  }
);


/* =========================================
   PAGE LOADER
   2 SECOND WAIT
   THEN SPLIT FROM CENTER
========================================= */

window.addEventListener(
  "load",
  () => {

    /*
      Supports your loader ID:
      #page-loader
    */

    const loader =
      document.getElementById(
        "page-loader"
      );


    if (!loader) {
      return;
    }


    /*
      Keep loader visible
      for exactly 2 seconds
    */

    setTimeout(
      () => {

        /*
          Start split animation
        */

        loader.classList.add(
          "loader-finish"
        );


        /*
          Wait for the split
          animation to finish
        */

        setTimeout(
          () => {

            document.body.classList.add(
              "page-loaded"
            );


            /*
              Remove loader
              after animation
            */

            loader.remove();

          },
          900
        );

      },
      2000
    );

  }
);


/* =========================================
   CONTACT FORM
   WEB3FORMS
========================================= */

const contactForm =
  document.getElementById(
    "contact-form"
  );


if (contactForm) {

  contactForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      /* =====================================
         GET FORM ELEMENTS
      ===================================== */

      const nameInput =
        document.getElementById("name");

      const emailInput =
        document.getElementById("email");

      const subjectInput =
        document.getElementById("subject");

      const messageInput =
        document.getElementById("message");


      const nameError =
        document.getElementById(
          "name-error"
        );

      const emailError =
        document.getElementById(
          "email-error"
        );

      const subjectError =
        document.getElementById(
          "subject-error"
        );

      const messageError =
        document.getElementById(
          "message-error"
        );


      const formSuccess =
        document.getElementById(
          "form-success"
        );


      const submitButton =
        contactForm.querySelector(
          'button[type="submit"]'
        );


      /* =====================================
         GET VALUES
      ===================================== */

      const name =
        nameInput.value.trim();

      const email =
        emailInput.value.trim();

      const subject =
        subjectInput.value.trim();

      const message =
        messageInput.value.trim();


      /* =====================================
         CLEAR OLD ERRORS
      ===================================== */

      nameError.textContent = "";

      emailError.textContent = "";

      subjectError.textContent = "";

      messageError.textContent = "";

      formSuccess.textContent = "";


      nameInput.style.borderColor = "";

      emailInput.style.borderColor = "";

      subjectInput.style.borderColor = "";

      messageInput.style.borderColor = "";


      let valid = true;


      /* =====================================
         NAME VALIDATION
      ===================================== */

      if (name === "") {

        nameError.textContent =
          "Please enter your name.";

        nameInput.style.borderColor =
          "var(--danger)";

        valid = false;

      }


      /* =====================================
         EMAIL VALIDATION
      ===================================== */

      if (email === "") {

        emailError.textContent =
          "Please enter your email.";

        emailInput.style.borderColor =
          "var(--danger)";

        valid = false;

      } else {

        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
          !emailRegex.test(email)
        ) {

          emailError.textContent =
            "Please enter a valid email address.";

          emailInput.style.borderColor =
            "var(--danger)";

          valid = false;

        }

      }


      /* =====================================
         SUBJECT VALIDATION
      ===================================== */

      if (subject === "") {

        subjectError.textContent =
          "Please enter a subject.";

        subjectInput.style.borderColor =
          "var(--danger)";

        valid = false;

      }


      /* =====================================
         MESSAGE VALIDATION
      ===================================== */

      if (message === "") {

        messageError.textContent =
          "Please enter your message.";

        messageInput.style.borderColor =
          "var(--danger)";

        valid = false;

      }


      /* =====================================
         STOP IF INVALID
      ===================================== */

      if (!valid) {

        formSuccess.textContent =
          "Please fill in all fields.";

        return;

      }


      /* =====================================
         SENDING STATE
      ===================================== */

      submitButton.disabled = true;

      submitButton.textContent =
        "Sending...";


      /* =====================================
         CREATE FORMDATA
      ===================================== */

      const formData =
        new FormData();


      /*
        IMPORTANT:
        Replace this with your
        NEW Web3Forms access key.
      */

      formData.append(
        "access_key",
        "ed647462-3d28-49dc-b84d-a028d55f69c2"
      );


      formData.append(
        "from_name",
        "Mihir Baldaniya Portfolio"
      );


      formData.append(
        "name",
        name
      );


      formData.append(
        "email",
        email
      );


      formData.append(
        "subject",
        subject
      );


      formData.append(
        "message",
        message
      );


      /* =====================================
         SEND TO WEB3FORMS
      ===================================== */

      try {

        const response =
          await fetch(
            "https://api.web3forms.com/submit",
            {
              method: "POST",
              body: formData
            }
          );


        const result =
          await response.json();


        console.log(
          "Web3Forms response:",
          result
        );


        /* ===================================
           SUCCESS
        =================================== */

        if (result.success) {

          formSuccess.textContent =
            "Message sent successfully! Thank you.";


          formSuccess.classList.add(
            "show"
          );


          contactForm.reset();


          /*
            Clear borders after successful
            submission.
          */

          nameInput.style.borderColor = "";

          emailInput.style.borderColor = "";

          subjectInput.style.borderColor = "";

          messageInput.style.borderColor = "";


        } else {

          /* ===============================
             WEB3FORMS ERROR
          =============================== */

          formSuccess.textContent =
            result.message ||
            "Unable to send message. Please try again.";


          console.error(
            "Web3Forms error:",
            result
          );

        }


      } catch (error) {

        /* ===============================
           NETWORK ERROR
        =============================== */

        console.error(
          "Contact form error:",
          error
        );


        formSuccess.textContent =
          "Something went wrong. Please try again.";

      }


      /* =====================================
         RESTORE BUTTON
      ===================================== */

      submitButton.disabled = false;

      submitButton.textContent =
        "Send Message ↗";

    }
  );


  /* =========================================
     CLEAR ERROR WHILE TYPING
  ========================================= */

  const formFields = [
    "name",
    "email",
    "subject",
    "message"
  ];


  formFields.forEach(
    (id) => {

      const input =
        document.getElementById(id);

      const error =
        document.getElementById(
          `${id}-error`
        );


      if (!input) {
        return;
      }


      input.addEventListener(
        "input",
        () => {

          input.style.borderColor = "";


          if (error) {
            error.textContent = "";
          }


          const formSuccess =
            document.getElementById(
              "form-success"
            );


          if (formSuccess) {
            formSuccess.textContent = "";
          }

        }
      );

    }
  );

}


/* =========================================
   END OF SCRIPT
========================================= */



// music 
/* =========================================
   BACKGROUND MUSIC
   Starts after page loader finishes
========================================= */

const backgroundMusic =
  document.getElementById("background-music");

if (backgroundMusic) {

  // Background music volume
  backgroundMusic.volume = 0.15;


  window.addEventListener("load", () => {

    /*
      Loader:
      2000ms = waiting time
      900ms  = split animation

      Total = 2900ms
    */

    setTimeout(async () => {

      try {

        await backgroundMusic.play();

        console.log(
          ""
        );

      } catch (error) {

        console.log(
          ""
        );


        /*
          If browser blocks autoplay,
          start automatically after the
          visitor's first interaction.

          No button is displayed.
        */

        const startMusic = async () => {

          try {

            await backgroundMusic.play();

            console.log(
              "Background music started."
            );

          } catch (error) {

            console.log(
              "Unable to start background music."
            );

          }

        };


        document.addEventListener(
          "click",
          startMusic,
          { once: true }
        );


        document.addEventListener(
          "touchstart",
          startMusic,
          { once: true }
        );


        document.addEventListener(
          "keydown",
          startMusic,
          { once: true }
        );

      }

    }, 2900);

  });

}
// music 

