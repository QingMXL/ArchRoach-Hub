/* ==========================================================
   Page — 转行方向（列表 + 详情）
   ========================================================== */
(function () {
  'use strict';
  window.PAGES = window.PAGES || {};
  var U = UI;

  var state = { industry: '', portfolio: '', diff: '', years: '', q: '' };

  /* ---------------- 列表 ---------------- */
  function match(d) {
    var q = state.q.trim().toLowerCase();
    if (state.industry && d.cat !== state.industry) return false;
    if (state.portfolio && d.pf !== state.portfolio) return false;
    if (state.diff && d.diff !== state.diff) return false;
    if (state.years && d.years.indexOf(state.years) < 0) return false;
    if (q && (L(d.name) + L(d.desc) + d.id).toLowerCase().indexOf(q) < 0) return false;
    return true;
  }

  function fitLabel(d) { return L(d.fit); }

  function row(d) {
    var pf = U.pf(d.pf);
    return '<a class="row-item dir-row" href="#/directions/' + d.id + '">' +
      '<span class="dir-row__name">' +
        '<span class="fold-icon" style="--fold:' + U.pastelVar(U.dirTone(d)) + '">' + U.icon(d.icon, 16) + '</span>' +
        '<span class="grow"><b>' + U.esc(L(d.name)) + '</b><span>' + U.esc(L(d.desc)) + '</span></span>' +
      '</span>' +
      '<span>' + U.badge(fitLabel(d), d.fitStars >= 4 ? 'mint' : 'blue') + '</span>' +
      '<span>' + U.badge(pf.label, pf.tone) + '</span>' +
      '<span class="dir-num">' + U.esc(L(d.prep)) + '</span>' +
      '<span class="dir-num">' + d.caseCount + '</span>' +
      '<span class="dir-num dir-num--mentor">' + d.mentorCount + '</span>' +
      U.icon('i-chevron-right', 18) +
    '</a>';
  }

  function results() {
    var list = DATA_DIRECTIONS.filter(match);
    if (!list.length) return U.empty('roach-search');
    return '<div class="card dir-table" style="padding:14px 8px">' +
      '<div class="table-head">' +
        '<span>' + U.esc(T('dir.colName')) + '</span><span>' + U.esc(T('dir.colFit')) + '</span>' +
        '<span>' + U.esc(T('dir.colPortfolio')) + '</span><span>' + U.esc(T('dir.colPrep')) + '</span>' +
        '<span>' + U.esc(T('dir.colCases')) + '</span><span>' + U.esc(T('dir.colMentors')) + '</span><span></span>' +
      '</div><div class="rows">' + list.map(row).join('') + '</div></div>';
  }

  function sidebar() {
    var hot = DATA_DIRECTIONS.slice().sort(function (a, b) { return b.hot - a.hot; }).slice(0, 5);
    var h = '<section class="card card--pad">' +
      '<div class="spread" style="margin-bottom:12px"><h2 class="h-sec">' + U.esc(T('dir.hot')) + '</h2>' +
      U.linkMore('#/directions', T('c.more')) + '</div><div class="rows">';
    hot.forEach(function (d, i) {
      h += '<a class="row-item" style="grid-template-columns:22px 22px minmax(0,1fr) auto;padding:9px 8px;border:0" href="#/directions/' + d.id + '">' +
        '<span class="badge' + (i < 3 ? ' badge--brand' : '') + '" style="justify-content:center;padding-inline:0;min-width:20px">' + (i + 1) + '</span>' +
        U.icon(d.icon, 17) +
        '<span class="truncate">' + U.esc(L(d.name)) + '</span>' +
        '<span class="row" style="--gap:3px;font-family:var(--f-mono);font-size:var(--fs-sm);color:var(--roach-500)">' +
        U.icon('i-flame', 13) + d.hot + 'k</span></a>';
    });
    h += '</div></section>';

    h += '<section class="card card--pad">' +
      '<div class="spread" style="margin-bottom:12px"><h2 class="h-sec">' + U.esc(T('dir.new')) + '</h2></div><div class="rows">';
    DATA_DIRECTIONS_NEW.forEach(function (n) {
      h += '<a class="row-item" style="grid-template-columns:20px minmax(0,1fr) auto;padding:9px 8px;border:0" href="#/directions/' + n.id + '">' +
        U.icon('i-cube', 17) + '<span class="truncate">' + U.esc(L(n.name)) + '</span>' +
        '<span class="badge badge--mint">NEW</span></a>';
    });
    h += '</div></section>';

    h += '<section class="promo" style="flex-direction:column;text-align:center">' +
      U.roach('roach-guide', 72) +
      '<div><h3>' + U.esc(T('dir.calloutT')) + '</h3><p>' + U.esc(T('dir.calloutD')) + '</p></div>' +
      '<a class="btn btn--primary btn--sm btn--block" href="#/skills">' + U.esc(T('dir.calloutCta')) + '</a></section>';
    return h;
  }

  PAGES.directions = {
    render: function () {
      var F = DIR_FILTERS;
      var list = DATA_DIRECTIONS.filter(match);
      return '<header class="page-head"><div class="page-head__row"><div>' +
          '<h1 class="h-page">' + U.esc(T('dir.title')) + '</h1>' +
          '<p class="page-lede">' + U.esc(T('dir.lede')) + '</p>' +
        '</div>' + U.roach('roach-search', 72) + '</div></header>' +

        '<div class="chips" style="margin-bottom:18px">' +
          U.chip('industry', T('dir.colName'), F.industry, state.industry) +
          U.chip('portfolio', T('dir.colPortfolio'), F.portfolio, state.portfolio) +
          U.chip('diff', T('c.fit'), F.difficulty, state.diff) +
          U.chip('years', T('c.exp'), F.years, state.years) +
          U.resetChip() +
        '</div>' +

        '<div class="with-side"><div>' +
          '<p class="muted" style="margin-bottom:10px" id="dir-count">' + U.esc(T('dir.count', { n: list.length })) + '</p>' +
          '<div id="dir-results">' + results() + '</div>' +
        '</div><aside class="side-stack">' + sidebar() + '</aside></div>';
    },

    mount: function (root) {
      var out = root.querySelector('#dir-results');
      var count = root.querySelector('#dir-count');
      function refresh() {
        out.innerHTML = results();
        count.textContent = T('dir.count', { n: DATA_DIRECTIONS.filter(match).length });
      }
      U.on(root, 'change', '[data-filter]', function (e, el) {
        state[el.getAttribute('data-filter')] = el.value;
        var chip = el.closest('.chip');
        if (chip) {
          chip.querySelector('span').textContent = el.value ? el.selectedOptions[0].textContent : el.options[0].textContent;
          if (el.value) chip.setAttribute('data-on', ''); else chip.removeAttribute('data-on');
        }
        refresh();
      });
      U.on(root, 'click', '[data-reset]', function () {
        Object.keys(state).forEach(function (k) { state[k] = ''; });
        root.querySelectorAll('.chip').forEach(function (c) {
          var sel = c.querySelector('select');
          sel.value = '';
          c.querySelector('span').textContent = sel.options[0].textContent;
          c.removeAttribute('data-on');
        });
        refresh();
      });
    },

    title: function () { return T('dir.title'); },
    desc: function () { return T('dir.lede'); }
  };

  /* ---------------- 详情 ---------------- */
  var TABS = ['overview', 'skills', 'prep', 'cases', 'mentors', 'jobs'];
  var tab = 'overview';

  function panelOverview(d) {
    return '<div class="grid-3">' +
      '<section class="card panel"><h2>' + U.esc(T('dd.whatT')) + '</h2>' +
        '<p class="muted">' + U.esc(L(d.lede)) + '</p>' +
        '<div class="tag-row" style="margin-top:14px">' +
          '<span class="tag">' + U.esc(L(d.entry).split('\n')[0]) + '</span>' +
          '<span class="tag">' + U.esc(L(d.entry).split('\n')[1] || '') + '</span>' +
        '</div></section>' +
      '<section class="card panel"><h2>' + U.esc(T('dd.advT')) + '</h2><ul class="bullets">' +
        d.xfer.map(function (x) { return '<li>' + U.icon('i-check', 14) + '<span>' + U.esc(L(x[1])) + '</span></li>'; }).join('') +
      '</ul></section>' +
      '<section class="card panel"><h2>' + U.esc(T('dd.entryT')) + '</h2><ol class="num-list">' +
        d.pfList.slice(0, 3).map(function (t, i) { return '<li><b>' + (i + 1) + '</b><span>' + U.esc(L(t)) + '</span></li>'; }).join('') +
      '</ol><a class="link-more" style="margin-top:12px" href="#" data-tab="prep">' + U.esc(T('dd.fullGuide')) + U.icon('i-arrow-right', 15) + '</a></section>' +
      '</div>' +

      '<section class="card panel" style="margin-top:20px"><h2>' + U.esc(T('dd.gapT')) + '</h2>' +
        '<div class="skill-icons">' + d.gap.tags.map(function (t, i) {
          var ics = ['i-search', 'i-frame', 'i-chat', 'i-layers', 'i-cube', 'i-sliders'];
          return '<span class="skill-icon">' + U.icon(ics[i % ics.length], 20) + U.esc(L(t)) + '</span>';
        }).join('') + '</div></section>';
  }

  function panelSkills(d) {
    return '<section class="card panel"><h2>' + U.esc(T('dd.xferT')) + '</h2><div class="xfer-list">' +
      d.xfer.map(function (x) {
        return '<div class="xfer"><span>' + U.esc(L(x[0])) + '</span>' + U.icon('i-arrow-right', 16) +
          '<span>' + U.esc(L(x[1])) + '</span></div>';
      }).join('') + '</div></section>' +
      '<section class="card panel" style="margin-top:20px"><h2>' + U.esc(T('dd.gapT')) + '</h2><ul class="bullets">' +
      d.gap.list.map(function (t) { return '<li>' + U.icon('i-check', 14) + '<span>' + U.esc(L(t)) + '</span></li>'; }).join('') +
      '</ul></section>';
  }

  function panelPrep(d) {
    return '<div class="grid-3">' +
      '<section class="card panel"><h2>' + U.esc(T('dd.pfT')) + '</h2><ul class="bullets">' +
        d.pfList.map(function (t) { return '<li>' + U.icon('i-check', 14) + '<span>' + U.esc(L(t)) + '</span></li>'; }).join('') +
        '</ul><div class="tag-row" style="margin-top:14px">' + d.flow.map(function (f) {
          return '<span class="tag">' + U.esc(L(f)) + '</span>';
        }).join('') + '</div></section>' +
      '<section class="card panel"><h2>' + U.esc(T('dd.cvT')) + '</h2><ul class="bullets">' +
        d.cvList.map(function (t) { return '<li>' + U.icon('i-check', 14) + '<span>' + U.esc(L(t)) + '</span></li>'; }).join('') +
        '</ul><div class="card card--soft" style="margin-top:14px;padding:12px">' +
        '<p class="dim" style="font-size:var(--fs-sm)">Before</p><p class="muted" style="font-size:var(--fs-sm)">' + U.esc(L(d.cvBefore)) + '</p>' +
        '<p style="margin-top:10px;font-size:var(--fs-sm);color:var(--roach-600)">After</p><p style="font-size:var(--fs-sm)">' + U.esc(L(d.cvAfter)) + '</p>' +
        '</div></section>' +
      '<section class="card panel"><h2>' + U.esc(T('dd.interviewT')) + '</h2><ol class="num-list">' +
        d.interview.map(function (t, i) { return '<li><b>' + (i + 1) + '</b><span>' + U.esc(L(t)) + '</span></li>'; }).join('') +
      '</ol></section></div>';
  }

  function panelCases(d) {
    var list = d.cases.map(function (id) { return U.byId(DATA_CASES, id); }).filter(Boolean);
    if (!list.length) return U.empty('roach-folder', T('c.emptyT'), T('c.emptyD'));
    return '<div class="card" style="padding:10px 8px"><div class="rows">' + list.map(function (c) {
      return '<a class="row-item case-row" href="#/cases/' + c.id + '">' + ART.thumb(c.art) +
        '<span><h3 class="clamp-2">' + U.esc(L(c.title)) + '</h3>' +
        '<p class="clamp-2">' + U.esc(L(c.excerpt)) + '</p>' +
        '<span class="meta" style="margin-top:6px"><span>' + U.avatar(c.pose, c.tone, 18) + U.esc(L(c.author)) + '</span>' +
        '<span>' + U.icon('i-clock', 13) + c.prep + ' ' + U.esc(T('c.months')) + '</span></span></span>' +
        '<span class="case-row__meta">' + U.badge(L(c.tag), 'peach') + '</span>' +
        U.icon('i-chevron-right', 18) + '</a>';
    }).join('') + '</div></div>';
  }

  function panelMentors(d) {
    var list = DATA_MENTORS.filter(function (m) { return m.dir === d.id; });
    if (!list.length) list = DATA_MENTORS.slice(0, 3);
    return '<div class="grid-cards">' + list.map(function (m) {
      return '<article class="card card--pad mentor-card">' +
        '<div class="mentor-card__hd">' + U.avatar(m.pose, m.tone, 48) +
        '<div class="grow"><div class="mentor-card__n">' + U.esc(L(m.name)) +
        (m.verified ? U.icon('i-verified', 15) : '') + '</div>' +
        '<div class="mentor-card__r">' + U.esc(L(m.role)) + '</div></div></div>' +
        U.tags(m.help, 3) +
        '<div class="mentor-card__foot"><span class="price">' + U.money(m.price) +
        '<small>' + U.esc(T('mentor.perMin')) + '</small></span>' +
        '<a class="btn btn--primary btn--sm" href="#/mentors/' + m.id + '">' + U.esc(T('c.book')) + '</a></div></article>';
    }).join('') + '</div>';
  }

  function panelJobs(d) {
    var list = d.jobs.map(function (id) { return U.byId(DATA_JOBS, id); }).filter(Boolean);
    if (!list.length) return U.empty('roach-folder', T('c.emptyT'), T('c.emptyD'));
    return '<div class="card" style="padding:10px 8px"><div class="rows">' + list.map(function (j) {
      return '<a class="row-item job-row" href="#/resources">' +
        '<span class="job-logo" style="background:' + U.pastelVar(j.tone) + '">' + U.esc(j.logo) + '</span>' +
        '<span><h3>' + U.esc(L(j.title)) + (j.arch ? U.badge(T('res.acceptArch'), 'peach') : '') + '</h3>' +
        '<span class="job-row__co">' + U.esc(j.company) + ' · ' + U.esc(L(j.cityLabel)) + '</span></span>' +
        '<span class="job-req muted" style="font-size:var(--fs-sm)">' + U.esc(L(j.req[0])) + '</span>' +
        '<span class="job-pay mono">' + U.esc(L(j.pay)) + '</span>' + U.icon('i-chevron-right', 18) + '</a>';
    }).join('') + '</div></div>';
  }

  var PANELS = {
    overview: panelOverview, skills: panelSkills, prep: panelPrep,
    cases: panelCases, mentors: panelMentors, jobs: panelJobs
  };

  PAGES.directionDetail = {
    render: function (params) {
      var d = U.byId(DATA_DIRECTIONS, params.id);
      if (!d) return null;
      tab = 'overview';
      var favId = 'dir:' + d.id;

      var counts = { cases: d.caseCount, mentors: d.mentorCount };

      return U.crumbs([{ label: T('nav.home'), href: '#/' },
                       { label: T('dir.title'), href: '#/directions' }, { label: L(d.name) }]) +

        '<header class="page-head"><div class="dd-hero">' +
          '<div><h1>' + U.esc(L(d.name)) +
            U.badge(T('c.fit') + ' · ' + (d.fitStars >= 4 ? T('c.high') : T('c.mid')), 'mint') + '</h1>' +
            '<p>' + U.esc(L(d.desc)) + '</p></div>' +
          '<div class="row" style="--gap:10px">' +
            '<button class="btn btn--sm" type="button" data-fav="' + favId + '" aria-pressed="' + U.Favs.has(favId) + '">' +
              U.icon(U.Favs.has(favId) ? 'i-star' : 'i-star-o', 15) + '<span>' + U.esc(T('c.save')) + '</span></button>' +
            '<a class="btn btn--primary btn--sm" href="#/mentors">' + U.esc(T('c.book')) + '</a>' +
          '</div></div></header>' +

        '<div class="card card--pad" style="margin-bottom:20px"><div class="fact-grid">' +
          '<div class="fact"><dt>' + U.esc(T('c.fit')) + '</dt><dd>' + U.esc(L(d.fit)) + ' ' + U.stars(d.fitStars) + '</dd></div>' +
          '<div class="fact"><dt>' + U.esc(T('c.prep')) + '</dt><dd>' + U.esc(L(d.prep)) + '</dd></div>' +
          '<div class="fact"><dt>' + U.esc(T('c.portfolio')) + '</dt><dd>' + U.esc(L(d.pfNote)) + '</dd></div>' +
          '<div class="fact"><dt>' + U.esc(T('dir.colCases')) + '</dt><dd>' + counts.cases + '</dd></div>' +
          '<div class="fact"><dt>' + U.esc(T('dir.colMentors')) + '</dt><dd>' + counts.mentors + '</dd></div>' +
        '</div></div>' +

        '<div class="tabs" role="tablist">' + TABS.map(function (k) {
          var label = T('dd.tab' + k.charAt(0).toUpperCase() + k.slice(1));
          var n = k === 'cases' ? d.caseCount : (k === 'mentors' ? d.mentorCount : null);
          return '<button class="tab" type="button" role="tab" data-tab="' + k + '"' +
            ' aria-selected="' + (k === tab) + '">' + U.esc(label) +
            (n != null ? '<small>' + n + '</small>' : '') + '</button>';
        }).join('') + '</div>' +

        '<div id="dd-panel" style="margin-top:20px">' + PANELS[tab](d) + '</div>';
    },

    mount: function (root, params) {
      var d = U.byId(DATA_DIRECTIONS, params.id);
      var panel = root.querySelector('#dd-panel');

      U.on(root, 'click', '[data-tab]', function (e, el) {
        e.preventDefault();
        tab = el.getAttribute('data-tab');
        root.querySelectorAll('.tab').forEach(function (t) {
          t.setAttribute('aria-selected', String(t.getAttribute('data-tab') === tab));
        });
        panel.innerHTML = PANELS[tab](d);
        panel.classList.remove('view-enter');
        void panel.offsetWidth;
        panel.classList.add('view-enter');
      });

      U.on(root, 'click', '[data-fav]', function (e, el) {
        var on = U.Favs.toggle(el.getAttribute('data-fav'));
        el.setAttribute('aria-pressed', String(on));
        el.querySelector('svg').outerHTML = U.icon(on ? 'i-star' : 'i-star-o', 15);
        U.toast(T(on ? 'c.saved' : 'c.save'));
      });
    },

    title: function (params) {
      var d = U.byId(DATA_DIRECTIONS, params.id);
      return d ? L(d.name) : T('c.notFound');
    },
    desc: function (params) {
      var d = U.byId(DATA_DIRECTIONS, params.id);
      return d ? L(d.name) + '：' + L(d.desc) + ' ' + L(d.lede) : '';
    }
  };
})();
