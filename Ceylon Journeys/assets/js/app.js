document.addEventListener('DOMContentLoaded', function () {

  const pre = document.getElementById('preloader');
  if (pre) setTimeout(function () { pre.classList.add('hide'); }, 500);

  renderSiteChrome();

  if (window.AOS) AOS.init({ duration: 700, once: true, offset: 50 });

  const nav = document.querySelector('.navbar-luxe');
  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 40);
    const btt = document.getElementById('backToTop');
    if (btt) btt.classList.toggle('show', window.scrollY > 520);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  document.getElementById('backToTop')?.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  if (document.querySelector('.hero-swiper')) {
    new Swiper('.hero-swiper', {
      loop: true,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.hero-swiper .swiper-pagination', clickable: true },
      navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
      speed: 800
    });
  }

  if (document.querySelector('.testi-swiper')) {
    new Swiper('.testi-swiper', {
      loop: true,
      spaceBetween: 24,
      autoplay: { delay: 4500 },
      pagination: { el: '.testi-pagination', clickable: true },
      breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 } }
    });
  }

  document.querySelectorAll('.cards-swiper').forEach(function (el) {
    new Swiper(el, {
      slidesPerView: 1.15,
      spaceBetween: 20,
      breakpoints: { 640: { slidesPerView: 2 }, 992: { slidesPerView: 3 } },
      pagination: { el: el.querySelector('.swiper-pagination'), clickable: true }
    });
  });

  document.querySelectorAll('[data-count]').forEach(function (counter) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.getAttribute('data-count');
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 50));
        const timer = setInterval(function () {
          cur += step;
          if (cur >= target) {
            el.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            el.textContent = cur.toLocaleString();
          }
        }, 30);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    io.observe(counter);
  });

  document.querySelectorAll('.filter-pill').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const group = btn.closest('.filter-group');
      if (group) group.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const grid = document.querySelector('[data-filter-grid]');
      if (!grid || !filter) return;
      grid.querySelectorAll('[data-cat]').forEach(function (card) {
        const show = filter === 'all' || card.dataset.cat.includes(filter);
        card.style.display = show ? '' : 'none';
      });
      updateFilterCount();
    });
  });

  document.addEventListener('click', function (e) {
    const saveBtn = e.target.closest('.card-save');
    if (!saveBtn) return;
    saveBtn.classList.toggle('saved');
    const icon = saveBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('fa-solid');
    }
  });

  document.querySelectorAll('.search-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.search-tab').forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      document.querySelectorAll('.search-panel').forEach(function (p) { p.classList.add('d-none'); });
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.remove('d-none');
    });
  });

  document.querySelectorAll('input[type="date"].date-future').forEach(function (input) {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    input.min = y + '-' + m + '-' + d;
  });

  const budgetInput = document.getElementById('filterBudget');
  const budgetVal = document.getElementById('budgetValue');
  if (budgetInput && budgetVal) {
    budgetInput.addEventListener('input', function () {
      if (typeof I18N !== 'undefined') {
        budgetVal.textContent = I18N.formatPrice(parseInt(budgetInput.value, 10));
      } else {
        budgetVal.textContent = 'Rs. ' + parseInt(budgetInput.value, 10).toLocaleString('en-LK');
      }
    });
  }

  const btnApply = document.getElementById('btnApplyFilters');
  if (btnApply) {
    btnApply.addEventListener('click', applyTourFilters);
  }

  document.querySelectorAll('.needs-validation').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
      }
      e.preventDefault();
      form.classList.add('was-validated');

      if (form.id === 'contactForm' && typeof CJ !== 'undefined') {
        CJ.saveInquiry({
          name: document.getElementById('contactName').value.trim(),
          email: document.getElementById('contactEmail').value.trim(),
          phone: document.getElementById('contactPhone').value.trim(),
          destination: document.getElementById('contactDest').value,
          message: document.getElementById('contactMsg').value.trim()
        });
      }

      const msg = form.querySelector('.form-success');
      if (msg) {
        msg.classList.remove('d-none');
        form.reset();
        form.classList.remove('was-validated');
      } else {
        alert('Thank you! We will get back to you soon.');
        form.reset();
        form.classList.remove('was-validated');
      }
    });
  });

  if (window.lightbox) {
    lightbox.option({ resizeDuration: 200, wrapAround: true });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      const collapse = document.querySelector('.navbar-collapse.show');
      if (collapse && window.innerWidth < 992) {
        bootstrap.Collapse.getInstance(collapse)?.hide();
      }
    });
  });

  updateFilterCount();

  if (typeof I18N !== 'undefined') {
    I18N.apply();
    I18N.bindSwitchers();
  }
});

