/**
 * Portfolio Website - JavaScript
 * Handles navigation, scroll animations, form interactions, and DOM manipulations
 */

// ===========================
// MOBILE NAVIGATION
// ===========================

/**
 * Initialize mobile hamburger menu functionality
 */
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (!hamburger) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

/**
 * Intersection Observer for scroll-triggered animations
 * Adds animation classes to elements as they come into view
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation based on element type
        if (entry.target.classList.contains("skill-card")) {
          entry.target.classList.add("slide-in-up");
          entry.target.style.animationDelay = `${Array.from(entry.target.parentChildren).indexOf(entry.target) * 0.1}s`;
        } else if (entry.target.classList.contains("project-card")) {
          entry.target.classList.add("slide-in-up");
          entry.target.style.animationDelay = `${Array.from(entry.target.parentChildren).indexOf(entry.target) * 0.1}s`;
        } else if (entry.target.classList.contains("goal-item")) {
          entry.target.classList.add("slide-in-left");
          entry.target.style.animationDelay = `${Array.from(entry.target.parentChildren).indexOf(entry.target) * 0.1}s`;
        } else {
          entry.target.classList.add("fade-in");
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const elementsToObserve = document.querySelectorAll(
    "section, .skill-card, .project-card, .goal-item",
  );
  elementsToObserve.forEach((el) => observer.observe(el));
}

// ===========================
// PROGRESS BAR ANIMATION
// ===========================

/**
 * Animate progress bars when they come into view
 */
function initProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.style.width;
          entry.target.style.width = "0";

          // Trigger animation
          setTimeout(() => {
            entry.target.style.width = width;
          }, 100);

          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  progressBars.forEach((bar) => progressObserver.observe(bar));
}

// ===========================
// FORM HANDLING
// ===========================

/**
 * Handle contact form submission
 * Validates input and provides user feedback
 */
function initContactForm() {
  const form = document.getElementById("contactForm");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate form
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    // Show success message (since there's no backend)
    showNotification("Message received! I'll get back to you soon.", "success");

    // Reset form
    form.reset();

    // Log form data (in a real app, this would be sent to a server)
    console.log({
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });
  });
}

/**
 * Display notification messages to the user
 * @param {string} message - The message to display
 * @param {string} type - 'success' or 'error'
 */
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === "success" ? "#00d4ff" : "#ff006e"};
        color: #0a0e27;
        border-radius: 8px;
        font-weight: 600;
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    `;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===========================
// FLOATING LABEL INPUTS
// ===========================

/**
 * Initialize floating label behavior for form inputs
 * Labels move up when input is focused or has value
 */
function initFloatingLabels() {
  const inputs = document.querySelectorAll(
    ".form-group input, .form-group textarea",
  );

  inputs.forEach((input) => {
    // Check on load if input has value
    if (input.value) {
      input.parentElement.classList.add("active");
    }

    // Add active class on focus
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("active");
    });

    // Remove active class if empty on blur
    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("active");
      }
    });

    // Keep active class while typing
    input.addEventListener("input", () => {
      if (input.value) {
        input.parentElement.classList.add("active");
      } else {
        input.parentElement.classList.remove("active");
      }
    });
  });
}

// ===========================
// SMOOTH SCROLL OFFSET
// ===========================

/**
 * Adjust smooth scroll to account for fixed navbar
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if href is just '#'
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const navHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===========================
// ACTIVE NAV LINK HIGHLIGHTING
// ===========================

/**
 * Highlight the active navigation link based on scroll position
 */
function initActiveNavLink() {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });
}

// ===========================
// PARALLAX EFFECT
// ===========================

/**
 * Add subtle parallax effect to hero section
 */
function initParallax() {
  const heroSection = document.querySelector(".hero");

  if (!heroSection) return;

  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    heroSection.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  });
}

// ===========================
// TYPING ANIMATION
// ===========================

/**
 * Add typing animation to hero title
 */
function initTypingAnimation() {
  const titleLines = document.querySelectorAll(".title-line");

  titleLines.forEach((line, index) => {
    const text = line.textContent;
    line.textContent = "";

    let charIndex = 0;
    const speed = 50;

    function typeCharacter() {
      if (charIndex < text.length) {
        line.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeCharacter, speed);
      }
    }

    // Start typing after a delay
    setTimeout(typeCharacter, index * 200);
  });
}

// ===========================
// BUTTON RIPPLE EFFECT
// ===========================

/**
 * Add ripple effect to buttons on click
 */
function initButtonRipple() {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ===========================
// INITIALIZATION
// ===========================

/**
 * Initialize all features when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio website initialized");

  initMobileMenu();
  initScrollAnimations();
  initProgressBars();
  initContactForm();
  initFloatingLabels();
  initSmoothScroll();
  initActiveNavLink();
  initParallax();
  initTypingAnimation();
  initButtonRipple();
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Debounce function to limit function calls during scroll/resize events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Add ripple animation keyframes to stylesheet
 */
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .nav-link.active {
        color: #00d4ff;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(9px, 9px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(9px, -9px);
    }

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background: rgba(10, 14, 39, 0.95);
        padding: 20px;
        gap: 10px;
    }

    .form-group.active label {
        top: -10px;
        left: 16px;
        background: #0a0e27;
        padding: 0 8px;
        color: #00d4ff;
        font-size: 12px;
    }
`;
document.head.appendChild(style);
