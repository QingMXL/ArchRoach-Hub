---
name: "ArchRoach Hub Folder UI Design System"
version: "1.0.0"
status: "active"
locale:
  default: "zh-CN"
  supported:
    - "zh-CN"
    - "en-US"
brand:
  product_name_en: "ArchRoach Hub"
  product_name_zh: "建筑蟑螂互助会"
  visual_keywords:
    - "soft SaaS"
    - "folder-based information architecture"
    - "architectural order"
    - "friendly editorial UI"
    - "playful roach mascot"
  mascot:
    required: true
    role: "brand identity, navigation cue, empty state, helper illustration"
    usage_density: "low"
    style: "simple black outline, warm brown body, rounded proportions, friendly expression"

tokens:
  color:
    neutral:
      0: "#FFFFFF"
      25: "#FCFCFD"
      50: "#F8F8FA"
      75: "#F4F4F7"
      100: "#EEEEF2"
      200: "#E2E3E8"
      300: "#CFD1D8"
      400: "#A6A8B2"
      500: "#777A85"
      600: "#5B5E68"
      700: "#3B3D45"
      800: "#23242A"
      900: "#111217"
    brand:
      roach_50: "#FFF7F1"
      roach_100: "#FBE9DC"
      roach_200: "#F3CFB5"
      roach_300: "#E7AD83"
      roach_400: "#D4864E"
      roach_500: "#B9632E"
      roach_600: "#93451F"
      roach_700: "#713318"
      roach_800: "#4D2413"
      roach_900: "#2E170D"
    pastel:
      lavender: "#EEEAFB"
      lavender_strong: "#DFD8F5"
      blue: "#E8F3FB"
      blue_strong: "#D6EAF7"
      peach: "#FBEBDD"
      peach_strong: "#F5DCC8"
      mint: "#EAF5EE"
      mint_strong: "#D6EBDD"
      rose: "#F8EAF0"
      rose_strong: "#EFD5E1"
      gray: "#EFF0F3"
    semantic:
      success: "#2E8B57"
      warning: "#C47A16"
      danger: "#D14343"
      info: "#3F6FB6"
    surface:
      canvas: "#F1F1F4"
      app: "#FFFFFF"
      sidebar: "#FCFCFD"
      raised: "#FFFFFF"
      soft: "#F8F8FA"
      selected: "#F2EFFA"
      overlay: "rgba(17,18,23,0.38)"
    text:
      primary: "#17181D"
      secondary: "#646771"
      tertiary: "#9699A3"
      inverse: "#FFFFFF"
      brand: "#713318"
    border:
      subtle: "#ECECF0"
      default: "#E2E3E8"
      strong: "#C9CBD3"
      focus: "#B9632E"
    interactive:
      primary_bg: "#17181D"
      primary_bg_hover: "#2A2B31"
      primary_text: "#FFFFFF"
      secondary_bg: "#FFFFFF"
      secondary_bg_hover: "#F8F8FA"
      secondary_text: "#17181D"
      accent_bg: "#B9632E"
      accent_bg_hover: "#93451F"
      accent_text: "#FFFFFF"
      ghost_hover: "rgba(17,18,23,0.045)"
      selected_bg: "#F2EFFA"
      selected_text: "#17181D"

  typography:
    font_family:
      sans: "'Inter', 'SF Pro Text', 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif"
      display: "'Inter', 'SF Pro Display', 'PingFang SC', 'Noto Sans SC', system-ui, sans-serif"
      mono: "'IBM Plex Mono', 'SFMono-Regular', 'JetBrains Mono', monospace"
    font_weight:
      regular: 400
      medium: 500
      semibold: 600
      bold: 700
    font_size:
      display: "48px"
      h1: "36px"
      h2: "28px"
      h3: "22px"
      h4: "18px"
      body_lg: "16px"
      body_md: "14px"
      body_sm: "12px"
      caption: "11px"
    line_height:
      display: 1.08
      heading: 1.2
      body: 1.55
      compact: 1.35
    letter_spacing:
      tight: "-0.025em"
      normal: "0"
      mono: "0.01em"

  spacing:
    base: "4px"
    0: "0"
    1: "4px"
    2: "8px"
    3: "12px"
    4: "16px"
    5: "20px"
    6: "24px"
    8: "32px"
    10: "40px"
    12: "48px"
    16: "64px"
    20: "80px"

  layout:
    viewport_min: "1280px"
    viewport_target: "1440px"
    viewport_max: "1920px"
    app_shell_max_width: "1600px"
    outer_margin: "32px"
    sidebar_width: "240px"
    topbar_height: "72px"
    content_padding_x: "32px"
    content_padding_y: "28px"
    section_gap: "36px"
    grid_gap: "20px"
    card_min_width: "260px"
    card_max_width: "360px"

  radius:
    xs: "8px"
    sm: "12px"
    md: "16px"
    lg: "22px"
    xl: "28px"
    pill: "999px"
    app_shell: "30px"
    folder_tab: "18px"

  shadow:
    none: "none"
    xs: "0 1px 2px rgba(17,18,23,0.04)"
    sm: "0 4px 12px rgba(17,18,23,0.055)"
    md: "0 10px 28px rgba(17,18,23,0.075)"
    lg: "0 22px 56px rgba(17,18,23,0.10)"
    offset_soft: "5px 7px 0 rgba(17,18,23,0.035)"
    offset_brand: "5px 7px 0 rgba(185,99,46,0.10)"
    floating: "0 16px 40px rgba(17,18,23,0.12)"

  stroke:
    hairline: "1px"
    medium: "1.5px"
    strong: "2px"

  motion:
    duration:
      fast: "140ms"
      normal: "220ms"
      slow: "360ms"
    easing:
      standard: "cubic-bezier(0.2, 0.8, 0.2, 1)"
      emphasized: "cubic-bezier(0.22, 1, 0.36, 1)"
    interaction:
      hover_lift: "translateY(-3px)"
      press: "translateY(0) scale(0.985)"
      folder_open: "transform 220ms cubic-bezier(0.22,1,0.36,1), opacity 180ms ease-out"

  iconography:
    size:
      xs: "14px"
      sm: "18px"
      md: "20px"
      lg: "24px"
    stroke_width: "1.7"
    style: "rounded outline"

  component:
    navigation_item:
      height: "40px"
      radius: "12px"
      padding_x: "12px"
      gap: "10px"
    search:
      height: "42px"
      width_default: "360px"
      radius: "12px"
    filter_chip:
      height: "38px"
      radius: "999px"
      padding_x: "14px"
    folder_card:
      height: "164px"
      padding: "20px"
      tab_width: "112px"
      tab_height: "24px"
      radius: "22px"
    content_card:
      min_height: "208px"
      radius: "22px"
      padding: "18px"
      image_ratio: "16 / 9"
    avatar:
      sm: "24px"
      md: "32px"
      lg: "44px"
    button:
      sm_height: "34px"
      md_height: "42px"
      lg_height: "48px"
      radius: "12px"
    badge:
      height: "22px"
      radius: "999px"
