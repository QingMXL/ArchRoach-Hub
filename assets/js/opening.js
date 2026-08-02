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
     一、点阵手
     手 = 若干旋转椭圆的并集（手腕 / 手掌 / 四指 / 拇指）。
     用 Path2D 收集后逐格 isPointInPath 采样，比手写复杂轮廓好调。
     坐标系：360 × 320 的局部空间，掌心朝右，手腕从左侧伸入。
     ========================================================== */
  var HAND_W = 360, HAND_H = 320;
  var HAND = [
    /* cx,  cy,   rx,   ry, rotDeg */
    [  8, 176,  54,   29,  -3],   // 手腕
    [112, 164,  66,   57,  -6],   // 手掌
    [236,  94,  80, 12.5, -26],   // 食指
    [250, 133,  88, 13.5, -14],   // 中指
    [242, 173,  78, 12.5,  -3],   // 无名指
    [214, 207,  58,   11,  10],   // 小指
    [162, 246,  46,   16,  44]    // 拇指
  ];

  /** 位置哈希：同一格子每次重绘结果一致，避免闪烁 */
  function rand(i, j) {
    var n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
    return n - Math.floor(n);
  }

  function addHand(path, s, ox, oy, mirror, W) {
    HAND.forEach(function (e) {
      var cx = ox + e[0] * s, cy = oy + e[1] * s, rot = e[4] * Math.PI / 180;
      if (mirror) { cx = W - cx; rot = -rot; }
      /* 每个椭圆单独成子路径再合并，否则 ellipse() 会从上一个点连线，
         nonzero 填充下这些连线会把并集搅坏 */
      var sub = new Path2D();
      sub.ellipse(cx, cy, e[2] * s, e[3] * s, rot, 0, Math.PI * 2);
      path.addPath(sub);
    });
  }

  function paintHands(canvas) {
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

    /* 竖屏时两只手改为「捧住」中间的文字：缩小、上移、少往外挪 */
    var portrait = H > W;
    var s = portrait
      ? W * 0.50 / HAND_W
      : Math.min(H * 0.56 / HAND_H, W * 0.38 / HAND_W);
    var oy = portrait ? H * 0.40 - HAND_H * s / 2 : (H - HAND_H * s) / 2;
    var ox = -HAND_W * s * (portrait ? 0.06 : 0.17);

    var left = new Path2D(), right = new Path2D();
    addHand(left, s, ox, oy, false, W);
    addHand(right, s, ox, oy, true, W);

    /* 1) 先算布尔网格，边缘检测就不用再调 isPointInPath */
    var step = Math.round((cssW < 760 ? 7 : 9) * dpr);
    var cols = Math.ceil(W / step) + 1, rows = Math.ceil(H / step) + 1;
    var grid = new Uint8Array(cols * rows);      // 0 空 / 1 左手 / 2 右手
    var i, j, x, y, idx;
    for (j = 0; j < rows; j++) {
      y = j * step;
      for (i = 0; i < cols; i++) {
        x = i * step;
        idx = j * cols + i;
        if (ctx.isPointInPath(left, x, y)) grid[idx] = 1;
        else if (ctx.isPointInPath(right, x, y)) grid[idx] = 2;
      }
    }

    /* 2) 绘制。指尖方向逐渐变小变淡，边缘随机掉点，做出手绘颗粒感 */
    var reach = W * (portrait ? 0.46 : 0.34);
    ctx.fillStyle = '#17181D';
    for (j = 0; j < rows; j++) {
      for (i = 0; i < cols; i++) {
        idx = j * cols + i;
        var side = grid[idx];
        if (!side) continue;

        var r0 = rand(i, j);
        if (r0 > 0.95) continue;                       // 整体留一点空隙

        x = i * step; y = j * step;
        var t = (side === 1 ? x : W - x) / reach;      // 0 掌根 → 1 指尖
        t = t < 0 ? 0 : (t > 1 ? 1 : t);

        var edge = !grid[idx - 1] || !grid[idx + 1] ||
                   (j > 0 && !grid[idx - cols]) || (j < rows - 1 && !grid[idx + cols]);
        if (edge && r0 > 0.62) continue;               // 边缘更稀

        var r = step * 0.2 * (0.62 + 0.76 * r0) * (1 - 0.38 * t);
        if (edge) r *= 0.62;

        ctx.globalAlpha = Math.max(0.16, 0.88 - 0.52 * t) * (edge ? 0.7 : 1);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  /* ==========================================================
     二、蟑螂运动
     键盘：按住方向键给方向向量；鼠标：点击设目标点，自动爬过去。
     朝向按最短弧插值，避免 180° 瞬转。
     ========================================================== */
  function createRoach(root, el, shadow, hintKeys) {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var W = root.clientWidth, H = root.clientHeight;
    var pad = 46;

    var pos = { x: W / 2, y: H * 0.79 };
    var target = null;                 // 鼠标目标点
    var keys = Object.create(null);
    var angle = -Math.PI / 2;          // 精灵默认头朝上
    var moving = false;
    var raf = 0, last = 0;

    var KEYMAP = {
      ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
      w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0]
    };

    function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

    function paint() {
      var deg = (angle * 180 / Math.PI + 90).toFixed(1);   // 头朝上 → 补 90°
      el.style.transform = 'translate3d(' + pos.x.toFixed(1) + 'px,' + pos.y.toFixed(1) + 'px,0) rotate(' + deg + 'deg)';
      shadow.style.transform = 'translate3d(' + pos.x.toFixed(1) + 'px,' + (pos.y + 17).toFixed(1) + 'px,0)';
    }

    function setMoving(on) {
      if (on === moving) return;
      moving = on;
      if (on) el.setAttribute('data-moving', ''); else el.removeAttribute('data-moving');
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

        var want = Math.atan2(dy, dx);
        var diff = ((want - angle + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
        angle += diff * (reduce ? 1 : Math.min(1, dt * 14));   // 最短弧平滑转向
        setMoving(true);
        paint();
      } else if (moving) {
        setMoving(false);
      }
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

    /* 点阵手 */
    var canvas = root.querySelector('.oh__canvas');
    paintHands(canvas);

    /* 蟑螂 */
    var hintKeys = {};
    root.querySelectorAll('.oh__key').forEach(function (el) { hintKeys[el.getAttribute('data-k')] = el; });
    var roach = createRoach(root, root.querySelector('.oh__roach'), root.querySelector('.oh__shadow'), hintKeys);

    var resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { paintHands(canvas); roach.resize(); }, 140);
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
