import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const strategyBase = `${import.meta.env.BASE_URL}strategy1/`;
const dashboardUrl = `${strategyBase}AMZN_MSFT_Strategy_Dashboard.html?embed=1`;

const BACKTEST_KPIS = [
  { label: "Final NAV", value: "$1,681,195", tone: "accent" as const },
  { label: "Total Return", value: "+68.12%", tone: "pos" as const },
  { label: "Sharpe", value: "1.25", tone: "pos" as const },
  { label: "Max DD", value: "-0.98%", tone: "neg" as const },
  { label: "Win Rate", value: "75.9%", tone: "pos" as const },
  { label: "Trades", value: "29", tone: "neutral" as const },
];

const FRAMEWORK_META: { label: string; value: string }[] = [
  { label: "标的资产", value: "AMZN · MSFT" },
  { label: "初始拟合样本", value: "5 年日频收盘价" },
  { label: "滚动窗口", value: "750 交易日（约 3 年）" },
  { label: "再校准频率", value: "每周五收盘后" },
  { label: "信号模型", value: "GJR-GARCH(1,1) + DCC(1,1) + Copula h-function" },
  { label: "创新项分布", value: "标准化 Student-t（联合估计）" },
  { label: "Copula 候选", value: "Gaussian · Student-t · Clayton · Frank（AIC 选优）" },
  { label: "执行时点", value: "信号收盘生成后，次日开盘执行" },
];

const PIPELINE_STEPS = [
  {
    id: "1A",
    title: "GJR-GARCH 边缘模型",
    subtitle: "提取标准化残差",
    body: "对 AMZN、MSFT 分别拟合 GJR-GARCH(1,1)，用 Student-t 创新项刻画厚尾与杠杆效应；输出条件波动率 σᵢ,ₜ 与标准化残差 zᵢ,ₜ。每周用 750 日滚动窗口再估计参数。",
  },
  {
    id: "1B",
    title: "DCC 动态条件相关",
    subtitle: "时变相关系数 ρₜ",
    body: "在标准化残差上应用 Engle (2002) DCC，得到时变相关 ρₜ 与条件协方差矩阵；推导对冲比率 hₜ = ρₜ·(σ_A/σ_B)。当 ρₜ < 0.40 时禁止开新仓。",
  },
  {
    id: "1C",
    title: "Copula 依赖结构",
    subtitle: "PIT → 选族 → h 函数信号",
    body: "将残差经 PIT 映射至 Uniform[0,1]；在 Gaussian、Student-t、Clayton、Frank 中按 AIC 选优（本回测最优：Student-t）。核心交易指标 Signalₜ = P(U_B ≤ u_B | U_A = u_A)。",
  },
];

const SIGNAL_ZONES = [
  { range: "0.00 – 0.12", zone: "强空 MSFT / 多 AMZN", meaning: "MSFT 相对高估" },
  { range: "0.88 – 1.00", zone: "强多 MSFT / 空 AMZN", meaning: "MSFT 相对低估" },
  { range: "0.22 – 0.78", zone: "中性 / 不交易", meaning: "配对处于正常依赖区间" },
];

const ENTRY_RULES = [
  "主信号：Signalₜ < 0.12 或 > 0.88",
  "确认：极端区间连续 1 个交易日",
  "价差 Z 分数：|Z| > 0.3（60 日滚动）",
  "相关过滤：ρₜ > 0.40",
  "制度过滤：近 5 日无 Copula 族切换",
  "空仓要求：无持仓方可开仓",
];

const EXIT_RULES = [
  { type: "止盈", rule: "Signal 进入 [0.22, 0.78]", action: "次日开盘全部平仓" },
  { type: "相关失效", rule: "信号加深且 ρ 较入场下降 > 0.15", action: "次日开盘全部平仓" },
];

const kpiToneClass = {
  accent: "text-sky-600",
  pos: "text-emerald-600",
  neg: "text-red-600",
  neutral: "text-slate-900",
};

type Task5StrategyProps = {
  order: number;
  description: string;
};

