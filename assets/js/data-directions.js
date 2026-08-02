/* ==========================================================
   Data — 转行方向（10 个首发方向）
   字段说明见 SPEC 09 CareerDirection
   ========================================================== */
(function () {
  'use strict';

  /** 简写：双语对 */
  function p(zh, en) { return { zh: zh, en: en }; }

  window.DATA_DIRECTIONS = [
    {
      id: 'pm', caseCount: 128, mentorCount: 18, icon: 'i-cube', hot: 8.2, match: 4, pf: 'optional',
      name: p('产品经理', 'Product Manager'),
      cat: 'internet', diff: 'mid', salary: [20, 40], years: ['0-3', '3-8'],
      desc: p('连接用户需求与产品价值，推动产品从 0 到 1 落地。',
              'Connect user needs with product value and drive products from zero to one.'),
      say: p('建筑的方案推演，本质就是需求拆解与价值验证。',
             'Scheme development in architecture is really requirement breakdown and value validation.'),
      lede: p('建筑训练中的复杂问题拆解、多专业协同与方案推演能力，在产品工作中可以直接复用。你擅长在约束条件下找到最优解，这正是产品决策的核心。',
              'Breaking down complex problems, coordinating disciplines and iterating schemes transfer directly into product work. You are good at optimising under constraints — exactly what product decisions need.'),
      fit: p('高', 'High'), fitStars: 4,
      entry: p('产品助理 / 产品经理\nB 端产品 / 空间科技产品', 'Associate PM / Product Manager\nB2B or spatial-tech products'),
      pfNote: p('非必需', 'Optional'), prep: p('4 – 8 个月', '4 – 8 months'),
      xfer: [
        [p('方案推演与比选', 'Scheme iteration'), p('需求拆解与优先级排序', 'Requirement breakdown & prioritisation')],
        [p('多专业协同经验', 'Multi-discipline coordination'), p('跨团队推进与项目管理', 'Cross-team delivery')],
        [p('规范与约束条件分析', 'Codes & constraints analysis'), p('业务规则与边界定义', 'Business rules & scope')],
        [p('汇报与提案', 'Presentation & pitching'), p('向上沟通与方案说服', 'Stakeholder alignment')]
      ],
      gap: {
        list: [p('产品方法论：需求分析、用户故事、MVP 拆分', 'Product methods: requirements, user stories, MVP slicing'),
               p('数据基础：埋点、漏斗、AB 实验的读法', 'Data basics: events, funnels, reading A/B tests'),
               p('技术常识：前后端协作语言与接口概念', 'Tech literacy: how front/back-end collaboration works'),
               p('工具：Axure / Figma、需求文档与看板', 'Tools: Axure / Figma, PRDs and boards')],
        tags: [p('需求分析', 'Requirements'), p('数据分析', 'Data'), p('原型设计', 'Prototyping'), p('项目管理', 'Delivery')]
      },
      pfList: [p('用 1–2 个完整项目替代作品集：定义问题 → 方案 → 结果', 'Use 1–2 complete projects instead of a portfolio: problem → solution → result'),
               p('把建筑项目写成需求文档，展示结构化思考', 'Rewrite an architecture project as a PRD to show structured thinking'),
               p('准备一份 3 页以内的产品分析报告作为敲门砖', 'Prepare a product teardown under three pages as a door-opener')],
      flow: [p('识别问题', 'Spot'), p('定义需求', 'Define'), p('方案设计', 'Design'), p('数据验证', 'Validate'), p('迭代优化', 'Iterate')],
      cvList: [p('把「负责施工图」改写成「负责需求交付与落地质量」', 'Rewrite "produced construction drawings" as "owned requirement delivery and quality"'),
               p('每条经历用「问题—动作—结果」结构，并量化结果', 'Use problem–action–result for every bullet and quantify outcomes'),
               p('删掉纯软件罗列，保留与产品相关的协作与推动', 'Drop tool lists; keep collaboration and drive relevant to product')],
      cvBefore: p('参与某文化中心方案设计与施工图绘制，配合多专业完成出图。',
                  'Participated in the scheme design and construction drawings of a cultural centre.'),
      cvAfter: p('主导 3 个项目的需求梳理与跨专业协同，将平均返工率降低 30%。',
                 'Led requirement definition and cross-discipline coordination on 3 projects, cutting rework by 30%.'),
      interview: [p('用一次「方案被否决后如何重建共识」讲你的推动力', 'Tell a story about rebuilding consensus after a scheme was rejected'),
                  p('说明你如何在造价与工期约束下做取舍', 'Explain trade-offs under budget and schedule constraints'),
                  p('准备一个你分析过的产品，说清楚你会怎么改', 'Bring one product you analysed and what you would change')],
      cases: ['c1', 'c5', 'c7'], jobs: ['j3', 'j7'], mentor: 'azhang'
    },

    {
      id: 'ux', caseCount: 156, mentorCount: 24, icon: 'i-frame', hot: 6.7, match: 4, pf: 'suggest',
      name: p('UX / UI 设计', 'UX / UI Design'),
      cat: 'design', diff: 'low', salary: [15, 30], years: ['0-3', '3-8'],
      desc: p('用设计解决真实问题，提升用户体验与产品价值。',
              'Solve real problems through design and raise product value.'),
      say: p('空间思维 + 用户视角，让你设计的不只是界面，而是完整的体验旅程。',
             'Spatial thinking plus a user lens means you design journeys, not just screens.'),
      lede: p('建筑训练培养的空间思维、用户洞察与系统性解决问题能力，在用户体验设计中极具优势。你擅长从复杂中抽丝剥茧，构建清晰的结构与体验，这正是好设计的核心。',
              'Spatial thinking, user insight and systematic problem solving from architecture are strong assets in UX. You untangle complexity into clear structure and experience — the core of good design.'),
      fit: p('高', 'High'), fitStars: 5,
      entry: p('产品设计师 / UX 设计师\nUX Researcher', 'Product Designer / UX Designer\nUX Researcher'),
      pfNote: p('需要', 'Required'), prep: p('3 – 6 个月', '3 – 6 months'),
      xfer: [
        [p('空间与结构思维', 'Spatial & structural thinking'), p('信息架构与页面布局', 'Information architecture & layout')],
        [p('用户动线与行为洞察', 'Circulation & behaviour insight'), p('体验流程设计', 'Journey design')],
        [p('方案推敲与迭代', 'Iterative design'), p('设计探索与验证', 'Design exploration & validation')],
        [p('跨专业协作经验', 'Cross-discipline collaboration'), p('与产品、开发高效沟通', 'Working with PM and engineering')]
      ],
      gap: {
        list: [p('用户研究方法（访谈、问卷、可用性测试）', 'Research methods: interviews, surveys, usability testing'),
               p('信息架构与交互设计方法', 'Information architecture and interaction patterns'),
               p('界面设计基础（视觉层级、组件、规范）', 'UI fundamentals: hierarchy, components, systems'),
               p('设计工具：Figma（核心）、FigJam、原型工具', 'Tools: Figma (core), FigJam, prototyping')],
        tags: [p('用户研究', 'User research'), p('交互设计', 'Interaction'), p('信息架构', 'IA'), p('视觉设计', 'Visual'), p('原型制作', 'Prototyping'), p('设计系统', 'Design systems')]
      },
      pfList: [p('3–4 个项目（含 1–2 个完整项目）', '3–4 projects, including 1–2 end-to-end'),
               p('展示完整设计流程：发现 → 定义 → 设计 → 测试 → 迭代', 'Show the full process: discover → define → design → test → iterate'),
               p('体现你的思考过程、取舍依据与结果影响', 'Surface your reasoning, trade-offs and impact'),
               p('项目类型不限：App / Web / 小程序 / B 端系统均可', 'Any type: app, web, mini-program or B2B systems')],
      flow: [p('发现洞察', 'Discover'), p('定义问题', 'Define'), p('设计方案', 'Design'), p('测试验证', 'Test'), p('迭代优化', 'Iterate')],
      cvList: [p('用成果与影响说话，量化你的贡献', 'Lead with outcomes and quantify your contribution'),
               p('突出方法论与协作能力，而非仅罗列项目', 'Highlight method and collaboration, not a project list'),
               p('对齐岗位关键词，优化简历结构', 'Align keywords with the role and tighten the structure')],
      cvBefore: p('项目描述偏重过程，职责描述偏罗列执行。', 'Process-heavy project descriptions, execution-focused duties.'),
      cvAfter: p('突出结果与影响，强调方法与协作。', 'Outcome-first, with method and collaboration up front.'),
      interview: [p('用 STAR 结构讲清一个迁移案例', 'Use STAR to walk through one transfer story'),
                  p('强调你的思维方式如何解决用户问题', 'Show how your way of thinking solves user problems'),
                  p('展示学习速度、好奇心与协作潜力', 'Demonstrate learning speed, curiosity and collaboration')],
      cases: ['c2', 'c3', 'c6'], jobs: ['j2', 'j5'], mentor: 'zhangzhang'
    },

    {
      id: 'service', caseCount: 48, mentorCount: 8, icon: 'i-heart', hot: 4.8, match: 4, pf: 'suggest',
      name: p('服务设计', 'Service Design'),
      cat: 'design', diff: 'mid', salary: [18, 35], years: ['3-8'],
      desc: p('从用户旅程出发，设计更有温度的服务体验。',
              'Design warmer service experiences, starting from the user journey.'),
      say: p('你在建筑里做的动线，就是服务设计里的旅程地图。',
             'The circulation you drew in architecture is a journey map in service design.'),
      lede: p('服务设计关注人在时间与空间中的完整体验，与建筑的场地、动线、人群研究天然同构。你擅长在多方利益相关者之间协调，这是服务设计最稀缺的能力。',
              'Service design deals with whole experiences across time and space — structurally close to site, circulation and user studies. Coordinating stakeholders, your strongest habit, is the scarcest skill here.'),
      fit: p('高', 'High'), fitStars: 4,
      entry: p('服务设计师 / 体验设计顾问\nCX 策略', 'Service Designer / Experience Consultant\nCX Strategy'),
      pfNote: p('建议有', 'Suggested'), prep: p('4 – 8 个月', '4 – 8 months'),
      xfer: [
        [p('场地与人群调研', 'Site & user research'), p('用户旅程与触点研究', 'Journey & touchpoint research')],
        [p('功能与动线组织', 'Program & circulation'), p('服务蓝图与流程设计', 'Service blueprint & flow')],
        [p('多方协调经验', 'Stakeholder coordination'), p('跨部门服务落地', 'Cross-department delivery')],
        [p('图纸表达能力', 'Drawing & diagramming'), p('可视化叙事与共创工作坊', 'Visual storytelling & workshops')]
      ],
      gap: {
        list: [p('服务蓝图、旅程地图等核心工具', 'Blueprints, journey maps and other core tools'),
               p('定性研究与利益相关者访谈', 'Qualitative research and stakeholder interviews'),
               p('商业模式与运营指标基础', 'Business model and operations metrics')],
        tags: [p('旅程地图', 'Journey map'), p('服务蓝图', 'Blueprint'), p('共创工作坊', 'Co-creation'), p('定性研究', 'Qual research')]
      },
      pfList: [p('把一个建筑项目重构为一次完整的服务旅程', 'Rebuild one architecture project as a full service journey'),
               p('至少 1 个包含前台与后台流程的服务蓝图', 'At least one blueprint covering front-stage and back-stage'),
               p('展示你如何把调研发现转化为设计决策', 'Show how research findings became design decisions')],
      flow: [p('调研', 'Research'), p('旅程', 'Journey'), p('蓝图', 'Blueprint'), p('原型', 'Prototype'), p('落地', 'Deliver')],
      cvList: [p('强调你协调过的角色数量与复杂度', 'Emphasise how many roles you coordinated and how complex'),
               p('把「设计说明」改写成「服务标准与流程」', 'Rewrite design statements as service standards and processes')],
      cvBefore: p('负责商业综合体公共空间方案设计。', 'Responsible for public space design in a mixed-use complex.'),
      cvAfter: p('梳理 6 类人群的到访旅程，重构 12 个关键触点，提升停留时长 18%。', 'Mapped journeys for 6 user groups and redesigned 12 touchpoints, lifting dwell time 18%.'),
      interview: [p('讲一次你把用户抱怨变成流程改动的经历', 'Tell how a user complaint became a process change'),
                  p('说明你如何让不同部门接受同一个方案', 'Explain how you aligned different departments on one plan')],
      cases: ['c2', 'c8'], jobs: ['j1', 'j2'], mentor: 'zhangxiaoqiang'
    },

    {
      id: 'ai', caseCount: 64, mentorCount: 12, icon: 'i-ai', hot: 3.9, match: 4, pf: 'optional',
      name: p('AI 产品', 'AI Product'),
      cat: 'internet', diff: 'high', salary: [25, 50], years: ['3-8'],
      desc: p('结合 AI 技术与产品思维，探索智能产品的无限可能。',
              'Combine AI capability with product thinking to shape intelligent products.'),
      say: p('AI 产品最缺的不是技术，是能定义问题的人。',
             'AI products lack problem-definers far more than they lack technology.'),
      lede: p('AI 产品的难点在于定义问题边界与评估效果，而不是模型本身。建筑训练里对模糊需求的收敛能力，在这里非常值钱。',
              'The hard part of AI products is framing the problem and judging quality — not the model. Converging vague requirements, a habit from architecture, is valuable here.'),
      fit: p('中高', 'Medium-high'), fitStars: 4,
      entry: p('AI 产品经理 / AI 产品运营\n垂直行业解决方案', 'AI PM / AI Product Ops\nVertical solutions'),
      pfNote: p('非必需', 'Optional'), prep: p('6 – 12 个月', '6 – 12 months'),
      xfer: [
        [p('模糊需求的收敛能力', 'Converging vague briefs'), p('AI 场景定义与边界划定', 'Scoping AI use cases')],
        [p('方案评估与比选', 'Scheme evaluation'), p('效果评估与指标设计', 'Evaluation & metric design')],
        [p('跨专业翻译能力', 'Translating across disciplines'), p('业务与算法之间的沟通', 'Bridging business and modelling')]
      ],
      gap: {
        list: [p('大模型基础概念：提示词、上下文、评测', 'LLM basics: prompting, context, evaluation'),
               p('数据流程与标注质量控制', 'Data pipelines and annotation quality'),
               p('AI 产品的成本与延迟约束', 'Cost and latency constraints in AI products')],
        tags: [p('提示工程', 'Prompting'), p('效果评测', 'Evaluation'), p('数据标注', 'Annotation'), p('场景拆解', 'Use-case design')]
      },
      pfList: [p('做一个解决真实问题的小工具，写清楚评测方式', 'Ship a small tool solving a real problem, with a clear eval method'),
               p('用一份文档说明「为什么这个场景适合 AI」', 'Write one doc on why this use case suits AI at all')],
      flow: [p('场景', 'Use case'), p('数据', 'Data'), p('原型', 'Prototype'), p('评测', 'Evaluate'), p('上线', 'Ship')],
      cvList: [p('突出你定义问题与验证效果的经历', 'Foreground problem framing and validation'),
               p('避免堆砌名词，讲清楚你实际做了什么', 'Avoid buzzwords; say what you actually did')],
      cvBefore: p('了解 AI 工具，使用过多种生成式软件。', 'Familiar with AI tools, used various generative software.'),
      cvAfter: p('定义 2 个 AI 辅助场景并设计评测集，方案采纳率提升至 60%。', 'Defined 2 AI-assisted use cases with an eval set; adoption reached 60%.'),
      interview: [p('准备一个你判断「不该用 AI」的例子', 'Bring one case where you decided not to use AI'),
                  p('说明你如何衡量生成结果的好坏', 'Explain how you judge generated output quality')],
      cases: ['c7'], jobs: ['j3'], mentor: 'azhang'
    },

    {
      id: 'brand', caseCount: 42, mentorCount: 7, icon: 'i-tag', hot: 3.2, match: 4, pf: 'optional',
      name: p('品牌策略', 'Brand Strategy'),
      cat: 'consulting', diff: 'mid', salary: [18, 38], years: ['3-8'],
      desc: p('用策略与洞察塑造品牌，提升品牌影响力与竞争力。',
              'Shape brands with strategy and insight, building influence and edge.'),
      say: p('你给业主讲方案的那套逻辑，就是品牌叙事。',
             'The way you pitched a scheme to a client is brand narrative.'),
      lede: p('建筑人天然具备概念提炼、视觉判断与提案表达能力，这三者正是品牌策略的核心工具。',
              'Concept distillation, visual judgement and pitching are core brand tools — and native strengths for architects.'),
      fit: p('中高', 'Medium-high'), fitStars: 4,
      entry: p('品牌策略 / 内容策略\n创意策划', 'Brand Strategist / Content Strategist\nCreative Planner'),
      pfNote: p('非必需', 'Optional'), prep: p('3 – 6 个月', '3 – 6 months'),
      xfer: [
        [p('概念提炼与立意', 'Concept distillation'), p('品牌定位与叙事', 'Positioning & narrative')],
        [p('图纸与视觉表达', 'Visual expression'), p('视觉识别与调性把控', 'Identity & tone of voice')],
        [p('业主沟通与提案', 'Client pitching'), p('客户沟通与方案说服', 'Client persuasion')]
      ],
      gap: {
        list: [p('市场与竞品研究方法', 'Market and competitive research'),
               p('消费者洞察与人群画像', 'Consumer insight and segmentation'),
               p('内容传播与渠道基础', 'Content distribution and channels')],
        tags: [p('品牌定位', 'Positioning'), p('内容策略', 'Content'), p('市场研究', 'Market research')]
      },
      pfList: [p('为一个真实品牌写一份 10 页策略提案', 'Write a 10-page strategy deck for a real brand'),
               p('展示从洞察到创意的完整推导链', 'Show the full chain from insight to idea')],
      flow: [p('洞察', 'Insight'), p('定位', 'Position'), p('叙事', 'Narrative'), p('表达', 'Expression'), p('传播', 'Distribution')],
      cvList: [p('把方案汇报经验写成提案与说服成果', 'Turn design reviews into pitching and persuasion outcomes')],
      cvBefore: p('负责项目汇报文本与展板排版。', 'Produced review decks and presentation boards.'),
      cvAfter: p('主导 5 次客户提案，方案一次过会率从 40% 提升至 75%。', 'Led 5 client pitches, lifting first-pass approval from 40% to 75%.'),
      interview: [p('准备一个「你如何说服别人接受非常规方案」的故事', 'Prepare a story about selling an unconventional idea')],
      cases: ['c4'], jobs: ['j6'], mentor: 'zhangboshi'
    },

    {
      id: 'realestate', caseCount: 30, mentorCount: 6, icon: 'i-building', hot: 2.8, match: 3, pf: 'optional',
      name: p('房地产开发', 'Real Estate / PropTech'),
      cat: 'realestate', diff: 'low', salary: [20, 40], years: ['3-8', '8+'],
      desc: p('参与项目全周期，创造空间价值与商业价值。',
              'Work across the project lifecycle, creating spatial and commercial value.'),
      say: p('这是跨度最小的一条路，但要补的是算账的能力。',
             'The smallest leap of all — what you must add is the ability to run the numbers.'),
      lede: p('设计管理、投资拓展、资产运营都欢迎懂空间的人。行业知识延续，转行跨度相对可控。',
              'Design management, investment and asset operations all welcome people who understand space. Domain knowledge carries over, so the leap is manageable.'),
      fit: p('中高', 'Medium-high'), fitStars: 4,
      entry: p('设计管理 / 投资拓展\n资产运营', 'Design Management / Investment\nAsset Operations'),
      pfNote: p('非必需', 'Optional'), prep: p('2 – 5 个月', '2 – 5 months'),
      xfer: [
        [p('项目全流程理解', 'End-to-end project literacy'), p('开发节奏与报建管理', 'Development schedule & approvals')],
        [p('规范与政策研究', 'Codes and policy research'), p('可行性与合规判断', 'Feasibility and compliance')],
        [p('空间价值判断', 'Judging spatial value'), p('产品定位与货值测算', 'Product positioning and value modelling')]
      ],
      gap: {
        list: [p('财务模型：IRR、现金流、货值测算', 'Financial modelling: IRR, cash flow, value'),
               p('土地与政策流程', 'Land acquisition and policy processes'),
               p('招采与成本管理基础', 'Procurement and cost control basics')],
        tags: [p('财务测算', 'Financial modelling'), p('市场研判', 'Market analysis'), p('成本管理', 'Cost control')]
      },
      pfList: [p('做一份完整的项目可行性测算表', 'Build one full feasibility model')],
      flow: [p('研判', 'Scan'), p('拿地', 'Acquire'), p('定位', 'Position'), p('开发', 'Develop'), p('运营', 'Operate')],
      cvList: [p('把技术经历翻译成成本、周期与风险控制成果', 'Translate technical work into cost, schedule and risk outcomes')],
      cvBefore: p('负责住宅项目施工图设计与现场配合。', 'Handled residential construction drawings and site coordination.'),
      cvAfter: p('推动 3 个项目设计优化，节约建安成本约 1200 万元。', 'Drove design optimisation on 3 projects, saving ~12M RMB in build cost.'),
      interview: [p('准备一个你做过的成本或工期优化决策', 'Bring one cost or schedule optimisation you drove')],
      cases: ['c8'], jobs: ['j1'], mentor: 'zhanghuazhang'
    },

    {
      id: 'archtech', caseCount: 36, mentorCount: 8, icon: 'i-layers', hot: 5.3, match: 5, pf: 'suggest',
      name: p('建筑科技 / BIM', 'ArchTech / BIM'),
      cat: 'tech', diff: 'low', salary: [15, 32], years: ['0-3', '3-8'],
      desc: p('用数字化与技术，重塑建筑行业的生产方式。',
              'Reshape how the industry produces work, through digital tools and technology.'),
      say: p('最接近原行业的一条路，适合低风险转型。',
             'The closest path to your origin — a low-risk transition.'),
      lede: p('BIM、参数化、数字建造与建筑软件公司都在找懂专业又懂工具的人。你的专业背景不是负担，而是准入门槛。',
              'BIM, parametrics, digital fabrication and AEC software firms all want people fluent in both domain and tooling. Your background is the entry ticket, not a burden.'),
      fit: p('高', 'High'), fitStars: 5,
      entry: p('BIM 工程师 / 数字化设计\nAEC 软件产品与咨询', 'BIM Engineer / Computational Design\nAEC software product & consulting'),
      pfNote: p('建议有', 'Suggested'), prep: p('2 – 5 个月', '2 – 5 months'),
      xfer: [
        [p('图纸与模型能力', 'Drawing and modelling'), p('模型标准与协同流程', 'Model standards and coordination'),],
        [p('专业规范理解', 'Domain codes'), p('规则化与自动化校审', 'Rule-based checking and automation'),],
        [p('多专业配合经验', 'Multi-discipline coordination'), p('数字化交付管理', 'Digital delivery management')]
      ],
      gap: {
        list: [p('Revit / Rhino + Grasshopper 的工程化用法', 'Production-grade Revit / Rhino + Grasshopper'),
               p('Python 或 C# 脚本基础', 'Scripting basics in Python or C#'),
               p('数据标准：IFC、族库与模型管理', 'Standards: IFC, families and model management')],
        tags: [p('Revit', 'Revit'), p('Grasshopper', 'Grasshopper'), p('Python', 'Python'), p('IFC', 'IFC')]
      },
      pfList: [p('展示一个你写的自动化脚本及其节省的工时', 'Show one automation script and the hours it saved'),
               p('放一个完整的模型协同流程说明', 'Include one full model-coordination workflow')],
      flow: [p('建模', 'Model'), p('标准', 'Standards'), p('自动化', 'Automate'), p('协同', 'Coordinate'), p('交付', 'Deliver')],
      cvList: [p('用「节省工时 / 减少错误」量化你的工具能力', 'Quantify tooling with hours saved and errors avoided')],
      cvBefore: p('熟练使用 Revit、Rhino 等软件。', 'Proficient in Revit, Rhino and similar software.'),
      cvAfter: p('开发 6 个 Grasshopper 工具，出图效率提升 40%。', 'Built 6 Grasshopper tools, improving drawing throughput by 40%.'),
      interview: [p('准备一个你用工具解决团队痛点的例子', 'Bring one case where tooling solved a team pain point')],
      cases: ['c9'], jobs: ['j4'], mentor: 'zhangjingli'
    },

    {
      id: 'sustain', caseCount: 22, mentorCount: 4, icon: 'i-leaf', hot: 2.4, match: 4, pf: 'optional',
      name: p('可持续发展', 'Sustainability / ESG'),
      cat: 'public', diff: 'mid', salary: [15, 32], years: ['3-8'],
      desc: p('推动绿色方案与低碳未来，让建筑更有社会价值。',
              'Push green solutions and low-carbon futures with real social value.'),
      say: p('政策、规范与系统思考，是你在 ESG 领域的通行证。',
             'Policy, codes and systems thinking are your passport into ESG.'),
      lede: p('ESG 咨询、碳核算与绿色建筑认证都需要既懂技术又懂政策的人。你的规范研究习惯在这里是稀缺资源。',
              'ESG consulting, carbon accounting and green certification all need people fluent in both technology and policy — your habit of reading codes is rare and valuable.'),
      fit: p('中高', 'Medium-high'), fitStars: 4,
      entry: p('ESG 顾问 / 碳中和顾问\n绿色建筑认证', 'ESG Consultant / Carbon Advisor\nGreen building certification'),
      pfNote: p('非必需', 'Optional'), prep: p('4 – 8 个月', '4 – 8 months'),
      xfer: [
        [p('规范与政策研究', 'Codes and policy research'), p('合规框架与标准解读', 'Compliance frameworks and standards')],
        [p('跨尺度系统分析', 'Cross-scale systems analysis'), p('碳排放与影响评估', 'Carbon and impact assessment')],
        [p('技术方案比选', 'Technical option appraisal'), p('减排路径设计', 'Decarbonisation roadmaps')]
      ],
      gap: {
        list: [p('碳核算方法与主流标准（GHG Protocol 等）', 'Carbon accounting and mainstream standards (GHG Protocol)'),
               p('ESG 披露框架与报告写作', 'ESG disclosure frameworks and reporting'),
               p('数据收集与核验流程', 'Data collection and verification')],
        tags: [p('碳核算', 'Carbon accounting'), p('ESG 报告', 'ESG reporting'), p('LEED / WELL', 'LEED / WELL')]
      },
      pfList: [p('完成一份小型建筑的碳排放核算演示', 'Produce a carbon calculation demo for a small building')],
      flow: [p('盘查', 'Inventory'), p('核算', 'Account'), p('目标', 'Target'), p('路径', 'Roadmap'), p('披露', 'Disclose')],
      cvList: [p('突出你对规范体系的熟悉度与研究能力', 'Highlight fluency with code systems and research')],
      cvBefore: p('负责绿建专篇配合与节能计算。', 'Supported green-building chapters and energy calculations.'),
      cvAfter: p('完成 8 个项目的碳排放测算与减排建议，平均降碳 12%。', 'Delivered carbon assessments for 8 projects, averaging 12% reduction.'),
      interview: [p('说明你如何把政策要求转化为可执行方案', 'Explain how you turn policy into executable plans')],
      cases: [], jobs: ['j5'], mentor: 'zhangboshi'
    },

    {
      id: 'consulting', caseCount: 92, mentorCount: 15, icon: 'i-dots', hot: 3.6, match: 4, pf: 'optional',
      name: p('咨询', 'Consulting'),
      cat: 'consulting', diff: 'high', salary: [25, 50], years: ['3-8', '8+'],
      desc: p('用专业知识与结构化思维，解决复杂问题，创造价值。',
              'Solve complex problems with domain knowledge and structured thinking.'),
      say: p('结构化拆解 + 汇报能力，是你最容易被识别的迁移资产。',
             'Structured decomposition plus presentation skill is your most recognisable asset.'),
      lede: p('咨询看重结构化思考、快速学习与表达能力。建筑人的方案汇报训练，在这里可以直接兑现。',
              'Consulting rewards structure, fast learning and communication — all trained by years of design reviews.'),
      fit: p('中高', 'Medium-high'), fitStars: 4,
      entry: p('战略咨询 / 行业研究\n设计咨询', 'Strategy Consulting / Industry Research\nDesign Consulting'),
      pfNote: p('非必需', 'Optional'), prep: p('5 – 10 个月', '5 – 10 months'),
      xfer: [
        [p('复杂问题拆解', 'Decomposing complexity'), p('结构化分析框架', 'Structured analysis frameworks')],
        [p('调研与资料整合', 'Research and synthesis'), p('案头研究与行业分析', 'Desk research and industry analysis')],
        [p('汇报与提案', 'Presentation'), p('客户沟通与成果交付', 'Client communication and delivery')]
      ],
      gap: {
        list: [p('商业分析框架与财务常识', 'Business frameworks and finance basics'),
               p('Excel 建模与数据处理', 'Excel modelling and data handling'),
               p('案例面试（Case Interview）训练', 'Case interview practice')],
        tags: [p('结构化思维', 'Structured thinking'), p('行业研究', 'Industry research'), p('商业分析', 'Business analysis')]
      },
      pfList: [p('写一份 15 页行业分析，作为能力证明', 'Write a 15-page industry analysis as proof of ability')],
      flow: [p('拆题', 'Frame'), p('假设', 'Hypothesise'), p('取证', 'Evidence'), p('结论', 'Conclude'), p('汇报', 'Present')],
      cvList: [p('用「问题—方法—结论」结构重写项目经历', 'Rewrite projects as problem–method–conclusion')],
      cvBefore: p('参与多个大型公共建筑项目设计。', 'Worked on several large public building projects.'),
      cvAfter: p('主导 4 个项目的前期研究，形成可执行的决策建议。', 'Led early-stage research on 4 projects into actionable recommendations.'),
      interview: [p('准备 2 个 Case，练习 5 分钟结构化输出', 'Practise 2 cases with a 5-minute structured answer')],
      cases: ['c3'], jobs: ['j6'], mentor: 'zhangzhang'
    },

    {
      id: 'content', caseCount: 28, mentorCount: 5, icon: 'i-pencil', hot: 2.1, match: 3, pf: 'suggest',
      name: p('内容策划', 'Content Strategy'),
      cat: 'design', diff: 'low', salary: [12, 26], years: ['0-3', '3-8'],
      desc: p('用内容连接专业与受众，传递品牌与行业影响力。',
              'Connect expertise with audiences, carrying brand and industry influence.'),
      say: p('你懂专业，也懂怎么讲清楚，这本身就是稀缺能力。',
             'You know the domain and how to explain it — that combination is rare.'),
      lede: p('专业媒体、设计品牌与知识型公司都需要既懂行业又能写的人。写作是最低成本的转行起点。',
              'Trade media, design brands and knowledge companies all need people who know the field and can write. Writing is the cheapest place to start.'),
      fit: p('中', 'Medium'), fitStars: 3,
      entry: p('内容策划 / 专业编辑\n知识产品运营', 'Content Strategist / Editor\nKnowledge product ops'),
      pfNote: p('建议有', 'Suggested'), prep: p('2 – 4 个月', '2 – 4 months'),
      xfer: [
        [p('专业知识积累', 'Domain knowledge'), p('垂直内容判断力', 'Editorial judgement in a vertical')],
        [p('图文表达能力', 'Visual and written expression'), p('内容结构与视觉呈现', 'Content structure and presentation')],
        [p('访谈与调研', 'Interviews and research'), p('选题与素材组织', 'Topic development and sourcing')]
      ],
      gap: {
        list: [p('平台内容规律与用户阅读习惯', 'Platform dynamics and reading behaviour'),
               p('选题机制与内容节奏管理', 'Topic pipelines and publishing cadence')],
        tags: [p('选题策划', 'Topic planning'), p('长文写作', 'Long-form writing'), p('账号运营', 'Channel ops')]
      },
      pfList: [p('持续更新 10 篇以上的公开写作', 'Publish 10+ pieces publicly and keep going')],
      flow: [p('选题', 'Topic'), p('调研', 'Research'), p('写作', 'Write'), p('编辑', 'Edit'), p('分发', 'Distribute')],
      cvList: [p('用阅读量、转化与合作案例证明内容能力', 'Prove content skill with reach, conversion and collaborations')],
      cvBefore: p('负责项目文本撰写与展板设计。', 'Wrote project texts and designed presentation boards.'),
      cvAfter: p('独立运营专业专栏 12 个月，累计阅读 30 万+。', 'Ran a professional column for 12 months, 300k+ cumulative reads.'),
      interview: [p('带 3 篇代表作，说明每篇的目标读者与效果', 'Bring 3 pieces and explain audience and outcome for each')],
      cases: ['c9'], jobs: ['j6'], mentor: 'zhangboshi'
    }
  ];

  /** 新增方向（侧栏用） */
  window.DATA_DIRECTIONS_NEW = [
    { id: 'ai', name: p('AI 产品运营', 'AI Product Ops') },
    { id: 'sustain', name: p('碳中和顾问', 'Carbon Advisor') },
    { id: 'archtech', name: p('空间数据分析师', 'Spatial Data Analyst') }
  ];

  /** 筛选枚举 */
  window.DIR_FILTERS = {
    industry: [
      { v: 'internet', label: p('互联网 / 科技', 'Internet / Tech') },
      { v: 'design', label: p('设计 / 创意', 'Design / Creative') },
      { v: 'consulting', label: p('咨询 / 研究', 'Consulting / Research') },
      { v: 'realestate', label: p('地产 / 城市', 'Real estate / Urban') },
      { v: 'tech', label: p('建筑科技', 'ArchTech') },
      { v: 'public', label: p('公共 / 可持续', 'Public / Sustainability') }
    ],
    years: [
      { v: '0-3', label: p('0 – 3 年', '0 – 3 yrs') },
      { v: '3-8', label: p('3 – 8 年', '3 – 8 yrs') },
      { v: '8+', label: p('8 年以上', '8+ yrs') }
    ],
    portfolio: [
      { v: 'need', label: p('需要', 'Required') },
      { v: 'suggest', label: p('建议有', 'Suggested') },
      { v: 'optional', label: p('非必需', 'Optional') }
    ],
    difficulty: [
      { v: 'low', label: p('较低', 'Lower') },
      { v: 'mid', label: p('中等', 'Medium') },
      { v: 'high', label: p('较高', 'Higher') }
    ],
    salary: [
      { v: '0-20', label: p('20K 以下', 'Under 20K') },
      { v: '20-35', label: p('20 – 35K', '20 – 35K') },
      { v: '35-99', label: p('35K 以上', '35K+') }
    ]
  };
})();
