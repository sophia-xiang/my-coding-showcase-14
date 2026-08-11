import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type FlowStep = string | { parallel: string[]; note: string };

type Stage = {
  id: string;
  stage: string;
  question: string;
  title: string;
  summary: string;
  tags: string[];
  flow?: FlowStep[];
  flowLabel?: string;
  tabs?: { name: string; desc: string }[];
  notes: string[];
};

const stages: Stage[] = [
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
    tabs: [
      { name: "业绩检验", desc: "盈利能力指标、业绩自洽性四组对照、现金流含金量验证" },
      { name: "业绩归因", desc: "ROE 杜邦分解、营收拆解、利润率瀑布" },
      { name: "验证排雷", desc: "资产端／偿债／治理三维扫描 + 红黄绿仪表盘" },
      { name: "估值区间", desc: "PE 六维矩阵与三角验证；周期股走 PB 路径" },
      { name: "盈利预测", desc: "三档情景 EPS + 敏感性分析 + 预期差量化" },
      { name: "量价印证", desc: "业绩窗口、排雷增强、估值修复、资金流向四场景" },
      { name: "行业对比", desc: "八维相似度筛选精选同行 + 行业分位定位" },
    ],
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
    notes: [
      "选股与择时严格分离——利好本身不构成入场理由，入场信号由技术面与事件独立触发，避免看到消息就追高。",
      "输出固定包含入场区间、止损位、分批目标、仓位建议与核心风险点；持仓标的强制给出止盈止损。",
    ],
  },
];

const violet = "bg-[hsl(258,90%,96%)] text-[hsl(258,70%,45%)]";

const stepIndex = (n: number) => String(n + 1).padStart(2, "0");

const AIWorkflow = () => {
  return (
    <section className="w-full px-6 md:px-8 py-16 bg-background border-b border-border">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-semibold mb-2 text-foreground"
      >
        AI 投研工作流
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
        className="text-sm text-muted-foreground mb-8 max-w-4xl leading-relaxed [text-wrap:balance]"
      >
        把投研流程拆成「发现 → 定价 → 择时」三个环节，各自用一套可复用的工具承接，串成一条能每日滚动运行的中长期投资流水线。
      </motion.p>

      {/* 流水线总览 */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-xl border border-border bg-card p-5 md:p-6 mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-stretch gap-3">
          {stages.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center gap-3">
              <div className="flex-1 rounded-lg bg-muted/60 px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${violet}`}>
                    {s.stage}
                  </span>
                  <span className="text-xs text-muted-foreground">「{s.question}」</span>
                </div>
                <div className="font-semibold text-sm text-foreground">{s.title}</div>
              </div>
              {i < stages.length - 1 && (
                <ArrowRight
                  size={18}
                  className="shrink-0 text-muted-foreground rotate-90 md:rotate-0"
                />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* 三个环节详情 */}
      <div className="flex flex-col gap-5">
        {stages.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
            className="rounded-xl border border-border bg-card p-6 md:p-7"
          >
            {/* 标题行 */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
              <span className={`text-xs font-mono px-2 py-0.5 rounded-md ${violet}`}>
                {s.stage}
              </span>
              <h3 className="font-semibold text-lg text-foreground">{s.title}</h3>
              <div className="flex flex-wrap gap-1.5 md:ml-auto">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs font-mono px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.summary}</p>

            {/* 分析模块 */}
            {s.tabs && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-foreground mb-2.5">七大分析模块</div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {s.tabs.map((t, k) => (
                    <div
                      key={t.name}
                      className="rounded-lg border border-border bg-muted/30 px-4 py-3"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${violet}`}>
                          {stepIndex(k)}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{t.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 流程链 */}
            {s.flow && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-foreground mb-2.5">
                  {s.flowLabel ?? "分析链条"}
                </div>
                <div className="flex flex-wrap items-stretch gap-x-2 gap-y-2">
                  {s.flow.map((step, k) => (
                    <div key={k} className="flex items-center gap-2">
                      {typeof step === "string" ? (
                        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3.5 py-2.5">
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${violet}`}
                          >
                            {stepIndex(k)}
                          </span>
                          <span className="text-sm font-medium text-foreground">{step}</span>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-border bg-muted/30 px-3.5 py-2.5">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span
                              className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${violet}`}
                            >
                              {stepIndex(k)}
                            </span>
                            <span className="text-xs text-muted-foreground">{step.note}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            {step.parallel.map((p) => (
                              <span key={p} className="text-sm font-medium text-foreground">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {k < s.flow!.length - 1 && (
                        <ArrowRight size={14} className="shrink-0 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 设计取舍 */}
            <div className="rounded-lg border-l-2 border-[hsl(258,70%,60%)] bg-muted/40 px-4 py-3">
              <div className="text-xs font-semibold text-foreground mb-1.5">设计取舍</div>
              <ul className="space-y-1.5">
                {s.notes.map((n) => (
                  <li key={n} className="text-xs text-muted-foreground leading-relaxed">
                    · {n}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AIWorkflow;
