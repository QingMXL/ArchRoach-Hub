/* ==========================================================
   Art — 案例封面（内联 SVG，冷灰 + 低饱和粉彩，无外部资源）
   ========================================================== */
(function () {
  'use strict';

  var W = 320, H = 180;
  function bg(c) { return '<rect width="' + W + '" height="' + H + '" fill="' + c + '"/>'; }

  var THUMBS = {
    /* 图纸与草图 */
    plan: function () {
      var s = bg('#F1F1F4') + '<rect x="0" y="0" width="320" height="126" fill="#FAFAFC"/>';
      s += '<g stroke="#CFD1D8" fill="none" stroke-width="1">';
      for (var i = 0; i < 8; i++) s += '<path d="M' + (24 + i * 36) + ' 14V116"/>';
      for (var j = 0; j < 3; j++) s += '<path d="M18 ' + (28 + j * 30) + 'H302"/>';
      s += '<rect x="54" y="38" width="82" height="52"/><rect x="164" y="48" width="66" height="42"/></g>';
      s += '<rect x="0" y="126" width="320" height="54" fill="#E2E3E8"/>';
      s += '<g fill="#CFD1D8"><rect x="18" y="138" width="118" height="12" rx="6"/><rect x="30" y="158" width="150" height="10" rx="5"/></g>';
      s += '<circle cx="256" cy="152" r="22" fill="#EEEAFB"/>';
      return s;
    },
    /* 线框 / 界面草稿 */
    wire: function () {
      var s = bg('#F4F4F7') + '<rect x="10" y="10" width="300" height="160" rx="8" fill="#FFFFFF"/>';
      s += '<g stroke="#CFD1D8" fill="none" stroke-width="1.2">';
      s += '<rect x="26" y="26" width="108" height="60" rx="4"/><rect x="26" y="96" width="50" height="54" rx="4"/>';
      s += '<rect x="84" y="96" width="50" height="54" rx="4"/><rect x="152" y="26" width="132" height="22" rx="4"/>';
      s += '<rect x="152" y="58" width="132" height="12" rx="4"/><rect x="152" y="80" width="86" height="12" rx="4"/>';
      s += '<rect x="152" y="106" width="132" height="44" rx="4"/></g>';
      s += '<g fill="#E8F3FB"><rect x="32" y="32" width="62" height="8" rx="4"/><rect x="158" y="112" width="74" height="8" rx="4"/></g>';
      s += '<rect x="152" y="26" width="42" height="22" rx="4" fill="#EEEAFB"/>';
      return s;
    },
    /* 数据图表 */
    chart: function () {
      var s = bg('#FAFAFC') + '<rect x="0" y="0" width="320" height="180" fill="#F8F8FA"/>';
      s += '<g stroke="#E2E3E8" stroke-width="1"><path d="M26 150H300"/><path d="M26 110H300"/><path d="M26 70H300"/></g>';
      var hs = [46, 78, 34, 96, 62, 110, 84];
      var cols = ['#DFD8F5', '#D6EAF7', '#F5DCC8', '#D6EBDD', '#DFD8F5', '#D6EAF7', '#EFD5E1'];
      for (var i = 0; i < hs.length; i++) {
        s += '<rect x="' + (34 + i * 38) + '" y="' + (150 - hs[i]) + '" width="24" height="' + hs[i] + '" rx="5" fill="' + cols[i] + '"/>';
      }
      s += '<path d="M46 96 84 66l38 26 38-40 38 18 38-32 38 22" fill="none" stroke="#B9632E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/>';
      return s;
    },
    /* 便签墙 */
    wall: function () {
      var s = bg('#F1F1F4') + '<rect width="320" height="180" fill="#FAFAFC"/>';
      var tones = ['#EEEAFB', '#E8F3FB', '#FBEBDD', '#EAF5EE'];
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 6; c++) {
          s += '<rect x="' + (16 + c * 50) + '" y="' + (18 + r * 52) + '" width="40" height="38" rx="4" fill="' +
               tones[(r + c) % 4] + '" transform="rotate(' + (((r + c) % 3) - 1) * 1.6 + ' ' + (36 + c * 50) + ' ' + (37 + r * 52) + ')"/>';
        }
      }
      s += '<rect x="0" y="166" width="320" height="14" fill="#E2E3E8"/>';
      return s;
    },
    /* 工位 / 桌面 */
    desk: function () {
      return bg('#F4F4F7') +
        '<rect width="320" height="96" fill="#FAFAFC"/>' +
        '<rect y="96" width="320" height="84" fill="#E7E3DC"/>' +
        '<rect x="26" y="96" width="150" height="84" fill="#EFEBE4"/>' +
        '<rect x="188" y="26" width="106" height="70" rx="8" fill="#E2E3E8"/>' +
        '<rect x="198" y="36" width="86" height="50" rx="4" fill="#FAFAFC"/>' +
        '<path d="M60 62c0-14 9-24 22-24s22 10 22 24v34H60z" fill="#DFD8F5"/>' +
        '<rect x="38" y="124" width="96" height="12" rx="6" fill="#CFC9BE"/>' +
        '<g fill="#D6EBDD"><circle cx="248" cy="128" r="17"/></g>' +
        '<rect x="244" y="128" width="8" height="34" fill="#C9C2B5"/>';
    },
    /* 建筑内景 */
    interior: function () {
      return bg('#EEEEF2') +
        '<path d="M0 0h320v70c-64 20-128 20-192 34S38 128 0 124Z" fill="#FAFAFC"/>' +
        '<path d="M0 86h320v26H0Z" fill="#E2E3E8"/>' +
        '<path d="M34 180V72c0-9 7-14 18-14h48c11 0 18 5 18 14v108Z" fill="#DDDEE4"/>' +
        '<path d="M56 180V86h42v94Z" fill="#FAFAFC"/>' +
        '<path d="M176 180V64l144-24v140Z" fill="#D3D5DC"/>' +
        '<path d="M202 180V72l58-10v118Z" fill="#EEEEF2"/>' +
        '<g fill="#D6EBDD"><circle cx="146" cy="140" r="20"/><circle cx="170" cy="152" r="13"/></g>' +
        '<rect y="164" width="320" height="16" fill="#C9CBD3"/>';
    },
    /* 景观 */
    landscape: function () {
      var s = bg('#EAF5EE') + '<rect width="320" height="48" fill="#F3F8F5"/>';
      for (var i = 0; i < 5; i++) {
        var y = 52 + i * 26;
        s += '<path d="M0 ' + y + 'c60-13 120 13 180 0s100-15 140-2v15c-60-11-104 6-152 15S48 88 0 ' + (y + 17) + 'Z" fill="' +
             (i % 2 ? '#CFE3D7' : '#B9D2C4') + '"/>';
      }
      s += '<rect x="128" y="48" width="52" height="132" fill="#F5F9F7" opacity=".9"/>';
      s += '<circle cx="44" cy="32" r="15" fill="#B9D2C4"/><circle cx="272" cy="26" r="11" fill="#B9D2C4"/>';
      return s;
    },
    /* 中庭 */
    atrium: function () {
      return bg('#EEEEF2') +
        '<path d="M0 0h320v58c-70 22-250 22-320 0Z" fill="#FCFCFD"/>' +
        '<path d="M0 58c70 22 250 22 320 0v14c-70 22-250 22-320 0Z" fill="#E2E3E8"/>' +
        '<g fill="#F4F4F7"><path d="M22 180V82h28v98ZM82 180V78h28v102ZM196 180V78h28v102ZM256 180V82h28v98Z"/></g>' +
        '<path d="M124 180v-44a30 30 0 0 1 60 0v44Z" fill="#FAFAFC"/>' +
        '<rect y="158" width="320" height="22" fill="#CFD1D8"/>' +
        '<g fill="#D6EBDD"><circle cx="66" cy="144" r="12"/><circle cx="248" cy="146" r="10"/></g>';
    },
    /* 木质空间 */
    wood: function () {
      var s = bg('#E8DFD4');
      for (var i = 0; i < 12; i++) {
        s += '<path d="M0 ' + (i * 15) + 'q160 ' + (10 + i * 2) + ' 320-5v9q-160 16-320 5Z" fill="' +
             (i % 2 ? '#DCD0C1' : '#EFE7DC') + '"/>';
      }
      s += '<rect x="196" width="124" height="180" fill="#FBEBDD" opacity=".5"/>';
      s += '<rect y="140" width="320" height="40" fill="#D3C6B5" opacity=".7"/>';
      return s;
    },
    /* 绿植与窗 */
    plant: function () {
      return bg('#F4F4F7') +
        '<rect x="180" width="140" height="180" fill="#FAFAFC"/>' +
        '<g stroke="#E2E3E8" stroke-width="2" fill="none"><path d="M180 0v180M250 0v180M180 82h140"/></g>' +
        '<rect y="116" width="184" height="64" fill="#E7E3DC"/>' +
        '<rect width="180" height="116" fill="#EEEEF2"/>' +
        '<g fill="#B9D2C4"><circle cx="70" cy="64" r="28"/><circle cx="42" cy="86" r="18"/><circle cx="102" cy="88" r="16"/></g>' +
        '<path d="M60 92h20v30H60Z" fill="#CFC9BE"/>' +
        '<rect x="118" y="128" width="52" height="10" rx="5" fill="#CFC9BE"/>';
    }
  };

  function thumb(kind, tagsHtml) {
    var fn = THUMBS[kind] || THUMBS.plan;
    return '<span class="thumb">' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + fn() + '</svg>' +
      (tagsHtml ? '<span class="thumb__tags">' + tagsHtml + '</span>' : '') +
      '</span>';
  }

  window.ART = { thumb: thumb };
})();