---

## Overview

本设计系统用于将 **ArchRoach Hub｜建筑蟑螂互助会** 的现有网站界面，重构为更接近参考图中的“文件夹式内容工作台”。

当前阶段**放弃开场动画**，重点建设一个稳定、清晰、具有收藏与探索感的主界面。整体体验介于：

- 设计师使用的灵感资料库
- 轻量化职业探索工具
- 内容丰富但不压迫的现代 SaaS 工作台

核心视觉特征：

1. **左侧固定导航**：建立稳定产品框架。
2. **顶部搜索与筛选**：帮助用户快速检索转行方向、案例和前辈。
3. **文件夹卡片**：承载职业方向、技能类别、案例专题等一级内容集合。
4. **内容卡片网格**：承载具体案例、前辈、岗位和指南。
5. **卡通蟑螂元素**：必须保留，作为整个产品的主题识别，而不是普通装饰。

蟑螂在本产品中的含义是：

> 建筑人具有高适应力、强学习力与顽强迁移能力，可以在不同职业环境中继续生长。

因此，蟑螂角色应当传递“聪明、顽强、好奇、互助”，而不是脏乱、惊吓或恶搞。

界面应实现两个看似矛盾但必须同时成立的目标：

- 主结构专业、冷静、有秩序；
- 品牌细节亲切、有记忆点、有轻微幽默感。

