import { useLayoutEffect, useRef, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

type ProjectConfig = {
  title: string;
  order: number;
  description: string[];
};

const projectData: Record<string, ProjectConfig> = {
  task1: {
    title: "行业投资组合的多因子定价模型分析",
    order: 1,
    description: [
      "通过对高科技行业（HiTec）和医疗保健行业（Hlth）的收益率进行建模，探究资产收益的驱动来源。",
      "研究从单一市场因子扩展至五因子模型，分析了包含动量、规模、价值、盈利能力及投资风格对行业收益的解释力。",
    ],
  },
  task2: {
    title: "股票波动率分析",
    order: 2,
    description: [
      "通过对比收盘价对收盘价 (Close-to-Close) 波动率和帕金森 (Parkinson) 波动率，分析了股票APLD和PSLV的风险特征。",
    ],
  },
  task3: {
    title: "股票指数的GARCH模型对比分析",
    order: 3,
    description: [
      "用GARCH(1,1) 和 GJR-GARCH(1,1) 模型分别对纳斯达克 (NDX) 和道琼斯 (DJI) 指数的风险特征进行抓取和比较，并且通过自相关函数检验标准化残差。",
    ],
  },
  task4: {
    title: "多种投资组合最优策略",
    order: 4,
    description: [
      "通过对六只股票的历史数据进行定量分析，构建了多种优化策略 ，从而对比出最优投资组合策略",
    ],
  },
  task5: {
    title: "股票相对价值策略",
    order: 1,
    description: ["通过AMZN和MSFT构建相对价值策略，并进行回测分析"],
  },
  task6: {
    title: "期权定价模型对比分析",
    order: 5,
    description: [
      "通过GBM模型对不同频率的AAPL股票进行路径模拟，以及用Heston模型进行路径模拟和敏感性测试",
    ],
  },
};

/** task4：原左侧截图中的权重与绩效文本（与 public/task4/*.JPG 一致） */
const TASK4_PORTFOLIO_TEXT: Record<
  string,
  {
    portfolioTitle: string;
    weights: { asset: string; weight: string; pct: string }[];
    metrics: { label: string; value: string }[];
  }
> = {
  mv: {
    portfolioTitle: "Minimum-Variance Portfolio",
    weights: [
      { asset: "AMZN", weight: "0.119681", pct: "11.97 %" },
      { asset: "CIEN", weight: "0.000000", pct: "0.00 %" },
      { asset: "LMT", weight: "0.343101", pct: "34.31 %" },
      { asset: "WMT", weight: "0.310861", pct: "31.09 %" },
      { asset: "NVDA", weight: "0.000000", pct: "0.00 %" },
      { asset: "MSFT", weight: "0.226356", pct: "22.64 %" },
    ],
    metrics: [
      { label: "Daily Portfolio Expected Return", value: "0.001109" },
      { label: "Daily Portfolio Volatility", value: "0.010676" },
      { label: "Annualized Expected Return", value: "0.279558" },
      { label: "Annualized Volatility", value: "0.169476" },
      { label: "Sharpe Ratio (Daily)", value: "0.092761" },
    ],
  },
  mr: {
    portfolioTitle: "Maximum-Return Portfolio",
    weights: [
      { asset: "AMZN", weight: "0.000000", pct: "0.00 %" },
      { asset: "CIEN", weight: "1.000000", pct: "100.00 %" },
      { asset: "LMT", weight: "0.000000", pct: "0.00 %" },
      { asset: "WMT", weight: "0.000000", pct: "0.00 %" },
      { asset: "NVDA", weight: "0.000000", pct: "0.00 %" },
      { asset: "MSFT", weight: "0.000000", pct: "0.00 %" },
    ],
    metrics: [
      { label: "Daily Portfolio Expected Return", value: "0.006155" },
      { label: "Daily Portfolio Volatility", value: "0.039147" },
      { label: "Annualized Expected Return", value: "1.551056" },
      { label: "Annualized Volatility", value: "0.621443" },
      { label: "Sharpe Ratio (Daily)", value: "0.154185" },
    ],
  },
  ms: {
    portfolioTitle: "Maximum-Sharpe Portfolio",
    weights: [
      { asset: "AMZN", weight: "0.000000", pct: "0.00 %" },
      { asset: "CIEN", weight: "1.000000", pct: "100.00 %" },
      { asset: "LMT", weight: "0.000000", pct: "0.00 %" },
      { asset: "WMT", weight: "0.000000", pct: "0.00 %" },
      { asset: "NVDA", weight: "0.000000", pct: "0.00 %" },
      { asset: "MSFT", weight: "0.000000", pct: "0.00 %" },
    ],
    metrics: [
      { label: "Daily Portfolio Expected Return", value: "0.006155" },
      { label: "Daily Portfolio Volatility", value: "0.039147" },
      { label: "Annualized Expected Return", value: "1.551056" },
      { label: "Annualized Volatility", value: "0.621443" },
      { label: "Sharpe Ratio (Daily)", value: "0.154185" },
    ],
  },
  rp: {
    portfolioTitle: "Risk-parity Portfolio",
    weights: [
      { asset: "AMZN", weight: "0.133551", pct: "13.36 %" },
      { asset: "CIEN", weight: "0.077292", pct: "7.73 %" },
      { asset: "LMT", weight: "0.255320", pct: "25.53 %" },
      { asset: "WMT", weight: "0.238000", pct: "23.80 %" },
      { asset: "NVDA", weight: "0.104976", pct: "10.50 %" },
      { asset: "MSFT", weight: "0.190861", pct: "19.09 %" },
    ],
    metrics: [
      { label: "Daily Portfolio Expected Return", value: "0.001543" },
      { label: "Daily Portfolio Volatility", value: "0.012371" },
      { label: "Annualized Expected Return", value: "0.388796" },
      { label: "Annualized Volatility", value: "0.196386" },
      { label: "Sharpe Ratio (Daily)", value: "0.115090" },
    ],
  },
  bl: {
    portfolioTitle: "Black-Litterman Portfolio",
    weights: [
      { asset: "AMZN", weight: "-0.430174", pct: "-43.02 %" },
      { asset: "CIEN", weight: "0.563834", pct: "56.38 %" },
      { asset: "LMT", weight: "0.702352", pct: "70.24 %" },
      { asset: "WMT", weight: "0.273913", pct: "27.39 %" },
      { asset: "NVDA", weight: "0.046403", pct: "4.64 %" },
      { asset: "MSFT", weight: "-0.156328", pct: "-15.63 %" },
    ],
    metrics: [
      { label: "Daily Portfolio Expected Return", value: "0.004952" },
      { label: "Daily Portfolio Volatility", value: "0.025428" },
      { label: "Annualized Expected Return", value: "1.247820" },
      { label: "Annualized Volatility", value: "0.403652" },
      { label: "Sharpe Ratio (Daily)", value: "0.190053" },
    ],
  },
};

const Task4PortfolioTextBlock = ({
  portfolioTitle,
  weights,
  metrics,
}: {
  portfolioTitle: string;
  weights: { asset: string; weight: string; pct: string }[];
  metrics: { label: string; value: string }[];
}) => (
  <div className="font-mono leading-snug text-muted-foreground w-full select-text">
    <p className="text-foreground font-semibold mb-[0.5em] border-b border-primary/20 pb-[0.35em]">
      {portfolioTitle}
    </p>
    <table className="w-full border-collapse mb-[0.65em]">
      <thead>
        <tr className="text-primary/90">
          <th className="py-[0.12em] pr-[0.5em] text-left font-medium">Asset</th>
          <th className="py-[0.12em] px-[0.25em] text-right font-medium">Weight</th>
          <th className="py-[0.12em] pl-[0.25em] text-right font-medium">Weight %</th>
        </tr>
      </thead>
      <tbody>
        {weights.map((row) => (
          <tr key={row.asset}>
            <td className="py-[0.12em] pr-[0.5em]">{row.asset}</td>
            <td className="py-[0.12em] px-[0.25em] text-right tabular-nums">{row.weight}</td>
            <td className="py-[0.12em] pl-[0.25em] text-right tabular-nums">{row.pct}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-primary/90">
          <th className="py-[0.12em] pr-[0.5em] text-left font-medium">Metric</th>
          <th className="py-[0.12em] pl-[0.25em] text-right font-medium">Value</th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((row) => (
          <tr key={row.label}>
            <td className="py-[0.12em] pr-[0.5em] align-top">{row.label}</td>
            <td className="py-[0.12em] pl-[0.25em] text-right tabular-nums">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** 以右侧图片高度为基准，动态放大左侧正文字号，使文本块高度与图片等高（扣除左栏内边距） */
const Task4TextImageRow = ({
  portfolioTitle,
  weights,
  metrics,
  imageSrc,
  imageAlt,
}: {
  portfolioTitle: string;
  weights: { asset: string; weight: string; pct: string }[];
  metrics: { label: string; value: string }[];
  imageSrc: string;
  imageAlt: string;
}) => {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgH, setImgH] = useState(0);
  const [fontPx, setFontPx] = useState(14);

  const measureImg = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const h = img.clientHeight;
    if (h > 0) setImgH(h);
  }, []);

  const fitFont = useCallback(() => {
    const panel = leftPanelRef.current;
    const wrap = textWrapRef.current;
    if (!panel || !wrap || imgH < 1) return;
    const cs = getComputedStyle(panel);
    const padY = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
    const targetH = panel.clientHeight - padY;
    if (targetH < 1) return;

    let lo = 6;
    let hi = 80;
    for (let i = 0; i < 28; i++) {
      const mid = (lo + hi) / 2;
      wrap.style.fontSize = `${mid}px`;
      if (wrap.scrollHeight <= targetH) lo = mid;
      else hi = mid;
    }
    setFontPx(lo);
  }, [imgH]);

  useLayoutEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const ro = new ResizeObserver(measureImg);
    ro.observe(img);
    img.addEventListener("load", measureImg);
    measureImg();
    return () => {
      ro.disconnect();
      img.removeEventListener("load", measureImg);
    };
  }, [measureImg, imageSrc]);

  useLayoutEffect(() => {
    const panel = leftPanelRef.current;
    if (!panel) return;
    const ro = new ResizeObserver(() => fitFont());
    ro.observe(panel);
    fitFont();
    window.addEventListener("resize", fitFont);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fitFont);
    };
  }, [fitFont, imageSrc, imgH]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:items-start">
      <div
        ref={leftPanelRef}
        style={imgH > 0 ? { height: imgH } : undefined}
        className="min-w-0 rounded-lg border border-primary/20 bg-background/80 p-3 flex flex-col justify-end overflow-hidden box-border"
      >
        <div ref={textWrapRef} style={{ fontSize: fontPx }} className="w-full min-h-0">
          <Task4PortfolioTextBlock
            portfolioTitle={portfolioTitle}
            weights={weights}
            metrics={metrics}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border border-primary/20 bg-background min-w-0">
        <img
          ref={imgRef}
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto block"
        />
      </div>
    </div>
  );
};

