/**
 * AIM INVESTIGATION AGENCY PRIVATE LIMITED
 * Main Interactive JavaScript Engine
 */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Sticky Header Shrink
  const mainHeader = document.querySelector(".main-header");
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      if (mainHeader) mainHeader.classList.add("scrolled");
    } else {
      if (mainHeader) mainHeader.classList.remove("scrolled");
    }

    if (scrollTopBtn) {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  });

  // Scroll To Top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 2. Mobile Drawer Toggle
  const mobileToggleBtn = document.getElementById("mobileToggleBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");

  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener("click", function () {
      mobileDrawer.classList.toggle("open");
      const isOpen = mobileDrawer.classList.contains("open");
      mobileToggleBtn.setAttribute("aria-expanded", isOpen);
    });

    // Close on link click
    const mobileLinks = mobileDrawer.querySelectorAll("a, button");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileDrawer.classList.remove("open");
      });
    });
  }

  // 3. Investigation Intake Modal
  const modalOverlay = document.getElementById("investigationModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const openModalBtns = document.querySelectorAll("[data-open-modal]");

  function openModal(serviceName) {
    if (modalOverlay) {
      modalOverlay.classList.add("open");
      document.body.style.overflow = "hidden";

      if (serviceName) {
        const modalSelect = document.getElementById("modalInvestigationType");
        if (modalSelect) {
          modalSelect.value = serviceName;
        }
      }
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove("open");
      document.body.style.overflow = "auto";
    }
  }

  openModalBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const service = btn.getAttribute("data-service") || "";
      openModal(service);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  // Escape key closes modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalOverlay && modalOverlay.classList.contains("open")) {
      closeModal();
    }
  });

  // 4. Form Validation Engine
  function setupFormValidation(formId, successBoxId) {
    const form = document.getElementById(formId);
    const successBox = document.getElementById(successBoxId);

    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;

      // Inputs
      const fullName = form.querySelector('[name="fullName"]');
      const phone = form.querySelector('[name="phone"]');
      const email = form.querySelector('[name="email"]');
      const message = form.querySelector('[name="message"]');
      const terms = form.querySelector('[name="terms"]');

      // Clear previous error states
      form.querySelectorAll(".form-input, .form-textarea").forEach((el) => el.classList.remove("error"));
      form.querySelectorAll(".error-msg").forEach((el) => el.classList.remove("visible"));

      // Full Name Validation
      if (fullName && !fullName.value.trim()) {
        showError(fullName, "Full name is required.");
        isValid = false;
      }

      // Phone Validation
      if (phone) {
        const phoneVal = phone.value.trim();
        if (!phoneVal) {
          showError(phone, "Phone number is required.");
          isValid = false;
        } else if (!/^[0-9+\s-]{10,15}$/.test(phoneVal)) {
          showError(phone, "Please enter a valid 10-digit contact number.");
          isValid = false;
        }
      }

      // Email Validation
      if (email) {
        const emailVal = email.value.trim();
        if (!emailVal) {
          showError(email, "Official email is required.");
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          showError(email, "Please enter a valid email address.");
          isValid = false;
        }
      }

      // Message Validation
      if (message) {
        const msgVal = message.value.trim();
        if (!msgVal) {
          showError(message, "Please provide case scope details.");
          isValid = false;
        } else if (msgVal.length < 15) {
          showError(message, "Please provide at least 15 characters of scope description.");
          isValid = false;
        }
      }

      // Terms Validation
      if (terms && !terms.checked) {
        const termsErr = form.querySelector("#termsError");
        if (termsErr) {
          termsErr.textContent = "Please acknowledge our corporate confidentiality policy.";
          termsErr.classList.add("visible");
        }
        isValid = false;
      }

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const origBtnText = submitBtn ? submitBtn.innerHTML : "";

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <span style="display:inline-block; width:14px; height:14px; border:2px solid #fff; border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite; margin-right:8px;"></span>
            Encrypting & Sending Enquiry...
          `;
        }

        setTimeout(function () {
          form.style.display = "none";
          if (successBox) {
            successBox.classList.add("visible");
            const nameTarget = successBox.querySelector(".submitted-name");
            if (nameTarget && fullName) {
              nameTarget.textContent = fullName.value.trim();
            }
          }
        }, 800);
      }
    });

    function showError(inputEl, msg) {
      inputEl.classList.add("error");
      const errEl = inputEl.parentElement.querySelector(".error-msg");
      if (errEl) {
        errEl.textContent = msg;
        errEl.classList.add("visible");
      }
    }
  }

  // Initialize both forms
  setupFormValidation("mainContactForm", "mainContactSuccess");
  setupFormValidation("modalContactForm", "modalContactSuccess");

  // Dynamic Year in Footer
  const yearEls = document.querySelectorAll(".current-year");
  const currentYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = currentYear;
  });
});
