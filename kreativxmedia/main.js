/**
 * KREATIVX MEDIA — INTERACTIVE JAVASCRIPT CORE
 */

// 1. Force page to ALWAYS start from the beginning (0, 0) on every refresh/reload
if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Immediate scroll reset on script parse
window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('pageshow', (event) => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
});

window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Ensure top position on DOM ready
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* --------------------------------------------------------------------------
     1. Custom Interactive Cursor
     -------------------------------------------------------------------------- */
  const cursor = document.getElementById('customCursor');
  const follower = document.getElementById('customCursorFollower');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;
    let isCursorVisible = false;

    // Track mouse coordinates directly
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isCursorVisible) {
        followerX = mouseX;
        followerY = mouseY;
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        cursor.style.opacity = '1';
        follower.style.opacity = '1';
        isCursorVisible = true;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      follower.style.opacity = '0';
      isCursorVisible = false;
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      follower.style.opacity = '1';
      isCursorVisible = true;
    });

    // Single unified GPU-accelerated requestAnimationFrame render loop
    function updateCursor() {
      if (isCursorVisible) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        
        followerX += (mouseX - followerX) * 0.22;
        followerY += (mouseY - followerY) * 0.22;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
      }
      requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    // Efficient Event Delegation for hover effects
    const hoverElements = 'a, button, .service-card, .project-card, input, select, textarea, .filter-btn, .monolith-card, .brand-logo, .furnio-nav-item, .furnio-card, .tab-btn, .f-card-book-btn, .f-cat-pill, .b-dot';
    document.addEventListener('mouseover', (e) => {
      if (e.target && e.target.closest && e.target.closest(hoverElements)) {
        document.body.classList.add('cursor-hover');
      }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
      if (e.target && e.target.closest && e.target.closest(hoverElements)) {
        document.body.classList.remove('cursor-hover');
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     2. Cinematic Color Transformation Manifesto Scroll Engine (High Refresh Rate)
     -------------------------------------------------------------------------- */
  const manifestoTrack = document.getElementById('about') || document.getElementById('colorManifesto');
  const manifestoWhiteLayer = document.getElementById('manifestoWhiteLayer');
  const manifestoRedLayer = document.getElementById('manifestoRedLayer');

  if (manifestoTrack && manifestoWhiteLayer && manifestoRedLayer) {
    let trackTop = 0;
    let trackHeight = 0;
    let isScheduled = false;

    function measureTrack() {
      const rect = manifestoTrack.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      trackTop = rect.top + scrollTop;
      trackHeight = manifestoTrack.offsetHeight - window.innerHeight;
    }

    measureTrack();
    window.addEventListener('resize', measureTrack, { passive: true });
    window.addEventListener('orientationchange', measureTrack, { passive: true });
    window.addEventListener('load', measureTrack, { passive: true });

    function updateManifestoFrame() {
      isScheduled = false;
      if (trackHeight <= 0) return;

      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const scrolled = currentScroll - trackTop;
      const progress = Math.min(Math.max(scrolled / trackHeight, 0), 1);

      // Dynamic organic wave harmonics
      const wave1 = Math.sin(progress * Math.PI * 4) * 2.8;
      const wave2 = Math.cos(progress * Math.PI * 3.5) * 3.4;
      const wave3 = Math.sin(progress * Math.PI * 5) * 2.5;

      // Phase 1 to Phase 3: White Liquid rises (progress: 0.0 -> 0.55)
      const whiteProgress = Math.min(progress / 0.55, 1);
      const whiteY = (1 - whiteProgress) * 100; // 100% -> 0%

      if (whiteProgress <= 0.001) {
        manifestoWhiteLayer.style.clipPath = `polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)`;
      } else if (whiteProgress >= 0.999) {
        manifestoWhiteLayer.style.clipPath = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`;
      } else {
        const p0 = Math.max(whiteY, 0);
        const p1 = Math.max(whiteY - 2.2 + wave1, 0);
        const p2 = Math.max(whiteY + 2.8 + wave2, 0);
        const p3 = Math.max(whiteY - 1.8 + wave3, 0);
        const p4 = Math.max(whiteY, 0);
        manifestoWhiteLayer.style.clipPath = `polygon(0% ${p0.toFixed(2)}%, 25% ${p1.toFixed(2)}%, 50% ${p2.toFixed(2)}%, 75% ${p3.toFixed(2)}%, 100% ${p4.toFixed(2)}%, 100% 100%, 0% 100%)`;
      }

      // Phase 4: Red Liquid rises into lower section (progress: 0.55 -> 1.0)
      const redSubProgress = Math.min(Math.max((progress - 0.55) / 0.45, 0), 1);
      const redTargetY = 50; // Lower 50%
      const redY = 100 - (redSubProgress * (100 - redTargetY)); // 100% -> 50%

      if (redSubProgress <= 0.001) {
        manifestoRedLayer.style.clipPath = `polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)`;
      } else {
        const rp0 = redY;
        const rp1 = Math.max(redY - 1.8 + wave2, redTargetY - 2);
        const rp2 = Math.max(redY + 2.4 + wave1, redTargetY - 2);
        const rp3 = Math.max(redY - 1.6 + wave3, redTargetY - 2);
        const rp4 = redY;
        manifestoRedLayer.style.clipPath = `polygon(0% ${rp0.toFixed(2)}%, 25% ${rp1.toFixed(2)}%, 50% ${rp2.toFixed(2)}%, 75% ${rp3.toFixed(2)}%, 100% ${rp4.toFixed(2)}%, 100% 100%, 0% 100%)`;
      }
    }

    function onScrollOptimized() {
      if (!isScheduled) {
        requestAnimationFrame(updateManifestoFrame);
        isScheduled = true;
      }
    }

    window.addEventListener('scroll', onScrollOptimized, { passive: true });
    updateManifestoFrame();
  }

  /* --------------------------------------------------------------------------
     3. Pinned Service Cards Dynamic Waver Physics on Cursor Movement
     -------------------------------------------------------------------------- */
  const pinnedCards = document.querySelectorAll('.pinned-service-card');
  pinnedCards.forEach(card => {
    const baseRot = parseFloat(getComputedStyle(card).getPropertyValue('--card-rot')) || 0;
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const normalizedX = (x / width) - 0.5;
      
      const waverAngle = baseRot + (normalizedX * 12);
      card.style.transform = `rotate(${waverAngle}deg) translateY(-6px) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotate(${baseRot}deg)`;
    });
  });

  /* --------------------------------------------------------------------------
     3. Sticky Header Scroll Effect
     -------------------------------------------------------------------------- */
  const siteHeader = document.getElementById('siteHeader');
  let headerScrolled = false;
  if (siteHeader) {
    window.addEventListener('scroll', () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== headerScrolled) {
        headerScrolled = isScrolled;
        siteHeader.classList.toggle('scrolled', isScrolled);
      }
    }, { passive: true });
  }

  // Smooth scroll exclusively for user anchor link clicks (preventing refresh scroll animation)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     3. Mobile Menu Toggle
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', () => {
      window.closeMobileMenu();
    });
  }

  window.closeMobileMenu = function() {
    if (mobileDrawer && mobileToggle) {
      mobileDrawer.classList.remove('open');
      mobileToggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  /* --------------------------------------------------------------------------
     4. Animated Statistics Counter on Scroll
     -------------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');
  let countersTriggered = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersTriggered) {
        countersTriggered = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800; // ms
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);

            counter.innerText = currentVal;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target;
            }
          };

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Enable browser scroll position restoration on reload
  if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'auto';
  }

  /* --------------------------------------------------------------------------
     5. Disperse Card Showcase (Accurate Scroll Scrub & Interactive Pop)
     -------------------------------------------------------------------------- */
  const disperseCards = document.querySelectorAll('.disperse-card');
  const disperseStage = document.getElementById('disperseStage');

  function updateDisperseCards() {
    if (!disperseStage) return;

    const stageRect = disperseStage.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Start spreading ONLY when the card deck itself reaches windowHeight * 0.60 (lower-middle)
    // Fully spread when the card deck reaches windowHeight * 0.25 (center-focal point)
    // When stage is at bottom of viewport (as when first entering), progress is strictly 0 (single card)
    const enterOffset = windowHeight * 0.60;
    const fullSpreadOffset = windowHeight * 0.25;

    let progress = (enterOffset - stageRect.top) / (enterOffset - fullSpreadOffset);
    progress = Math.max(0, Math.min(1, progress));

    disperseStage.style.setProperty('--disperse-progress', progress.toFixed(3));

    // Update active button indicators
    const btnFan = document.getElementById('btnDisperseFan');
    const btnStack = document.getElementById('btnDisperseStack');
    if (btnFan && btnStack) {
      if (progress > 0.5) {
        btnFan.classList.add('active');
        btnStack.classList.remove('active');
      } else {
        btnStack.classList.add('active');
        btnFan.classList.remove('active');
      }
    }
  }

  window.setManualDisperse = function(val) {
    if (disperseStage) {
      disperseStage.style.setProperty('--disperse-progress', val);
      const btnFan = document.getElementById('btnDisperseFan');
      const btnStack = document.getElementById('btnDisperseStack');
      if (btnFan && btnStack) {
        btnFan.classList.toggle('active', val === 1);
        btnStack.classList.toggle('active', val === 0);
      }
    }
  };

  let disperseTicking = false;
  function onScrollDisperse() {
    if (!disperseTicking) {
      requestAnimationFrame(() => {
        updateDisperseCards();
        disperseTicking = false;
      });
      disperseTicking = true;
    }
  }

  window.addEventListener('scroll', onScrollDisperse, { passive: true });
  window.addEventListener('resize', onScrollDisperse, { passive: true });
  updateDisperseCards();

  // Quick View for Disperse Cards
  disperseCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-title');
      const catLabel = card.getAttribute('data-cat-label');
      const year = card.getAttribute('data-year');
      const desc = card.getAttribute('data-desc');
      const img = card.getAttribute('data-img');

      if (qvTitle) qvTitle.innerText = title;
      if (qvCategory) qvCategory.innerText = `[ GRAPHIC MASTERPIECE / ${year} ]`;
      if (qvMeta) qvMeta.innerText = `${year} • ${catLabel}`;
      if (qvDescription) qvDescription.innerText = desc;
      if (qvImage) {
        qvImage.src = img;
        qvImage.alt = title;
      }

      if (quickViewModal) {
        quickViewModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. Showcase Layout (Graphic Design & Web/Mobile Apps Sequentially Displayed)
     -------------------------------------------------------------------------- */

  // ==========================================================================
  // REALISTIC MOBILE APP MICRO-INTERACTIONS (SCREENS 1 - 4 FUNCTIONAL UX)
  // ==========================================================================
  
  // --- SCREEN 1: MULTI-LISTING SPATIAL STAYS, MAP SWITCH & APPLE PAY ---
  const s1ScreenContent = document.getElementById('s1ScreenContent');
  const s1DateTrigger = document.getElementById('s1DateTrigger');
  const s1StayLocCity = document.getElementById('s1StayLocCity');
  const s1DatesLabel = document.getElementById('s1DatesLabel');
  const s1NightsLabel = document.getElementById('s1NightsLabel');
  const s1CalendarWheel = document.getElementById('s1CalendarWheel');
  const s1CalClose = document.getElementById('s1CalClose');
  const s1CalcFormula = document.getElementById('s1CalcFormula');
  const s1CalcTotal = document.getElementById('s1CalcTotal');
  const s1SpatialWrap = document.getElementById('s1SpatialWrap');
  const s1VillaImg = document.getElementById('s1VillaImg');
  const s1LightReflection = document.getElementById('s1LightReflection');
  const s1RotatePill = document.getElementById('s1RotatePill');
  const s1RotateLabel = document.getElementById('s1RotateLabel');
  const s1ArBadgeText = document.getElementById('s1ArBadgeText');
  const s1FilterBtn = document.getElementById('s1FilterBtn');
  const s1PriceSliderBar = document.getElementById('s1PriceSliderBar');
  const s1PriceRange = document.getElementById('s1PriceRange');
  const s1SliderVal = document.getElementById('s1SliderVal');
  const s1FilterCountBadge = document.getElementById('s1FilterCountBadge');
  const s1StayTitle = document.getElementById('s1StayTitle');
  const s1StayRating = document.getElementById('s1StayRating');
  const s1StayReviews = document.getElementById('s1StayReviews');
  const s1CardPrice = document.getElementById('s1CardPrice');
  const s1NightsSub = document.getElementById('s1NightsSub');
  const s1ReserveBtn = document.getElementById('s1ReserveBtn');
  const s1Spinner = document.getElementById('s1Spinner');
  const s1BtnText = document.getElementById('s1BtnText');
  const s1BtnArrow = document.getElementById('s1BtnArrow');
  const s1ApplePaySheet = document.getElementById('s1ApplePaySheet');
  const s1PayCancel = document.getElementById('s1PayCancel');
  const s1PayTotal = document.getElementById('s1PayTotal');
  const s1FaceIdTrigger = document.getElementById('s1FaceIdTrigger');
  const s1FaceIdFrame = document.getElementById('s1FaceIdFrame');
  const s1FaceIdStatus = document.getElementById('s1FaceIdStatus');
  const s1SuccessCard = document.getElementById('s1SuccessCard');
  const s1SuccessDates = document.getElementById('s1SuccessDates');
  const s1ResetBtn = document.getElementById('s1ResetBtn');

  const s1PrevStay = document.getElementById('s1PrevStay');
  const s1NextStay = document.getElementById('s1NextStay');
  const s1Dots = document.querySelectorAll('#s1PaginationDots .s1-dot');
  const s1Toggle3D = document.getElementById('s1Toggle3D');
  const s1ToggleMap = document.getElementById('s1ToggleMap');
  const s1MapOverlay = document.getElementById('s1MapOverlay');
  const s1MainVisual = document.getElementById('s1MainVisual');
  const s1MapPins = document.querySelectorAll('.map-price-pin');

  // Multi-Listing Stays Database
  const s1StaysData = [
    {
      name: 'Aman Kyoto Pavilion',
      city: 'Aman Kyoto, Japan',
      rate: 4200,
      rating: '★ 4.98',
      reviews: '(214 reviews)',
      badge: 'SPATIAL AR // KYOTO',
      img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop',
      lightGradient: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.7) 0%, rgba(255,200,150,0.3) 30%, transparent 60%)'
    },
    {
      name: 'Alpine Chalet Zermatt',
      city: 'Zermatt, Switzerland',
      rate: 6800,
      rating: '★ 4.95',
      reviews: '(182 reviews)',
      badge: 'SPATIAL AR // ZERMATT',
      img: 'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?q=80&w=800&auto=format&fit=crop',
      lightGradient: 'radial-gradient(circle at 50% 30%, rgba(220,240,255,0.85) 0%, rgba(180,210,255,0.3) 35%, transparent 65%)'
    },
    {
      name: 'Amangiri Desert Pavilion',
      city: 'Utah Canyon, USA',
      rate: 8500,
      rating: '★ 4.99',
      reviews: '(340 reviews)',
      badge: 'SPATIAL AR // UTAH',
      img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop',
      lightGradient: 'radial-gradient(circle at 70% 35%, rgba(255,230,180,0.9) 0%, rgba(245,150,60,0.35) 35%, transparent 65%)'
    }
  ];

  let currentStayIndex = 0;
  let currentNights = 4;
  let currentRange = 'Oct 12 - 16';

  function switchStayProperty(index) {
    if (index < 0) index = s1StaysData.length - 1;
    if (index >= s1StaysData.length) index = 0;
    currentStayIndex = index;

    const stay = s1StaysData[index];

    // Update Pagination Dots
    s1Dots.forEach((d, i) => d.classList.toggle('active', i === index));

    // Update Map Pins
    s1MapPins.forEach(pin => {
      const pIndex = parseInt(pin.getAttribute('data-index')) || 0;
      pin.classList.toggle('active', pIndex === index);
    });

    // Cross-fade image
    if (s1VillaImg) {
      s1VillaImg.style.opacity = '0.3';
      s1VillaImg.style.transform = 'scale(0.96)';
      setTimeout(() => {
        s1VillaImg.src = stay.img;
        s1VillaImg.style.opacity = '1';
        s1VillaImg.style.transform = 'scale(1.04)';
      }, 200);
    }

    if (s1LightReflection) {
      s1LightReflection.style.background = stay.lightGradient;
    }

    if (s1StayLocCity) s1StayLocCity.innerText = stay.city;
    if (s1StayTitle) s1StayTitle.innerText = stay.name;
    if (s1StayRating) s1StayRating.innerText = stay.rating;
    if (s1StayReviews) s1StayReviews.innerText = stay.reviews;
    if (s1ArBadgeText) s1ArBadgeText.innerText = stay.badge;

    updateBookingPricing(currentNights, currentRange);
  }

  function updateBookingPricing(nights, rangeText) {
    currentNights = nights;
    currentRange = rangeText;
    const stay = s1StaysData[currentStayIndex];
    const total = nights * stay.rate;

    if (s1DatesLabel) s1DatesLabel.innerText = rangeText;
    if (s1NightsLabel) s1NightsLabel.innerText = `${nights} Nights`;
    if (s1CalcFormula) s1CalcFormula.innerText = `${nights} Nights × ₹${stay.rate.toLocaleString()}/night`;
    if (s1CalcTotal) s1CalcTotal.innerText = `₹${total.toLocaleString()} Total`;
    if (s1CardPrice) s1CardPrice.innerText = `₹${total.toLocaleString()}`;
    if (s1NightsSub) s1NightsSub.innerText = `/ ${nights} nights total`;
    if (s1PayTotal) s1PayTotal.innerText = `₹${total.toLocaleString()}.00`;
    if (s1SuccessDates) s1SuccessDates.innerText = `${rangeText}, 2025 • Paid with Pay`;
  }

  // Horizontal Swipe Navigation
  if (s1PrevStay) {
    s1PrevStay.addEventListener('click', (e) => {
      e.stopPropagation();
      switchStayProperty(currentStayIndex - 1);
    });
  }

  if (s1NextStay) {
    s1NextStay.addEventListener('click', (e) => {
      e.stopPropagation();
      switchStayProperty(currentStayIndex + 1);
    });
  }

  s1Dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(dot.getAttribute('data-index')) || 0;
      switchStayProperty(idx);
    });
  });

  // Map & 3D Cards Toggle Switch
  if (s1ToggleMap && s1Toggle3D) {
    s1ToggleMap.addEventListener('click', (e) => {
      e.stopPropagation();
      s1ToggleMap.classList.add('active');
      s1Toggle3D.classList.remove('active');
      if (s1MapOverlay) s1MapOverlay.style.display = 'block';
      if (s1MainVisual) s1MainVisual.style.display = 'none';
      if (s1CalendarWheel) s1CalendarWheel.classList.remove('open');
    });

    s1Toggle3D.addEventListener('click', (e) => {
      e.stopPropagation();
      s1Toggle3D.classList.add('active');
      s1ToggleMap.classList.remove('active');
      if (s1MapOverlay) s1MapOverlay.style.display = 'none';
      if (s1MainVisual) s1MainVisual.style.display = 'block';
    });
  }

  // Tapping price pins on map selects that stay and switches to 3D view
  s1MapPins.forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(pin.getAttribute('data-index')) || 0;
      switchStayProperty(idx);

      // Return to 3D view
      setTimeout(() => {
        if (s1Toggle3D) s1Toggle3D.classList.add('active');
        if (s1ToggleMap) s1ToggleMap.classList.remove('active');
        if (s1MapOverlay) s1MapOverlay.style.display = 'none';
        if (s1MainVisual) s1MainVisual.style.display = 'block';
      }, 300);
    });
  });

  // Active Filter Engine Slider
  if (s1FilterBtn && s1PriceSliderBar) {
    s1FilterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isHidden = s1PriceSliderBar.style.display === 'none';
      s1PriceSliderBar.style.display = isHidden ? 'block' : 'none';
      if (s1CalendarWheel) s1CalendarWheel.classList.remove('open');
    });
  }

  if (s1PriceRange && s1SliderVal && s1FilterCountBadge) {
    s1PriceRange.addEventListener('click', (e) => e.stopPropagation());
    s1PriceRange.addEventListener('input', (e) => {
      e.stopPropagation();
      const maxVal = parseInt(e.target.value) || 700;
      s1SliderVal.innerText = `$${maxVal} / night`;

      const matchingStays = s1StaysData.filter(s => s.rate <= maxVal);
      s1FilterCountBadge.innerText = `${matchingStays.length} Stays Available Under $${maxVal}`;
    });
  }

  // 1. Interactive 3D Spatial Viewport Drag
  let isDraggingSpatial = false;

  function handleSpatialMove(clientX, clientY) {
    if (!s1SpatialWrap || !s1VillaImg) return;
    const rect = s1SpatialWrap.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const rotY = ((percentX - 50) / 50) * 18;
    const rotX = -((percentY - 50) / 50) * 10;

    s1VillaImg.style.transform = `scale(1.08) rotateY(${rotY}deg) rotateX(${rotX}deg)`;

    if (s1LightReflection) {
      s1LightReflection.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.85) 0%, rgba(255,210,160,0.35) 28%, transparent 58%)`;
      s1LightReflection.style.opacity = '0.85';
    }
  }

  function resetSpatialView() {
    if (s1VillaImg) {
      s1VillaImg.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      s1VillaImg.style.transform = 'scale(1.04) rotateY(0deg) rotateX(0deg)';
      setTimeout(() => {
        if (s1VillaImg) s1VillaImg.style.transition = '';
      }, 500);
    }
    if (s1LightReflection) {
      const stay = s1StaysData[currentStayIndex];
      s1LightReflection.style.background = stay.lightGradient;
      s1LightReflection.style.opacity = '0.65';
    }
    if (s1SpatialWrap) s1SpatialWrap.classList.remove('grabbing');
  }

  if (s1SpatialWrap) {
    s1SpatialWrap.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      isDraggingSpatial = true;
      s1SpatialWrap.classList.add('grabbing');
      handleSpatialMove(e.clientX, e.clientY);
    });

    s1SpatialWrap.addEventListener('mousemove', (e) => {
      if (!isDraggingSpatial) return;
      e.stopPropagation();
      handleSpatialMove(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      if (isDraggingSpatial) {
        isDraggingSpatial = false;
        resetSpatialView();
      }
    });

    // Touch Horizontal Swipe Gesture
    let touchStartX = 0;
    s1SpatialWrap.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      touchStartX = e.touches[0].clientX;
      isDraggingSpatial = true;
      handleSpatialMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    s1SpatialWrap.addEventListener('touchmove', (e) => {
      if (!isDraggingSpatial) return;
      handleSpatialMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    s1SpatialWrap.addEventListener('touchend', (e) => {
      isDraggingSpatial = false;
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - touchStartX;
      if (diffX > 45) {
        switchStayProperty(currentStayIndex - 1);
      } else if (diffX < -45) {
        switchStayProperty(currentStayIndex + 1);
      }
      resetSpatialView();
    });
  }

  if (s1RotatePill && s1VillaImg) {
    s1RotatePill.addEventListener('click', (e) => {
      e.stopPropagation();
      s1VillaImg.classList.toggle('s1-spin-active');
      const isSpinning = s1VillaImg.classList.contains('s1-spin-active');
      if (s1RotateLabel) s1RotateLabel.innerText = isSpinning ? 'Orbiting 360°...' : 'Swipe / Drag 360°';
    });
  }

  // 2. iOS Calendar Pricing Engine
  if (s1DateTrigger && s1CalendarWheel) {
    s1DateTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      s1CalendarWheel.classList.toggle('open');
      if (s1PriceSliderBar) s1PriceSliderBar.style.display = 'none';
    });
  }

  if (s1CalClose && s1CalendarWheel) {
    s1CalClose.addEventListener('click', (e) => {
      e.stopPropagation();
      s1CalendarWheel.classList.remove('open');
    });
  }

  const s1CalDays = document.querySelectorAll('#s1CalendarWheel .cal-day');
  s1CalDays.forEach(day => {
    day.addEventListener('click', (e) => {
      e.stopPropagation();
      s1CalDays.forEach(d => d.classList.remove('active', 'in-range'));
      day.classList.add('active');

      const nights = parseInt(day.getAttribute('data-nights')) || 4;
      const range = day.getAttribute('data-range') || 'Oct 12 - 16';
      updateBookingPricing(nights, range);

      setTimeout(() => {
        if (s1CalendarWheel) s1CalendarWheel.classList.remove('open');
      }, 400);
    });
  });

  // 3. Apple Pay Checkout & FaceID Biometric Flow
  function openApplePaySheet() {
    if (s1ScreenContent) s1ScreenContent.classList.add('bg-depth-active');
    if (s1ApplePaySheet) s1ApplePaySheet.classList.add('open');
  }

  function closeApplePaySheet() {
    if (s1ScreenContent) s1ScreenContent.classList.remove('bg-depth-active');
    if (s1ApplePaySheet) s1ApplePaySheet.classList.remove('open');
    if (s1FaceIdFrame) s1FaceIdFrame.classList.remove('confirmed');
    if (s1FaceIdStatus) {
      s1FaceIdStatus.innerHTML = `
        <span class="faceid-main-msg">Double-Click / Tap for Face ID</span>
        <span class="faceid-sub-msg">Confirm ${s1PayTotal ? s1PayTotal.innerText : '₹16,800.00'} with Biometrics</span>
      `;
    }
  }

  if (s1ReserveBtn) {
    s1ReserveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (s1Spinner) s1Spinner.style.display = 'inline-block';
      if (s1BtnText) s1BtnText.innerText = 'PROCESSING...';
      if (s1BtnArrow) s1BtnArrow.style.display = 'none';

      setTimeout(() => {
        if (s1Spinner) s1Spinner.style.display = 'none';
        if (s1BtnText) s1BtnText.innerText = 'RESERVE NOW';
        if (s1BtnArrow) s1BtnArrow.style.display = 'inline-block';
        openApplePaySheet();
      }, 700);
    });
  }

  if (s1PayCancel) {
    s1PayCancel.addEventListener('click', (e) => {
      e.stopPropagation();
      closeApplePaySheet();
    });
  }

  function completeFaceIdAuth() {
    if (s1FaceIdFrame) s1FaceIdFrame.classList.add('confirmed');
    if (s1FaceIdStatus) {
      s1FaceIdStatus.innerHTML = `
        <span class="faceid-main-msg" style="color:#22C55E;">Face ID Confirmed ✓</span>
        <span class="faceid-sub-msg" style="color:#4ADE80;">Payment Authorized via Apple Card</span>
      `;
    }

    setTimeout(() => {
      closeApplePaySheet();
      if (s1SuccessCard) s1SuccessCard.classList.add('open');
    }, 900);
  }

  if (s1FaceIdTrigger) {
    s1FaceIdTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      completeFaceIdAuth();
    });
  }

  if (s1ResetBtn && s1SuccessCard) {
    s1ResetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      s1SuccessCard.classList.remove('open');
      closeApplePaySheet();
    });
  }

  // --- SCREEN 2: FLEXAI COMPUTER VISION FITNESS & POSTURE TRACKER ---
  const s2PostureWarning = document.getElementById('s2PostureWarning');
  const s2WarningMsg = document.getElementById('s2WarningMsg');
  const s2AutoFixBtn = document.getElementById('s2AutoFixBtn');
  const s2TimerVal = document.getElementById('s2TimerVal');
  const s2HeartBpm = document.getElementById('s2HeartBpm');
  const s2KneeJoint = document.getElementById('s2KneeJoint');
  const s2ThighBone = document.getElementById('s2ThighBone');
  const s2ShinBone = document.getElementById('s2ShinBone');
  const s2FaultTrigger = document.getElementById('s2FaultTrigger');
  const s2FaultTriggerText = document.getElementById('s2FaultTriggerText');
  const s2SkeletonStateLabel = document.getElementById('s2SkeletonStateLabel');
  const s2AddRepBtn = document.getElementById('s2AddRepBtn');
  const s2RepCount = document.getElementById('s2RepCount');
  const s2FormScore = document.getElementById('s2FormScore');
  const s2FormStatusTag = document.getElementById('s2FormStatusTag');
  const s2FormScoreFill = document.getElementById('s2FormScoreFill');
  const s2PauseBtn = document.getElementById('s2PauseBtn');
  const s2PauseText = document.getElementById('s2PauseText');
  const s2FinishSetBtn = document.getElementById('s2FinishSetBtn');
  const s2SummaryModal = document.getElementById('s2SummaryModal');
  const s2SummaryClose = document.getElementById('s2SummaryClose');
  const s2HealthExportBtn = document.getElementById('s2HealthExportBtn');
  const s2HealthBtnText = document.getElementById('s2HealthBtnText');
  const s2HealthBtnIcon = document.getElementById('s2HealthBtnIcon');

  let currentReps = 8;
  let isWorkoutPaused = false;
  let isFaultActive = false;
  let timerSeconds = 45;

  // Active Workout Timer & Heart Rate Monitor Pulse
  setInterval(() => {
    if (!isWorkoutPaused && s2TimerVal) {
      timerSeconds++;
      const mins = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
      const secs = String(timerSeconds % 60).padStart(2, '0');
      s2TimerVal.innerText = `${mins}:${secs}`;
    }
    if (s2HeartBpm && !isWorkoutPaused) {
      const bpm = 140 + Math.floor(Math.random() * 6);
      s2HeartBpm.innerText = bpm;
    }
  }, 1000);

  // 1. Dynamic Posture Fault Trigger & Live Feedback
  function setPostureFaultState(fault) {
    isFaultActive = fault;
    if (fault) {
      if (s2KneeJoint) s2KneeJoint.classList.add('fault');
      if (s2ThighBone) s2ThighBone.classList.add('fault');
      if (s2ShinBone) s2ShinBone.classList.add('fault');
      if (s2PostureWarning) s2PostureWarning.classList.add('show');
      if (s2FaultTriggerText) s2FaultTriggerText.innerText = '✓ Correct Knee Alignment';
      if (s2SkeletonStateLabel) s2SkeletonStateLabel.innerText = 'KNEE OVEREXTENSION ALERT';

      if (s2FormScore) s2FormScore.innerText = '88%';
      if (s2FormScore) s2FormScore.style.color = '#EF4444';
      if (s2FormStatusTag) {
        s2FormStatusTag.innerText = 'FAULT DETECTED';
        s2FormStatusTag.style.color = '#EF4444';
        s2FormStatusTag.style.background = 'rgba(239, 68, 68, 0.15)';
      }
      if (s2FormScoreFill) {
        s2FormScoreFill.style.width = '88%';
        s2FormScoreFill.style.background = '#EF4444';
      }
    } else {
      if (s2KneeJoint) s2KneeJoint.classList.remove('fault');
      if (s2ThighBone) s2ThighBone.classList.remove('fault');
      if (s2ShinBone) s2ShinBone.classList.remove('fault');
      if (s2PostureWarning) s2PostureWarning.classList.remove('show');
      if (s2FaultTriggerText) s2FaultTriggerText.innerText = '⚠️ Simulate Knee Fault';
      if (s2SkeletonStateLabel) s2SkeletonStateLabel.innerText = 'SKELETON: 60 FPS SYNC';

      if (s2FormScore) s2FormScore.innerText = '96%';
      if (s2FormScore) s2FormScore.style.color = '#10B981';
      if (s2FormStatusTag) {
        s2FormStatusTag.innerText = 'OPTIMAL';
        s2FormStatusTag.style.color = '#10B981';
        s2FormStatusTag.style.background = 'rgba(16, 185, 129, 0.15)';
      }
      if (s2FormScoreFill) {
        s2FormScoreFill.style.width = '96%';
        s2FormScoreFill.style.background = 'linear-gradient(90deg, #06B6D4, #10B981)';
      }
    }
  }

  if (s2FaultTrigger) {
    s2FaultTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      setPostureFaultState(!isFaultActive);
    });
  }

  if (s2KneeJoint) {
    s2KneeJoint.addEventListener('click', (e) => {
      e.stopPropagation();
      setPostureFaultState(!isFaultActive);
    });
  }

  if (s2AutoFixBtn) {
    s2AutoFixBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setPostureFaultState(false);
    });
  }

  // 2. Rep Counter (+1 Rep)
  if (s2AddRepBtn) {
    s2AddRepBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentReps++;
      if (s2RepCount) s2RepCount.innerText = currentReps;

      if (s2RepCount) {
        s2RepCount.style.transform = 'scale(1.3)';
        s2RepCount.style.transition = 'transform 0.2s';
        setTimeout(() => { s2RepCount.style.transform = 'scale(1)'; }, 200);
      }

      if (currentReps >= 12 && s2FinishSetBtn) {
        s2FinishSetBtn.style.animation = 'kneeAlertPulse 1s infinite alternate';
      }
    });
  }

  // 3. Pause Workout Toggle
  if (s2PauseBtn) {
    s2PauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isWorkoutPaused = !isWorkoutPaused;
      if (s2PauseText) s2PauseText.innerText = isWorkoutPaused ? '▶ RESUME' : '⏸ PAUSE';
      if (s2PauseBtn) s2PauseBtn.style.background = isWorkoutPaused ? 'rgba(239, 68, 68, 0.2)' : '';
    });
  }

  // 4. State 3: Workout Summary & Performance Analytics Modal
  if (s2FinishSetBtn && s2SummaryModal) {
    s2FinishSetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      s2SummaryModal.classList.add('open');
      isWorkoutPaused = true;
    });
  }

  if (s2SummaryClose && s2SummaryModal) {
    s2SummaryClose.addEventListener('click', (e) => {
      e.stopPropagation();
      s2SummaryModal.classList.remove('open');
      isWorkoutPaused = false;
    });
  }

  // 5. Apple Health Export Integration
  if (s2HealthExportBtn) {
    s2HealthExportBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (s2HealthBtnText) s2HealthBtnText.innerText = 'LOGGED TO APPLE HEALTH () ✓';
      if (s2HealthBtnIcon) s2HealthBtnIcon.innerText = '✓';
      s2HealthExportBtn.style.background = '#10B981';
      s2HealthExportBtn.style.color = '#FFF';
      s2HealthExportBtn.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.8)';

      setTimeout(() => {
        if (s2SummaryModal) s2SummaryModal.classList.remove('open');
        setTimeout(() => {
          if (s2HealthBtnText) s2HealthBtnText.innerText = 'LOG TO APPLE HEALTH ( Health)';
          if (s2HealthBtnIcon) s2HealthBtnIcon.innerText = '→';
          s2HealthExportBtn.style.background = '#FFFFFF';
          s2HealthExportBtn.style.color = '#08080C';
          s2HealthExportBtn.style.boxShadow = '';
          isWorkoutPaused = false;
        }, 500);
      }, 1600);
    });
  }

  // --- SCREEN 3: PRODUCT CATALOG TABS & ADD TO CART FUNCTIONALITY ---
  const s3CatPills = document.querySelectorAll('#s3CatBar .cat-pill');
  const s3LookbookVisual = document.getElementById('s3LookbookVisual');
  const s3ProductsView = document.getElementById('s3ProductsView');
  const s3DrawerSheet = document.getElementById('s3DrawerSheet');
  const s3Hotspots = document.querySelectorAll('.app-tap-point');
  const s3SizeBtns = document.querySelectorAll('#s3SizeSelector .size-btn');
  const s3ColorDots = document.querySelectorAll('.drawer-color-dots .c-dot');
  const s3QuickAddBtn = document.getElementById('s3QuickAddBtn');
  const s3AddText = document.getElementById('s3AddText');
  const s3BagTarget = document.getElementById('s3BagTarget');
  const s3BagCount = document.getElementById('s3BagCount');
  const s3TabBagNum = document.getElementById('s3TabBagNum');
  const s3FlyDot = document.getElementById('s3FlyDot');
  const s3HeartBtn = document.getElementById('s3HeartBtn');
  const s3CartModal = document.getElementById('s3CartModal');
  const s3CartCloseBtn = document.getElementById('s3CartCloseBtn');
  const s3CartItemsList = document.getElementById('s3CartItemsList');
  const s3CartTotalPrice = document.getElementById('s3CartTotalPrice');
  const s3CartModalBadge = document.getElementById('s3CartModalBadge');
  const s3CheckoutBtn = document.getElementById('s3CheckoutBtn');
  const s3TabHome = document.getElementById('s3TabHome');
  const s3TabShop = document.getElementById('s3TabShop');
  const s3TabBag = document.getElementById('s3TabBag');
  const s3ProdAddBtns = document.querySelectorAll('.prod-add-btn');
  const s3ProdCards = document.querySelectorAll('.app-prod-card');

  let cartItemsData = [
    { name: 'Aura Cyber Hoodie', meta: 'Size: M • Deep Black', price: 2999 }
  ];

  let currentSelectedItem = {
    name: 'Aura Cyber Hoodie',
    price: 2999
  };
  let currentSize = 'M';
  let currentColor = 'Deep Black';

  function updateCartState() {
    const totalCount = cartItemsData.length;
    if (s3BagCount) s3BagCount.innerText = totalCount;
    if (s3TabBagNum) s3TabBagNum.innerText = totalCount;
    if (s3CartModalBadge) s3CartModalBadge.innerText = `${totalCount} ITEMS`;

    const totalSum = cartItemsData.reduce((sum, item) => sum + item.price, 0);
    if (s3CartTotalPrice) s3CartTotalPrice.innerText = `₹${totalSum.toLocaleString()}.00`;

    if (s3CartItemsList) {
      s3CartItemsList.innerHTML = cartItemsData.map(item => `
        <div class="in-cart-item-row">
          <div class="in-cart-item-info">
            <span class="in-cart-item-name">${item.name}</span>
            <span class="in-cart-item-meta">${item.meta}</span>
          </div>
          <span class="in-cart-item-price">₹${item.price.toLocaleString()}</span>
        </div>
      `).join('');
    }
  }

  function triggerFlyToCartParticle() {
    if (s3FlyDot) {
      s3FlyDot.classList.remove('animating');
      void s3FlyDot.offsetWidth;
      s3FlyDot.classList.add('animating');
    }
    if (s3BagCount) {
      setTimeout(() => {
        s3BagCount.classList.add('bump');
        setTimeout(() => s3BagCount.classList.remove('bump'), 300);
      }, 700);
    }
  }

  function selectProductCard(card) {
    s3ProdCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');

    const name = card.getAttribute('data-name') || 'Cyber Hoodie';
    const price = parseInt(card.getAttribute('data-price')) || 2999;
    currentSelectedItem = { name, price };

    if (s3AddText) {
      s3AddText.innerText = `QUICK ADD • ₹${price.toLocaleString()}`;
    }
  }

  // Click on product card selects it
  s3ProdCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      selectProductCard(card);
    });
  });

  // Select initial first card by default
  if (s3ProdCards.length > 0) {
    s3ProdCards[0].classList.add('selected');
    if (s3AddText) {
      s3AddText.innerText = `QUICK ADD • ₹2,999`;
    }
  }

  // Category Tab Switching (All, Streetwear, Lookbook, Accessories)
  s3CatPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      s3CatPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const cat = pill.getAttribute('data-cat') || 'all';

      if (cat === 'lookbook') {
        if (s3LookbookVisual) s3LookbookVisual.style.display = 'block';
        if (s3ProductsView) s3ProductsView.style.display = 'none';
        if (s3DrawerSheet) s3DrawerSheet.style.display = 'flex';
      } else {
        if (s3LookbookVisual) s3LookbookVisual.style.display = 'none';
        if (s3ProductsView) s3ProductsView.style.display = 'grid';
        if (s3DrawerSheet) s3DrawerSheet.style.display = 'flex';

        s3ProdCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (cat === 'all' || cardCat === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });

  // Product Card "+ ADD" Click Handlers
  s3ProdAddBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.app-prod-card');
      if (card) selectProductCard(card);

      const name = btn.getAttribute('data-name') || 'Item';
      const price = parseInt(btn.getAttribute('data-price')) || 2999;

      btn.classList.add('added');
      btn.innerText = 'ADDED ✓';

      cartItemsData.push({
        name: name,
        meta: `Size: ${currentSize} • ${currentColor}`,
        price: price
      });

      triggerFlyToCartParticle();
      updateCartState();

      setTimeout(() => {
        btn.classList.remove('added');
        btn.innerText = '+ ADD';
      }, 1400);
    });
  });

  // Lookbook Hotspots Click
  s3Hotspots.forEach(spot => {
    spot.addEventListener('click', (e) => {
      e.stopPropagation();
      const title = spot.querySelector('.tag-title')?.innerText || 'Aura Oversized Top';
      const priceText = spot.querySelector('.tag-price')?.innerText || '₹2,499';
      const price = parseInt(priceText.replace(/[^\d]/g, '')) || 2499;
      currentSelectedItem = { name: title, price: price };

      if (s3AddText) s3AddText.innerText = `QUICK ADD • ₹${price.toLocaleString()}`;
    });
  });

  // Quick Add Button (Adds the currently selected item with chosen size & color)
  if (s3QuickAddBtn) {
    s3QuickAddBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      triggerFlyToCartParticle();

      cartItemsData.push({
        name: currentSelectedItem.name,
        meta: `Size: ${currentSize} • ${currentColor}`,
        price: currentSelectedItem.price
      });
      updateCartState();

      if (s3AddText) s3AddText.innerText = 'ADDED ✓';
      setTimeout(() => {
        if (s3AddText) s3AddText.innerText = `QUICK ADD • ₹${currentSelectedItem.price.toLocaleString()}`;
      }, 1200);
    });
  }

  // Size & Color Pickers
  s3SizeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      s3SizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSize = btn.innerText.trim();
    });
  });

  s3ColorDots.forEach((dot, idx) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      s3ColorDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      if (idx === 0) currentColor = 'Deep Black';
      else if (idx === 1) currentColor = 'Crimson Red';
      else currentColor = 'Slate Grey';
    });
  });

  if (s3HeartBtn) {
    s3HeartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      s3HeartBtn.style.color = s3HeartBtn.style.color === 'rgb(229, 0, 0)' ? '#FFF' : '#E50000';
    });
  }

  // Open / Close In-App Cart Slide-up Drawer
  function openCartModal() {
    if (s3CartModal) s3CartModal.classList.add('open');
  }

  function closeCartModal() {
    if (s3CartModal) s3CartModal.classList.remove('open');
  }

  if (s3BagTarget) {
    s3BagTarget.addEventListener('click', (e) => {
      e.stopPropagation();
      openCartModal();
    });
  }

  if (s3TabBag) {
    s3TabBag.addEventListener('click', (e) => {
      e.stopPropagation();
      openCartModal();
    });
  }

  if (s3CartCloseBtn) {
    s3CartCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeCartModal();
    });
  }

  if (s3TabHome || s3TabShop) {
    [s3TabHome, s3TabShop].forEach(tab => {
      if (tab) {
        tab.addEventListener('click', (e) => {
          e.stopPropagation();
          closeCartModal();
        });
      }
    });
  }

  if (s3CheckoutBtn) {
    s3CheckoutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      s3CheckoutBtn.innerHTML = '<span>ORDER CONFIRMED ( PAY) ✓</span>';
      setTimeout(() => {
        closeCartModal();
        setTimeout(() => {
          if (s3CheckoutBtn) s3CheckoutBtn.innerHTML = '<span>CHECKOUT ( PAY)</span><span>→</span>';
        }, 500);
      }, 1200);
    });
  }

  // --- SCREEN 4: NEURAL CONVERSATIONAL AI CHATBOT CONTROLLER ---
  const s4ChatThread = document.getElementById('s4ChatThread');
  const s4ChatStream = document.getElementById('s4ChatStream');
  const s4TypingRow = document.getElementById('s4TypingRow');
  const s4TextInput = document.getElementById('s4TextInput');
  const s4SendBtn = document.getElementById('s4SendBtn');
  const s4SpeakBtn = document.getElementById('s4SpeakBtn');
  const s4SpeakBtnText = document.getElementById('s4SpeakBtnText');
  const s4VoiceWaveCard = document.getElementById('s4VoiceWaveCard');
  const s4ClearChatBtn = document.getElementById('s4ClearChatBtn');
  const s4PromptChips = document.querySelectorAll('.prompt-chip');

  const botSmartReplies = {
    'Analyze villa blueprint wireframes...': 'Analysis Complete: 1) Structural cantilever spans verified (14.2m). 2) Optimized open-plan circulation & daylight factor +28%. 3) Ready for 3D WebGL render.',
    'Analyze villa blueprint...': 'Analysis Complete: 1) Structural cantilever spans verified (14.2m). 2) Optimized open-plan circulation & daylight factor +28%. 3) Ready for 3D WebGL render.',
    'Design modern 3D villa with cantilever roof': 'Generated architectural spatial stay with 360° cantilevered glass roof and ambient dusk lighting. Ready for VR walkthrough.',
    'Generate minimal dark luxury color palette': 'Mapped Palette: Obsidian (#08080C), Crimson Accent (#E50000), Warm Ecru (#F5F3EE), and Slate (#94A3B8). Contrast ratio 14:1.',
    'Write WebGL raymarching fragment shader': 'Compiled SDF raymarching kernel for organic reflective sphere with real-time fresnel reflection and roughness roughness=0.08.',
    'Analyze creative campaign conversion rates': 'Analysis complete: Video reels drove +340% engagement, conversion rate up to 4.82% at ₹95 CPA. High ROAS verified.'
  };

  const defaultBotReplies = [
    'Neural v4.2 processed request with 14ms latency. High-fidelity rendering mapped to viewport.',
    'Multimodal neural agent synthesized spatial geometry and compiled output in real-time.',
    'Optimized WebGL rendering pipeline with 60fps dynamic lighting.',
    'Generated autonomous response: Ready to export assets to production format.'
  ];
  let replyIdx = 0;

  function appendUserMessage(text) {
    if (!s4ChatThread) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-msg user';
    msgDiv.innerHTML = `
      <div class="ai-msg-avatar">JD</div>
      <div class="ai-msg-bubble">
        <span>${text}</span>
      </div>
    `;
    s4ChatThread.appendChild(msgDiv);
    if (s4ChatStream) s4ChatStream.scrollTop = s4ChatStream.scrollHeight;
  }

  function appendBotMessage(text) {
    if (!s4ChatThread) return;
    if (s4TypingRow) s4TypingRow.style.display = 'none';

    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-msg bot';
    msgDiv.innerHTML = `
      <div class="ai-msg-avatar">⚡</div>
      <div class="ai-msg-bubble">
        <span>${text}</span>
      </div>
    `;
    s4ChatThread.appendChild(msgDiv);
    if (s4ChatStream) s4ChatStream.scrollTop = s4ChatStream.scrollHeight;
  }

  function handleSendChat(query) {
    if (!query) return;
    appendUserMessage(query);

    if (s4TypingRow) {
      s4TypingRow.style.display = 'flex';
      if (s4ChatStream) s4ChatStream.scrollTop = s4ChatStream.scrollHeight;
    }

    setTimeout(() => {
      const reply = botSmartReplies[query] || defaultBotReplies[replyIdx % defaultBotReplies.length];
      replyIdx++;
      appendBotMessage(reply);
    }, 750);
  }

  // Prompt Chips Click
  s4PromptChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const prompt = chip.getAttribute('data-prompt');
      handleSendChat(prompt);
    });
  });

  // Text Input Send
  if (s4SendBtn && s4TextInput) {
    s4SendBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = s4TextInput.value.trim();
      if (val) {
        s4TextInput.value = '';
        handleSendChat(val);
      }
    });

    s4TextInput.addEventListener('click', (e) => e.stopPropagation());
    s4TextInput.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Enter') {
        const val = s4TextInput.value.trim();
        if (val) {
          s4TextInput.value = '';
          handleSendChat(val);
        }
      }
    });
  }

  // Tap to Speak Voice Waveform Mode
  if (s4SpeakBtn) {
    s4SpeakBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      s4SpeakBtn.classList.toggle('speaking');
      const isSpeaking = s4SpeakBtn.classList.contains('speaking');

      if (isSpeaking) {
        if (s4SpeakBtnText) s4SpeakBtnText.innerText = '🔴 RECORDING...';
        if (s4VoiceWaveCard) s4VoiceWaveCard.style.display = 'flex';
        if (s4ChatStream) s4ChatStream.scrollTop = s4ChatStream.scrollHeight;

        setTimeout(() => {
          s4SpeakBtn.classList.remove('speaking');
          if (s4SpeakBtnText) s4SpeakBtnText.innerText = '🎙️ TAP TO SPEAK';
          if (s4VoiceWaveCard) s4VoiceWaveCard.style.display = 'none';
          handleSendChat('Design modern 3D villa with cantilever roof');
        }, 1800);
      }
    });
  }

  // Clear Chat Button
  if (s4ClearChatBtn && s4ChatThread) {
    s4ClearChatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      s4ChatThread.innerHTML = '';
      if (s4VoiceWaveCard) s4VoiceWaveCard.style.display = 'none';
      if (s4TypingRow) s4TypingRow.style.display = 'none';
    });
  }

  // (Mobile phone cards are purely interactive in-viewport apps - modal trigger removed)

  // Project Cards Click (Excluding FURNIO featured card which launches the full interactive app)
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.id === 'furnioFeaturedCard') {
        openFurnioApp();
        return;
      }
      const title = card.getAttribute('data-title');
      const catLabel = card.getAttribute('data-cat-label');
      const year = card.getAttribute('data-year');
      const desc = card.getAttribute('data-desc');
      const img = card.getAttribute('data-img');

      if (qvTitle) qvTitle.innerText = title;
      if (qvCategory) qvCategory.innerText = `[ CASE STUDY / ${year} ]`;
      if (qvMeta) qvMeta.innerText = `${year} • ${catLabel}`;
      if (qvDescription) qvDescription.innerText = desc;
      if (qvImage) {
        qvImage.src = img;
        qvImage.alt = title;
      }

      if (quickViewModal) {
        quickViewModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  /* --------------------------------------------------------------------------
     FURNIO — FURNITURE BOOKING SYSTEM WEB APPLICATION CONTROLLER
     -------------------------------------------------------------------------- */
  const furnioAppModal = document.getElementById('furnioAppModal');
  const furnioAppClose = document.getElementById('furnioAppClose');
  const furnioFeaturedCard = document.getElementById('furnioFeaturedCard');
  const furnioNavLinks = document.querySelectorAll('.furnio-nav-link');
  const furnioPageViews = document.querySelectorAll('.furnio-page-view');
  const furnioSearchInput = document.getElementById('furnioSearchInput');
  const furnioCategoryPills = document.querySelectorAll('#furnioCategoryPills .f-cat-pill');
  const furnioSortSelect = document.getElementById('furnioSortSelect');
  const furnioAvailOnlyCheck = document.getElementById('furnioAvailOnlyCheck');
  const furnioFurnitureGrid = document.getElementById('furnioFurnitureGrid');
  const furnioCartTrigger = document.getElementById('furnioCartTrigger');
  const furnioCartCountBadge = document.getElementById('furnioCartCountBadge');
  const furnioBookingsBadge = document.getElementById('furnioBookingsBadge');

  // Details Modal Elements
  const furnioProductModal = document.getElementById('furnioProductModal');
  const furnioProductClose = document.getElementById('furnioProductClose');
  const fModalMainImg = document.getElementById('fModalMainImg');
  const fModalThumbs = document.getElementById('fModalThumbs');
  const fModalAvailBadge = document.getElementById('fModalAvailBadge');
  const fModalCategory = document.getElementById('fModalCategory');
  const fModalTitle = document.getElementById('fModalTitle');
  const fModalRating = document.getElementById('fModalRating');
  const fModalReviews = document.getElementById('fModalReviews');
  const fModalDailyRate = document.getElementById('fModalDailyRate');
  const fModalDesc = document.getElementById('fModalDesc');
  const fModalMaterial = document.getElementById('fModalMaterial');
  const fModalDimensions = document.getElementById('fModalDimensions');
  const fModalStyle = document.getElementById('fModalStyle');
  const fModalStock = document.getElementById('fModalStock');
  const fModalStartDate = document.getElementById('fModalStartDate');
  const fModalEndDate = document.getElementById('fModalEndDate');
  const fModalQtyMinus = document.getElementById('fModalQtyMinus');
  const fModalQtyPlus = document.getElementById('fModalQtyPlus');
  const fModalQtyVal = document.getElementById('fModalQtyVal');
  const fModalDaysCount = document.getElementById('fModalDaysCount');
  const fModalCalcFormula = document.getElementById('fModalCalcFormula');
  const fModalCalcSubtotal = document.getElementById('fModalCalcSubtotal');
  const fModalCalcTotal = document.getElementById('fModalCalcTotal');
  const fModalAddToCartBtn = document.getElementById('fModalAddToCartBtn');

  // Cart Drawer Elements
  const furnioCartDrawer = document.getElementById('furnioCartDrawer');
  const fCartCloseBtn = document.getElementById('fCartCloseBtn');
  const fCartDrawerCount = document.getElementById('fCartDrawerCount');
  const fCartItemsList = document.getElementById('fCartItemsList');
  const fCartSubtotal = document.getElementById('fCartSubtotal');
  const fCartTaxes = document.getElementById('fCartTaxes');
  const fCartTotal = document.getElementById('fCartTotal');
  const fCartProceedBtn = document.getElementById('fCartProceedBtn');

  // Checkout Modal Elements
  const furnioCheckoutModal = document.getElementById('furnioCheckoutModal');
  const furnioCheckoutClose = document.getElementById('furnioCheckoutClose');
  const fStepIndicators = [
    document.getElementById('fStepIndicator1'),
    document.getElementById('fStepIndicator2'),
    document.getElementById('fStepIndicator3'),
    document.getElementById('fStepIndicator4')
  ];
  const fStepPanes = [
    document.getElementById('fStepPane1'),
    document.getElementById('fStepPane2'),
    document.getElementById('fStepPane3'),
    document.getElementById('fStepPane4')
  ];
  const fStep1Next = document.getElementById('fStep1Next');
  const fStep1Back = document.getElementById('fStep1Back');
  const fStep2Next = document.getElementById('fStep2Next');
  const fStep2Back = document.getElementById('fStep2Back');
  const fStep3Pay = document.getElementById('fStep3Pay');
  const fStep3Back = document.getElementById('fStep3Back');
  const fPayBtnSpinner = document.getElementById('fPayBtnSpinner');
  const fPayBtnText = document.getElementById('fPayBtnText');
  const fReviewItemsBox = document.getElementById('fReviewItemsBox');
  const fReviewAddress = document.getElementById('fReviewAddress');
  const fReviewContact = document.getElementById('fReviewContact');
  const fConfirmBookingId = document.getElementById('fConfirmBookingId');
  const fConfirmPaidAmount = document.getElementById('fConfirmPaidAmount');
  const fGoToMyBookings = document.getElementById('fGoToMyBookings');
  const fPayTabs = document.querySelectorAll('.f-pay-tab');

  // My Bookings Elements
  const furnioBookingsList = document.getElementById('furnioBookingsList');
  const fBookingTabs = document.querySelectorAll('.f-b-tab');

  // 12 Premium Furniture Catalog Database
  const furnioCatalog = [
    {
      id: 'FURN-01',
      name: 'Luna Lounge Chair',
      category: 'Chairs',
      style: 'Modern Minimalist',
      rate: 1200,
      rating: 4.8,
      reviews: 142,
      stock: 12,
      material: 'Solid Oak & Bouclé Fabric',
      dimensions: '85 × 92 × 78 cm',
      desc: 'Sculptural lounge chair crafted with solid kiln-dried oak wood, high-density foam cushioning, and textured bouclé upholstery. Designed for deep relaxation.',
      img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-02',
      name: 'Nordic Oak Dining Table',
      category: 'Tables',
      style: 'Scandinavian',
      rate: 2000,
      rating: 4.9,
      reviews: 98,
      stock: 8,
      material: 'Solid White Oak & Matte Lacquer',
      dimensions: '200 × 95 × 75 cm',
      desc: 'Minimalist 6-seater dining table with tapered cylindrical legs and organic soft-bevel edges. Finished with protective water-resistant lacquer.',
      img: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-03',
      name: 'Velvet Cloud Modular Sofa',
      category: 'Sofas',
      style: 'Luxury Modern',
      rate: 3500,
      rating: 4.95,
      reviews: 210,
      stock: 2,
      material: 'Feather Down Blend & Italian Velvet',
      dimensions: '280 × 110 × 70 cm',
      desc: 'Three-piece configurable modular sectional with ultra-plush down filling, stain-resistant velvet fabric, and hidden interlocking steel hardware.',
      img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-04',
      name: 'Kobe Minimalist Platform Bed',
      category: 'Beds',
      style: 'Japandi',
      rate: 2800,
      rating: 4.85,
      reviews: 76,
      stock: 6,
      material: 'Japanese Ash Wood & Slats',
      dimensions: '210 × 190 × 40 cm',
      desc: 'Low-profile king platform bed frame inspired by traditional Japanese carpentry. Includes floating bedside ledge and noise-isolated solid ash slats.',
      img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-05',
      name: 'ErgoPro Executive Desk & Chair',
      category: 'Office',
      style: 'Ergonomic Smart',
      rate: 1800,
      rating: 4.75,
      reviews: 189,
      stock: 15,
      material: 'Solid Walnut & Aircraft Aluminum',
      dimensions: '160 × 80 × 74 cm',
      desc: 'Complete high-performance executive suite featuring dual-motor electric sit-stand desk and breathable 4D adjustable ergonomic lumbar task chair.',
      img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-06',
      name: 'Brutalist Concrete Coffee Table',
      category: 'Tables',
      style: 'Industrial Brutalist',
      rate: 950,
      rating: 4.7,
      reviews: 64,
      stock: 10,
      material: 'Ultra-Light Cast Concrete & Sealer',
      dimensions: '110 × 110 × 35 cm',
      desc: 'Monolithic square coffee table with hand-troweled textured finish, water-repellent sealant, and recessed shadow line base.',
      img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-07',
      name: 'Flos Arc Brass Floor Lamp',
      category: 'Lighting',
      style: 'Mid-Century Modern',
      rate: 650,
      rating: 4.9,
      reviews: 112,
      stock: 14,
      material: 'Brushed Brass & Carrara Marble Base',
      dimensions: '220 cm Height • 190 cm Reach',
      desc: 'Iconic sweeping cantilever floor lamp with solid heavy Carrara marble stabilizing plinth, spun brass dome shade, and smart dimmable warm LED.',
      img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-08',
      name: 'Scandi Teak Credenza Storage',
      category: 'Storage',
      style: 'Mid-Century Scandi',
      rate: 1500,
      rating: 4.8,
      reviews: 53,
      stock: 3,
      material: 'Reclaimed Teak & Soft-Close Brass Hinges',
      dimensions: '180 × 45 × 75 cm',
      desc: 'Three-bay media sideboard with slatted sliding tambour doors, integrated cable passthrough, and adjustable internal tempered glass shelves.',
      img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-09',
      name: 'Bouclé Accent Armchair',
      category: 'Chairs',
      style: 'Contemporary',
      rate: 1400,
      rating: 4.88,
      reviews: 88,
      stock: 9,
      material: 'Curved Molded Plywood & White Bouclé',
      dimensions: '78 × 82 × 76 cm',
      desc: 'Organic cocoon accent chair with wraparound backrest, cloud-soft bouclé weave, and concealed swivel base for modern conversational living.',
      img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-10',
      name: 'Zenith Marble Nightstands (Set of 2)',
      category: 'Decor',
      style: 'Modern Luxury',
      rate: 800,
      rating: 4.65,
      reviews: 45,
      stock: 11,
      material: 'Nero Marquina Black Marble & Smoked Glass',
      dimensions: '45 × 45 × 52 cm each',
      desc: 'Pair of sculptural geometric bedside cubes featuring polished Nero Marquina marble top, fluted acoustic side panels, and hidden push-to-open drawer.',
      img: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-11',
      name: 'Aero Mesh Standing Desk',
      category: 'Office',
      style: 'Tech Minimalist',
      rate: 1650,
      rating: 4.92,
      reviews: 134,
      stock: 7,
      material: 'Carbon Steel Frame & Anti-Scratch Bamboo',
      dimensions: '140 × 75 × 68-125 cm',
      desc: 'Dual-stage motorized sit-to-stand desk with 4 memory presets, integrated anti-collision gyros, and magnetic under-desk power rail.',
      img: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=800&auto=format&fit=crop'
      ]
    },
    {
      id: 'FURN-12',
      name: 'Milano Chesterfield Leather Sofa',
      category: 'Sofas',
      style: 'Classic Luxury',
      rate: 4200,
      rating: 4.98,
      reviews: 160,
      stock: 1,
      material: 'Full-Grain Cognac Italian Leather',
      dimensions: '240 × 98 × 78 cm',
      desc: 'Hand-tufted deep button Chesterfield sofa tailored in vegetable-tanned Italian leather with antiqued brass nailhead trim and solid mahogany bun feet.',
      img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop'
      ]
    }
  ];

  // Active Cart State
  let cartBookings = [
    {
      item: furnioCatalog[0], // Luna Lounge Chair
      startDate: '2025-10-12',
      endDate: '2025-10-16',
      days: 4,
      qty: 2,
      total: 1200 * 4 * 2 // ₹9,600
    }
  ];

  // Active My Bookings Database
  let myBookingsData = [
    {
      bookingId: '#FRN-2025-0891',
      title: 'Nordic Oak Dining Table',
      img: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=800&auto=format&fit=crop',
      dates: 'Oct 24 - 28, 2025',
      days: 4,
      qty: 1,
      total: 9440, // with tax
      status: 'Upcoming'
    },
    {
      bookingId: '#FRN-2025-0742',
      title: 'Luna Lounge Chair (Set of 2)',
      img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop',
      dates: 'Oct 10 - 15, 2025',
      days: 5,
      qty: 2,
      total: 14160,
      status: 'Active'
    }
  ];

  // State for Product Details & Sticky Booking Panel
  let activeDetailItem = furnioCatalog[0];
  let detailRentalDays = 4;
  let detailQuantity = 1;

  // Open / Close FURNIO App
  window.openFurnioApp = function() {
    if (furnioAppModal) {
      furnioAppModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      renderFurnitureGrid(furnioCatalog);
      updateCartUI();
      renderMyBookings('all');
    }
  };

  function closeFurnioApp() {
    if (furnioAppModal) {
      furnioAppModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (furnioFeaturedCard) {
    furnioFeaturedCard.addEventListener('click', () => openFurnioApp());
  }

  if (furnioAppClose) {
    furnioAppClose.addEventListener('click', () => closeFurnioApp());
  }

  // Navigation Tab Switching
  furnioNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      furnioNavLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const targetTab = link.getAttribute('data-tab');
      furnioPageViews.forEach(page => {
        page.style.display = 'none';
      });

      if (targetTab === 'explore') {
        const p = document.getElementById('furnioExploreView');
        if (p) p.style.display = 'block';
      } else if (targetTab === 'collections') {
        const p = document.getElementById('furnioCollectionsView');
        if (p) p.style.display = 'block';
      } else if (targetTab === 'bookings') {
        const p = document.getElementById('furnioBookingsView');
        if (p) p.style.display = 'block';
        renderMyBookings('all');
      }
    });
  });

  // Render Furniture Grid with Filter & Sort
  function getFilteredCatalog() {
    let result = [...furnioCatalog];

    // Category filter
    const activeCatPill = document.querySelector('#furnioCategoryPills .f-cat-pill.active');
    const cat = activeCatPill ? activeCatPill.getAttribute('data-cat') : 'all';
    if (cat && cat !== 'all') {
      result = result.filter(item => item.category.toLowerCase() === cat.toLowerCase());
    }

    // Search query
    if (furnioSearchInput && furnioSearchInput.value.trim() !== '') {
      const q = furnioSearchInput.value.trim().toLowerCase();
      result = result.filter(item => 
        item.name.toLowerCase().includes(q) || 
        item.category.toLowerCase().includes(q) ||
        item.style.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q)
      );
    }

    // Available only
    if (furnioAvailOnlyCheck && furnioAvailOnlyCheck.checked) {
      result = result.filter(item => item.stock > 0);
    }

    // Sorting
    const sortVal = furnioSortSelect ? furnioSortSelect.value : 'popular';
    if (sortVal === 'price-asc') {
      result.sort((a, b) => a.rate - b.rate);
    } else if (sortVal === 'price-desc') {
      result.sort((a, b) => b.rate - a.rate);
    } else if (sortVal === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortVal === 'newest') {
      result.reverse();
    }

    return result;
  }

  function renderFurnitureGrid(items) {
    if (!furnioFurnitureGrid) return;
    if (items.length === 0) {
      furnioFurnitureGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #888;">
          <h3>No furniture items match your search.</h3>
          <p style="font-size: 0.85rem; margin-top: 0.5rem;">Try adjusting your category filter or search query.</p>
        </div>
      `;
      return;
    }

    furnioFurnitureGrid.innerHTML = items.map(item => `
      <div class="furnio-card" data-id="${item.id}">
        <div class="f-card-img-wrap">
          <img src="${item.img}" alt="${item.name}" class="f-card-img" loading="lazy" />
          <span class="f-card-tag ${item.stock <= 3 ? 'low-stock' : 'available'}">
            ${item.stock <= 3 ? `Only ${item.stock} left` : 'Available'}
          </span>
          <div class="f-card-quick-overlay">
            <button class="f-quick-btn f-card-quickview-btn" data-id="${item.id}">Quick View</button>
          </div>
        </div>
        <div class="f-card-body">
          <div class="f-card-cat-row">
            <span class="f-card-cat">${item.category} • ${item.style.split(' ')[0]}</span>
            <span class="f-card-rating">★ ${item.rating}</span>
          </div>
          <h3 class="f-card-title">${item.name}</h3>
          <div class="f-card-footer-row">
            <div>
              <span class="f-card-price">₹${item.rate.toLocaleString()}</span>
              <span class="f-card-unit"> / day</span>
            </div>
            <button class="f-card-book-btn" data-id="${item.id}">Book Now</button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to cards
    furnioFurnitureGrid.querySelectorAll('.furnio-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const id = card.getAttribute('data-id');
        const item = furnioCatalog.find(p => p.id === id);
        if (item) openProductModal(item);
      });
    });

    furnioFurnitureGrid.querySelectorAll('.f-card-book-btn, .f-card-quickview-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const item = furnioCatalog.find(p => p.id === id);
        if (item) openProductModal(item);
      });
    });
  }

  // Filter Events
  if (furnioCategoryPills) {
    furnioCategoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        furnioCategoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderFurnitureGrid(getFilteredCatalog());
      });
    });
  }

  if (furnioSearchInput) {
    furnioSearchInput.addEventListener('input', () => {
      renderFurnitureGrid(getFilteredCatalog());
    });
  }

  // Custom Sort Dropdown Logic
  const furnioCustomSort = document.getElementById('furnioCustomSort');
  const furnioSortBtn = document.getElementById('furnioSortBtn');
  const furnioSortLabel = document.getElementById('furnioSortLabel');
  const furnioSortDropdown = document.getElementById('furnioSortDropdown');
  const fSortOpts = document.querySelectorAll('.f-sort-opt');

  if (furnioSortBtn && furnioCustomSort) {
    furnioSortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      furnioCustomSort.classList.toggle('open');
    });

    fSortOpts.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        fSortOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        const val = opt.getAttribute('data-val');
        if (furnioSortLabel) furnioSortLabel.textContent = opt.textContent;
        if (furnioSortSelect) {
          furnioSortSelect.value = val;
          furnioSortSelect.dispatchEvent(new Event('change'));
        }
        furnioCustomSort.classList.remove('open');
        renderFurnitureGrid(getFilteredCatalog());
      });
    });

    document.addEventListener('click', (e) => {
      if (furnioCustomSort && !furnioCustomSort.contains(e.target)) {
        furnioCustomSort.classList.remove('open');
      }
    });
  }

  if (furnioSortSelect) {
    furnioSortSelect.addEventListener('change', () => {
      renderFurnitureGrid(getFilteredCatalog());
    });
  }

  if (furnioAvailOnlyCheck) {
    furnioAvailOnlyCheck.addEventListener('change', () => {
      renderFurnitureGrid(getFilteredCatalog());
    });
  }

  // Curated Bundle Buttons in Collections View
  const furnioBundleBtns = document.querySelectorAll('.furnio-bundle-btn');
  furnioBundleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const bundle = btn.getAttribute('data-bundle');
      let itemsToAdd = [];

      if (bundle === 'nordic') {
        itemsToAdd = [furnioCatalog[0], furnioCatalog[1], furnioCatalog[2], furnioCatalog[6]];
      } else if (bundle === 'office') {
        itemsToAdd = [furnioCatalog[4], furnioCatalog[10], furnioCatalog[7]];
      } else {
        itemsToAdd = [furnioCatalog[3], furnioCatalog[9], furnioCatalog[6]];
      }

      itemsToAdd.forEach(it => {
        cartBookings.push({
          item: it,
          startDate: '2025-10-15',
          endDate: '2025-10-19',
          days: 4,
          qty: 1,
          total: it.rate * 4
        });
      });

      updateCartUI();
      openCartDrawer();
    });
  });

  // Product Details Modal Logic
  function closeAllFurnioOverlays() {
    if (furnioProductModal) furnioProductModal.classList.remove('open');
    if (furnioCartDrawer) furnioCartDrawer.classList.remove('open');
    if (furnioCheckoutModal) furnioCheckoutModal.classList.remove('open');
  }
  window.closeAllFurnioOverlays = closeAllFurnioOverlays;

  function openProductModal(item) {
    closeAllFurnioOverlays();
    activeDetailItem = item;
    detailQuantity = 1;
    detailRentalDays = 4;

    if (fModalMainImg) fModalMainImg.src = item.img;
    if (fModalAvailBadge) {
      fModalAvailBadge.innerText = item.stock <= 3 ? `Only ${item.stock} items left` : 'Available';
      fModalAvailBadge.style.background = item.stock <= 3 ? '#F59E0B' : '#22C55E';
    }
    if (fModalCategory) fModalCategory.innerText = `${item.category} • ${item.style}`;
    if (fModalTitle) fModalTitle.innerText = item.name;
    if (fModalRating) fModalRating.innerText = `★ ${item.rating}`;
    if (fModalReviews) fModalReviews.innerText = `(${item.reviews} verified bookings)`;
    if (fModalDailyRate) fModalDailyRate.innerText = `₹${item.rate.toLocaleString()}`;
    if (fModalDesc) fModalDesc.innerText = item.desc;
    if (fModalMaterial) fModalMaterial.innerText = item.material;
    if (fModalDimensions) fModalDimensions.innerText = item.dimensions;
    if (fModalStyle) fModalStyle.innerText = item.style;
    if (fModalStock) fModalStock.innerText = `${item.stock} Units Available`;

    // Thumbnails
    if (fModalThumbs) {
      fModalThumbs.innerHTML = item.gallery.map((imgSrc, idx) => `
        <div class="f-thumb-item ${idx === 0 ? 'active' : ''}" data-src="${imgSrc}">
          <img src="${imgSrc}" alt="${item.name}" />
        </div>
      `).join('');

      fModalThumbs.querySelectorAll('.f-thumb-item').forEach(th => {
        th.addEventListener('click', () => {
          fModalThumbs.querySelectorAll('.f-thumb-item').forEach(t => t.classList.remove('active'));
          th.classList.add('active');
          if (fModalMainImg) fModalMainImg.src = th.getAttribute('data-src');
        });
      });
    }

    // Default Dates (Tomorrow + 4 Days)
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 1);
    const end = new Date(start);
    end.setDate(start.getDate() + 4);

    if (fModalStartDate) fModalStartDate.value = start.toISOString().split('T')[0];
    if (fModalEndDate) fModalEndDate.value = end.toISOString().split('T')[0];

    updateDetailPricing();

    if (furnioProductModal) {
      furnioProductModal.classList.add('open');
      if (typeof window.pauseFurnioAutoDemo === 'function') window.pauseFurnioAutoDemo(true);
    }
  }

  function closeProductModal() {
    if (furnioProductModal) furnioProductModal.classList.remove('open');
  }
  window.closeProductModal = closeProductModal;

  if (furnioProductClose) {
    furnioProductClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeProductModal();
    });
    furnioProductClose.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeProductModal();
    });
  }

  if (furnioProductModal) {
    furnioProductModal.addEventListener('click', (e) => {
      if (e.target === furnioProductModal) {
        closeProductModal();
      }
    });
  }

  function updateDetailPricing() {
    if (!fModalStartDate || !fModalEndDate) return;
    const start = new Date(fModalStartDate.value);
    const end = new Date(fModalEndDate.value);
    const diffTime = end - start;
    let days = Math.round(diffTime / (1000 * 60 * 60 * 24));
    if (days < 1) days = 1;
    detailRentalDays = days;

    if (fModalQtyVal) fModalQtyVal.innerText = detailQuantity;
    if (fModalDaysCount) fModalDaysCount.innerText = `${days} Days Rental`;

    const subtotal = activeDetailItem.rate * days * detailQuantity;
    if (fModalCalcFormula) fModalCalcFormula.innerText = `₹${activeDetailItem.rate.toLocaleString()} × ${days} Days × ${detailQuantity} Item${detailQuantity > 1 ? 's' : ''}`;
    if (fModalCalcSubtotal) fModalCalcSubtotal.innerText = `₹${subtotal.toLocaleString()}`;
    if (fModalCalcTotal) fModalCalcTotal.innerText = `₹${subtotal.toLocaleString()}`;
  }

  if (fModalStartDate) fModalStartDate.addEventListener('change', () => updateDetailPricing());
  if (fModalEndDate) fModalEndDate.addEventListener('change', () => updateDetailPricing());

  if (fModalQtyMinus) {
    fModalQtyMinus.addEventListener('click', () => {
      if (detailQuantity > 1) {
        detailQuantity--;
        updateDetailPricing();
      }
    });
  }

  if (fModalQtyPlus) {
    fModalQtyPlus.addEventListener('click', () => {
      if (detailQuantity < activeDetailItem.stock) {
        detailQuantity++;
        updateDetailPricing();
      }
    });
  }

  // Add to Cart from Details Modal
  if (fModalAddToCartBtn) {
    fModalAddToCartBtn.addEventListener('click', () => {
      cartBookings.push({
        item: activeDetailItem,
        startDate: fModalStartDate.value,
        endDate: fModalEndDate.value,
        days: detailRentalDays,
        qty: detailQuantity,
        total: activeDetailItem.rate * detailRentalDays * detailQuantity
      });

      closeAllFurnioOverlays();
      openCartDrawer();
    });
  }

  // Cart Drawer Logic
  function openCartDrawer() {
    closeAllFurnioOverlays();
    updateCartUI();
    if (furnioCartDrawer) {
      furnioCartDrawer.classList.add('open');
      if (typeof window.pauseFurnioAutoDemo === 'function') window.pauseFurnioAutoDemo(true);
    }
  }
  window.openCartDrawer = openCartDrawer;

  function closeCartDrawer() {
    if (furnioCartDrawer) furnioCartDrawer.classList.remove('open');
  }
  window.closeCartDrawer = closeCartDrawer;

  if (furnioCartTrigger) {
    furnioCartTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openCartDrawer();
    });
  }

  if (fCartCloseBtn) {
    fCartCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeCartDrawer();
    });
  }

  function updateCartUI() {
    const count = cartBookings.reduce((sum, b) => sum + b.qty, 0);
    if (furnioCartCountBadge) furnioCartCountBadge.innerText = count;
    if (fCartDrawerCount) fCartDrawerCount.innerText = `${count} ITEMS`;

    const subtotal = cartBookings.reduce((sum, b) => sum + b.total, 0);
    const taxes = Math.round(subtotal * 0.18);
    const total = subtotal + taxes;

    if (fCartSubtotal) fCartSubtotal.innerText = `₹${subtotal.toLocaleString()}`;
    if (fCartTaxes) fCartTaxes.innerText = `₹${taxes.toLocaleString()}`;
    if (fCartTotal) fCartTotal.innerText = `₹${total.toLocaleString()}`;
    if (fPayBtnText) fPayBtnText.innerText = `AUTHORIZE & PAY ₹${total.toLocaleString()}`;

    if (fCartItemsList) {
      if (cartBookings.length === 0) {
        fCartItemsList.innerHTML = `
          <div style="text-align: center; padding: 2.5rem 1rem; color: #888;">
            <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">🛒</span>
            <h4>Your booking cart is empty</h4>
            <p style="font-size: 0.8rem; margin-top: 0.25rem;">Browse and add furniture pieces to get started.</p>
          </div>
        `;
        if (fCartProceedBtn) fCartProceedBtn.disabled = true;
      } else {
        if (fCartProceedBtn) fCartProceedBtn.disabled = false;
        fCartItemsList.innerHTML = cartBookings.map((b, idx) => `
          <div class="f-cart-item-row">
            <img src="${b.item.img}" alt="${b.item.name}" class="f-cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop'" />
            <div class="f-cart-item-info">
              <span class="f-cart-item-name">${b.item.name}</span>
              <span class="f-cart-item-meta">📅 ${b.days} Days (${b.startDate} to ${b.endDate})</span>
              <span class="f-cart-item-meta">Qty: ${b.qty} × ₹${b.item.rate.toLocaleString()}/day</span>
              <span class="f-cart-item-pricing">₹${b.total.toLocaleString()}</span>
            </div>
            <button class="f-cart-item-remove" data-index="${idx}" title="Remove item">🗑️</button>
          </div>
        `).join('');

        fCartItemsList.querySelectorAll('.f-cart-item-remove').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.getAttribute('data-index'));
            cartBookings.splice(index, 1);
            updateCartUI();
          });
        });
      }
    }
  }

  // Multi-Step Checkout Modal Logic
  function openCheckoutModal() {
    if (cartBookings.length === 0) return;
    closeAllFurnioOverlays();
    setCheckoutStep(1);
    if (furnioCheckoutModal) {
      furnioCheckoutModal.classList.add('open');
      if (typeof window.pauseFurnioAutoDemo === 'function') window.pauseFurnioAutoDemo(true);
    }
  }
  window.openCheckoutModal = openCheckoutModal;

  function closeCheckoutModal() {
    if (furnioCheckoutModal) furnioCheckoutModal.classList.remove('open');
  }
  window.closeCheckoutModal = closeCheckoutModal;

  if (fCartProceedBtn) {
    fCartProceedBtn.addEventListener('click', () => openCheckoutModal());
  }

  if (furnioCheckoutClose) {
    furnioCheckoutClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeCheckoutModal();
    });
    furnioCheckoutClose.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeCheckoutModal();
    });
  }

  if (furnioCheckoutModal) {
    furnioCheckoutModal.addEventListener('click', (e) => {
      if (e.target === furnioCheckoutModal) {
        closeCheckoutModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCheckoutModal();
      closeCartDrawer();
    }
  });

  function setCheckoutStep(stepNumber) {
    fStepIndicators.forEach((ind, idx) => {
      if (ind) ind.classList.toggle('active', idx + 1 <= stepNumber);
    });

    fStepPanes.forEach((pane, idx) => {
      if (pane) pane.style.display = (idx + 1 === stepNumber) ? 'block' : 'none';
    });

    if (stepNumber === 2) {
      renderReviewSummary();
    }
  }

  function renderReviewSummary() {
    const custName = document.getElementById('fCustName')?.value || 'John Doe';
    const custPhone = document.getElementById('fCustPhone')?.value || '+91 98765 43210';
    const custAddr = document.getElementById('fCustAddress')?.value || '704 Horizon Tower';
    const custCity = document.getElementById('fCustCity')?.value || 'Bengaluru';
    const custPin = document.getElementById('fCustPin')?.value || '560038';

    if (fReviewAddress) fReviewAddress.innerText = `${custAddr}, ${custCity} - ${custPin}`;
    if (fReviewContact) fReviewContact.innerText = `${custName} • ${custPhone}`;

    if (fReviewItemsBox) {
      const subtotal = cartBookings.reduce((sum, b) => sum + b.total, 0);
      const taxes = Math.round(subtotal * 0.18);
      const total = subtotal + taxes;

      fReviewItemsBox.innerHTML = `
        <div style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 800; margin-bottom: 0.4rem;">
          RENTAL INVENTORY (${cartBookings.length} ITEMS)
        </div>
        ${cartBookings.map(b => `
          <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
            <span>${b.item.name} (${b.days} Days × ${b.qty})</span>
            <span style="font-family: var(--font-mono); font-weight: 700;">₹${b.total.toLocaleString()}</span>
          </div>
        `).join('')}
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: #777; margin-top: 0.5rem; border-top: 1px dashed #DDD; padding-top: 0.4rem;">
          <span>GST (18%)</span>
          <span style="font-family: var(--font-mono);">₹${taxes.toLocaleString()}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: 900; margin-top: 0.25rem; color: #171717;">
          <span>TOTAL PAYABLE</span>
          <span style="font-family: var(--font-mono); color: var(--accent);">₹${total.toLocaleString()}</span>
        </div>
      `;
    }
  }

  if (fStep1Next) fStep1Next.addEventListener('click', () => setCheckoutStep(2));
  if (fStep1Back) fStep1Back.addEventListener('click', () => { closeCheckoutModal(); openCartDrawer(); });
  if (fStep2Next) fStep2Next.addEventListener('click', () => setCheckoutStep(3));
  if (fStep2Back) fStep2Back.addEventListener('click', () => setCheckoutStep(1));
  if (fStep3Back) fStep3Back.addEventListener('click', () => setCheckoutStep(2));

  // Payment Tabs Switcher
  fPayTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      fPayTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const method = tab.getAttribute('data-method');
      const pCard = document.getElementById('fPayPaneCard');
      const pUpi = document.getElementById('fPayPaneUpi');
      const pNet = document.getElementById('fPayPaneNetbank');

      if (pCard) pCard.style.display = method === 'card' ? 'block' : 'none';
      if (pUpi) pUpi.style.display = method === 'upi' ? 'block' : 'none';
      if (pNet) pNet.style.display = method === 'netbank' ? 'block' : 'none';
    });
  });

  // Simulated Payment Execution
  if (fStep3Pay) {
    fStep3Pay.addEventListener('click', () => {
      if (fPayBtnSpinner) fPayBtnSpinner.style.display = 'inline-block';
      if (fPayBtnText) fPayBtnText.innerText = 'PROCESSING ENCRYPTED PAYMENT...';
      fStep3Pay.disabled = true;

      setTimeout(() => {
        if (fPayBtnSpinner) fPayBtnSpinner.style.display = 'none';
        fStep3Pay.disabled = false;

        const subtotal = cartBookings.reduce((sum, b) => sum + b.total, 0);
        const taxes = Math.round(subtotal * 0.18);
        const grandTotal = subtotal + taxes;
        const generatedBookingId = `#FRN-2025-${Math.floor(1000 + Math.random() * 9000)}`;

        if (fConfirmBookingId) fConfirmBookingId.innerText = generatedBookingId;
        if (fConfirmPaidAmount) fConfirmPaidAmount.innerText = `₹${grandTotal.toLocaleString()}.00`;

        // Push new bookings into My Bookings state
        cartBookings.forEach(b => {
          myBookingsData.unshift({
            bookingId: generatedBookingId,
            title: b.item.name,
            img: b.item.img,
            dates: `${b.startDate} to ${b.endDate}`,
            days: b.days,
            qty: b.qty,
            total: b.total + Math.round(b.total * 0.18),
            status: 'Upcoming'
          });
        });

        // Clear cart
        cartBookings = [];
        updateCartUI();

        setCheckoutStep(4);
      }, 1300);
    });
  }

  // Go to My Bookings button from confirmation step
  if (fGoToMyBookings) {
    fGoToMyBookings.addEventListener('click', () => {
      closeCheckoutModal();
      const bookingsNavLink = document.querySelector('.furnio-nav-link[data-tab="bookings"]');
      if (bookingsNavLink) bookingsNavLink.click();
    });
  }

  // My Bookings Tab Switcher & Renderer
  fBookingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      fBookingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMyBookings(tab.getAttribute('data-status'));
    });
  });

  function renderMyBookings(filterStatus) {
    if (!furnioBookingsList) return;

    let list = [...myBookingsData];
    if (filterStatus && filterStatus !== 'all') {
      list = list.filter(b => b.status.toLowerCase() === filterStatus.toLowerCase());
    }

    // Update Tab Counts
    const countAll = myBookingsData.length;
    const countUpcoming = myBookingsData.filter(b => b.status === 'Upcoming').length;
    const countActive = myBookingsData.filter(b => b.status === 'Active').length;
    const countCompleted = myBookingsData.filter(b => b.status === 'Completed').length;
    const countCancelled = myBookingsData.filter(b => b.status === 'Cancelled').length;

    const elAll = document.getElementById('countAllB');
    const elUp = document.getElementById('countUpcomingB');
    const elAct = document.getElementById('countActiveB');
    const elComp = document.getElementById('countCompletedB');
    const elCanc = document.getElementById('countCancelledB');

    if (elAll) elAll.innerText = countAll;
    if (elUp) elUp.innerText = countUpcoming;
    if (elAct) elAct.innerText = countActive;
    if (elComp) elComp.innerText = countCompleted;
    if (elCanc) elCanc.innerText = countCancelled;
    if (furnioBookingsBadge) furnioBookingsBadge.innerText = countUpcoming + countActive;

    if (list.length === 0) {
      furnioBookingsList.innerHTML = `
        <div style="background:#FFF; border-radius:12px; padding:3rem 1rem; text-align:center; color:#888;">
          <h3>No bookings found in this category.</h3>
        </div>
      `;
      return;
    }

    furnioBookingsList.innerHTML = list.map((b, idx) => `
      <div class="furnio-booking-card">
        <div class="f-b-left-col">
          <img src="${b.img}" alt="${b.title}" class="f-b-thumb" />
          <div>
            <span class="f-b-id">${b.bookingId}</span>
            <h4 class="f-b-title">${b.title}</h4>
            <div class="f-b-dates">📅 ${b.dates} (${b.days} Days • Qty ${b.qty})</div>
          </div>
        </div>

        <div class="f-b-actions-col">
          <span class="f-b-status-pill ${b.status}">${b.status}</span>
          <span class="f-b-total-price">₹${b.total.toLocaleString()}</span>
          ${b.status !== 'Cancelled' && b.status !== 'Completed' ? `
            <button class="f-btn-extend" data-id="${b.bookingId}">+3 Days Extend</button>
            <button class="f-btn-cancel" data-id="${b.bookingId}">Cancel</button>
          ` : `
            <button class="f-btn-extend" style="opacity:0.7;">Invoice 📄</button>
          `}
        </div>
      </div>
    `).join('');

    // Attach Extend & Cancel Listeners
    furnioBookingsList.querySelectorAll('.f-btn-extend').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const booking = myBookingsData.find(b => b.bookingId === id);
        if (booking) {
          booking.days += 3;
          booking.total += Math.round(booking.total * 0.4);
          renderMyBookings(filterStatus);
        }
      });
    });

    furnioBookingsList.querySelectorAll('.f-btn-cancel').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const booking = myBookingsData.find(b => b.bookingId === id);
        if (booking) {
          booking.status = 'Cancelled';
          renderMyBookings(filterStatus);
        }
      });
    });
  }

  // Run initialization immediately for direct inline embed
  renderFurnitureGrid(furnioCatalog);
  updateCartUI();
  renderMyBookings('all');

  /* --------------------------------------------------------------------------
     6. Quick-View Case Study Modal
     -------------------------------------------------------------------------- */
  const quickViewModal = document.getElementById('quickViewModal');
  const quickViewClose = document.getElementById('quickViewClose');
  const qvImage = document.getElementById('qvImage');
  const qvTitle = document.getElementById('qvTitle');
  const qvCategory = document.getElementById('qvCategory');
  const qvMeta = document.getElementById('qvMeta');
  const qvDescription = document.getElementById('qvDescription');

  if (quickViewClose && quickViewModal) {
    quickViewClose.addEventListener('click', () => {
      quickViewModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) {
        quickViewModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  window.openServiceInquiryFromQV = function() {
    if (quickViewModal) {
      quickViewModal.classList.remove('open');
    }
    const inquiryModal = document.getElementById('inquiryModal');
    if (inquiryModal) {
      inquiryModal.classList.add('open');
    }
  };

  /* --------------------------------------------------------------------------
     7. Project Inquiry Modal
     -------------------------------------------------------------------------- */
  const inquiryModal = document.getElementById('inquiryModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (inquiryModal) {
        inquiryModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn && inquiryModal) {
    modalCloseBtn.addEventListener('click', () => {
      inquiryModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) {
        inquiryModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Pre-select service when clicked from service card
  window.openServiceInquiry = function(serviceName) {
    if (inquiryModal) {
      const checkboxes = inquiryModal.querySelectorAll('input[name="services"]');
      checkboxes.forEach(cb => {
        cb.checked = (cb.value.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(cb.value.toLowerCase()));
      });
      inquiryModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  /* --------------------------------------------------------------------------
     8. Form Submit & Instant WhatsApp Redirection (with 10-Digit & 500-Char Validation)
     -------------------------------------------------------------------------- */
  const inquiryForm = document.getElementById('projectInquiryForm');
  const toast = document.getElementById('toastNotification');
  const clientPhoneInput = document.getElementById('clientPhone');
  const clientEmailInput = document.getElementById('clientEmail');
  const projectDetailsInput = document.getElementById('projectDetails');
  const descCharCount = document.getElementById('descCharCount');

  // Restrict phone input to max 10 numeric digits in real-time
  if (clientPhoneInput) {
    clientPhoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    });
  }

  // Automatically convert any uppercase email letters into lowercase in real-time
  if (clientEmailInput) {
    clientEmailInput.addEventListener('input', (e) => {
      const cursor = e.target.selectionStart;
      e.target.value = e.target.value.toLowerCase().replace(/\s+/g, '');
      e.target.setSelectionRange(cursor, cursor);
    });
    clientEmailInput.addEventListener('blur', (e) => {
      e.target.value = e.target.value.toLowerCase().trim();
    });
  }

  // Live 500-character counter for Project Overview & Goals
  if (projectDetailsInput && descCharCount) {
    projectDetailsInput.addEventListener('input', () => {
      const len = projectDetailsInput.value.length;
      descCharCount.innerText = `${len} / 500`;
      if (len >= 500) {
        descCharCount.style.color = 'var(--accent)';
      } else {
        descCharCount.style.color = 'var(--text-muted)';
      }
    });
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const clientName = (document.getElementById('clientName')?.value || '').trim();
      const rawPhone = (document.getElementById('clientPhone')?.value || '').trim();
      const clientPhone = rawPhone.replace(/\D/g, '');
      const clientEmail = (document.getElementById('clientEmail')?.value || '').trim().toLowerCase();
      const clientCompany = (document.getElementById('clientCompany')?.value || '').trim();
      const projectBudget = (document.getElementById('projectBudget')?.value || '').trim();
      let projectDetails = (document.getElementById('projectDetails')?.value || '').trim();

      // Validate 10-Digit Mobile Number
      if (!/^\d{10}$/.test(clientPhone)) {
        if (toast) {
          const toastTitle = document.getElementById('toastTitle');
          const toastMessage = document.getElementById('toastMessage');
          if (toastTitle) toastTitle.innerText = `Invalid Mobile Number`;
          if (toastMessage) toastMessage.innerText = `Please enter a valid 10-digit mobile number.`;
          toast.classList.add('active');
          setTimeout(() => toast.classList.remove('active'), 4000);
        }
        clientPhoneInput?.focus();
        return;
      }

      // Enforce 500-Character limit on description
      if (projectDetails.length > 500) {
        projectDetails = projectDetails.slice(0, 500);
      }

      const selectedCheckboxes = inquiryForm.querySelectorAll('input[name="services"]:checked');
      const selectedServices = Array.from(selectedCheckboxes).map(cb => cb.value);

      const servicesText = selectedServices.length > 0 ? selectedServices.join(', ') : 'Not specified';
      
      // Format clean, professional, and user-friendly WhatsApp message
      const messageLines = [
        `Hi Kreativx Media Team,`,
        ``,
        `I would like to discuss a project with your team. Here are my project details:`,
        ``,
        `* Name: ${clientName}`,
        `* Mobile: ${clientPhone}`,
        `* Email: ${clientEmail}`
      ];

      if (clientCompany && clientCompany !== 'N/A') {
        messageLines.push(`* Company / Brand: ${clientCompany}`);
      }

      if (projectBudget) {
        messageLines.push(`* Estimated Budget: ${projectBudget}`);
      }

      if (selectedServices.length > 0) {
        messageLines.push(`* Services Required: ${selectedServices.join(', ')}`);
      }

      if (projectDetails && projectDetails !== 'N/A') {
        messageLines.push(``);
        messageLines.push(`Project Overview & Goals:`);
        messageLines.push(`${projectDetails}`);
      }

      messageLines.push(``);
      messageLines.push(`Looking forward to connecting with you!`);

      const whatsappMessage = messageLines.join('\n');
      const encodedText = encodeURIComponent(whatsappMessage);
      const waUrl = `https://wa.me/917288069769?text=${encodedText}`;

      // Close modal
      if (inquiryModal) {
        inquiryModal.classList.remove('open');
        document.body.style.overflow = '';
      }

      // Show toast notification
      if (toast) {
        const toastTitle = document.getElementById('toastTitle');
        const toastMessage = document.getElementById('toastMessage');
        if (toastTitle) toastTitle.innerText = `Thank you, ${clientName}!`;
        if (toastMessage) toastMessage.innerText = `Redirecting directly to WhatsApp (+91 7288069769)...`;

        toast.classList.add('active');
        setTimeout(() => {
          toast.classList.remove('active');
        }, 5000);
      }

      // Universal Instant WhatsApp Launch (Works across Android, iOS, and Desktop)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = waUrl;
      } else {
        const waWin = window.open(waUrl, '_blank', 'noopener,noreferrer');
        if (!waWin || waWin.closed || typeof waWin.closed === 'undefined') {
          window.location.href = waUrl;
        }
      }

      inquiryForm.reset();
      if (descCharCount) descCharCount.innerText = '0 / 500';
    });
  }

  /* --------------------------------------------------------------------------
     9. Testimonials Carousel
     -------------------------------------------------------------------------- */
  const slides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === index);
    });
  }

  if (slides.length > 0) {
    // Auto-advance every 7 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 7000);
  }

  /* --------------------------------------------------------------------------
     10. Live Footer Studio Clock (Removed)
     -------------------------------------------------------------------------- */

  /* --------------------------------------------------------------------------
     12. Automatic Interactive Demo Cursor Engine (Web & Mobile Showcase)
     -------------------------------------------------------------------------- */
  const autoCursorLayer = document.getElementById('autoCursorLayer');
  const autoCursorPointer = document.getElementById('autoCursorPointer');
  const autoCursorBadge = document.getElementById('autoCursorBadge');
  const appWebsitesSection = document.getElementById('websitesSection');

  if (autoCursorPointer && autoCursorLayer) {
    let cursorX = 120;
    let cursorY = 80;
    let isRunning = false;
    let isUserActive = false;
    let idleTimer = null;
    let moveAnimId = null;
    let stepTimer = null;
    let scriptStepIndex = 0;

    // Update physical pointer position with GPU translate3d
    function setPointerPos(x, y) {
      cursorX = x;
      cursorY = y;
      autoCursorPointer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    // Set initial position
    setPointerPos(cursorX, cursorY);

    // Immediately halt all animations, timers, and queued actions
    function haltAutomationImmediately() {
      if (moveAnimId) {
        cancelAnimationFrame(moveAnimId);
        moveAnimId = null;
      }
      if (stepTimer) {
        clearTimeout(stepTimer);
        stepTimer = null;
      }
      isRunning = false;
      autoCursorPointer.classList.remove('clicking', 'visible');
      autoCursorPointer.classList.add('hidden');
      if (autoCursorBadge) {
        autoCursorBadge.style.opacity = '0';
      }
    }

    // User Takeover: Instant stop on any interaction
    function onUserInteraction(longDelay = false) {
      isUserActive = true;
      haltAutomationImmediately();

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isUserActive = false;
        checkAndResumeDemo();
      }, longDelay ? 3500 : 2500);
    }

    window.pauseFurnioAutoDemo = onUserInteraction;

    // Direct User Activity Listeners for immediate takeover with zero delay
    const furnioBrowserFrame = document.querySelector('.furnio-browser-frame') || appWebsitesSection;
    if (furnioBrowserFrame) {
      ['mouseenter', 'mousemove', 'mousedown', 'wheel', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'keydown', 'click'].forEach(evt => {
        furnioBrowserFrame.addEventListener(evt, () => onUserInteraction(false), { passive: true });
      });

      furnioBrowserFrame.addEventListener('mouseleave', () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          if (typeof window.closeAllFurnioOverlays === 'function') window.closeAllFurnioOverlays();
          isUserActive = false;
          checkAndResumeDemo();
        }, 300);
      });
    }

    // Modal & Drawer direct activity listeners
    [document.getElementById('furnioProductModal'), document.getElementById('furnioCartDrawer'), document.getElementById('furnioCheckoutModal')].forEach(el => {
      if (el) {
        ['mouseenter', 'mousemove', 'mousedown', 'wheel', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'keydown', 'click'].forEach(evt => {
          el.addEventListener(evt, () => onUserInteraction(true), { passive: true });
        });
      }
    });

    // Check if Applications section is currently visible
    function isApplicationsSectionVisible() {
      const targetSection = document.getElementById('furnioDirectAppSection') || appWebsitesSection;
      if (!targetSection) return true;
      const rect = targetSection.getBoundingClientRect();
      return (rect.top < window.innerHeight + 300) && (rect.bottom > -300);
    }

    // Resume demo loop if user is idle and section is visible
    function checkAndResumeDemo() {
      if (isUserActive) return;
      if (!isApplicationsSectionVisible()) {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(checkAndResumeDemo, 800);
        return;
      }
      if (!isRunning) {
        isRunning = true;
        autoCursorPointer.classList.remove('hidden');
        autoCursorPointer.classList.add('visible');
        executeNextDemoStep();
      }
    }

    // Calculate live target element center coordinates relative to autoCursorLayer
    function getElementTargetPos(element) {
      if (!element) return null;
      const cRect = autoCursorLayer.getBoundingClientRect();
      const eRect = element.getBoundingClientRect();
      if (eRect.width === 0 || eRect.height === 0) return null;

      // Cursor SVG tip is at (4px, 3px)
      let targetX = (eRect.left - cRect.left + eRect.width * 0.5) - 4;
      let targetY = (eRect.top - cRect.top + eRect.height * 0.5) - 3;

      // Clamp within autoCursorLayer bounds
      targetX = Math.max(6, Math.min(targetX, cRect.width - 24));
      targetY = Math.max(6, Math.min(targetY, cRect.height - 24));

      return { x: targetX, y: targetY };
    }

    // Smooth Bezier Interpolation Glide towards target
    function glideTo(targetX, targetY, duration, badgeText, callback) {
      if (!isRunning || isUserActive) {
        haltAutomationImmediately();
        return;
      }

      if (autoCursorBadge && badgeText) {
        autoCursorBadge.textContent = badgeText;
        autoCursorBadge.style.opacity = '1';
      }

      const startX = cursorX;
      const startY = cursorY;
      const startTime = performance.now();

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function stepGlide(now) {
        if (!isRunning || isUserActive) {
          haltAutomationImmediately();
          return;
        }

        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);

        const curX = startX + (targetX - startX) * ease;
        const curY = startY + (targetY - startY) * ease;
        setPointerPos(curX, curY);

        if (progress < 1) {
          moveAnimId = requestAnimationFrame(stepGlide);
        } else {
          moveAnimId = null;
          if (callback && isRunning && !isUserActive) {
            callback();
          }
        }
      }

      moveAnimId = requestAnimationFrame(stepGlide);
    }

    // Fast Glide to DOM Element directly using live coordinates
    function glideToElement(element, badgeText, duration = 450, callback) {
      if (!element || !isRunning || isUserActive) {
        if (callback && isRunning && !isUserActive) callback();
        return;
      }

      const pos = getElementTargetPos(element);
      if (!pos) {
        if (callback && isRunning && !isUserActive) callback();
        return;
      }

      glideTo(pos.x, pos.y, duration, badgeText, callback);
    }

    // Simulate Snappy Tap / Click with Visual Ripple
    function clickElement(element, badgeText, afterDelay = 350, callback) {
      if (!element || !isRunning || isUserActive) {
        if (callback && isRunning && !isUserActive) callback();
        return;
      }

      autoCursorPointer.classList.add('clicking');
      if (autoCursorBadge && badgeText) autoCursorBadge.textContent = badgeText;

      stepTimer = setTimeout(() => {
        if (!isRunning || isUserActive) {
          haltAutomationImmediately();
          return;
        }
        autoCursorPointer.classList.remove('clicking');

        try {
          element.click();
        } catch (e) {}

        stepTimer = setTimeout(() => {
          if (callback && isRunning && !isUserActive) {
            callback();
          }
        }, afterDelay);
      }, 140);
    }

    // Fast Realistic Web Application User Journey Choreography (FURNIO)
    const demoSteps = [
      // ----------------- PHASE 1: DISCOVERY & FILTERING -----------------
      // Step 1: Filter Chairs Category
      (next) => {
        const pill = document.querySelector('.f-cat-pill[data-cat="Chairs"]');
        if (pill) {
          glideToElement(pill, '', 450, () => {
            clickElement(pill, '', 350, next);
          });
        } else next();
      },

      // Step 2: Filter Sofas Category
      (next) => {
        const pill = document.querySelector('.f-cat-pill[data-cat="Sofas"]');
        if (pill) {
          glideToElement(pill, '', 420, () => {
            clickElement(pill, '', 350, next);
          });
        } else next();
      },

      // Step 3: Open Custom Sort Dropdown and Select 'Price: Low to High'
      (next) => {
        const sortBtn = document.getElementById('furnioSortBtn');
        const priceAscOpt = document.querySelector('.f-sort-opt[data-val="price-asc"]');
        if (sortBtn && priceAscOpt) {
          glideToElement(sortBtn, '', 420, () => {
            clickElement(sortBtn, '', 220, () => {
              glideToElement(priceAscOpt, '', 380, () => {
                clickElement(priceAscOpt, '', 350, next);
              });
            });
          });
        } else next();
      },

      // ----------------- PHASE 2: PRODUCT INSPECTION & STICKY BOOKING PANEL -----------------
      // Step 4: Click Book Now on first Card
      (next) => {
        const bookBtn = document.querySelector('.furnio-card .f-card-book-btn') || document.querySelector('.furnio-card .f-card-quickview-btn');
        if (bookBtn) {
          glideToElement(bookBtn, '', 450, () => {
            clickElement(bookBtn, '', 450, next);
          });
        } else next();
      },

      // Step 5: Inside Details Modal - Step Quantity (+)
      (next) => {
        const plusBtn = document.getElementById('fModalQtyPlus') || document.getElementById('furnioQtyPlus');
        if (plusBtn) {
          glideToElement(plusBtn, '', 400, () => {
            clickElement(plusBtn, '', 250, () => {
              clickElement(plusBtn, '', 250, next);
            });
          });
        } else next();
      },

      // Step 6: Add to Booking Cart (slides open the Cart Drawer)
      (next) => {
        const addCartBtn = document.getElementById('fModalAddToCartBtn') || document.getElementById('furnioModalAddCartBtn');
        if (addCartBtn) {
          glideToElement(addCartBtn, '', 420, () => {
            clickElement(addCartBtn, '', 600, next);
          });
        } else next();
      },

      // ----------------- PHASE 3: CART REVIEW & CLOSING CART DRAWER -----------------
      // Step 7: Close Cart Drawer
      (next) => {
        const closeCart = document.getElementById('fCartCloseBtn') || document.querySelector('.f-cart-close-btn');
        if (closeCart) {
          glideToElement(closeCart, '', 420, () => {
            clickElement(closeCart, '', 250, () => {
              if (typeof window.closeCartDrawer === 'function') window.closeCartDrawer();
              stepTimer = setTimeout(next, 300);
            });
          });
        } else {
          if (typeof window.closeCartDrawer === 'function') window.closeCartDrawer();
          next();
        }
      },

      // ----------------- PHASE 4: MY BOOKINGS & DURATION EXTENSION -----------------
      // Step 8: Switch to My Bookings Tab
      (next) => {
        const bTab = document.querySelector('.furnio-nav-link[data-tab="bookings"]');
        if (bTab) {
          glideToElement(bTab, '', 450, () => {
            clickElement(bTab, '', 450, next);
          });
        } else next();
      },

      // Step 9: Extend Active Booking +3 Days
      (next) => {
        const extendBtn = document.querySelector('.f-btn-extend');
        if (extendBtn) {
          glideToElement(extendBtn, '', 450, () => {
            clickElement(extendBtn, '', 500, next);
          });
        } else next();
      },

      // Step 10: Filter Upcoming Bookings Tab
      (next) => {
        const upcomingTab = document.querySelector('.f-b-tab[data-status="Upcoming"]');
        if (upcomingTab) {
          glideToElement(upcomingTab, '', 400, () => {
            clickElement(upcomingTab, '', 400, next);
          });
        } else next();
      },

      // ----------------- PHASE 5: CURATED COLLECTIONS & RETURN TO EXPLORE -----------------
      // Step 11: Browse Curated Collections Tab
      (next) => {
        const colTab = document.querySelector('.furnio-nav-link[data-tab="collections"]');
        if (colTab) {
          glideToElement(colTab, '', 450, () => {
            clickElement(colTab, '', 550, next);
          });
        } else next();
      },

      // Step 12: Return to Discovery & Reset Full Catalog
      (next) => {
        const expTab = document.querySelector('.furnio-nav-link[data-tab="explore"]');
        const allPill = document.querySelector('.f-cat-pill[data-cat="all"]');
        if (expTab) {
          glideToElement(expTab, '', 450, () => {
            clickElement(expTab, '', 200, () => {
              if (allPill) {
                glideToElement(allPill, '', 350, () => {
                  clickElement(allPill, '', 350, next);
                });
              } else next();
            });
          });
        } else next();
      }
    ];

    // Execute steps sequentially
    function executeNextDemoStep() {
      if (!isRunning || isUserActive) return;

      if (!isApplicationsSectionVisible()) {
        isRunning = false;
        autoCursorPointer.classList.remove('visible');
        autoCursorPointer.classList.add('hidden');
        clearTimeout(idleTimer);
        idleTimer = setTimeout(checkAndResumeDemo, 1500);
        return;
      }

      const step = demoSteps[scriptStepIndex];
      scriptStepIndex = (scriptStepIndex + 1) % demoSteps.length;

      try {
        step(() => {
          if (isRunning && !isUserActive) {
            stepTimer = setTimeout(executeNextDemoStep, 450);
          }
        });
      } catch (err) {
        console.warn('Demo step skip:', err);
        stepTimer = setTimeout(executeNextDemoStep, 500);
      }
    }

    // Start idle check loop on load immediately
    idleTimer = setTimeout(checkAndResumeDemo, 100);

    // IntersectionObserver to start demo when scrolled into view and pause when scrolled away
    if ('IntersectionObserver' in window) {
      const targetObs = document.getElementById('furnioDirectAppSection') || appWebsitesSection;
      if (targetObs) {
        const appObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && !isUserActive) {
              checkAndResumeDemo();
            } else if (!entry.isIntersecting) {
              haltAutomationImmediately();
            }
          });
        }, { rootMargin: '100px 0px 100px 0px', threshold: 0.05 });
        appObserver.observe(targetObs);
      }
    }

    // Listen to section visibility / tab change to trigger demo immediately
    const categoryNavBtns = document.querySelectorAll('.category-nav-btn');
    categoryNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(checkAndResumeDemo, 80);
      });
    });
  }

  /* --------------------------------------------------------------------------
     13. FOUR SIMULTANEOUS NEON GLASSMORPHIC CURSORS (QUAD APP AUTOMATION)
     -------------------------------------------------------------------------- */
  class QuadAppCursorAutomation {
    constructor() {
      this.isUserActive = false;
      this.idleTimer = null;

      this.apps = [
        // Screen 1: Villa Booking
        // Cursor moves to date selector -> Clicks "Oct 12–16" -> Cursor moves down to bottom sheet -> Clicks "Reserve Now" -> Triggers Apple Pay slide-up sheet -> Clicks Done.
        {
          id: 'appCard1',
          screenContent: document.getElementById('s1ScreenContent'),
          cursor: document.getElementById('s1NeonCursor'),
          routine: async (ctx) => {
            // 1. Move to Date Selector & click
            await ctx.glideTo('#s1DateTrigger', 750);
            await ctx.click('#s1DateTrigger', 450);

            // 2. Click "Oct 12–16"
            const dateOct = document.querySelector('#s1CalendarWheel .cal-day[data-range="Oct 12 - 16"]') || document.querySelector('.date-oct-12-16');
            if (dateOct) {
              await ctx.glideToElement(dateOct, 650);
              await ctx.clickElement(dateOct, 400);
            }

            // Close calendar sheet cleanly
            const calClose = document.getElementById('s1CalClose');
            if (calClose) {
              await ctx.glideTo('#s1CalClose', 500);
              await ctx.click('#s1CalClose', 350);
            }

            // 3. Move down to bottom sheet -> Click "Reserve Now"
            await ctx.glideTo('#s1ReserveBtn', 800);
            await ctx.click('#s1ReserveBtn', 500);

            // 4. Triggers Apple Pay slide-up sheet & FaceID
            const applePaySheet = document.getElementById('s1ApplePaySheet');
            if (applePaySheet) {
              applePaySheet.classList.add('open');
              await ctx.glideTo('#s1FaceIdTrigger', 750);
              await ctx.click('#s1FaceIdTrigger', 600);
              await ctx.delay(1200);
            }

            // 5. Click "Done" on Reservation Confirmed Card
            const resetBtn = document.getElementById('s1ResetBtn');
            if (resetBtn) {
              await ctx.glideToElement(resetBtn, 700);
              await ctx.clickElement(resetBtn, 500);
              await ctx.delay(1000);
            }
          }
        },

        // Screen 2: AI Motion Coach (FlexAI)
        // Cursor moves to 3D heatmap -> Clicks "Quads" -> Cursor moves to main CTA -> Clicks "Start AI Camera Workout" -> Launches live pose tracking overlay.
        {
          id: 'appCard2',
          screenContent: document.getElementById('s2ScreenContent'),
          cursor: document.getElementById('s2NeonCursor'),
          routine: async (ctx) => {
            // 1. Move to 3D heatmap / muscle target & click "Quads"
            await ctx.glideTo('#s2QuadsBtn', 750);
            await ctx.click('#s2QuadsBtn', 450);

            // Highlight quads
            const quadsBtn = document.getElementById('s2QuadsBtn');
            if (quadsBtn) quadsBtn.classList.add('active');
            const thigh = document.getElementById('s2ThighBone');
            if (thigh) thigh.style.stroke = '#EF4444';
            await ctx.delay(500);

            // 2. Cursor moves to main CTA -> Clicks "Start AI Camera Workout"
            const startBtn = document.getElementById('s2StartWorkoutBtn') || document.getElementById('s2FinishSetBtn');
            if (startBtn) {
              await ctx.glideToElement(startBtn, 750);
              await ctx.clickElement(startBtn, 500);
            }

            // 3. Launches live pose tracking overlay
            const skeletonSvg = document.getElementById('s2SkeletonSvg');
            if (skeletonSvg) {
              skeletonSvg.style.filter = 'drop-shadow(0 0 12px #22D3EE)';
            }

            // Simulate posture error check & auto-correct
            const faultBtn = document.getElementById('s2FaultTrigger');
            if (faultBtn) {
              await ctx.glideTo('#s2FaultTrigger', 650);
              await ctx.click('#s2FaultTrigger', 700);
            }
            const fixBtn = document.getElementById('s2AutoFixBtn');
            if (fixBtn) {
              await ctx.glideTo('#s2AutoFixBtn', 600);
              await ctx.click('#s2AutoFixBtn', 800);
            }
          }
        },

        // Screen 3: E-Commerce Product (Aura Lookbook)
        // Cursor clicks "Lookbook" category tab -> Clicks size chip "M" -> Cursor moves down -> Clicks "Quick Add to Cart" -> Opens Cart section.
        {
          id: 'appCard3',
          screenContent: document.getElementById('s3ScreenContent'),
          cursor: document.getElementById('s3NeonCursor'),
          routine: async (ctx) => {
            // 1. Cursor clicks the "Lookbook" category tab
            const lookbookTab = document.querySelector('#s3CatBar .cat-pill[data-cat="lookbook"]') || document.querySelector('.tab-lookbook');
            if (lookbookTab) {
              await ctx.glideToElement(lookbookTab, 750);
              await ctx.clickElement(lookbookTab, 500);
            }

            // 2. Clicks size chip "M"
            const sizeM = document.querySelector('#s3SizeSelector .size-btn:nth-child(2)') || document.querySelector('.size-m-chip');
            if (sizeM) {
              await ctx.glideToElement(sizeM, 650);
              await ctx.clickElement(sizeM, 400);
            }

            // 3. Cursor moves down -> Clicks "Quick Add to Cart"
            await ctx.glideTo('#s3QuickAddBtn', 750);
            await ctx.click('#s3QuickAddBtn', 500);
            await ctx.delay(800);

            // 4. Cursor moves to Shopping Bag icon/tab -> Opens Cart Section!
            const bagTarget = document.getElementById('s3BagTarget') || document.getElementById('s3TabBag');
            if (bagTarget) {
              await ctx.glideToElement(bagTarget, 700);
              await ctx.clickElement(bagTarget, 600);
              await ctx.delay(1800);
            }

            // 5. Closes Cart Drawer
            const cartClose = document.getElementById('s3CartCloseBtn');
            if (cartClose) {
              await ctx.glideToElement(cartClose, 600);
              await ctx.clickElement(cartClose, 400);
              await ctx.delay(600);
            }

            // 6. Switch category tab back to All
            const allTab = document.querySelector('#s3CatBar .cat-pill[data-cat="all"]');
            if (allTab) {
              await ctx.glideToElement(allTab, 650);
              await ctx.clickElement(allTab, 400);
            }
          }
        },

        // Screen 4: AI Prompt Workspace (Neural AI)
        // Cursor moves to input field -> Clicks to focus -> Auto-types "Analyze villa blueprint wireframes..." -> Cursor moves to send button -> Clicks "Send" -> Generates streaming response bubbles.
        {
          id: 'appCard4',
          screenContent: document.getElementById('s4ScreenContent'),
          cursor: document.getElementById('s4NeonCursor'),
          routine: async (ctx) => {
            const inputField = document.getElementById('s4TextInput') || document.querySelector('.prompt-input-field');
            if (inputField) {
              // 1. Cursor moves to input field -> Clicks to focus
              await ctx.glideToElement(inputField, 750);
              await ctx.clickElement(inputField, 300);

              // 2. Auto-types "Analyze villa blueprint wireframes..."
              await ctx.simulateTyping(inputField, 'Analyze villa blueprint wireframes...');
              await ctx.delay(400);

              // 3. Cursor moves to send button -> Clicks "Send"
              await ctx.glideTo('#s4SendBtn', 600);
              await ctx.click('#s4SendBtn', 450);

              // 4. Generates streaming response bubbles
              await ctx.delay(2600);
            }
          }
        }
      ];

      this.initIndividualAppOverrides();
      this.startSequence();
    }

    // Individual Phone Card Interaction Isolation (App 1 does NOT stop App 2, 3, or 4)
    initIndividualAppOverrides() {
      this.apps.forEach(app => {
        app.isPaused = false;
        app.idleTimer = null;
        app.loopRunning = false;

        const card = document.getElementById(app.id);
        if (card && app.cursor) {
          ['mouseenter', 'touchstart', 'mousedown'].forEach(evt => {
            card.addEventListener(evt, () => {
              app.isPaused = true;
              clearTimeout(app.idleTimer);
              app.cursor.classList.add('hidden');
            }, { passive: true });
          });

          ['mouseleave', 'touchend'].forEach(evt => {
            card.addEventListener(evt, () => {
              clearTimeout(app.idleTimer);
              app.idleTimer = setTimeout(() => {
                app.isPaused = false;
                app.cursor.classList.remove('hidden');
                if (!app.loopRunning) {
                  this.runAppLoop(app);
                }
              }, 150);
            }, { passive: true });
          });
        }
      });
    }

    startSequence() {
      const phonesFrame = document.querySelector('.mobile-phones-frame');
      if ('IntersectionObserver' in window && phonesFrame) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.apps.forEach(app => {
                app.isPaused = false;
                if (app.cursor) app.cursor.classList.remove('hidden');
                if (!app.loopRunning) this.runAppLoop(app);
              });
            } else {
              this.apps.forEach(app => {
                app.isPaused = true;
              });
            }
          });
        }, { rootMargin: '150px 0px 150px 0px', threshold: 0.05 });
        observer.observe(phonesFrame);
      } else {
        this.apps.forEach(app => {
          if (app.cursor) app.cursor.classList.remove('hidden');
          this.runAppLoop(app);
        });
      }
    }

    async runAppLoop(appConfig) {
      if (!appConfig.cursor || !appConfig.screenContent) return;
      if (appConfig.loopRunning) return;
      appConfig.loopRunning = true;

      let posX = 120;
      let posY = 180;
      let animId = null;

      const setPos = (x, y) => {
        posX = x;
        posY = y;
        appConfig.cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };

      setPos(posX, posY);

      const delay = (ms) => new Promise(res => setTimeout(res, ms));

      const glideTo = (selectorOrEl, duration = 750) => {
        return new Promise(resolve => {
          if (appConfig.isPaused) return resolve();
          const el = typeof selectorOrEl === 'string' ? appConfig.screenContent.querySelector(selectorOrEl) : selectorOrEl;
          if (!el) return resolve();

          const cRect = appConfig.screenContent.getBoundingClientRect();
          const eRect = el.getBoundingClientRect();

          let targetX = eRect.left - cRect.left + eRect.width * 0.5;
          let targetY = eRect.top - cRect.top + eRect.height * 0.5;

          // Clamp within phone screen
          targetX = Math.max(8, Math.min(targetX, cRect.width - 16));
          targetY = Math.max(8, Math.min(targetY, cRect.height - 16));

          const startX = posX;
          const startY = posY;
          const startTime = performance.now();

          function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          }

          function step(now) {
            if (appConfig.isPaused) {
              if (animId) cancelAnimationFrame(animId);
              return resolve();
            }

            const elapsed = now - startTime;
            const p = Math.min(elapsed / duration, 1);
            const ease = easeInOutCubic(p);

            setPos(startX + (targetX - startX) * ease, startY + (targetY - startY) * ease);

            if (p < 1) {
              animId = requestAnimationFrame(step);
            } else {
              animId = null;
              resolve();
            }
          }

          animId = requestAnimationFrame(step);
        });
      };

      const click = (selectorOrEl, postDelay = 350) => {
        return new Promise(resolve => {
          if (appConfig.isPaused) return resolve();
          const el = typeof selectorOrEl === 'string' ? appConfig.screenContent.querySelector(selectorOrEl) : selectorOrEl;

          appConfig.cursor.classList.add('clicking');
          setTimeout(() => {
            appConfig.cursor.classList.remove('clicking');
            if (el && !appConfig.isPaused) {
              try { el.click(); } catch(e) {}
            }
            setTimeout(resolve, postDelay);
          }, 180);
        });
      };

      const simulateTyping = (inputEl, text) => {
        return new Promise(async resolve => {
          if (!inputEl) return resolve();
          inputEl.value = '';
          for (let i = 0; i < text.length; i++) {
            if (appConfig.isPaused) return resolve();
            inputEl.value += text[i];
            inputEl.dispatchEvent(new Event('input', { bubbles: true }));
            await delay(50);
          }
          resolve();
        });
      };

      const ctx = {
        glideTo,
        glideToElement: glideTo,
        click,
        clickElement: click,
        simulateTyping,
        delay
      };

      const executeRoutine = async () => {
        if (appConfig.isPaused) {
          appConfig.loopRunning = false;
          return;
        }
        try {
          await appConfig.routine(ctx);
        } catch(err) {
          console.warn('Routine error:', err);
        }
        if (!appConfig.isPaused) {
          setTimeout(executeRoutine, 1000);
        } else {
          appConfig.loopRunning = false;
        }
      };

      executeRoutine();
    }
  }

  // Initialize QuadAppCursorAutomation immediately
  new QuadAppCursorAutomation();

  // Smooth Back To Top Button Handler
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }
});
