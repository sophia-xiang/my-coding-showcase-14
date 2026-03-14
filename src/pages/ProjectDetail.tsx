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

  // 兜底：理论上不会走到这里
  return null;
};

export default ProjectDetail;
