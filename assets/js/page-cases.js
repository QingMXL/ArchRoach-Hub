/* ==========================================================
   Page — 真实案例（列表 + 详情）
   ========================================================== */
(function () {
  'use strict';
  window.PAGES = window.PAGES || {};
  var U = UI;
  var PAGE = 6;

  var state = { dir: '', years: '', offline: '', pf: '', q: '', tab: 'all', shown: PAGE };

  function match(c) {
    var q = state.q.trim().toLowerCase();
    if (state.tab === 'consultable' && !c.consultable) return false;
    if (state.tab === 'featured' && !c.featured && !c.editorPick) return false;
    if (state.dir && c.dir !== state.dir) return false;
    if (state.offline && (state.offline === 'yes') !== !!c.offline) return false;
    if (q && (L(c.title) + L(c.excerpt) + L(c.tag) + L(c.author)).toLowerCase().indexOf(q) < 0) return false;
    return true;
  }

  function row(c) {
    var dir = U.byId(DATA_DIRECTIONS, c.dir);
    var favId = 'case:' + c.id;
    return '<a class="row-item case-row" href="#/cases/' + c.id + '">' +
      ART.thumb(c.art) +
      '<span>' +
        '<span class="row" style="--gap:6px;margin-bottom:5px">' +
          U.badge(dir ? L(dir.name) : L(c.tag), U.dirTone(dir)) +
          U.badge((Lang.isZh() ? c.prep + ' 个月准备' : c.prep + ' mo prep')) +
          (c.consultable ? U.badge(T('c.consultable'), 'mint') : '') +
        '</span>' +
        '<h3 class="clamp-2">' + U.esc(L(c.title)) + '</h3>' +
        '<p class="clamp-2">' + U.esc(L(c.excerpt)) + '</p>' +
        '<span class="meta" style="margin-top:8px">' +
          '<span>' + U.avatar(c.pose, c.tone, 20) + U.esc(L(c.author)) + '</span>' +
          '<span>' + U.icon('i-clock', 13) + c.date + '</span>' +
        '</span>' +
      '</span>' +
      '<span class="case-row__meta muted" style="font-size:var(--fs-sm)">' +
        U.esc(T('case.prepTime')) + '：' + c.prep + ' ' + U.esc(T('c.months')) + '</span>' +
      U.fav(favId, U.Favs.has(favId)) +
    '</a>';
  }

  function results() {
    var list = DATA_CASES.filter(match);
    if (!list.length) return U.empty('roach-search');
    var visible = list.slice(0, state.shown);
    return '<div class="card" style="padding:10px 8px"><div class="rows">' + visible.map(row).join('') + '</div></div>' +
      (list.length > visible.length
        ? '<div style="display:flex;justify-content:center;margin-top:18px">' +
          '<button class="btn" type="button" data-more>' + U.esc(T('case.loadMore')) + U.icon('i-chevron-down', 16) + '</button></div>'
        : '');
  }

  PAGES.cases = {
    render: function () {
      var dirOpts = DATA_DIRECTIONS.map(function (d) { return { v: d.id, label: d.name }; });
      var yn = [{ v: 'yes', label: { zh: '脱产准备', en: 'Took time off' } },
                { v: 'no', label: { zh: '在职准备', en: 'While working' } }];
      var all = DATA_CASES.length;
      var consultable = DATA_CASES.filter(function (c) { return c.consultable; }).length;

      return '<header class="page-head"><div class="page-head__row"><div>' +
          '<h1 class="h-page">' + U.esc(T('case.title')) + '</h1>' +
          '<p class="page-lede">' + U.esc(T('case.lede')) + '</p></div>' +
          U.roach('roach-book', 72) + '</div></header>' +

        '<div class="chips" style="margin-bottom:16px">' +
          '<span class="search" style="width:280px;height:38px">' + U.icon('i-search', 16) +
            '<input id="case-q" type="search" placeholder="' + U.esc(T('top.searchPh')) + '" style="height:38px;border-radius:var(--r-pill);padding-right:14px" /></span>' +
          U.chip('dir', T('dir.colName'), dirOpts, state.dir) +
          U.chip('years', T('c.exp'), DIR_FILTERS.years, state.years) +
          U.chip('offline', T('case.prepTime'), yn, state.offline) +
          U.chip('pf', T('c.portfolio'), DIR_FILTERS.portfolio, state.pf) +
          U.resetChip() +
        '</div>' +

        '<div class="tabs" role="tablist" style="margin-bottom:16px">' +
          [['all', T('case.all'), all], ['consultable', T('case.consultable'), consultable],
           ['featured', T('case.featured'), DATA_CASES.filter(function (c) { return c.featured || c.editorPick; }).length]]
            .map(function (t) {
              return '<button class="tab" type="button" role="tab" data-ctab="' + t[0] + '" aria-selected="' +
                (state.tab === t[0]) + '">' + U.esc(t[1]) + '<small>' + t[2] + '</small></button>';
            }).join('') +
        '</div>' +

        '<div id="case-results">' + results() + '</div>';
    },

    mount: function (root) {
      var out = root.querySelector('#case-results');
      function refresh() { out.innerHTML = results(); }

      U.on(root, 'change', '[data-filter]', function (e, el) {
        state[el.getAttribute('data-filter')] = el.value;
        var chip = el.closest('.chip');
        if (chip) {
          chip.querySelector('span').textContent = el.value ? el.selectedOptions[0].textContent : el.options[0].textContent;
          if (el.value) chip.setAttribute('data-on', ''); else chip.removeAttribute('data-on');
        }
        state.shown = PAGE; refresh();
      });
      U.on(root, 'input', '#case-q', function (e, el) { state.q = el.value; state.shown = PAGE; refresh(); });
      U.on(root, 'click', '[data-ctab]', function (e, el) {
        state.tab = el.getAttribute('data-ctab');
        root.querySelectorAll('[data-ctab]').forEach(function (t) {
          t.setAttribute('aria-selected', String(t.getAttribute('data-ctab') === state.tab));
        });
        state.shown = PAGE; refresh();
      });
      U.on(root, 'click', '[data-reset]', function () {
        state = { dir: '', years: '', offline: '', pf: '', q: '', tab: state.tab, shown: PAGE };
        root.querySelectorAll('.chip').forEach(function (c) {
          var sel = c.querySelector('select'); sel.value = '';
          c.querySelector('span').textContent = sel.options[0].textContent;
          c.removeAttribute('data-on');
        });
        var q = root.querySelector('#case-q'); if (q) q.value = '';
        refresh();
      });
      U.on(root, 'click', '[data-more]', function () { state.shown += PAGE; refresh(); });
      U.on(root, 'click', '[data-fav]', function (e, el) {
        e.preventDefault();
        var on = U.Favs.toggle(el.getAttribute('data-fav'));
        el.setAttribute('aria-pressed', String(on));
        el.innerHTML = U.icon(on ? 'i-star' : 'i-star-o', 16);
      });
    },

    title: function () { return T('case.title'); }
  };

  /* ---------------- 详情 ---------------- */
  var SECTIONS = [
    ['why', 'i-bulb', { zh: '转行契机', en: 'What triggered the move' }],
    ['xfer', 'i-shuffle', { zh: '能力迁移', en: 'How my skills transferred' }],
    ['material', 'i-clipboard', { zh: '我如何准备作品集与简历', en: 'Preparing portfolio and CV' }],
    ['interview', 'i-chat', { zh: '面试时怎么讲建筑背景', en: 'Talking about architecture in interviews' }],
    ['hardest', 'i-warning', { zh: '最难的部分', en: 'The hardest part' }],
    ['advice', 'i-star-o', { zh: '给后来者的建议', en: 'Advice for those coming after' }]
  ];

  PAGES.caseDetail = {
    render: function (params) {
      var c = U.byId(DATA_CASES, params.id);
      if (!c) return null;
      var dir = U.byId(DATA_DIRECTIONS, c.dir);
      var mentor = U.byId(DATA_MENTORS, c.mentor);
      var related = DATA_CASES.filter(function (x) { return x.id !== c.id; }).slice(0, 3);

      var h = U.crumbs([{ label: T('nav.home'), href: '#/' },
                        { label: T('case.title'), href: '#/cases' },
                        { label: Lang.isZh() ? '案例详情' : 'Story' }]);

      h += '<div class="with-side"><div>' +
        '<header class="card card--pad" style="margin-bottom:16px">' +
          '<div class="row" style="--gap:8px;margin-bottom:10px">' +
            U.badge(dir ? L(dir.name) : L(c.tag), U.dirTone(dir)) +
            U.badge((Lang.isZh() ? c.prep + ' 个月准备' : c.prep + ' mo prep')) +
            (c.consultable ? U.badge(T('c.consultable'), 'mint') : '') +
          '</div>' +
          '<h1 class="cd-title">' + U.esc(L(c.title)) + '</h1>' +
          '<p class="muted" style="margin-top:10px">' + U.esc(L(c.excerpt)) + '</p>' +
          '<div class="spread" style="margin-top:16px">' +
            '<span class="row" style="--gap:10px">' + U.avatar(c.pose, c.tone, 40) +
              '<span><b style="display:block">' + U.esc(L(c.author)) + '</b>' +
              '<span class="dim" style="font-size:var(--fs-sm)">' + U.esc(L(c.role)) + '</span></span></span>' +
            '<span class="meta"><span>' + U.icon('i-clock', 13) + U.esc(T('case.read')) + ' ' + c.read +
              ' min</span><span>' + U.icon('i-calendar', 13) + c.date + '</span></span>' +
          '</div>' +
          '<div style="margin-top:16px">' + ART.thumb(c.art) + '</div>' +
        '</header>' +

        '<article class="card card--pad">' + SECTIONS.map(function (s, i) {
          return '<section class="cd-sec" id="sec-' + s[0] + '">' +
            '<h2>' + U.icon(s[1], 18) + U.esc(L(s[2])) + '</h2>' +
            '<p>' + U.esc(L(c.story[s[0]])) + '</p>' +
            (s[0] === 'xfer' ? '<div style="margin-top:12px">' + U.tags(c.skills) + '</div>' : '') +
          '</section>';
        }).join('') + '</article>' +
      '</div>';

      /* 侧栏 */
      h += '<aside class="side-stack">' +
        '<section class="card card--pad"><h2 class="h-sec" style="margin-bottom:10px">' + U.esc(T('case.toc')) + '</h2>' +
          '<nav class="cd-toc">' + SECTIONS.map(function (s, i) {
            return '<a href="#sec-' + s[0] + '"' + (i === 0 ? ' data-on' : '') + '>' + U.esc(L(s[2])) + '</a>';
          }).join('') + '</nav></section>' +

        '<section class="card card--pad"><h2 class="h-sec" style="margin-bottom:12px">' + U.esc(T('case.keydata')) + '</h2>' +
          '<dl class="keydata">' +
            '<div><dt>' + U.esc(T('case.applied')) + '</dt><dd>40+</dd></div>' +
            '<div><dt>' + U.esc(T('case.interviews')) + '</dt><dd>' + (8 + (c.prep % 7)) + '</dd></div>' +
            '<div><dt>' + U.esc(T('case.offers')) + '</dt><dd>3</dd></div>' +
            '<div><dt>' + U.esc(T('case.cycle')) + '</dt><dd>' + c.prep + ' ' + U.esc(T('c.months')) + '</dd></div>' +
          '</dl>' +
          '<div style="margin-top:14px"><p class="dim" style="font-size:var(--fs-sm);margin-bottom:8px">' + U.esc(T('case.tags')) + '</p>' +
          U.tags(c.skills, 4) + '</div></section>';

      if (mentor) {
        h += '<section class="promo" style="flex-direction:column;text-align:center">' +
          U.avatar(mentor.pose, mentor.tone, 62) +
          '<div><h3>' + U.esc(L(mentor.name)) + '</h3><p>' + U.esc(L(mentor.role)) + '</p></div>' +
          '<a class="btn btn--primary btn--sm btn--block" href="#/mentors/' + mentor.id + '">' +
          U.esc(T('case.askTa')) + U.icon('i-arrow-right', 15) + '</a></section>';
      }

      h += '<section class="card card--pad"><h2 class="h-sec" style="margin-bottom:10px">' + U.esc(T('case.related')) + '</h2>' +
        '<div class="rows">' + related.map(function (r) {
          return '<a class="row-item" style="grid-template-columns:64px minmax(0,1fr);padding:9px 6px;border:0" href="#/cases/' + r.id + '">' +
            ART.thumb(r.art) + '<span><b style="display:block;font-size:var(--fs-md)" class="clamp-2">' + U.esc(L(r.title)) + '</b>' +
            '<span class="dim" style="font-size:var(--fs-sm)">' + U.esc(L(r.author)) + '</span></span></a>';
        }).join('') + '</div></section>';

      return h + '</aside></div>';
    },

    mount: function (root) {
      var links = root.querySelectorAll('.cd-toc a');
      var secs = root.querySelectorAll('.cd-sec');
      if (!('IntersectionObserver' in window) || !secs.length) return;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) {
            if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('data-on', '');
            else a.removeAttribute('data-on');
          });
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      secs.forEach(function (s) { io.observe(s); });
    },

    title: function (params) {
      var c = U.byId(DATA_CASES, params.id);
      return c ? L(c.title) : T('c.notFound');
    }
  };
})();
