import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";

/** task7：FINA 6492 个人项目，基于 LightGBM 的房贷违约预测（数字均取自项目报告） */
const base = `${import.meta.env.BASE_URL}task7/`;

const HEADLINE_KPIS = [
  { label: "样本外 AUC", value: "0.810", note: "Logistic 评分卡 0.794" },
  { label: "剔除最高风险 10% 可拦截的违约", value: "44.6%", note: "Logistic 评分卡 41.6%" },
  { label: "风险叠加客群的违约识别率", value: "87%", note: "Logistic 评分卡 75%" },
  { label: "全量年份训练提速", value: "4.5×", note: "对比 XGBoost，370 万笔贷款" },
];

const DESIGN_META = [
  { label: "数据来源", value: "Freddie Mac 单户住房贷款数据集（Release 47）" },
  { label: "样本", value: "2015–2023 年发放的 410,630 笔贷款" },
  { label: "预测目标", value: "首次还款后 24 个月内严重违约（逾期 90 天以上或信用事件终止）" },
  { label: "特征", value: "只用贷款发放时的信息，共 24 个（11 个数值型，13 个类别型）" },
  { label: "单调约束", value: "违约概率随 FICO 下降而不减，随 CLTV、LTV、DTI 上升而不减" },
  { label: "调参与训练", value: "Optuna 搜索 60 组参数，早停，5 个随机种子取平均" },
];

const SPLITS = [
  { split: "训练集", vintages: "2015–2018", loans: "177,225", defaults: "952", rate: "0.54%" },
  { split: "验证集", vintages: "2019", loans: "46,820", defaults: "259", rate: "0.55%" },
  { split: "压力测试集", vintages: "2020", loans: "45,042", defaults: "180", rate: "0.40%" },
  { split: "测试集（只用一次）", vintages: "2021–2023", loans: "141,543", defaults: "1,609", rate: "1.14%" },
];

const MODEL_ROWS = [
  { model: "B0 定价网格（FICO × LTV）", auc: "0.768 [0.756, 0.779]", pr: "0.035", ks: "0.418", delta: "−0.027 [−0.035, −0.018]" },
  { model: "B1 Logistic 评分卡", auc: "0.794 [0.784, 0.805]", pr: "0.044", ks: "0.443", delta: "—" },
  { model: "B2 Logistic + 高基数类别变量", auc: "0.792 [0.781, 0.802]", pr: "0.043", ks: "0.446", delta: "−0.002 [−0.004, −0.001]" },
  { model: "M1 XGBoost", auc: "0.806 [0.797, 0.816]", pr: "0.047", ks: "0.462", delta: "+0.012 [+0.007, +0.016]" },
  { model: "M2 LightGBM", auc: "0.805 [0.795, 0.814]", pr: "0.047", ks: "0.460", delta: "+0.010 [+0.006, +0.016]" },
  { model: "M3 LightGBM（单调约束）", auc: "0.810 [0.801, 0.820]", pr: "0.049", ks: "0.471", delta: "+0.016 [+0.011, +0.021]", best: true },
];

const SCALE_ROWS = [
  { size: "10 万", lgbm: "3.0 s", xgb: "1.5 s", time: "0.5×", model: "0.8×" },
  { size: "370 万（全量年份）", lgbm: "23.2 s", xgb: "104.5 s", time: "4.5×", model: "3.0×" },
  { size: "200 万，ZIP3 one-hot（715 列）", lgbm: "14.4 s", xgb: "326.1 s", time: "22.6×", model: "2.0×" },
];

const CAPTURE_TOP10 = [
  { label: "B0 定价网格", value: "38.2%" },
  { label: "B1 Logistic 评分卡", value: "41.6%" },
  { label: "M3 LightGBM（单调约束）", value: "44.6%" },
];

const CAPTURE_LAYERED = [
  { label: "客群违约率", value: "7.0%" },
  { label: "B1 Logistic 评分卡", value: "75%" },
  { label: "M3 LightGBM（单调约束）", value: "87%" },
];

const RISKS = [
  "排序准确但水平偏低。2022 年加息后实际违约率翻倍，模型的预测没有跟着上升，用更新的数据重训也无法修正。",
  "利率外推。2023 年 94.5% 的贷款利率高于训练样本的 99 分位（5.6%），树模型在训练范围之外只能平推，应重点监控同月利率利差。",
  "公平借贷。ZIP3、MSA 等地理变量可能成为受保护特征的代理，而去掉全部地理变量不影响精度，生产版本应剔除。",
];

