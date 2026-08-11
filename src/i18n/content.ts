export type Lang = "zh" | "en";

export type FlowStep = string | { parallel: string[]; note: string };

export type StageContent = {
  id: string;
  stage: string;
  question: string;
  title: string;
  summary: string;
  tags: string[];
  flow?: FlowStep[];
  flowLabel?: string;
  tabsLabel?: string;
  tabs?: { name: string; desc: string }[];
  notesLabel: string;
  notes: string[];
};

export type CardContent = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
};

export type SiteContent = {
  name: string;
  tagline: string;
  skills: string[];
  workflowTitle: string;
  workflowIntro: string;
  stages: StageContent[];
  strategyHeading: string;
  analysisHeading: string;
  viewDetail: string;
  strategies: CardContent[];
  projects: CardContent[];
  disclaimer: string;
  copyright: string;
};

const zh: SiteContent = {
  name: "项祎程",
  tagline: "运用编程工具通过构建模型对公司及行业进行量化分析",
  skills: ["Python", "Matlab", "Cursor", "Claude Code", "Wind"],
  workflowTitle: "AI 投研工作流",
  workflowIntro:
    "把投研流程拆成「发现 → 定价 → 择时」三个环节，各自用一套可复用的工具承接，串成一条能每日滚动运行的中长期投资流水线。",
  stages: [
    {
      id: "premarket",
      stage: "发现",
      question: "买什么",
      title: "盘前报告",
      summary:
        "每个交易日开盘前扫描全市场消息面，把分散的新闻映射到产业链分支，输出当日催化剂与候选标的清单。",
      tags: ["消息面扫描", "催化剂打分", "定时任务", "Wind 核验"],
      flowLabel: "筛选链条",
      flow: [
        "消息面采集",
        "产业链映射",
        "受益个股",
        "基本面与行业地位验证",
        "利好强度打分",
        "降序推荐",
      ],
      notesLabel: "设计取舍",
      notes: [
        "只采「上一交易日 15:00 收盘后 → 当前」区间内的消息，越界旧消息一律剔除，避免把隔夜陈料当成新催化剂。",
        "个股须通过基本面与行业地位验证才进入清单，不以消息热度单一维度排序。",
      ],
    },
    {
      id: "analyzer",
      stage: "定价",
      question: "值多少",
      title: "财报透析",
      summary:
        "自建的 A 股基本面与估值分析平台，七个分析模块覆盖从业绩检验到估值定价的完整链条，输出估值区间而非单一目标价。",
      tags: ["Python", "akshare", "Wind", "杜邦分解", "三档情景"],
      tabsLabel: "七大分析模块",
      tabs: [
        { name: "业绩检验", desc: "盈利能力指标、业绩自洽性四组对照、现金流含金量验证" },
        { name: "业绩归因", desc: "ROE 杜邦分解、营收拆解、利润率瀑布" },
        { name: "验证排雷", desc: "资产端／偿债／治理三维扫描 + 红黄绿仪表盘" },
        { name: "估值区间", desc: "PE 六维矩阵与三角验证；周期股走 PB 路径" },
        { name: "盈利预测", desc: "三档情景 EPS + 敏感性分析 + 预期差量化" },
        { name: "量价印证", desc: "业绩窗口、排雷增强、估值修复、资金流向四场景" },
        { name: "行业对比", desc: "八维相似度筛选精选同行 + 行业分位定位" },
      ],
      notesLabel: "设计取舍",
      notes: [
        "只输出估值区间与悲观／中性／乐观三档情景，不预测单一目标价；关键假设全部显式化并做敏感性分析。",
        "排雷阶段红灯一票否决——不允许用其他绿灯加权平均掩盖单点风险。",
        "周期股与金融股自动识别并切换至 PB 穿越周期路径，规避 PE×EPS 在周期低谷失真。",
      ],
    },
    {
      id: "tracker",
      stage: "择时",
      question: "何时买",
      title: "StockTracker",
      summary:
        "对候选池持续跟踪，从三个相互独立的维度研判入场时机，给出可执行的入场与风控参数。",
      tags: ["三维打分", "事件驱动", "三重障碍", "自选股持久化"],
      flowLabel: "研判链条",
      flow: [
        { parallel: ["关联事件", "公司公告", "技术面"], note: "三维并行" },
        "三维综合打分",
        "入场评级 A／B／C",
        "入场区间 · 止损位 · 分批目标 · 仓位建议",
      ],
      notesLabel: "设计取舍",
      notes: [
        "选股与择时严格分离——利好本身不构成入场理由，入场信号由技术面与事件独立触发，避免看到消息就追高。",
        "输出固定包含入场区间、止损位、分批目标、仓位建议与核心风险点；持仓标的强制给出止盈止损。",
      ],
    },
  ],
  strategyHeading: "策略分析",
  analysisHeading: "分析结果",
  viewDetail: "查看详情",
  strategies: [
    {
      id: "task5",
      title: "股票相对价值策略",
      summary: "基于 AMZN 与 MSFT 构建 Copula 相对价值策略，并进行样本外回测与风险分析",
      tags: ["相对价值策略", "蒙特卡洛模拟", "GJR-GARCH", "DCC-GARCH", "Copula"],
    },
  ],
  projects: [
    {
      id: "task1",
      title: "行业投资组合的多因子定价模型分析",
      summary: "对比不同因子模型在高科技行业与健康医疗行业的拟合度",
      tags: ["因子模型", "动量效应", "回归分析"],
    },
    {
      id: "task2",
      title: "股票波动率分析",
      summary: "用两种波动率计算方法分析APLD和PSLV的风险特征",
      tags: ["Parkinson Volatility", "Close-to-close Volatility"],
    },
    {
      id: "task3",
      title: "股票指数的GARCH模型对比分析",
      summary:
        "用两种GARCH模型分别对纳斯达克和道琼斯指数进行风险特征分析并进行残差自相关性检验",
      tags: ["GARCH", "GJR-GARCH", "非对称效应", "ACF"],
    },
    {
      id: "task4",
      title: "多种投资组合最优策略",
      summary: "通过对六只股票的历史数据进行定量分析，构建了多种优化策略 ，从而对比出最优投资组合策略",
      tags: ["最小方差模型", "最大夏普比率模型", "风险平价模型", "Black-Litterman模型"],
    },
    {
      id: "task6",
      title: "期权定价模型对比分析",
      summary:
        "通过GBM模型对不同频率的AAPL股票进行路径模拟，以及用Heston模型进行路径模拟和敏感性测试",
      tags: ["几何布朗运动", "Heston模型", "敏感性测试"],
    },
  ],
  disclaimer:
    "本站内容仅为个人研究与技术能力展示，不构成任何投资建议或证券推荐。文中出现的证券代码仅作为量化模型的演示样本。",
  copyright: "© 2026 · Built with passion & code",
};

