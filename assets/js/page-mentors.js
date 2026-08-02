/* ==========================================================
   Page — 前辈咨询（列表 + 详情）
   ========================================================== */
(function () {
  'use strict';
  window.PAGES = window.PAGES || {};
  var U = UI;

  var state = { dir: '', svc: '', price: '', q: '' };

  function match(m) {
    var q = state.q.trim().toLowerCase();
    if (state.dir && m.dir !== state.dir) return false;
    if (state.price) {
      var r = state.price.split('-').map(Number);
      if (m.price < r[0] || m.price > r[1]) return false;
    }
    if (q && (L(m.name) + L(m.role) + L(m.bg)).toLowerCase().indexOf(q) < 0) return false;
    return true;
  }

  function card(m, compact) {
    var dir = U.byId(DATA_DIRECTIONS, m.dir);
    return '<article class="card card-hover mentor-card">' +
      '<div class="spread">' + U.badge(dir ? L(dir.name) : '', U.dirTone(dir)) +
        '<span class="row" style="--gap:4px;font-size:var(--fs-sm);color:var(--roach-500)">' +
        U.icon('i-star', 13) + m.rating + '</span></div>' +
      '<div class="mentor-card__hd">' + U.avatar(m.pose, m.tone, 56) +
        '<div class="grow">' +
          '<div class="mentor-card__n">' + U.esc(L(m.name)) + (m.verified ? U.icon('i-verified', 15) : '') + '</div>' +
          '<div class="mentor-card__r">' + U.esc(L(m.role)) + '</div>' +
          '<div class="dim" style="font-size:var(--fs-sm)">' + U.esc(L(m.bg)) + '</div>' +
        '</div></div>' +
      (compact ? '' : U.tags(m.help, 3)) +
      '<div class="mentor-card__foot">' +
        '<span class="price">' + U.money(m.price) + '<small>' + U.esc(T('mentor.perMin')) + '</small></span>' +
        '<span class="dim" style="font-size:var(--fs-sm)">' + U.esc(T('mentor.served', { n: m.served })) + '</span>' +
      '</div>' +
      '<a class="btn btn--primary btn--sm btn--block" href="#/mentors/' + m.id + '">' + U.esc(T('c.book')) + '</a>' +
    '</article>';
  }

  function results() {
    var list = DATA_MENTORS.filter(match);
    if (!list.length) return U.empty('roach-search');
    var top = list.filter(function (m) { return m.top; });
    var rest = list.filter(function (m) { return !m.top; });
    var h = '';
    if (top.length) {
      h += '<section class="section" style="margin-top:0">' +
        U.sectionHead(T('mentor.matched'), 'i-users') +
        '<div class="grid-cards">' + top.map(function (m) { return card(m); }).join('') + '</div></section>';
    }
    if (rest.length) {
      h += '<section class="section">' + U.sectionHead(T('mentor.new'), 'i-plus') +
        '<div class="grid-cards">' + rest.map(function (m) { return card(m); }).join('') + '</div></section>';
    }
    return h;
  }

  PAGES.mentors = {
    render: function () {
      var dirOpts = DATA_DIRECTIONS.map(function (d) { return { v: d.id, label: d.name }; });
      var svcOpts = MENTOR_SERVICES.map(function (s) { return { v: s.id, label: s.name }; });
      var priceOpts = [
        { v: '0-259', label: { zh: '¥259 及以下', en: 'Up to ¥259' } },
        { v: '260-320', label: { zh: '¥260 – 320', en: '¥260 – 320' } },
        { v: '321-999', label: { zh: '¥320 以上', en: 'Over ¥320' } }
      ];

      return '<header class="page-head"><div class="page-head__row"><div>' +
          '<h1 class="h-page">' + U.esc(T('mentor.title')) + '</h1>' +
          '<p class="page-lede">' + U.esc(T('mentor.lede')) + '</p></div>' +
          U.roach('roach-guide', 72) + '</div></header>' +

        '<div class="chips" style="margin-bottom:18px">' +
          '<span class="search" style="width:280px;height:38px">' + U.icon('i-search', 16) +
            '<input id="mentor-q" type="search" placeholder="' + U.esc(T('top.searchPh')) + '" style="height:38px;border-radius:var(--r-pill);padding-right:14px" /></span>' +
          U.chip('dir', T('me.target'), dirOpts, state.dir) +
          U.chip('svc', T('mentor.services'), svcOpts, state.svc) +
          U.chip('price', T('bk.amount'), priceOpts, state.price) +
          U.resetChip() +
        '</div>' +

        '<div id="mentor-results">' + results() + '</div>' +

        '<section class="section">' + U.sectionHead(Lang.isZh() ? '他们这样评价' : 'What people say', 'i-quote') +
          '<div class="grid-cards">' + DATA_REVIEWS.map(function (r) {
            return '<figure class="card card--pad">' +
              '<blockquote class="row" style="--gap:10px;align-items:flex-start">' + U.icon('i-quote', 20, 'dim') +
              '<span class="muted">' + U.esc(L(r.text)) + '</span></blockquote>' +
              '<figcaption class="row" style="--gap:10px;margin-top:14px">' + U.avatar(r.pose, r.tone, 32) +
              '<span><b style="display:block;font-size:var(--fs-md)">' + U.esc(L(r.name)) + '</b>' +
              '<span class="dim" style="font-size:var(--fs-sm)">' + U.esc(L(r.status)) + '</span></span></figcaption>' +
            '</figure>';
          }).join('') + '</div></section>';
    },

    mount: function (root) {
      var out = root.querySelector('#mentor-results');
      function refresh() { out.innerHTML = results(); }
      U.on(root, 'change', '[data-filter]', function (e, el) {
        state[el.getAttribute('data-filter')] = el.value;
        var chip = el.closest('.chip');
        if (chip) {
          chip.querySelector('span').textContent = el.value ? el.selectedOptions[0].textContent : el.options[0].textContent;
          if (el.value) chip.setAttribute('data-on', ''); else chip.removeAttribute('data-on');
        }
        refresh();
      });
      U.on(root, 'input', '#mentor-q', function (e, el) { state.q = el.value; refresh(); });
      U.on(root, 'click', '[data-reset]', function () {
        Object.keys(state).forEach(function (k) { state[k] = ''; });
        root.querySelectorAll('.chip').forEach(function (c) {
          var sel = c.querySelector('select'); sel.value = '';
          c.querySelector('span').textContent = sel.options[0].textContent;
          c.removeAttribute('data-on');
        });
        var q = root.querySelector('#mentor-q'); if (q) q.value = '';
        refresh();
      });
    },

    title: function () { return T('mentor.title'); },
    desc: function () { return T('mentor.lede'); }
  };

  /* ---------------- 前辈详情 ---------------- */
  PAGES.mentorDetail = {
    render: function (params) {
      var m = U.byId(DATA_MENTORS, params.id);
      if (!m) return null;
      var dir = U.byId(DATA_DIRECTIONS, m.dir);
      var cases = DATA_CASES.filter(function (c) { return c.mentor === m.id; }).slice(0, 2);
      var favId = 'mentor:' + m.id;

      var h = U.crumbs([{ label: T('nav.home'), href: '#/' },
                        { label: T('mentor.title'), href: '#/mentors' }, { label: L(m.name) }]);

      h += '<div class="with-side"><div class="stack" style="--gap:16px">' +

        '<header class="card card--pad mp-hero">' +
          U.avatar(m.pose, m.tone, 120, 'avatar--sq') +
          '<div class="grow">' +
            '<h1 class="mp-hero__name">' + U.esc(L(m.name)) + (m.verified ? U.icon('i-verified', 20) : '') + '</h1>' +
            '<p class="mp-hero__role">' + U.esc(L(m.role)) + '</p>' +
            '<p class="muted" style="margin-top:4px">' + U.esc(L(m.bg)) + '</p>' +
            '<div class="row" style="--gap:16px;margin-top:14px;flex-wrap:wrap">' +
              '<span class="row" style="--gap:5px;color:var(--roach-600);font-weight:600">' +
                U.icon('i-star', 15) + m.rating +
                '<span class="dim" style="font-weight:400;font-size:var(--fs-sm)">' + U.esc(T('mentor.reviews', { n: m.served })) + '</span></span>' +
              (dir ? U.badge(L(dir.name), U.dirTone(dir)) : '') +
              U.badge(T('mentor.next') + ' ' + L(m.next), 'mint') +
            '</div>' +
            '<div class="row" style="--gap:10px;margin-top:16px">' +
              '<a class="btn btn--primary" href="#/mentors/' + m.id + '/book">' + U.esc(T('c.book')) + U.icon('i-arrow-right', 16) + '</a>' +
              '<button class="btn" type="button" data-fav="' + favId + '" aria-pressed="' + U.Favs.has(favId) + '">' +
                U.icon(U.Favs.has(favId) ? 'i-star' : 'i-star-o', 15) + '<span>' + U.esc(T('c.save')) + '</span></button>' +
            '</div>' +
          '</div></header>' +

        '<section class="card card--pad"><h2 class="h-sec" style="margin-bottom:10px">' + U.esc(T('mentor.intro')) + '</h2>' +
          '<p class="muted">' + U.esc(L(m.bio)) + '</p></section>' +

        '<section class="card card--pad"><h2 class="h-sec" style="margin-bottom:12px">' + U.esc(T('mentor.topics')) + '</h2>' +
          '<ul class="bullets">' + m.topics.map(function (t) {
            return '<li>' + U.icon('i-check', 14) + '<span>' + U.esc(L(t)) + '</span></li>';
          }).join('') + '</ul></section>' +

        '<section class="card card--pad"><h2 class="h-sec" style="margin-bottom:12px">' + U.esc(T('mentor.services')) + '</h2>' +
          '<div class="svc-list">' + MENTOR_SERVICES.map(function (s) {
            return '<a class="svc" href="#/mentors/' + m.id + '/book?svc=' + s.id + '">' +
              U.icon(s.icon, 22) +
              '<span class="grow"><span class="svc__t">' + U.esc(L(s.name)) + '</span>' +
              '<span class="svc__d">' + U.esc(L(s.desc)) + '</span></span>' +
              '<span class="svc__p">' + U.money(s.price) + '</span></a>';
          }).join('') + '</div></section>' +

        '</div>';

      h += '<aside class="side-stack">' +
        '<section class="card card--pad">' +
          '<h2 class="h-sec" style="margin-bottom:12px">' + U.esc(T('mentor.bg')) + '</h2>' +
          '<dl class="kv" style="gap:12px">' +
            '<div><dt>' + U.esc(T('mentor.now')) + '</dt><dd>' + U.esc(L(m.now)) + ' @ ' + U.esc(L(m.company)) + '</dd></div>' +
            '<div><dt>' + U.esc(T('mentor.bg')) + '</dt><dd>' + U.esc(L(m.arch)) + '</dd></div>' +
            '<div><dt>' + U.esc(T('mentor.canHelp')) + '</dt><dd>' + U.tags(m.help) + '</dd></div>' +
          '</dl></section>' +

        '<section class="card card--pad"><h2 class="h-sec" style="margin-bottom:10px">' + U.esc(T('bk.assure')) + '</h2>' +
          '<div class="assure">' +
            [['i-shield', 'bk.a1', 'bk.a1d'], ['i-award', 'bk.a2', 'bk.a2d'], ['i-refresh', 'bk.a3', 'bk.a3d']]
              .map(function (a) {
                return '<div>' + U.icon(a[0], 17) + '<span><b>' + U.esc(T(a[1])) + '</b>' +
                  '<span>' + U.esc(T(a[2])) + '</span></span></div>';
              }).join('') + '</div></section>';

      if (cases.length) {
        h += '<section class="card card--pad"><h2 class="h-sec" style="margin-bottom:10px">' + U.esc(T('case.related')) + '</h2>' +
          '<div class="rows">' + cases.map(function (c) {
            return '<a class="row-item" style="grid-template-columns:64px minmax(0,1fr);padding:9px 6px;border:0" href="#/cases/' + c.id + '">' +
              ART.thumb(c.art) + '<span><b style="display:block;font-size:var(--fs-md)" class="clamp-2">' + U.esc(L(c.title)) + '</b></span></a>';
          }).join('') + '</div></section>';
      }

      return h + '</aside></div>';
    },

    mount: function (root) {
      U.on(root, 'click', '[data-fav]', function (e, el) {
        var on = U.Favs.toggle(el.getAttribute('data-fav'));
        el.setAttribute('aria-pressed', String(on));
        el.querySelector('svg').outerHTML = U.icon(on ? 'i-star' : 'i-star-o', 15);
        U.toast(T(on ? 'c.saved' : 'c.save'));
      });
    },

    title: function (params) {
      var m = U.byId(DATA_MENTORS, params.id);
      return m ? L(m.name) : T('c.notFound');
    }
  };
})();
