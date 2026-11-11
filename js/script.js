(() => {
  document.documentElement.classList.add('js');

  document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroVideo();
    initTideCursor();
    initReveal();
    initCounters();
    initTabs();
    initGalleryFilters();
    initLightbox();
    initGuestNotes();
    initBookingBar();
    initForm();
    initNewsletter();
    initParallax();
    initBackToTop();
    setCurrentYear();
  });

  function initNavbar() {
    const header = document.querySelector('#site-header');
    const nav = document.querySelector('#main-nav');
    const toggle = document.querySelector('.nav-toggle');
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    nav.addEventListener('show.bs.collapse', () => header.classList.add('menu-open'));
    nav.addEventListener('hide.bs.collapse', () => header.classList.remove('menu-open'));
    nav.addEventListener('shown.bs.collapse', () => toggle.setAttribute('aria-label', 'Close navigation'));
    nav.addEventListener('hidden.bs.collapse', () => toggle.setAttribute('aria-label', 'Open navigation'));
    nav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.matchMedia('(max-width: 991.98px)').matches) {
          bootstrap.Collapse.getOrCreateInstance(nav, { toggle: false }).hide();
        }
      });
    });
  }

  function initHeroVideo() {
    const video = document.querySelector('#hero-video');
    const playButton = document.querySelector('#hero-video-play');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const saveData = Boolean(navigator.connection?.saveData);

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    function showPoster() {
      video.classList.add('is-unavailable');
      video.pause();
    }

    function offerPlayback() {
      showPoster();
      playButton.hidden = false;
    }

    function playVideo() {
      video.play().then(() => {
        video.classList.remove('is-unavailable');
        playButton.hidden = true;
      }).catch(offerPlayback);
    }

    playButton.addEventListener('click', playVideo);
    video.addEventListener('playing', () => {
      video.classList.remove('is-unavailable');
      playButton.hidden = true;
    });
    video.addEventListener('error', offerPlayback);

    if (reduceMotion.matches || saveData) {
      showPoster();
      playButton.hidden = false;
      return;
    }

    playVideo();
  }

  function initTideCursor() {
    const cursor = document.querySelector('#tide-cursor');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!cursor || !finePointer.matches || reduceMotion.matches) return;

    const label = cursor.querySelector('.tide-cursor__label');
    document.documentElement.classList.add('has-tide-cursor');

    document.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.classList.add('is-visible');

      const target = event.target instanceof Element ? event.target : null;
      const editable = target?.closest('input, textarea, [contenteditable="true"]');
      const interactive = target?.closest('a, button, [role="button"], summary, select');
      cursor.classList.toggle('is-text-target', Boolean(editable));
      cursor.classList.toggle('is-interactive', Boolean(interactive));
      label.textContent = interactive?.dataset.cursorLabel || (interactive ? (interactive.matches('.gallery-item') ? 'VIEW' : (interactive.matches('button, [role="button"], select') ? 'SELECT' : 'EXPLORE')) : '');
    }, { passive: true });

    document.addEventListener('pointerdown', () => cursor.classList.add('is-pressed'));
    window.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
    window.addEventListener('blur', () => cursor.classList.remove('is-visible', 'is-pressed'));
  }

  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -20px 0px' });
    elements.forEach((element) => observer.observe(element));
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!('IntersectionObserver' in window)) {
      counters.forEach((counter) => setCounterValue(counter));
      return;
    }
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.65 });
    counters.forEach((counter) => observer.observe(counter));
  }

  function setCounterValue(element, value = Number(element.dataset.count)) {
    const decimals = Number(element.dataset.decimals || 0);
    const suffix = element.dataset.suffix || '';
    element.textContent = value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  }

  function animateCount(element) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCounterValue(element);
      return;
    }
    const target = Number(element.dataset.count);
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounterValue(element, target * eased);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initTabs() {
    const tabs = [...document.querySelectorAll('.experience-tab')];
    const panels = [...document.querySelectorAll('.experience-panel')];
    if (!tabs.length) return;

    function selectTab(tab, moveFocus = false) {
      tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      panels.forEach((panel) => {
        const selected = panel.dataset.panel === tab.dataset.tab;
        panel.hidden = !selected;
        panel.classList.toggle('is-active', selected);
      });
      if (moveFocus) tab.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', (event) => {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = tabs.length - 1;
        else return;
        event.preventDefault();
        selectTab(tabs[next], true);
      });
    });
  }

  function initGalleryFilters() {
    const buttons = [...document.querySelectorAll('[data-gallery-filter]')];
    const items = [...document.querySelectorAll('.gallery-item')];
    const status = document.querySelector('#gallery-status');
    if (!buttons.length) return;

    function selectFilter(button) {
      const filter = button.dataset.galleryFilter;
      let visibleCount = 0;
      buttons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      items.forEach((item) => {
        const visible = filter === 'all' || item.dataset.galleryCategory === filter;
        item.hidden = !visible;
        item.classList.toggle('is-filtered-in', visible);
        if (visible) visibleCount += 1;
      });
      status.textContent = filter === 'all'
        ? visibleCount + ' scenes, one slow afternoon.'
        : visibleCount + (visibleCount === 1 ? ' photograph' : ' photographs') + ' in this collection.';
    }

    buttons.forEach((button) => button.addEventListener('click', () => selectFilter(button)));
  }

  function initLightbox() {
    const modalElement = document.querySelector('#gallery-lightbox');
    const modalImage = document.querySelector('#lightbox-image');
    const caption = document.querySelector('#lightbox-caption');
    const count = document.querySelector('#lightbox-count');
    const allItems = [...document.querySelectorAll('.gallery-item')];
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement, { keyboard: true });
    let items = allItems.filter((item) => !item.hidden);
    let currentIndex = 0;
    let touchStartX = 0;

    function showImage(index) {
      if (!items.length) return;
      currentIndex = (index + items.length) % items.length;
      const item = items[currentIndex];
      const image = item.querySelector('img');
      modalImage.src = item.dataset.fullSrc;
      modalImage.alt = image.alt;
      caption.textContent = item.dataset.caption;
      count.textContent = (currentIndex + 1).toString().padStart(2, '0') + ' / ' + items.length.toString().padStart(2, '0');
    }

    allItems.forEach((item) => item.addEventListener('click', () => {
      items = allItems.filter((galleryItem) => !galleryItem.hidden);
      showImage(items.indexOf(item));
      modal.show();
    }));
    document.querySelector('.lightbox-prev').addEventListener('click', () => showImage(currentIndex - 1));
    document.querySelector('.lightbox-next').addEventListener('click', () => showImage(currentIndex + 1));
    document.addEventListener('keydown', (event) => {
      if (!modalElement.classList.contains('show')) return;
      if (event.key === 'ArrowLeft') { event.preventDefault(); showImage(currentIndex - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); showImage(currentIndex + 1); }
    });
    modalElement.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
    modalElement.addEventListener('touchend', (event) => {
      const distance = event.changedTouches[0].screenX - touchStartX;
      if (Math.abs(distance) < 45) return;
      showImage(currentIndex + (distance < 0 ? 1 : -1));
    }, { passive: true });
    modalElement.addEventListener('hidden.bs.modal', () => {
      modalImage.removeAttribute('src');
      modalImage.alt = '';
      caption.textContent = '';
      count.textContent = '';
    });
  }

  function initGuestNotes() {
    const carousel = document.querySelector('#guest-carousel');
    const counter = document.querySelector('#guest-count-display');
    const slides = [...carousel.querySelectorAll('.carousel-item')];
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      bootstrap.Carousel.getOrCreateInstance(carousel, { interval: false }).pause();
    }
    carousel.addEventListener('slid.bs.carousel', (event) => {
      const active = slides.indexOf(event.relatedTarget) + 1;
      counter.innerHTML = active.toString().padStart(2, '0') + ' <i></i> ' + slides.length.toString().padStart(2, '0');
    });
  }

  function localDateOffset(days = 0) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + days);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  function nextDate(value) {
    const date = new Date(value + 'T00:00:00');
    date.setDate(date.getDate() + 1);
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }

  function initBookingBar() {
    const form = document.querySelector('#booking-bar');
    const checkInDate = document.querySelector('#quick-check-in');
    const checkOutDate = document.querySelector('#quick-check-out');
    checkInDate.min = localDateOffset();
    checkOutDate.min = localDateOffset(1);
    const updateCheckOutRule = () => {
      const earliest = checkInDate.value || localDateOffset();
      checkOutDate.min = nextDate(earliest);
      checkOutDate.setCustomValidity(checkOutDate.value && checkOutDate.value <= earliest ? 'Check Out must be after Check In.' : '');
    };
    checkInDate.addEventListener('change', updateCheckOutRule);
    checkOutDate.addEventListener('change', updateCheckOutRule);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      updateCheckOutRule();
      if (!form.reportValidity()) return;
      const enquiry = document.querySelector('#enquiry-form');
      enquiry.elements.checkIn.value = checkInDate.value;
      enquiry.elements.checkOut.value = checkOutDate.value;
      enquiry.elements.guests.value = form.elements.guests.value;
      document.querySelector('#form-feedback').textContent = 'Your dates are in. Add a few details and we’ll take it from there.';
      document.querySelector('#contact').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      window.setTimeout(() => document.querySelector('#guest-name').focus({ preventScroll: true }), 420);
    });
  }

  function initForm() {
    const form = document.querySelector('#enquiry-form');
    const feedback = document.querySelector('#form-feedback');
    const submit = document.querySelector('#form-submit');
    const today = localDateOffset();
    const checkIn = form.elements.checkIn;
    const checkOut = form.elements.checkOut;
    const roomType = form.elements.roomType;
    const progress = document.querySelector('#enquiry-progress');
    const progressLabel = document.querySelector('#enquiry-progress-label');
    const progressFields = ['name', 'email', 'phone', 'guests', 'checkIn', 'checkOut', 'roomType'].map((name) => form.elements[name]);
    const roomPicks = [...form.querySelectorAll('[data-room-choice]')];
    const errorIds = { name: 'name-error', email: 'email-error', phone: 'phone-error', checkIn: 'check-in-error', checkOut: 'check-out-error', roomType: 'room-error' };
    checkIn.min = today;
    checkOut.min = localDateOffset(1);
    const rules = {
      name: (field) => field.value.trim().length >= 2 ? '' : 'Please enter your name.',
      email: (field) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()) ? '' : 'Enter a valid email address.',
      phone: (field) => {
        const digits = field.value.replace(/\D/g, '');
        return /^\+?[0-9][0-9\s().-]*$/.test(field.value.trim()) && digits.length >= 7 && digits.length <= 15 ? '' : 'Add a phone number with its country code.';
      },
      checkIn: (field) => field.value && field.value >= localDateOffset() ? '' : 'Choose today or a later date.',
      checkOut: (field) => field.value && field.value > (checkIn.value || localDateOffset()) ? '' : 'Check out must be after check in.',
      roomType: (field) => field.value ? '' : 'Choose a room preference.'
    };

    function updateProgress() {
      const complete = progressFields.filter((field) => {
        if (!field.value || !field.checkValidity()) return false;
        if (rules[field.name]?.(field)) return false;
        if (field === checkOut) return field.value > (checkIn.value || localDateOffset());
        return true;
      }).length;
      progress.value = complete;
      progressLabel.textContent = complete + ' OF ' + progress.max + ' READY';
    }

    function updateRoomPicks() {
      roomPicks.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.roomChoice === roomType.value));
      });
    }

    roomPicks.forEach((button) => button.addEventListener('click', () => {
      roomType.value = button.dataset.roomChoice;
      roomType.dispatchEvent(new Event('change', { bubbles: true }));
      updateRoomPicks();
    }));
    roomType.addEventListener('change', updateRoomPicks);

    function validate(field) {
      const message = rules[field.name]?.(field) || '';
      const error = document.getElementById(errorIds[field.name]);
      field.setAttribute('aria-invalid', String(Boolean(message)));
      if (error) error.textContent = message;
      return message;
    }
    function clearFeedback() {
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }

    form.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => {
        if (rules[field.name]) validate(field);
        if (field === checkIn) {
          checkOut.min = nextDate(field.value || localDateOffset());
          if (checkOut.value) validate(checkOut);
        }
        clearFeedback();
        updateProgress();
      });
      field.addEventListener('change', () => {
        if (rules[field.name]) validate(field);
        if (field === checkIn) {
          checkOut.min = nextDate(field.value || localDateOffset());
          if (checkOut.value) validate(checkOut);
        }
        updateRoomPicks();
        updateProgress();
      });
    });
    updateProgress();
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const names = ['name', 'email', 'phone', 'checkIn', 'checkOut', 'roomType'];
      let firstInvalid = null;
      names.forEach((name) => {
        const field = form.elements[name];
        if (validate(field) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        feedback.textContent = 'A couple of details need your attention.';
        feedback.classList.add('is-error');
        firstInvalid.focus();
        return;
      }
      submit.disabled = true;
      submit.classList.add('is-loading');
      submit.setAttribute('aria-busy', 'true');
      submit.querySelector('.submit-label').textContent = 'Sending your note';
      clearFeedback();
      window.setTimeout(() => {
        const guest = form.elements.name.value.trim().split(/\s+/)[0];
        feedback.textContent = 'Thank you, ' + guest + '. Your preview enquiry is ready; connect the reservations inbox to receive requests.';
        feedback.classList.add('is-success');
        submit.disabled = false;
        submit.classList.remove('is-loading');
        submit.removeAttribute('aria-busy');
        submit.querySelector('.submit-label').textContent = 'Send your enquiry';
        form.reset();
        updateRoomPicks();
        updateProgress();
        form.querySelectorAll('[aria-invalid]').forEach((field) => field.setAttribute('aria-invalid', 'false'));
        form.querySelectorAll('.field-error').forEach((error) => { error.textContent = ''; });
        checkIn.min = localDateOffset();
        checkOut.min = localDateOffset(1);
      }, 1000);
    });
  }

  function initNewsletter() {
    const form = document.querySelector('#newsletter-form');
    const input = document.querySelector('#newsletter-email');
    const feedback = document.querySelector('#newsletter-feedback');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!input.validity.valid) {
        input.setAttribute('aria-invalid', 'true');
        feedback.textContent = 'Please enter a valid email address.';
        input.focus();
        return;
      }
      input.setAttribute('aria-invalid', 'false');
      feedback.textContent = 'Thank you. The signup preview is ready.';
      form.reset();
    });
    input.addEventListener('input', () => {
      input.setAttribute('aria-invalid', 'false');
      feedback.textContent = '';
    });
  }

  function initParallax() {
    const banner = document.querySelector('.escape-banner');
    const image = banner.querySelector(':scope > img');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 767.98px)').matches) return;
    let visible = false;
    let ticking = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(banner);
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        if (visible) {
          const offset = banner.getBoundingClientRect().top * -.06;
          image.style.transform = 'translateY(' + Math.max(-16, Math.min(16, offset)) + 'px) scale(1.06)';
        }
        ticking = false;
      });
    }, { passive: true });
  }

  function initBackToTop() {
    const button = document.querySelector('#back-to-top');
    const update = () => button.classList.toggle('is-visible', window.scrollY > 480);
    update();
    window.addEventListener('scroll', update, { passive: true });
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
  }

  function setCurrentYear() {
    document.querySelector('#current-year').textContent = new Date().getFullYear();
  }
})();
