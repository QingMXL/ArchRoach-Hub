/* ==========================================================
   i18n — 中文为主，英文为辅
     T('nav.cases')            界面文案
     L({ zh: '…', en: '…' })   双语内容字段
   ========================================================== */
(function () {
  'use strict';

  var DICT = {
    zh: {
      'a11y.skip': '跳到主要内容',

      'nav.home': '首页', 'nav.directions': '转行方向', 'nav.cases': '真实案例',
      'nav.mentors': '前辈咨询', 'nav.skills': '能力迁移词典', 'nav.resources': '资源库',
      'nav.roadmap': '路线图', 'nav.favorites': '收藏夹', 'nav.mine': '我的',
      'nav.bookings': '我的预约', 'nav.profile': '我的资料', 'nav.files': '我的文件',
      'nav.messages': '消息', 'nav.settings': '设置',

      'side.helpT': '遇到困惑？', 'side.helpD': '找前辈聊聊吧',
      'side.helpCta': '立即咨询', 'side.legal': '隐私政策 · 使用条款',

      'top.searchLabel': '全站搜索', 'top.searchPh': '搜索方向、案例、前辈或关键词…', 'top.me': '建筑蟑螂',
      'search.dir': '转行方向', 'search.case': '真实案例', 'search.mentor': '前辈', 'search.job': '招聘岗位',
      'search.empty': '没有找到相关内容', 'search.hint': '试试「产品经理」「作品集」「UX」',

      'c.viewAll': '查看全部', 'c.more': '更多', 'c.detail': '查看详情', 'c.book': '预约咨询',
      'c.reset': '清空筛选', 'c.all': '全部', 'c.months': '个月', 'c.cases': '案例',
      'c.mentors': '前辈', 'c.prep': '准备周期', 'c.portfolio': '作品集', 'c.fit': '适配度',
      'c.need': '需要', 'c.suggest': '建议有', 'c.optional': '非必需',
      'c.high': '高', 'c.mid': '中', 'c.low': '低',
      'c.back': '返回', 'c.next': '下一步', 'c.prev': '上一步', 'c.submit': '提交',
      'c.emptyT': '这里还什么都没有', 'c.emptyD': '换个筛选条件，或先去看看别的方向。',
      'c.noResultT': '没有找到匹配的内容', 'c.noResultD': '试试减少筛选条件，或换一个关键词。',
      'c.notFound': '页面走丢了', 'c.notFoundD': '这条路径还没铺好，先回首页看看吧。',
      'c.backHome': '返回首页', 'c.save': '收藏', 'c.saved': '已收藏',
      'c.years': '年', 'c.people': '人', 'c.consultable': '可咨询', 'c.exp': '经验',

      'home.title': '探索你的转行路径',
      'home.lede': '从建筑到更多可能，我们陪你一起重新出发',
      'home.q1t': '能力测评', 'home.q1d': '发现你的潜力方向',
      'home.q2t': '上传简历 / 作品集', 'home.q2d': '获取针对性建议',
      'home.q3t': '找前辈咨询', 'home.q3d': '1v1 聊聊你的疑问',
      'home.hotDirs': '热门转行方向', 'home.cases': '真实案例推荐',
      'home.mentors': '可咨询的前辈', 'home.jobs': '适合建筑背景的机会',
      'home.moreCases': '更多案例', 'home.moreMentors': '更多前辈', 'home.allDirs': '查看全部',
      'home.allDirsSub': '12+ 方向',

      'dir.title': '转行方向',
      'dir.lede': '为建筑背景的你，找到更多可能。探索不同领域的职业方向，发现更适合你的下一站。',
      'dir.count': '全部方向（{n}）',
      'dir.colName': '方向', 'dir.colFit': '适配度', 'dir.colPortfolio': '作品集要求',
      'dir.colPrep': '准备周期', 'dir.colCases': '案例数', 'dir.colMentors': '前辈数',
      'dir.hot': '热门方向', 'dir.new': '新增方向', 'dir.sort': '推荐排序',
      'dir.calloutT': '你也可以从能力出发',
      'dir.calloutD': '不确定选哪个方向？先看看你的核心能力可以迁移到哪些职位。',
      'dir.calloutCta': '探索能力迁移',

      'dd.tabOverview': '概览', 'dd.tabSkills': '能力迁移', 'dd.tabPrep': '准备指南',
      'dd.tabCases': '真实案例', 'dd.tabMentors': '可咨询前辈', 'dd.tabJobs': '招聘机会',
      'dd.whatT': '这个岗位在做什么', 'dd.advT': '建筑背景的优势',
      'dd.gapT': '你需要补充的能力', 'dd.entryT': '常见进入路径',
      'dd.xferT': '建筑能力如何迁移', 'dd.pfT': '作品集准备', 'dd.cvT': 'CV 改写建议',
      'dd.interviewT': '面试如何讲能力迁移', 'dd.fullGuide': '查看完整路径',
      'dd.relatedRoles': '常见岗位',

      'case.title': '真实案例',
      'case.lede': '来自建筑人的真实转行路径，看看他们如何准备、选择与突破。',
      'case.all': '全部案例', 'case.consultable': '可咨询', 'case.featured': '精选案例',
      'case.count': '全部案例（{n}）', 'case.prepTime': '准备时间', 'case.from': '原岗位',
      'case.to': '当前', 'case.author': '作者', 'case.read': '阅读',
      'case.sortNew': '最新发布', 'case.loadMore': '加载更多',
      'case.toc': '目录', 'case.keydata': '关键数据', 'case.tags': '相关标签',
      'case.applied': '投递数量', 'case.interviews': '面试数量', 'case.offers': 'offer 数量',
      'case.cycle': '转行周期', 'case.askTa': '咨询 TA', 'case.related': '相关案例',

      'skill.title': '能力迁移词典',
      'skill.lede': '把建筑学的专业能力，翻译成更广阔职场的通用语言。',
      'skill.cats': '能力类别', 'skill.all': '全部能力',
      'skill.colFrom': '建筑中的能力', 'skill.colTo': '迁移后的职场能力',
      'skill.colDesc': '能力说明', 'skill.colFields': '可迁移至',
      'skill.count': '共 {n} 项能力映射，持续更新中',
      'skill.deep': '深度解析', 'skill.relDirs': '相关方向',

      'mentor.title': '前辈咨询',
      'mentor.lede': '与走过相似路径的前辈聊一聊，少走弯路，更快找到方向。',
      'mentor.matched': '为你匹配', 'mentor.new': '新加入', 'mentor.all': '全部前辈',
      'mentor.count': '全部前辈（{n}）', 'mentor.canHelp': '可提供帮助',
      'mentor.perMin': '/ 60 分钟', 'mentor.served': '{n} 次咨询',
      'mentor.next': '下次可约', 'mentor.reviews': '（{n} 次咨询）',
      'mentor.intro': '个人简介', 'mentor.topics': '擅长主题', 'mentor.services': '咨询服务',
      'mentor.bg': '建筑背景', 'mentor.now': '现任', 'mentor.rating': '评分',

      'bk.title': '预约咨询',
      'bk.s1': '选择服务', 'bk.s2': '填写信息', 'bk.s3': '确认订单', 'bk.s4': '支付',
      'bk.pickTime': '选择时间', 'bk.tz': '时区：北京时间（UTC+8）',
      'bk.formT': '请填写你的基本信息',
      'bk.title2': '称呼', 'bk.gender': '性别', 'bk.male': '先生', 'bk.female': '女士', 'bk.other': '其他',
      'bk.role': '你的当前岗位（可选）', 'bk.rolePh': '例如：建筑师 / 应届生',
      'bk.years': '工作年限', 'bk.yearsPh': '请选择',
      'bk.q': '你的咨询问题或希望解决的核心问题',
      'bk.qPh': '请详细描述你的问题，方便前辈更好地准备',
      'bk.upload': '上传简历 / 作品集（可选）',
      'bk.dropT': '点击上传或拖拽文件到此处，支持 PDF / PPT / 图片',
      'bk.dropS': '文件大小不超过 50MB',
      'bk.uploaded': '已选择：{n}',
      'bk.orderT': '订单摘要', 'bk.service': '咨询形式', 'bk.time': '预约时间',
      'bk.duration': '时长', 'bk.amount': '金额', 'bk.total': '合计',
      'bk.pay': '确认并支付', 'bk.agree': '支付即表示同意《前辈咨询服务协议》',
      'bk.needSlot': '请先选择一个时段', 'bk.needName': '请填写称呼',
      'bk.done': '预约已提交，我们会通过消息发送会议链接。',
      'bk.assure': '安心保障',
      'bk.a1': '隐私保护', 'bk.a1d': '资料仅用于本次咨询',
      'bk.a2': '实名审核', 'bk.a2d': '前辈身份与经历已审核',
      'bk.a3': '不满意可退款', 'bk.a3d': '未开始前可全额退款',
      'bk.faq': '常见问题',

      'res.title': '资源库',
      'res.lede': '招聘机会、准备指南与工具模板，持续更新。',
      'res.jobs': '招聘机会', 'res.guides': '准备指南', 'res.tools': '工具与模板',
      'res.jobCount': '共 {n} 个岗位', 'res.acceptArch': '接受建筑背景', 'res.needPf': '需要作品集',
      'res.colRole': '岗位', 'res.colReq': '关键要求', 'res.colPay': '薪资',
      'res.guideCta': '打开指南',

      'road.title': '路线图',
      'road.lede': '把「我想转行」拆成可执行的六步，每一步都有对应的页面与工具。',
      'road.tip': '这是建议顺序，你可以从任意一步开始。',

      'me.title': '个人中心', 'me.editProfile': '编辑资料',
      'me.tabBookings': '我的预约', 'me.tabProfile': '我的资料', 'me.tabFiles': '我的文件',
      'me.tabFavorites': '收藏夹', 'me.tabMessages': '消息',
      'me.statBookings': '我的预约', 'me.statFavorites': '收藏内容',
      'me.statDirs': '关注方向', 'me.statFiles': '上传文件',
      'me.filterAll': '全部状态', 'me.paid': '待支付', 'me.confirmed': '已确认',
      'me.finished': '已完成', 'me.pay': '去支付', 'me.viewDetail': '查看详情',
      'me.identity': '身份', 'me.major': '专业', 'me.city': '城市', 'me.target': '目标方向',
      'me.saveProfile': '保存资料', 'me.savedProfile': '资料已保存',
      'me.uploadFile': '上传文件', 'me.fileNote': '文件仅对订单双方可见，默认 30 天后自动删除。',
      'me.noFav': '还没有收藏内容', 'me.noFavD': '在方向、案例或前辈页面点击收藏，就会出现在这里。',
      'me.msgAll': '全部消息', 'me.reply': '回复'
    },

    en: {
      'a11y.skip': 'Skip to main content',

      'nav.home': 'Home', 'nav.directions': 'Career Paths', 'nav.cases': 'Real Stories',
      'nav.mentors': 'Mentors', 'nav.skills': 'Skill Transfer', 'nav.resources': 'Resources',
      'nav.roadmap': 'Roadmap', 'nav.favorites': 'Saved', 'nav.mine': 'Mine',
      'nav.bookings': 'My bookings', 'nav.profile': 'My profile', 'nav.files': 'My files',
      'nav.messages': 'Messages', 'nav.settings': 'Settings',

      'side.helpT': 'Feeling stuck?', 'side.helpD': 'Talk to someone ahead of you',
      'side.helpCta': 'Book a session', 'side.legal': 'Privacy · Terms',

      'top.searchLabel': 'Global search', 'top.searchPh': 'Search paths, stories, mentors…', 'top.me': 'ArchRoach',
      'search.dir': 'Career paths', 'search.case': 'Stories', 'search.mentor': 'Mentors', 'search.job': 'Jobs',
      'search.empty': 'Nothing matched', 'search.hint': 'Try "product", "portfolio" or "UX"',

      'c.viewAll': 'View all', 'c.more': 'More', 'c.detail': 'View details', 'c.book': 'Book',
      'c.reset': 'Reset', 'c.all': 'All', 'c.months': 'mo', 'c.cases': 'stories',
      'c.mentors': 'mentors', 'c.prep': 'Prep time', 'c.portfolio': 'Portfolio', 'c.fit': 'Fit',
      'c.need': 'Required', 'c.suggest': 'Suggested', 'c.optional': 'Optional',
      'c.high': 'High', 'c.mid': 'Medium', 'c.low': 'Low',
      'c.back': 'Back', 'c.next': 'Next', 'c.prev': 'Previous', 'c.submit': 'Submit',
      'c.emptyT': 'Nothing here yet', 'c.emptyD': 'Change a filter, or explore another direction.',
      'c.noResultT': 'No matching results', 'c.noResultD': 'Try removing a filter or changing the keyword.',
      'c.notFound': 'Page not found', 'c.notFoundD': 'This path is not paved yet — head back home.',
      'c.backHome': 'Back to home', 'c.save': 'Save', 'c.saved': 'Saved',
      'c.years': 'yrs', 'c.people': '', 'c.consultable': 'Available', 'c.exp': 'exp',

      'home.title': 'Explore your next path',
      'home.lede': 'From architecture to many more possibilities — we walk it with you',
      'home.q1t': 'Skill check', 'home.q1d': 'Find directions that fit you',
      'home.q2t': 'Upload CV / portfolio', 'home.q2d': 'Get targeted feedback',
      'home.q3t': 'Talk to a mentor', 'home.q3d': '1-on-1 on your real questions',
      'home.hotDirs': 'Popular directions', 'home.cases': 'Featured stories',
      'home.mentors': 'Mentors available', 'home.jobs': 'Roles open to architects',
      'home.moreCases': 'More stories', 'home.moreMentors': 'More mentors', 'home.allDirs': 'View all',
      'home.allDirsSub': '12+ paths',

      'dir.title': 'Career Paths',
      'dir.lede': 'More possibilities for your architecture background. Explore directions across fields and find your next stop.',
      'dir.count': 'All paths ({n})',
      'dir.colName': 'Direction', 'dir.colFit': 'Fit', 'dir.colPortfolio': 'Portfolio',
      'dir.colPrep': 'Prep time', 'dir.colCases': 'Stories', 'dir.colMentors': 'Mentors',
      'dir.hot': 'Trending', 'dir.new': 'Newly added', 'dir.sort': 'Recommended',
      'dir.calloutT': 'You can also start from your skills',
      'dir.calloutD': 'Not sure which direction? See where your core skills can transfer first.',
      'dir.calloutCta': 'Explore skill transfer',

      'dd.tabOverview': 'Overview', 'dd.tabSkills': 'Skill transfer', 'dd.tabPrep': 'Preparation',
      'dd.tabCases': 'Stories', 'dd.tabMentors': 'Mentors', 'dd.tabJobs': 'Jobs',
      'dd.whatT': 'What the role actually does', 'dd.advT': 'Where architects have an edge',
      'dd.gapT': 'Skills you need to add', 'dd.entryT': 'Common entry routes',
      'dd.xferT': 'How architecture skills transfer', 'dd.pfT': 'Portfolio preparation', 'dd.cvT': 'CV rewriting',
      'dd.interviewT': 'Telling the story in interviews', 'dd.fullGuide': 'See the full path',
      'dd.relatedRoles': 'Typical roles',

      'case.title': 'Real Stories',
      'case.lede': 'Real transition paths from architecture people — how they prepared, chose and broke through.',
      'case.all': 'All stories', 'case.consultable': 'Available to consult', 'case.featured': 'Featured',
      'case.count': 'All stories ({n})', 'case.prepTime': 'Prep', 'case.from': 'From',
      'case.to': 'Now', 'case.author': 'By', 'case.read': 'Read',
      'case.sortNew': 'Newest', 'case.loadMore': 'Load more',
      'case.toc': 'Contents', 'case.keydata': 'Key numbers', 'case.tags': 'Related tags',
      'case.applied': 'Applications', 'case.interviews': 'Interviews', 'case.offers': 'Offers',
      'case.cycle': 'Total time', 'case.askTa': 'Ask them', 'case.related': 'Related stories',

      'skill.title': 'Skill Transfer Dictionary',
      'skill.lede': 'Translate architectural expertise into the shared language of the wider job market.',
      'skill.cats': 'Categories', 'skill.all': 'All skills',
      'skill.colFrom': 'In architecture', 'skill.colTo': 'In the workplace',
      'skill.colDesc': 'What it means', 'skill.colFields': 'Transfers to',
      'skill.count': '{n} skill mappings, updated continuously',
      'skill.deep': 'Deep dive', 'skill.relDirs': 'Related paths',

      'mentor.title': 'Mentors',
      'mentor.lede': 'Talk with someone who walked a similar path — fewer detours, faster clarity.',
      'mentor.matched': 'Matched for you', 'mentor.new': 'Newly joined', 'mentor.all': 'All mentors',
      'mentor.count': 'All mentors ({n})', 'mentor.canHelp': 'Can help with',
      'mentor.perMin': '/ 60 min', 'mentor.served': '{n} sessions',
      'mentor.next': 'Next slot', 'mentor.reviews': '({n} sessions)',
      'mentor.intro': 'About', 'mentor.topics': 'Specialties', 'mentor.services': 'Services',
      'mentor.bg': 'Architecture background', 'mentor.now': 'Now', 'mentor.rating': 'Rating',

      'bk.title': 'Book a session',
      'bk.s1': 'Service', 'bk.s2': 'Your details', 'bk.s3': 'Review', 'bk.s4': 'Payment',
      'bk.pickTime': 'Pick a time', 'bk.tz': 'Timezone: Beijing (UTC+8)',
      'bk.formT': 'Tell us a bit about you',
      'bk.title2': 'Name', 'bk.gender': 'Title', 'bk.male': 'Mr', 'bk.female': 'Ms', 'bk.other': 'Other',
      'bk.role': 'Current role (optional)', 'bk.rolePh': 'e.g. Architect / new grad',
      'bk.years': 'Experience', 'bk.yearsPh': 'Select',
      'bk.q': 'What do you want to solve in this session?',
      'bk.qPh': 'Describe your question so your mentor can prepare',
      'bk.upload': 'Upload CV / portfolio (optional)',
      'bk.dropT': 'Click or drag a file here — PDF / PPT / images',
      'bk.dropS': 'Up to 50MB',
      'bk.uploaded': 'Selected: {n}',
      'bk.orderT': 'Order summary', 'bk.service': 'Service', 'bk.time': 'Time',
      'bk.duration': 'Duration', 'bk.amount': 'Amount', 'bk.total': 'Total',
      'bk.pay': 'Confirm & pay', 'bk.agree': 'By paying you agree to the Mentor Session Terms.',
      'bk.needSlot': 'Please pick a time slot first', 'bk.needName': 'Please enter your name',
      'bk.done': 'Booked — we will send the meeting link by message.',
      'bk.assure': 'Your safeguards',
      'bk.a1': 'Privacy', 'bk.a1d': 'Used for this session only',
      'bk.a2': 'Verified', 'bk.a2d': 'Identity and history reviewed',
      'bk.a3': 'Refundable', 'bk.a3d': 'Full refund before it starts',
      'bk.faq': 'FAQ',

      'res.title': 'Resources',
      'res.lede': 'Job openings, preparation guides and templates — updated continuously.',
      'res.jobs': 'Open roles', 'res.guides': 'Guides', 'res.tools': 'Tools & templates',
      'res.jobCount': '{n} open roles', 'res.acceptArch': 'Architects welcome', 'res.needPf': 'Portfolio required',
      'res.colRole': 'Role', 'res.colReq': 'Key requirements', 'res.colPay': 'Salary',
      'res.guideCta': 'Open guide',

      'road.title': 'Roadmap',
      'road.lede': 'Six executable steps from "I want to change" — each one maps to a page here.',
      'road.tip': 'A suggested order — you can start anywhere.',

      'me.title': 'My Center', 'me.editProfile': 'Edit profile',
      'me.tabBookings': 'Bookings', 'me.tabProfile': 'Profile', 'me.tabFiles': 'Files',
      'me.tabFavorites': 'Saved', 'me.tabMessages': 'Messages',
      'me.statBookings': 'Bookings', 'me.statFavorites': 'Saved items',
      'me.statDirs': 'Paths followed', 'me.statFiles': 'Files',
      'me.filterAll': 'All status', 'me.paid': 'To pay', 'me.confirmed': 'Confirmed',
      'me.finished': 'Completed', 'me.pay': 'Pay now', 'me.viewDetail': 'Details',
      'me.identity': 'Status', 'me.major': 'Major', 'me.city': 'City', 'me.target': 'Target path',
      'me.saveProfile': 'Save profile', 'me.savedProfile': 'Profile saved',
      'me.uploadFile': 'Upload a file', 'me.fileNote': 'Files are visible only to both parties and deleted after 30 days.',
      'me.noFav': 'Nothing saved yet', 'me.noFavD': 'Tap save on a path, story or mentor and it shows up here.',
      'me.msgAll': 'All messages', 'me.reply': 'Reply'
    }
  };

  var STORE_KEY = 'arh-lang';
  var listeners = [];

  function read() { try { return localStorage.getItem(STORE_KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(STORE_KEY, v); } catch (e) { /* 隐私模式忽略 */ } }

  /** 支持 ?lang=en 深链，方便分享与截图；否则读本地存储 */
  function fromQuery() {
    var m = /[?&]lang=(en|zh)\b/.exec(location.search + location.hash);
    return m ? m[1] : null;
  }

  var current = fromQuery() || (read() === 'en' ? 'en' : 'zh');

  function T(key, vars) {
    var table = DICT[current] || DICT.zh;
    var s = table[key];
    if (s == null) s = (DICT.zh[key] != null ? DICT.zh[key] : key);
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }

  function L(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string' || typeof obj === 'number') return String(obj);
    var v = obj[current];
    return v != null ? v : (obj.zh != null ? obj.zh : '');
  }

  function applyStatic(root) {
    var scope = root || document;
    scope.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = T(el.getAttribute('data-i18n')); });
    scope.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) { el.placeholder = T(el.getAttribute('data-i18n-placeholder')); });
    scope.querySelectorAll('[data-i18n-aria]').forEach(function (el) { el.setAttribute('aria-label', T(el.getAttribute('data-i18n-aria'))); });
  }

  function set(lang) {
    var next = lang === 'en' ? 'en' : 'zh';
    if (next === current) return;
    current = next;
    write(next);
    document.documentElement.lang = next === 'en' ? 'en' : 'zh-CN';
    applyStatic();
    listeners.forEach(function (fn) { fn(next); });
  }

  window.T = T;
  window.L = L;
  window.Lang = {
    get current() { return current; },
    set: set, applyStatic: applyStatic,
    onChange: function (fn) { listeners.push(fn); },
    isZh: function () { return current === 'zh'; }
  };
})();
