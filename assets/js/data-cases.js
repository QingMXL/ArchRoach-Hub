/* ==========================================================
   Data — 真实转行案例（9 篇，结构化 / 匿名）
   公开字段遵循 SPEC 08：只公开类别与区间
   ========================================================== */
(function () {
  'use strict';
  function p(zh, en) { return { zh: zh, en: en }; }

  window.DATA_CASES = [
    {
      id: 'c1', dir: 'pm', art: 'interior', featured: true, editorPick: true,
      tag: p('从建筑到产品', 'Architecture → Product'),
      title: p('从建筑师到产品经理：把系统思维带进产品决策',
               'From architect to PM: bringing systems thinking into product decisions'),
      excerpt: p('从方案设计到需求设计，我如何将建筑思维中的系统性与用户洞察，转化为产品价值。',
                 'From scheme design to requirement design — turning systems thinking and user insight into product value.'),
      author: p('蟑小强', 'Xiaoqiang'), pose: 'roach-tie', tone: 'lavender', mentor: 'azhang',
      role: p('前建筑设计师，现产品经理 @ 某互联网公司', 'Former architect, now PM at an internet company'),
      prep: 8, read: 8, date: '2024-05-12', age: 28, offline: false, consultable: true,
      story: {
        why: p('在甲方做方案设计的过程中，我越来越关注「用户到底需要什么」。一次与产品团队合作的经历让我意识到，建筑训练带给我的系统思维、空间理解和跨专业协作能力，完全可以迁移到产品领域，帮助我影响更多人的日常体验。',
               'While working client-side I kept circling back to what users actually needed. Collaborating with a product team made it clear that systems thinking, spatial reasoning and cross-discipline coordination all transfer — and let me touch far more people’s daily experience.'),
        xfer: p('建筑训练让我擅长从复杂信息中提炼结构，并用可视化方式表达方案。这些能力帮助我在产品工作中快速梳理需求、构建信息架构、协调多方角色、搭建清晰的产品体系。',
                'Architecture taught me to pull structure out of messy information and express it visually. That is exactly how I now clarify requirements, build information architecture, align stakeholders and shape a coherent product system.'),
        material: p('我将建筑项目中的分析图、逻辑推导过程，转化为产品思维的表达方式，突出「问题拆解 → 方案推导 → 价值验证」的链路。简历上，我强调可迁移能力与项目影响力，而非堆砌岗位职责。',
                    'I recast my analytical diagrams and reasoning as product artefacts, foregrounding the chain of problem framing, solution derivation and value validation. On the CV I led with transferable ability and impact rather than duties.'),
        interview: p('我不回避建筑背景，而是用具体案例说明：如何用建筑的方法解决产品问题，如何在不确定性中推进方案落地，以及如何与工程、设计、运营等多方协作。',
                     'I never hid the background. I used concrete cases to show how architectural method solves product problems, how I push through ambiguity, and how I work with engineering, design and operations.'),
        hardest: p('一开始很难摆脱「设计思维」的惯性，过度追求完美方案而忽略迭代效率。学会在约束条件下快速验证假设，是我最大的成长点。',
                   'The hardest habit to break was chasing the perfect scheme. Learning to validate assumptions fast under constraints was my biggest growth.'),
        advice: p('先理解产品的底层逻辑，再找到自己独特的价值点。建筑背景不是劣势，而是你的「差异化优势」。持续输出、积累作品、主动链接，你会被看见。',
                  'Understand the underlying logic of product work first, then find where you are uniquely useful. An architecture background is differentiation, not a handicap. Keep publishing, keep building, keep reaching out.')
      },
      timeline: [
        [p('建筑设计师', 'Architect'), p('3 年方案设计经验', '3 years in scheme design')],
        [p('意识到兴趣与优势', 'Noticing interest and strength'), p('开始关注产品方法与用户体验', 'Started following product method and UX')],
        [p('系统学习产品知识', 'Systematic study'), p('自学产品课程，参与项目实践', 'Self-taught courses plus real projects')],
        [p('优化作品集与简历', 'Reworking portfolio and CV'), p('突出可迁移能力与项目成果', 'Foregrounding transferable ability and outcomes')],
        [p('投递与面试', 'Applying and interviewing'), p('累计投递 40+，获得 3 个 Offer', '40+ applications, 3 offers')]
      ],
      skills: [p('系统思维', 'Systems thinking'), p('空间与结构理解', 'Spatial reasoning'), p('信息可视化', 'Information visualisation'), p('跨团队协作', 'Cross-team collaboration'), p('用户洞察', 'User insight')]
    },

    {
      id: 'c2', dir: 'ux', art: 'landscape',
      tag: p('从建筑到体验设计', 'Architecture → Experience'),
      title: p('从建筑到 UX：用空间思维做体验设计',
               'Architecture to UX: designing experience with a spatial mind'),
      excerpt: p('空间节奏感帮我理解了用户旅程，设计也变得更有层次与逻辑。',
                 'A sense of spatial rhythm gave me user journeys with real structure and logic.'),
      author: p('小蟑子', 'Little Zhang'), pose: 'roach-glasses', tone: 'blue', mentor: 'zhangzhang',
      role: p('前建筑设计师，现 UX 设计师', 'Former architect, now UX designer'),
      prep: 6, read: 7, date: '2024-04-18', age: 30, offline: true, consultable: true,
      story: {
        why: p('做了四年施工图之后，我发现自己真正在意的是「人怎么用这个东西」。第一次做可用性测试，我意识到这跟带着业主走一遍样板间是同一件事。',
               'After four years of construction drawings I realised I cared about how people use things. My first usability test felt identical to walking a client through a show unit.'),
        xfer: p('动线分析直接变成了用户旅程，平面的功能分区变成了信息架构，方案比选变成了 A/B 设计验证。',
                'Circulation became user journeys, zoning became information architecture, and scheme comparison became A/B validation.'),
        material: p('我用三个项目重建作品集：一个完整的端到端产品、一个把建筑项目改造成体验案例、一个个人小工具。重点展示过程而非渲染图。',
                    'I rebuilt the portfolio around three projects: one end-to-end product, one architecture project recast as an experience case, and one personal tool. Process over renderings.'),
        interview: p('最常被问的是「你为什么离开建筑」。我的答案始终一致：不是逃离，而是把同一套能力用在迭代更快的载体上。',
                     'The most common question was why I left. My answer never changed: not an escape, but the same skills applied to a faster medium.'),
        hardest: p('从「一稿定终身」到「一天改三版」的节奏转变，比学软件难得多。',
                   'Shifting from one definitive scheme to three revisions a day was far harder than learning the software.'),
        advice: p('先做一个真实项目，再去投简历。作品集里的真实感，面试官三秒就能看出来。',
                  'Ship one real project before applying. Interviewers spot authenticity in three seconds.')
      },
      timeline: [
        [p('建筑设计师', 'Architect'), p('4 年施工图与方案经验', '4 years in drawings and schemes')],
        [p('接触用户研究', 'First taste of research'), p('参与一次可用性测试', 'Joined one usability test')],
        [p('系统补课', 'Structured learning'), p('自学交互与视觉基础，练习 Figma', 'Self-taught interaction and visual basics, Figma practice')],
        [p('重建作品集', 'Rebuilding the portfolio'), p('3 个项目，突出过程与验证', '3 projects, process and validation first')],
        [p('拿到 Offer', 'Offer'), p('6 个月，入职 SaaS 公司 UX 团队', '6 months later, joined a SaaS UX team')]
      ],
      skills: [p('用户旅程', 'User journey'), p('信息架构', 'IA'), p('可用性测试', 'Usability testing'), p('视觉层级', 'Visual hierarchy')]
    },

    {
      id: 'c3', dir: 'consulting', art: 'chart',
      tag: p('从建筑到策略', 'Architecture → Strategy'),
      title: p('从建筑到策略咨询：结构化思维的新战场',
               'Architecture to strategy consulting: a new arena for structured thinking'),
      excerpt: p('建筑训练让我擅长拆解复杂问题，在咨询中找到了新舞台。',
                 'Architecture trained me to decompose complexity; consulting gave that skill a bigger stage.'),
      author: p('RoachLee', 'RoachLee'), pose: 'roach-bow', tone: 'peach', mentor: 'zhanglaoban',
      role: p('前建筑师，现策略顾问', 'Former architect, now strategy consultant'),
      prep: 10, read: 9, date: '2024-03-30', age: 27, offline: true, consultable: true,
      story: {
        why: p('我在做城市更新项目时，发现真正决定成败的往往不是设计，而是前期的判断。我想去到做判断的那一端。',
               'On an urban renewal project I saw that outcomes were decided upstream, not by design. I wanted to sit on that side of the table.'),
        xfer: p('建筑的可行性研究几乎就是咨询的尽调：读政策、算账、比选方案、写结论。',
                'A feasibility study is close to consulting due diligence: read policy, run numbers, compare options, write the conclusion.'),
        material: p('我写了一份 15 页的行业分析当作品集，面试时它比任何设计图都有用。',
                    'I wrote a 15-page industry analysis as my portfolio. In interviews it beat every drawing I had.'),
        interview: p('Case 面试练了 40 次以上。建筑人最大的问题不是不会分析，而是讲得太慢、太完整。',
                     'I ran 40+ case drills. The typical architect problem is not weak analysis but slow, over-complete delivery.'),
        hardest: p('学会在信息不足时给出结论，并且敢于被推翻。',
                   'Learning to conclude on incomplete information — and to be overturned without flinching.'),
        advice: p('把你做过的每一次可研，重写成「问题—假设—证据—结论」，你会发现自己早就在做咨询。',
                  'Rewrite every feasibility study as problem–hypothesis–evidence–conclusion and you will see you were already consulting.')
      },
      timeline: [
        [p('建筑师', 'Architect'), p('3 年城市更新与公建项目', '3 years in renewal and public buildings')],
        [p('发现兴趣', 'Finding the pull'), p('参与项目前期策划与可研', 'Joined feasibility and early-stage planning')],
        [p('补商业与财务', 'Adding business and finance'), p('自学财务建模与商业框架', 'Self-taught modelling and frameworks')],
        [p('Case 训练', 'Case practice'), p('40+ 次案例练习与模拟面试', '40+ cases and mock interviews')],
        [p('进入咨询', 'Into consulting'), p('10 个月，入职咨询公司', '10 months later, joined a consultancy')]
      ],
      skills: [p('结构化拆解', 'Structured decomposition'), p('行业研究', 'Industry research'), p('财务测算', 'Financial modelling')]
    },

    {
      id: 'c4', dir: 'brand', art: 'wood',
      tag: p('从建筑到品牌', 'Architecture → Brand'),
      title: p('从方案到品牌：建筑师的品牌转型之路',
               'From schemes to brands: an architect’s pivot into brand strategy'),
      excerpt: p('我如何将对空间与人的理解，转化为品牌叙事与体验设计。',
                 'How my read on space and people became brand narrative and experience.'),
      author: p('蟑想家', 'Roach Dreamer'), pose: 'roach-book', tone: 'rose', mentor: 'zhangboshi',
      role: p('前建筑师，现品牌策略', 'Former architect, now brand strategist'),
      prep: 7, read: 6, date: '2024-03-08', age: 29, offline: false, consultable: false,
      story: {
        why: p('我发现自己每次最兴奋的时刻，都是给方案取名字、写立意的那两天。', 'My favourite two days on any project were always naming the scheme and writing its concept.'),
        xfer: p('概念提炼、视觉判断、提案表达，这三件事在品牌行业每天都在用。', 'Concept distillation, visual judgement and pitching are daily brand work.'),
        material: p('我为三个真实小品牌免费做了策略提案，这三份文件成了我的敲门砖。', 'I did free strategy decks for three small brands; those three files opened every door.'),
        interview: p('对方最关心的是：你能不能把一个模糊的商业问题，讲成一句话。', 'What they cared about: can you compress a vague business problem into one sentence.'),
        hardest: p('接受「好看」不等于「有效」，品牌需要市场证据支撑。', 'Accepting that beautiful is not effective — brands need market evidence.'),
        advice: p('不要等准备好，先做三个真实提案。', 'Do not wait until you feel ready. Do three real pitches.')
      },
      timeline: [
        [p('建筑师', 'Architect'), p('5 年文旅与商业项目', '5 years in hospitality and retail')],
        [p('副业提案', 'Side pitches'), p('为 3 个小品牌做免费策略', 'Free strategy for 3 small brands')],
        [p('补市场知识', 'Adding market knowledge'), p('学习消费者洞察与内容传播', 'Consumer insight and distribution')],
        [p('转入品牌', 'Into brand'), p('7 个月，入职品牌咨询公司', '7 months later, joined a brand consultancy')]
      ],
      skills: [p('概念提炼', 'Concept'), p('叙事结构', 'Narrative'), p('客户提案', 'Client pitching')]
    },

    {
      id: 'c5', dir: 'pm', art: 'wire',
      tag: p('从建筑到产品', 'Architecture → Product'),
      title: p('非科班转产品：从施工图到产品蓝图',
               'Non-CS into product: from construction drawings to product blueprints'),
      excerpt: p('没有计算机背景，但系统思维让我快速上手并持续进化。',
                 'No CS background — systems thinking got me up to speed and kept me moving.'),
      author: p('小强本强', 'Qiang Himself'), pose: 'roach-cap', tone: 'mint', mentor: 'azhang',
      role: p('前建筑师，现 B 端产品经理', 'Former architect, now B2B product manager'),
      prep: 9, read: 7, date: '2024-02-20', age: 31, offline: false, consultable: true,
      story: {
        why: p('我在设计院负责一套内部出图工具的需求整理，第一次发现自己更擅长定义问题。', 'I owned the requirements for an internal drawing tool and found I was better at defining problems than drawing.'),
        xfer: p('图纸的图层与标准，就是产品的信息层级与规范。', 'Layers and drawing standards are information hierarchy and design systems.'),
        material: p('我把那套内部工具写成完整 PRD，作为唯一作品。', 'I wrote that internal tool up as a full PRD — my only portfolio piece.'),
        interview: p('B 端产品特别欢迎懂行业的人，专业背景在这里是加分项。', 'B2B teams welcome domain fluency; the background was a plus, not a minus.'),
        hardest: p('补技术常识，学会和研发讲同一种语言。', 'Building enough tech literacy to speak engineering’s language.'),
        advice: p('从你熟悉的行业切入 B 端产品，是最短的路径。', 'Entering B2B product through the industry you already know is the shortest path.')
      },
      timeline: [
        [p('设计院建筑师', 'Institute architect'), p('6 年施工图经验', '6 years of construction drawings')],
        [p('内部工具需求', 'Internal tool requirements'), p('负责一套出图工具的需求整理', 'Owned requirements for a drawing tool')],
        [p('系统学产品', 'Learning product'), p('补充数据、技术与方法论', 'Data, tech literacy and method')],
        [p('入职 B 端团队', 'Joining a B2B team'), p('9 个月，进入建筑科技公司', '9 months later, joined an AEC tech company')]
      ],
      skills: [p('需求定义', 'Requirement definition'), p('行业知识', 'Domain knowledge'), p('跨团队沟通', 'Cross-team communication')]
    },

    {
      id: 'c6', dir: 'ux', art: 'desk',
      tag: p('从建筑到交互设计', 'Architecture → Interaction'),
      title: p('从建筑到交互：把空间体验搬到屏幕上',
               'Architecture to interaction: moving spatial experience onto the screen'),
      excerpt: p('建筑训练让我关注结构与关系，这正是交互设计的本质。',
                 'Architecture made me watch structure and relationships — the essence of interaction design.'),
      author: p('蟑小鹿', 'Roach Deer'), pose: 'roach', tone: 'blue', mentor: 'zhangxiaoqiang',
      role: p('前室内设计师，现交互设计师', 'Former interior designer, now interaction designer'),
      prep: 6, read: 6, date: '2024-02-02', age: 26, offline: true, consultable: false,
      story: {
        why: p('我喜欢的从来不是材质，而是人进入一个空间时的那几秒钟。', 'What I loved was never the material — it was the few seconds when someone enters a space.'),
        xfer: p('那几秒钟，在数字产品里叫首屏体验。', 'Those few seconds are called first-screen experience in digital products.'),
        material: p('我用三个月做了一个完整的 App 重设计，包含研究、流程与验证。', 'In three months I did a full app redesign with research, flows and validation.'),
        interview: p('我把室内动线图和 App 流程图并排放，面试官立刻明白了。', 'I put a circulation diagram next to a user flow; the interviewer understood immediately.'),
        hardest: p('组件化思维，需要重新训练。', 'Component thinking had to be trained from scratch.'),
        advice: p('用你最熟悉的语言解释新领域，沟通效率最高。', 'Explain the new field in the language you already own.')
      },
      timeline: [
        [p('室内设计师', 'Interior designer'), p('3 年商业空间经验', '3 years in commercial spaces')],
        [p('自学交互', 'Self-taught interaction'), p('系统学习流程与组件规范', 'Flows and component standards')],
        [p('完整重设计项目', 'One full redesign'), p('3 个月完成端到端案例', 'An end-to-end case in 3 months')],
        [p('入职', 'Hired'), p('6 个月，进入互联网设计团队', '6 months later, joined an internet design team')]
      ],
      skills: [p('流程设计', 'Flow design'), p('组件规范', 'Component standards'), p('用户测试', 'User testing')]
    },

    {
      id: 'c7', dir: 'pm', art: 'wall',
      tag: p('从建筑到项目管理', 'Architecture → Program'),
      title: p('从建筑到项目管理：让复杂落地的能力',
               'Architecture to program management: the ability to land complexity'),
      excerpt: p('我负责的不再是图纸，而是人、资源与时间的协同。',
                 'What I manage now is not drawings but people, resources and time.'),
      author: p('蟑工头', 'Foreman Roach'), pose: 'roach-hat', tone: 'peach', mentor: 'zhangjingli',
      role: p('前建筑师，现项目经理', 'Former architect, now program manager'),
      prep: 4, read: 5, date: '2024-01-16', age: 33, offline: false, consultable: true,
      story: {
        why: p('我发现自己在项目里最大的价值，是让二十个人朝同一个方向走。', 'My biggest contribution on any project was getting twenty people pointed the same way.'),
        xfer: p('出图节点就是版本发布，专业会签就是跨部门评审。', 'Drawing milestones are releases; discipline sign-off is cross-team review.'),
        material: p('简历上我只写了三件事：管过多少人、多长周期、交付质量如何。', 'My CV said three things: how many people, how long, what quality.'),
        interview: p('对方最关心的是：出问题时你怎么办。', 'They only wanted to know what I do when things go wrong.'),
        hardest: p('放弃对细节的控制欲。', 'Letting go of control over details.'),
        advice: p('把协调经历量化，这是建筑人最被低估的资产。', 'Quantify your coordination work — it is the most underrated asset architects have.')
      },
      timeline: [
        [p('建筑师', 'Architect'), p('8 年大型公建项目', '8 years on large public projects')],
        [p('承担项目统筹', 'Taking on coordination'), p('负责多专业接口与节点', 'Owned interfaces and milestones')],
        [p('转入互联网 PMO', 'Into an internet PMO'), p('4 个月完成转型', 'Transitioned in 4 months')]
      ],
      skills: [p('多方协同', 'Coordination'), p('风险管理', 'Risk management'), p('节奏控制', 'Cadence')]
    },

    {
      id: 'c8', dir: 'realestate', art: 'atrium',
      tag: p('从建筑到数据分析', 'Architecture → Data'),
      title: p('从建筑到数据分析：用数据理解空间与人',
               'Architecture to data: understanding space and people with numbers'),
      excerpt: p('从调研到建模，我用数据为设计与决策提供依据。',
                 'From survey to model, I now supply the evidence behind design and decisions.'),
      author: p('数据蟑', 'Data Roach'), pose: 'roach-glasses', tone: 'mint', mentor: 'zhanghuazhang',
      role: p('前建筑师，现空间数据分析师', 'Former architect, now spatial data analyst'),
      prep: 8, read: 7, date: '2023-12-11', age: 28, offline: true, consultable: true,
      story: {
        why: p('做商业综合体调研时，我第一次意识到人流数据比直觉可靠。', 'Surveying a mixed-use complex, I saw that footfall data beat intuition.'),
        xfer: p('场地分析就是空间数据分析，只是工具从 CAD 换成了 Python。', 'Site analysis is spatial data analysis — the tool changes from CAD to Python.'),
        material: p('我用公开数据做了一份城市商业活力分析，成为最有力的作品。', 'I built a city retail-vitality analysis from open data — my strongest piece.'),
        interview: p('他们最看重的是我能同时读懂空间和数据。', 'What mattered was reading both space and data.'),
        hardest: p('统计基础要从头补，这部分没有捷径。', 'Statistics had to be rebuilt from scratch — no shortcut there.'),
        advice: p('建筑人做数据，优势在提问，不在算法。', 'For architects in data, the edge is asking questions, not algorithms.')
      },
      timeline: [
        [p('建筑师', 'Architect'), p('4 年商业与城市项目', '4 years in retail and urban projects')],
        [p('学习数据工具', 'Learning data tools'), p('Python、SQL 与统计基础', 'Python, SQL and statistics')],
        [p('公开数据项目', 'An open-data project'), p('完成城市商业活力分析', 'City retail-vitality analysis')],
        [p('入职', 'Hired'), p('8 个月，进入地产研究团队', '8 months later, joined a real estate research team')]
      ],
      skills: [p('空间分析', 'Spatial analysis'), p('数据可视化', 'Data visualisation'), p('Python', 'Python')]
    },

    {
      id: 'c9', dir: 'content', art: 'plant',
      tag: p('从建筑到内容策划', 'Architecture → Content'),
      title: p('从建筑到内容策划：讲好设计背后的故事',
               'Architecture to content: telling the story behind the design'),
      excerpt: p('我用内容连接设计与人，让专业被更多人理解。',
                 'Content became the bridge between design and people.'),
      author: p('写字蟑', 'Writer Roach'), pose: 'roach-book', tone: 'lavender', mentor: 'zhangboshi',
      role: p('前建筑师，现内容策划', 'Former architect, now content strategist'),
      prep: 5, read: 5, date: '2023-11-20', age: 27, offline: false, consultable: false,
      story: {
        why: p('我写的项目介绍被同事转了很多次，那时我意识到这也是一种能力。', 'A project write-up of mine kept getting shared internally — that was the signal.'),
        xfer: p('建筑训练给了我判断什么值得写的直觉。', 'Architecture gave me the instinct for what is worth writing about.'),
        material: p('我坚持更新了一年专栏，作品集就是那 40 篇文章。', 'I ran a column for a year — those 40 pieces were my portfolio.'),
        interview: p('对方只问了一个问题：你怎么判断一个选题好不好。', 'One question only: how do you judge whether a topic is good.'),
        hardest: p('从「写给同行」变成「写给外行」。', 'Shifting from writing for peers to writing for outsiders.'),
        advice: p('公开写作是成本最低的转行方式。', 'Public writing is the cheapest possible pivot.')
      },
      timeline: [
        [p('建筑师', 'Architect'), p('3 年设计与文本经验', '3 years of design and writing')],
        [p('开始公开写作', 'Starting to publish'), p('每周更新专业专栏', 'A weekly professional column')],
        [p('转入内容团队', 'Into a content team'), p('5 个月完成转型', 'Transitioned in 5 months')]
      ],
      skills: [p('选题判断', 'Editorial judgement'), p('长文写作', 'Long-form writing'), p('专业翻译', 'Translating expertise')]
    }
  ];

  window.CASE_FILTERS = {
    fulltime: [
      { v: 'yes', label: p('脱产准备', 'Took time off') },
      { v: 'no', label: p('在职准备', 'While working') }
    ],
    consultable: [
      { v: 'yes', label: p('可咨询', 'Available') },
      { v: 'no', label: p('暂不可咨询', 'Not available') }
    ]
  };
})();
