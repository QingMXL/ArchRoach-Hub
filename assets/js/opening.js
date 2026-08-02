/* ==========================================================
   OpeningHero — 开场页
     Opening.maybeShow(onEnter)   每会话首次访问时显示；? intro=1 可强制重看
     Opening.show(onEnter)        无条件显示

   结构：
     .oh                全屏覆盖层
     ├ canvas.oh__canvas  左右两只点阵手（静态，仅在 resize 时重绘）
     ├ .oh__shadow        蟑螂脚下的软阴影
     ├ .oh__roach         蟑螂（<use href="#roach">，transform 驱动）
     ├ .oh__panel         站名 / slogan / 进入按钮
     ├ .oh__hint          操作提示（方向键高亮）
     └ .oh__skip          跳过
   ========================================================== */
(function () {
  'use strict';

  var KEY = 'arh-intro-seen';

  /* ==========================================================
     一、点阵手臂 —— 致敬《创造亚当》
     左：亚当（低、放松，手背下垂，食指微微伸出）
     右：上帝（高、有力，手臂自右上探入，食指笔直指向亚当）
     两根食指指尖之间留一道缝，缝里就是那只大蟑螂。

     造型方法：每条手臂 = 一组旋转椭圆的并集（上臂/肘/前臂/腕/手/
     指），塞进 Path2D 后逐格 isPointInPath 采样成布尔网格再打点。
     坐标系：1000 × 560 的局部空间，指尖相遇点在 (518, 300)。
     ========================================================== */
  var ART_VIEW = 640;                    // 画布宽度对应多少个局部单位（越小 → 手越大）
  var TOUCH_X = 320, TOUCH_Y = 108;      // 两指相遇处

  /* 只裁「手 + 一小截前臂」：手要占据画面，前臂直接跑出画外。
     读得出手的关键是 前臂细 → 腕更窄 → 手掌变宽 → 食指单独伸出。
     cx, cy, rx, ry, rotDeg */
  var ADAM = [
    [ 20, 152, 112, 22, -10],   // 前臂，自左下伸出画外
    [148, 130,  24, 13, -12],   // 腕（明显收窄）
    [212, 114,  60, 36, -12],   // 手背（放松下垂）
    [188,  78,  30, 11, -58],   // 拇指
    [266, 106,  42,  8,  -6],   // 食指
    [304, 103,   8,  8,   0]    // 指尖
  ];
  var GOD = [
    [620,  60, 112, 22,  10],   // 前臂，自右上伸出画外
    [492,  88,  25, 13,  10],   // 腕（明显收窄）
    [428, 102,  62, 37,  10],   // 手掌（有力前伸）
    [450,  62,  31, 12, -46],   // 拇指
    [376, 110,  44,  8,   6],   // 食指
    [336, 113,   8,  8,   0]    // 指尖
  ];

  /** 位置哈希：同一格子每次重绘结果一致，避免闪烁 */
  function rand(i, j) {
    var n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
    return n - Math.floor(n);
  }

  function addArm(path, parts, s, ox, oy) {
    parts.forEach(function (e) {
      /* 每个椭圆单独成子路径再合并，否则 ellipse() 会从上一个点连线，
         nonzero 填充下这些连线会把并集搅坏 */
      var sub = new Path2D();
      sub.ellipse(ox + e[0] * s, oy + e[1] * s, e[2] * s, e[3] * s,
                  e[4] * Math.PI / 180, 0, Math.PI * 2);
      path.addPath(sub);
    });
  }

  /** 指尖相遇点在画布上的位置（大蟑螂初始就站在这儿） */
  function touchPoint(cssW, cssH) {
    var portrait = cssH > cssW;
    return { x: cssW / 2, y: cssH * (portrait ? 0.6 : 0.66), s: cssW / ART_VIEW };
  }

  function paintArms(canvas) {
    var cssW = canvas.clientWidth, cssH = canvas.clientHeight;
    if (!cssW || !cssH) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    /* 注意：isPointInPath 的坐标不受 CTM 影响，而 Path2D 会被 CTM 变换。
       所以这里保持单位矩阵，全程用设备像素计算，两者才在同一坐标系。 */
    var W = Math.round(cssW * dpr), H = Math.round(cssH * dpr);
    canvas.width = W;
    canvas.height = H;

    var ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);

    var tp = touchPoint(cssW, cssH);
    var s = tp.s * dpr;
    var ox = tp.x * dpr - TOUCH_X * s;
    var oy = tp.y * dpr - TOUCH_Y * s;

    var adam = new Path2D(), god = new Path2D();
    addArm(adam, ADAM, s, ox, oy);
    addArm(god, GOD, s, ox, oy);

    /* 1) 先算布尔网格，边缘检测就不用再调 isPointInPath */
    var step = Math.round((cssW < 760 ? 7 : 9) * dpr);
    var cols = Math.ceil(W / step) + 1, rows = Math.ceil(H / step) + 1;
    var grid = new Uint8Array(cols * rows);      // 0 空 / 1 亚当 / 2 上帝
    var i, j, x, y, idx;
    for (j = 0; j < rows; j++) {
      y = j * step;
      for (i = 0; i < cols; i++) {
        x = i * step;
        idx = j * cols + i;
        if (ctx.isPointInPath(adam, x, y)) grid[idx] = 1;
        else if (ctx.isPointInPath(god, x, y)) grid[idx] = 2;
      }
    }

    /* 2) 绘制：指尖最实，越往画面外缘越小越淡 —— 让视线落在
          「即将触碰」的那一下；边缘随机掉点做出颗粒感 */
    var touchPx = tp.x * dpr;
    var reach = touchPx * 0.94;
    ctx.fillStyle = '#17181D';
    for (j = 0; j < rows; j++) {
      for (i = 0; i < cols; i++) {
        idx = j * cols + i;
        var side = grid[idx];
        if (!side) continue;

        var r0 = rand(i, j);
        if (r0 > 0.95) continue;                       // 整体留一点空隙

        x = i * step; y = j * step;
        var t = 1 - (side === 1 ? x : W - x) / reach;  // 0 指尖 → 1 画面外缘
        t = t < 0 ? 0 : (t > 1 ? 1 : t);

        var edge = !grid[idx - 1] || !grid[idx + 1] ||
                   (j > 0 && !grid[idx - cols]) || (j < rows - 1 && !grid[idx + cols]);
        if (edge && r0 > 0.66) continue;               // 边缘更稀

        var r = step * 0.2 * (0.62 + 0.76 * r0) * (1 - 0.42 * t);
        if (edge) r *= 0.64;

        ctx.globalAlpha = Math.max(0.14, 0.92 - 0.72 * t) * (edge ? 0.72 : 1);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ==========================================================
     二、蟑螂群
     领头：方向键 / WASD 移动；点击画面自动寻路（远快近慢）。
     跟班：各自有速度、跟随距离与「迷路」倾向 —— 有的紧跟，有的
           掉队，偶尔会有一只走神几秒钟原地打转，回过神来再加速追。
     朝向一律按最短弧插值，避免左右切换时转 180°。
     ========================================================== */
  function createSwarm(root, leadEl, shadowEl, bugs, hintKeys) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var W = root.clientWidth, H = root.clientHeight;
    var pad = 40;

    var tp = touchPoint(W, H);
    var pos = { x: tp.x, y: tp.y };        // 领头蟑螂就站在两指之间
    var target = null;
    var keys = Object.create(null);
    var angle = -Math.PI / 2;              // 精灵默认头朝上
    var lead = { el: leadEl, moving: false };
    var raf = 0, last = 0;

    var KEYMAP = {
      ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
      w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0]
    };

    function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
    function turn(cur, want, dt, rate) {
      var diff = ((want - cur + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
      return cur + diff * (reduce ? 1 : Math.min(1, dt * rate));
    }
    function place(el, x, y, a) {
      el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) rotate(' +
        (a * 180 / Math.PI + 90).toFixed(1) + 'deg)';
    }
    function flag(o, on) {
      if (on === o.moving) return;
      o.moving = on;
      if (on) o.el.setAttribute('data-moving', ''); else o.el.removeAttribute('data-moving');
    }

    /* ---- 跟班的个体差异 ---- */
    var flock = bugs.map(function (el, i) {
      var t = i / Math.max(1, bugs.length - 1);
      return {
        el: el,
        x: pos.x + (Math.random() - 0.5) * 90,
        y: pos.y + 26 + Math.random() * 60,
        angle: Math.random() * Math.PI * 2,
        speed: 95 + t * 130 + Math.random() * 45,     // 有快有慢
        gap: 26 + i * 13 + Math.random() * 14,        // 跟得远近不同
        orbit: 14 + Math.random() * 20,               // 各自绕一点，避免叠在一起
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.5 + Math.random() * 0.9,
        strays: i % 2 === 1 ? 0.16 : 0.05,            // 一半更容易走神
        lostUntil: 0, lostDir: 0, catchUntil: 0,
        moving: false
      };
    });

    function stepFlock(now, dt) {
      for (var i = 0; i < flock.length; i++) {
        var f = flock[i];
        f.phase += dt * f.phaseSpeed;

        /* 偶尔走神：朝一个随机方向慢慢晃 1.2–3.8 秒，回神后加速追 */
        if (now > f.lostUntil && Math.random() < f.strays * dt) {
          f.lostUntil = now + 1200 + Math.random() * 2600;
          f.lostDir = Math.random() * Math.PI * 2;
          f.catchUntil = f.lostUntil + 2200;
        }
        var lost = now < f.lostUntil;

        var tx, ty, stop, sp;
        if (lost) {
          tx = f.x + Math.cos(f.lostDir) * 70;
          ty = f.y + Math.sin(f.lostDir) * 70;
          stop = 0;
          sp = f.speed * 0.34;                        // 走神时慢吞吞
        } else {
          tx = pos.x + Math.cos(f.phase) * f.orbit;
          ty = pos.y + Math.sin(f.phase * 0.8) * f.orbit;
          stop = f.gap;
          sp = f.speed * (now < f.catchUntil ? 1.75 : 1);   // 掉队后加速归队
        }

        var dx = tx - f.x, dy = ty - f.y;
        var d = Math.hypot(dx, dy);
        if (d > stop && d > 0.5) {
          var k = Math.min(1, (d - stop) / 60);       // 接近跟随距离时自然减速
          var v = sp * (0.35 + 0.65 * k);
          f.x = clamp(f.x + dx / d * v * dt, pad, W - pad);
          f.y = clamp(f.y + dy / d * v * dt, pad, H - pad);
          f.angle = turn(f.angle, Math.atan2(dy, dx), dt, 9);
          flag(f, true);
          place(f.el, f.x, f.y, f.angle);
        } else if (f.moving) {
          flag(f, false);
        }
      }
    }

    function paint() {
      place(leadEl, pos.x, pos.y, angle);
      shadowEl.style.transform = 'translate3d(' + pos.x.toFixed(1) + 'px,' + (pos.y + 17).toFixed(1) + 'px,0)';
    }

    function step(now) {
      raf = requestAnimationFrame(step);
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      /* 键盘优先：一旦有按键就放弃鼠标目标 */
      var vx = 0, vy = 0;
      for (var k in keys) { if (KEYMAP[k]) { vx += KEYMAP[k][0]; vy += KEYMAP[k][1]; } }

      var dx = 0, dy = 0, speed = 0;
      if (vx || vy) {
        target = null;
        var len = Math.hypot(vx, vy) || 1;
        dx = vx / len; dy = vy / len;
        speed = 230;
      } else if (target) {
        var tx = target.x - pos.x, ty = target.y - pos.y;
        var dist = Math.hypot(tx, ty);
        if (dist < 2) { target = null; }
        else {
          dx = tx / dist; dy = ty / dist;
          speed = Math.min(300, 90 + dist * 2.6);    // 远处快、临近减速
        }
      }

      if (speed) {
        pos.x = clamp(pos.x + dx * speed * dt, pad, W - pad);
        pos.y = clamp(pos.y + dy * speed * dt, pad, H - pad);
        angle = turn(angle, Math.atan2(dy, dx), dt, 14);
        flag(lead, true);
        paint();
      } else if (lead.moving) {
        flag(lead, false);
      }

      stepFlock(now, dt);
    }

    function onKeyDown(e) {
      if (!KEYMAP[e.key]) return;
      e.preventDefault();
      keys[e.key] = 1;
      if (hintKeys[e.key]) hintKeys[e.key].setAttribute('data-on', '');
    }
    function onKeyUp(e) {
      if (!KEYMAP[e.key]) return;
      delete keys[e.key];
      if (hintKeys[e.key]) hintKeys[e.key].removeAttribute('data-on');
    }
    function onPointer(e) {
      if (e.target.closest('.oh__panel, .oh__skip, button, a')) return;   // 别抢按钮的点击
      var r = root.getBoundingClientRect();
      target = { x: clamp(e.clientX - r.left, pad, W - pad), y: clamp(e.clientY - r.top, pad, H - pad) };
    }
    function onResize() {
      W = root.clientWidth; H = root.clientHeight;
      pos.x = clamp(pos.x, pad, W - pad);
      pos.y = clamp(pos.y, pad, H - pad);
      paint();
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    root.addEventListener('pointerdown', onPointer);

    paint();
    flock.forEach(function (f) { place(f.el, f.x, f.y, f.angle); });
    raf = requestAnimationFrame(function (t) { last = t; step(t); });

    return {
      resize: onResize,
      destroy: function () {
        cancelAnimationFrame(raf);
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        root.removeEventListener('pointerdown', onPointer);
      }
    };
  }

  /* ==========================================================
     三、装配
     ========================================================== */
  function t(key, fallback) {
    return (typeof T === 'function' ? T(key) : null) || fallback;
  }

  function show(onEnter) {
    var root = document.createElement('div');
    root.className = 'oh';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-label', t('oh.aria', 'ArchRoach Hub 开场'));

    root.innerHTML =
      '<canvas class="oh__canvas" aria-hidden="true"></canvas>' +
      '<span class="oh__flock" aria-hidden="true"></span>' +
      '<span class="oh__shadow" aria-hidden="true"></span>' +
      '<span class="oh__roach" aria-hidden="true">' +
        '<svg class="oh__roach-inner" viewBox="0 0 64 64"><use href="#roach" /></svg>' +
      '</span>' +

      '<div class="oh__panel">' +
        '<p class="oh__eyebrow">Arch &times; Roach</p>' +
        '<h1 class="oh__title">ArchRoach Hub<em>建筑蟑螂互助会</em></h1>' +
        '<p class="oh__lede">' + t('oh.lede', '建筑人到哪儿都能活。') + '</p>' +
        '<button class="oh__enter" type="button" data-enter>' + t('oh.enter', '点击进入') +
          '<svg width="16" height="16" aria-hidden="true"><use href="#i-arrow-right" /></svg>' +
        '</button>' +
      '</div>' +

      '<p class="oh__hint">' +
        '<span class="oh__hint-kbd">' +
          '<span class="oh__keys">' +
            '<span class="oh__key" data-k="ArrowUp">↑</span>' +
            '<span class="oh__key" data-k="ArrowLeft">←</span>' +
            '<span class="oh__key" data-k="ArrowDown">↓</span>' +
            '<span class="oh__key" data-k="ArrowRight">→</span>' +
          '</span> ' + t('oh.hintKey', '移动蟑螂') + '　·　' +
        '</span>' +
        t('oh.hintTap', '点击任意位置，它会爬过去') +
      '</p>' +

      '<button class="oh__skip" type="button" data-enter>' + t('oh.skip', '跳过') + '</button>';

    document.body.appendChild(root);
    document.documentElement.style.overflow = 'hidden';

    /* 点阵手臂 */
    var canvas = root.querySelector('.oh__canvas');
    paintArms(canvas);

    /* 跟班蟑螂：窄屏少放几只 */
    var flockBox = root.querySelector('.oh__flock');
    var count = root.clientWidth < 760 ? 4 : 6;
    var bugMarkup = '';
    for (var b = 0; b < count; b++) {
      var size = 26 - b * 2;                                   // 越靠后越小
      bugMarkup += '<span class="oh__bug" style="--bug:' + size + 'px;--crawl:' +
        (250 + b * 34) + 'ms;opacity:' + (0.86 - b * 0.07).toFixed(2) + '">' +
        '<svg class="oh__bug-inner" viewBox="0 0 64 64"><use href="#roach" /></svg></span>';
    }
    flockBox.innerHTML = bugMarkup;

    /* 蟑螂群 */
    var hintKeys = {};
    root.querySelectorAll('.oh__key').forEach(function (el) { hintKeys[el.getAttribute('data-k')] = el; });
    var roach = createSwarm(root, root.querySelector('.oh__roach'), root.querySelector('.oh__shadow'),
                            [].slice.call(flockBox.children), hintKeys);

    var resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { paintArms(canvas); roach.resize(); }, 140);
    }
    window.addEventListener('resize', onResize);

    /* 退出 */
    var done = false;
    function leave() {
      if (done) return;
      done = true;
      try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* 隐私模式忽略 */ }
      root.setAttribute('data-leaving', '');
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
      roach.destroy();
      document.documentElement.style.overflow = '';
      setTimeout(function () {
        root.remove();
        if (typeof onEnter === 'function') onEnter();
      }, 520);
    }

    function onKey(e) {
      if (e.key !== 'Enter' && e.key !== 'Escape' && e.key !== ' ') return;
      /* e.target 可能是 window / document（非 Element），不能直接 closest */
      var el = e.target;
      var onButton = el && typeof el.closest === 'function' && el.closest('.oh__enter, .oh__skip');
      if (onButton && e.key !== 'Escape') return;   // 按钮自身的 click 会触发，避免重复
      e.preventDefault();
      leave();
    }
    window.addEventListener('keydown', onKey);
    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-enter]')) leave();
    });

    /* 焦点交给容器而非按钮：键盘用户仍可 Tab / 回车，但不会平白出现焦点环 */
    root.tabIndex = -1;
    setTimeout(function () { root.focus({ preventScroll: true }); }, 60);

    return { leave: leave };
  }

  function seen() {
    if (/[?&]intro=1\b/.test(location.search)) return false;
    try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  window.Opening = {
    show: show,
    maybeShow: function (onEnter) {
      if (seen()) return null;
      return show(onEnter);
    }
  };
})();
