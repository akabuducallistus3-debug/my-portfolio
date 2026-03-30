/* ============================================
   PORTFOLIO JAVASCRIPT
   Interactive Features & Animations
   ============================================ */

// ============================================
// 1. NAVIGATION & HAMBURGER MENU
// ============================================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// Toggle hamburger menu
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-container")) {
    navLinks.classList.remove("active");
  }
});

// ============================================
// 2. SMOOTH SCROLLING & ACTIVE NAV LINK
// ============================================

window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

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

// ============================================
// 3. SCROLL ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Add animation classes based on element type
      if (entry.target.classList.contains("skill-card")) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
      } else if (entry.target.classList.contains("project-card")) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
      } else if (entry.target.classList.contains("approach-card")) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
      } else if (entry.target.classList.contains("timeline-item")) {
        entry.target.style.animation = "fadeInUp 0.6s ease-out forwards";
      }
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animatable elements
document
  .querySelectorAll(
    ".skill-card, .project-card, .approach-card, .timeline-item",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// ============================================
// 4. FORM HANDLING
// ============================================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

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

  // Show success message
  showNotification(
    "Message sent successfully! I'll get back to you soon.",
    "success",
  );

  // Reset form
  contactForm.reset();

  // Log form data (in a real app, this would be sent to a server)
  console.log({
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// 5. FLOATING LABELS
// ============================================

const formInputs = document.querySelectorAll(".form-input");

formInputs.forEach((input) => {
  // Add placeholder to trigger floating label
  if (!input.placeholder) {
    input.placeholder = " ";
  }

  // Handle focus and blur events
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      input.parentElement.classList.remove("focused");
    }
  });
});

// ============================================
// 6. PROGRESS BAR ANIMATIONS
// ============================================

const animateProgressBars = () => {
  const progressBars = document.querySelectorAll(".progress-bar");

  const progressObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".progress-fill");
          const width = fill.style.width;
          fill.style.width = "0";
          setTimeout(() => {
            fill.style.width = width;
          }, 100);
          progressObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  progressBars.forEach((bar) => {
    progressObserver.observe(bar);
  });
};

// Call progress bar animation on page load
window.addEventListener("load", animateProgressBars);

// ============================================
// 7. NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === "success" ? "#00d084" : type === "error" ? "#ff006e" : "#00d4ff"};
        color: ${type === "success" ? "#0a0e27" : "#fff"};
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

  document.body.appendChild(notification);

  // Remove notification after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideInLeft 0.3s ease-out reverse";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// ============================================
// 8. SMOOTH SCROLL BEHAVIOR
// ============================================

// Enhance smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ============================================
// 9. PARALLAX EFFECT (OPTIONAL)
// ============================================

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".grid-background");

  parallaxElements.forEach((element) => {
    element.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
});

// ============================================
// 10. DYNAMIC YEAR IN FOOTER
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  const footerText = document.querySelector(".footer p");
  if (footerText) {
    footerText.textContent = `© ${year} Developer Portfolio. Crafted with passion for engineering solutions.`;
  }
});

// ============================================
// 11. KEYBOARD NAVIGATION
// ============================================

document.addEventListener("keydown", (e) => {
  // Close menu on Escape
  if (e.key === "Escape") {
    document.querySelector(".nav-links").classList.remove("active");
  }

  // Navigate sections with arrow keys (optional)
  if (e.key === "ArrowDown") {
    window.scrollBy(0, 100);
  } else if (e.key === "ArrowUp") {
    window.scrollBy(0, -100);
  }
});

// ============================================
// 12. PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images (if added in future)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ============================================
// 13. ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add focus visible styles
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("keyboard-nav");
  }
});

document.addEventListener("mousedown", () => {
  document.body.classList.remove("keyboard-nav");
});

// ============================================
// 14. UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
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

// Get element position
function getElementPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset,
    width: rect.width,
    height: rect.height,
  };
}

// ============================================
// 15. INITIALIZATION
// ============================================

// Initialize on page load
window.addEventListener("load", () => {
  console.log("Portfolio loaded successfully!");

  // Add any additional initialization code here
  // For example, you could load data from an API or initialize third-party libraries
});

// Log page visibility changes (useful for analytics)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("Page hidden");
  } else {
    console.log("Page visible");
  }
});
