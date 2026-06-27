var I18N = (function () {
  var STORAGE_LANG = 'cj_lang';
  var STORAGE_CUR = 'cj_currency';

  var rates = { LKR: 1, USD: 0.0033, EUR: 0.0030 };
  var symbols = { LKR: 'Rs.', USD: '$', EUR: '€' };
  var labels = { LKR: 'LKR', USD: 'USD', EUR: 'EUR' };

  var dict = {
    en: {
      'nav.home': 'Home', 'nav.about': 'About', 'nav.destinations': 'Destinations',
      'nav.tours': 'Tours', 'nav.contact': 'Contact', 'nav.login': 'Login',
      'nav.dashboard': 'Dashboard', 'nav.admin': 'Admin Panel', 'nav.book': 'Book a Trip',
      'topbar.hours': 'Sri Lanka • Mon–Sat 9:00–18:00',
      'footer.desc': 'Your expert guides to Sri Lanka. We craft unforgettable cultural tours, hill country escapes, beach holidays, and wildlife safaris.',
      'footer.links': 'Quick Links', 'footer.contact': 'Contact', 'footer.about': 'About Us',
      'footer.tours': 'Tour Packages', 'footer.copy': '© 2026 Ceylon Journeys. Colombo, Sri Lanka.',
      'footer.privacy': 'Privacy', 'footer.terms': 'Terms',
      'index.search.title': 'Find a Sri Lanka Tour', 'index.search.dest': 'Destination',
      'index.search.date': 'Travel Date', 'index.search.guests': 'Guests', 'index.search.btn': 'Search',
      'index.dest.sub': 'Island highlights', 'index.dest.title': 'Popular Destinations',
      'index.dest.lead': 'Top places visitors explore when travelling around Sri Lanka.',
      'index.dest.all': 'View All',
      'index.tours.sub': 'Tour packages', 'index.tours.title': 'Featured Sri Lanka Tours',
      'index.tours.lead': 'Fixed-price packages with transport, guide, and accommodation options.',
      'index.tours.all': 'See All Tours', 'index.tours.enquire': 'Enquire',
      'index.stat.trips': 'Local Trips', 'index.stat.dest': 'Sri Lanka Destinations',
      'index.stat.packages': 'Tour Packages', 'index.stat.years': 'Years in Colombo',
      'index.why.sub': 'Why travel with us', 'index.why.title': 'Local Sri Lanka Experts',
      'index.reviews.sub': 'Reviews', 'index.reviews.title': 'What Travellers Say',
      'index.culture.sub': 'Culture & wildlife', 'index.culture.title': 'Experience Sri Lanka',
      'index.culture.lead': 'Elephants, ancient festivals, and traditions you can add to your itinerary.',
      'index.cta.title': 'Plan your Sri Lanka holiday',
      'index.cta.lead': 'Tell us your dates and budget. We create custom itineraries for families, couples, and groups.',
      'index.cta.btn': 'Get a Free Quote',
      'hero1.eyebrow': 'Explore Sri Lanka', 'hero1.title': 'Discover the Pearl<br>of the Indian Ocean',
      'hero1.text': 'Cultural heritage, tea country, golden beaches, and wildlife safaris – all in one island.', 'hero1.img': 'https://images.unsplash.com/photo-1593693397649-6d81e1d1d15c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'hero1.btn1': 'View Tour Packages', 'hero1.btn2': 'Get a Quote',
      'hero2.eyebrow': 'Hill Country', 'hero2.title': 'Ella, Nuwara Eliya<br>& Tea Plantations',
      'hero2.text': 'Scenic train rides, misty mountains, and cool climate escapes in the central highlands.', 'hero2.img': 'https://images.unsplash.com/photo-1613563952045-755a13f3ba9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'hero2.btn1': 'See Destinations', 'hero2.btn2': 'Check Prices',
      'hero3.eyebrow': 'Wildlife & Coast', 'hero3.title': 'Elephants, Yala<br>& Southern Beaches',
      'hero3.text': 'Jeep safaris with wild elephants, Galle Fort, and whale watching on the south coast.', 'hero3.img': 'https://images.unsplash.com/photo-1609103834689-4a4683c225d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'hero3.btn1': 'Beach Packages', 'hero3.btn2': 'Contact Us',
      'culture.elephants': 'Wild Elephants', 'culture.elephants.desc': 'See herds at Minneriya, Udawalawe, or Pinnawala on our safari and day tours.', 'culture.elephants.img': 'https://images.unsplash.com/photo-1558611013-e3d3f035b85a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'culture.perahera': 'Kandy Esala Perahera', 'culture.perahera.desc': 'World-famous procession with dancers, drummers, and decorated elephants each July–August.', 'culture.perahera.img': 'https://images.unsplash.com/photo-1680535326593-375c424c1446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'culture.dance': 'Kandyan Dance', 'culture.dance.desc': 'Traditional fire dance and drum performances at cultural centres in Kandy.', 'culture.dance.img': 'https://images.unsplash.com/photo-1601470298731-03b7d38991b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'culture.vesak': 'Vesak Festival', 'culture.vesak.desc': 'Lantern displays and temple visits during Sri Lanka\'s main Buddhist festival in May.', 'culture.vesak.img': 'https://images.unsplash.com/photo-1684173429369-76831314114a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'price.person': '/ person'
    },
    si: {
      'nav.home': 'මුල් පිටුව', 'nav.about': 'අප ගැන', 'nav.destinations': 'ගමනාන්ත',
      'nav.tours': 'සංචාර', 'nav.contact': 'සම්බන්ධ වන්න', 'nav.login': 'පිවිසෙන්න',
      'nav.dashboard': 'Dashboard', 'nav.admin': 'Admin Panel', 'nav.book': 'සංචාරයක් වෙන්කරන්න',
      'topbar.hours': 'ශ්‍රී ලංකාව • සඳ–සි: 9:00–18:00',
      'footer.desc': 'ශ්‍රී ලංකාව සඳහා ඔබේ විශේෂඥ මාර්ගෝපදේශකයෝ. අපි අමතක නොවන සංචාර නිර්මාණය කරමු.',
      'footer.links': 'ඉක්මන් සබැඳි', 'footer.contact': 'සම්බන්ධතා', 'footer.about': 'අප ගැන',
      'footer.tours': 'සංචාර පැකේජ', 'footer.copy': '© 2026 Ceylon Journeys. කොළඹ, ශ්‍රී ලanka.',
      'footer.privacy': 'පෞද්.තා', 'footer.terms': 'නියම',
      'index.search.title': 'ශ්‍රී ලanka සංචාරයක් සොයන්න', 'index.search.dest': 'ගමනාන්තය',
      'index.search.date': 'ගමන් දිනය', 'index.search.guests': 'අමුත්තන්', 'index.search.btn': 'සොයන්න',
      'index.dest.sub': 'දූපතේ highlights', 'index.dest.title': 'ජනප්‍රිය ගමනාන්ත',
      'index.dest.lead': 'ශ්‍රී ලanka සංචාරයේදී බහුලව посещение වන ස්ථාන.',
      'index.dest.all': 'සියල්ල බලන්න',
      'index.tours.sub': 'සංචාර පැකේජ', 'index.tours.title': 'Featured Sri Lanka Tours',
      'index.tours.lead': 'ප්‍රව.transport, guide සහ hotel සමඟ fixed-price packages.',
      'index.tours.all': 'සියලු සංචාර', 'index.tours.enquire': 'විමසන්න',
      'index.stat.trips': 'Local Trips', 'index.stat.dest': 'Sri Lanka Destinations',
      'index.stat.packages': 'Tour Packages', 'index.stat.years': 'Years in Colombo',
      'index.why.sub': 'Why travel with us', 'index.why.title': 'Local Sri Lanka Experts',
      'index.reviews.sub': 'Reviews', 'index.reviews.title': 'What Travellers Say',
      'index.culture.sub': 'සංස්කෘතිය & වනජීවී', 'index.culture.title': 'ශ්‍රී ලanka අත්දැකිම',
      'index.culture.lead': 'අලි, පැරණි උත්සව, සම්ප්‍රදාය – ඔබේ itinerary එකට add කරන්න.',
      'index.cta.title': 'Plan your Sri Lanka holiday',
      'index.cta.lead': 'Tell us your dates and budget.',
      'index.cta.btn': 'Get a Free Quote',
      'hero1.eyebrow': 'Explore Sri Lanka', 'hero1.title': 'Discover the Pearl<br>of the Indian Ocean',
      'hero1.text': 'Cultural heritage, tea country, golden beaches, and wildlife safaris.', 'hero1.img': 'https://images.unsplash.com/photo-1593693397649-6d81e1d1d15c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'hero1.btn1': 'View Tour Packages', 'hero1.btn2': 'Get a Quote',
      'hero2.eyebrow': 'Hill Country', 'hero2.title': 'Ella, Nuwara Eliya<br>& Tea Plantations',
      'hero2.text': 'Scenic train rides and cool climate in the central highlands.', 'hero2.img': 'https://images.unsplash.com/photo-1613563952045-755a13f3ba9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'hero2.btn1': 'See Destinations', 'hero2.btn2': 'Check Prices',
      'hero3.eyebrow': 'Wildlife & Coast', 'hero3.title': 'Elephants, Yala<br>& Southern Beaches',
      'hero3.text': 'Jeep safaris, Galle Fort, and whale watching.', 'hero3.img': 'https://images.unsplash.com/photo-1609103834689-4a4683c225d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'hero3.btn1': 'Beach Packages', 'hero3.btn2': 'Contact Us',
      'culture.elephants': 'Wild Elephants', 'culture.elephants.desc': 'Minneriya, Udawalawe, Pinnawala tours.', 'culture.elephants.img': 'https://images.unsplash.com/photo-1558611013-e3d3f035b85a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'culture.perahera': 'Kandy Esala Perahera', 'culture.perahera.desc': 'July–August procession with dancers and elephants.', 'culture.perahera.img': 'https://images.unsplash.com/photo-1680535326593-375c424c1446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'culture.dance': 'Kandyan Dance', 'culture.dance.desc': 'Traditional fire dance in Kandy.', 'culture.dance.img': 'https://images.unsplash.com/photo-1601470298731-03b7d38991b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'culture.vesak': 'Vesak Festival', 'culture.vesak.desc': 'Lantern displays in May.', 'culture.vesak.img': 'https://images.unsplash.com/photo-1684173429369-76831314114a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'price.person': '/ person'
    },
    ta: {
      'nav.home': 'முகப்பு', 'nav.about': 'எங்களைப் பற்றி', 'nav.destinations': 'இடங்கள்',
      'nav.tours': 'சுற்றுலா', 'nav.contact': 'தொடர்பு', 'nav.login': 'உள்நுழை',
      'nav.dashboard': 'Dashboard', 'nav.admin': 'Admin Panel', 'nav.book': 'பயணம் பதிவு',
      'topbar.hours': 'இலங்கை • தி–ச: 9:00–18:00',
      'footer.desc': 'இலங்கைக்கான உங்கள் நிபுணத்துவ வழிகாட்டிகள். மறக்க முடியாத பயணங்களை நாங்கள் உருவாக்குகிறோம்.',
      'footer.links': 'விரைவு இணைப்புகள்', 'footer.contact': 'தொடர்பு', 'footer.about': 'எங்களைப் பற்றி',
      'footer.tours': 'சுற்றுலா தொகுப்புகள்', 'footer.copy': '© 2026 Ceylon Journeys. கொழும்பு.',
      'footer.privacy': 'Privacy', 'footer.terms': 'Terms',
      'index.search.title': 'இலங்கை சுற்றுலா தேடுங்கள்', 'index.search.dest': 'இடம்',
      'index.search.date': 'பயண தேதி', 'index.search.guests': 'விருந்தினர்கள்', 'index.search.btn': 'தேடு',
      'index.dest.sub': 'Island highlights', 'index.dest.title': 'Popular Destinations',
      'index.dest.lead': 'Top places in Sri Lanka.', 'index.dest.all': 'View All',
      'index.tours.sub': 'Tour packages', 'index.tours.title': 'Featured Sri Lanka Tours',
      'index.tours.lead': 'Packages with transport and guide.', 'index.tours.all': 'See All Tours',
      'index.tours.enquire': 'Enquire',
      'index.stat.trips': 'Local Trips', 'index.stat.dest': 'Sri Lanka Destinations',
      'index.stat.packages': 'Tour Packages', 'index.stat.years': 'Years in Colombo',
      'index.why.sub': 'Why travel with us', 'index.why.title': 'Local Sri Lanka Experts',
      'index.reviews.sub': 'Reviews', 'index.reviews.title': 'What Travellers Say',
      'index.culture.sub': 'கலாசாரம் & வனவிலங்கு', 'index.culture.title': 'இலங்கை அனுபவம்',
      'index.culture.lead': 'யானைகள், பாரம்பரிய festivals, traditions.',
      'index.cta.title': 'Plan your Sri Lanka holiday', 'index.cta.lead': 'Tell us your dates.',
      'index.cta.btn': 'Get a Free Quote',
      'hero1.eyebrow': 'Explore Sri Lanka', 'hero1.title': 'Discover the Pearl<br>of the Indian Ocean',
      'hero1.text': 'Cultural heritage, tea country, beaches, and safaris.', 'hero1.img': 'https://images.unsplash.com/photo-1593693397649-6d81e1d1d15c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'hero1.btn1': 'View Tour Packages', 'hero1.btn2': 'Get a Quote',
      'hero2.eyebrow': 'Hill Country', 'hero2.title': 'Ella, Nuwara Eliya<br>& Tea Plantations',
      'hero2.text': 'Scenic train rides in the highlands.', 'hero2.img': 'https://images.unsplash.com/photo-1613563952045-755a13f3ba9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 'hero2.btn1': 'See Destinations', 'hero2.btn2': 'Check Prices',
      'hero3.eyebrow': 'Wildlife & Coast', 'hero3.title': 'Elephants, Yala<br>& Southern Beaches',
      'hero3.text': 'Safaris, Galle Fort, whale watching.', 'hero3.img': 'https://images.unsplash.com/photo-1609103834689-4a4683c225d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', 'hero3.btn1': 'Beach Packages', 'hero3.btn2': 'Contact Us',
      'culture.elephants': 'Wild Elephants', 'culture.elephants.desc': 'Minneriya, Udawalawe, Pinnawala.', 'culture.elephants.img': 'https://images.unsplash.com/photo-1558611013-e3d3f035b85a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'culture.perahera': 'Kandy Esala Perahera', 'culture.perahera.desc': 'July–August procession.', 'culture.perahera.img': 'https://images.unsplash.com/photo-1680535326593-375c424c1446?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'culture.dance': 'Kandyan Dance', 'culture.dance.desc': 'Traditional dance in Kandy.', 'culture.dance.img': 'https://images.unsplash.com/photo-1601470298731-03b7d38991b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'culture.vesak': 'Vesak Festival', 'culture.vesak.desc': 'Lantern festival in May.', 'culture.vesak.img': 'https://images.unsplash.com/photo-1684173429369-76831314114a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'price.person': '/ person'
    }
  };

  function getLang() {
    return localStorage.getItem(STORAGE_LANG) || 'en';
  }

  function getCurrency() {
    return localStorage.getItem(STORAGE_CUR) || 'LKR';
  }

  function setLang(code) {
    localStorage.setItem(STORAGE_LANG, code);
    document.documentElement.lang = code === 'si' ? 'si' : code === 'ta' ? 'ta' : 'en';
    apply();
    if (typeof renderSiteChrome === 'function') renderSiteChrome();
  }

  function setCurrency(code) {
    localStorage.setItem(STORAGE_CUR, code);
    applyPrices();
    updateBudgetLabel();
    document.dispatchEvent(new CustomEvent('cj:currency', { detail: code }));
  }

  function t(key) {
    var lang = getLang();
    return (dict[lang] && dict[lang][key]) || dict.en[key] || key;
  }

  function formatPrice(lkrAmount) {
    var cur = getCurrency();
    var converted = Math.round(lkrAmount * rates[cur]);
    if (cur === 'LKR') return symbols.LKR + ' ' + converted.toLocaleString('en-LK');
    if (cur === 'USD') return symbols.USD + converted.toLocaleString('en-US');
    return symbols.EUR + ' ' + converted.toLocaleString('de-DE');
  }

  function apply() {
    var lang = getLang();
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var text = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (text.indexOf('<br>') !== -1) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }

      // Handle images stored in the dictionary (e.g., hero, culture cards)
      // Find an associated image tag (e.g., for culture cards)
      var imgEl = el.querySelector('img') || (el.tagName === 'IMG' ? el : null);
      var imgUrl = t(key + '.img');
      if (imgEl && imgUrl !== (key + '.img')) { // Check if translation was found
        imgEl.src = imgUrl;
      }
    });
    applyPrices();
    updateSwitcherLabels();
  }

  function applyPrices() {
    document.querySelectorAll('[data-price-lkr]').forEach(function (el) {
      var lkr = parseFloat(el.getAttribute('data-price-lkr'));
      if (isNaN(lkr)) return;
      var formatted = formatPrice(lkr);
      var suffix = el.querySelector('small');
      if (suffix) {
        if (el.firstChild && el.firstChild.nodeType === 3) {
          el.firstChild.textContent = formatted + ' ';
        } else {
          el.insertBefore(document.createTextNode(formatted + ' '), suffix);
        }
      } else {
        el.textContent = formatted;
      }
    });
  }

  function updateBudgetLabel() {
    var budgetInput = document.getElementById('filterBudget');
    var budgetVal = document.getElementById('budgetValue');
    if (budgetInput && budgetVal) {
      budgetVal.textContent = formatPrice(parseInt(budgetInput.value, 10));
    }
  }

  function updateSwitcherLabels() {
    var langBtn = document.getElementById('langCurrent');
    var curBtn = document.getElementById('curCurrent');
    var lang = getLang();
    var cur = getCurrency();
    if (langBtn) {
      langBtn.textContent = lang === 'si' ? 'සිං' : lang === 'ta' ? 'தமி' : 'EN';
    }
    if (curBtn) curBtn.textContent = labels[cur] || 'LKR';
  }

  function bindSwitchers() {
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setLang(btn.getAttribute('data-set-lang'));
      });
    });
    document.querySelectorAll('[data-set-currency]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        setCurrency(btn.getAttribute('data-set-currency'));
      });
    });
  }

  document.documentElement.lang = getLang() === 'si' ? 'si' : getLang() === 'ta' ? 'ta' : 'en';

  return {
    t: t,
    getLang: getLang,
    getCurrency: getCurrency,
    setLang: setLang,
    setCurrency: setCurrency,
    formatPrice: formatPrice,
    apply: apply,
    bindSwitchers: bindSwitchers,
    convertFromLkr: function (lkr) { return Math.round(lkr * rates[getCurrency()]); }
  };
})();
