import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

/** task8：FINA 6492 第 4 周两份课程练习，车贷风险定价与房贷提前还款（数字均取自 notebook 输出） */
const base = `${import.meta.env.BASE_URL}task8/`;

const HEADLINE_KPIS = [
  { label: "车贷盈亏平衡利率", value: "7.27%", note: "合同利率 9%，安全边际 173bp" },
  { label: "每笔车贷的 NPV", value: "+1,023", note: "放款 25,000，风险现值 26,023" },
  { label: "利率下降 150bp 时房贷的涨幅", value: "+5.33", note: "不可提前还款的债券 +17.74" },
  { label: "提前还款期权的时间价值", value: "1.12", note: "每 100 元面值，OAS −19.9bp" },
];

const AUTO_META = [
  { label: "贷款条款", value: "本金 25,000，期限 60 个月，合同年利率 9%，等额本息月供 518.96" },
  { label: "违约假设", value: "月违约强度 0.25%（年 PD 约 3.0%，60 个月累计 13.9%）" },
  { label: "回收与成本", value: "回收率 55%，资金成本年化 5.40%，服务成本年化 0.50%" },
  { label: "验证方法", value: "解析现值，加上 100 万个模拟借款人的蒙特卡洛" },
];

const AUTO_BRIDGE = {
  headers: ["组成部分", "年化", "bp"],
  rows: [
    ["资金成本", "5.40%", "540"],
    ["+ 信用利差（PD × LGD）", "1.37%", "137"],
    ["+ 服务成本", "0.50%", "50"],
    ["= 盈亏平衡利率", "7.27%", "727"],
    ["合同利率", "9.00%", "900"],
    ["安全边际", "1.73%", "173"],
  ],
  highlight: [3],
};

const AUTO_SENSITIVITY = {
  headers: ["情景", "9% 利率下的 NPV", "NPV 变化", "盈亏平衡利率", "利率变化（bp）"],
  rows: [
    ["基准情景", "1,023", "0", "7.27%", "0"],
    ["违约强度 × 2", "204", "−819", "8.64%", "+137"],
    ["违约强度 × 0.5", "1,463", "+440", "6.58%", "−68"],
    ["回收率 35%", "669", "−355", "7.87%", "+60"],
    ["回收率 75%", "1,378", "+355", "6.67%", "−60"],
    ["资金成本 +100bp", "424", "−599", "8.27%", "+100"],
    ["服务成本 1.0%", "727", "−296", "7.77%", "+50"],
    ["违约强度 × 2 且回收率 35%", "−471", "−1,495", "9.84%", "+257"],
  ],
  highlight: [7],
};

const AUTO_SEGMENTS = {
  headers: ["客群", "年 PD", "LGD", "盈亏平衡利率", "含资本成本的要求利率", "9% 利率下的 NPV"],
  rows: [
    ["超优质", "0.5%", "40%", "6.00%", "6.48%", "+1,845"],
    ["优质", "1.5%", "45%", "6.59%", "7.31%", "+1,459"],
    ["次优（基准）", "3.0%", "45%", "7.27%", "8.23%", "+1,023"],
    ["次级", "6.0%", "55%", "9.85%", "11.05%", "−473"],
    ["深度次级", "12.0%", "60%", "14.68%", "16.12%", "−2,869"],
  ],
  highlight: [] as number[],
};

const MORTGAGE_META = [
  { label: "贷款条款", value: "本金 400,000，30 年期，票面利率 6.50%，月供 2,528.27，发放时 LTV 80%" },
  { label: "提前还款模型", value: "基础 CPR 6%，再融资激励超过成本门槛（均值 50bp）后加速，并考虑账龄和 LTV" },
  { label: "估值方法", value: "按情景利率路径折现，再用蒙特卡洛模拟均值回归的对数正态利率，求出 OAS" },
];

const MORTGAGE_SCENARIOS = {
  headers: ["情景", "房贷价格", "不可提前还款债券", "WAL（年）", "有效久期", "有效凸性"],
  rows: [
    ["基准（利率维持 6.50%）", "100.00", "100.00", "11.09", "6.99", "28.9"],
    ["利率立即下降 150bp", "105.33", "117.74", "4.26", "0.48", "−118.4"],
    ["利率立即上升 100bp", "93.35", "90.40", "11.12", "6.72", "77.5"],
  ],
  highlight: [1],
};

const MORTGAGE_MC = [
  { label: "静态价格（利率维持 6.50%）", value: "100.00" },
  { label: "蒙特卡洛价格", value: "98.88 ± 0.03" },
  { label: "不可提前还款债券", value: "100.52" },
  { label: "提前还款期权的时间价值", value: "1.12" },
  { label: "OAS", value: "−19.9bp" },
];

const MORTGAGE_SPEED = [
  { label: "基准", value: "105.33" },
  { label: "再融资速度减半", value: "107.49" },
  { label: "再融资速度翻倍", value: "103.18" },
  { label: "再融资成本升到 100bp", value: "107.48" },
  { label: "房价下跌 20%（LTV 100%）", value: "107.53" },
];