## Colors

### 基础色彩逻辑

主界面采用**白色与冷灰色**作为基础，不再使用整体偏黄或偏米色的背景。

- 外层画布：浅冷灰，用来衬托主应用容器。
- 应用容器：纯白色。
- 卡片与侧边栏：白色或极浅灰色。
- 文本：黑色与冷灰色。
- 品牌强调：蟑螂棕色。
- 内容分类：低饱和粉彩色。

这种色彩体系既保留参考图的柔和感，也能保持建筑与设计行业需要的理性和精确。

### 蟑螂品牌色

`roach_500` 是主品牌色，用于：

- 主要 CTA
- 当前选中状态的小面积强调
- 蟑螂插画主体
- 图标或关键数据
- 重点链接和状态标识

品牌棕色不得大面积铺满整个页面。它的作用是形成记忆点，而不是统治整个界面。

推荐比例：

- 中性色：75%
- 粉彩分类色：18%
- 蟑螂品牌色：7%

### 文件夹分类色

文件夹使用低饱和粉彩色区分内容集合：

- 淡紫：转行方向、职业探索
- 淡蓝：真实案例、方法与研究
- 淡桃：前辈咨询、预约与服务
- 淡绿：能力迁移、学习资源
- 淡玫瑰：招聘机会、市场信息

这些颜色只用于文件夹卡片背景或轻量标签，不作为页面大面积背景。

### 对比度要求

- 正文必须使用 `text.primary` 或 `text.secondary`。
- 粉彩色背景上的文字仍使用深色文字，不使用浅色文字。
- 按钮文字对比度达到 WCAG AA。
- 辅助信息不得低于 `neutral.500`，避免“高级感”变成“看不清”。

## Typography

### 字体风格

排版应像一个现代设计工具，而不是传统招聘门户。

主字体采用清晰的无衬线字体：

- 中文：PingFang SC / Noto Sans SC
- 英文与数字：Inter / SF Pro
- 少量标签、编号和资料属性：IBM Plex Mono

### 层级建议

- 页面标题：36px / 600
- 区块标题：22–28px / 500–600
- 文件夹标题：18px / 500
- 内容卡片标题：16–18px / 500
- 正文与简介：14px / 400
- 时间、数量、状态：12px / 400

首页与内容页不需要超大标题。界面重点是“可浏览”和“可操作”，而不是海报式视觉冲击。

### 字体使用原则

- 标题尽量控制在一至两行。
- 卡片标题超过两行时截断，不增加卡片高度。
- 中文正文行高使用 1.55 左右。
- 只有数据、代码、快捷键、分类代号使用等宽字体。
- 不在一个卡片内混用三种以上字号。

## Layout

### 应用外壳

页面采用“浅灰画布中的白色应用窗口”结构：

```text
浅灰色浏览器画布
└── 白色圆角应用容器
    ├── 左侧导航
    ├── 顶部工具栏
    └── 主内容区
```

主应用容器应有较大的整体圆角，并与屏幕边缘保持 24–40px 的间距，使其像一个独立的数字工作台。

### 左侧导航

桌面端固定宽度约 240px，包含：

- 品牌 Logo 与名称
- 一级导航
- 通知入口
- 收藏或快捷入口
- 底部用户信息或设置

导航选中态使用淡紫或柔和中性色背景，不用大面积品牌棕色。

蟑螂可以出现在：

- Logo 图标
- 当前新手引导
- 空状态提示
- 底部帮助入口

不应让每个导航项都使用蟑螂图标。

### 顶部工具栏

顶部工具栏承担搜索、语言切换和全局操作：

- 左侧：搜索框
- 中间或右侧：快捷筛选、发布、预约入口
- 最右：`中 / EN`、通知、用户头像

工具栏高度保持稳定，不随页面变化。

