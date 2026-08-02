/* ==========================================================
   App — 路由 / 全局搜索 / 侧栏抽屉 / 语言切换
   ========================================================== */
(function () {
  'use strict';

  var view = document.getElementById('view');
  var progress = document.getElementById('route-progress');
  var sidebar = document.getElementById('sidebar');
  var scrim = document.getElementById('scrim');
  var toggle = document.getElementById('sidebar-toggle');
  var searchInput = document.getElementById('global-search');
  var searchPanel = document.getElementById('search-panel');

  /* ---------------- 路由表 ---------------- */
  var ROUTES = [
    { re: /^\/?$/, page: 'home', nav: '#/' },
    { re: /^\/directions\/([A-Za-z0-9_-]+)\/?$/, page: 'directionDetail', keys: ['id'], nav: '#/directions' },
    { re: /^\/directions\/?$/, page: 'directions', nav: '#/directions' },
    { re: /^\/cases\/([A-Za-z0-9_-]+)\/?$/, page: 'caseDetail', keys: ['id'], nav: '#/cases' },
    { re: /^\/cases\/?$/, page: 'cases', nav: '#/cases' },
    { re: /^\/mentors\/([A-Za-z0-9_-]+)\/book\/?$/, page: 'booking', keys: ['id'], nav: '#/mentors' },
    { re: /^\/mentors\/([A-Za-z0-9_-]+)\/?$/, page: 'mentorDetail', keys: ['id'], nav: '#/mentors' },
    { re: /^\/mentors\/?$/, page: 'mentors', nav: '#/mentors' },
    { re: /^\/skills\/?$/, page: 'skills', nav: '#/skills' },
    { re: /^\/resources\/?$/, page: 'resources', nav: '#/resources' },
    { re: /^\/roadmap\/?$/, page: 'roadmap', nav: '#/roadmap' },
    { re: /^\/me\/settings\/?$/, page: 'settings', nav: '#/me/settings' },
    { re: /^\/me\/([A-Za-z]+)\/?$/, page: 'me', keys: ['tab'], nav: null },
    { re: /^\/me\/?$/, page: 'me', nav: '#/me/bookings' }
  ];

  function currentPath() {
    var h = location.hash.replace(/^#/, '').split('?')[0];
    return h || '/';
  }

  function resolve(path) {
    for (var i = 0; i < ROUTES.length; i++) {
      var m = path.match(ROUTES[i].re);
      if (m) {
        var params = {};
        (ROUTES[i].keys || []).forEach(function (k, idx) { params[k] = m[idx + 1]; });
        return { def: ROUTES[i], params: params };
      }
    }
    return null;
  }

  /* ---------------- 渲染 ---------------- */
  var lastPath = null;
  var BASE_DESC = (document.querySelector('meta[name="description"]') || {}).content || '';

  function setMeta(name, content) {
    var el = document.querySelector('meta[name="' + name + '"]');
    if (el) el.setAttribute('content', content);
  }

  function setActiveNav(href) {
    document.querySelectorAll('.nav-item').forEach(function (a) {
      if (href && a.getAttribute('data-nav') === href) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function render(opts) {
    var path = currentPath();
    var hit = resolve(path);
    var page = hit ? PAGES[hit.def.page] : PAGES.notFound;
    var params = hit ? hit.params : {};

    var html = page && page.render ? page.render(params) : null;
    if (html == null) { page = PAGES.notFound; html = page.render(); params = {}; }

    progress.classList.remove('is-running');
    void progress.offsetWidth;
    progress.classList.add('is-running');

    view.innerHTML = html;
    view.classList.remove('view-enter');
    void view.offsetWidth;
    view.classList.add('view-enter');

    if (page.mount) page.mount(view, params);

    document.title = (page.title ? page.title(params) + ' · ' : '') + 'ArchRoach Hub 建筑蟑螂互助会';
    setMeta('description', page.desc ? page.desc(params) : BASE_DESC);

    var navHref = hit ? hit.def.nav : null;
    if (hit && hit.def.page === 'me') navHref = '#/me/' + (params.tab || 'bookings');
    setActiveNav(navHref);

    if (!opts || !opts.keepScroll) {
      if (lastPath !== path) window.scrollTo({ top: 0, behavior: lastPath === null ? 'auto' : 'smooth' });
    }
    lastPath = path;
    closeDrawer();
  }

  /* ---------------- 侧栏抽屉 ---------------- */
  function openDrawer() {
    sidebar.setAttribute('data-open', '');
    scrim.setAttribute('data-open', '');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeDrawer() {
    sidebar.removeAttribute('data-open');
    scrim.removeAttribute('data-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  toggle.addEventListener('click', function () {
    if (sidebar.hasAttribute('data-open')) closeDrawer(); else openDrawer();
  });
  scrim.addEventListener('click', closeDrawer);

  /* ---------------- 全局搜索 ---------------- */
  function searchAll(q) {
    var key = q.trim().toLowerCase();
    if (!key) return null;
    function hit(text) { return String(text).toLowerCase().indexOf(key) >= 0; }

    return [
      { label: T('search.dir'), icon: 'i-compass',
        items: DATA_DIRECTIONS.filter(function (d) { return hit(L(d.name) + L(d.desc)); })
          .slice(0, 4).map(function (d) { return { href: '#/directions/' + d.id, title: L(d.name), sub: L(d.desc) }; }) },
      { label: T('search.case'), icon: 'i-book',
        items: DATA_CASES.filter(function (c) { return hit(L(c.title) + L(c.excerpt) + L(c.author)); })
          .slice(0, 4).map(function (c) { return { href: '#/cases/' + c.id, title: L(c.title), sub: L(c.author) }; }) },
      { label: T('search.mentor'), icon: 'i-users',
        items: DATA_MENTORS.filter(function (m) { return hit(L(m.name) + L(m.role) + L(m.bg)); })
          .slice(0, 4).map(function (m) { return { href: '#/mentors/' + m.id, title: L(m.name), sub: L(m.role) }; }) },
      { label: T('search.job'), icon: 'i-briefcase',
        items: DATA_JOBS.filter(function (j) { return hit(L(j.title) + j.company); })
          .slice(0, 3).map(function (j) { return { href: '#/resources', title: L(j.title), sub: j.company }; }) }
    ].filter(function (g) { return g.items.length; });
  }

  function renderSearch(q) {
    var groups = searchAll(q);
    if (!groups) {
      searchPanel.hidden = true;
      return;
    }
    if (!groups.length) {
      searchPanel.innerHTML = '<p class="search-empty">' + UI.esc(T('search.empty')) + '<br />' +
        '<small>' + UI.esc(T('search.hint')) + '</small></p>';
    } else {
      searchPanel.innerHTML = groups.map(function (g) {
        return '<p class="search-panel__group">' + UI.esc(g.label) + '</p>' + g.items.map(function (it) {
          return '<a class="search-hit" href="' + it.href + '" role="option">' + UI.icon(g.icon, 16) +
            '<span class="grow truncate">' + UI.esc(it.title) + '</span>' +
            '<small class="truncate">' + UI.esc(it.sub) + '</small></a>';
        }).join('');
      }).join('');
    }
    searchPanel.hidden = false;
  }

  searchInput.addEventListener('input', function () { renderSearch(searchInput.value); });
  searchInput.addEventListener('focus', function () { if (searchInput.value) renderSearch(searchInput.value); });
  searchPanel.addEventListener('click', function (e) {
    if (e.target.closest('.search-hit')) {
      searchPanel.hidden = true;
      searchInput.value = '';
      searchInput.blur();
    }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.search')) searchPanel.hidden = true;
  });
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    if (e.key === 'Escape') { searchPanel.hidden = true; closeDrawer(); }
  });

  /* ---------------- 语言 ---------------- */
  document.querySelectorAll('.lang-switch button').forEach(function (btn) {
    btn.addEventListener('click', function () { Lang.set(btn.getAttribute('data-lang')); });
  });
  Lang.onChange(function (lang) {
    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
    searchPanel.hidden = true;
    render({ keepScroll: true });
  });

  /* ---------------- 启动 ---------------- */
  window.addEventListener('hashchange', function () { render(); });

  document.documentElement.lang = Lang.current === 'en' ? 'en' : 'zh-CN';
  document.querySelectorAll('.lang-switch button').forEach(function (b) {
    b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === Lang.current));
  });
  Lang.applyStatic();
  render();

  /* 开场页：每会话首次访问覆盖在首页之上，淡出后自毁（?intro=1 可强制重看） */
  if (window.Opening) Opening.maybeShow();
})();
