/* ==========================================================
   UI helpers — 图标 / 蟑螂组件 / 文件夹卡 / 筛选胶囊 / 收藏
   ========================================================== */
(function () {
  'use strict';

  /* ---------------- 基础 ---------------- */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function byId(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function on(root, type, selector, handler) {
    root.addEventListener(type, function (e) {
      var el = e.target.closest(selector);
      if (el && root.contains(el)) handler(e, el);
    });
  }

  /* ---------------- 图标 / 蟑螂 ---------------- */
  function icon(name, size, cls) {
    var s = size || 18;
    return '<svg class="' + name + (cls ? ' ' + cls : '') + '" width="' + s + '" height="' + s +
           '" aria-hidden="true"><use href="#' + name + '" /></svg>';
  }

  function roach(pose, size, cls) {
    var s = size || 48;
    return '<svg class="roach' + (cls ? ' ' + cls : '') + '" viewBox="0 0 64 64" width="' + s +
           '" height="' + s + '" aria-hidden="true"><use href="#' + (pose || 'roach') + '" /></svg>';
  }

  /* 头像：粉彩圆底 + 蟑螂角色 */
  var PASTELS = ['lavender', 'blue', 'peach', 'mint', 'rose', 'gray'];
  function pastelVar(name) { return 'var(--p-' + (PASTELS.indexOf(name) < 0 ? 'gray' : name) + ')'; }

  function avatar(pose, tone, size, cls) {
    var s = size || 44;
    return '<span class="avatar' + (cls ? ' ' + cls : '') + '" style="width:' + s + 'px;height:' + s +
           'px;background:' + pastelVar(tone) + '">' +
           '<svg viewBox="0 0 64 64" aria-hidden="true"><use href="#' + (pose || 'roach') + '" /></svg></span>';
  }

  /* ---------------- 分类色 ---------------- */
  var CAT_TONE = {
    internet: 'lavender', design: 'blue', consulting: 'peach',
    realestate: 'rose', tech: 'mint', public: 'mint'
  };
  function dirTone(d) { return CAT_TONE[d && d.cat] || 'gray'; }

  /* ---------------- 文件夹卡 ---------------- */
  function folder(o) {
    return '<a class="folder" style="--fold:' + pastelVar(o.tone) + '" href="' + o.href + '">' +
      (o.more ? '<span class="folder__more">' + icon('i-more', 15) + '</span>' : '') +
      '<span class="folder__title">' + esc(o.title) + '</span>' +
      (o.desc ? '<span class="folder__desc clamp-2">' + esc(o.desc) + '</span>' : '') +
      '<span class="folder__foot">' +
        (o.faces || '') +
        '<span class="folder__count">' + esc(o.count) + '</span>' +
      '</span>' +
      (o.pose ? '<span class="folder__mascot">' + roach(o.pose, 44) + '</span>' : '') +
    '</a>';
  }

  function faceStack(poses, tones) {
    return '<span class="face-stack">' + poses.map(function (p, i) {
      return avatar(p, tones[i % tones.length], 24);
    }).join('') + '</span>';
  }

  /* ---------------- 筛选胶囊 ---------------- */
  function chip(id, label, options, value) {
    var current = null;
    options.forEach(function (o) { if (o.v === value) current = o; });
    var opts = '<option value="">' + esc(label) + '</option>';
    options.forEach(function (o) {
      opts += '<option value="' + esc(o.v) + '"' + (value === o.v ? ' selected' : '') + '>' + esc(L(o.label)) + '</option>';
    });
    return '<span class="chip"' + (current ? ' data-on' : '') + '>' +
      '<span>' + esc(current ? L(current.label) : label) + '</span>' +
      icon('i-chevron-down', 14) +
      '<select data-filter="' + id + '" aria-label="' + esc(label) + '">' + opts + '</select></span>';
  }

  function resetChip() {
    return '<button class="chip-reset" type="button" data-reset>' + icon('i-refresh', 15) + esc(T('c.reset')) + '</button>';
  }

  /* ---------------- 小组件 ---------------- */
  function badge(text, tone) {
    return '<span class="badge' + (tone ? ' badge--' + tone : '') + '">' + esc(text) + '</span>';
  }

  function tags(list, max) {
    var arr = (list || []).slice(0, max || 99);
    return '<span class="tag-row">' + arr.map(function (t) {
      return '<span class="tag">' + esc(L(t)) + '</span>';
    }).join('') + '</span>';
  }

  function stars(n, max) {
    var total = max || 5, out = '<span class="stars" aria-hidden="true">';
    for (var i = 1; i <= total; i++) {
      out += '<svg width="13" height="13"' + (i > n ? ' data-off' : '') + '><use href="#' +
             (i <= n ? 'i-star' : 'i-star-o') + '" /></svg>';
    }
    return out + '</span>';
  }

  function level(v, label) {
    return '<span class="level"><span>' + esc(label) + '</span>' +
      '<span class="level__bar"><i style="width:' + Math.round(v / 5 * 100) + '%"></i></span></span>';
  }

  function pf(level) {
    if (level === 'need') return { label: T('c.need'), tone: 'peach' };
    if (level === 'suggest') return { label: T('c.suggest'), tone: 'warn' };
    return { label: T('c.optional'), tone: 'ok' };
  }

  function linkMore(href, label) {
    return '<a class="link-more" href="' + href + '">' + esc(label || T('c.viewAll')) + icon('i-arrow-right', 15) + '</a>';
  }

  function sectionHead(title, iconName, moreHref, moreLabel) {
    return '<div class="section-head"><h2 class="section-title">' +
      (iconName ? icon(iconName, 19) : '') + esc(title) + '</h2>' +
      (moreHref ? linkMore(moreHref, moreLabel) : '') + '</div>';
  }

  function crumbs(items) {
    var out = '<nav class="crumbs" aria-label="breadcrumb">';
    items.forEach(function (it, i) {
      if (i) out += '<span aria-hidden="true">/</span>';
      out += it.href ? '<a href="' + it.href + '">' + esc(it.label) + '</a>'
                     : '<span aria-current="page">' + esc(it.label) + '</span>';
    });
    return out + '</nav>';
  }

  function empty(pose, title, desc, cta) {
    return '<div class="empty">' + roach(pose || 'roach-search', 108) +
      '<h3>' + esc(title || T('c.noResultT')) + '</h3>' +
      '<p>' + esc(desc || T('c.noResultD')) + '</p>' +
      (cta || '') + '</div>';
  }

  function fav(id, on) {
    return '<button class="fav" type="button" data-fav="' + esc(id) + '" aria-pressed="' + !!on +
      '" aria-label="' + esc(T('c.save')) + '">' + icon(on ? 'i-star' : 'i-star-o', 16) + '</button>';
  }

  /* ---------------- 收藏（本地存储） ---------------- */
  var FAV_KEY = 'arh-favs';
  function readFavs() {
    try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch (e) { return []; }
  }
  var favs = readFavs();

  var Favs = {
    all: function () { return favs.slice(); },
    has: function (id) { return favs.indexOf(id) >= 0; },
    toggle: function (id) {
      var i = favs.indexOf(id);
      if (i >= 0) favs.splice(i, 1); else favs.push(id);
      try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) { /* ignore */ }
      return i < 0;
    },
    count: function () { return favs.length; }
  };

  /* ---------------- 提示 ---------------- */
  var region;
  function toast(msg) {
    region = region || document.getElementById('toast-region');
    if (!region) return;
    var el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = icon('i-check-circle', 16) + '<span>' + esc(msg) + '</span>';
    region.appendChild(el);
    setTimeout(function () {
      el.setAttribute('data-leaving', '');
      setTimeout(function () { el.remove(); }, 280);
    }, 2600);
  }

  function money(n) { return '¥' + n; }

  window.UI = {
    esc: esc, byId: byId, on: on,
    icon: icon, roach: roach, avatar: avatar, pastelVar: pastelVar, dirTone: dirTone,
    folder: folder, faceStack: faceStack,
    chip: chip, resetChip: resetChip,
    badge: badge, tags: tags, stars: stars, level: level, pf: pf,
    linkMore: linkMore, sectionHead: sectionHead, crumbs: crumbs, empty: empty,
    fav: fav, Favs: Favs, toast: toast, money: money
  };
})();
