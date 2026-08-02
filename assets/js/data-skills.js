/* ==========================================================
   Data — 建筑能力迁移词典（12 条）
   ========================================================== */
(function () {
  'use strict';
  function p(zh, en) { return { zh: zh, en: en }; }

  window.SKILL_CATS = [
    { v: 'all', label: p('全部能力', 'All skills') },
    { v: 'research', label: p('研究', 'Research') },
    { v: 'design', label: p('设计', 'Design') },
    { v: 'collab', label: p('协作', 'Collaboration') },
    { v: 'express', label: p('表达', 'Communication') },
    { v: 'pm', label: p('项目管理', 'Project management') }
  ];

  window.DATA_SKILLS = [
    {
      id: 's1', cat: 'research', icon: 'i-search', toIcon: 'i-cube',
      from: p('场地调研', 'Site research'), to: p('用户研究', 'User research'),
      desc: p('通过访谈、观察与数据收集，理解真实需求与行为模式。',
              'Understand real needs and behaviour through interviews, observation and data.'),
      fields: [p('互联网产品', 'Internet products'), p('用户体验', 'UX'), p('市场研究', 'Market research')],
      deep: p('你在场地调研中做的事——踏勘、访谈周边人群、统计人流与使用时段——和用户研究的定性、定量方法几乎一一对应。差别只在于研究对象从物理空间换成了数字产品，以及需要补充一套行业通用的记录与分析模板。',
              'Site surveys, neighbourhood interviews and footfall counts map almost one to one onto qualitative and quantitative user research. The object changes from physical space to a digital product; what you add is the industry-standard toolkit for recording and analysing findings.'),
      dirs: ['ux', 'service']
    },
    {
      id: 's2', cat: 'research', icon: 'i-grid', toIcon: 'i-cube',
      from: p('功能分析', 'Program analysis'), to: p('需求分析', 'Requirement analysis'),
      desc: p('将复杂诉求拆解、归类与优先级排序，形成清晰的需求结构。',
              'Break down, group and prioritise complex asks into a clear requirement structure.'),
      fields: [p('产品经理', 'Product manager'), p('咨询', 'Consulting'), p('数据分析', 'Data analysis')],
      deep: p('任务书里的面积配比、房间关系与使用频次，本质上就是需求优先级。把「甲方想要什么」翻译成「用户真正需要什么」，是产品岗最核心的日常工作。',
              'Area ratios, adjacency and usage frequency in a brief are really requirement priorities. Translating "what the client asked for" into "what the user actually needs" is the daily core of product work.'),
      dirs: ['pm', 'consulting']
    },
    {
      id: 's3', cat: 'design', icon: 'i-cube', toIcon: 'i-bulb',
      from: p('方案设计', 'Scheme design'), to: p('复杂问题解决', 'Complex problem solving'),
      desc: p('在多重约束下提出创造性解决方案，并迭代优化。',
              'Propose creative solutions under multiple constraints, then iterate.'),
      fields: [p('战略咨询', 'Strategy consulting'), p('创新设计', 'Innovation design'), p('产品设计', 'Product design')],
      deep: p('日照、退线、造价、工期、业主偏好——你早就习惯了在互相冲突的约束里找可行解。这套「约束求解」能力换到商业场景同样成立，只是约束条件变成了预算、排期与团队能力。',
              'Daylight, setbacks, budget, schedule, client taste — you already solve for conflicting constraints. The same skill applies in business, where the constraints become budget, roadmap and team capacity.'),
      dirs: ['consulting', 'pm']
    },
    {
      id: 's4', cat: 'collab', icon: 'i-users', toIcon: 'i-clipboard',
      from: p('多专业协调', 'Multi-discipline coordination'), to: p('项目管理', 'Project management'),
      desc: p('协调多方资源与专业，推动项目按计划高质量交付。',
              'Coordinate resources and disciplines to deliver on time and on quality.'),
      fields: [p('项目管理', 'Project management'), p('工程管理', 'Engineering management'), p('运营管理', 'Operations')],
      deep: p('结构、机电、幕墙、景观、施工方、审图——你每天都在做的就是跨职能项目管理，只是没有用这个名字。把它写进简历时，请量化你协调的角色数量、周期与交付质量。',
              'Structure, MEP, façade, landscape, contractors, reviewers — you already run cross-functional projects, just without the title. On a CV, quantify how many roles, how long and what quality you delivered.'),
      dirs: ['pm', 'realestate']
    },
    {
      id: 's5', cat: 'express', icon: 'i-doc', toIcon: 'i-cube',
      from: p('汇报排版', 'Presentation & layout'), to: p('信息表达', 'Information design'),
      desc: p('将复杂信息结构化、可视化，有效传达核心观点。',
              'Structure and visualise complex information to land the core point.'),
      fields: [p('市场营销', 'Marketing'), p('咨询顾问', 'Consulting'), p('企业传播', 'Corporate comms')],
      deep: p('一页汇报要在三秒内讲清方案逻辑，这与商业幻灯片的要求完全一致。你的优势是层级感与版面控制，需要补的是数据图表的规范用法。',
              'A review board must land its logic in three seconds — the same bar as a business slide. Your edge is hierarchy and layout; what to add is disciplined use of data charts.'),
      dirs: ['brand', 'consulting']
    },
    {
      id: 's6', cat: 'design', icon: 'i-layers', toIcon: 'i-cube',
      from: p('效果图 / 模型', 'Renderings & models'), to: p('视觉叙事', 'Visual storytelling'),
      desc: p('用视觉语言讲述故事，增强理解与说服力。',
              'Tell stories visually to strengthen understanding and persuasion.'),
      fields: [p('视觉设计', 'Visual design'), p('品牌设计', 'Brand design'), p('内容策划', 'Content')],
      deep: p('效果图从来不是「画得像」，而是「说服人相信这个未来」。这正是品牌与内容行业每天在做的事。',
              'A rendering was never about realism — it was about making people believe in a future. That is exactly what brand and content teams do.'),
      dirs: ['brand', 'content']
    },
    {
      id: 's7', cat: 'design', icon: 'i-frame', toIcon: 'i-frame',
      from: p('空间与结构思维', 'Spatial & structural thinking'), to: p('信息架构', 'Information architecture'),
      desc: p('组织层级与路径关系，让复杂内容变得可被导航。',
              'Organise hierarchy and routes so complex content becomes navigable.'),
      fields: [p('用户体验', 'UX'), p('产品设计', 'Product design'), p('内容策划', 'Content')],
      deep: p('门厅、走廊、房间、疏散路径——这是空间的信息架构。网站导航、页面层级与用户路径，用的是同一套思维模型。',
              'Lobby, corridor, room, escape route — that is spatial information architecture. Navigation, page hierarchy and user flow use the same mental model.'),
      dirs: ['ux', 'service']
    },
    {
      id: 's8', cat: 'research', icon: 'i-shield', toIcon: 'i-clipboard',
      from: p('规范与政策研究', 'Codes & policy research'), to: p('规则研究与合规', 'Rules research & compliance'),
      desc: p('读懂规则体系，判断边界，形成结构化的合规结论。',
              'Read rule systems, judge boundaries and produce structured compliance conclusions.'),
      fields: [p('ESG', 'ESG'), p('地产投资', 'Real estate'), p('公共部门', 'Public sector')],
      deep: p('你能在几百页规范里迅速定位相关条文并判断适用性，这套能力在 ESG 披露、合规审查与政策研究里同样值钱。',
              'You can locate the right clause in hundreds of pages and judge applicability — equally valuable in ESG disclosure, compliance review and policy research.'),
      dirs: ['sustain', 'realestate']
    },
    {
      id: 's9', cat: 'collab', icon: 'i-chat', toIcon: 'i-users',
      from: p('业主沟通', 'Client communication'), to: p('客户与干系人管理', 'Stakeholder management'),
      desc: p('在期望、成本与可行性之间建立共识。',
              'Build consensus between expectation, cost and feasibility.'),
      fields: [p('咨询', 'Consulting'), p('销售', 'Sales'), p('品牌策略', 'Brand strategy')],
      deep: p('把「业主临时改需求」处理好的人，在任何行业都是稀缺资源。请把这类经历写成一次具体的谈判与共识重建。',
              'Anyone who can handle a late client change is scarce in any industry. Write it up as a concrete negotiation and consensus rebuild.'),
      dirs: ['consulting', 'brand']
    },
    {
      id: 's10', cat: 'pm', icon: 'i-clock', toIcon: 'i-clipboard',
      from: p('进度与出图管理', 'Schedule & deliverable control'), to: p('交付节奏管理', 'Delivery cadence'),
      desc: p('在固定节点前对齐资源、控制质量与风险。',
              'Align resources, quality and risk ahead of fixed milestones.'),
      fields: [p('项目经理', 'Project manager'), p('产品运营', 'Product ops'), p('工程管理', 'Engineering')],
      deep: p('出图节点就是版本发布，晒图审查就是上线评审。把节奏管理经验换成敏捷语言，几乎不需要重新学习。',
              'A drawing deadline is a release; a design review is a launch review. Recast cadence management into agile language and little relearning is needed.'),
      dirs: ['pm', 'realestate']
    },
    {
      id: 's11', cat: 'express', icon: 'i-bulb', toIcon: 'i-tag',
      from: p('概念立意', 'Concept development'), to: p('品牌定位与叙事', 'Positioning & narrative'),
      desc: p('把抽象价值提炼成一句能被记住的主张。',
              'Distil abstract value into one memorable proposition.'),
      fields: [p('品牌策略', 'Brand strategy'), p('市场营销', 'Marketing'), p('创意策划', 'Creative')],
      deep: p('给方案取名字、写立意、讲故事，这就是品牌工作的日常。差别在于品牌需要更多市场证据来支撑主张。',
              'Naming a scheme, writing its concept, telling its story — that is brand work. The difference is that brands need market evidence behind the claim.'),
      dirs: ['brand', 'content']
    },
    {
      id: 's12', cat: 'pm', icon: 'i-sliders', toIcon: 'i-layers',
      from: p('参数化与工具开发', 'Parametrics & tooling'), to: p('流程自动化', 'Process automation'),
      desc: p('用规则与脚本替代重复劳动，放大团队产能。',
              'Replace repetitive work with rules and scripts to scale team output.'),
      fields: [p('建筑科技', 'ArchTech'), p('数据分析', 'Data analysis'), p('产品技术', 'Product engineering')],
      deep: p('写过 Grasshopper 电池组的人，已经具备了流程抽象与自动化思维，这是从工具使用者走向工具建设者的关键一步。',
              'Anyone who has built a Grasshopper definition already thinks in abstraction and automation — the key step from tool user to tool builder.'),
      dirs: ['archtech', 'ai']
    }
  ];

  /** 能力迁移页右侧「相关方向与岗位」 */
  window.SKILL_RELATED = [
    {
      icon: 'i-clipboard', dir: 'ux',
      title: p('用户研究 / 体验设计', 'User research / Experience design'),
      desc: p('通过研究与同理心，打造更好的产品体验。', 'Build better product experiences through research and empathy.'),
      jobs: p('用户研究员、体验设计师、产品经理', 'UX researcher, experience designer, PM')
    },
    {
      icon: 'i-user', dir: 'pm',
      title: p('产品管理', 'Product management'),
      desc: p('连接用户、技术与商业，推动产品成功。', 'Connect users, technology and business to make products work.'),
      jobs: p('产品经理、产品运营、需求分析师', 'PM, product ops, business analyst')
    },
    {
      icon: 'i-building', dir: 'consulting',
      title: p('战略咨询', 'Strategy consulting'),
      desc: p('用结构化思维解决复杂业务问题。', 'Solve complex business problems with structure.'),
      jobs: p('咨询顾问、战略分析师、行业研究员', 'Consultant, strategy analyst, industry researcher')
    },
    {
      icon: 'i-clipboard', dir: 'realestate',
      title: p('项目管理', 'Project management'),
      desc: p('计划、协调、交付，让复杂项目有序推进。', 'Plan, coordinate and deliver complex projects.'),
      jobs: p('项目经理、项目协调员、PMO', 'Project manager, coordinator, PMO')
    },
    {
      icon: 'i-compass', dir: 'brand',
      title: p('设计与视觉传达', 'Design & visual communication'),
      desc: p('用视觉语言沟通价值，影响决策与认知。', 'Communicate value visually to shift decisions and perception.'),
      jobs: p('视觉设计师、品牌设计师、内容策划', 'Visual designer, brand designer, content strategist')
    }
  ];
})();
