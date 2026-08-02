/* ==========================================================
   Page — 预约咨询（四步下单）
   ========================================================== */
(function () {
  'use strict';
  window.PAGES = window.PAGES || {};
  var U = UI;

  var SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '19:00', '20:00'];
  var DOW_ZH = ['一', '二', '三', '四', '五', '六', '日'];
  var DOW_EN = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  var MON_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var s = null;

  function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function sameDay(a, b) { return a && b && a.toDateString() === b.toDateString(); }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function dowIndex(d) { return (d.getDay() + 6) % 7; }
  function bookable(d) { return d >= startOfDay(new Date()) && d.getDay() !== 0; }
  function slotOpen(d, i) { return d ? ((d.getDate() * 7 + i * 3) % 11) > 2 : false; }

  function fmtDate(d) {
    if (!d) return '—';
    return Lang.isZh()
      ? d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + '（周' + DOW_ZH[dowIndex(d)] + '）'
      : d.getDate() + ' ' + MON_EN[d.getMonth()] + ' ' + d.getFullYear();
  }
  function fmtDayHead(d) {
    if (!d) return '';
    return Lang.isZh()
      ? (d.getMonth() + 1) + ' 月 ' + d.getDate() + ' 日 星期' + DOW_ZH[dowIndex(d)]
      : DOW_EN[dowIndex(d)] + ', ' + d.getDate() + ' ' + MON_EN[d.getMonth()];
  }
  function svc() { return U.byId(MENTOR_SERVICES, s.svc) || MENTOR_SERVICES[0]; }

  /* ---------------- 片段 ---------------- */
  function stepsBar() {
    var labels = [T('bk.s1'), T('bk.s2'), T('bk.s3'), T('bk.s4')];
    return '<div class="steps">' + labels.map(function (l, i) {
      var n = i + 1;
      return (i ? '<span class="steps__sep"></span>' : '') +
        '<span class="step"' + (n === s.step ? ' data-on' : (n < s.step ? ' data-done' : '')) + '>' +
        '<b>' + (n < s.step ? '✓' : n) + '</b>' + U.esc(l) + '</span>';
    }).join('') + '</div>';
  }

  function calendar() {
    var y = s.view.getFullYear(), m = s.view.getMonth();
    var lead = dowIndex(new Date(y, m, 1));
    var head = Lang.isZh() ? y + ' 年 ' + (m + 1) + ' 月' : MON_EN[m] + ' ' + y;
    var dows = Lang.isZh() ? DOW_ZH : DOW_EN;

    var h = '<div class="cal"><div class="cal__hd">' +
      '<button class="cal__nav" type="button" data-mon="-1" aria-label="prev">' + U.icon('i-chevron-left', 15) + '</button>' +
      '<b>' + U.esc(head) + '</b>' +
      '<button class="cal__nav" type="button" data-mon="1" aria-label="next">' + U.icon('i-chevron-right', 15) + '</button>' +
      '</div><div class="cal__grid">';
    dows.forEach(function (d) { h += '<span class="cal__dow">' + d + '</span>'; });
    for (var i = 0; i < 42; i++) {
      var day = new Date(y, m, 1 - lead + i);
      var out = day.getMonth() !== m;
      var ok = bookable(day) && !out;
      h += '<button class="cal__day" type="button" data-day="' + day.getFullYear() + '-' + pad(day.getMonth() + 1) + '-' + pad(day.getDate()) + '"' +
        (out ? ' data-out' : '') + (ok ? '' : ' disabled') +
        ' aria-pressed="' + sameDay(day, s.date) + '">' + day.getDate() + '</button>';
      if (i >= 34 && new Date(y, m, 1 - lead + i + 1).getMonth() !== m) break;
    }
    return h + '</div></div>';
  }

  function slots() {
    return '<div><p class="h-sec" style="margin-bottom:10px">' + U.esc(fmtDayHead(s.date)) + '</p>' +
      '<div class="slot-grid">' + SLOTS.map(function (t, i) {
        var open = slotOpen(s.date, i);
        return '<button class="slot" type="button" data-slot="' + t + '"' + (open ? '' : ' disabled') +
          ' aria-pressed="' + (s.slot === t) + '">' + t + '</button>';
      }).join('') + '</div>' +
      '<p class="dim" style="margin-top:10px;font-size:var(--fs-sm)">' + U.esc(T('bk.tz')) + '</p></div>';
  }

  function stepService(m) {
    return '<section class="card card--pad">' +
        '<h2 class="h-sec" style="margin-bottom:12px">' + U.esc(T('bk.s1')) + '</h2>' +
        '<div class="svc-list">' + MENTOR_SERVICES.map(function (v) {
          return '<button class="svc" type="button" role="radio" data-svc="' + v.id + '" aria-checked="' + (s.svc === v.id) + '">' +
            '<span class="svc__check">' + U.icon('i-check-circle', 18) + '</span>' + U.icon(v.icon, 22) +
            '<span class="grow"><span class="svc__t">' + U.esc(L(v.name)) + '</span>' +
            '<span class="svc__d">' + U.esc(L(v.desc)) + '</span></span>' +
            '<span class="svc__p">' + U.money(v.price) + '</span></button>';
        }).join('') + '</div></section>' +

      '<section class="card card--pad" style="margin-top:16px">' +
        '<h2 class="h-sec" style="margin-bottom:12px">' + U.esc(T('bk.pickTime')) + '</h2>' +
        '<div class="when"><div id="cal-box">' + calendar() + '</div><div id="slot-box">' + slots() + '</div></div>' +
      '</section>';
  }

  function stepForm() {
    var yearOpts = [
      { v: '0-1', label: { zh: '1 年以内', en: 'Under 1 yr' } },
      { v: '1-3', label: { zh: '1 – 3 年', en: '1 – 3 yrs' } },
      { v: '3-5', label: { zh: '3 – 5 年', en: '3 – 5 yrs' } },
      { v: '5+', label: { zh: '5 年以上', en: '5+ yrs' } }
    ];
    return '<section class="card card--pad">' +
      '<h2 class="h-sec" style="margin-bottom:16px">' + U.esc(T('bk.formT')) + '</h2>' +
      '<div class="stack" style="--gap:16px">' +
        '<div class="grid-3" style="gap:16px">' +
          '<div class="field"><label class="field__label" for="bk-name">' + U.esc(T('bk.title2')) +
            '<span class="req">*</span></label>' +
            '<input class="input" id="bk-name" type="text" value="' + U.esc(s.form.name) + '" placeholder="' + U.esc(T('bk.title2')) + '" /></div>' +
          '<div class="field"><span class="field__label">' + U.esc(T('bk.gender')) + '</span>' +
            '<div class="radio-row">' + ['male', 'female', 'other'].map(function (g) {
              return '<button class="radio-pill" type="button" data-gender="' + g + '" aria-pressed="' +
                (s.form.gender === g) + '">' + U.esc(T('bk.' + g)) + '</button>';
            }).join('') + '</div></div>' +
          '<div class="field"><label class="field__label" for="bk-years">' + U.esc(T('bk.years')) + '</label>' +
            '<div class="select-wrap"><select class="input select-native" id="bk-years">' +
              '<option value="">' + U.esc(T('bk.yearsPh')) + '</option>' +
              yearOpts.map(function (o) {
                return '<option value="' + o.v + '"' + (s.form.years === o.v ? ' selected' : '') + '>' + U.esc(L(o.label)) + '</option>';
              }).join('') + '</select>' + U.icon('i-chevron-down', 16) + '</div></div>' +
        '</div>' +

        '<div class="field"><label class="field__label" for="bk-role">' + U.esc(T('bk.role')) + '</label>' +
          '<input class="input" id="bk-role" type="text" value="' + U.esc(s.form.role) + '" placeholder="' + U.esc(T('bk.rolePh')) + '" /></div>' +

        '<div class="field"><label class="field__label" for="bk-q">' + U.esc(T('bk.q')) + '<span class="req">*</span></label>' +
          '<textarea class="textarea" id="bk-q" maxlength="300" placeholder="' + U.esc(T('bk.qPh')) + '">' + U.esc(s.form.q) + '</textarea>' +
          '<p class="counter"><span id="q-count">' + s.form.q.length + '</span> / 300</p></div>' +

        '<div class="field"><span class="field__label">' + U.esc(T('bk.upload')) + '</span>' +
          '<label class="dropzone" id="dropzone">' +
            '<input type="file" class="sr-only" id="bk-file" accept=".pdf,.ppt,.pptx,image/*" />' +
            U.icon('i-upload', 24) +
            '<span id="drop-text">' + U.esc(s.form.file ? T('bk.uploaded', { n: s.form.file }) : T('bk.dropT')) + '</span>' +
            '<small>' + U.esc(T('bk.dropS')) + '</small></label></div>' +
      '</div></section>';
  }

  function stepReview(m) {
    var v = svc();
    var rows = [
      [T('bk.service'), L(v.name)],
      [T('bk.time'), s.date && s.slot ? fmtDate(s.date) + ' ' + s.slot : '—'],
      [T('bk.duration'), v.dur + (Lang.isZh() ? ' 分钟' : ' min')],
      [T('bk.title2'), s.form.name || '—'],
      [T('bk.years'), s.form.years || '—'],
      [T('bk.upload'), s.form.file || (Lang.isZh() ? '未上传' : 'None')]
    ];
    return '<section class="card card--pad">' +
      '<h2 class="h-sec" style="margin-bottom:16px">' + U.esc(T('bk.s3')) + '</h2>' +
      '<dl class="summary">' + rows.map(function (r) {
        return '<div class="summary__row"><dt>' + U.esc(r[0]) + '</dt><dd>' + U.esc(r[1]) + '</dd></div>';
      }).join('') + '</dl>' +
      '<div class="card card--soft" style="margin-top:16px;padding:14px">' +
        '<p class="dim" style="font-size:var(--fs-sm);margin-bottom:6px">' + U.esc(T('bk.q')) + '</p>' +
        '<p class="muted">' + U.esc(s.form.q || '—') + '</p></div></section>';
  }

  function stepPay(m) {
    if (s.done) {
      return '<section class="card card--pad"><div class="empty">' + U.roach('roach-success', 120) +
        '<h3>' + U.esc(T('bk.done')) + '</h3>' +
        '<p>' + U.esc(fmtDate(s.date) + ' ' + (s.slot || '')) + ' · ' + U.esc(L(svc().name)) + '</p>' +
        '<div class="row" style="--gap:10px;margin-top:10px">' +
          '<a class="btn btn--primary" href="#/me/bookings">' + U.esc(T('nav.bookings')) + '</a>' +
          '<a class="btn" href="#/mentors">' + U.esc(T('mentor.title')) + '</a>' +
        '</div></div></section>';
    }
    return '<section class="card card--pad">' +
      '<h2 class="h-sec" style="margin-bottom:16px">' + U.esc(T('bk.s4')) + '</h2>' +
      '<div class="radio-row">' +
        ['微信支付', '支付宝', '银行卡'].map(function (p, i) {
          var en = ['WeChat Pay', 'Alipay', 'Card'][i];
          return '<button class="radio-pill" type="button" data-pay="' + i + '" aria-pressed="' + (s.pay === i) + '">' +
            U.esc(Lang.isZh() ? p : en) + '</button>';
        }).join('') + '</div>' +
      '<p class="dim" style="margin-top:16px;font-size:var(--fs-sm)">' + U.esc(T('bk.agree')) + '</p></section>';
  }

  function aside(m) {
    var v = svc();
    return '<section class="card card--pad">' +
      '<h2 class="h-sec" style="margin-bottom:14px">' + U.esc(T('bk.orderT')) + '</h2>' +
      '<div class="row" style="--gap:12px;padding-bottom:14px;border-bottom:1px solid var(--b-subtle)">' +
        U.avatar(m.pose, m.tone, 44) +
        '<span><b style="display:block">' + U.esc(L(m.name)) + '</b>' +
        '<span class="dim" style="font-size:var(--fs-sm)">' + U.esc(L(m.role)) + '</span></span></div>' +
      '<dl class="summary" style="padding-block:14px" id="order-rows">' +
        '<div class="summary__row"><dt>' + U.esc(T('bk.service')) + '</dt><dd>' + U.esc(L(v.name)) + '</dd></div>' +
        '<div class="summary__row"><dt>' + U.esc(T('bk.time')) + '</dt><dd>' +
          U.esc(s.date && s.slot ? fmtDate(s.date) + ' ' + s.slot : '—') + '</dd></div>' +
        '<div class="summary__row"><dt>' + U.esc(T('bk.duration')) + '</dt><dd>' + v.dur +
          U.esc(Lang.isZh() ? ' 分钟' : ' min') + '</dd></div>' +
      '</dl>' +
      '<div class="summary__total"><b>' + U.esc(T('bk.total')) + '</b><span id="order-total">' + U.money(v.price) + '</span></div>' +
      '<button class="btn btn--primary btn--block" style="margin-top:14px" type="button" data-next>' +
        U.esc(s.step < 4 ? T('c.next') : T('bk.pay')) + '</button>' +
      (s.step > 1 ? '<button class="btn btn--ghost btn--block" style="margin-top:8px" type="button" data-prev>' +
        U.esc(T('c.prev')) + '</button>' : '') +
      '<p class="dim" style="margin-top:12px;font-size:var(--fs-sm);text-align:center">' + U.esc(T('bk.agree')) + '</p>' +
    '</section>' +

    '<section class="card card--pad"><h2 class="h-sec" style="margin-bottom:10px">' + U.esc(T('bk.assure')) + '</h2>' +
      '<div class="assure">' + [['i-shield', 'bk.a1', 'bk.a1d'], ['i-award', 'bk.a2', 'bk.a2d'], ['i-refresh', 'bk.a3', 'bk.a3d']]
        .map(function (a) {
          return '<div>' + U.icon(a[0], 17) + '<span><b>' + U.esc(T(a[1])) + '</b><span>' + U.esc(T(a[2])) + '</span></span></div>';
        }).join('') + '</div></section>' +

    '<section class="card card--pad"><h2 class="h-sec" style="margin-bottom:6px">' + U.esc(T('bk.faq')) + '</h2>' +
      MENTOR_FAQ.map(function (f, i) {
        return '<div class="acc__item"><button class="acc__btn" type="button" data-acc aria-expanded="false" aria-controls="faq-' + i + '">' +
          '<span>' + U.esc(L(f.q)) + '</span>' + U.icon('i-chevron-right', 16) + '</button>' +
          '<div class="acc__panel" id="faq-' + i + '"><div><p>' + U.esc(L(f.a)) + '</p></div></div></div>';
      }).join('') + '</section>';
  }

  function body(m) {
    if (s.step === 1) return stepService(m);
    if (s.step === 2) return stepForm();
    if (s.step === 3) return stepReview(m);
    return stepPay(m);
  }

  /* ---------------- 页面 ---------------- */
  PAGES.booking = {
    render: function (params) {
      var m = U.byId(DATA_MENTORS, params.id);
      if (!m) return null;

      var d = addDays(startOfDay(new Date()), 1);
      while (!bookable(d)) d = addDays(d, 1);
      var preset = (location.hash.split('svc=')[1] || '').split('&')[0];
      s = {
        step: 1, svc: U.byId(MENTOR_SERVICES, preset) ? preset : 'career',
        date: d, slot: null, view: new Date(d.getFullYear(), d.getMonth(), 1),
        pay: 0, done: false,
        form: { name: '', gender: 'male', years: '', role: '', q: '', file: '' }
      };

      return U.crumbs([{ label: T('nav.home'), href: '#/' },
                       { label: T('mentor.title'), href: '#/mentors' },
                       { label: L(m.name), href: '#/mentors/' + m.id },
                       { label: T('bk.title') }]) +
        '<header class="page-head"><div class="page-head__row">' +
          '<h1 class="h-page">' + U.esc(T('bk.title')) + '</h1>' +
          '<div id="steps">' + stepsBar() + '</div></div></header>' +
        '<div class="with-side"><div id="bk-body">' + body(m) + '</div>' +
        '<aside class="side-stack" id="bk-aside">' + aside(m) + '</aside></div>';
    },

    mount: function (root, params) {
      var m = U.byId(DATA_MENTORS, params.id);
      if (!m) return;

      function repaint() {
        root.querySelector('#steps').innerHTML = stepsBar();
        var b = root.querySelector('#bk-body');
        b.innerHTML = body(m);
        b.classList.remove('view-enter'); void b.offsetWidth; b.classList.add('view-enter');
        root.querySelector('#bk-aside').innerHTML = aside(m);
      }
      function syncAside() { root.querySelector('#bk-aside').innerHTML = aside(m); }

      /* 步骤 1 */
      U.on(root, 'click', '[data-svc]', function (e, el) {
        s.svc = el.getAttribute('data-svc');
        root.querySelectorAll('[data-svc]').forEach(function (b) { b.setAttribute('aria-checked', String(b === el)); });
        syncAside();
      });
      U.on(root, 'click', '[data-mon]', function (e, el) {
        s.view = new Date(s.view.getFullYear(), s.view.getMonth() + Number(el.getAttribute('data-mon')), 1);
        root.querySelector('#cal-box').innerHTML = calendar();
      });
      U.on(root, 'click', '[data-day]', function (e, el) {
        var p = el.getAttribute('data-day').split('-').map(Number);
        s.date = new Date(p[0], p[1] - 1, p[2]); s.slot = null;
        root.querySelector('#cal-box').innerHTML = calendar();
        root.querySelector('#slot-box').innerHTML = slots();
        syncAside();
      });
      U.on(root, 'click', '[data-slot]', function (e, el) {
        s.slot = el.getAttribute('data-slot');
        root.querySelectorAll('[data-slot]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === el)); });
        syncAside();
      });

      /* 步骤 2 */
      U.on(root, 'input', '#bk-name', function (e, el) { s.form.name = el.value; });
      U.on(root, 'input', '#bk-role', function (e, el) { s.form.role = el.value; });
      U.on(root, 'change', '#bk-years', function (e, el) { s.form.years = el.value; });
      U.on(root, 'input', '#bk-q', function (e, el) {
        s.form.q = el.value;
        var c = root.querySelector('#q-count'); if (c) c.textContent = el.value.length;
      });
      U.on(root, 'click', '[data-gender]', function (e, el) {
        s.form.gender = el.getAttribute('data-gender');
        root.querySelectorAll('[data-gender]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === el)); });
      });
      U.on(root, 'change', '#bk-file', function (e, el) {
        var f = el.files && el.files[0]; if (!f) return;
        s.form.file = f.name;
        root.querySelector('#drop-text').textContent = T('bk.uploaded', { n: f.name });
      });
      root.addEventListener('dragover', function (e) {
        var dz = e.target.closest('#dropzone'); if (!dz) return;
        e.preventDefault(); dz.setAttribute('data-over', '');
      });
      root.addEventListener('drop', function (e) {
        var dz = e.target.closest('#dropzone'); if (!dz) return;
        e.preventDefault(); dz.removeAttribute('data-over');
        var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]; if (!f) return;
        s.form.file = f.name;
        root.querySelector('#drop-text').textContent = T('bk.uploaded', { n: f.name });
      });

      /* 步骤 4 */
      U.on(root, 'click', '[data-pay]', function (e, el) {
        s.pay = Number(el.getAttribute('data-pay'));
        root.querySelectorAll('[data-pay]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === el)); });
      });

      /* FAQ */
      U.on(root, 'click', '[data-acc]', function (e, el) {
        el.setAttribute('aria-expanded', String(el.getAttribute('aria-expanded') !== 'true'));
      });

      /* 步骤导航 */
      U.on(root, 'click', '[data-next]', function () {
        if (s.step === 1 && !s.slot) { U.toast(T('bk.needSlot')); return; }
        if (s.step === 2 && !s.form.name.trim()) { U.toast(T('bk.needName')); return; }
        if (s.step === 4) {
          s.done = true;
          repaint();
          U.toast(T('bk.done'));
          return;
        }
        s.step++;
        repaint();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      U.on(root, 'click', '[data-prev]', function () {
        if (s.step > 1) { s.step--; repaint(); }
      });
    },

    title: function (params) {
      var m = U.byId(DATA_MENTORS, params.id);
      return (m ? L(m.name) + ' · ' : '') + T('bk.title');
    }
  };
})();
