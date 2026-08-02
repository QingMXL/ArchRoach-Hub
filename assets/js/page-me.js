/* ==========================================================
   Page — 个人中心（预约 / 资料 / 文件 / 收藏 / 消息 / 设置）
   ========================================================== */
(function () {
  'use strict';
  window.PAGES = window.PAGES || {};
  var U = UI;

  var TABS = ['bookings', 'profile', 'files', 'favorites', 'messages'];
  var profile = { name: '建筑蟑螂', identity: 'work', major: '建筑学', city: 'shanghai', target: 'pm' };
  var bookingFilter = '';

  var STATUS = {
    paid: { label: { zh: '待支付', en: 'To pay' }, tone: 'warn' },
    confirmed: { label: { zh: '已确认', en: 'Confirmed' }, tone: 'mint' },
    finished: { label: { zh: '已完成', en: 'Completed' }, tone: '' }
  };

  /* ---------------- 各面板 ---------------- */
  function panelBookings() {
    var list = DATA_BOOKINGS.filter(function (b) { return !bookingFilter || b.status === bookingFilter; });
    if (!list.length) return U.empty('roach-folder', T('c.emptyT'), T('c.emptyD'));
    return '<div class="card" style="padding:10px 8px"><div class="rows">' + list.map(function (b) {
      var m = U.byId(DATA_MENTORS, b.mentor);
      var st = STATUS[b.status];
      return '<div class="row-item booking-row">' +
        U.avatar(m.pose, m.tone, 40) +
        '<span><span class="booking-row__t">' + U.esc(L(m.name)) + '</span>' +
          '<span class="booking-row__s">' + U.esc(L(b.svc)) + '</span></span>' +
        '<span class="booking-row__when mono muted" style="font-size:var(--fs-sm)">' + U.esc(b.when) + '</span>' +
        '<span>' + U.badge(L(st.label), st.tone) + '</span>' +
        '<span class="row" style="--gap:8px;justify-content:flex-end">' +
          '<span class="booking-row__price price" style="font-size:var(--fs-md)">' + U.money(b.price) + '</span>' +
          (b.status === 'paid'
            ? '<button class="btn btn--primary btn--sm" type="button" data-pay="' + b.id + '">' + U.esc(T('me.pay')) + '</button>'
            : '<a class="btn btn--sm" href="#/mentors/' + m.id + '">' + U.esc(T('me.viewDetail')) + '</a>') +
        '</span></div>';
    }).join('') + '</div></div>';
  }

  function panelProfile() {
    var idOpts = [
      { v: 'student', label: { zh: '在校学生', en: 'Student' } },
      { v: 'grad', label: { zh: '应届毕业生', en: 'New graduate' } },
      { v: 'work', label: { zh: '在职从业者', en: 'Working professional' } },
      { v: 'gap', label: { zh: '待业 / 间隔期', en: 'Between roles' } }
    ];
    function sel(id, opts, val) {
      return '<div class="select-wrap"><select class="input select-native" id="' + id + '">' +
        opts.map(function (o) {
          return '<option value="' + o.v + '"' + (val === o.v ? ' selected' : '') + '>' + U.esc(L(o.label)) + '</option>';
        }).join('') + '</select>' + U.icon('i-chevron-down', 16) + '</div>';
    }
    return '<section class="card card--pad">' +
      '<div class="grid-3" style="gap:16px">' +
        '<div class="field"><label class="field__label" for="pf-name">' + U.esc(T('bk.title2')) + '</label>' +
          '<input class="input" id="pf-name" value="' + U.esc(profile.name) + '" /></div>' +
        '<div class="field"><label class="field__label" for="pf-id">' + U.esc(T('me.identity')) + '</label>' +
          sel('pf-id', idOpts, profile.identity) + '</div>' +
        '<div class="field"><label class="field__label" for="pf-major">' + U.esc(T('me.major')) + '</label>' +
          '<input class="input" id="pf-major" value="' + U.esc(profile.major) + '" /></div>' +
        '<div class="field"><label class="field__label" for="pf-city">' + U.esc(T('me.city')) + '</label>' +
          sel('pf-city', JOB_CITIES, profile.city) + '</div>' +
        '<div class="field"><label class="field__label" for="pf-target">' + U.esc(T('me.target')) + '</label>' +
          sel('pf-target', DATA_DIRECTIONS.map(function (d) { return { v: d.id, label: d.name }; }), profile.target) + '</div>' +
      '</div>' +
      '<button class="btn btn--primary" style="margin-top:18px" type="button" data-save>' + U.esc(T('me.saveProfile')) + '</button>' +
    '</section>';
  }

  function panelFiles() {
    return '<section class="card card--pad">' +
      '<label class="dropzone" style="margin-bottom:16px">' +
        '<input type="file" class="sr-only" id="me-file" />' + U.icon('i-upload', 24) +
        '<span>' + U.esc(T('me.uploadFile')) + '</span>' +
        '<small>' + U.esc(T('me.fileNote')) + '</small></label>' +
      '<div class="rows">' + DATA_FILES.map(function (f) {
        return '<div class="row-item" style="grid-template-columns:36px minmax(0,1fr) 92px 108px 28px">' +
          '<span class="quick__ic" style="width:36px;height:36px">' + U.icon('i-doc', 17) + '</span>' +
          '<span class="truncate">' + U.esc(f.name) + '</span>' +
          '<span class="mono dim" style="font-size:var(--fs-sm)">' + U.esc(f.size) + '</span>' +
          '<span class="mono dim" style="font-size:var(--fs-sm)">' + U.esc(f.date) + '</span>' +
          '<button class="fav" type="button" aria-label="delete">' + U.icon('i-x', 15) + '</button></div>';
      }).join('') + '</div></section>';
  }

  function panelFavorites() {
    var ids = U.Favs.all();
    var items = [];
    ids.forEach(function (id) {
      var parts = id.split(':');
      if (parts[0] === 'dir') {
        var d = U.byId(DATA_DIRECTIONS, parts[1]);
        if (d) items.push({ href: '#/directions/' + d.id, icon: d.icon, tone: U.dirTone(d), title: L(d.name), sub: L(d.desc), kind: T('nav.directions') });
      } else if (parts[0] === 'case') {
        var c = U.byId(DATA_CASES, parts[1]);
        if (c) items.push({ href: '#/cases/' + c.id, icon: 'i-book', tone: 'blue', title: L(c.title), sub: L(c.excerpt), kind: T('nav.cases') });
      } else if (parts[0] === 'mentor') {
        var m = U.byId(DATA_MENTORS, parts[1]);
        if (m) items.push({ href: '#/mentors/' + m.id, icon: 'i-users', tone: m.tone, title: L(m.name), sub: L(m.role), kind: T('nav.mentors') });
      }
    });
    if (!items.length) {
      return U.empty('roach-folder', T('me.noFav'), T('me.noFavD'),
        '<a class="btn btn--primary btn--sm" style="margin-top:8px" href="#/directions">' + U.esc(T('dir.title')) + '</a>');
    }
    return '<div class="card" style="padding:10px 8px"><div class="rows">' + items.map(function (it) {
      return '<a class="row-item" style="grid-template-columns:38px minmax(0,1fr) 92px 24px" href="' + it.href + '">' +
        '<span class="fold-icon" style="--fold:' + U.pastelVar(it.tone) + '">' + U.icon(it.icon, 15) + '</span>' +
        '<span><b style="display:block">' + U.esc(it.title) + '</b>' +
        '<span class="dim clamp-2" style="font-size:var(--fs-sm)">' + U.esc(it.sub) + '</span></span>' +
        U.badge(it.kind) + U.icon('i-chevron-right', 18) + '</a>';
    }).join('') + '</div></div>';
  }

  function panelMessages() {
    return '<div class="card" style="padding:10px 8px"><div class="rows">' + DATA_MESSAGES.map(function (msg) {
      var m = U.byId(DATA_MENTORS, msg.mentor);
      return '<a class="row-item" style="grid-template-columns:44px minmax(0,1fr) 130px 24px" href="#/mentors/' + m.id + '">' +
        U.avatar(m.pose, m.tone, 44) +
        '<span><span class="row" style="--gap:6px"><b>' + U.esc(L(m.name)) + '</b>' +
          (msg.unread ? '<span class="badge badge--brand">NEW</span>' : '') + '</span>' +
          '<span class="dim clamp-2" style="font-size:var(--fs-sm)">' + U.esc(L(msg.text)) + '</span></span>' +
        '<span class="mono dim" style="font-size:var(--fs-sm)">' + U.esc(msg.time) + '</span>' +
        U.icon('i-chevron-right', 18) + '</a>';
    }).join('') + '</div></div>';
  }

  var PANELS = {
    bookings: panelBookings, profile: panelProfile, files: panelFiles,
    favorites: panelFavorites, messages: panelMessages
  };

  /* ---------------- 页面 ---------------- */
  PAGES.me = {
    render: function (params) {
      var tab = TABS.indexOf(params.tab) >= 0 ? params.tab : 'bookings';

      var h = '<header class="me-hero" style="margin-bottom:20px">' +
        U.avatar('roach-cap', 'peach', 76) +
        '<div class="grow">' +
          '<div class="me-hero__name">' + U.esc(profile.name) + U.icon('i-verified', 17) + '</div>' +
          '<p class="me-hero__meta">' + U.esc(Lang.isZh() ? '建筑背景 · 正在转行中' : 'Architecture background · in transition') + '</p>' +
          '<p class="dim mono" style="font-size:var(--fs-sm)">roach.arch@email.com</p>' +
        '</div>' +
        '<div class="me-hero__stats">' +
          '<div><b>' + DATA_BOOKINGS.length + '</b><span>' + U.esc(T('me.statBookings')) + '</span></div>' +
          '<div><b>' + U.Favs.count() + '</b><span>' + U.esc(T('me.statFavorites')) + '</span></div>' +
          '<div><b>5</b><span>' + U.esc(T('me.statDirs')) + '</span></div>' +
          '<div><b>' + DATA_FILES.length + '</b><span>' + U.esc(T('me.statFiles')) + '</span></div>' +
        '</div>' +
        '<a class="btn btn--sm" href="#/me/profile">' + U.esc(T('me.editProfile')) + '</a>' +
      '</header>';

      h += '<div class="tabs" role="tablist" style="margin-bottom:16px">' + TABS.map(function (k) {
        var label = T('me.tab' + k.charAt(0).toUpperCase() + k.slice(1));
        var n = k === 'bookings' ? DATA_BOOKINGS.length
              : k === 'files' ? DATA_FILES.length
              : k === 'favorites' ? U.Favs.count()
              : k === 'messages' ? DATA_MESSAGES.length : null;
        return '<a class="tab" role="tab" href="#/me/' + k + '" aria-selected="' + (k === tab) + '">' +
          U.esc(label) + (n != null ? '<small>' + n + '</small>' : '') + '</a>';
      }).join('') + '</div>';

      if (tab === 'bookings') {
        h += '<div class="chips" style="margin-bottom:14px">' +
          U.chip('status', T('me.filterAll'),
            [{ v: 'paid', label: STATUS.paid.label }, { v: 'confirmed', label: STATUS.confirmed.label }],
            bookingFilter) + '</div>';
      }

      return h + '<div id="me-panel">' + PANELS[tab]() + '</div>';
    },

    mount: function (root, params) {
      var tab = TABS.indexOf(params.tab) >= 0 ? params.tab : 'bookings';
      var box = root.querySelector('#me-panel');

      U.on(root, 'change', '[data-filter]', function (e, el) {
        bookingFilter = el.value;
        var chip = el.closest('.chip');
        if (chip) {
          chip.querySelector('span').textContent = el.value ? el.selectedOptions[0].textContent : el.options[0].textContent;
          if (el.value) chip.setAttribute('data-on', ''); else chip.removeAttribute('data-on');
        }
        box.innerHTML = PANELS.bookings();
      });

      U.on(root, 'click', '[data-pay]', function () { U.toast(T('bk.done')); });

      U.on(root, 'click', '[data-save]', function () {
        profile.name = root.querySelector('#pf-name').value || profile.name;
        profile.identity = root.querySelector('#pf-id').value;
        profile.major = root.querySelector('#pf-major').value;
        profile.city = root.querySelector('#pf-city').value;
        profile.target = root.querySelector('#pf-target').value;
        U.toast(T('me.savedProfile'));
      });

      U.on(root, 'change', '#me-file', function (e, el) {
        var f = el.files && el.files[0];
        if (f) U.toast(T('bk.uploaded', { n: f.name }));
      });

      if (tab === 'favorites') {
        U.on(root, 'click', '.row-item .badge', function () { /* 占位：分类跳转 */ });
      }
    },

    title: function (params) {
      var tab = TABS.indexOf(params.tab) >= 0 ? params.tab : 'bookings';
      return T('me.tab' + tab.charAt(0).toUpperCase() + tab.slice(1)) + ' · ' + T('me.title');
    }
  };

  /* ---------------- 设置 ---------------- */
  PAGES.settings = {
    render: function () {
      var rows = [
        ['i-message', { zh: '消息通知', en: 'Notifications' }, { zh: '预约提醒、前辈回复与内容更新', en: 'Reminders, replies and content updates' }],
        ['i-shield', { zh: '隐私设置', en: 'Privacy' }, { zh: '公开信息范围与附件保留时长', en: 'What is public and how long files are kept' }],
        ['i-file', { zh: '数据导出', en: 'Export data' }, { zh: '导出你的收藏、预约与上传文件清单', en: 'Export saved items, bookings and files' }],
        ['i-x', { zh: '注销账号', en: 'Delete account' }, { zh: '注销后公开内容将匿名保留或按申请删除', en: 'Public content is anonymised or removed on request' }]
      ];
      return '<header class="page-head"><h1 class="h-page">' + U.esc(T('nav.settings')) + '</h1></header>' +
        '<section class="card" style="padding:10px 8px"><div class="rows">' + rows.map(function (r) {
          return '<button class="row-item" type="button" style="grid-template-columns:38px minmax(0,1fr) 24px;text-align:start;width:100%">' +
            '<span class="quick__ic" style="width:38px;height:38px">' + U.icon(r[0], 17) + '</span>' +
            '<span><b style="display:block">' + U.esc(L(r[1])) + '</b>' +
            '<span class="dim" style="font-size:var(--fs-sm)">' + U.esc(L(r[2])) + '</span></span>' +
            U.icon('i-chevron-right', 18) + '</button>';
        }).join('') + '</div></section>' +
        '<section class="promo" style="margin-top:20px">' + U.roach('roach', 62) +
          '<div class="grow"><h3>' + U.esc(T('side.helpT')) + '</h3>' +
          '<p>' + U.esc(T('side.helpD')) + '</p></div>' +
          '<a class="btn btn--primary btn--sm" href="#/mentors">' + U.esc(T('side.helpCta')) + '</a></section>';
    },
    title: function () { return T('nav.settings'); }
  };

  /* ---------------- 404 ---------------- */
  PAGES.notFound = {
    render: function () {
      return '<div class="empty" style="padding-block:80px">' + U.roach('roach-search', 130) +
        '<h3>' + U.esc(T('c.notFound')) + '</h3><p>' + U.esc(T('c.notFoundD')) + '</p>' +
        '<a class="btn btn--primary" style="margin-top:10px" href="#/">' + U.esc(T('c.backHome')) + '</a></div>';
    },
    title: function () { return T('c.notFound'); }
  };
})();