function applyTourFilters() {
  const dest = document.getElementById('filterDestination')?.value || 'All';
  const style = document.getElementById('filterStyle')?.value || 'All Styles';
  const maxPrice = parseFloat(document.getElementById('filterBudget')?.value || '99999');
  const d1 = document.getElementById('d1')?.checked;
  const d2 = document.getElementById('d2')?.checked;
  const d3 = document.getElementById('d3')?.checked;
  const anyDuration = d1 || d2 || d3;

  document.querySelectorAll('[data-filter-grid] > [data-destination]').forEach(function (card) {
    const cardDest = card.getAttribute('data-destination');
    const cardPrice = parseFloat(card.getAttribute('data-price') || '0');
    const cardDuration = parseInt(card.getAttribute('data-duration') || '0', 10);
    const cardCat = card.getAttribute('data-cat') || '';

    const matchDest = dest === 'All' || cardDest === dest;
    const matchStyle = style === 'All Styles' || cardCat.includes(style.toLowerCase());
    const matchPrice = cardPrice <= maxPrice;

    let matchDuration = !anyDuration;
    if (d1 && cardDuration >= 1 && cardDuration <= 3) matchDuration = true;
    if (d2 && cardDuration >= 4 && cardDuration <= 7) matchDuration = true;
    if (d3 && cardDuration >= 8) matchDuration = true;

    card.style.display = (matchDest && matchStyle && matchPrice && matchDuration) ? '' : 'none';
  });

  updateFilterCount();
}

function updateFilterCount() {
  const label = document.getElementById('filterCount');
  const grid = document.querySelector('[data-filter-grid]');
  if (!label || !grid) return;
  const visible = grid.querySelectorAll('[data-cat], [data-destination]').length;
  const shown = Array.from(grid.children).filter(function (el) { return el.style.display !== 'none'; }).length;
  var showingText = 'Showing ' + shown + ' of ' + visible;
  if (typeof I18N !== 'undefined' && I18N.getLang() === 'si') {
    showingText = visible + ' න් ' + shown + ' පෙන්වයි';
  } else if (typeof I18N !== 'undefined' && I18N.getLang() === 'ta') {
    showingText = visible + ' இல் ' + shown + ' காட்டப்படுகிறது';
  }
  label.textContent = showingText;
}