const CONTROLS = [
  "每季度监控评分和关键输入的 PSI，超过 0.25 触发复核。",
  "实际与预测违约之比超出 0.8–1.25 区间时，用最新的成熟年份重新校准截距。",
  "评分卡继续作为主模型和备用方案，连续两个成熟年份都支持新模型后再切换。",
];

const cardClass = "min-w-0 rounded-xl border border-primary/20 bg-card p-5";
const figureClass = "overflow-hidden rounded-lg border border-primary/20 bg-background";
const textPanelClass =
  "space-y-3 rounded-lg border border-primary/20 bg-background p-4 text-sm text-muted-foreground leading-relaxed [text-wrap:pretty]";
const thClass = "py-2 px-3 font-medium text-primary/90 whitespace-nowrap";
const tdClass = "py-2 px-3 whitespace-nowrap";

type Task7Props = {
  order: number;
  title: string;
  description: string;
};

const Task7LightGBM = ({ order, title, description }: Task7Props) => {
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
            <p className="text-muted-foreground leading-relaxed max-w-4xl [text-wrap:pretty]">
              {description}
            </p>
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
            {/* 研究设计 */}
            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("研究设计")}</h2>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="min-w-0 space-y-3 text-sm">
                  {DESIGN_META.map((item) => (
                    <div key={item.label} className="flex gap-4 border-b border-dashed border-primary/15 pb-2 last:border-0">
                      <span className="w-24 shrink-0 text-muted-foreground">{tr(item.label)}</span>
                      <span className="text-foreground">{tr(item.value)}</span>
                    </div>
                  ))}
                </div>
                <div className="min-w-0">
                  <div className="overflow-x-auto rounded-lg border border-primary/20 bg-background">
                    <table className="w-full text-sm text-muted-foreground">
                      <thead>
                        <tr className="border-b border-primary/20 text-left">
                          <th className={thClass}>{tr("样本")}</th>
                          <th className={thClass}>{tr("发放年份")}</th>
                          <th className={`${thClass} text-right`}>{tr("贷款数")}</th>
                          <th className={`${thClass} text-right`}>{tr("违约数")}</th>
                          <th className={`${thClass} text-right`}>{tr("违约率")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SPLITS.map((row) => (
                          <tr key={row.split} className="border-b border-primary/10 last:border-0">
                            <td className={`${tdClass} text-foreground`}>{tr(row.split)}</td>
                            <td className={`${tdClass} font-mono`}>{row.vintages}</td>
                            <td className={`${tdClass} font-mono text-right tabular-nums`}>{row.loans}</td>
                            <td className={`${tdClass} font-mono text-right tabular-nums`}>{row.defaults}</td>
                            <td className={`${tdClass} font-mono text-right tabular-nums`}>{row.rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed [text-wrap:pretty]">
                    {tr("按发放年份切分训练、验证和测试集，测试集只在最后评估一次，模拟模型上线后面对未来贷款的真实情况。")}
                  </p>
                </div>
              </div>
            </section>

            {/* 违约标签 */}
            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("违约标签的设定")}</h2>
              <div className="flex flex-col gap-5">
                <div className={figureClass}>
                  <img
                    src={`${base}fig6_vintages.png`}
                    alt={tr("各发放年份的 24 个月违约率，原始标签与主标签对比")}
                    className="w-full h-auto"
                  />
                </div>
                <div className={textPanelClass}>
                  <p>
                    {tr("新冠疫情期间的还款宽限（forbearance）会让原始违约标签失真。2019 年发放的贷款中有 4.7% 曾逾期 90 天以上，大多发生在服务商标记为宽限或灾害的月份。")}
                  </p>
                  <p>
                    {tr("主标签因此不计入宽限期和灾害月份中的逾期，信用事件终止仍算违约，2019 年的违约率回到 0.55%。如果直接用原始标签训练，测试集 AUC 会从 0.810 降到 0.763。")}
                  </p>
                </div>
              </div>
            </section>

            {/* 风险叠加 */}
            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("为什么需要树模型：风险会叠加")}</h2>
              <div className="flex flex-col gap-5">
                <div className={figureClass}>
                  <img
                    src={`${base}fig5_risk_layering.png`}
                    alt={tr("按 FICO 与 CLTV 分组的实际违约率热力图，分 DTI 高低两组")}
                    className="w-full h-auto"
                  />
                </div>
                <div className={textPanelClass}>
                  <p>
                    {tr("现有的 FICO × LTV 定价网格和 Logistic 评分卡都是加法结构，每个风险因子的贡献固定，不随其他因子变化。")}
                  </p>
                  <p>
                    {tr("但房贷风险会叠加。FICO 700–739、CLTV 90–95 的借款人，DTI 不超过 43 时违约率为 0.88%，超过 43 时升到 2.36%；而在 FICO 780 以上，同样的 DTI 变化几乎没有影响。梯度提升树可以直接从数据中学到这类交互效应。")}
                  </p>
                </div>
              </div>
            </section>

            {/* 模型对比 */}
            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("样本外模型对比（2021–2023 测试集）")}</h2>
              <div className="flex flex-col gap-5">
                <div className="overflow-x-auto rounded-lg border border-primary/20 bg-background">
                  <table className="w-full text-sm text-muted-foreground">
                    <thead>
                      <tr className="border-b border-primary/20 text-left">
                        <th className={thClass}>{tr("模型")}</th>
                        <th className={`${thClass} text-right`}>AUC [95% CI]</th>
                        <th className={`${thClass} text-right`}>PR-AUC</th>
                        <th className={`${thClass} text-right`}>KS</th>
                        <th className={`${thClass} text-right`}>{tr("相对评分卡的 ΔAUC [95% CI]")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MODEL_ROWS.map((row) => (
                        <tr
                          key={row.model}
                          className={`border-b border-primary/10 last:border-0 ${row.best ? "bg-primary/5 text-foreground font-semibold" : ""}`}
                        >
                          <td className={`${tdClass} ${row.best ? "text-primary" : "text-foreground"}`}>{tr(row.model)}</td>
                          <td className={`${tdClass} font-mono text-right tabular-nums`}>{row.auc}</td>
                          <td className={`${tdClass} font-mono text-right tabular-nums`}>{row.pr}</td>
                          <td className={`${tdClass} font-mono text-right tabular-nums`}>{row.ks}</td>
                          <td className={`${tdClass} font-mono text-right tabular-nums`}>{row.delta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="-mt-2 text-xs text-muted-foreground">
                  {tr("测试集共 141,543 笔贷款、1,609 笔违约；置信区间来自 1,000 次配对 bootstrap 重抽样。")}
                </p>
                <div className={textPanelClass}>
                  <p>
                    {tr("M3 在全部 1,000 次 bootstrap 抽样中 AUC 都高于评分卡，而且优势逐年扩大，2021、2022、2023 年分别领先 0.010、0.021、0.026。")}
                  </p>
                  <p>
                    {tr("B2 给评分卡加入了更多变量，表现反而略差，说明提升来自模型的灵活性，而不是更多的信息。")}
                  </p>
                </div>
                <div className={figureClass}>
                  <img
                    src={`${base}fig1_pr_calibration.png`}
                    alt={tr("测试集精确率–召回率曲线与按十分位的校准图")}
                    className="w-full h-auto"
                  />
                </div>
                <div className={textPanelClass}>
                  <p>
                    {tr("左图是测试集的精确率–召回率曲线，M3 在大部分召回区间都位于最上方。右图按评分十分位比较预测和实际违约率，用 2019 年数据做 isotonic 校准后，M3 的实际违约率随分位单调上升，从 0.08% 到 5.1%。")}
                  </p>
                  <p>
                    {tr("但所有模型都把 2022–23 年的违约水平低估了约一半（实际 1.38–1.50%，预测均值 0.65–0.68%）。这是加息后违约水平整体上移，不是排序失效，用于计提减值准备（CECL）之前需要按年份重新校准。")}
                  </p>
                </div>
              </div>
            </section>

            {/* 经济价值 */}
            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("经济价值")}</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-5">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                  <h3 className="text-sm font-semibold text-primary mb-3">
                    {tr("剔除最高风险 10% 的贷款后可拦截的违约占比")}
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {CAPTURE_TOP10.map((row) => (
                      <div key={row.label} className="flex items-center justify-between">
                        <span>{tr(row.label)}</span>
                        <span className="font-mono text-foreground">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-primary/20 bg-card p-5">
                  <h3 className="text-sm font-semibold text-primary mb-3">
                    {tr("风险叠加客群（FICO < 700、CLTV > 85、DTI > 43）中被排进最高风险 10% 的违约占比")}
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {CAPTURE_LAYERED.map((row) => (
                      <div key={row.label} className="flex items-center justify-between">
                        <span>{tr(row.label)}</span>
                        <span className="font-mono text-foreground">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={textPanelClass}>
                <p>
                  {tr("按训练期 16.7% 的平均损失率计算，每 10 亿美元新收购的贷款可避免的预期损失从 68 万美元升到 75 万美元。GSE 本身的损失率较低，因此价值主要体现在更准确的风险分层和更少的逆向选择，而不是损失金额。")}
                </p>
              </div>
            </section>

            {/* SHAP */}
            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("模型解释：SHAP 与消融实验")}</h2>
              <div className="flex flex-col gap-5">
                <div className={figureClass}>
                  <img
                    src={`${base}fig2_shap.png`}
                    alt={tr("单调约束 LightGBM 的 SHAP 特征重要性与 FICO、DTI 效应图")}
                    className="w-full h-auto"
                  />
                </div>
                <div className={textPanelClass}>
                  <p>
                    {tr("SHAP 显示，信号主要来自 FICO、借款人数量（单一借款人的风险更高）、利率利差（贷款利率减去同月同期限贷款的中位利率）和 DTI，影响方向都符合经济直觉。")}
                  </p>
                  <p>
                    {tr("消融实验把 M3 相对评分卡的 0.016 AUC 提升拆开，约 0.007 来自非线性主效应，约 0.010 来自变量间的交互；去掉单调约束会损失 0.005；地理变量的贡献在 ±0.001 以内。")}
                  </p>
                </div>
              </div>
            </section>

            {/* 规模测试 */}
            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("为什么选 LightGBM：全量数据下的训练效率")}</h2>
              <div className="flex flex-col gap-5">
                <div className="overflow-x-auto rounded-lg border border-primary/20 bg-background">
                  <table className="w-full text-sm text-muted-foreground">
                    <thead>
                      <tr className="border-b border-primary/20 text-left">
                        <th className={thClass}>{tr("训练样本")}</th>
                        <th className={`${thClass} text-right`}>LightGBM</th>
                        <th className={`${thClass} text-right`}>XGBoost</th>
                        <th className={`${thClass} text-right`}>{tr("耗时倍数（XGB / LGBM）")}</th>
                        <th className={`${thClass} text-right`}>{tr("模型大小倍数")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SCALE_ROWS.map((row) => (
                        <tr key={row.size} className="border-b border-primary/10 last:border-0">
                          <td className={`${tdClass} text-foreground`}>{tr(row.size)}</td>
                          <td className={`${tdClass} font-mono text-right tabular-nums`}>{row.lgbm}</td>
                          <td className={`${tdClass} font-mono text-right tabular-nums`}>{row.xgb}</td>
                          <td className={`${tdClass} font-mono text-right tabular-nums text-primary font-semibold`}>{row.time}</td>
                          <td className={`${tdClass} font-mono text-right tabular-nums`}>{row.model}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={figureClass}>
                  <img
                    src={`${base}fig4_scale.png`}
                    alt={tr("LightGBM 与 XGBoost 在 2021 全量年份上的训练时间、内存与样本外 AUC")}
                    className="w-full h-auto"
                  />
                </div>
                <div className={textPanelClass}>
                  <p>
                    {tr("两者精度相当，选择 LightGBM 的理由在运营层面。在 17.7 万笔的训练集上 XGBoost 反而更快，优势要到生产规模才出现。")}
                  </p>
                  <p>
                    {tr("用 2021 年全量 370 万笔贷款各训练 500 轮，LightGBM 快 4.5 倍；把 ZIP3 做 one-hot 编码后快 22.6 倍，因为 LightGBM 的互斥特征捆绑会先把互斥的哑变量合并。两者的样本外 AUC 在每个规模下相差都不到 0.004。")}
                  </p>
                </div>
              </div>
            </section>

            {/* 模型风险与建议 */}
            <section className={cardClass}>
              <h2 className="text-sm font-semibold text-primary mb-4">{tr("模型风险与使用建议")}</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-5">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                  <h3 className="text-sm font-semibold text-primary mb-3">{tr("主要风险")}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    {RISKS.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary font-mono">›</span>
                        <span>{tr(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-primary/20 bg-card p-5">
                  <h3 className="text-sm font-semibold text-primary mb-3">{tr("监控与治理（SR 11-7）")}</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    {CONTROLS.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary font-mono">›</span>
                        <span>{tr(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={textPanelClass}>
                <p>
                  {tr("建议把单调约束 LightGBM 作为挑战者模型，与评分卡并行，用于贷款收购的风险分层和担保费定价；在完成按年份校准和宏观情景叠加之前，不用于计提减值准备。")}
                </p>
                <p>
                  {tr("下一步可以改用贷款–月度面板，把违约和提前还款作为竞争风险建模，并加入房价和利率路径，把时点 PD 扩展为可用于 CECL 和压力测试的全周期 PD。")}
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Task7LightGBM;
