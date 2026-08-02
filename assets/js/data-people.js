/* ==========================================================
   Data — 前辈咨询者 / 招聘岗位 / 指南 / 评价
   公开资料遵循 SPEC 08：昵称 + 类别，不公开精确信息
   ========================================================== */
(function () {
  'use strict';
  function p(zh, en) { return { zh: zh, en: en }; }

  /* ---------------- 前辈 ---------------- */
  window.DATA_MENTORS = [
    {
      id: 'azhang', name: p('阿蟑', 'A-Zhang'), pose: 'roach-tie', tone: 'lavender',
      dir: 'pm', price: 299, dur: 60, rating: 4.9, served: 128, verified: true, top: true,
      role: p('产品经理 · 深圳', 'Product Manager · Shenzhen'),
      bg: p('前建筑师 · 现某大厂产品经理', 'Former architect · now PM at a large tech firm'),
      now: p('产品经理', 'Product Manager'), company: p('某互联网大厂', 'A large internet company'),
      arch: p('建筑学硕士 · 3 年方案设计经验', 'M.Arch · 3 years in scheme design'),
      next: p('今天 20:00', 'Today 20:00'),
      bio: p('从建筑方案设计转向互联网产品，熟悉 B 端产品从 0 到 1 的完整流程。擅长帮助建筑背景的同学建立产品思维、把项目经验翻译成产品语言。',
             'Moved from scheme design into internet products, familiar with zero-to-one B2B delivery. I help architecture people build product thinking and translate project experience into product language.'),
      help: [p('用户研究', 'User research'), p('需求分析', 'Requirements'), p('产品落地', 'Delivery')],
      topics: [p('如何从建筑思维切换到互联网产品', 'Switching from architecture to product thinking'),
               p('作品集/简历如何体现产品能力', 'Showing product ability in CV and portfolio'),
               p('产品面试常见问题与结构化表达', 'Common product interview questions'),
               p('在职转行的时间与节奏安排', 'Pacing a transition while still employed')]
    },
    {
      id: 'zhangzhang', name: p('蟑蟑', 'Zhang-Zhang'), pose: 'roach-glasses', tone: 'blue',
      dir: 'ux', price: 259, dur: 60, rating: 4.9, served: 156, verified: true, top: true,
      role: p('UX 设计师 · 上海', 'UX Designer · Shanghai'),
      bg: p('前建筑设计师 · 现 UX 设计师', 'Former architect · now UX designer'),
      now: p('UX 设计师', 'UX Designer'), company: p('某 SaaS 公司', 'A SaaS company'),
      arch: p('建筑学学士 · 4 年施工图与方案', 'B.Arch · 4 years of drawings and schemes'),
      next: p('明天 14:00', 'Tomorrow 14:00'),
      bio: p('用空间思维做体验设计。擅长把建筑项目重构成完整的体验案例，也熟悉零基础转 UX 的学习路径与作品集节奏。',
             'I design experience with a spatial mind. I rebuild architecture projects into experience cases and know the learning path into UX from zero.'),
      help: [p('交互设计', 'Interaction'), p('用户体验', 'UX'), p('作品集', 'Portfolio')],
      topics: [p('作品集从 0 到 1 的搭建顺序', 'Building a portfolio from scratch'),
               p('建筑项目如何改造成体验案例', 'Turning an architecture project into a UX case'),
               p('UX 岗位面试与作品讲述', 'UX interviews and case storytelling'),
               p('工具与方法论的最短学习路径', 'The shortest path through tools and methods')]
    },
    {
      id: 'zhanglaoban', name: p('蟑老板', 'Boss Roach'), pose: 'roach-bow', tone: 'peach',
      dir: 'consulting', price: 399, dur: 60, rating: 4.8, served: 92, verified: true, top: true,
      role: p('咨询顾问 · 北京', 'Consultant · Beijing'),
      bg: p('前建筑事务所合伙人 · 现咨询顾问', 'Former practice partner · now consultant'),
      now: p('咨询顾问', 'Consultant'), company: p('某管理咨询公司', 'A management consultancy'),
      arch: p('建筑学硕士 · 8 年公共建筑与城市更新', 'M.Arch · 8 years in public buildings and renewal'),
      next: p('周三 19:00', 'Wed 19:00'),
      bio: p('从建筑事务所转向管理咨询，擅长结构化拆解与商业表达。适合想进入咨询、研究或战略岗位的同学。',
             'From practice into management consulting. Strong on structured decomposition and business communication — a fit if you aim at consulting, research or strategy.'),
      help: [p('商业分析', 'Business analysis'), p('逻辑思维', 'Structured thinking'), p('案例面试', 'Case interview')],
      topics: [p('Case 面试的准备与练习方法', 'Preparing and drilling case interviews'),
               p('可研报告如何改写成咨询作品', 'Rewriting feasibility studies as consulting work'),
               p('如何判断自己适不适合咨询', 'Whether consulting actually fits you')]
    },
    {
      id: 'roachai', name: p('Roach AI', 'Roach AI'), pose: 'roach-cap', tone: 'mint',
      dir: 'ai', price: 299, dur: 60, rating: 4.7, served: 64, verified: true, top: true,
      role: p('AI 产品经理 · 杭州', 'AI Product Manager · Hangzhou'),
      bg: p('前建筑师 · 现 AI 产品经理', 'Former architect · now AI PM'),
      now: p('AI 产品经理', 'AI Product Manager'), company: p('某 AI 创业公司', 'An AI startup'),
      arch: p('建筑学学士 · 前参数化设计负责人', 'B.Arch · former computational design lead'),
      next: p('周四 10:00', 'Thu 10:00'),
      bio: p('从参数化设计走进 AI 产品。擅长帮建筑人找到技术与设计之间的位置，也熟悉小项目积累经验的转行路径。',
             'From computational design into AI products. I help architects find the seat between technology and design, and grow through small shipped projects.'),
      help: [p('AI 产品', 'AI product'), p('数据思维', 'Data thinking'), p('项目管理', 'Delivery')],
      topics: [p('没有技术背景如何做 AI 产品', 'Doing AI product without an engineering background'),
               p('用小项目积累可展示的经验', 'Building a track record with small projects'),
               p('AI 相关岗位的真实门槛', 'The real bar for AI-adjacent roles')]
    },
    {
      id: 'zhangboshi', name: p('蟑博士', 'Dr. Roach'), pose: 'roach-book', tone: 'lavender',
      dir: 'sustain', price: 299, dur: 60, rating: 4.7, served: 64, verified: false,
      role: p('品牌顾问 · 4A 公司', 'Brand consultant · agency'),
      bg: p('前建筑师 · 现品牌策略', 'Former architect · now brand strategy'),
      now: p('品牌策略顾问', 'Brand Strategist'), company: p('某 4A 广告公司', 'An agency'),
      arch: p('建筑学学士 · 5 年文旅与商业项目', 'B.Arch · 5 years in hospitality and retail'),
      next: p('周五 20:00', 'Fri 20:00'),
      bio: p('概念提炼、叙事结构与客户提案，是建筑人最容易被识别的迁移资产。', 'Concept, narrative and pitching are the most recognisable transferable assets architects have.'),
      help: [p('品牌策略', 'Brand strategy'), p('内容策划', 'Content')],
      topics: [p('如何用三个提案打开品牌行业的门', 'Three pitches that open the brand industry')]
    },
    {
      id: 'zhangjingli', name: p('蟑经理', 'Manager Roach'), pose: 'roach-tie', tone: 'rose',
      dir: 'archtech', price: 299, dur: 60, rating: 4.8, served: 52, verified: false,
      role: p('BIM 负责人 · 数字化设计', 'BIM lead · computational design'),
      bg: p('前建筑师 · 现数字化设计总监', 'Former architect · now director of computational design'),
      now: p('数字化设计总监', 'Director of Computational Design'), company: p('某建筑科技公司', 'An AEC tech company'),
      arch: p('建筑学学士 · 8 年施工图与协同', 'B.Arch · 8 years of drawings and coordination'),
      next: p('周二 19:30', 'Tue 19:30'),
      bio: p('留在行业内做技术转型，是风险最低的一条路。', 'Pivoting technically inside the industry is the lowest-risk route.'),
      help: [p('BIM', 'BIM'), p('参数化', 'Parametrics'), p('流程自动化', 'Automation')],
      topics: [p('从工具使用者到工具建设者', 'From tool user to tool builder')]
    },
    {
      id: 'zhanghuazhang', name: p('蟑华长', 'Roach Chief'), pose: 'roach-hat', tone: 'peach',
      dir: 'realestate', price: 299, dur: 60, rating: 4.6, served: 38, verified: false,
      role: p('设计管理 · 地产开发', 'Design management · development'),
      bg: p('前建筑师 · 现地产设计管理', 'Former architect · now design manager'),
      now: p('设计管理经理', 'Design Manager'), company: p('某地产开发公司', 'A developer'),
      arch: p('建筑学学士 · 6 年住宅与商业项目', 'B.Arch · 6 years in residential and retail'),
      next: p('周一 20:00', 'Mon 20:00'),
      bio: p('行业知识延续，跨度可控，但需要补齐算账的能力。', 'Domain knowledge carries over; what you must add is running the numbers.'),
      help: [p('设计管理', 'Design management'), p('成本测算', 'Cost modelling')],
      topics: [p('设计院转甲方的准备清单', 'A checklist for moving client-side')]
    },
    {
      id: 'zhangxiaoqiang', name: p('蟑小强', 'Xiaoqiang'), pose: 'roach-glasses', tone: 'blue',
      dir: 'service', price: 259, dur: 60, rating: 4.9, served: 44, verified: false,
      role: p('服务设计师 · 上海', 'Service Designer · Shanghai'),
      bg: p('前建筑设计师 · 现服务设计', 'Former architect · now service designer'),
      now: p('服务设计师', 'Service Designer'), company: p('某体验咨询公司', 'An experience consultancy'),
      arch: p('建筑学硕士 · 4 年商业综合体项目', 'M.Arch · 4 years on mixed-use projects'),
      next: p('周日 15:00', 'Sun 15:00'),
      bio: p('你在建筑里做的动线，就是服务设计里的旅程地图。', 'The circulation you drew is a journey map in service design.'),
      help: [p('服务设计', 'Service design'), p('旅程地图', 'Journey mapping')],
      topics: [p('把一个建筑项目重构成服务旅程', 'Rebuilding a project as a service journey')]
    }
  ];

  window.MENTOR_SERVICES = [
    { id: 'career', icon: 'i-video', price: 299, dur: 60,
      name: p('职业咨询 60 分钟', 'Career session · 60 min'),
      desc: p('了解职业方向、制定转行计划', 'Clarify direction and shape a transition plan') },
    { id: 'cv', icon: 'i-doc', price: 299, dur: 60,
      name: p('简历优化 60 分钟', 'CV review · 60 min'),
      desc: p('简历一对一修改与优化建议', 'One-on-one CV rewrite and feedback') },
    { id: 'pf', icon: 'i-folder', price: 299, dur: 60,
      name: p('作品集点评 60 分钟', 'Portfolio critique · 60 min'),
      desc: p('作品集结构与叙事方式建议', 'Structure and narrative feedback on your portfolio') }
  ];

  window.MENTOR_FAQ = [
    { q: p('咨询如何进行？', 'How does a session work?'),
      a: p('支付后你会在「消息」中收到确认；会前 24 小时与 1 小时各有一次提醒，前辈会填写第三方会议链接。',
           'You get a confirmation in Messages after payment, plus reminders 24 hours and 1 hour before. Your mentor adds the meeting link.') },
    { q: p('可以申请退款吗？', 'Can I request a refund?'),
      a: p('咨询开始前可全额退款；会议未发生或服务明显不符时，可在结束后 7 天内提交退款申请。',
           'Full refund before it starts. If the session did not happen or clearly mismatched, request a refund within 7 days.') },
    { q: p('上传的作品集安全吗？', 'Are my files safe?'),
      a: p('文件仅对订单双方可见，默认在订单完成 30 天后自动删除，你也可以随时手动删除。',
           'Files are visible only to the two parties, auto-deleted 30 days after completion, and you can remove them at any time.') }
  ];

  window.DATA_REVIEWS = [
    { name: p('小蟑同学', 'Little Roach'), pose: 'roach', tone: 'rose',
      status: p('转行 UX 设计师 · 进行中', 'Pivoting to UX · in progress'),
      text: p('和前辈聊完后，我对目标岗位的日常工作和能力要求有了非常清晰的认知，也更有信心准备作品集了。',
              'After the session I had a very clear picture of the day-to-day and the bar for the role.') },
    { name: p('蟑同学', 'Roach Student'), pose: 'roach-cap', tone: 'blue',
      status: p('转行产品经理 · 已入职', 'Pivoted to PM · hired'),
      text: p('前辈帮我梳理了项目经验的亮点，还建议了作品集的呈现方式，面试时真的被问到了聊过的内容。',
              'They found the highlights in my experience and reshaped how I present it. The interview covered exactly that.') },
    { name: p('大蟑', 'Big Roach'), pose: 'roach-glasses', tone: 'mint',
      status: p('转行体验设计师 · 已入职', 'Pivoted to experience design · hired'),
      text: p('一对一的交流很真诚，建议都很落地，少走了很多我原本会踩的坑。',
              'Honest and genuinely actionable — it saved me from a lot of mistakes.') }
  ];

  /* ---------------- 招聘岗位 ---------------- */
  window.DATA_JOBS = [
    { id: 'j1', logo: 'K', tone: 'lavender', dir: 'service', city: 'shanghai', pf: false, arch: true,
      title: p('空间设计师（商业空间）', 'Spatial Designer (Retail)'), company: 'Kind Design Lab',
      pay: p('15K - 25K · 13 薪', '15K – 25K'), cityLabel: p('上海', 'Shanghai'), years: '3-8',
      req: [p('具备空间设计思维，熟悉方案深化流程', 'Spatial design thinking, familiar with scheme development'),
            p('有项目或实习经验优先，沟通表达清晰', 'Project or internship experience preferred')] },
    { id: 'j2', logo: 'A', tone: 'blue', dir: 'ux', city: 'beijing', pf: true, arch: true,
      title: p('产品体验设计师（UX）', 'Product Experience Designer (UX)'), company: 'Morph Labs',
      pay: p('18K - 28K · 14 薪', '18K – 28K'), cityLabel: p('北京', 'Beijing'), years: '3-8',
      req: [p('熟悉用户体验设计方法，逻辑清晰', 'Fluent in UX methods with clear reasoning'),
            p('有作品集加分，建筑背景很受欢迎', 'Portfolio a plus; architecture background welcome')] },
    { id: 'j3', logo: 'P', tone: 'peach', dir: 'pm', city: 'shenzhen', pf: false, arch: true, featured: true,
      title: p('产品经理（空间科技方向）', 'Product Manager (Spatial Tech)'), company: 'PXD Tech',
      pay: p('20K - 30K · 15 薪', '20K – 30K'), cityLabel: p('深圳', 'Shenzhen'), years: '3-8',
      req: [p('具备产品思维与跨部门协作能力', 'Product thinking and cross-team collaboration'),
            p('有 ToB 产品或空间相关经验优先', 'B2B or spatial experience preferred')] },
    { id: 'j4', logo: 'B', tone: 'mint', dir: 'archtech', city: 'guangzhou', pf: true, arch: false,
      title: p('BIM 协调工程师', 'BIM Coordination Engineer'), company: 'Colink Tech',
      pay: p('12K - 18K · 13 薪', '12K – 18K'), cityLabel: p('广州', 'Guangzhou'), years: '0-3',
      req: [p('熟悉 Revit / Navisworks 等工具', 'Fluent in Revit / Navisworks'),
            p('具备施工图或 BIM 项目经验优先', 'Drawing or BIM experience preferred')] },
    { id: 'j5', logo: 'D', tone: 'rose', dir: 'ux', city: 'hangzhou', pf: false, arch: true,
      title: p('数据可视化设计师', 'Data Visualisation Designer'), company: 'DataForm Studio',
      pay: p('14K - 22K · 13 薪', '14K – 22K'), cityLabel: p('杭州', 'Hangzhou'), years: '0-3',
      req: [p('擅长信息可视化与空间表达', 'Strong at information visualisation'),
            p('有作品集，熟练使用可视化工具', 'Portfolio required; fluent with viz tools')] },
    { id: 'j6', logo: 'A', tone: 'lavender', dir: 'brand', city: 'shanghai', pf: false, arch: true,
      title: p('品牌策略顾问', 'Brand Strategy Consultant'), company: 'Atelier One',
      pay: p('25K - 35K · 15 薪', '25K – 35K'), cityLabel: p('上海 · 混合办公', 'Shanghai · Hybrid'), years: '3-8',
      req: [p('具备策略思维与表达能力，能进行研究与洞察', 'Strategic thinking with research and insight'),
            p('建筑背景优先，咨询或品牌经验加分', 'Architecture background preferred')] },
    { id: 'j7', logo: 'N', tone: 'peach', dir: 'pm', city: 'beijing', pf: false, arch: true,
      title: p('产品运营（增长方向）', 'Product Operations (Growth)'), company: 'Nova Group',
      pay: p('16K - 26K · 14 薪', '16K – 26K'), cityLabel: p('北京', 'Beijing'), years: '0-3',
      req: [p('数据敏感，具备活动策划与执行能力', 'Data-minded, able to plan and run campaigns'),
            p('跨专业背景欢迎，学习能力优先', 'Cross-discipline backgrounds welcome')] },
    { id: 'j8', logo: 'G', tone: 'mint', dir: 'sustain', city: 'shanghai', pf: false, arch: true,
      title: p('ESG / 碳中和顾问', 'ESG / Carbon Consultant'), company: 'Green Path',
      pay: p('15K - 25K · 13 薪', '15K – 25K'), cityLabel: p('上海', 'Shanghai'), years: '3-8',
      req: [p('熟悉绿色建筑或碳核算相关标准', 'Familiar with green-building or carbon standards'),
            p('具备规范研究与报告写作能力', 'Strong at code research and report writing')] }
  ];

  window.JOB_CITIES = [
    { v: 'beijing', label: p('北京', 'Beijing') }, { v: 'shanghai', label: p('上海', 'Shanghai') },
    { v: 'shenzhen', label: p('深圳', 'Shenzhen') }, { v: 'guangzhou', label: p('广州', 'Guangzhou') },
    { v: 'hangzhou', label: p('杭州', 'Hangzhou') }
  ];

  /* ---------------- 指南 / 工具 ---------------- */
  window.DATA_GUIDES = [
    { id: 'g1', tone: 'lavender', icon: 'i-doc', pose: 'roach-book', count: 8,
      title: p('CV 改写指南', 'CV rewriting guide'),
      desc: p('把建筑项目经历翻译成目标岗位语言', 'Translate project experience into role language') },
    { id: 'g2', tone: 'blue', icon: 'i-folder', pose: 'roach-folder', count: 6,
      title: p('作品集结构模板', 'Portfolio structure templates'),
      desc: p('端到端案例的组织顺序与页面清单', 'How to order an end-to-end case') },
    { id: 'g3', tone: 'peach', icon: 'i-chat', pose: 'roach-guide', count: 12,
      title: p('面试问题库', 'Interview question bank'),
      desc: p('高频问题、回答逻辑与常见质疑', 'Frequent questions, logic and pushbacks') },
    { id: 'g4', tone: 'mint', icon: 'i-clipboard', pose: 'roach', count: 5,
      title: p('行动清单模板', 'Action checklists'),
      desc: p('两周 / 一个月 / 三个月的最小任务', 'Minimum tasks for 2 weeks, 1 month, 3 months') }
  ];

  /* ---------------- 我的预约（示例数据） ---------------- */
  window.DATA_BOOKINGS = [
    { id: 'b1', mentor: 'azhang', svc: p('职业咨询 60 分钟', 'Career session · 60 min'),
      when: '2024-06-02 15:00 – 16:00', status: 'paid', price: 299 },
    { id: 'b2', mentor: 'roachai', svc: p('职业咨询 60 分钟', 'Career session · 60 min'),
      when: '2024-06-05 10:00 – 11:00', status: 'confirmed', price: 299 },
    { id: 'b3', mentor: 'zhangzhang', svc: p('作品集点评 60 分钟', 'Portfolio critique · 60 min'),
      when: '2024-06-10 19:00 – 20:00', status: 'confirmed', price: 259 }
  ];

  window.DATA_MESSAGES = [
    { id: 'm1', mentor: 'azhang', unread: true,
      text: p('收到你的预约啦，会前我会先看一遍你的简历，我们直接聊重点。', 'Got your booking — I will read your CV first so we can go straight to the point.'),
      time: '2024-06-01 18:20' },
    { id: 'm2', mentor: 'zhangzhang', unread: true,
      text: p('作品集第二个项目的过程还可以再展开一点，我们约的时候细说。', 'The second project needs more process — let us dig into it in the session.'),
      time: '2024-05-30 09:12' },
    { id: 'm3', mentor: 'roachai', unread: true,
      text: p('会议链接已生成，记得提前五分钟进入。', 'The meeting link is ready — please join five minutes early.'),
      time: '2024-05-28 21:04' }
  ];

  window.DATA_FILES = [
    { id: 'f1', name: '简历_建筑蟑螂_v3.pdf', size: '1.2 MB', date: '2024-05-28', kind: 'cv' },
    { id: 'f2', name: '作品集_空间到产品.pdf', size: '18.6 MB', date: '2024-05-26', kind: 'pf' },
    { id: 'f3', name: '项目复盘_商业综合体.pdf', size: '4.4 MB', date: '2024-05-12', kind: 'doc' }
  ];
})();