const Task5Strategy = ({ order, description }: Task5StrategyProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{
        background:
          "radial-gradient(ellipse 1200px 600px at 20% -10%, rgba(2,132,199,0.06), transparent 60%), radial-gradient(ellipse 900px 500px at 80% 10%, rgba(147,51,234,0.05), transparent 60%), #f8fafc",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full px-6 md:px-10 lg:px-20 pt-10 pb-20 max-w-[1600px] mx-auto"
      >
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-sky-600 transition-colors mb-10"
        >
          <ArrowLeft size={16} /> 返回首页
        </button>

        <header className="pb-6 border-b border-slate-200 mb-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-sky-600/10 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-sky-600">{order}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 whitespace-nowrap">
                AMZN/MSFT相对价值策略
              </h1>
            </div>
            <p className="text-sm text-slate-600 w-full leading-relaxed mb-5">
              <span className="block whitespace-nowrap overflow-x-auto pb-0.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {description}。建模链路：GJR-GARCH(1,1) 边缘 → DCC 时变相关系数 → Student-t Copula h-function → 条件配对信号；
              </span>
              <span className="block">每 20 个交易日滚动校准。</span>
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 border border-slate-200 rounded-[10px] overflow-hidden bg-gradient-to-b from-white to-slate-50 shadow-sm w-full">
              {BACKTEST_KPIS.map((kpi, i) => (
                <div
                  key={kpi.label}
                  className={`px-4 py-3.5 text-right border-slate-200 ${i < BACKTEST_KPIS.length - 1 ? "border-r" : ""} ${i >= 3 ? "border-t sm:border-t-0" : ""}`}
                >
                  <div className="font-mono text-[9.5px] tracking-wider uppercase text-slate-400 mb-1.5">
                    {kpi.label}
                  </div>
                  <div className={`font-mono text-lg font-semibold tabular-nums ${kpiToneClass[kpi.tone]}`}>
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </header>

        <section className="mb-10">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-slate-900">策略框架与交易规则</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {FRAMEWORK_META.map((item) => (
              <div
                key={item.label}
                className="rounded-[10px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 px-4 py-3.5"
              >
                <div className="font-mono text-[9.5px] tracking-wider uppercase text-slate-400 mb-1">
                  {item.label}
                </div>
                <div className="text-sm font-medium text-slate-800 leading-snug">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {PIPELINE_STEPS.map((step) => (
              <article
                key={step.id}
                className="rounded-[10px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5"
              >
                <div className="font-mono text-[10px] text-sky-600 mb-2">{step.id}</div>
                <h3 className="font-semibold text-slate-900 mb-0.5">{step.title}</h3>
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wide mb-3">{step.subtitle}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{step.body}</p>
              </article>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="rounded-[10px] border border-slate-200 bg-white p-5">
              <h3 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-slate-500 mb-4">信号分区</h3>
              <div className="space-y-2">
                {SIGNAL_ZONES.map((z) => (
                  <div
                    key={z.range}
                    className="flex flex-wrap gap-x-4 gap-y-1 py-2 border-b border-dashed border-slate-200 last:border-0 text-sm"
                  >
                    <span className="font-mono text-sky-600 shrink-0">{z.range}</span>
                    <span className="text-slate-800 font-medium">{z.zone}</span>
                    <span className="text-slate-500">{z.meaning}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[10px] border border-slate-200 bg-white p-5">
              <h3 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-slate-500 mb-4">
                入场条件（须同时满足）
              </h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {ENTRY_RULES.map((rule) => (
                  <li key={rule} className="flex gap-2">
                    <span className="text-sky-600 font-mono">›</span>
                    {rule}
                  </li>
                ))}
              </ul>
              <h3 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-slate-500 mt-6 mb-3">
                出场规则
              </h3>
              <div className="space-y-2">
                {EXIT_RULES.map((e) => (
                  <div key={e.type} className="text-sm border border-slate-100 rounded-lg p-3 bg-slate-50">
                    <span className="inline-block font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-sky-600/10 text-sky-700 mb-1">
                      {e.type}
                    </span>
                    <p className="text-slate-700">{e.rule}</p>
                    <p className="text-slate-500 text-xs mt-1">{e.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        <section className="mb-10">
          <h2 className="text-base font-semibold text-slate-900 mb-6">组合表现</h2>

          <div className="mb-10 rounded-[10px] border border-slate-200 bg-white p-5 overflow-hidden">
            <div className="flex flex-wrap justify-between items-baseline gap-2 mb-4">
              <h3 className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-slate-500 font-medium">
                Return & Drawdown · Preview
              </h3>
              <span className="font-mono text-[10px] text-slate-400">AMZN_MSFT_Return_and_Drawdown</span>
            </div>
            <img
              src={`${strategyBase}AMZN_MSFT_Return_and_Drawdown_light.gif`}
              alt="AMZN / MSFT 策略累计收益与回撤"
              className="w-full h-auto rounded-lg border border-slate-100"
            />
          </div>

          <div className="rounded-[10px] border border-slate-200 overflow-hidden bg-white shadow-sm">
            <iframe
              title="AMZN MSFT Copula Strategy Dashboard"
              src={dashboardUrl}
              className="w-full border-0"
              style={{ minHeight: "920px", height: "85vh" }}
            />
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default Task5Strategy;
