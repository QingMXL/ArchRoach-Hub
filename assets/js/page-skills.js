/* ==========================================================
   Page — 能力迁移词典
   ========================================================== */
(function () {
  'use strict';
  window.PAGES = window.PAGES || {};
  var U = UI;

  var state = { cat: 'all', open: '' };

  function counts() {
    var map = { all: DATA_SKILLS.length };
    DATA_SKILLS.forEach(function (s) { map[s.cat] = (map[s.cat] || 0) + 1; });
    return map;
  }

  function cats() {
    var c = counts();
    return SKILL_CATS.map(function (k) {
      return '<button class="chip" type="button" data-cat="' + k.v + '"' +
        (state.cat === k.v ? ' data-on' : '') + '>' + U.esc(L(k.label)) +
        '<span class="mono dim">' + (c[k.v] || 0) + '</span></button>';
    }).join('');
  }

  function rows() {
    var list = DATA_SKILLS.filter(function (s) { return state.cat === 'all' || s.cat === state.cat; });
    if (!list.length) return U.empty('roach-search');

    return '<div class="card" style="padding:12px 8px">' +
      '<div class="table-head" style="grid-template-columns:minmax(0,1fr) 24px minmax(0,1fr) minmax(0,1.4fr) minmax(0,1fr)">' +
        '<span>' + U.esc(T('skill.colFrom')) + '</span><span></span>' +
        '<span>' + U.esc(T('skill.colTo')) + '</span><span>' + U.esc(T('skill.colDesc')) + '</span>' +
        '<span>' + U.esc(T('skill.colFields')) + '</span></div>' +
      '<div class="rows">' + list.map(function (s) {
        var open = state.open === s.id;
        return '<button class="row-item" type="button" data-row="' + s.id + '" aria-expanded="' + open + '"' +
            ' style="grid-template-columns:minmax(0,1fr) 24px minmax(0,1fr) minmax(0,1.4fr) minmax(0,1fr);text-align:start;width:100%">' +
            '<span class="row" style="--gap:10px">' + U.icon(s.icon, 18) + U.esc(L(s.from)) + '</span>' +
            '<span style="color:var(--roach-400)">' + U.icon('i-arrow-right', 16) + '</span>' +
            '<span class="row" style="--gap:10px">' + U.icon(s.toIcon, 18) + U.esc(L(s.to)) + '</span>' +
            '<span class="muted" style="font-size:var(--fs-sm)">' + U.esc(L(s.desc)) + '</span>' +
            '<span>' + U.tags(s.fields, 2) + '</span>' +
          '</button>' +
          (open ? '<div class="card card--soft" style="margin:0 8px 10px;padding:16px">' +
            '<p class="dim" style="font-size:var(--fs-sm);margin-bottom:6px">' + U.esc(T('skill.deep')) + '</p>' +
            '<p class="muted">' + U.esc(L(s.deep)) + '</p>' +
            '<p class="dim" style="font-size:var(--fs-sm);margin:12px 0 6px">' + U.esc(T('skill.relDirs')) + '</p>' +
            '<span class="tag-row">' + s.dirs.map(function (id) {
              var d = U.byId(DATA_DIRECTIONS, id);
              return d ? '<a class="tag" href="#/directions/' + d.id + '" style="background:' +
                U.pastelVar(U.dirTone(d)) + ';color:var(--t-primary)">' + U.esc(L(d.name)) +
                U.icon('i-arrow-right', 13) + '</a>' : '';
            }).join('') + '</span></div>' : '');
      }).join('') + '</div>' +
      '<p class="dim" style="text-align:center;padding:12px 0 4px;font-size:var(--fs-sm)">' +
        U.esc(T('skill.count', { n: DATA_SKILLS.length })) + '</p></div>';
  }

  PAGES.skills = {
    render: function () {
      return '<header class="page-head"><div class="page-head__row"><div>' +
          '<h1 class="h-page">' + U.esc(T('skill.title')) + '</h1>' +
          '<p class="page-lede">' + U.esc(T('skill.lede')) + '</p></div>' +
          U.roach('roach-book', 72) + '</div></header>' +

        '<div class="chips" id="cat-list" style="margin-bottom:18px">' + cats() + '</div>' +

        '<div class="with-side"><div id="skill-rows">' + rows() + '</div>' +

        '<aside class="side-stack">' +
          '<section class="promo" style="flex-direction:column;text-align:center">' +
            U.roach('roach-guide', 66) +
            '<div><h3>' + U.esc(T('skill.relDirs')) + '</h3>' +
            '<p>' + U.esc(T('dir.calloutD')) + '</p></div>' +
            '<a class="btn btn--primary btn--sm btn--block" href="#/directions">' + U.esc(T('dir.calloutCta')) + '</a>' +
          '</section>' +
          SKILL_RELATED.map(function (r) {
            return '<a class="card card--pad card-hover" href="#/directions/' + r.dir + '">' +
              '<div class="row" style="--gap:10px;margin-bottom:6px">' + U.icon(r.icon, 18) +
              '<b>' + U.esc(L(r.title)) + '</b></div>' +
              '<p class="muted" style="font-size:var(--fs-sm)">' + U.esc(L(r.desc)) + '</p>' +
              '<p class="dim" style="font-size:var(--fs-sm);margin-top:6px">' + U.esc(L(r.jobs)) + '</p></a>';
          }).join('') +
        '</aside></div>';
    },

    mount: function (root) {
      var box = root.querySelector('#skill-rows');
      var catBox = root.querySelector('#cat-list');

      U.on(root, 'click', '[data-cat]', function (e, el) {
        state.cat = el.getAttribute('data-cat');
        state.open = '';
        catBox.innerHTML = cats();
        box.innerHTML = rows();
      });

      U.on(root, 'click', '[data-row]', function (e, el) {
        var id = el.getAttribute('data-row');
        state.open = state.open === id ? '' : id;
        box.innerHTML = rows();
        var next = box.querySelector('[data-row="' + id + '"]');
        if (next) next.focus();
      });
    },

    title: function () { return T('skill.title'); }
  };
})();
