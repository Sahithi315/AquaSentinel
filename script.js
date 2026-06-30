/* ==========================================================================
   AquaSentinel - Interactive Scripting
   Developed by Team Tarani
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Mobile Menu Navigation Toggle
  // ==========================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu on link click (mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // ==========================================
  // 2. Sticky Header Scroll Indicator & Active Link Highlight
  // ==========================================
  const navbarContainer = document.querySelector('.navbar-container');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Navbar background scroll trigger
    if (window.scrollY > 50) {
      navbarContainer.classList.add('scrolled');
    } else {
      navbarContainer.classList.remove('scrolled');
    }

    // Scroll active link highlight
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 3. Scroll Triggered Elements Observer
  // ==========================================
  const animatedElements = document.querySelectorAll('.scroll-animate');

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });

  // ==========================================
  // 4. Interactive Distress Simulator Widget
  // ==========================================
  const simulateBtn = document.getElementById('simulate-distress');
  const simStatus = document.getElementById('sim-status');
  const boatElement = document.querySelector('.boat-svg');

  let simulationStep = 0;
  // Steps: 
  // 0: Normal state
  // 1: Anomaly 1/3 (yellow warning)
  // 2: Anomaly 2/3 (yellow warning + sway)
  // 3: Anomaly 3/3 + Danger (red flashing warning + capsize)

  if (simulateBtn && simStatus && boatElement) {
    // Add default boat sway animation class
    boatElement.classList.add('sim-swaying');

    simulateBtn.addEventListener('click', () => {
      simulationStep = (simulationStep + 1) % 4;

      if (simulationStep === 0) {
        // Reset to Normal
        simStatus.className = 'status-indicator normal';
        simStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Status: Normal';
        boatElement.className = 'boat-svg sim-swaying';
        boatElement.style.animationName = 'sway-boat';
        boatElement.style.animationDuration = '2s';
        simulateBtn.textContent = 'Simulate Anomaly';
        simulateBtn.className = 'btn btn-primary btn-sm btn-simulate';
      } else if (simulationStep === 1) {
        // Anomaly 1
        simStatus.className = 'status-indicator anomaly-1';
        simStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Anomaly (1/3)';
        boatElement.style.animationDuration = '1.2s';
        simulateBtn.textContent = 'Trigger Anomaly 2';
      } else if (simulationStep === 2) {
        // Anomaly 2
        simStatus.className = 'status-indicator anomaly-2';
        simStatus.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Anomaly (2/3)';
        boatElement.className = 'boat-svg'; // Force animation retrigger
        void boatElement.offsetWidth; // Reflow
        boatElement.className = 'boat-svg sim-swaying';
        boatElement.style.animationName = 'sway-rough';
        boatElement.style.animationDuration = '0.8s';
        simulateBtn.textContent = 'Trigger Capsize';
      } else if (simulationStep === 3) {
        // Anomaly 3 / Danger
        simStatus.className = 'status-indicator anomaly-3';
        simStatus.innerHTML = '<i class="fa-solid fa-radiation"></i> DANGER DETECTED !!!';
        boatElement.className = 'boat-svg sim-capsize';
        simulateBtn.textContent = 'Reset Simulation';
        simulateBtn.className = 'btn btn-secondary btn-sm btn-simulate';
      }
    });
  }

  // ==========================================
  // 5. Cost Comparison Slider
  // ==========================================
  const costSlider = document.getElementById('cost-slider');
  const priceTraditional = document.getElementById('price-traditional');
  const priceAqua = document.getElementById('price-aqua');
  const savingsAmount = document.getElementById('savings-amount');

  const pricingData = {
    1: { traditional: 30000, aqua: 750 },
    2: { traditional: 300000, aqua: 7500 },
    3: { traditional: 1500000, aqua: 37500 }
  };

  function formatRupees(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  if (costSlider && priceTraditional && priceAqua && savingsAmount) {
    costSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      const data = pricingData[val];
      
      priceTraditional.textContent = formatRupees(data.traditional);
      priceAqua.textContent = formatRupees(data.aqua);
      
      const savings = data.traditional - data.aqua;
      savingsAmount.textContent = formatRupees(savings);
    });
  }

  // ==========================================
  // 6. Lightbox Overlay for Image Gallery
  // ==========================================
  const galleryContainers = document.querySelectorAll('.gallery-img-container');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg && lightboxCaption && lightboxClose) {
    galleryContainers.forEach(container => {
      container.addEventListener('click', () => {
        const img = container.querySelector('img');
        const parentItem = container.closest('.gallery-item');
        const titleText = parentItem ? parentItem.querySelector('h3').textContent : '';
        const captionText = parentItem ? parentItem.querySelector('p').textContent : '';

        if (img) {
          lightboxImg.src = img.src;
          lightboxCaption.innerHTML = `<strong>${titleText}</strong> - ${captionText}`;
          lightbox.classList.add('show');
          document.body.style.overflow = 'hidden'; // Lock background scroll
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('show');
      document.body.style.overflow = ''; // Restore background scroll
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox on click outside image
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        // Only close if click is on overlay background, not on the image itself
        if (e.target !== lightboxImg) {
          closeLightbox();
        }
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });
  }

});
