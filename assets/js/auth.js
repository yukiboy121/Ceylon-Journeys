var CJ = (function () {
  var KEYS = {
    users: 'cj_users',
    session: 'cj_session',
    inquiries: 'cj_inquiries',
    bookings: 'cj_bookings',
    tours: 'cj_tours'
  };

  var defaultTours = [
    { id: 1, name: 'Sigiriya & Dambulla Day Tour', destination: 'Sigiriya', days: 1, price: 12500, type: 'cultural', img: 'https://images.unsplash.com/photo-1583691929269-095a13535163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { id: 2, name: 'Kandy & Temple of the Tooth', destination: 'Kandy', days: 2, price: 28000, type: 'cultural', img: 'https://images.unsplash.com/photo-1594010115912-38433f2d294c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { id: 3, name: 'Ella & Nuwara Eliya Hill Country', destination: 'Ella', days: 4, price: 65000, type: 'adventure', img: 'https://images.unsplash.com/photo-1553974807-434a861432a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' },
    { id: 4, name: 'Yala Safari Adventure', destination: 'Yala', days: 2, price: 42000, type: 'wildlife', img: 'https://images.unsplash.com/photo-1580282195526-8940f164445a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80' },
    { id: 5, name: 'Galle & Mirissa South Coast', destination: 'Galle', days: 3, price: 48000, type: 'beach', img: 'https://images.unsplash.com/photo-1622325992348-1873c9a8a348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80' }
  ];

  var defaultBookings = [
    { id: 1, userId: 2, tour: 'Ella & Nuwara Eliya Hill Country', destination: 'Ella', date: '2026-08-12', guests: 2, status: 'confirmed', total: 130000 },
    { id: 2, userId: 2, tour: 'Yala Safari Adventure', destination: 'Yala', date: '2026-11-05', guests: 2, status: 'pending', total: 84000 }
  ];

  function init() {
    if (!localStorage.getItem(KEYS.users)) {
      localStorage.setItem(KEYS.users, JSON.stringify([
        { id: 1, name: 'Admin User', email: 'admin@ceylonjourneys.lk', password: 'admin123', role: 'admin', phone: '077 111 2222' },
        { id: 2, name: 'Nimali Perera', email: 'user@email.com', password: 'user123', role: 'user', phone: '077 333 4444' }
      ]));
    }
    if (!localStorage.getItem(KEYS.tours)) {
      localStorage.setItem(KEYS.tours, JSON.stringify(defaultTours));
    }
    if (!localStorage.getItem(KEYS.bookings)) {
      localStorage.setItem(KEYS.bookings, JSON.stringify(defaultBookings));
    }
    if (!localStorage.getItem(KEYS.inquiries)) {
      localStorage.setItem(KEYS.inquiries, JSON.stringify([
        { id: 1, name: 'Kasun Jayawardena', email: 'kasun@mail.com', phone: '077 555 6666', destination: 'Ella', message: 'Need a quote for 4 people in July.', date: '2026-06-20', status: 'new' },
        { id: 2, name: 'Dilani Fernando', email: 'dilani@mail.com', phone: '071 222 3333', destination: 'Yala', message: 'Family safari package enquiry for December.', date: '2026-06-22', status: 'replied' }
      ]));
    }

    if (localStorage.getItem('cj_data_version') !== 'sl-1') {
      localStorage.setItem(KEYS.tours, JSON.stringify(defaultTours));
      localStorage.setItem(KEYS.bookings, JSON.stringify(defaultBookings));
      localStorage.setItem(KEYS.inquiries, JSON.stringify([
        { id: 1, name: 'Kasun Jayawardena', email: 'kasun@mail.com', phone: '077 555 6666', destination: 'Ella', message: 'Need a quote for 4 people in July.', date: '2026-06-20', status: 'new' },
        { id: 2, name: 'Dilani Fernando', email: 'dilani@mail.com', phone: '071 222 3333', destination: 'Yala', message: 'Family safari package enquiry for December.', date: '2026-06-22', status: 'replied' }
      ]));
      localStorage.setItem('cj_data_version', 'sl-1');
    }
  }

  function getUsers() { return JSON.parse(localStorage.getItem(KEYS.users) || '[]'); }
  function saveUsers(list) { localStorage.setItem(KEYS.users, JSON.stringify(list)); }

  function getSession() {
    var raw = sessionStorage.getItem(KEYS.session);
    return raw ? JSON.parse(raw) : null;
  }

  function setSession(user) {
    sessionStorage.setItem(KEYS.session, JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }));
  }

  function logout() {
    sessionStorage.removeItem(KEYS.session);
    window.location.href = 'login.html';
  }

  function login(email, password) {
    var users = getUsers();
    var found = users.find(function (u) {
      return u.email.toLowerCase() === email.toLowerCase() && u.password === password;
    });
    if (!found) return { ok: false, message: 'Invalid email or password.' };
    setSession(found);
    return { ok: true, role: found.role };
  }

  function register(data) {
    var users = getUsers();
    if (users.some(function (u) { return u.email.toLowerCase() === data.email.toLowerCase(); })) {
      return { ok: false, message: 'This email is already registered.' };
    }
    var user = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      password: data.password,
      role: 'user',
      phone: data.phone || ''
    };
    users.push(user);
    saveUsers(users);
    setSession(user);
    return { ok: true };
  }

  function requireRole(role) {
    var session = getSession();
    if (!session) {
      window.location.href = 'login.html';
      return null;
    }
    if (role && session.role !== role) {
      window.location.href = session.role === 'admin' ? 'admin.html' : 'dashboard.html';
      return null;
    }
    return session;
  }

  function getInquiries() {
    return JSON.parse(localStorage.getItem(KEYS.inquiries) || '[]');
  }

  function saveInquiry(data) {
    var list = getInquiries();
    var item = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      destination: data.destination,
      message: data.message,
      date: new Date().toISOString().slice(0, 10),
      status: 'new'
    };
    list.unshift(item);
    localStorage.setItem(KEYS.inquiries, JSON.stringify(list));
    return item;
  }

  function updateInquiryStatus(id, status) {
    var list = getInquiries();
    list = list.map(function (item) {
      if (item.id === id) item.status = status;
      return item;
    });
    localStorage.setItem(KEYS.inquiries, JSON.stringify(list));
  }

  function deleteInquiry(id) {
    var list = getInquiries().filter(function (item) { return item.id !== id; });
    localStorage.setItem(KEYS.inquiries, JSON.stringify(list));
  }

  function getBookings(userId) {
    var all = JSON.parse(localStorage.getItem(KEYS.bookings) || '[]');
    if (userId) return all.filter(function (b) { return b.userId === userId; });
    return all;
  }

  function addBooking(data) {
    var list = getBookings();
    var item = {
      id: Date.now(),
      userId: data.userId,
      tour: data.tour,
      destination: data.destination,
      date: data.date,
      guests: data.guests,
      status: 'pending',
      total: data.total
    };
    list.push(item);
    localStorage.setItem(KEYS.bookings, JSON.stringify(list));
    return item;
  }

  function updateBookingStatus(id, status) {
    var list = getBookings();
    list = list.map(function (b) {
      if (b.id === id) b.status = status;
      return b;
    });
    localStorage.setItem(KEYS.bookings, JSON.stringify(list));
  }

  function getTours() {
    return JSON.parse(localStorage.getItem(KEYS.tours) || '[]');
  }

  function saveTour(tour) {
    var list = getTours();
    if (tour.id) {
      list = list.map(function (t) { return t.id === tour.id ? tour : t; });
    } else {
      tour.id = Date.now();
      list.push(tour);
    }
    localStorage.setItem(KEYS.tours, JSON.stringify(list));
    return tour;
  }

  function deleteTour(id) {
    var list = getTours().filter(function (t) { return t.id !== id; });
    localStorage.setItem(KEYS.tours, JSON.stringify(list));
  }

  function formatDate(str) {
    if (!str) return '-';
    var d = new Date(str);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  function formatPrice(amount) {
    if (typeof I18N !== 'undefined') return I18N.formatPrice(amount);
    return 'Rs. ' + Number(amount).toLocaleString('en-LK');
  }

  function statusBadge(status) {
    var map = {
      new: 'badge bg-warning text-dark',
      replied: 'badge bg-success',
      pending: 'badge bg-warning text-dark',
      confirmed: 'badge bg-success',
      cancelled: 'badge bg-secondary'
    };
    return '<span class="' + (map[status] || 'badge bg-secondary') + '">' + status + '</span>';
  }

  init();

  return {
    login: login,
    logout: logout,
    register: register,
    getSession: getSession,
    requireRole: requireRole,
    getUsers: getUsers,
    getInquiries: getInquiries,
    saveInquiry: saveInquiry,
    updateInquiryStatus: updateInquiryStatus,
    deleteInquiry: deleteInquiry,
    getBookings: getBookings,
    addBooking: addBooking,
    updateBookingStatus: updateBookingStatus,
    getTours: getTours,
    saveTour: saveTour,
    deleteTour: deleteTour,
    formatDate: formatDate,
    formatPrice: formatPrice,
    statusBadge: statusBadge
  };
})();