const cardClass = "min-w-0 rounded-xl border border-primary/20 bg-card p-5";
const figureClass = "overflow-hidden rounded-lg border border-primary/20 bg-background";
const textPanelClass =
  "space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed [text-wrap:pretty]";
const thClass = "py-2 px-3 font-medium text-primary/90 whitespace-nowrap";
const tdClass = "py-2 px-3 whitespace-nowrap";

type TableSpec = { headers: string[]; rows: string[][]; highlight: number[] };

const DataTable = ({ spec, tr }: { spec: TableSpec; tr: (s: string) => string }) => (
  <div className="overflow-x-auto rounded-lg border border-primary/20 bg-background">
    <table className="w-full text-sm text-muted-foreground">
      <thead>
        <tr className="border-b border-primary/20">
          {spec.headers.map((h, i) => (
            <th key={h} className={`${thClass} ${i === 0 ? "text-left" : "text-right"}`}>
              {tr(h)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {spec.rows.map((row, r) => {
          const hl = spec.highlight.includes(r);
          return (
            <tr
              key={row[0]}
              className={`border-b border-primary/10 last:border-0 ${hl ? "bg-primary/5 font-semibold" : ""}`}
            >
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={
                    i === 0
                      ? `${tdClass} ${hl ? "text-primary" : "text-foreground"}`
                      : `${tdClass} font-mono text-right tabular-nums ${hl ? "text-foreground" : ""}`
                  }
                >
                  {i === 0 ? tr(cell) : cell}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

const MetaList = ({ items, tr }: { items: { label: string; value: string }[]; tr: (s: string) => string }) => (
  <div className="min-w-0 space-y-3 text-sm">
    {items.map((item) => (
      <div key={item.label} className="flex gap-4 border-b border-dashed border-primary/15 pb-2 last:border-0">
        <span className="w-24 shrink-0 text-muted-foreground">{tr(item.label)}</span>
        <span className="text-foreground">{tr(item.value)}</span>
      </div>
    ))}
  </div>
);

const StatBox = ({
  title,
  rows,
  tinted,
  tr,
}: {
  title: string;
  rows: { label: string; value: string }[];
  tinted: boolean;
  tr: (s: string) => string;
}) => (
  <div className={`min-w-0 rounded-xl border border-primary/20 p-5 ${tinted ? "bg-primary/5" : "bg-card"}`}>
    <h3 className="text-sm font-semibold text-primary mb-3 [text-wrap:balance]">{tr(title)}</h3>
    <div className="space-y-2 text-sm text-muted-foreground">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4">
          <span>{tr(row.label)}</span>
          <span className="font-mono text-foreground whitespace-nowrap">{row.value}</span>
        </div>
      ))}
    </div>
  </div>
);

type Task8Props = {
  order: number;
  title: string;
  description: string;
};

const Task8LoanPricing = ({ order, title, description }: Task8Props) => {
  const navigate = useNavigate();
  const { tr } = useLang();

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-6 md:px-10 lg:px-20 pt-10 pb-20">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft size={16} /> {tr("返回首页")}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 标题与简介 */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-primary">{order}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-4xl [text-wrap:pretty]">{description}</p>
          </div>

          {/* 核心结果 */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
            {HEADLINE_KPIS.map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <div className="text-xs text-muted-foreground mb-2 [text-wrap:balance]">{tr(kpi.label)}</div>
                <div className="font-mono text-2xl font-semibold text-primary tabular-nums">{kpi.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{tr(kpi.note)}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* ── 第一部分：车贷 ── */}
            <h2 className="text-lg font-semibold text-foreground mt-2">{tr("第一部分：车贷的风险定价")}</h2>

            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("贷款设定与盈亏平衡利率")}</h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-5">
                <MetaList items={AUTO_META} tr={tr} />
                <div className="min-w-0">
                  <DataTable spec={AUTO_BRIDGE} tr={tr} />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <div className={figureClass}>
                  <img
                    src={`${base}auto_cashflow.png`}
                    alt={tr("车贷的摊还与存活概率、预期现金流构成、单笔贷款现值的蒙特卡洛分布")}
                    className="w-full h-auto"
                  />
                </div>
                <div className={textPanelClass}>
                  <p>
                    {tr("按违约概率加权预期现金流后，这笔贷款的风险现值为 26,023，高于放款的 25,000，NPV 为 +1,023，相当于每 100 元本金值 104.09。违约的现值成本为 916，服务成本为 296。")}
                  </p>
                  <p>
                    {tr("100 万个模拟借款人的平均现值为 26,024 ± 5，与解析结果一致。但单笔贷款中有 11.7% 是亏钱的，价值是组合层面的属性，单笔贷款更接近一次二元押注。")}
                  </p>
                </div>
              </div>
            </section>

            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("敏感性分析")}</h2>
              <div className="flex flex-col gap-5">
                <DataTable spec={AUTO_SENSITIVITY} tr={tr} />
                <div className={figureClass}>
                  <img
                    src={`${base}auto_sensitivity.png`}
                    alt={tr("不同回收率下贷款人 NPV 随违约概率的变化，以及盈亏平衡利率网格")}
                    className="w-full h-auto"
                  />
                </div>
                <div className={textPanelClass}>
                  <p>
                    {tr("违约风险是最主要的敏感因素。违约强度翻倍，NPV 减少 819，盈亏平衡利率上升 137bp；回收率上下变动 20 个百分点，NPV 变化 355；资金成本则一比一传导到盈亏平衡利率。")}
                  </p>
                  <p>
                    {tr("违约强度翻倍、同时回收率降到 35% 时，NPV 转为 −471，盈亏平衡利率升到 9.84%，超过了 9% 的合同利率。")}
                  </p>
                </div>
              </div>
            </section>

            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("按客群的风险定价")}</h2>
              <div className="flex flex-col gap-5">
                <DataTable spec={AUTO_SEGMENTS} tr={tr} />
                <div className={textPanelClass}>
                  <p>
                    {tr("统一按 9% 定价时，从超优质到次优客群都盈利；次级客群要 9.85% 才能保本，再加上 12% 门槛收益率的资本成本，需要 11.05%。")}
                  </p>
                  <p>
                    {tr("如果所有人都用同一个利率，低风险客户就是在补贴高风险客户，最终低风险客户流失、高风险客户留下。这就是逆向选择，也是风险定价要解决的问题。")}
                  </p>
                  <p>
                    {tr("模型的简化之处在于违约强度设为常数，而实际违约多集中在前期余额最高的时候；没有考虑提前还款；回收率固定，而二手车价格恰恰会在违约上升的经济下行期下跌。")}
                  </p>
                </div>
              </div>
            </section>

            {/* ── 第二部分：房贷 ── */}
            <h2 className="text-lg font-semibold text-foreground mt-4">{tr("第二部分：房贷的提前还款与负凸性")}</h2>

            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("贷款设定与利率情景")}</h2>
              <div className="flex flex-col gap-5">
                <MetaList items={MORTGAGE_META} tr={tr} />
                <DataTable spec={MORTGAGE_SCENARIOS} tr={tr} />
                <div className={figureClass}>
                  <img
                    src={`${base}mortgage_scenarios.png`}
                    alt={tr("不同利率情景下的提前还款速度、剩余本金，以及蒙特卡洛价格分布")}
                    className="w-full h-auto"
                  />
                </div>
                <div className={textPanelClass}>
                  <p>
                    {tr("在当前利率下，房贷按面值定价，但基准提前还款（前 5 年 CPR 4.7%）把 WAL 从 19.6 年缩短到 11.1 年，有效久期从 10.4 降到 7.0。")}
                  </p>
                  <p>
                    {tr("利率下降 150bp 会把 CPR 推到 19.7%，前 5 年就还掉 65% 的本金，WAL 缩短到 4.3 年。房贷只涨 5.33 点，而同等不可提前还款的债券涨 17.74 点。")}
                  </p>
                </div>
              </div>
            </section>

            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("负凸性：贷款人卖出了一份看涨期权")}</h2>
              <div className="flex flex-col gap-5">
                <div className={figureClass}>
                  <img
                    src={`${base}mortgage_convexity.png`}
                    alt={tr("房贷与不可提前还款债券的价格–利率曲线，以及有效久期和凸性随利率的变化")}
                    className="w-full h-auto"
                  />
                </div>
                <div className={textPanelClass}>
                  <p>
                    {tr("高票息的现金流恰好在最值钱的时候被按面值提前还回，贷款人相当于向借款人卖出了一份看涨期权。利率从 6.50% 降到 5.00%，久期从 7.0 塌缩到 0.5；凸性在利率约 5.90% 时达到 −878。")}
                  </p>
                  <p>
                    {tr("涨跌因此不对称。利率下降 150bp 赚 5.33 点，上升 100bp 亏 6.65 点；同等的普通债券则是赚 17.74、亏 9.60。")}
                  </p>
                </div>
              </div>
            </section>

            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("期权成本与再融资速度")}</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-5">
                <StatBox title="蒙特卡洛估值（每 100 元面值）" rows={MORTGAGE_MC} tinted tr={tr} />
                <StatBox title="利率下降 150bp 时的房贷价格" rows={MORTGAGE_SPEED} tinted={false} tr={tr} />
              </div>
              <div className={textPanelClass}>
                <p>
                  {tr("即使预期利率不变，利率波动本身也有成本。在模拟利率路径下房贷值 98.88，比静态价格低 1.12 点，这就是提前还款期权的时间价值。折算成 OAS 约为 −20bp，也就是说 6.50% 的票息还需要再高约 20bp，才能覆盖这份期权。")}
                </p>
                <p>
                  {tr("最关键的敏感因素是借款人再融资的速度。房价下跌 20% 后 LTV 升到 100%，借款人无法再融资，利率下降 150bp 时价格反而多涨 2.20 点，WAL 从 4.3 年延长到 6.2 年。")}
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Task8LoanPricing;