const task4AnalysisClass =
  "mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed [&_strong]:text-foreground";

const Task4CardAnalysis = ({ file }: { file: string }) => {
  switch (file) {
    case "mv":
      return (
        <div className={task4AnalysisClass}>
          <p>
            <strong>统计特征：</strong>
            年化收益约28%，年化波动率仅16.95%，是五种策略中波动最低的。日收益分布接近正态，尾部较薄，极端损失概率较小。日Sharpe比率0.093，在风险调整后表现中规中矩。
          </p>
          <p>
            <strong>配置逻辑：</strong>
            将组合集中在三只相关性较低且各自波动率较小的资产上，利用协方差矩阵的离对角线元素（即资产间低相关性或负相关性）实现波动率的进一步压缩。主要持仓集中在LMT（34.3%）、WMT（31.1%）和MSFT（22.6%）三只防御型或低波动个股，完全排除了高波动的CIEN和NVDA。其中，LMT
            作为国防股，与科技板块（MSFT、AMZN）在宏观驱动因子上存在天然的低相关性，这正是其获得最高权重的核心原因。
          </p>
          <p>
            <strong>投资建议：</strong>
            适合风险厌恶型投资者或临近退休的人群。该组合的核心优势是回撤可控，在市场剧烈波动时表现更稳健。不过需要注意，它放弃了高成长标的带来的上行空间，长期可能跑输市场。
          </p>
        </div>
      );
    case "mr":
      return (
        <div className={task4AnalysisClass}>
          <p>
            <strong>统计特征：</strong>
            年化收益高达155%，但代价是62.1%的年化波动率。日收益分布呈明显的右偏和厚尾特征（从直方图可见正向离群值延伸到+25%），与正态拟合偏离较大。日Sharpe
            0.154，看似不错但暗藏风险。
          </p>
          <p>
            <strong>配置逻辑：</strong>
            100%集中在CIEN一只股票上。这不是“组合”，而是单一押注——在无约束条件下选择了历史回报最高的资产。
          </p>
          <p>
            <strong>投资建议：</strong>
            这一策略在实际投资中几乎不可取。零分散化意味着单一公司的利空事件（财报不及预期、行业政策变动等）可能导致灾难性损失。155%的年化收益是历史回溯结果，不代表未来可持续。如果要参考这一结果，它更多说明CIEN在回测期间表现出色，可以作为增加CIEN配置的信号，但绝不应全仓持有。
          </p>
        </div>
      );
    case "ms":
      return (
        <div className={task4AnalysisClass}>
          <p>
            <strong>统计特征：</strong>
            与最大收益组合完全相同——年化收益155%、波动率62.1%、Sharpe 0.154。这说明在这六只股票构成的可行集中，CIEN的风险调整后收益恰好也是最高的。
          </p>
          <p>
            <strong>配置逻辑：</strong>
            同样100%
            CIEN。理论上最大Sharpe组合应该比最大收益组合更均衡，但当某只资产的Sharpe比率远超其余资产时，优化结果就会退化为集中持仓。在更丰富的资产池（如包含
            50+ 只股票或跨资产类别）中，两者通常会给出截然不同的解。当前的一致性更多反映了标的池过小且 CIEN 表现极端突出的特殊情况。
          </p>
          <p>
            <strong>投资建议：</strong>
            同最大收益组合的问题一样，缺乏分散化。实际应用中应当加入权重上限约束（例如单一资产不超过30-40%），才能让Sharpe优化发挥真正价值。这一结果更适合作为诊断信号——提示CIEN的历史风险回报比异常突出，值得深入研究其基本面是否支撑。
          </p>
        </div>
      );
    case "rp":
      return (
        <div className={task4AnalysisClass}>
          <p>
            <strong>统计特征：</strong>
            年化收益38.9%，波动率19.6%，Sharpe 0.115。回报和风险都略高于最小方差组合。从直方图看，分布仍较接近正态，但右尾略厚于最小方差组合——这来自
            CIEN（7.73%）和 NVDA（10.50%）的少量敞口，它们为组合贡献了少许正偏度和尾部收益。相比最小方差组合的 -1.65% 和
            -2.38%，尾部风险略有增加，但换来了约 11 个百分点的额外年化收益，这一交换对大多数投资者来说是值得的。
          </p>
          <p>
            <strong>配置逻辑：</strong>
            六只股票全部入选，权重相对均衡：LMT 25.5%、WMT 23.8%、MSFT 19.1%、AMZN 13.4%、NVDA 10.5%、CIEN
            7.7%。低波动资产获得更高权重，高波动的CIEN和NVDA被压低，使得每只资产对组合总风险的贡献大致相等。
          </p>
          <p>
            <strong>投资建议：</strong>
            全面分散化降低了单一资产的冲击，同时通过纳入CIEN和NVDA保留了一定的上行弹性。适合追求长期稳健增长、不希望在个别资产上下过大赌注的投资者。再平衡频率（月度或季度）对该策略的表现影响较大，实施时需注意。
          </p>
        </div>
      );
    case "bl":
      return (
        <div className={task4AnalysisClass}>
          <p>
            <strong>统计特征：</strong>
            年化收益125%，波动率40.4%，日Sharpe 0.190——五种策略中风险调整后表现最优。但分布的尾部比风险平价组合更厚，极端波动事件的概率更高。
          </p>
          <div className="space-y-2">
            <p>
              <strong>配置逻辑：</strong>
              这是唯一出现做空的组合——AMZN -43%、MSFT -15.6%，同时重仓LMT 70.2%和CIEN
              56.4%。Black-Litterman模型融合了市场均衡收益和投资者主观观点，做空头寸说明模型认为AMZN和MSFT的预期回报低于均衡水平。此外需要注意的是，该组合的总多头暴露为
              158.27%（CIEN 56.38% + LMT 70.24% + WMT 27.39% + NVDA
              4.64%），总空头暴露为 58.65%（AMZN -43.02% + MSFT -15.63%），净暴露约 99.62%，总暴露（Gross
              Exposure）为 216.92%。这意味着：
            </p>
            <ul className="list-none space-y-2 pl-0 sm:pl-1">
              <li>
                1）组合实际上使用了约 1.17 倍隐含杠杆（总多头 / 净暴露）
              </li>
              <li>
                2）做空头寸需要保证金（Reg T 下通常为做空市值的 50% 初始保证金 + 25% 维持保证金）
              </li>
              <li>
                3）卖空成本（Borrow Cost）： AMZN 和 MSFT
                作为大盘股通常属于「一般抵押品（General Collateral）」，借券成本较低（年化
                0.25-0.50%），但在市场压力期可能大幅上升
              </li>
            </ul>
          </div>
          <p>
            <strong>投资建议：</strong>
            Sharpe最高意味着单位风险的回报最好，但这一策略对普通投资者来说实施难度很大。做空需要保证金账户、承担无限下行风险和借券成本。超过100%的总多头暴露意味着使用了杠杆。此外，Black-Litterman的结果高度依赖输入的主观观点参数——观点稍有偏差，配置可能剧变。适合有量化交易经验、能承受高波动且能管理杠杆头寸的专业投资者。
          </p>
        </div>
      );
    default:
      return null;
  }
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = id ? projectData[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">项目未找到</p>
      </div>
    );
  }

  // task1：包含完整的多因子分析与图表布局
  if (id === "task1") {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-6 md:px-10 lg:px-20 pt-10 pb-20">
          {/* 返回按钮 */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={16} /> 返回首页
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 标题与简介 */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
                </div>
              </div>

            <p className="w-full text-muted-foreground leading-relaxed">
              {project.description[0]}
              {project.description[1]}
            </p>
            </div>

            {/* 分析区域：行业描述性统计 */}
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <section className="h-full rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h2 className="text-sm font-semibold text-primary mb-3">HiTec 的描述性统计</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Mean</span>
                    <span className="font-mono text-foreground">0.1021</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Variance</span>
                    <span className="font-mono text-foreground">2.8354</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Standard Deviation</span>
                    <span className="font-mono text-foreground">1.6839</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Skewness</span>
                    <span className="font-mono text-foreground">1.1650</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Excess Kurtosis</span>
                    <span className="font-mono text-foreground">15.2784</span>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-primary/20 bg-card p-5">
                <h2 className="text-sm font-semibold text-primary mb-3">Hlth 行业的描述性统计</h2>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Mean</span>
                    <span className="font-mono text-foreground">0.0716</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Variance</span>
                    <span className="font-mono text-foreground">1.3102</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Standard Deviation</span>
                    <span className="font-mono text-foreground">1.1446</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Skewness</span>
                    <span className="font-mono text-foreground">-0.4987</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Excess Kurtosis</span>
                    <span className="font-mono text-foreground">3.1656</span>
                  </div>
                </div>
              </section>
            </div>

            {/* 经验分布图与文字总结 */}
            <section className="mb-8 rounded-xl border border-primary/20 bg-card p-5">
              <h2 className="text-sm font-semibold text-primary mb-3">HiTec 与 Hlth 行业收益分布对比</h2>
              <div className="w-full overflow-hidden rounded-lg border border-primary/20 bg-background">
                <img
                  src={`${import.meta.env.BASE_URL}/task1/hitech-health-distributions.JPG`}
                  alt="HiTec 与 Hlth 行业组合的经验分布与 KDE 图"
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  高科技行业收益分布呈现出更为宽阔的离散程度，这深刻反映了该行业建立在研发高度不确定性及白热化竞争基础上的内生属性，而医疗保健行业相对收敛的分布特征则体现了其受刚性需求驱动的防御性特质。
                </p>
                <p>
                  从估值模型来看，由于高科技企业的未来现金流具有显著的不确定性且面临较高的折现率，市场在持续重估其技术突破或商业化成功概率的过程中，必然引发更为剧烈的日内价格震荡与频繁的价值重定价。
                </p>
                <p>
                  在偏度特征与风险属性方面，高科技行业表现出显著的正偏态与右侧肥尾效应，意味着其风险敞口主要由上行潜力构成，投资者倾向于通过容忍高水平的波动率来博取潜在的爆发式回报；与之形成鲜明对比的是，医疗保健行业虽在常态下表现稳健，但其对负面冲击具有极高的敏感性，这预示着该板块的核心威胁并非源于日常的市场波动，而是由突发性利空因素所引发的断裂式价值减损风险。
                </p>
              </div>
            </section>

            {/* 图表与结果展示区域：单因子回归 */}
            <section className="mb-6 rounded-xl border border-primary/20 bg-card p-5">
              <h2 className="text-sm font-semibold text-primary mb-4">回归结果：单因子模型（CAPM）</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {/* HiTec 图表在左侧 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground">HiTec：单因子回归结果</h3>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${import.meta.env.BASE_URL}/task1/one-hitec.JPG`}
                      alt="HiTec 行业组合的单因子回归结果图"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                {/* Hlth 图表在右侧 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground">Hlth：单因子回归结果</h3>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${import.meta.env.BASE_URL}/task1/one-hlth.JPG`}
                      alt="Hlth 行业组合的单因子回归结果图"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">HiTec 分析</h3>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      在超额收益维度下，尽管截距项（Alpha）录得0.022，但由于其p值显著高于0.05的统计阈值，导致该结果在95%的置信水平下未能通过显著性检验，这表明高科技组合在剔除市场风险补偿后，并未产生统计学意义上的超额回报。
                    </p>
                    <p>
                      针对风险敏感度的分析显示，市场因子系数（Beta）高达1.309且具备极强的统计显著性，这一数值明确了高科技组合作为高贝塔资产的属性，即其波动幅度显著高于整体市场水平，表现出强烈的进攻性与风险溢价敏感特征。
                    </p>
                    <p>
                      模型呈现出接近90%的拟合优度，有力地证明了市场系统性因素对该组合收益变动的极高解释力，意味着高科技行业的价值波动主要受宏观经济环境及系统性事件驱动，而非受限于行业内部的特异性因素。
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">Hlth 分析</h3>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      在超额收益衡量维度下，医疗保健组合的截距项（Alpha）录得0.0251，但由于其p值高达0.654，在统计学意义上并不显著，这表明该组合在经过风险调整后并未展现出超越市场基准的获利能力，其表现与整体市场回报基本持平。
                    </p>
                    <p>
                      针对风险敏感度的分析显示，市场因子系数（Beta）为0.577且具备极强的统计显著性，这一远低于1的数值明确揭示了医疗保健组合作为典型防御性资产的属性，即其价格波动幅度显著低于整体市场水平，表现出较强的抗周期特征。
                    </p>
                    <p>
                      从模型拟合优度来看，约38%的R平方值反映出市场系统性因子对该组合收益变动的解释力相对有限，这意味着医疗保健行业的价值波动并非主要受宏观市场趋势驱动，而是更多地取决于行业内部的特异性风险及个股基本面因素。
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">对比分析</h3>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      首先，在系统性风险敞口维度下，高科技组合凭借显著大于1.0的贝塔（Beta）系数表现出强烈的顺周期特性，即在放大市场涨跌幅度的同时，虽能在上行周期博取远超基准的收益，却也必然在市场回调中承受较之平均水平更为深度的价值减损；与之形成鲜明对比的是，医疗保健组合对市场变动的敏感度较低，在宏观环境动荡期间展现出显著的防御属性，为投资组合提供了关键的风险对冲与价值缓冲职能。
                    </p>
                    <p>
                      其次，从模型拟合优度及收益归因的角度审视，高科技组合约90%的收益波动可由市场因子解释，表明其定价逻辑高度受制于系统性风险，行业内部的特异性“噪音”对其影响微乎其微；而医疗保健组合仅有约38%的波动源于市场因素，其收益变动的主导权主要掌握在政策演变、临床试验结果等非市场因子的特异性风险手中，体现了该行业极强的内生波动特征与独立行情潜力。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 图表与结果展示区域：三因子回归 */}
            <section className="mb-6 rounded-xl border border-primary/20 bg-card p-5">
              <h2 className="text-sm font-semibold text-primary mb-4">回归结果：三因子模型（Fama-French 3 因子）</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {/* HiTec 三因子在左侧 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground">HiTec：三因子回归结果</h3>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${import.meta.env.BASE_URL}/task1/three-hitec.JPG`}
                      alt="HiTec 行业组合的三因子回归结果图"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                {/* Hlth 三因子在右侧 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground">Hlth：三因子回归结果</h3>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${import.meta.env.BASE_URL}/task1/three-hlth.JPG`}
                      alt="Hlth 行业组合的三因子回归结果图"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">HiTec 三因子分析</h3>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      从模型的整体解释效力来看，该三因子回归模型的R方（R-squared）与调整后R方分别高达94.8%与94.7%，这种极高的拟合优度不仅证明了模型能够解释该投资组合绝大部分的超额收益波动，更反映出引入规模因子（SMB）与价值因子（HML）对于完善模型规格、捕捉资产定价特征具有显著的统计学意义与稳健性。
                    </p>
                    <p>
                      在超额收益的归因分析中，截距项（Alpha）的p值为0.237，在95%的置信水平下未能通过显著性检验，这一统计结果明确揭示了该高科技组合在剔除市场、规模及价值因子的系统性风险暴露后，并未产生显著的异常超额收益，其业绩表现完全可以由上述三个风险维度的溢价进行合理解释。
                    </p>
                    <p>
                      针对风险因子的敏感度分析显示，该组合的市场因子系数（Beta）为1.192且具备极强的统计显著性，这意味着该组合的波动性较整体市场高出约19%，充分体现了高科技资产典型的高贝塔特征；同时，规模因子（SMB）系数显著为负，揭示了该组合存在明显的大盘股偏好（Large-Cap bias），尽管其影响程度相对其他因子而言处于次要地位。
                    </p>
                    <p>
                      价值因子（HML）呈现出极强的负相关性且统计显著性极高，这一特征深刻地勾勒出该组合作为成长型产业（Growth industry）的核心本质，即其市场估值逻辑高度锚定于未来的增长潜力而非当前的账面价值，从而在因子暴露上表现出对价值因子的深度负向偏离，这与科技行业依赖研发投入与未来现金流折现的金融直觉高度契合。
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">Hlth 三因子分析</h3>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      三因子模型对医疗保健组合超额收益波动的解释程度仅为40.8%，这一相对较低的拟合优度深刻揭示了该行业受行业特有风险（Idiosyncratic risks）驱动的显著特征，表明仅凭市场、规模及价值三个系统性因子尚不足以全面捕捉该领域的风险全貌；同时，调整后R方与R方的数值高度趋同，进一步验证了模型在统计层面的稳健性，有效排除了过拟合的潜在干扰。
                    </p>
                    <p>
                      在超额收益的归因分析中，截距项（Intercept）的p值显示其在统计学上与零无异，这意味着在充分考虑所承担的系统性风险暴露后，该组合并未展现出显著优于基准的超额回报能力。
                    </p>
                    <p>
                      在市场风险敏感度方面，该组合的贝塔系数（Beta）定格于0.61，显著低于市场平均水平，有力地证实了医疗保健行业作为典型防御性板块（Defensive industry）的金融属性，其波动程度远低于大盘整体表现。
                    </p>
                    <p>
                      针对规模与价值因子的实证分析显示，尽管规模因子系数呈现正值，但其0.075的p值仅在90%的置信水平下具有统计意义，暗示该组合虽有向小盘股倾斜的微弱趋势，但证据链尚不充分；相比之下，价值因子系数表现出显著的正向相关性，精准地刻画了医疗保健行业作为价值导向型产业的核心特征，即依托于稳健的现金流与雄厚的有形资产，该行业表现出与成熟价值股高度契合的投资逻辑，而非盲目追求投机性增长。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 图表与结果展示区域：四因子回归（含动量因子） */}
            <section className="mb-6 rounded-xl border border-primary/20 bg-card p-5">
              <h2 className="text-sm font-semibold text-primary mb-4">回归结果：四因子模型（含动量因子）</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {/* HiTec 四因子在左侧 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground">HiTec：四因子回归结果</h3>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${import.meta.env.BASE_URL}/task1/four-hitec.JPG`}
                      alt="HiTec 行业组合的四因子回归结果图（含动量因子）"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                {/* Hlth 四因子在右侧 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground">Hlth：四因子回归结果</h3>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${import.meta.env.BASE_URL}/task1/four-hlth.JPG`}
                      alt="Hlth 行业组合的四因子回归结果图（含动量因子）"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">HiTec 分析</h3>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      通过引入动量因子（Momentum Factor），该四因子模型对高科技组合超额收益波动的解释程度（拟合优度）显著提升至95.0%，相较于传统三因子模型表现出更优的统计拟合特征；同时，截距项在90%的置信水平下未能通过显著性检验，这一结果明确揭示了在充分对冲市场、规模、价值及动量风险后，该组合的业绩表现已得到完全解释，并未产生统计学意义上的异常超额收益（Alpha）。
                    </p>
                    <p>
                      在系统性风险敏感度方面，该组合的市场贝塔系数（Beta）显著大于1（约为1.19），这意味着其波动性较整体市场高出约19%，充分体现了高科技资产典型的高贝塔、高波动风险特征；而在规模因子（SMB）维度上，虽然回归系数为负，但在统计上并不显著，表明在纳入动量效应的考量后，该投资组合在市值维度上实质上呈现出规模中性的分布态势。
                    </p>
                    <p>
                      针对价值与动量因子的实证分析进一步刻画了该组合的行业画像：价值因子（HML）呈现出极强的负相关性且统计显著性极高，有力地印证了高科技板块作为典型成长型产业的核心本质，即其市场估值高度依赖于未来的增长潜能而非当前的账面价值；与此同时，动量因子表现出显著的正向暴露，揭示了该组合具备鲜明的趋势跟踪属性，深刻反映了高科技资产在市场运行中往往表现出“强者恒强”的收益持续性特征。
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">Hlth 分析</h3>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      引入动量因子（MOM）后，该模型的拟合优度由三因子框架下的40.1%显著提升至48.8%，这表明动量因子能够额外捕捉约9%的收益波动，从而大幅增强了模型对医疗保健组合收益来源的刻画能力，使其对超额收益的解释力接近50%的水平。
                    </p>
                    <p>
                      在超额收益归因与系统性风险维度下，截距项的统计不显著性预示着该组合在剔除已知风险溢价后并未产生异常超额收益（Alpha）；而其0.6125的贝塔系数则明确界定了该行业低波动、高防御的金融属性，意味着该组合仅捕获了约61%的市场波动，使其在市场剧烈震荡期间能够发挥显著的避险稳定器作用。
                    </p>
                    <p>
                      针对规模因子（SMB）与价值因子（HML）的回归分析显示，两者的p值均处于较高水平，意味着在控制动量效应的前提下，该组合在市值维度与估值维度上均呈现出统计学意义上的中性特征，并未表现出明显的大盘/小盘或价值/成长偏向。
                    </p>
                    <p>
                      动量因子呈现出显著的负向暴露，这一特征深刻揭示了医疗保健行业与市场主流趋势之间的逆向关联，即当市场前期领涨品种（Past winners）出现回调或崩盘时，投资者往往会出于避险需求向防御性板块进行仓位轮动，这种独特的反向动量效应进一步夯实了医疗保健行业作为避险资产的结构性地位。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 图表与结果展示区域：五因子回归 */}
            <section className="rounded-xl border border-primary/20 bg-card p-5">
              <h2 className="text-sm font-semibold text-primary mb-4">回归结果：五因子模型</h2>
              <div className="grid gap-4 lg:grid-cols-2">
                {/* HiTec 五因子在左侧 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground">HiTec：五因子回归结果</h3>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${import.meta.env.BASE_URL}/task1/five-hitec.JPG`}
                      alt="HiTec 行业组合的五因子回归结果图"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                {/* Hlth 五因子在右侧 */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground">Hlth：五因子回归结果</h3>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${import.meta.env.BASE_URL}/task1/five-hitec.JPG`}
                      alt="Hlth 行业组合的五因子回归结果图"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">HiTec 分析</h3>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      五因子回归模型的R方与调整后R方分别高达0.949与0.948，这种极高的拟合优度不仅证明了模型能够解释该投资组合约94.8%的超额收益波动，更反映出该模型在捕捉高科技板块底层风险驱动因素方面具有极高的精确度，仅留有约5%的成分属于不可解释的特异性噪声。此外，截距项在95%的置信水平下未能通过显著性检验，这一统计结果明确揭示了该组合在剔除五类系统性风险溢价后，并未产生显著的异常超额收益（Alpha），其业绩表现完全符合其所承担的风险暴露所应获得的相应补偿。
                    </p>
                    <p>
                      在核心风险因子的敏感度分析方面，该组合的市场因子贝塔系数（Beta）显著为正且具备极强的统计显著性，充分体现了高科技资产对市场整体波动的高度敏感性；同时，规模因子（SMB）的回归系数显著为负（-0.1114），揭示了该组合在市值维度上存在明显的大盘股偏好。更为显著的是，价值因子（HML）呈现出极强的负相关性（系数为-0.5625）且统计显著性极高，这一特征深刻地勾勒出该组合作为成长型产业（Growth orientation）的核心本质，即其成分股普遍具有较低的账面市值比（Book-to-Market ratio），其市场定价逻辑高度锚定于未来的扩张潜能。
                    </p>
                    <p>
                      针对五因子模型中新增的盈利因子（Profitability）与投资因子（Investment）的实证分析显示，两者的回归系数在统计学上均不显著（盈利因子p值为0.221），这意味着在2024年11月13日至2025年11月28日的特定样本区间内，高科技组合的收益表现并未受到企业盈利能力差异或资本开支强度差异的实质性驱动。综上所述，该组合的风险收益特征主要受市场贝塔、大盘属性以及深度的成长因子所定义，而盈利与投资维度的差异化特征在该阶段尚未对组合收益产生实质性的边际贡献。
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">Hlth 分析</h3>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      五因子模型的调整后R方定格于41.7%，意味着约四成以上的组合超额收益波动可由这五大系统性风险因子共同解释；而在收益归因层面，截距项的p值显著大于0.6，在统计学上与零无异，这明确揭示了在充分考虑风险暴露后，该组合并未产生显著的异常超额收益（Alpha），其业绩表现完全符合风险补偿逻辑。
                    </p>
                    <p>
                      在系统性风险敏感度方面，该组合的市场贝塔系数（Beta）为0.5697且具备极强的统计显著性，这一低贝塔特征有力地证实了医疗保健行业作为典型防御性板块的金融属性，深刻反映了医疗服务需求在宏观经济波动中表现出的高度缺乏弹性。与此同时，规模因子（SMB）的p值为0.168，未能通过显著性检验，表明该组合在市值分布上呈现出明显的规模中性特征，并未表现出对大盘或小盘股的显著偏好。
                    </p>
                    <p>
                      针对风格因子的实证分析进一步勾勒出该组合复杂的产业画像：价值因子系数（0.2313）在95%置信水平下显著，体现了组合向具有稳健现金流特征的价值型股票倾斜的投资取向。在盈利维度上，-0.1920的系数在90%置信水平下显著，这种向“弱盈利”特征的倾斜揭示了组合中生物技术类企业的存在，此类公司往往因高昂的研发开支导致即期利润承压，其核心估值逻辑在于未来的技术突破而非当前盈利。此外，投资因子系数（0.2352）显著为正，揭示了该组合具备保守的投资风格，即成分股倾向于通过分红与回购回报股东，而非进行激进的资产扩张或大规模资本开支，充分展现了成熟医疗企业稳健经营的财务特征。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 汇总：因子有效性 */}
            <section className="mt-6 rounded-xl border border-primary/20 bg-card p-5">
              <h2 className="text-sm font-semibold text-primary mb-4">因子有效性</h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  <strong>一、 行业间模型解释力度的显著分化</strong>
                  <br />
                  实证结果显示，多因子模型对两大行业的解释力度呈现出截然不同的量化特征。高科技投资组合在各模型下的拟合优度均稳定在95%左右的极高水平，这表明该行业的收益波动几乎完全由系统性风险因子（如市场波动、规模偏好及成长属性）所驱动，其定价逻辑高度透明且符合资产定价理论。相比之下，医疗保健组合的拟合优度仅处于40%至49%之间，这意味着该行业约五成以上的收益波动无法被通用的系统性因子所捕捉，其股价表现更多地受制于临床试验进展、监管政策变动及专利到期等行业特有的异质性风险。
                </p>
                <p>
                  <strong>二、 因子增加对高科技组合的边际贡献与冗余性</strong>
                  <br />
                  在高科技组合的分析中，从三因子模型（$R^2=94.8%$）演进至引入动量因子的四因子模型（$R^2=95.0%$），拟合优度的提升仅为0.2个百分点。而在五因子模型框架下，虽然引入了盈利与投资因子，但由于这两个因子的系数在统计学上均不显著，且模型解释力并未出现实质性跃升，这充分证明了对于高科技行业而言，传统的三因子框架（尤其是市场因子与价值因子的组合）已具备极强的解释效力。在此背景下，额外引入的动量、盈利及投资因子在很大程度上表现为“冗余因子”，未能提供显著的额外信息增量。
                </p>
                <p>
                  <strong>三、 因子增加对医疗保健组合的有效性验证</strong>
                  <br />
                  与高科技行业不同，因子的增加对医疗保健组合表现出了显著的解释力增强效应，尤其是动量因子（MOM）的引入。当模型由三因子升级为包含动量项的四因子模型时，解释力度大幅提升了约8个百分点，且动量因子呈现出显著的负向暴露。这一统计特征有力地证明了动量因子并非冗余，而是精准捕捉到了医疗保健行业作为避险板块，在市场风格切换与资金轮动中的独特行为模式。然而，在切换至不含动量项的五因子模型时，尽管引入了盈利与投资维度，其解释力（41.7%）虽略高于三因子模型，但远逊于四因子模型，这说明对于医疗保健行业，动量效应的解释权重显著优于企业财务质量因子。
                </p>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    );
  }

  // task2：股票波动率分析，APLD / PSLV 描述性统计
  if (id === "task2") {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-6 md:px-10 lg:px-20 pt-10 pb-20">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={16} /> 返回首页
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">股票波动率分析</h1>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed whitespace-nowrap">
                通过对比收盘价对收盘价 (Close-to-Close) 波动率和帕金森 (Parkinson) 波动率，分析了股票APLD和PSLV的风险特征。
              </p>
            </div>

            {/* 卡片一：APLD 波动率描述性统计 */}
            <section className="mb-6 rounded-xl border border-primary/20 bg-card p-5">
              <h2 className="text-sm font-semibold text-primary mb-4">APLD 波动率的描述性统计（CC Volatility vs Parkinson Volatility）</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {/* CC Volatility 在左侧 */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">Close-to-Close Volatility of APLD</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>Mean</span><span className="font-mono text-foreground">1.192639</span></div>
                    <div className="flex justify-between"><span>Median</span><span className="font-mono text-foreground">1.148347</span></div>
                    <div className="flex justify-between"><span>Std</span><span className="font-mono text-foreground">0.376311</span></div>
                    <div className="flex justify-between"><span>Min</span><span className="font-mono text-foreground">0.689380</span></div>
                    <div className="flex justify-between"><span>Max</span><span className="font-mono text-foreground">2.038382</span></div>
                    <div className="flex justify-between"><span>25th Percentile</span><span className="font-mono text-foreground">0.900993</span></div>
                    <div className="flex justify-between"><span>75th Percentile</span><span className="font-mono text-foreground">1.308406</span></div>
                    <div className="flex justify-between"><span>95th Percentile</span><span className="font-mono text-foreground">1.944887</span></div>
                  </div>
                </div>
                {/* Parkinson Volatility 在右侧 */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">Parkinson Volatility of APLD</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>Mean</span><span className="font-mono text-foreground">0.906701</span></div>
                    <div className="flex justify-between"><span>Median</span><span className="font-mono text-foreground">0.908138</span></div>
                    <div className="flex justify-between"><span>Std</span><span className="font-mono text-foreground">0.144881</span></div>
                    <div className="flex justify-between"><span>Min</span><span className="font-mono text-foreground">0.627945</span></div>
                    <div className="flex justify-between"><span>Max</span><span className="font-mono text-foreground">1.250586</span></div>
                    <div className="flex justify-between"><span>25th Percentile</span><span className="font-mono text-foreground">0.805539</span></div>
                    <div className="flex justify-between"><span>75th Percentile</span><span className="font-mono text-foreground">0.999145</span></div>
                    <div className="flex justify-between"><span>95th Percentile</span><span className="font-mono text-foreground">1.189689</span></div>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  首先，Parkinson 波动率分析显示，APLD 的日内波动均值高达 0.9067，折合年化日内波动率约为 91%，且其均值与中位数的高度一致性（分别为 0.906 与 0.908）明确表明，这种剧烈的价格震荡并非由个别极端离群值驱动，而是该标的在观测周期内所表现出的常态化内生特征。
                </p>
                <p>
                  其次，通过对比可以发现，收盘价波动率在各项指标上均显著高于 Parkinson 波动率，其年化波动率均值达到 119%，这种显著的溢价揭示了 APLD 存在剧烈的隔夜价格跳空现象，暗示市场重大消息或财报发布等关键定价因素往往发生在非交易时段，使得开盘价较前一交易日收盘价产生大幅偏离，从而构成了整体波动的主要来源。
                </p>
              </div>
            </section>

            {/* 卡片二：PSLV 波动率描述性统计 */}
            <section className="mb-6 rounded-xl border border-primary/20 bg-card p-5">
              <h2 className="text-sm font-semibold text-primary mb-4">PSLV 波动率的描述性统计（CC Volatility vs Parkinson Volatility）</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {/* CC Volatility 在左侧 */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">Close-to-Close Volatility of PSLV</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>Mean</span><span className="font-mono text-foreground">0.310279</span></div>
                    <div className="flex justify-between"><span>Median</span><span className="font-mono text-foreground">0.240200</span></div>
                    <div className="flex justify-between"><span>Std</span><span className="font-mono text-foreground">0.133330</span></div>
                    <div className="flex justify-between"><span>Min</span><span className="font-mono text-foreground">0.174928</span></div>
                    <div className="flex justify-between"><span>Max</span><span className="font-mono text-foreground">0.712398</span></div>
                    <div className="flex justify-between"><span>25th Percentile</span><span className="font-mono text-foreground">0.215369</span></div>
                    <div className="flex justify-between"><span>75th Percentile</span><span className="font-mono text-foreground">0.391160</span></div>
                    <div className="flex justify-between"><span>95th Percentile</span><span className="font-mono text-foreground">0.615213</span></div>
                  </div>
                </div>
                {/* Parkinson Volatility 在右侧 */}
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">Parkinson Volatility of PSLV</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>Mean</span><span className="font-mono text-foreground">0.185542</span></div>
                    <div className="flex justify-between"><span>Median</span><span className="font-mono text-foreground">0.160198</span></div>
                    <div className="flex justify-between"><span>Std</span><span className="font-mono text-foreground">0.061981</span></div>
                    <div className="flex justify-between"><span>Min</span><span className="font-mono text-foreground">0.111570</span></div>
                    <div className="flex justify-between"><span>Max</span><span className="font-mono text-foreground">0.353932</span></div>
                    <div className="flex justify-between"><span>25th Percentile</span><span className="font-mono text-foreground">0.134639</span></div>
                    <div className="flex justify-between"><span>75th Percentile</span><span className="font-mono text-foreground">0.233834</span></div>
                    <div className="flex justify-between"><span>95th Percentile</span><span className="font-mono text-foreground">0.309070</span></div>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  首先，就日内波动风险而言，基于 Parkinson 波动率的分析显示 PSLV 表现出较强的稳健性，其 18.55% 的波动率均值与较低的日内振幅反映出市场在交易时段内的价格发现过程相对高效且平稳。由于其中位数（0.1602）持续低于均值，且最大日内波动被严格限制在 35% 以内，该资产在多数交易日呈现出低波动的常态，对于寻求价值存储而非投机套利的长期投资者而言，具备较高的配置稳定性。
                </p>
                <p>
                  其次，在收盘价波动率（Close-to-Close Volatility）维度下，该信托则展现出中等偏高的风险属性，年化波动率均值提升至 31.03%。数据显著揭示了潜在的尾部风险，其 95 分位数高达 61.52%，暗示在极端宏观环境或流动性紧缩下，价格可能出现剧烈震荡。值得注意的是，波动率曲线在 2025 年大部分时间维持在 0.2 至 0.3 的低位区间，但在 11 月呈现出明显的“阶梯式”突破（Step-Up Pattern），标志着市场进入了持续的高波动体制。
                </p>
                <p>
                  最后，通过对比两类指标可以发现，收盘价波动率显著高于 Parkinson 波动率，投资者承担的隔夜风险约为日内风险的 1.5 倍。这种显著的溢价主要源于白银作为全球化交易商品的定价特性：由于白银的核心价格发现过程在伦敦及亚洲市场持续进行，当美国市场处于休市阶段时，全球价格的变动会导致美股开盘时产生巨大的价格跳空。Parkinson 波动率因其仅捕捉日内高低价差的局限性，未能反映此类跨时区定价缺口，而收盘价波动率则精准捕捉到了这种由全球市场联动引发的隔夜风险溢价。
                </p>
              </div>
            </section>

            {/* 卡片三：两种波动率对比分析 */}
            <section className="mb-6 rounded-xl border border-primary/20 bg-card p-5">
              <h2 className="text-sm font-semibold text-primary mb-4">两种波动率对比分析</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">APLD：CC Volatility vs Parkinson Volatility</h3>
                  <img
                    src={`${import.meta.env.BASE_URL}/task2/vol_compare_apld.JPG`}
                    alt="APLD 两种波动率对比图"
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div className="rounded-lg border border-primary/20 bg-background p-4">
                  <h3 className="text-xs font-semibold text-primary mb-3">PSLV：CC Volatility vs Parkinson Volatility</h3>
                  <img
                    src={`${import.meta.env.BASE_URL}/task2/vol_compare_pslv.JPG`}
                    alt="PSLV 两种波动率对比图"
                    className="w-full h-auto rounded-md"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-primary/20 bg-card p-5">
              <h2 className="text-sm font-semibold text-primary mb-4">投资者视角</h2>
              <div className="space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  在波动特征方面，APLD 表现出极强的投机属性，其年化波动率频繁超过 100%，属于典型的高风险、高收益资产；相比之下，PSLV 的价格走势则稳健得多，波动始终维持在相对较低且可控的水平。
                </p>
                <p>
                  在定价机制与日内表现上，APLD 的日内波动与跨日波动高度接近，说明其价格震荡主要发生在交易时段内，且存在大量随机性的噪音，导致日内的剧烈波动并不一定能转化为明确的收盘趋势。与之相反，PSLV 的收盘价波动显著高于日内波动，这表明其价格发现过程主要发生在非交易时段，这种“隔夜跳空”现象反映了全球市场对白银定价的持续影响。
                </p>
                <p>
                  在风险管理方面，针对 APLD 的操作，由于其日内震荡极不规律，投资者不应仅依赖传统的止损位，而应通过动态调整持仓规模来应对其不确定性。对于 PSLV 而言，主要的风险点在于开盘时的价格偏离，因此建议适当放宽止损区间或控制头寸，以避免因隔夜市场波动导致的执行滑点。
                </p>
                <p>
                  在资产配置中，APLD 虽然具备获取超额收益的潜力，但因其极高的不确定性，必须严格限制其在组合中的权重，以防范单一资产对整体账户的冲击。PSLV 则主要发挥宏观对冲作用，但近期观察到其波动率有上升趋势，预示着市场环境正在发生变化，投资者需警惕全球宏观风险对其估值产生的动态影响。
                </p>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    );
  }

  // task3：与 task1 对齐的布局，仅保留两个描述性统计卡片
  if (id === "task3") {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-6 md:px-10 lg:px-20 pt-10 pb-20">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={16} /> 返回首页
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
                </div>
              </div>
              <div className="w-full max-w-none space-y-2 text-muted-foreground leading-relaxed">
                {project.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <section className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h2 className="text-sm font-semibold text-primary mb-3">数据处理</h2>
                <pre className="overflow-x-auto rounded-lg border border-primary/20 bg-background p-4">
                  <code className="block min-w-max font-mono text-[12px] leading-6 text-slate-800">
                    <div className="italic text-slate-500"># Import necessary libraries</div>
                    <div>
                      <span className="font-medium text-green-600">import</span>{" "}
                      <span>pandas</span>{" "}
                      <span className="font-medium text-green-600">as</span>{" "}
                      <span className="text-sky-700">pd</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-600">import</span>{" "}
                      <span>numpy</span>{" "}
                      <span className="font-medium text-green-600">as</span>{" "}
                      <span className="text-sky-700">np</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-600">from</span>{" "}
                      <span>scipy</span>{" "}
                      <span className="font-medium text-green-600">import</span>{" "}
                      <span>stats</span>
                    </div>
                    <div>
                      <span className="font-medium text-green-600">from</span>{" "}
                      <span>arch</span>{" "}
                      <span className="font-medium text-green-600">import</span>{" "}
                      <span>arch_model</span>
                    </div>
                    <div>&nbsp;</div>
                    <div className="italic text-slate-500"># Get the data of NDX and DJI from the excel</div>
                    <div>
                      <span>d_ndx</span> <span className="text-fuchsia-600">=</span>{" "}
                      <span className="text-sky-700">pd</span>.read_excel(<span className="text-rose-700">'data.xlsx'</span>,{" "}
                      <span>sheet_name</span> <span className="text-fuchsia-600">=</span> <span className="text-rose-700">'NDX'</span>)
                    </div>
                    <div>
                      <span>d_dji</span> <span className="text-fuchsia-600">=</span>{" "}
                      <span className="text-sky-700">pd</span>.read_excel(<span className="text-rose-700">'data.xlsx'</span>,{" "}
                      <span>sheet_name</span> <span className="text-fuchsia-600">=</span> <span className="text-rose-700">'DJI'</span>)
                    </div>
                    <div className="italic text-slate-500">#Store the closing price for each indice</div>
                    <div>
                      <span>close_ndx</span> <span className="text-fuchsia-600">=</span> <span>d_ndx</span>[<span className="text-rose-700">'Close'</span>]
                    </div>
                    <div>
                      <span>close_dji</span> <span className="text-fuchsia-600">=</span> <span>d_dji</span>[<span className="text-rose-700">'Close'</span>]
                    </div>
                    <div>&nbsp;</div>
                    <div className="italic text-slate-500"># Compute the log returns for each indices</div>
                    <div className="italic text-slate-500"># Formula: r_t = 100 * Ln(Close_t / Close_{'{'}t-1{'}'})</div>
                    <div>
                      <span>lg_ndx</span> <span className="text-fuchsia-600">=</span> <span className="text-violet-600">100</span> *{" "}
                      <span className="text-sky-700">np</span>.log(<span>close_ndx</span> / <span>close_ndx</span>.shift(<span className="text-violet-600">1</span>)).dropna()
                      <span className="italic text-slate-500">  # Delete the missing value in the first row</span>
                    </div>
                    <div>
                      <span>lg_dji</span> <span className="text-fuchsia-600">=</span> <span className="text-violet-600">100</span> *{" "}
                      <span className="text-sky-700">np</span>.log(<span>close_dji</span> / <span>close_dji</span>.shift(<span className="text-violet-600">1</span>)).dropna()
                    </div>
                    <div>&nbsp;</div>
                    <div className="italic text-slate-500"># GARCH models assume that the mean of the return series is zero</div>
                    <div className="italic text-slate-500"># Demeaned the log returns of two indices</div>
                    <div>
                      <span>demeaned_ndx</span> <span className="text-fuchsia-600">=</span> <span>lg_ndx</span> - <span>lg_ndx</span>.mean()
                    </div>
                    <div>
                      <span>demeaned_dji</span> <span className="text-fuchsia-600">=</span> <span>lg_dji</span> - <span>lg_dji</span>.mean()
                    </div>
                  </code>
                </pre>
              </section>
              <section className="h-full rounded-xl border border-primary/20 bg-card p-5 flex flex-col min-h-0">
                <h2 className="text-sm font-semibold text-primary mb-3">模型代码</h2>
                <pre className="min-h-0 flex-1 overflow-x-auto overflow-y-auto rounded-lg border border-primary/20 bg-background p-4">
                  <code className="block min-w-max font-mono text-[12px] leading-6 text-slate-800">
                    <div className="italic text-slate-500"># Define a function that fits both GARCH(1,1) and GJR-GARCH(1,1)</div>
                    <div>
                      <span className="font-medium text-green-600">def</span>{" "}
                      <span className="text-sky-700">fit_vol</span>(<span>demeaned_returns</span>, <span>index_name</span>):
                    </div>
                    <div className="text-rose-700">&nbsp;&nbsp;&nbsp;&nbsp;"""</div>
                    <div className="text-rose-700">&nbsp;&nbsp;&nbsp;&nbsp;Fits GARCH(1,1) and GJR-GARCH(1,1) to the returns series.</div>
                    <div className="text-rose-700">&nbsp;</div>
                    <div className="text-rose-700">&nbsp;&nbsp;&nbsp;&nbsp;Parameters:</div>
                    <div className="text-rose-700">&nbsp;&nbsp;&nbsp;&nbsp;- demeaned_returns: standardized data of log returns (%)</div>
                    <div className="text-rose-700">&nbsp;&nbsp;&nbsp;&nbsp;- index_name: name of the index analyzed</div>
                    <div className="text-rose-700">&nbsp;</div>
                    <div className="text-rose-700">&nbsp;&nbsp;&nbsp;&nbsp;Returns:</div>
                    <div className="text-rose-700">&nbsp;&nbsp;&nbsp;&nbsp;- Dictionary with model objects and summaries.</div>
                    <div className="text-rose-700">&nbsp;&nbsp;&nbsp;&nbsp;"""</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span>results</span> <span className="text-fuchsia-600">=</span> {"{}"}</div>
                    <div>&nbsp;</div>
                    <div className="italic text-slate-500">&nbsp;&nbsp;&nbsp;&nbsp;# Model 1: GARCH(1,1)</div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span>garch_model</span> <span className="text-fuchsia-600">=</span> <span>arch_model</span>(<span>demeaned_returns</span>,{" "}
                      <span>vol</span><span className="text-fuchsia-600">=</span><span className="text-rose-700">'Garch'</span>,{" "}
                      <span>p</span><span className="text-fuchsia-600">=</span><span className="text-violet-600">1</span>,{" "}
                      <span>q</span><span className="text-fuchsia-600">=</span><span className="text-violet-600">1</span>,{" "}
                      <span>rescale</span><span className="text-fuchsia-600">=</span><span className="font-medium text-green-600">False</span>)
                      <span className="italic text-slate-500">  #Use the raw demeaned returns</span>
                    </div>
                    <div className="italic text-slate-500">&nbsp;&nbsp;&nbsp;&nbsp;# Estimates the parameters of the GARCH model specified in garch_model</div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span>garch_fit</span> <span className="text-fuchsia-600">=</span> <span>garch_model</span>.fit(<span>disp</span><span className="text-fuchsia-600">=</span><span className="text-rose-700">'off'</span>)
                      <span className="italic text-slate-500">  # No printing of the fitting output</span>
                    </div>
                    <div className="italic text-slate-500">&nbsp;&nbsp;&nbsp;&nbsp;# Create a dataframe to store the output of the analysis</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span>results</span>[<span className="text-rose-700">'GARCH'</span>] <span className="text-fuchsia-600">=</span> {"{"}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-rose-700">'model'</span>: <span>garch_fit</span>,</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-rose-700">'summary'</span>: <span>garch_fit</span>.summary()</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</div>
                    <div>&nbsp;</div>
                    <div className="italic text-slate-500">&nbsp;&nbsp;&nbsp;&nbsp;# Model 2: GJR-GARCH(1,1)</div>
                    <div className="italic text-slate-500">&nbsp;&nbsp;&nbsp;&nbsp;# Use GARCH with leverage (o=1 for asymmetry) to construct GJR-GARCH</div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span>gjr_model</span> <span className="text-fuchsia-600">=</span> <span>arch_model</span>(<span>demeaned_returns</span>,{" "}
                      <span>vol</span><span className="text-fuchsia-600">=</span><span className="text-rose-700">'Garch'</span>,{" "}
                      <span>p</span><span className="text-fuchsia-600">=</span><span className="text-violet-600">1</span>,{" "}
                      <span>o</span><span className="text-fuchsia-600">=</span><span className="text-violet-600">1</span>,{" "}
                      <span>q</span><span className="text-fuchsia-600">=</span><span className="text-violet-600">1</span>,{" "}
                      <span>rescale</span><span className="text-fuchsia-600">=</span><span className="font-medium text-green-600">False</span>)
                      <span className="italic text-slate-500">  # o=1 for GJR asymmetry</span>
                    </div>
                    <div className="italic text-slate-500">&nbsp;&nbsp;&nbsp;&nbsp;# Estimates the parameters of the GJR model specified in gjr_model</div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span>gjr_fit</span> <span className="text-fuchsia-600">=</span> <span>gjr_model</span>.fit(<span>disp</span><span className="text-fuchsia-600">=</span><span className="text-rose-700">'off'</span>)
                      <span className="italic text-slate-500">  # No printing of the fitting output</span>
                    </div>
                    <div className="italic text-slate-500">&nbsp;&nbsp;&nbsp;&nbsp;# Create a dataframe to store the output of the analysis</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span>results</span>[<span className="text-rose-700">'GJR-GARCH'</span>] <span className="text-fuchsia-600">=</span> {"{"}</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-rose-700">'model'</span>: <span>gjr_fit</span>,</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-rose-700">'summary'</span>: <span>gjr_fit</span>.summary()</div>
                    <div>&nbsp;&nbsp;&nbsp;&nbsp;{"}"}</div>
                    <div>&nbsp;</div>
                    <div>
                      &nbsp;&nbsp;&nbsp;&nbsp;<span className="font-medium text-green-600">return</span> <span>results</span>
                    </div>
                  </code>
                </pre>
              </section>
            </div>

            <div className="grid gap-6">
              <section className="rounded-xl border border-primary/20 bg-card p-5">
                <h2 className="text-sm font-semibold text-primary mb-4">NDX 的拟合参数</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <h3 className="text-xs font-semibold text-primary mb-3">GARCH(1,1)</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between gap-4"><span>mu</span><span className="font-mono text-foreground">0.023846</span></div>
                      <div className="flex justify-between gap-4"><span>omega</span><span className="font-mono text-foreground">0.075817</span></div>
                      <div className="flex justify-between gap-4"><span>alpha[1]</span><span className="font-mono text-foreground">0.157913</span></div>
                      <div className="flex justify-between gap-4"><span>beta[1]</span><span className="font-mono text-foreground">0.808596</span></div>
                      <div className="flex justify-between gap-4 border-t border-primary/10 pt-2"><span>Persistence</span><span className="font-mono text-foreground">0.9665</span></div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-primary/20 bg-background p-4">
                    <h3 className="text-xs font-semibold text-primary mb-3">GJR-GARCH(1,1)</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between gap-4"><span>mu</span><span className="font-mono text-foreground">-0.034697</span></div>
                      <div className="flex justify-between gap-4"><span>omega</span><span className="font-mono text-foreground">0.072083</span></div>
                      <div className="flex justify-between gap-4"><span>alpha[1]</span><span className="font-mono text-foreground">0.000000</span></div>
                      <div className="flex justify-between gap-4"><span>gamma[1]</span><span className="font-mono text-foreground">0.216073</span></div>
                      <div className="flex justify-between gap-4"><span>beta[1]</span><span className="font-mono text-foreground">0.841532</span></div>
                      <div className="flex justify-between gap-4 border-t border-primary/10 pt-2"><span>Persistence</span><span className="font-mono text-foreground">0.8415</span></div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    在风险敏感度维度下，NDX展现出高达0.216的杠杆效应参数（gamma），这一数值显著高于道琼斯工业平均指数（DJI），揭示了以科技股为主的纳斯达克市场对负面冲击具备极高的敏感性，即利空消息往往会比同等程度的利好消息引发更为剧烈的估值重塑与市场恐慌。
                  </p>
                  <p>
                    针对模型稳健性的分析显示，传统的对称GARCH(1,1)模型因未能区分冲击的性质，将波动率持续性高估至0.9295，暗示冲击的影响近乎永久化，这反映了标准模型在处理NDX数据时存在明显的设定偏误；而GJR-GARCH模型通过引入非对称项，将持续性指标修正至0.8415，从而精准地剥离了冲击强度与持续时间之间的混淆关系。
                  </p>
                  <p>
                    实证结果表明，尽管NDX在遭遇负面冲击时表现出极强的爆发性，但其整体波动过程实际上比对称模型所暗示的更具均值回归属性与稳定性。
                  </p>
                </div>
              </section>

              <section className="rounded-xl border border-primary/20 bg-card p-5">
                <h2 className="text-sm font-semibold text-primary mb-4">DJI 的拟合参数</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <h3 className="text-xs font-semibold text-primary mb-3">GARCH(1,1)</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between gap-4"><span>mu</span><span className="font-mono text-foreground">0.024852</span></div>
                      <div className="flex justify-between gap-4"><span>omega</span><span className="font-mono text-foreground">0.069147</span></div>
                      <div className="flex justify-between gap-4"><span>alpha[1]</span><span className="font-mono text-foreground">0.152251</span></div>
                      <div className="flex justify-between gap-4"><span>beta[1]</span><span className="font-mono text-foreground">0.777282</span></div>
                      <div className="flex justify-between gap-4 border-t border-primary/10 pt-2"><span>Persistence</span><span className="font-mono text-foreground">0.9295</span></div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-primary/20 bg-background p-4">
                    <h3 className="text-xs font-semibold text-primary mb-3">GJR-GARCH(1,1)</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between gap-4"><span>mu</span><span className="font-mono text-foreground">-0.028825</span></div>
                      <div className="flex justify-between gap-4"><span>omega</span><span className="font-mono text-foreground">0.037802</span></div>
                      <div className="flex justify-between gap-4"><span>alpha[1]</span><span className="font-mono text-foreground">0.000000</span></div>
                      <div className="flex justify-between gap-4"><span>gamma[1]</span><span className="font-mono text-foreground">0.192510</span></div>
                      <div className="flex justify-between gap-4"><span>beta[1]</span><span className="font-mono text-foreground">0.863596</span></div>
                      <div className="flex justify-between gap-4 border-t border-primary/10 pt-2"><span>Persistence</span><span className="font-mono text-foreground">0.8636</span></div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    在风险溢价与非对称响应维度下，GJR-GARCH(1,1)模型识别出高达0.1925且具备统计显著性的杠杆效应参数（gamma），这一结果明确揭示了DJI在样本期间（2024年11月至2025年11月）负向收益率对未来条件方差的冲击强度远超同等幅度的正向收益率，反映了机构投资者在市场下行周期中因财务杠杆压力及风险厌恶情绪升温而引发的波动率非对称放大效应。
                  </p>
                  <p>
                    从波动率动力学特征观察，GJR-GARCH模型所测算出的持续性指标仅为0.86，显著低于标准GARCH模型所估算的0.93，这种持续性数值的修正不仅有力地证明了DJI的波动过程具有更强的均值回归属性，更表明通过有效剥离杠杆效应的干扰，模型能够更精准地识别出外部冲击对市场影响的真实存续周期。
                  </p>
                  <p>
                    相较于传统对称模型可能存在的风险高估偏误，GJR-GARCH框架通过对随机过程内生非对称性的精确刻画，成功避免了将短期负向冲击误认为长期趋势的统计陷阱。
                  </p>
                </div>
              </section>

              <section className="rounded-xl border border-primary/20 bg-card p-5">
                <h2 className="text-sm font-semibold text-primary mb-4">对比NDX和DJI</h2>
                <div className="space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    在波动率持续性维度下，实证结果显示DJI的持续性水平显著高于NDX，这一发现挑战了市场关于科技股指数具备更高风险惯性的传统认知，表明尽管NDX在短期内呈现出极高的波动频率，但其波动聚集效应的消散速度较快，而DJI的波动特征则表现出更强的“粘性”，即一旦工业板块陷入动荡状态，其高波动水平往往会比科技板块维持更长的时间周期。
                  </p>
                  <p>
                    其次，针对杠杆效应参数（gamma）的对比研究表明，NDX的非对称响应系数明显高于DJI，这意味着NDX对“负面消息”的敏感度更为剧烈，任何负向冲击对该指数条件方差的边际放大效应均远超同等规模的正向冲击，深刻反映了高科技成长型资产在面临下行风险时，投资者往往会表现出更为激进的避险情绪与估值重塑行为。
                  </p>
                  <p>
                    综上所述，DJI与NDX在风险特征上呈现出截然不同的演化路径：前者侧重于波动状态的长周期存续，而后者则表现为对负面冲击的爆发式响应，这种差异性本质上源于科技行业对增长预期的高度敏感性以及工业板块在宏观经济周期中的结构性韧性，为投资者在构建跨行业资产配置及风险对冲方案时提供了重要的量化决策依据。
                  </p>
                </div>
              </section>

              <section className="rounded-xl border border-primary/20 bg-card p-5">
                <h2 className="text-sm font-semibold text-primary mb-4">ACF测试</h2>
                <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                  <img
                    src={`${import.meta.env.BASE_URL}/task3/acf.JPG`}
                    alt="NDX 与 DJI 的 ACF 测试图"
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-5 space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    从残差的序列特征观察，所有子图中的前10至20阶滞后项自相关系数均显著超出了阴影区域所示的置信区间边界，且呈现出高起点、慢衰减的典型特征，这一统计现象明确揭示了标准化残差序列中仍存在严重的序列相关性，表明模型未能完全剥离收益率序列中的动态依赖信息。
                  </p>
                  <p>
                    这种ACF曲线的缓慢衰减模式在时间序列分析中被视为非平稳过程或存在未被捕捉之强趋势项的经典征兆，暗示了当前模型在刻画底层数据分布的演变逻辑时存在局限性，导致残差项未能达到理想的白噪声状态，从而挑战了模型关于独立同分布创新的基本假设。
                  </p>
                  <p>
                    通过对比标准GARCH模型与引入非对称效应的GJR-GARCH模型可以发现，两者在残差自相关表现上几乎不存在视觉差异，这进一步证明了单纯通过调整波动率方程的规格（即切换至非对称模型）并不能有效解决NDX和DJI数据的统计失真问题，反映出模型在捕捉复杂动态特征及结构性变化方面的有效性仍有待进一步优化。
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // task4：五种优化组合的权重与表现（配图）
  if (id === "task4") {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-6 md:px-10 lg:px-20 pt-10 pb-20">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={16} /> 返回首页
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{project.order}</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
                </div>
              </div>

              <div className="space-y-2 text-muted-foreground leading-relaxed max-w-3xl">
                {project.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {(
                [
                  {
                    file: "mv",
                    pairFile: "h2",
                    title: "最小方差组合",
                    altPair: "最小方差组合补充图",
                  },
                  {
                    file: "mr",
                    pairFile: "h1",
                    title: "最大收益率组合",
                    altPair: "最大收益率组合补充图",
                  },
                  {
                    file: "ms",
                    pairFile: "h3",
                    title: "最大夏普比率组合",
                    altPair: "最大夏普比率组合补充图",
                  },
                  {
                    file: "rp",
                    pairFile: "h4",
                    title: "风险平价组合",
                    altPair: "风险平价组合补充图",
                  },
                  {
                    file: "bl",
                    pairFile: "h5",
                    title: "Black-Litterman组合",
                    altPair: "Black-Litterman 组合补充图",
                  },
                ] as const
              ).map(({ file, pairFile, title, altPair }, i) => {
                const text = TASK4_PORTFOLIO_TEXT[file];
                return (
                  <section
                    key={file}
                    className={`rounded-xl border border-primary/20 p-5 overflow-hidden ${
                      i % 2 === 0 ? "bg-primary/5" : "bg-card"
                    }`}
                  >
                    <h2 className="text-sm font-semibold text-primary mb-3">{title}</h2>
                    <Task4TextImageRow
                      portfolioTitle={text.portfolioTitle}
                      weights={text.weights}
                      metrics={text.metrics}
                      imageSrc={`${import.meta.env.BASE_URL}/task4/${pairFile}.JPG`}
                      imageAlt={altPair}
                    />
                    <Task4CardAnalysis file={file} />
                  </section>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // task5：股票相对价值策略（占位，待补充内容）
  if (id === "task5") {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-6 md:px-10 lg:px-20 pt-10 pb-20">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={16} /> 返回首页
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{project.order}</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">{project.description[0]}</p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // task6：期权定价模型对比分析
  if (id === "task6") {
    const task5Base = `${import.meta.env.BASE_URL}task5/`;
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-6 md:px-10 lg:px-20 pt-10 pb-20">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft size={16} /> 返回首页
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{project.order}</span>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">{project.description[0]}</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <section className="rounded-xl border border-primary/20 bg-card p-5">
                <h2 className="text-sm font-semibold text-primary mb-4">对比周度和月度下GBM的模拟路径</h2>
                <div className="flex flex-col gap-6 items-stretch">
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${task5Base}GBM_Simulated_Price_Paths.png`}
                      alt="周度与月度 GBM 模拟价格路径对比"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="mt-5 space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      四组模拟结果均显示资产价格路径具有明显的不确定性。随着投资期限从当前延伸至三年，价格路径逐渐发散，说明未来价格的不确定性会随时间增加。这一点与金融市场中的风险累积特征一致：持有期越长，资产最终价格可能落入的区间越宽，投资者面临的潜在收益和潜在损失范围也越大。
                    </p>
                    <p>
                      其次，周度模拟相较于月度模拟呈现出更连续、更细致的价格演化过程。由于周度时间步长包含更多观测点，它能够更充分地刻画资产价格在持有期内的波动变化。因此，对于需要关注动态风险管理、阶段性回撤或再平衡策略的投资者而言，周度模拟更有助于识别投资期间的路径风险。相比之下，月度模拟虽然计算点数较少，但相邻时间点之间的跳跃更明显，可能弱化对短期波动的刻画。
                    </p>
                    <p>
                      Euler 方法与 Exact 方法整体上给出了相似的价格扩散趋势，但二者在数值性质上存在差异。Euler 方法是一种近似离散化方法，在时间步长较大时可能引入一定的离散化误差，尤其是在月度模拟下更容易使终端价格分布产生偏差。Exact 方法则直接基于 GBM 的解析解生成价格路径，因此能够更好地保持理论上的对数正态分布特征，并确保价格始终为正。
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${task5Base}${encodeURIComponent("Histogram of Terminal Prices.png")}`}
                      alt="GBM 模拟终端价格分布直方图"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="mt-5 space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      周度模拟与月度模拟的终端价格分布整体形态较为接近，均表现出右偏和长右尾特征。不过，不同时间步长会影响分布的细节。
                    </p>
                    <p>
                      对于 Euler 方法而言，时间步长从周度变为月度后，均值由约 303.88 下降至 297.14，中位数由约 277.00 下降至 272.38。这说明在 Euler 离散化下，较大的时间步长可能引入一定的数值近似误差，从而影响终端价格分布的位置和形态。
                    </p>
                    <p>
                      对于 Exact 方法而言，周度和月度模拟的分布理论上应保持一致，因为 Exact 方法直接基于 GBM 的闭式解进行模拟，时间步长主要影响路径显示精度，而不应显著影响终端价格分布。图中 Exact-Weekly 和 Exact-Monthly 的均值及中位数存在一定差异，可能主要来自有限模拟次数下的随机抽样误差，而非方法本身的系统性偏差。
                    </p>
                    <p>
                      从投资建模角度来看，Euler 方法是一种近似模拟方法，其优势在于实现简单、适用范围广；但在 GBM 模型中，它可能受到离散化误差影响，尤其在时间步长较大时更为明显。因此，Euler 模拟得到的终端价格分布可能与理论分布存在偏离。
                    </p>
                    <p>
                      相比之下，Exact 方法直接利用 GBM 的解析解生成终端价格，能够更准确地保持对数正态分布特征，并确保资产价格始终为正。因此，在使用 GBM 进行投资收益预测、风险分析或衍生品定价时，Exact 方法通常更具理论一致性和数值稳定性。
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-xl border border-primary/20 bg-card p-5">
                <h2 className="text-sm font-semibold text-primary mb-4">
                  Heston模型下的股票价格及看涨期权路径模拟
                </h2>
                <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                  <img
                    src={`${task5Base}Heston_MonteCarlo_White.png`}
                    alt="Heston 模型下股票价格与看涨期权蒙特卡洛路径模拟"
                    className="w-full h-auto"
                  />
                </div>
              </section>

              <section className="rounded-xl border border-primary/20 bg-card p-5">
                <h2 className="text-sm font-semibold text-primary mb-4">Heston模型的敏感性测试</h2>
                <div className="flex flex-col gap-4 items-stretch">
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${task5Base}Heston_var.png`}
                      alt="Heston 模型方差参数敏感性测试"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${task5Base}Heston_rho.png`}
                      alt="Heston 模型相关系数 rho 敏感性测试"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="overflow-hidden rounded-lg border border-primary/20 bg-background">
                    <img
                      src={`${task5Base}Heston_kappa.png`}
                      alt="Heston 模型均值回归速度 kappa 敏感性测试"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // 兜底：理论上不会走到这里
  return null;
};

export default ProjectDetail;
