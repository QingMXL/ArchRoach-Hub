/* ==========================================================
   Page — 首页
   ========================================================== */
(function () {
  'use strict';
  window.PAGES = window.PAGES || {};
  var U = UI;

  function quick(href, ic, tKey, dKey) {
    return '<a class="quick" href="' + href + '">' +
      '<span class="quick__ic">' + U.icon(ic, 19) + '</span>' +
      '<span class="grow"><b>' + U.esc(T(tKey)) + '</b><span>' + U.esc(T(dKey)) + '</span></span></a>';
  }

  function caseCard(c) {
    var dir = U.byId(DATA_DIRECTIONS, c.dir);
    return '<article class="card card-hover case-card">' +
      '<a href="#/cases/' + c.id + '" aria-label="' + U.esc(L(c.title)) + '">' +
        ART.thumb(c.art, U.badge(dir ? L(dir.name) : L(c.tag), 'glass') +
          U.badge((Lang.isZh() ? c.prep + ' 个月' : c.prep + ' mo'), 'glass')) +
      '</a>' +
      '<div class="case-card__body">' +
        '<h3 class="case-card__t clamp-2"><a href="#/cases/' + c.id + '">' + U.esc(L(c.title)) + '</a></h3>' +
        '<p class="case-card__d clamp-2">' + U.esc(L(c.excerpt)) + '</p>' +
        '<div class="case-card__facts">' +
          '<span>' + U.esc(c.offline ? (Lang.isZh() ? '脱产 ' : 'Full-time ') : (Lang.isZh() ? '在职 ' : 'While working ')) +
          c.prep + ' ' + U.esc(T('c.months')) + '</span>' +
          '<span>' + U.esc(T('c.portfolio')) + '：' + U.esc(c.dir === 'ux' ? (Lang.isZh() ? '是' : 'Yes') : (Lang.isZh() ? '否' : 'No')) + '</span>' +
        '</div>' +
        '<div class="case-card__by">' +
          '<span class="row" style="--gap:8px">' + U.avatar(c.pose, c.tone, 24) + U.esc(L(c.author)) + '</span>' +
          U.fav('case:' + c.id, U.Favs.has('case:' + c.id)) +
        '</div>' +
      '</div></article>';
  }

  function mentorCard(m) {
    var dir = U.byId(DATA_DIRECTIONS, m.dir);
    return '<article class="card card-hover mentor-card">' +
      '<div>' + U.badge(dir ? L(dir.name) : '', U.dirTone(dir)) + '</div>' +
      '<div class="mentor-card__hd">' + U.avatar(m.pose, m.tone, 52) +
        '<div class="grow">' +
          '<div class="mentor-card__n">' + U.esc(L(m.name)) +
            (m.verified ? U.icon('i-verified', 15) : '') + '</div>' +
          '<div class="mentor-card__r clamp-2">' + U.esc(L(m.bg)) + '</div>' +
        '</div></div>' +
      U.tags(m.help, 3) +
      '<div class="mentor-card__foot">' +
        '<span class="price">' + U.money(m.price) + '<small>' + U.esc(T('mentor.perMin')) + '</small></span>' +
        '<span class="dim" style="font-size:var(--fs-sm)">' + U.esc(T('mentor.next')) + '：' + U.esc(L(m.next)) + '</span>' +
      '</div>' +
      '<a class="btn btn--primary btn--sm btn--block" href="#/mentors/' + m.id + '">' + U.esc(T('c.book')) + '</a>' +
    '</article>';
  }

  PAGES.home = {
    render: function () {
      var dirs = DATA_DIRECTIONS.slice().sort(function (a, b) { return b.hot - a.hot; }).slice(0, 4);
      var cases = DATA_CASES.slice(0, 4);
      var mentors = DATA_MENTORS.filter(function (m) { return m.top; }).slice(0, 4);

      var h = '';

      /* Hero */
      h += '<section class="hero">' +
        '<span class="hero__mascot">' + U.roach('roach-wave', 84) + '</span>' +
        '<div>' +
          '<h1 class="hero__title">' + U.esc(T('home.title')) + '</h1>' +
          '<p class="hero__lede">' + U.esc(T('home.lede')) + '</p>' +
        '</div>' +
        '<div class="hero__quick">' +
          quick('#/skills', 'i-sliders', 'home.q1t', 'home.q1d') +
          quick('#/me/files', 'i-upload', 'home.q2t', 'home.q2d') +
          quick('#/mentors', 'i-users', 'home.q3t', 'home.q3d') +
        '</div>' +
      '</section>';

      /* 热门转行方向 */
      h += '<section class="section">' +
        U.sectionHead(T('home.hotDirs'), 'i-flame', '#/directions') +
        '<div class="folder-grid folder-grid--home">' +
          dirs.map(function (d) {
            return U.folder({
              href: '#/directions/' + d.id, tone: U.dirTone(d), title: L(d.name), desc: L(d.desc),
              count: (Lang.isZh() ? d.caseCount + ' 个案例' : d.caseCount + ' stories'),
              faces: U.faceStack(['roach', 'roach-cap'], [d.cat === 'design' ? 'blue' : 'lavender', 'peach']),
              pose: 'roach', more: true
            });
          }).join('') +
          '<a class="folder" style="--fold:var(--n-75);align-items:center;justify-content:center;text-align:center" href="#/directions">' +
            U.icon('i-compass', 24) +
            '<span class="folder__title" style="margin-top:8px;font-size:var(--fs-md)">' + U.esc(T('home.allDirs')) + '</span>' +
            '<span class="folder__desc">' + U.esc(T('home.allDirsSub')) + '</span>' +
          '</a>' +
        '</div></section>';

      /* 真实案例 */
      h += '<section class="section">' +
        U.sectionHead(T('home.cases'), 'i-book', '#/cases', T('home.moreCases')) +
        '<div class="grid-cards">' + cases.map(caseCard).join('') + '</div></section>';

      /* 前辈 */
      h += '<section class="section">' +
        U.sectionHead(T('home.mentors'), 'i-users', '#/mentors', T('home.moreMentors')) +
        '<div class="grid-cards">' + mentors.map(mentorCard).join('') + '</div></section>';

      return h;
    },

    mount: function (root) {
      U.on(root, 'click', '[data-fav]', function (e, el) {
        e.preventDefault();
        var on = U.Favs.toggle(el.getAttribute('data-fav'));
        el.setAttribute('aria-pressed', String(on));
        el.innerHTML = U.icon(on ? 'i-star' : 'i-star-o', 16);
        U.toast(T(on ? 'c.saved' : 'c.save'));
      });
    },

    title: function () { return T('nav.home'); },
    desc: function () { return T('home.title') + ' —— ' + T('home.lede'); }
  };
})();
