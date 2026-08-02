/* ==========================================================
   Page — 资源库（招聘机会 / 指南 / 工具） + 路线图
   ========================================================== */
(function () {
  'use strict';
  window.PAGES = window.PAGES || {};
  var U = UI;

  var state = { tab: 'jobs', city: '', dir: '', pf: '', q: '' };

  function match(j) {
    var q = state.q.trim().toLowerCase();
    if (state.city && j.city !== state.city) return false;
    if (state.dir && j.dir !== state.dir) return false;
    if (state.pf === 'need' && !j.pf) return false;
    if (state.pf === 'optional' && j.pf) return false;
    if (q && (L(j.title) + j.company + L(j.cityLabel)).toLowerCase().indexOf(q) < 0) return false;
    return true;
  }

  function jobRow(j) {
    return '<a class="row-item job-row" href="#/resources">' +
      '<span class="job-logo" style="background:' + U.pastelVar(j.tone) + '">' + U.esc(j.logo) + '</span>' +
      '<span><h3>' + U.esc(L(j.title)) +
        (j.pf ? U.badge(T('res.needPf'), 'warn') : U.badge(T('res.acceptArch'), 'peach')) + '</h3>' +
        '<span class="job-row__co">' + U.esc(j.company) + ' · ' + U.esc(L(j.cityLabel)) + '</span></span>' +
      '<span class="job-req muted" style="font-size:var(--fs-sm)">' +
        j.req.map(function (r) { return U.esc(L(r)); }).join('<br />') + '</span>' +
      '<span class="job-pay mono">' + U.esc(L(j.pay)) + '</span>' +
      U.icon('i-chevron-right', 18) + '</a>';
  }

  function jobs() {
    var list = DATA_JOBS.filter(match);
    if (!list.length) return U.empty('roach-search');
    return '<p class="muted" style="margin-bottom:10px">' + U.esc(T('res.jobCount', { n: list.length })) + '</p>' +
      '<div class="card" style="padding:10px 8px"><div class="table-head job-row">' +
        '<span></span><span>' + U.esc(T('res.colRole')) + '</span>' +
        '<span class="job-req">' + U.esc(T('res.colReq')) + '</span>' +
        '<span class="job-pay">' + U.esc(T('res.colPay')) + '</span><span></span></div>' +
      '<div class="rows">' + list.map(jobRow).join('') + '</div></div>';
  }

  function guides() {
    return '<div class="folder-grid">' + DATA_GUIDES.map(function (g) {
      return U.folder({
        href: '#/resources', tone: g.tone, title: L(g.title), desc: L(g.desc),
        count: (Lang.isZh() ? g.count + ' 篇' : g.count + ' items'), pose: g.pose, more: true
      });
    }).join('') + '</div>';
  }

  function tools() {
    var items = [
      ['i-doc', { zh: 'CV 结构模板', en: 'CV structure template' }, { zh: '按「问题—动作—结果」组织每一条经历', en: 'Problem–action–result for every bullet' }],
      ['i-folder', { zh: '作品集页面清单', en: 'Portfolio page checklist' }, { zh: '端到端案例应该包含的 9 个页面', en: 'The 9 pages an end-to-end case needs' }],
      ['i-clipboard', { zh: '两周行动清单', en: 'Two-week action list' }, { zh: '最小可执行的第一步任务', en: 'The smallest first step you can take' }],
      ['i-chat', { zh: '面试话术卡', en: 'Interview script cards' }, { zh: '解释建筑背景的 6 种说法', en: 'Six ways to explain your background' }]
    ];
    return '<div class="grid-cards">' + items.map(function (it) {
      return '<a class="card card--pad card-hover" href="#/resources">' +
        '<div class="row" style="--gap:10px;margin-bottom:8px">' +
          '<span class="quick__ic">' + U.icon(it[0], 18) + '</span>' +
          '<b>' + U.esc(L(it[1])) + '</b></div>' +
        '<p class="muted" style="font-size:var(--fs-sm)">' + U.esc(L(it[2])) + '</p>' +
        '<span class="link-more" style="margin-top:12px">' + U.esc(T('res.guideCta')) + U.icon('i-arrow-right', 15) + '</span></a>';
    }).join('') + '</div>';
  }

  function panel() {
    if (state.tab === 'guides') return guides();
    if (state.tab === 'tools') return tools();
    return jobs();
  }

  PAGES.resources = {
    render: function () {
      var dirOpts = DATA_DIRECTIONS.map(function (d) { return { v: d.id, label: d.name }; });
      var pfOpts = [{ v: 'need', label: { zh: '需要作品集', en: 'Portfolio required' } },
                    { v: 'optional', label: { zh: '不需要作品集', en: 'No portfolio' } }];

      return '<header class="page-head"><div class="page-head__row"><div>' +
          '<h1 class="h-page">' + U.esc(T('res.title')) + '</h1>' +
          '<p class="page-lede">' + U.esc(T('res.lede')) + '</p></div>' +
          U.roach('roach-folder', 72) + '</div></header>' +

        '<div class="tabs" role="tablist" style="margin-bottom:16px">' +
          [['jobs', T('res.jobs'), DATA_JOBS.length], ['guides', T('res.guides'), DATA_GUIDES.length], ['tools', T('res.tools'), 4]]
            .map(function (t) {
              return '<button class="tab" type="button" role="tab" data-rtab="' + t[0] + '" aria-selected="' +
                (state.tab === t[0]) + '">' + U.esc(t[1]) + '<small>' + t[2] + '</small></button>';
            }).join('') + '</div>' +

        '<div class="chips" id="res-filters" style="margin-bottom:16px' + (state.tab === 'jobs' ? '' : ';display:none') + '">' +
          '<span class="search" style="width:260px;height:38px">' + U.icon('i-search', 16) +
            '<input id="res-q" type="search" placeholder="' + U.esc(T('top.searchPh')) + '" style="height:38px;border-radius:var(--r-pill);padding-right:14px" /></span>' +
          U.chip('city', T('me.city'), JOB_CITIES, state.city) +
          U.chip('dir', T('dir.colName'), dirOpts, state.dir) +
          U.chip('pf', T('c.portfolio'), pfOpts, state.pf) +
          U.resetChip() +
        '</div>' +

        '<div id="res-panel">' + panel() + '</div>';
    },

    mount: function (root) {
      var box = root.querySelector('#res-panel');
      var filters = root.querySelector('#res-filters');
      function refresh() { box.innerHTML = panel(); }

      U.on(root, 'click', '[data-rtab]', function (e, el) {
        state.tab = el.getAttribute('data-rtab');
        root.querySelectorAll('[data-rtab]').forEach(function (t) {
          t.setAttribute('aria-selected', String(t.getAttribute('data-rtab') === state.tab));
        });
        filters.style.display = state.tab === 'jobs' ? '' : 'none';
        refresh();
      });
      U.on(root, 'change', '[data-filter]', function (e, el) {
        state[el.getAttribute('data-filter')] = el.value;
        var chip = el.closest('.chip');
        if (chip) {
          chip.querySelector('span').textContent = el.value ? el.selectedOptions[0].textContent : el.options[0].textContent;
          if (el.value) chip.setAttribute('data-on', ''); else chip.removeAttribute('data-on');
        }
        refresh();
      });
      U.on(root, 'input', '#res-q', function (e, el) { state.q = el.value; refresh(); });
      U.on(root, 'click', '[data-reset]', function () {
        state.city = state.dir = state.pf = state.q = '';
        root.querySelectorAll('.chip').forEach(function (c) {
          var sel = c.querySelector('select'); if (!sel) return;
          sel.value = ''; c.querySelector('span').textContent = sel.options[0].textContent;
          c.removeAttribute('data-on');
        });
        var q = root.querySelector('#res-q'); if (q) q.value = '';
        refresh();
      });
    },

    title: function () { return T('res.title'); },
    desc: function () { return T('res.lede'); }
  };

  /* ---------------- 路线图 ---------------- */
  var STEPS = [
    ['i-search', { zh: '看清自己有什么', en: 'See what you already have' },
      { zh: '从能力迁移词典开始，把建筑经历翻译成职场语言。', en: 'Start from the dictionary and translate your experience.' }, '#/skills'],
    ['i-compass', { zh: '找到可能的方向', en: 'Find possible directions' },
      { zh: '在方向地图里筛选适配度、门槛与准备周期。', en: 'Filter directions by fit, barrier and prep time.' }, '#/directions'],
    ['i-book', { zh: '读三个真实案例', en: 'Read three real stories' },
      { zh: '找到与你起点相近的人，识别可复制的部分。', en: 'Find people with your starting point and copy what transfers.' }, '#/cases'],
    ['i-folder', { zh: '准备材料', en: 'Prepare your materials' },
      { zh: '按指南改写 CV、重构作品集，先做一个真实项目。', en: 'Rewrite the CV, rebuild the portfolio, ship one real project.' }, '#/resources'],
    ['i-users', { zh: '找前辈验证', en: 'Validate with a mentor' },
      { zh: '带着具体问题预约一次咨询，避开可预见的坑。', en: 'Bring concrete questions to one session.' }, '#/mentors'],
    ['i-briefcase', { zh: '投递与复盘', en: 'Apply and review' },
      { zh: '从接受建筑背景的岗位开始，每轮面试后更新材料。', en: 'Start with architecture-friendly roles and iterate after each round.' }, '#/resources']
  ];

  PAGES.roadmap = {
    render: function () {
      return '<header class="page-head"><div class="page-head__row"><div>' +
          '<h1 class="h-page">' + U.esc(T('road.title')) + '</h1>' +
          '<p class="page-lede">' + U.esc(T('road.lede')) + '</p></div>' +
          U.roach('roach-guide', 72) + '</div></header>' +

        '<div class="with-side"><section class="card card--pad">' +
          '<div class="road">' + STEPS.map(function (s, i) {
            return '<div class="road-item"><span class="road-dot">' + U.icon(s[0], 15) + '</span>' +
              '<div><h3>' + (i + 1) + '. ' + U.esc(L(s[1])) + '</h3>' +
              '<p>' + U.esc(L(s[2])) + '</p>' +
              '<a class="link-more" style="margin-top:8px" href="' + s[3] + '">' +
              U.esc(T('c.detail')) + U.icon('i-arrow-right', 15) + '</a></div></div>';
          }).join('') + '</div></section>' +

        '<aside class="side-stack">' +
          '<section class="promo" style="flex-direction:column;text-align:center">' +
            U.roach('roach', 66) +
            '<p class="muted">' + U.esc(T('road.tip')) + '</p></section>' +
          '<section class="card card--pad">' +
            '<h2 class="h-sec" style="margin-bottom:12px">' + U.esc(T('home.hotDirs')) + '</h2>' +
            '<div class="rows">' + DATA_DIRECTIONS.slice(0, 4).map(function (d) {
              return '<a class="row-item" style="grid-template-columns:20px minmax(0,1fr) 18px;padding:9px 6px;border:0" href="#/directions/' + d.id + '">' +
                U.icon(d.icon, 17) + '<span class="truncate">' + U.esc(L(d.name)) + '</span>' +
                U.icon('i-chevron-right', 15) + '</a>';
            }).join('') + '</div></section>' +
        '</aside></div>';
    },
    title: function () { return T('road.title'); },
    desc: function () { return T('road.lede'); }
  };
})();
