import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const violet = "bg-[hsl(258,90%,96%)] text-[hsl(258,70%,45%)]";

const stepIndex = (n: number) => String(n + 1).padStart(2, "0");

const AIWorkflow = () => {
  const { t, lang } = useLang();
  const stages = t.stages;
  const quote = (s: string) => (lang === "zh" ? `「${s}」` : `“${s}”`);

  return (
    <section className="w-full px-6 md:px-8 py-16 bg-background border-b border-border">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-semibold mb-2 text-foreground"
      >
        {t.workflowTitle}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.12 }}
        className="text-sm text-muted-foreground mb-8 max-w-4xl leading-relaxed [text-wrap:balance]"
      >
        {t.workflowIntro}
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
                  <span className="text-xs text-muted-foreground">{quote(s.question)}</span>
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
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.summary}</p>

            {/* 分析模块 */}
            {s.tabs && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-foreground mb-2.5">{s.tabsLabel}</div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {s.tabs.map((tab, k) => (
                    <div
                      key={tab.name}
                      className="rounded-lg border border-border bg-muted/30 px-4 py-3"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${violet}`}>
                          {stepIndex(k)}
                        </span>
                        <span className="text-sm font-semibold text-foreground">{tab.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tab.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 流程链 */}
            {s.flow && (
              <div className="mb-5">
                <div className="text-xs font-semibold text-foreground mb-2.5">{s.flowLabel}</div>
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
              <div className="text-xs font-semibold text-foreground mb-1.5">{s.notesLabel}</div>
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