### 主内容区

主内容区遵循以下节奏：

1. 页面标题与简介
2. 筛选器或关键操作
3. 文件夹集合
4. 具体内容卡片
5. 分页或加载更多

文件夹卡片与内容卡片之间必须有清晰层级。文件夹是“内容集合入口”，普通卡片是“具体内容”。

### 响应式策略

桌面优先：

- ≥1440px：3–4 列卡片
- 1200–1439px：3 列卡片
- 768–1199px：折叠侧栏，2 列卡片
- <768px：单列卡片，文件夹横向滚动

## Elevation & Depth

### 层级原则

深度来源于：

- 浅灰背景与白色应用容器的分离
- 卡片之间轻微阴影
- 文件夹标签页与主体的形状差异
- 少量偏移阴影

不使用玻璃拟态、强烈高光或厚重投影。

### 应用层级

- 页面画布：无阴影
- 应用外壳：`shadow.lg`
- 普通卡片：`shadow.xs` 或 `shadow.sm`
- 文件夹卡片：`shadow.sm + offset_soft`
- 重点 CTA：允许 `offset_brand`
- 弹窗与抽屉：`shadow.floating`

### 悬停效果

卡片 Hover 时：

- 上移 3px
- 阴影由 `sm` 过渡到 `md`
- 边框略微加深
- 不放大卡片，不使用剧烈旋转

文件夹卡片 Hover 时，可以轻微提升“文件夹标签页”，表现正在被打开或选择。

## Shapes

### 总体形状语言

系统采用“柔和几何形状”：

- 应用外壳：大圆角矩形
- 普通卡片：圆角矩形
- 筛选器与标签：胶囊形
- 文件夹：顶部标签页 + 大圆角主体
- 蟑螂插画：圆润、柔和、不写实

### 文件夹形状

文件夹是本设计系统最关键的视觉特征。

建议结构：

```text
        ┌──────── 标签页 ────────┐
┌───────┘                        │
│                                │
│           文件夹内容           │
│                                │
└────────────────────────────────┘
```

实现要求：

- 标签页位于左上方。
- 标签页宽度不超过卡片宽度的 45%。
- 标签页与主体必须是一体化轮廓，而不是额外叠一个矩形。
- 文件夹整体圆角 20–24px。
- 不使用真实文件夹的复杂阴影和纸张纹理。

### 蟑螂角色形状

卡通蟑螂应保持统一：

- 头部和身体为椭圆形
- 黑色或深棕色描边
- 主体使用 `roach_500–700`
- 眼睛、触角和动作线保持简洁
- 可以佩戴建筑帽、背包、眼镜或拿图纸，以匹配不同场景

禁止使用写实蟑螂照片或恐怖化表现。

## Components

### 1. App Shell

应用外壳是所有主页面的统一容器。

组成：

- 外层浅灰画布
- 白色圆角主容器
- 左侧导航
- 顶部工具栏
- 内容区

所有页面必须复用同一 App Shell，避免首页、案例页和预约页看起来像不同产品。

### 2. Sidebar Navigation

导航项包括：

- 首页
- 转行方向
- 真实案例
- 能力迁移
- 招聘机会
- 前辈咨询
- 收藏
- 通知

选中态：

- 浅紫色或浅灰底
- 黑色文字
- 图标保持深色
- 不使用实心棕色高亮

品牌 Logo 中必须包含卡通蟑螂。

### 3. Global Search

搜索框用于检索：

- 转行方向
- 案例
- 前辈
- 招聘岗位

交互：

- 支持快捷键 `⌘ K` 或 `Ctrl K`
- 输入时展示分组搜索结果
- 搜索结果按“方向 / 案例 / 前辈 / 岗位”分组

视觉：

- 42px 高
- 轻边框
- 12px 圆角
- 聚焦后使用品牌棕色外圈，但宽度不超过 2px

### 4. Folder Card

文件夹卡片用于一级内容集合，例如：

- 产品与体验设计
- 商业与策略
- AI与技术
- 地产与城市
- 已收藏案例
- 我的咨询记录

内容结构：