const en: SiteContent = {
  name: "Yicheng Xiang",
  tagline:
    "Quantitative analysis of companies and industries through programming and model building",
  skills: ["Python", "Matlab", "Cursor", "Claude Code", "Wind"],
  workflowTitle: "AI-Powered Research Workflow",
  workflowIntro:
    "Equity research split into three stages — Discover, Value, Time — each handled by its own reusable toolchain, together forming a pipeline that runs daily for medium- to long-term investing.",
  stages: [
    {
      id: "premarket",
      stage: "Discover",
      question: "What to buy",
      title: "Pre-Market Report",
      summary:
        "Scans market-wide news before each trading session, maps scattered headlines onto industry-chain branches, and outputs a daily catalyst and candidate shortlist.",
      tags: ["News Scanning", "Catalyst Scoring", "Scheduled Job", "Wind Verification"],
      flowLabel: "Screening Pipeline",
      flow: [
        "News Collection",
        "Industry-Chain Mapping",
        "Beneficiary Stocks",
        "Fundamental & Positioning Check",
        "Catalyst Strength Scoring",
        "Ranked Shortlist",
      ],
      notesLabel: "Design Trade-offs",
      notes: [
        "Only ingests news published between the previous session's 15:00 close and the present moment; anything outside that window is discarded, so stale overnight material never passes as a fresh catalyst.",
        "A stock reaches the shortlist only after clearing fundamental and industry-positioning checks — ranking is never driven by news heat alone.",
      ],
    },
    {
      id: "analyzer",
      stage: "Value",
      question: "What it's worth",
      title: "Financial Deep-Dive",
      summary:
        "A self-built A-share fundamental and valuation platform. Seven modules cover the full chain from earnings verification to pricing, producing a valuation range rather than a single price target.",
      tags: ["Python", "akshare", "Wind", "DuPont Analysis", "Three Scenarios"],
      tabsLabel: "Seven Analysis Modules",
      tabs: [
        {
          name: "Earnings Verification",
          desc: "Profitability metrics, four-way consistency checks, cash-flow quality validation",
        },
        {
          name: "Earnings Attribution",
          desc: "DuPont ROE decomposition, revenue breakdown, margin waterfall",
        },
        {
          name: "Risk Screening",
          desc: "Asset / solvency / governance scan with a red-amber-green dashboard",
        },
        {
          name: "Valuation Range",
          desc: "Six-dimension P/E matrix and triangulation; cyclicals routed to a P/B path",
        },
        {
          name: "Earnings Forecast",
          desc: "Three-scenario EPS, sensitivity analysis, quantified expectation gap",
        },
        {
          name: "Price-Volume Check",
          desc: "Earnings window, risk confirmation, re-rating and fund-flow scenarios",
        },
        {
          name: "Peer Comparison",
          desc: "Eight-factor similarity screening plus industry percentile positioning",
        },
      ],
      notesLabel: "Design Trade-offs",
      notes: [
        "Outputs a valuation range across bear / base / bull scenarios rather than a single price target; every key assumption is stated explicitly and stress-tested.",
        "A single red flag in risk screening is disqualifying — weighted averaging is not allowed to mask a point risk.",
        "Cyclicals and financials are auto-detected and routed to a through-cycle P/B path, avoiding P/E × EPS distortion at cyclical troughs.",
      ],
    },
    {
      id: "tracker",
      stage: "Time",
      question: "When to buy",
      title: "StockTracker",
      summary:
        "Continuously monitors the candidate pool, assessing entry timing across three independent dimensions and producing actionable entry and risk-control parameters.",
      tags: ["Three-Factor Scoring", "Event-Driven", "Triple Barrier", "Persistent Watchlist"],
      flowLabel: "Assessment Pipeline",
      flow: [
        {
          parallel: ["Related Events", "Company Filings", "Technicals"],
          note: "Three parallel tracks",
        },
        "Composite Scoring",
        "Entry Grade A／B／C",
        "Entry Range · Stop-Loss · Scaled Targets · Position Sizing",
      ],
      notesLabel: "Design Trade-offs",
      notes: [
        "Selection and timing are strictly separated — good news alone is never a reason to enter. Entry signals are triggered independently by technicals and events, which guards against chasing a headline.",
        "Every output carries an entry range, stop-loss, scaled targets, position sizing and key risks; held positions must specify take-profit and stop-loss levels.",
      ],
    },
  ],
  strategyHeading: "Strategy Research",
  analysisHeading: "Quantitative Analysis",
  viewDetail: "View details",
  strategies: [
    {
      id: "task5",
      title: "Equity Relative-Value Strategy",
      summary:
        "A Copula-based relative-value strategy on AMZN and MSFT, with out-of-sample backtesting and risk analysis",
      tags: ["Relative Value", "Monte Carlo", "GJR-GARCH", "DCC-GARCH", "Copula"],
    },
  ],
  projects: [
    {
      id: "task1",
      title: "Multi-Factor Pricing Models for Industry Portfolios",
      summary: "Comparing the fit of factor models across the technology and healthcare sectors",
      tags: ["Factor Models", "Momentum", "Regression Analysis"],
    },
    {
      id: "task2",
      title: "Equity Volatility Analysis",
      summary: "Risk profiling of APLD and PSLV using two volatility estimators",
      tags: ["Parkinson Volatility", "Close-to-close Volatility"],
    },
    {
      id: "task3",
      title: "GARCH Model Comparison on Equity Indices",
      summary:
        "Risk profiling of the Nasdaq and Dow Jones under two GARCH specifications, with residual autocorrelation testing",
      tags: ["GARCH", "GJR-GARCH", "Asymmetry", "ACF"],
    },
    {
      id: "task4",
      title: "Optimal Portfolio Construction",
      summary:
        "Quantitative analysis of six stocks' historical data to build and compare multiple optimisation strategies",
      tags: ["Minimum Variance", "Maximum Sharpe", "Risk Parity", "Black-Litterman"],
    },
    {
      id: "task6",
      title: "Option Pricing Model Comparison",
      summary:
        "GBM path simulation of AAPL at varying frequencies, plus Heston path simulation and sensitivity testing",
      tags: ["Geometric Brownian Motion", "Heston Model", "Sensitivity Testing"],
    },
  ],
  disclaimer:
    "All content on this site is for personal research and technical demonstration only. It does not constitute investment advice or a securities recommendation. Any ticker symbols shown serve solely as samples for quantitative modelling.",
  copyright: "© 2026 · Built with passion & code",
};

export const content: Record<Lang, SiteContent> = { zh, en };