function renderSiteChrome() {
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');
  const path = window.location.pathname.split('/').pop() || 'index.html';

  function isActive(href) {
    return path === href || (path === '' && href === 'index.html');
  }

  var session = null;
  try {
    if (typeof CJ !== 'undefined') session = CJ.getSession();
  } catch (e) {}

  var lang = typeof I18N !== 'undefined' ? I18N.getLang() : 'en';
  function tr(key, fallback) {
    return typeof I18N !== 'undefined' ? I18N.t(key) : fallback;
  }

  var authLink = '';
  if (session) {
    if (session.role === 'admin') {
      authLink = '<a href="admin.html" class="btn-outline-luxe d-none d-md-inline-block">' + tr('nav.admin', 'Admin Panel') + '</a>';
    } else {
      authLink = '<a href="dashboard.html" class="btn-outline-luxe d-none d-md-inline-block">' + tr('nav.dashboard', 'Dashboard') + '</a>';
    }
  } else {
    authLink = '<a href="login.html" class="btn-outline-luxe d-none d-md-inline-block">' + tr('nav.login', 'Login') + '</a>';
  }

  if (headerMount) {
    headerMount.innerHTML =
      '<div class="topbar d-none d-lg-block">' +
        '<div class="container d-flex justify-content-between align-items-center">' +
          '<div><i class="fa-solid fa-phone me-1 text-gold"></i> +94 11 234 5678' +
          '<span class="divider">|</span>' +
          '<i class="fa-regular fa-envelope me-1 text-gold"></i> info@ceylonjourneys.lk</div>' +
          '<div class="d-flex align-items-center gap-3">' +
            '<span class="text-muted" data-i18n="topbar.hours"><i class="fa-solid fa-flag me-1"></i>Sri Lanka • Mon–Sat 9:00–18:00</span>' +
            '<span class="divider">|</span>' +
            '<div class="dropdown topbar-switch">' +
              '<a class="dropdown-toggle" href="#" data-bs-toggle="dropdown" id="langCurrent">' + (lang === 'si' ? 'සිං' : lang === 'ta' ? 'தமி' : 'EN') + '</a>' +
              '<ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">' +
                '<li><a class="dropdown-item' + (lang === 'en' ? ' active' : '') + '" href="#" data-set-lang="en">English</a></li>' +
                '<li><a class="dropdown-item' + (lang === 'si' ? ' active' : '') + '" href="#" data-set-lang="si">සිංහල</a></li>' +
                '<li><a class="dropdown-item' + (lang === 'ta' ? ' active' : '') + '" href="#" data-set-lang="ta">தமிழ்</a></li>' +
              '</ul>' +
            '</div>' +
            '<div class="dropdown topbar-switch">' +
              '<a class="dropdown-toggle" href="#" data-bs-toggle="dropdown" id="curCurrent">' + (typeof I18N !== 'undefined' ? I18N.getCurrency() : 'LKR') + '</a>' +
              '<ul class="dropdown-menu dropdown-menu-end shadow-sm border-0">' +
                '<li><a class="dropdown-item" href="#" data-set-currency="LKR">LKR – Rs.</a></li>' +
                '<li><a class="dropdown-item" href="#" data-set-currency="USD">USD – $</a></li>' +
                '<li><a class="dropdown-item" href="#" data-set-currency="EUR">EUR – €</a></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<nav class="navbar navbar-expand-lg navbar-luxe">' +
        '<div class="container">' +
          '<a class="navbar-brand" href="index.html">Ceylon<span>Journeys</span> <small style="font-family:\'Plus Jakarta Sans\',sans-serif;font-size:.55rem;color:var(--secondary);letter-spacing:.08em">SRI LANKA</small></a>' +
          '<button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">' +
            '<span class="navbar-toggler-icon"></span>' +
          '</button>' +
          '<div class="collapse navbar-collapse" id="mainNav">' +
            '<ul class="navbar-nav mx-auto">' +
              '<li class="nav-item"><a class="nav-link ' + (isActive('index.html') ? 'active' : '') + '" href="index.html" data-i18n="nav.home">' + tr('nav.home', 'Home') + '</a></li>' +
              '<li class="nav-item"><a class="nav-link ' + (isActive('about.html') ? 'active' : '') + '" href="about.html" data-i18n="nav.about">' + tr('nav.about', 'About') + '</a></li>' +
              '<li class="nav-item"><a class="nav-link ' + (isActive('destinations.html') ? 'active' : '') + '" href="destinations.html" data-i18n="nav.destinations">' + tr('nav.destinations', 'Destinations') + '</a></li>' +
              '<li class="nav-item"><a class="nav-link ' + (isActive('tours.html') ? 'active' : '') + '" href="tours.html" data-i18n="nav.tours">' + tr('nav.tours', 'Tours') + '</a></li>' +
              '<li class="nav-item"><a class="nav-link ' + (isActive('contact.html') ? 'active' : '') + '" href="contact.html" data-i18n="nav.contact">' + tr('nav.contact', 'Contact') + '</a></li>' +
            '</ul>' +
            '<div class="nav-actions d-flex align-items-center gap-2 flex-wrap">' +
              '<div class="dropdown d-lg-none">' + // Wrapper for correct positioning on mobile
                '<button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">' + (lang === 'si' ? 'සිං' : lang === 'ta' ? 'தமி' : 'EN') + ' / ' + (typeof I18N !== 'undefined' ? I18N.getCurrency() : 'LKR') + '</button>' +
                '<ul class="dropdown-menu">' +
                  '<li><h6 class="dropdown-header">Language</h6></li>' +
                  '<li><a class="dropdown-item" href="#" data-set-lang="en">English</a></li>' +
                  '<li><a class="dropdown-item" href="#" data-set-lang="si">සිංහල</a></li>' +
                  '<li><a class="dropdown-item" href="#" data-set-lang="ta">தமிழ்</a></li>' +
                  '<li><hr class="dropdown-divider"></li>' +
                  '<li><h6 class="dropdown-header">Currency</h6></li>' +
                  '<li><a class="dropdown-item" href="#" data-set-currency="LKR">LKR</a></li>' +
                  '<li><a class="dropdown-item" href="#" data-set-currency="USD">USD</a></li>' +
                  '<li><a class="dropdown-item" href="#" data-set-currency="EUR">EUR</a></li>' +
                '</ul>' +
              '</div>' +
              authLink +
              '<a href="contact.html" class="btn-luxe" data-i18n="nav.book">' + tr('nav.book', 'Book a Trip') + '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</nav>';
  }

  if (footerMount) {
    footerMount.innerHTML =
      '<footer class="footer-luxe">' +
        '<div class="container">' +
          '<div class="row g-4">' +
            '<div class="col-lg-5">' +
              '<h4 class="text-white mb-3" style="font-family:\'Playfair Display\',serif;">Ceylon<span class="text-gold">Journeys</span></h4>' +
              '<p data-i18n="footer.desc">' + tr('footer.desc', 'Sri Lanka travel experts.') + '</p>' +
              '<div class="socials mt-3">' +
                '<a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>' +
                '<a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
                '<a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>' +
              '</div>' +
            '</div>' +
            '<div class="col-6 col-lg-3">' +
              '<h6 data-i18n="footer.links">' + tr('footer.links', 'Quick Links') + '</h6>' +
              '<ul>' +
                '<li><a href="index.html" data-i18n="nav.home">' + tr('nav.home', 'Home') + '</a></li>' +
                '<li><a href="about.html" data-i18n="footer.about">' + tr('footer.about', 'About Us') + '</a></li>' +
                '<li><a href="destinations.html" data-i18n="nav.destinations">' + tr('nav.destinations', 'Destinations') + '</a></li>' +
                '<li><a href="tours.html" data-i18n="footer.tours">' + tr('footer.tours', 'Tour Packages') + '</a></li>' +
                '<li><a href="contact.html" data-i18n="nav.contact">' + tr('nav.contact', 'Contact') + '</a></li>' +
                '<li><a href="login.html" data-i18n="nav.login">' + tr('nav.login', 'Login') + '</a></li>' +
              '</ul>' +
            '</div>' +
            '<div class="col-lg-4">' +
              '<h6 data-i18n="footer.contact">' + tr('footer.contact', 'Contact') + '</h6>' +
              '<div class="small">' +
                '<div><i class="fa-solid fa-location-dot text-gold me-2"></i> 42 Galle Road, Colombo 03</div>' +
                '<div class="mt-2"><i class="fa-solid fa-phone text-gold me-2"></i> +94 11 234 5678</div>' +
                '<div class="mt-2"><i class="fa-regular fa-envelope text-gold me-2"></i> info@ceylonjourneys.lk</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 mt-4">' +
            '<div data-i18n="footer.copy">' + tr('footer.copy', '© 2026 Ceylon Journeys.') + '</div>' +
            '<div class="d-flex gap-3"><a href="#" data-i18n="footer.privacy">' + tr('footer.privacy', 'Privacy') + '</a><a href="#" data-i18n="footer.terms">' + tr('footer.terms', 'Terms') + '</a></div>' +
          '</div>' +
        '</div>' +
      '</footer>' +
      '<button id="backToTop" aria-label="Back to top"><i class="fa-solid fa-arrow-up"></i></button>';
  }

  if (typeof I18N !== 'undefined') I18N.bindSwitchers();
}