- 标题
- 内容数量
- 小头像组或图标
- 更多菜单
- 可选的小蟑螂状态图

不在文件夹卡片中放置长段简介。

### 5. Career Direction Card

用于展示具体转行方向。

结构：

- 顶部图片或抽象视觉
- 方向名称
- 适配度
- 是否需要作品集
- 准备周期
- 相关案例数

卡片底部可使用异形白色信息面板，但造型应统一，避免每张卡片不同。

### 6. Case Card

用于真实转行案例。

结构：

- 封面图
- 匿名路径标签
- 标题
- 原岗位 → 当前岗位
- 准备周期
- 是否可咨询
- 收藏按钮

案例卡片强调“路径”和“方法”，不突出真实身份。

### 7. Mentor Card

用于前辈咨询。

结构：

- 头像
- 昵称或授权名称
- 当前岗位
- 前建筑背景
- 可咨询主题
- 价格
- 预约按钮

预约按钮使用品牌棕色。每张卡片只保留一个主操作。

### 8. Roach Mascot Component

蟑螂元素不是普通 Emoji，而是独立品牌组件。

建议建立以下变体：

- `RoachLogo`：品牌 Logo
- `RoachGuide`：新手引导
- `RoachEmpty`：无内容状态
- `RoachSuccess`：预约成功
- `RoachSearch`：正在寻找方向
- `RoachMentor`：咨询场景
- `RoachBuilder`：能力迁移或作品集场景

尺寸：

- 导航 Logo：28–32px
- 卡片角落：32–48px
- 空状态：96–140px
- 引导区域：64–96px

任何单一视口内，完整蟑螂插画建议不超过 3 个。

### 9. Filter Chips

筛选器使用胶囊形，应用于：

- 工作年限
- 目标方向
- 是否需要作品集
- 准备周期
- 咨询价格

激活状态可使用浅粉彩底或淡棕底，文字仍保持深色。

### 10. Buttons

主要按钮：

- 品牌棕底白字
- 用于预约、提交、确认、探索方向

次级按钮：

- 白底深色文字
- 轻边框

幽灵按钮：

- 无填充
- 用于更多、查看全部、返回

一个卡片内最多一个主要按钮。

### 11. Empty State

空状态必须使用蟑螂插画强化主题。

示例：

- 无收藏：蟑螂抱着空文件夹
- 无搜索结果：蟑螂拿着放大镜
- 暂无咨询：蟑螂坐在两把空椅子之间
- 上传成功：蟑螂举着图纸庆祝

文案要轻松但不戏谑用户。

## Do's and Don'ts

### Do's

- 保留卡通蟑螂，并将其视为品牌核心资产。
- 使用白色、冷灰和低饱和粉彩色建立柔和工作台。
- 用文件夹卡片组织一级内容分类。
- 保持左侧导航和顶部工具栏稳定。
- 用大圆角和轻阴影构建亲和感。
- 给内容足够留白，不把所有字段都展示在卡片上。
- 使用统一的卡片模板，确保列表易于扫描。
- 将品牌棕色集中用在关键 CTA、Logo 与小面积强调。
- 用蟑螂不同动作传达状态，而不是重复同一个站立角色。

### Don'ts

- 不要移除蟑螂元素或将其弱化成不可见的小装饰。
- 不要使用写实蟑螂、恐怖蟑螂或昆虫照片。
- 不要将页面整体改成棕色、米色或黄色背景。
- 不要在每张卡片上都放一只蟑螂，避免视觉过载。
- 不要复制参考图中的产品名称、图标或具体业务内容。
- 不要使用重阴影、玻璃拟态或霓虹渐变。
- 不要让文件夹卡片承担过多文本信息。
- 不要让圆角尺寸随意变化。
- 不要把所有分类都使用不同高饱和颜色。
- 不要牺牲文字对比度来追求“轻”和“高级”。

最终界面应呈现以下感受：

> 像一个建筑人专属的职业资料工作台：内容整齐地装在文件夹里，蟑螂伙伴在不同节点提供引导，整体柔和、现代、聪明，同时具有鲜明的品牌记忆。
