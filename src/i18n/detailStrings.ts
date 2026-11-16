/**
 * 详情页正文的中→英对照表。
 * key 为中文原文（空白已折叠为单个空格），由 tr() 在英文模式下查表替换。
 * 未命中的 key 会原样返回中文，因此漏译只会退化、不会崩。
 */
export const detailStrings: Record<string, string> = {
  // ── task4：组合策略点评 ──────────────────────────────────────────
  "这是唯一出现做空的组合——AMZN -43%、MSFT -15.6%，同时重仓LMT 70.2%和CIEN 56.4%。Black-Litterman模型融合了市场均衡收益和投资者主观观点，做空头寸说明模型认为AMZN和MSFT的预期回报低于均衡水平。此外需要注意的是，该组合的总多头暴露为 158.27%（CIEN 56.38% + LMT 70.24% + WMT 27.39% + NVDA 4.64%），总空头暴露为 58.65%（AMZN -43.02% + MSFT -15.63%），净暴露约 99.62%，总暴露（Gross Exposure）为 216.92%。这意味着：":
    "This is the only portfolio that takes short positions — AMZN -43% and MSFT -15.6% — alongside large long positions in LMT (70.2%) and CIEN (56.4%). The Black-Litterman model blends market-equilibrium returns with subjective investor views; the short positions indicate the model expects AMZN and MSFT to deliver below-equilibrium returns. Note also that gross long exposure is 158.27% (CIEN 56.38% + LMT 70.24% + WMT 27.39% + NVDA 4.64%) and gross short exposure is 58.65% (AMZN -43.02% + MSFT -15.63%), giving net exposure of roughly 99.62% and gross exposure of 216.92%. This implies:",

  "年化收益约28%，年化波动率仅16.95%，是五种策略中波动最低的。日收益分布接近正态，尾部较薄，极端损失概率较小。日Sharpe比率0.093，在风险调整后表现中规中矩。":
    "Annualised return of roughly 28% with annualised volatility of only 16.95% — the lowest of the five strategies. Daily returns are close to normally distributed with thin tails, so the probability of extreme losses is low. A daily Sharpe ratio of 0.093 places its risk-adjusted performance in the middle of the pack.",

  "将组合集中在三只相关性较低且各自波动率较小的资产上，利用协方差矩阵的离对角线元素（即资产间低相关性或负相关性）实现波动率的进一步压缩。主要持仓集中在LMT（34.3%）、WMT（31.1%）和MSFT（22.6%）三只防御型或低波动个股，完全排除了高波动的CIEN和NVDA。其中，LMT 作为国防股，与科技板块（MSFT、AMZN）在宏观驱动因子上存在天然的低相关性，这正是其获得最高权重的核心原因。":
    "The portfolio concentrates in three assets that are both weakly correlated and individually low-volatility, exploiting the off-diagonal elements of the covariance matrix (low or negative cross-asset correlation) to compress volatility further. Holdings centre on LMT (34.3%), WMT (31.1%) and MSFT (22.6%) — all defensive or low-volatility names — while the high-volatility CIEN and NVDA are excluded entirely. LMT, as a defence stock, has naturally low correlation with the technology complex (MSFT, AMZN) in terms of macro drivers, which is precisely why it receives the largest weight.",

  "适合风险厌恶型投资者或临近退休的人群。该组合的核心优势是回撤可控，在市场剧烈波动时表现更稳健。不过需要注意，它放弃了高成长标的带来的上行空间，长期可能跑输市场。":
    "Suited to risk-averse investors or those approaching retirement. Its core strength is contained drawdown and steadier behaviour through turbulent markets. The trade-off is that it forgoes the upside offered by high-growth names and may underperform the market over the long run.",

  "年化收益高达155%，但代价是62.1%的年化波动率。日收益分布呈明显的右偏和厚尾特征（从直方图可见正向离群值延伸到+25%），与正态拟合偏离较大。日Sharpe 0.154，看似不错但暗藏风险。":
    "An annualised return as high as 155%, at the cost of 62.1% annualised volatility. Daily returns are markedly right-skewed and fat-tailed — the histogram shows positive outliers extending to +25% — and depart substantially from a normal fit. The daily Sharpe of 0.154 looks respectable but conceals real risk.",

  "100%集中在CIEN一只股票上。这不是“组合”，而是单一押注——在无约束条件下选择了历史回报最高的资产。":
    "One hundred per cent concentrated in a single stock, CIEN. This is not a “portfolio” but a single bet — an unconstrained optimiser simply selecting the asset with the highest historical return.",

  "这一策略在实际投资中几乎不可取。零分散化意味着单一公司的利空事件（财报不及预期、行业政策变动等）可能导致灾难性损失。155%的年化收益是历史回溯结果，不代表未来可持续。如果要参考这一结果，它更多说明CIEN在回测期间表现出色，可以作为增加CIEN配置的信号，但绝不应全仓持有。":
    "In practice this strategy is close to untenable. Zero diversification means a single adverse event at one company — an earnings miss, a shift in industry policy — could produce catastrophic losses. The 155% annualised return is a backward-looking backtest result and is not evidence of future sustainability. Read properly, the result says CIEN performed exceptionally over the sample period; it may justify increasing CIEN's allocation, but never holding it as the entire book.",

  "与最大收益组合完全相同——年化收益155%、波动率62.1%、Sharpe 0.154。这说明在这六只股票构成的可行集中，CIEN的风险调整后收益恰好也是最高的。":
    "Identical to the maximum-return portfolio — 155% annualised return, 62.1% volatility, Sharpe 0.154. Within the feasible set formed by these six stocks, CIEN happens to offer the highest risk-adjusted return as well.",

  "同样100% CIEN。理论上最大Sharpe组合应该比最大收益组合更均衡，但当某只资产的Sharpe比率远超其余资产时，优化结果就会退化为集中持仓。在更丰富的资产池（如包含 50+ 只股票或跨资产类别）中，两者通常会给出截然不同的解。当前的一致性更多反映了标的池过小且 CIEN 表现极端突出的特殊情况。":
    "Again 100% CIEN. In theory the maximum-Sharpe portfolio should be better balanced than the maximum-return portfolio, but when one asset's Sharpe ratio dominates the rest, the optimisation degenerates into a concentrated position. Across a richer asset pool — 50-plus stocks, or multiple asset classes — the two objectives would normally produce very different solutions. The agreement seen here mostly reflects the special case of a small universe in which CIEN is an extreme outlier.",

  "同最大收益组合的问题一样，缺乏分散化。实际应用中应当加入权重上限约束（例如单一资产不超过30-40%），才能让Sharpe优化发挥真正价值。这一结果更适合作为诊断信号——提示CIEN的历史风险回报比异常突出，值得深入研究其基本面是否支撑。":
    "It suffers the same lack of diversification as the maximum-return portfolio. In practical use, weight caps (for example, no more than 30–40% in any single asset) are needed before Sharpe optimisation delivers real value. The result is best read as a diagnostic signal: CIEN's historical risk-reward ratio is unusually strong, which warrants a closer look at whether fundamentals support it.",

  "年化收益38.9%，波动率19.6%，Sharpe 0.115。回报和风险都略高于最小方差组合。从直方图看，分布仍较接近正态，但右尾略厚于最小方差组合——这来自 CIEN（7.73%）和 NVDA（10.50%）的少量敞口，它们为组合贡献了少许正偏度和尾部收益。相比最小方差组合的 -1.65% 和 -2.38%，尾部风险略有增加，但换来了约 11 个百分点的额外年化收益，这一交换对大多数投资者来说是值得的。":
    "Annualised return of 38.9%, volatility of 19.6%, Sharpe of 0.115 — both return and risk sit slightly above the minimum-variance portfolio. The histogram remains close to normal, though the right tail is a little heavier, reflecting small allocations to CIEN (7.73%) and NVDA (10.50%) that contribute modest positive skew and tail gains. Tail risk rises somewhat relative to the minimum-variance portfolio's -1.65% and -2.38%, but buys roughly 11 percentage points of additional annualised return — a trade most investors would accept.",

  "六只股票全部入选，权重相对均衡：LMT 25.5%、WMT 23.8%、MSFT 19.1%、AMZN 13.4%、NVDA 10.5%、CIEN 7.7%。低波动资产获得更高权重，高波动的CIEN和NVDA被压低，使得每只资产对组合总风险的贡献大致相等。":
    "All six stocks are included with relatively balanced weights: LMT 25.5%, WMT 23.8%, MSFT 19.1%, AMZN 13.4%, NVDA 10.5%, CIEN 7.7%. Low-volatility assets receive larger weights while the high-volatility CIEN and NVDA are scaled down, so that each asset contributes roughly equally to total portfolio risk.",

  "全面分散化降低了单一资产的冲击，同时通过纳入CIEN和NVDA保留了一定的上行弹性。适合追求长期稳健增长、不希望在个别资产上下过大赌注的投资者。再平衡频率（月度或季度）对该策略的表现影响较大，实施时需注意。":
    "Broad diversification dampens the impact of any single asset while retaining some upside through the CIEN and NVDA allocations. It suits investors seeking steady long-term growth who prefer not to place outsized bets on individual names. Rebalancing frequency — monthly versus quarterly — materially affects performance and warrants attention in implementation.",

  "年化收益125%，波动率40.4%，日Sharpe 0.190——五种策略中风险调整后表现最优。但分布的尾部比风险平价组合更厚，极端波动事件的概率更高。":
    "Annualised return of 125%, volatility of 40.4% and a daily Sharpe of 0.190 — the best risk-adjusted performance of the five strategies. The distribution's tails are heavier than the risk-parity portfolio's, however, implying a higher probability of extreme moves.",

  "1）组合实际上使用了约 1.17 倍隐含杠杆（总多头 / 净暴露）":
    "1) The portfolio effectively runs about 1.17× implied leverage (gross long / net exposure)",
  "2）做空头寸需要保证金（Reg T 下通常为做空市值的 50% 初始保证金 + 25% 维持保证金）":
    "2) Short positions require margin (under Reg T, typically 50% initial and 25% maintenance margin on the short market value)",
  "3）卖空成本（Borrow Cost）： AMZN 和 MSFT 作为大盘股通常属于「一般抵押品（General Collateral）」，借券成本较低（年化 0.25-0.50%），但在市场压力期可能大幅上升":
    "3) Borrow cost: as large-cap names, AMZN and MSFT normally trade as General Collateral, so borrow fees are low (roughly 0.25–0.50% annualised), though they can rise sharply in stressed markets",

  "Sharpe最高意味着单位风险的回报最好，但这一策略对普通投资者来说实施难度很大。做空需要保证金账户、承担无限下行风险和借券成本。超过100%的总多头暴露意味着使用了杠杆。此外，Black-Litterman的结果高度依赖输入的主观观点参数——观点稍有偏差，配置可能剧变。适合有量化交易经验、能承受高波动且能管理杠杆头寸的专业投资者。":
    "The highest Sharpe means the best return per unit of risk, but this strategy is difficult for a retail investor to implement. Shorting requires a margin account and brings unlimited downside plus borrow costs, and gross long exposure above 100% means leverage is in use. Black-Litterman output is also highly sensitive to the subjective view parameters supplied — small changes in views can shift allocations dramatically. It suits professional investors with quantitative trading experience who can tolerate high volatility and manage levered positions.",

  // ── task1：多因子模型 ────────────────────────────────────────────
  "通过对高科技行业（HiTec）和医疗保健行业（Hlth）的收益率进行建模，探究资产收益的驱动来源。":
    "Models the returns of the technology (HiTec) and healthcare (Hlth) industry portfolios to identify the drivers of asset returns.",
  "研究从单一市场因子扩展至五因子模型，分析了包含动量、规模、价值、盈利能力及投资风格对行业收益的解释力。":
    "The study extends from a single market factor to a five-factor model, assessing how momentum, size, value, profitability and investment style explain industry returns.",

  "高科技行业收益分布呈现出更为宽阔的离散程度，这深刻反映了该行业建立在研发高度不确定性及白热化竞争基础上的内生属性，而医疗保健行业相对收敛的分布特征则体现了其受刚性需求驱动的防御性特质。":
    "The technology sector's return distribution is markedly more dispersed, reflecting an industry built on highly uncertain R&D outcomes and intense competition. Healthcare's tighter distribution reflects its defensive character, underpinned by inelastic demand.",
  "从估值模型来看，由于高科技企业的未来现金流具有显著的不确定性且面临较高的折现率，市场在持续重估其技术突破或商业化成功概率的过程中，必然引发更为剧烈的日内价格震荡与频繁的价值重定价。":
    "From a valuation standpoint, technology companies' future cash flows are highly uncertain and discounted at higher rates. As the market continually re-assesses the probability of technical breakthroughs or successful commercialisation, sharper intraday swings and more frequent repricing follow naturally.",
  "在偏度特征与风险属性方面，高科技行业表现出显著的正偏态与右侧肥尾效应，意味着其风险敞口主要由上行潜力构成，投资者倾向于通过容忍高水平的波动率来博取潜在的爆发式回报；与之形成鲜明对比的是，医疗保健行业虽在常态下表现稳健，但其对负面冲击具有极高的敏感性，这预示着该板块的核心威胁并非源于日常的市场波动，而是由突发性利空因素所引发的断裂式价值减损风险。":
    "On skewness and risk profile, technology exhibits pronounced positive skew and a fat right tail: its risk exposure is dominated by upside potential, and investors accept high volatility in pursuit of explosive returns. Healthcare, by contrast, behaves steadily under normal conditions but is acutely sensitive to negative shocks — its principal threat is not day-to-day volatility but abrupt, discontinuous value destruction triggered by adverse events.",

  "在超额收益维度下，尽管截距项（Alpha）录得0.022，但由于其p值显著高于0.05的统计阈值，导致该结果在95%的置信水平下未能通过显著性检验，这表明高科技组合在剔除市场风险补偿后，并未产生统计学意义上的超额回报。":
    "On excess returns, the intercept (alpha) is 0.022, but its p-value sits well above the 0.05 threshold, so it fails the significance test at the 95% confidence level. Once compensation for market risk is stripped out, the technology portfolio generates no statistically meaningful excess return.",
  "针对风险敏感度的分析显示，市场因子系数（Beta）高达1.309且具备极强的统计显著性，这一数值明确了高科技组合作为高贝塔资产的属性，即其波动幅度显著高于整体市场水平，表现出强烈的进攻性与风险溢价敏感特征。":
    "On risk sensitivity, the market beta of 1.309 is highly statistically significant, confirming the technology portfolio as a high-beta asset whose swings substantially exceed the broad market — an aggressive profile with high sensitivity to the risk premium.",
  "模型呈现出接近90%的拟合优度，有力地证明了市场系统性因素对该组合收益变动的极高解释力，意味着高科技行业的价值波动主要受宏观经济环境及系统性事件驱动，而非受限于行业内部的特异性因素。":
    "The model achieves close to 90% goodness of fit, strong evidence that systematic market factors explain the great majority of this portfolio's return variation. Value fluctuations in technology are driven primarily by the macro environment and systematic events rather than by industry-specific idiosyncrasies.",

  "在超额收益衡量维度下，医疗保健组合的截距项（Alpha）录得0.0251，但由于其p值高达0.654，在统计学意义上并不显著，这表明该组合在经过风险调整后并未展现出超越市场基准的获利能力，其表现与整体市场回报基本持平。":
    "On excess returns, the healthcare portfolio's intercept (alpha) is 0.0251, but with a p-value of 0.654 it is statistically insignificant. On a risk-adjusted basis the portfolio shows no ability to beat the market benchmark; its performance is essentially in line with overall market returns.",
  "针对风险敏感度的分析显示，市场因子系数（Beta）为0.577且具备极强的统计显著性，这一远低于1的数值明确揭示了医疗保健组合作为典型防御性资产的属性，即其价格波动幅度显著低于整体市场水平，表现出较强的抗周期特征。":
    "On risk sensitivity, the market beta of 0.577 is highly significant. A value well below 1 identifies the healthcare portfolio as a classic defensive asset, with price swings materially smaller than the market's and pronounced counter-cyclical characteristics.",
  "从模型拟合优度来看，约38%的R平方值反映出市场系统性因子对该组合收益变动的解释力相对有限，这意味着医疗保健行业的价值波动并非主要受宏观市场趋势驱动，而是更多地取决于行业内部的特异性风险及个股基本面因素。":
    "An R-squared of roughly 38% indicates that systematic market factors explain relatively little of this portfolio's return variation. Healthcare's value fluctuations are driven less by macro market trends than by industry-specific risks and company-level fundamentals.",

  "首先，在系统性风险敞口维度下，高科技组合凭借显著大于1.0的贝塔（Beta）系数表现出强烈的顺周期特性，即在放大市场涨跌幅度的同时，虽能在上行周期博取远超基准的收益，却也必然在市场回调中承受较之平均水平更为深度的价值减损；与之形成鲜明对比的是，医疗保健组合对市场变动的敏感度较低，在宏观环境动荡期间展现出显著的防御属性，为投资组合提供了关键的风险对冲与价值缓冲职能。":
    "First, on systematic risk exposure: with a beta well above 1.0, the technology portfolio is strongly pro-cyclical. It amplifies market moves in both directions — capturing returns far above the benchmark in upswings, but necessarily suffering deeper value erosion than average in drawdowns. The healthcare portfolio, by contrast, is far less sensitive to market moves and turns notably defensive during macro turbulence, providing valuable hedging and a cushion for the wider portfolio.",
  "其次，从模型拟合优度及收益归因的角度审视，高科技组合约90%的收益波动可由市场因子解释，表明其定价逻辑高度受制于系统性风险，行业内部的特异性“噪音”对其影响微乎其微；而医疗保健组合仅有约38%的波动源于市场因素，其收益变动的主导权主要掌握在政策演变、临床试验结果等非市场因子的特异性风险手中，体现了该行业极强的内生波动特征与独立行情潜力。":
    "Second, from the perspective of fit and return attribution: about 90% of the technology portfolio's return variation is explained by the market factor, so its pricing is dominated by systematic risk and industry-specific “noise” barely registers. Only about 38% of healthcare's variation comes from market factors; the rest is governed by idiosyncratic, non-market risks such as policy shifts and clinical trial outcomes — evidence of strong endogenous volatility and the potential to trade independently of the broad market.",

  "从模型的整体解释效力来看，该三因子回归模型的R方（R-squared）与调整后R方分别高达94.8%与94.7%，这种极高的拟合优度不仅证明了模型能够解释该投资组合绝大部分的超额收益波动，更反映出引入规模因子（SMB）与价值因子（HML）对于完善模型规格、捕捉资产定价特征具有显著的统计学意义与稳健性。":
    "On overall explanatory power, the three-factor regression delivers an R-squared of 94.8% and an adjusted R-squared of 94.7%. Fit this high shows the model captures the great majority of the portfolio's excess-return variation, and confirms that adding the size (SMB) and value (HML) factors improves model specification with statistically significant and robust gains in describing asset pricing.",
  "在超额收益的归因分析中，截距项（Alpha）的p值为0.237，在95%的置信水平下未能通过显著性检验，这一统计结果明确揭示了该高科技组合在剔除市场、规模及价值因子的系统性风险暴露后，并未产生显著的异常超额收益，其业绩表现完全可以由上述三个风险维度的溢价进行合理解释。":
    "In the attribution of excess returns, the intercept (alpha) carries a p-value of 0.237 and fails the significance test at the 95% level. Once exposure to the market, size and value factors is accounted for, the technology portfolio generates no significant abnormal return; its performance is fully explained by the premia on those three risk dimensions.",
  "针对风险因子的敏感度分析显示，该组合的市场因子系数（Beta）为1.192且具备极强的统计显著性，这意味着该组合的波动性较整体市场高出约19%，充分体现了高科技资产典型的高贝塔特征；同时，规模因子（SMB）系数显著为负，揭示了该组合存在明显的大盘股偏好（Large-Cap bias），尽管其影响程度相对其他因子而言处于次要地位。":
    "On factor sensitivities, the market beta of 1.192 is highly significant, implying volatility roughly 19% above the broad market and confirming the high-beta profile typical of technology assets. The size (SMB) coefficient is significantly negative, revealing a clear large-cap bias, though its influence is secondary to the other factors.",
  "价值因子（HML）呈现出极强的负相关性且统计显著性极高，这一特征深刻地勾勒出该组合作为成长型产业（Growth industry）的核心本质，即其市场估值逻辑高度锚定于未来的增长潜力而非当前的账面价值，从而在因子暴露上表现出对价值因子的深度负向偏离，这与科技行业依赖研发投入与未来现金流折现的金融直觉高度契合。":
    "The value factor (HML) loads strongly negative with very high significance, capturing the portfolio's essential character as a growth industry: its valuation is anchored to future growth potential rather than current book value, producing a deeply negative tilt away from value. This aligns closely with the financial intuition that technology depends on R&D investment and the discounting of future cash flows.",

  "三因子模型对医疗保健组合超额收益波动的解释程度仅为40.8%，这一相对较低的拟合优度深刻揭示了该行业受行业特有风险（Idiosyncratic risks）驱动的显著特征，表明仅凭市场、规模及价值三个系统性因子尚不足以全面捕捉该领域的风险全貌；同时，调整后R方与R方的数值高度趋同，进一步验证了模型在统计层面的稳健性，有效排除了过拟合的潜在干扰。":
    "The three-factor model explains only 40.8% of the healthcare portfolio's excess-return variation. This relatively low fit underscores how far the sector is driven by idiosyncratic risk, and shows that the market, size and value factors alone cannot capture its full risk picture. The close agreement between adjusted and unadjusted R-squared further supports the model's statistical robustness and rules out overfitting.",
  "在超额收益的归因分析中，截距项（Intercept）的p值显示其在统计学上与零无异，这意味着在充分考虑所承担的系统性风险暴露后，该组合并未展现出显著优于基准的超额回报能力。":
    "In the attribution of excess returns, the intercept's p-value shows it is statistically indistinguishable from zero: after fully accounting for the systematic risk taken on, the portfolio demonstrates no meaningful ability to outperform the benchmark.",
  "在市场风险敏感度方面，该组合的贝塔系数（Beta）定格于0.61，显著低于市场平均水平，有力地证实了医疗保健行业作为典型防御性板块（Defensive industry）的金融属性，其波动程度远低于大盘整体表现。":
    "On market risk sensitivity, the portfolio's beta settles at 0.61, well below the market average — firm confirmation of healthcare's standing as a classic defensive sector, with volatility far below that of the broad index.",
  "针对规模与价值因子的实证分析显示，尽管规模因子系数呈现正值，但其0.075的p值仅在90%的置信水平下具有统计意义，暗示该组合虽有向小盘股倾斜的微弱趋势，但证据链尚不充分；相比之下，价值因子系数表现出显著的正向相关性，精准地刻画了医疗保健行业作为价值导向型产业的核心特征，即依托于稳健的现金流与雄厚的有形资产，该行业表现出与成熟价值股高度契合的投资逻辑，而非盲目追求投机性增长。":
    "On the size and value factors, the size coefficient is positive but its p-value of 0.075 is significant only at the 90% level, hinting at a weak small-cap tilt on insufficient evidence. The value coefficient, by contrast, is significantly positive, precisely capturing healthcare's character as a value-oriented industry: supported by stable cash flows and substantial tangible assets, it follows an investment logic closely aligned with mature value stocks rather than speculative growth.",

  "通过引入动量因子（Momentum Factor），该四因子模型对高科技组合超额收益波动的解释程度（拟合优度）显著提升至95.0%，相较于传统三因子模型表现出更优的统计拟合特征；同时，截距项在90%的置信水平下未能通过显著性检验，这一结果明确揭示了在充分对冲市场、规模、价值及动量风险后，该组合的业绩表现已得到完全解释，并未产生统计学意义上的异常超额收益（Alpha）。":
    "Adding the momentum factor lifts the four-factor model's explanatory power for the technology portfolio to 95.0%, a better statistical fit than the traditional three-factor specification. The intercept fails the significance test even at the 90% level, showing that once market, size, value and momentum risks are hedged out, the portfolio's performance is fully explained and produces no statistically meaningful alpha.",
  "在系统性风险敏感度方面，该组合的市场贝塔系数（Beta）显著大于1（约为1.19），这意味着其波动性较整体市场高出约19%，充分体现了高科技资产典型的高贝塔、高波动风险特征；而在规模因子（SMB）维度上，虽然回归系数为负，但在统计上并不显著，表明在纳入动量效应的考量后，该投资组合在市值维度上实质上呈现出规模中性的分布态势。":
    "On systematic risk sensitivity, the market beta is significantly above 1 at roughly 1.19, implying volatility about 19% higher than the market and confirming the high-beta, high-volatility profile typical of technology assets. The size (SMB) coefficient is negative but statistically insignificant, indicating that once momentum is accounted for the portfolio is essentially size-neutral.",
  "针对价值与动量因子的实证分析进一步刻画了该组合的行业画像：价值因子（HML）呈现出极强的负相关性且统计显著性极高，有力地印证了高科技板块作为典型成长型产业的核心本质，即其市场估值高度依赖于未来的增长潜能而非当前的账面价值；与此同时，动量因子表现出显著的正向暴露，揭示了该组合具备鲜明的趋势跟踪属性，深刻反映了高科技资产在市场运行中往往表现出“强者恒强”的收益持续性特征。":
    "The value and momentum results sharpen the sector portrait. HML loads strongly negative with very high significance, confirming technology's essential nature as a growth industry whose valuation depends on future potential rather than current book value. Momentum shows significant positive exposure, revealing a distinct trend-following character and reflecting the “winners keep winning” persistence often observed in technology assets.",

  "引入动量因子（MOM）后，该模型的拟合优度由三因子框架下的40.1%显著提升至48.8%，这表明动量因子能够额外捕捉约9%的收益波动，从而大幅增强了模型对医疗保健组合收益来源的刻画能力，使其对超额收益的解释力接近50%的水平。":
    "Adding the momentum factor (MOM) lifts goodness of fit from 40.1% under the three-factor framework to 48.8%. Momentum captures roughly 9% of additional return variation, substantially improving the model's description of where healthcare returns come from and bringing explanatory power close to 50%.",
  "在超额收益归因与系统性风险维度下，截距项的统计不显著性预示着该组合在剔除已知风险溢价后并未产生异常超额收益（Alpha）；而其0.6125的贝塔系数则明确界定了该行业低波动、高防御的金融属性，意味着该组合仅捕获了约61%的市场波动，使其在市场剧烈震荡期间能够发挥显著的避险稳定器作用。":
    "On attribution and systematic risk, the statistically insignificant intercept indicates no abnormal excess return once known risk premia are removed. A beta of 0.6125 defines the sector's low-volatility, highly defensive profile: the portfolio captures only about 61% of market movement, allowing it to act as a meaningful stabiliser through periods of severe turbulence.",
  "针对规模因子（SMB）与价值因子（HML）的回归分析显示，两者的p值均处于较高水平，意味着在控制动量效应的前提下，该组合在市值维度与估值维度上均呈现出统计学意义上的中性特征，并未表现出明显的大盘/小盘或价值/成长偏向。":
    "Both the size (SMB) and value (HML) coefficients carry high p-values, meaning that once momentum is controlled for the portfolio is statistically neutral on both market capitalisation and valuation, with no pronounced large/small or value/growth tilt.",
  "动量因子呈现出显著的负向暴露，这一特征深刻揭示了医疗保健行业与市场主流趋势之间的逆向关联，即当市场前期领涨品种（Past winners）出现回调或崩盘时，投资者往往会出于避险需求向防御性板块进行仓位轮动，这种独特的反向动量效应进一步夯实了医疗保健行业作为避险资产的结构性地位。":
    "Momentum shows significant negative exposure, revealing an inverse relationship between healthcare and the market's prevailing trend: when past winners correct or break down, investors rotate into defensive sectors in search of safety. This distinctive reverse-momentum effect reinforces healthcare's structural role as a defensive asset.",

  "五因子回归模型的R方与调整后R方分别高达0.949与0.948，这种极高的拟合优度不仅证明了模型能够解释该投资组合约94.8%的超额收益波动，更反映出该模型在捕捉高科技板块底层风险驱动因素方面具有极高的精确度，仅留有约5%的成分属于不可解释的特异性噪声。此外，截距项在95%的置信水平下未能通过显著性检验，这一统计结果明确揭示了该组合在剔除五类系统性风险溢价后，并未产生显著的异常超额收益（Alpha），其业绩表现完全符合其所承担的风险暴露所应获得的相应补偿。":
    "The five-factor regression yields an R-squared of 0.949 and adjusted R-squared of 0.948. Fit this high shows the model explains roughly 94.8% of the portfolio's excess-return variation and captures the underlying risk drivers of the technology sector with considerable precision, leaving only about 5% as unexplained idiosyncratic noise. The intercept again fails the significance test at the 95% level: after removing all five systematic risk premia the portfolio produces no significant alpha, and its performance matches exactly the compensation due for the risk exposures taken.",
  "在核心风险因子的敏感度分析方面，该组合的市场因子贝塔系数（Beta）显著为正且具备极强的统计显著性，充分体现了高科技资产对市场整体波动的高度敏感性；同时，规模因子（SMB）的回归系数显著为负（-0.1114），揭示了该组合在市值维度上存在明显的大盘股偏好。更为显著的是，价值因子（HML）呈现出极强的负相关性（系数为-0.5625）且统计显著性极高，这一特征深刻地勾勒出该组合作为成长型产业（Growth orientation）的核心本质，即其成分股普遍具有较低的账面市值比（Book-to-Market ratio），其市场定价逻辑高度锚定于未来的扩张潜能。":
    "On the core factor sensitivities, the market beta is significantly positive with very strong statistical significance, confirming technology assets' high sensitivity to overall market movement. The size coefficient is significantly negative (-0.1114), revealing a clear large-cap bias. Most striking, the value factor loads strongly negative (-0.5625) with very high significance, capturing the portfolio's essential growth orientation: its constituents generally carry low book-to-market ratios and are priced against future expansion potential.",
  "针对五因子模型中新增的盈利因子（Profitability）与投资因子（Investment）的实证分析显示，两者的回归系数在统计学上均不显著（盈利因子p值为0.221），这意味着在2024年11月13日至2025年11月28日的特定样本区间内，高科技组合的收益表现并未受到企业盈利能力差异或资本开支强度差异的实质性驱动。综上所述，该组合的风险收益特征主要受市场贝塔、大盘属性以及深度的成长因子所定义，而盈利与投资维度的差异化特征在该阶段尚未对组合收益产生实质性的边际贡献。":
    "The profitability and investment factors newly introduced in the five-factor model are both statistically insignificant (the profitability p-value is 0.221). Over the sample window from 13 November 2024 to 28 November 2025, technology portfolio returns were not materially driven by differences in corporate profitability or capital-expenditure intensity. In sum, the portfolio's risk-return profile is defined chiefly by market beta, a large-cap tilt and a deep growth exposure, while the profitability and investment dimensions made no meaningful marginal contribution over this period.",

  "五因子模型的调整后R方定格于41.7%，意味着约四成以上的组合超额收益波动可由这五大系统性风险因子共同解释；而在收益归因层面，截距项的p值显著大于0.6，在统计学上与零无异，这明确揭示了在充分考虑风险暴露后，该组合并未产生显著的异常超额收益（Alpha），其业绩表现完全符合风险补偿逻辑。":
    "The five-factor model's adjusted R-squared settles at 41.7%, so somewhat over 40% of the portfolio's excess-return variation is jointly explained by the five systematic risk factors. On attribution, the intercept's p-value exceeds 0.6 and is statistically indistinguishable from zero: once risk exposures are accounted for, the portfolio generates no significant alpha and its performance is fully consistent with risk compensation.",
  "在系统性风险敏感度方面，该组合的市场贝塔系数（Beta）为0.5697且具备极强的统计显著性，这一低贝塔特征有力地证实了医疗保健行业作为典型防御性板块的金融属性，深刻反映了医疗服务需求在宏观经济波动中表现出的高度缺乏弹性。与此同时，规模因子（SMB）的p值为0.168，未能通过显著性检验，表明该组合在市值分布上呈现出明显的规模中性特征，并未表现出对大盘或小盘股的显著偏好。":
    "On systematic risk sensitivity, the market beta of 0.5697 is highly significant. This low-beta profile confirms healthcare's standing as a classic defensive sector and reflects how inelastic demand for medical services remains through macroeconomic cycles. The size factor's p-value of 0.168 fails the significance test, indicating a size-neutral portfolio with no pronounced preference for large or small caps.",
  "针对风格因子的实证分析进一步勾勒出该组合复杂的产业画像：价值因子系数（0.2313）在95%置信水平下显著，体现了组合向具有稳健现金流特征的价值型股票倾斜的投资取向。在盈利维度上，-0.1920的系数在90%置信水平下显著，这种向“弱盈利”特征的倾斜揭示了组合中生物技术类企业的存在，此类公司往往因高昂的研发开支导致即期利润承压，其核心估值逻辑在于未来的技术突破而非当前盈利。此外，投资因子系数（0.2352）显著为正，揭示了该组合具备保守的投资风格，即成分股倾向于通过分红与回购回报股东，而非进行激进的资产扩张或大规模资本开支，充分展现了成熟医疗企业稳健经营的财务特征。":
    "The style factors round out a more complex sector portrait. The value coefficient of 0.2313 is significant at the 95% level, reflecting a tilt toward value stocks with stable cash flows. On profitability, a coefficient of -0.1920 is significant at the 90% level; this tilt toward “weak profitability” points to the presence of biotechnology names, whose current earnings are suppressed by heavy R&D spending and whose valuations rest on future breakthroughs rather than present profits. The investment coefficient of 0.2352 is significantly positive, indicating a conservative investment style: constituents tend to return capital through dividends and buybacks rather than pursue aggressive asset expansion or large capital outlays — the financial signature of mature healthcare businesses.",

  "实证结果显示，多因子模型对两大行业的解释力度呈现出截然不同的量化特征。高科技投资组合在各模型下的拟合优度均稳定在95%左右的极高水平，这表明该行业的收益波动几乎完全由系统性风险因子（如市场波动、规模偏好及成长属性）所驱动，其定价逻辑高度透明且符合资产定价理论。相比之下，医疗保健组合的拟合优度仅处于40%至49%之间，这意味着该行业约五成以上的收益波动无法被通用的系统性因子所捕捉，其股价表现更多地受制于临床试验进展、监管政策变动及专利到期等行业特有的异质性风险。":
    "The empirical results show sharply different explanatory power across the two sectors. The technology portfolio's goodness of fit holds steady near 95% under every specification, indicating that its return variation is driven almost entirely by systematic risk factors — market movement, size preference and growth orientation — with pricing that is transparent and consistent with asset-pricing theory. The healthcare portfolio's fit ranges only from 40% to 49%, meaning more than half of its return variation escapes standard systematic factors and is instead governed by sector-specific idiosyncratic risks such as clinical trial progress, regulatory change and patent expiry.",
  "在高科技组合的分析中，从三因子模型（$R^2=94.8%$）演进至引入动量因子的四因子模型（$R^2=95.0%$），拟合优度的提升仅为0.2个百分点。而在五因子模型框架下，虽然引入了盈利与投资因子，但由于这两个因子的系数在统计学上均不显著，且模型解释力并未出现实质性跃升，这充分证明了对于高科技行业而言，传统的三因子框架（尤其是市场因子与价值因子的组合）已具备极强的解释效力。在此背景下，额外引入的动量、盈利及投资因子在很大程度上表现为“冗余因子”，未能提供显著的额外信息增量。":
    "For the technology portfolio, moving from the three-factor model ($R^2=94.8%$) to a four-factor model with momentum ($R^2=95.0%$) improves fit by only 0.2 percentage points. Under the five-factor framework, the added profitability and investment coefficients are both statistically insignificant and explanatory power does not jump materially. This demonstrates that for technology the traditional three-factor framework — particularly the market and value factors together — already carries very strong explanatory power, and that the additional momentum, profitability and investment factors are largely redundant, contributing no significant incremental information.",
  "与高科技行业不同，因子的增加对医疗保健组合表现出了显著的解释力增强效应，尤其是动量因子（MOM）的引入。当模型由三因子升级为包含动量项的四因子模型时，解释力度大幅提升了约8个百分点，且动量因子呈现出显著的负向暴露。这一统计特征有力地证明了动量因子并非冗余，而是精准捕捉到了医疗保健行业作为避险板块，在市场风格切换与资金轮动中的独特行为模式。然而，在切换至不含动量项的五因子模型时，尽管引入了盈利与投资维度，其解释力（41.7%）虽略高于三因子模型，但远逊于四因子模型，这说明对于医疗保健行业，动量效应的解释权重显著优于企业财务质量因子。":
    "Unlike technology, healthcare shows a marked gain in explanatory power as factors are added — above all from momentum. Upgrading from three factors to a four-factor model with momentum raises explanatory power by roughly 8 percentage points, with momentum loading significantly negative. This confirms that momentum is not redundant here but precisely captures healthcare's distinctive behaviour as a defensive sector during style rotations and shifts in capital flows. Switching to the five-factor model, which omits momentum, produces explanatory power of 41.7% — marginally above the three-factor model but far below the four-factor version. For healthcare, the momentum effect carries considerably more explanatory weight than the corporate financial-quality factors.",

  // ── task2：波动率分析 ────────────────────────────────────────────
  "通过对比收盘价对收盘价 (Close-to-Close) 波动率和帕金森 (Parkinson) 波动率，分析了股票APLD和PSLV的风险特征。":
    "Compares close-to-close and Parkinson volatility estimators to characterise the risk profiles of APLD and PSLV.",
  "首先，Parkinson 波动率分析显示，APLD 的日内波动均值高达 0.9067，折合年化日内波动率约为 91%，且其均值与中位数的高度一致性（分别为 0.906 与 0.908）明确表明，这种剧烈的价格震荡并非由个别极端离群值驱动，而是该标的在观测周期内所表现出的常态化内生特征。":
    "The Parkinson estimator puts APLD's mean intraday volatility at 0.9067, equivalent to roughly 91% annualised. The close agreement between mean and median (0.906 versus 0.908) shows these violent swings are not driven by isolated outliers but represent the security's normal, endogenous behaviour over the observation window.",
  "其次，通过对比可以发现，收盘价波动率在各项指标上均显著高于 Parkinson 波动率，其年化波动率均值达到 119%，这种显著的溢价揭示了 APLD 存在剧烈的隔夜价格跳空现象，暗示市场重大消息或财报发布等关键定价因素往往发生在非交易时段，使得开盘价较前一交易日收盘价产生大幅偏离，从而构成了整体波动的主要来源。":
    "Close-to-close volatility exceeds the Parkinson measure on every metric, averaging 119% annualised. This premium points to severe overnight gapping in APLD: major news and earnings releases tend to land outside trading hours, so the open diverges sharply from the prior close, and these gaps form the principal source of total volatility.",
  "首先，就日内波动风险而言，基于 Parkinson 波动率的分析显示 PSLV 表现出较强的稳健性，其 18.55% 的波动率均值与较低的日内振幅反映出市场在交易时段内的价格发现过程相对高效且平稳。由于其中位数（0.1602）持续低于均值，且最大日内波动被严格限制在 35% 以内，该资产在多数交易日呈现出低波动的常态，对于寻求价值存储而非投机套利的长期投资者而言，具备较高的配置稳定性。":
    "On intraday risk, the Parkinson estimator shows PSLV to be notably robust: a mean volatility of 18.55% and a narrow intraday range indicate that price discovery during trading hours is relatively efficient and orderly. With the median (0.1602) consistently below the mean and maximum intraday moves capped within 35%, the asset behaves as a low-volatility holding on most days — offering considerable allocation stability to long-term investors seeking a store of value rather than speculative gains.",
  "其次，在收盘价波动率（Close-to-Close Volatility）维度下，该信托则展现出中等偏高的风险属性，年化波动率均值提升至 31.03%。数据显著揭示了潜在的尾部风险，其 95 分位数高达 61.52%，暗示在极端宏观环境或流动性紧缩下，价格可能出现剧烈震荡。值得注意的是，波动率曲线在 2025 年大部分时间维持在 0.2 至 0.3 的低位区间，但在 11 月呈现出明显的“阶梯式”突破（Step-Up Pattern），标志着市场进入了持续的高波动体制。":
    "On a close-to-close basis the trust looks moderately risky, with mean annualised volatility rising to 31.03%. The data reveal meaningful tail risk: the 95th percentile reaches 61.52%, implying the potential for violent moves under extreme macro conditions or a liquidity squeeze. Notably, the volatility curve held in a low 0.2–0.3 band for most of 2025 before breaking out in a clear step-up pattern in November, marking a transition into a sustained high-volatility regime.",
  "最后，通过对比两类指标可以发现，收盘价波动率显著高于 Parkinson 波动率，投资者承担的隔夜风险约为日内风险的 1.5 倍。这种显著的溢价主要源于白银作为全球化交易商品的定价特性：由于白银的核心价格发现过程在伦敦及亚洲市场持续进行，当美国市场处于休市阶段时，全球价格的变动会导致美股开盘时产生巨大的价格跳空。Parkinson 波动率因其仅捕捉日内高低价差的局限性，未能反映此类跨时区定价缺口，而收盘价波动率则精准捕捉到了这种由全球市场联动引发的隔夜风险溢价。":
    "Comparing the two estimators, close-to-close volatility runs well above the Parkinson measure: investors bear roughly 1.5 times as much overnight risk as intraday risk. The premium stems from silver's nature as a globally traded commodity. Core price discovery continues in London and Asian markets, so while US trading is closed, global price moves produce large gaps at the US open. The Parkinson estimator, which captures only the intraday high-low range, cannot reflect these cross-timezone pricing gaps, whereas the close-to-close measure captures the overnight risk premium created by global market linkages precisely.",
  "在波动特征方面，APLD 表现出极强的投机属性，其年化波动率频繁超过 100%，属于典型的高风险、高收益资产；相比之下，PSLV 的价格走势则稳健得多，波动始终维持在相对较低且可控的水平。":
    "On volatility characteristics, APLD is strongly speculative, with annualised volatility frequently above 100% — a textbook high-risk, high-return asset. PSLV trades far more steadily, with volatility consistently held at a relatively low and manageable level.",
  "在定价机制与日内表现上，APLD 的日内波动与跨日波动高度接近，说明其价格震荡主要发生在交易时段内，且存在大量随机性的噪音，导致日内的剧烈波动并不一定能转化为明确的收盘趋势。与之相反，PSLV 的收盘价波动显著高于日内波动，这表明其价格发现过程主要发生在非交易时段，这种“隔夜跳空”现象反映了全球市场对白银定价的持续影响。":
    "On pricing mechanics and intraday behaviour, APLD's intraday and close-to-close volatilities are close together, indicating that its price action occurs largely within trading hours amid substantial random noise — so violent intraday swings do not necessarily resolve into a clear closing trend. PSLV shows the opposite pattern: close-to-close volatility well above intraday volatility, indicating that price discovery happens mainly outside trading hours. This overnight gapping reflects the continuous influence of global markets on silver pricing.",
  "在资产配置中，APLD 虽然具备获取超额收益的潜力，但因其极高的不确定性，必须严格限制其在组合中的权重，以防范单一资产对整体账户的冲击。PSLV 则主要发挥宏观对冲作用，但近期观察到其波动率有上升趋势，预示着市场环境正在发生变化，投资者需警惕全球宏观风险对其估值产生的动态影响。":
    "For allocation purposes, APLD offers genuine potential for excess return, but its extreme uncertainty demands a strict weight cap to prevent a single asset from destabilising the whole account. PSLV functions primarily as a macro hedge, though its volatility has recently trended higher — a sign the market environment is shifting, and a reason to watch how global macro risk feeds dynamically into its valuation.",
  "在风险管理方面，针对 APLD 的操作，由于其日内震荡极不规律，投资者不应仅依赖传统的止损位，而应通过动态调整持仓规模来应对其不确定性。对于 PSLV 而言，主要的风险点在于开盘时的价格偏离，因此建议适当放宽止损区间或控制头寸，以避免因隔夜市场波动导致的执行滑点。":
    "On risk management, APLD's intraday swings are too irregular to rely on conventional stop levels alone; position size should instead be adjusted dynamically to absorb the uncertainty. For PSLV the main risk is price dislocation at the open, so widening stop bands or trimming position size helps avoid execution slippage caused by overnight moves.",

  // ── task3：GARCH 模型对比 ────────────────────────────────────────
  "用GARCH(1,1) 和 GJR-GARCH(1,1) 模型分别对纳斯达克 (NDX) 和道琼斯 (DJI) 指数的风险特征进行抓取和比较，并且通过自相关函数检验标准化残差。":
    "Uses GARCH(1,1) and GJR-GARCH(1,1) models to capture and compare the risk characteristics of the Nasdaq (NDX) and Dow Jones (DJI) indices, testing standardised residuals via the autocorrelation function.",
  "在风险敏感度维度下，NDX展现出高达0.216的杠杆效应参数（gamma），这一数值显著高于道琼斯工业平均指数（DJI），揭示了以科技股为主的纳斯达克市场对负面冲击具备极高的敏感性，即利空消息往往会比同等程度的利好消息引发更为剧烈的估值重塑与市场恐慌。":
    "On risk sensitivity, NDX shows a leverage parameter (gamma) of 0.216, well above the Dow Jones Industrial Average. The technology-dominated Nasdaq is highly sensitive to negative shocks: bad news typically triggers far sharper repricing and panic than good news of comparable magnitude.",
  "针对模型稳健性的分析显示，传统的对称GARCH(1,1)模型因未能区分冲击的性质，将波动率持续性高估至0.9295，暗示冲击的影响近乎永久化，这反映了标准模型在处理NDX数据时存在明显的设定偏误；而GJR-GARCH模型通过引入非对称项，将持续性指标修正至0.8415，从而精准地剥离了冲击强度与持续时间之间的混淆关系。":
    "On model robustness, the symmetric GARCH(1,1) specification cannot distinguish the sign of a shock and therefore overstates volatility persistence at 0.9295, implying shocks are almost permanent — clear evidence of specification bias when applied to NDX. Introducing an asymmetry term, GJR-GARCH corrects persistence to 0.8415, cleanly separating shock magnitude from shock duration.",
  "实证结果表明，尽管NDX在遭遇负面冲击时表现出极强的爆发性，但其整体波动过程实际上比对称模型所暗示的更具均值回归属性与稳定性。":
    "The evidence indicates that although NDX reacts explosively to negative shocks, its overall volatility process is in fact more mean-reverting and stable than the symmetric model suggests.",
  "在风险溢价与非对称响应维度下，GJR-GARCH(1,1)模型识别出高达0.1925且具备统计显著性的杠杆效应参数（gamma），这一结果明确揭示了DJI在样本期间（2024年11月至2025年11月）负向收益率对未来条件方差的冲击强度远超同等幅度的正向收益率，反映了机构投资者在市场下行周期中因财务杠杆压力及风险厌恶情绪升温而引发的波动率非对称放大效应。":
    "On risk premia and asymmetric response, GJR-GARCH(1,1) identifies a statistically significant leverage parameter (gamma) of 0.1925. Over the sample period from November 2024 to November 2025, negative returns hit DJI's future conditional variance far harder than positive returns of the same size — the asymmetric amplification of volatility that arises as institutional investors face financial leverage pressure and rising risk aversion during market declines.",
  "从波动率动力学特征观察，GJR-GARCH模型所测算出的持续性指标仅为0.86，显著低于标准GARCH模型所估算的0.93，这种持续性数值的修正不仅有力地证明了DJI的波动过程具有更强的均值回归属性，更表明通过有效剥离杠杆效应的干扰，模型能够更精准地识别出外部冲击对市场影响的真实存续周期。":
    "On volatility dynamics, GJR-GARCH estimates persistence at just 0.86 against the standard GARCH model's 0.93. This downward correction demonstrates that DJI's volatility process is more strongly mean-reverting, and shows that stripping out the confounding leverage effect lets the model identify the true duration of a shock's market impact far more accurately.",
  "相较于传统对称模型可能存在的风险高估偏误，GJR-GARCH框架通过对随机过程内生非对称性的精确刻画，成功避免了将短期负向冲击误认为长期趋势的统计陷阱。":
    "Where a conventional symmetric model risks overstating risk, the GJR-GARCH framework models the endogenous asymmetry of the process precisely, avoiding the statistical trap of mistaking a short-lived negative shock for a long-term trend.",
  "在波动率持续性维度下，实证结果显示DJI的持续性水平显著高于NDX，这一发现挑战了市场关于科技股指数具备更高风险惯性的传统认知，表明尽管NDX在短期内呈现出极高的波动频率，但其波动聚集效应的消散速度较快，而DJI的波动特征则表现出更强的“粘性”，即一旦工业板块陷入动荡状态，其高波动水平往往会比科技板块维持更长的时间周期。":
    "On persistence, DJI scores significantly higher than NDX. The finding challenges the conventional view that technology indices carry greater risk inertia: although NDX oscillates far more frequently in the short run, its volatility clustering dissipates faster, while DJI's volatility is stickier. Once the industrial complex enters a turbulent state, elevated volatility tends to persist longer than in technology.",
  "其次，针对杠杆效应参数（gamma）的对比研究表明，NDX的非对称响应系数明显高于DJI，这意味着NDX对“负面消息”的敏感度更为剧烈，任何负向冲击对该指数条件方差的边际放大效应均远超同等规模的正向冲击，深刻反映了高科技成长型资产在面临下行风险时，投资者往往会表现出更为激进的避险情绪与估值重塑行为。":
    "Comparing leverage parameters, NDX's asymmetric response coefficient sits clearly above DJI's. NDX is the more acutely sensitive to bad news: any negative shock amplifies its conditional variance far more than a positive shock of equal size, reflecting how investors in high-growth technology assets react to downside risk with more aggressive risk aversion and sharper revaluation.",
  "综上所述，DJI与NDX在风险特征上呈现出截然不同的演化路径：前者侧重于波动状态的长周期存续，而后者则表现为对负面冲击的爆发式响应，这种差异性本质上源于科技行业对增长预期的高度敏感性以及工业板块在宏观经济周期中的结构性韧性，为投资者在构建跨行业资产配置及风险对冲方案时提供了重要的量化决策依据。":
    "Taken together, DJI and NDX follow distinctly different risk paths: the former is characterised by long-lived volatility states, the latter by explosive reactions to negative shocks. The divergence stems fundamentally from technology's acute sensitivity to growth expectations versus the industrial complex's structural resilience across the macroeconomic cycle, and provides a quantitative basis for cross-sector allocation and hedging decisions.",
  "从残差的序列特征观察，所有子图中的前10至20阶滞后项自相关系数均显著超出了阴影区域所示的置信区间边界，且呈现出高起点、慢衰减的典型特征，这一统计现象明确揭示了标准化残差序列中仍存在严重的序列相关性，表明模型未能完全剥离收益率序列中的动态依赖信息。":
    "Examining the residual series, autocorrelation coefficients at the first 10 to 20 lags break well outside the shaded confidence bands in every panel, starting high and decaying slowly. Serious serial correlation therefore remains in the standardised residuals, showing the models have not fully stripped the dynamic dependence out of the return series.",
  "这种ACF曲线的缓慢衰减模式在时间序列分析中被视为非平稳过程或存在未被捕捉之强趋势项的经典征兆，暗示了当前模型在刻画底层数据分布的演变逻辑时存在局限性，导致残差项未能达到理想的白噪声状态，从而挑战了模型关于独立同分布创新的基本假设。":
    "In time-series analysis, slow ACF decay of this kind is a classic sign of a non-stationary process or an uncaptured strong trend term. It suggests the current models are limited in describing how the underlying distribution evolves, leaving residuals short of ideal white noise and challenging the assumption of i.i.d. innovations.",
  "通过对比标准GARCH模型与引入非对称效应的GJR-GARCH模型可以发现，两者在残差自相关表现上几乎不存在视觉差异，这进一步证明了单纯通过调整波动率方程的规格（即切换至非对称模型）并不能有效解决NDX和DJI数据的统计失真问题，反映出模型在捕捉复杂动态特征及结构性变化方面的有效性仍有待进一步优化。":
    "Comparing the standard GARCH model with the asymmetric GJR-GARCH specification reveals almost no visual difference in residual autocorrelation. Adjusting the variance equation alone — switching to an asymmetric model — therefore does not resolve the statistical distortion in the NDX and DJI data, indicating that further work is needed before these models adequately capture complex dynamics and structural change.",

  // ── task6：期权定价与路径模拟 ────────────────────────────────────
  "通过GBM模型对不同频率的AAPL股票进行路径模拟，以及用Heston模型进行路径模拟和敏感性测试":
    "Simulates AAPL price paths under geometric Brownian motion at different frequencies, and runs Heston path simulation with sensitivity testing",
  "四组模拟结果均显示资产价格路径具有明显的不确定性。随着投资期限从当前延伸至三年，价格路径逐渐发散，说明未来价格的不确定性会随时间增加。这一点与金融市场中的风险累积特征一致：持有期越长，资产最终价格可能落入的区间越宽，投资者面临的潜在收益和潜在损失范围也越大。":
    "All four simulations show substantial uncertainty in the price path. As the horizon extends from today to three years, paths progressively diverge, indicating that uncertainty about future prices grows with time. This matches the way risk accumulates in financial markets: the longer the holding period, the wider the range of possible terminal prices and the greater the span of potential gains and losses.",
  "其次，周度模拟相较于月度模拟呈现出更连续、更细致的价格演化过程。由于周度时间步长包含更多观测点，它能够更充分地刻画资产价格在持有期内的波动变化。因此，对于需要关注动态风险管理、阶段性回撤或再平衡策略的投资者而言，周度模拟更有助于识别投资期间的路径风险。相比之下，月度模拟虽然计算点数较少，但相邻时间点之间的跳跃更明显，可能弱化对短期波动的刻画。":
    "Weekly simulation produces a more continuous, finely grained picture of price evolution than monthly. With more observation points per step, it describes volatility over the holding period more fully, which helps investors concerned with dynamic risk management, interim drawdown or rebalancing to identify path risk. Monthly simulation requires fewer computations but shows larger jumps between adjacent points, which can understate short-term volatility.",
  "周度模拟与月度模拟的终端价格分布整体形态较为接近，均表现出右偏和长右尾特征。不过，不同时间步长会影响分布的细节。":
    "The terminal price distributions from weekly and monthly simulation are broadly similar in shape, both right-skewed with a long right tail. The choice of time step does, however, affect the details of the distribution.",
  "对于 Euler 方法而言，时间步长从周度变为月度后，均值由约 303.88 下降至 297.14，中位数由约 277.00 下降至 272.38。这说明在 Euler 离散化下，较大的时间步长可能引入一定的数值近似误差，从而影响终端价格分布的位置和形态。":
    "Under the Euler method, moving from weekly to monthly steps lowers the mean from roughly 303.88 to 297.14 and the median from about 277.00 to 272.38. Larger time steps in an Euler discretisation therefore introduce numerical approximation error that shifts both the location and the shape of the terminal price distribution.",
  "对于 Exact 方法而言，周度和月度模拟的分布理论上应保持一致，因为 Exact 方法直接基于 GBM 的闭式解进行模拟，时间步长主要影响路径显示精度，而不应显著影响终端价格分布。图中 Exact-Weekly 和 Exact-Monthly 的均值及中位数存在一定差异，可能主要来自有限模拟次数下的随机抽样误差，而非方法本身的系统性偏差。":
    "For the exact method the two distributions should in theory coincide, since simulation proceeds directly from the closed-form GBM solution and the time step affects only the resolution of the displayed path, not the terminal distribution. The differences in mean and median between Exact-Weekly and Exact-Monthly in the chart most likely reflect random sampling error from a finite number of simulations rather than systematic bias in the method.",
  "Euler 方法与 Exact 方法整体上给出了相似的价格扩散趋势，但二者在数值性质上存在差异。Euler 方法是一种近似离散化方法，在时间步长较大时可能引入一定的离散化误差，尤其是在月度模拟下更容易使终端价格分布产生偏差。Exact 方法则直接基于 GBM 的解析解生成价格路径，因此能够更好地保持理论上的对数正态分布特征，并确保价格始终为正。":
    "The Euler and exact methods produce broadly similar diffusion patterns but differ in their numerical properties. Euler is an approximate discretisation and can introduce discretisation error when the time step is large, most visibly biasing the terminal distribution under monthly simulation. The exact method generates paths directly from the analytical GBM solution, preserving the theoretical log-normal distribution more faithfully and guaranteeing that prices remain positive.",
  "从投资建模角度来看，Euler 方法是一种近似模拟方法，其优势在于实现简单、适用范围广；但在 GBM 模型中，它可能受到离散化误差影响，尤其在时间步长较大时更为明显。因此，Euler 模拟得到的终端价格分布可能与理论分布存在偏离。":
    "From a modelling standpoint, the Euler method is an approximation whose strengths are simplicity and broad applicability. Within a GBM framework, however, it is exposed to discretisation error that becomes pronounced at larger time steps, so the terminal distribution it produces may depart from theory.",
  "相比之下，Exact 方法直接利用 GBM 的解析解生成终端价格，能够更准确地保持对数正态分布特征，并确保资产价格始终为正。因此，在使用 GBM 进行投资收益预测、风险分析或衍生品定价时，Exact 方法通常更具理论一致性和数值稳定性。":
    "The exact method, by contrast, derives terminal prices straight from the analytical GBM solution, preserving log-normality more accurately and keeping prices strictly positive. For return forecasting, risk analysis or derivatives pricing under GBM, it is generally the more theoretically consistent and numerically stable choice.",

  // ── task5：相对价值策略框架 ──────────────────────────────────────
  "通过AMZN和MSFT构建相对价值策略，并进行回测分析":
    "Builds a relative-value strategy on AMZN and MSFT and evaluates it through backtesting",
  "对 AMZN、MSFT 分别拟合 GJR-GARCH(1,1)，用 Student-t 创新项刻画厚尾与杠杆效应；输出条件波动率 σᵢ,ₜ 与标准化残差 zᵢ,ₜ。每周用 750 日滚动窗口再估计参数。":
    "Fits GJR-GARCH(1,1) separately to AMZN and MSFT with Student-t innovations to capture fat tails and the leverage effect, producing conditional volatility σᵢ,ₜ and standardised residuals zᵢ,ₜ. Parameters are re-estimated weekly on a 750-day rolling window.",
  "在标准化残差上应用 Engle (2002) DCC，得到时变相关 ρₜ 与条件协方差矩阵；推导对冲比率 hₜ = ρₜ·(σ_A/σ_B)。当 ρₜ < 0.40 时禁止开新仓。":
    "Applies Engle (2002) DCC to the standardised residuals to obtain time-varying correlation ρₜ and the conditional covariance matrix, deriving the hedge ratio hₜ = ρₜ·(σ_A/σ_B). New positions are prohibited whenever ρₜ < 0.40.",
  "将残差经 PIT 映射至 Uniform[0,1]；在 Gaussian、Student-t、Clayton、Frank 中按 AIC 选优（本回测最优：Student-t）。核心交易指标 Signalₜ = P(U_B ≤ u_B | U_A = u_A)。":
    "Maps residuals to Uniform[0,1] via the probability integral transform, then selects among Gaussian, Student-t, Clayton and Frank copulas by AIC (Student-t was optimal in this backtest). The core trading metric is Signalₜ = P(U_B ≤ u_B | U_A = u_A).",

  // ── 卡片标题与摘要 ──────────────────────────────────────────────
  "行业投资组合的多因子定价模型分析": "Multi-Factor Pricing Models for Industry Portfolios",
  "股票波动率分析": "Equity Volatility Analysis",
  "股票指数的GARCH模型对比分析": "GARCH Model Comparison on Equity Indices",
  "多种投资组合最优策略": "Optimal Portfolio Construction",
  "股票相对价值策略": "Equity Relative-Value Strategy",
  "期权定价模型对比分析": "Option Pricing Model Comparison",
  "通过对六只股票的历史数据进行定量分析，构建了多种优化策略 ，从而对比出最优投资组合策略":
    "Quantitative analysis of six stocks' historical data to build and compare multiple optimisation strategies",

  // ── 章节标题 ────────────────────────────────────────────────────
  "回归结果：单因子模型（CAPM）": "Regression Results: Single-Factor Model (CAPM)",
  "回归结果：三因子模型（Fama-French 3 因子）":
    "Regression Results: Three-Factor Model (Fama-French)",
  "回归结果：四因子模型（含动量因子）":
    "Regression Results: Four-Factor Model (with Momentum)",
  "回归结果：五因子模型": "Regression Results: Five-Factor Model",
  "HiTec 与 Hlth 行业收益分布对比":
    "Return Distributions: HiTec versus Hlth",
  "HiTec 的描述性统计": "Descriptive Statistics — HiTec",
  "Hlth 行业的描述性统计": "Descriptive Statistics — Hlth",
  "一、 行业间模型解释力度的显著分化":
    "1. Sharp divergence in explanatory power between sectors",
  "二、 因子增加对高科技组合的边际贡献与冗余性":
    "2. Marginal contribution and redundancy of added factors — technology",
  "三、 因子增加对医疗保健组合的有效性验证":
    "3. Validating the added factors — healthcare",
  "因子有效性": "Factor Effectiveness",
  "对比分析": "Comparative Analysis",
  "HiTec 分析": "HiTec Analysis",
  "Hlth 分析": "Hlth Analysis",
  "HiTec 三因子分析": "HiTec — Three-Factor Analysis",
  "Hlth 三因子分析": "Hlth — Three-Factor Analysis",
  "HiTec：单因子回归结果": "HiTec: Single-Factor Regression",
  "HiTec：三因子回归结果": "HiTec: Three-Factor Regression",
  "HiTec：四因子回归结果": "HiTec: Four-Factor Regression",
  "HiTec：五因子回归结果": "HiTec: Five-Factor Regression",
  "Hlth：单因子回归结果": "Hlth: Single-Factor Regression",
  "Hlth：三因子回归结果": "Hlth: Three-Factor Regression",
  "Hlth：四因子回归结果": "Hlth: Four-Factor Regression",
  "Hlth：五因子回归结果": "Hlth: Five-Factor Regression",

  // ── 图片 alt ────────────────────────────────────────────────────
  "HiTec 与 Hlth 行业组合的经验分布与 KDE 图":
    "Empirical distributions and KDE for the HiTec and Hlth industry portfolios",
  "HiTec 行业组合的单因子回归结果图": "Single-factor regression results for the HiTec portfolio",
  "HiTec 行业组合的三因子回归结果图": "Three-factor regression results for the HiTec portfolio",
  "HiTec 行业组合的四因子回归结果图（含动量因子）":
    "Four-factor regression results for the HiTec portfolio, including momentum",
  "HiTec 行业组合的五因子回归结果图": "Five-factor regression results for the HiTec portfolio",
  "Hlth 行业组合的单因子回归结果图": "Single-factor regression results for the Hlth portfolio",
  "Hlth 行业组合的三因子回归结果图": "Three-factor regression results for the Hlth portfolio",
  "Hlth 行业组合的四因子回归结果图（含动量因子）":
    "Four-factor regression results for the Hlth portfolio, including momentum",
  "Hlth 行业组合的五因子回归结果图": "Five-factor regression results for the Hlth portfolio",

  // ── task2 / task3 / task6 图表标题 ──────────────────────────────
  "APLD 波动率的描述性统计（CC Volatility vs Parkinson Volatility）":
    "APLD volatility — descriptive statistics (close-to-close vs Parkinson)",
  "PSLV 波动率的描述性统计（CC Volatility vs Parkinson Volatility）":
    "PSLV volatility — descriptive statistics (close-to-close vs Parkinson)",
  "APLD 两种波动率对比图": "APLD — comparison of the two volatility estimators",
  "PSLV 两种波动率对比图": "PSLV — comparison of the two volatility estimators",
  "两种波动率对比分析": "Comparing the Two Volatility Estimators",
  "投资者视角": "Investor Perspective",
  "NDX 的拟合参数": "NDX — Fitted Parameters",
  "DJI 的拟合参数": "DJI — Fitted Parameters",
  "对比NDX和DJI": "NDX versus DJI",
  "ACF测试": "ACF Test",
  "NDX 与 DJI 的 ACF 测试图": "ACF test charts for NDX and DJI",
  "对比周度和月度下GBM的模拟路径": "Weekly versus Monthly GBM Simulated Paths",
  "周度与月度 GBM 模拟价格路径对比":
    "Comparison of weekly and monthly GBM simulated price paths",
  "GBM 模拟终端价格分布直方图": "Histogram of simulated terminal prices under GBM",
  "Heston模型的敏感性测试": "Heston Model Sensitivity Tests",
  "Heston模型下的股票价格及看涨期权路径模拟":
    "Heston Model: Stock Price and Call Option Path Simulation",
  "Heston 模型下股票价格与看涨期权蒙特卡洛路径模拟":
    "Monte Carlo simulation of stock price and call option paths under the Heston model",
  "Heston 模型均值回归速度 kappa 敏感性测试":
    "Heston model sensitivity test on mean-reversion speed kappa",
  "Heston 模型相关系数 rho 敏感性测试":
    "Heston model sensitivity test on the correlation coefficient rho",
  "Heston 模型方差参数敏感性测试":
    "Heston model sensitivity test on the variance parameters",

  // ── task4 组合名称与图注 ────────────────────────────────────────
  "最小方差组合": "Minimum-Variance Portfolio",
  "最大收益率组合": "Maximum-Return Portfolio",
  "最大夏普比率组合": "Maximum-Sharpe Portfolio",
  "风险平价组合": "Risk-Parity Portfolio",
  "Black-Litterman组合": "Black-Litterman Portfolio",
  "最小方差组合补充图": "Minimum-variance portfolio — supplementary chart",
  "最大收益率组合补充图": "Maximum-return portfolio — supplementary chart",
  "最大夏普比率组合补充图": "Maximum-Sharpe portfolio — supplementary chart",
  "风险平价组合补充图": "Risk-parity portfolio — supplementary chart",
  "Black-Litterman 组合补充图": "Black-Litterman portfolio — supplementary chart",
  "统计特征：": "Statistical profile: ",
  "配置逻辑：": "Allocation logic: ",
  "投资建议：": "Investment view: ",

  // ── task5 策略框架表 ────────────────────────────────────────────
  "AMZN/MSFT相对价值策略": "AMZN / MSFT Relative-Value Strategy",
  "策略框架与交易规则": "Strategy Framework and Trading Rules",
  "AMZN / MSFT 策略累计收益与回撤":
    "Cumulative return and drawdown of the AMZN / MSFT strategy",
  "组合表现": "Performance",
  "数据处理": "Data Handling",
  "模型代码": "Model Code",
  "标的资产": "Underlying Assets",
  "滚动窗口": "Rolling Window",
  "信号模型": "Signal Model",
  "执行时点": "Execution Timing",
  "相关失效": "Correlation Breakdown",
  "信号分区": "Signal Zones",
  "出场规则": "Exit Rules",
  "入场条件（须同时满足）": "Entry Conditions (all must hold)",
  "再校准频率": "Recalibration Frequency",
  "创新项分布": "Innovation Distribution",
  "初始拟合样本": "Initial Estimation Sample",
  "提取标准化残差": "Extract standardised residuals",
  "GJR-GARCH 边缘模型": "GJR-GARCH Marginal Models",
  "DCC 动态条件相关": "DCC Dynamic Conditional Correlation",
  "Copula 依赖结构": "Copula Dependence Structure",
  "Copula 候选": "Copula Candidates",
  "Gaussian · Student-t · Clayton · Frank（AIC 选优）":
    "Gaussian · Student-t · Clayton · Frank (selected by AIC)",
  "标准化 Student-t（联合估计）": "Standardised Student-t (jointly estimated)",
  "时变相关系数 ρₜ": "Time-varying correlation ρₜ",
  "PIT → 选族 → h 函数信号": "PIT → family selection → h-function signal",
  "5 年日频收盘价": "Five years of daily closing prices",
  "750 交易日（约 3 年）": "750 trading days (about three years)",
  "每 20 个交易日滚动校准。": "Rolling recalibration every 20 trading days.",
  "每周五收盘后": "After Friday's close",
  "主信号：Signalₜ < 0.12 或 > 0.88": "Primary signal: Signalₜ < 0.12 or > 0.88",
  "价差 Z 分数：|Z| > 0.3（60 日滚动）":
    "Spread Z-score: |Z| > 0.3 (60-day rolling)",
  "相关过滤：ρₜ > 0.40": "Correlation filter: ρₜ > 0.40",
  "制度过滤：近 5 日无 Copula 族切换":
    "Regime filter: no copula family switch in the past five days",
  "空仓要求：无持仓方可开仓":
    "Flat-book requirement: a new position may only be opened when no position is held",
  "确认：极端区间连续 1 个交易日":
    "Confirmation: one consecutive trading day in the extreme zone",
  "信号收盘生成后，次日开盘执行":
    "Signals are generated at the close and executed at the next open",
  "强多 MSFT / 空 AMZN": "Strong long MSFT / short AMZN",
  "强空 MSFT / 多 AMZN": "Strong short MSFT / long AMZN",
  "中性 / 不交易": "Neutral / no trade",
  "MSFT 相对低估": "MSFT relatively undervalued",
  "MSFT 相对高估": "MSFT relatively overvalued",
  "配对处于正常依赖区间": "Pair sits within its normal dependence range",
  "Signal 进入 [0.22, 0.78]": "Signal re-enters [0.22, 0.78]",
  "信号加深且 ρ 较入场下降 > 0.15":
    "Signal deepens while ρ falls more than 0.15 below its level at entry",
  "次日开盘全部平仓": "Close the entire position at the next open",
  "止盈": "Take profit",

  "。建模链路：GJR-GARCH(1,1) 边缘 → DCC 时变相关系数 → Student-t Copula h-function → 条件配对信号；":
    ". Modelling chain: GJR-GARCH(1,1) marginals → DCC time-varying correlation → Student-t copula h-function → conditional pair signal;",

  // ── task7：LightGBM 房贷违约预测 ─────────────────────────────────
  "基于 LightGBM 的房贷违约预测": "LightGBM for Mortgage Default Prediction",
  "用 Freddie Mac 2015–2023 年发放的 41 万笔房贷数据，训练带单调约束的 LightGBM，在贷款收购时预测其两年内严重违约的概率。模型只用发放时的信息，在 2015–18 年的数据上训练，在 2021–23 年的数据上做一次样本外测试，并与 FICO × LTV 定价网格、Logistic 评分卡和 XGBoost 对比。":
    "A monotone-constrained LightGBM model, trained on 410,000 Freddie Mac mortgages originated in 2015–2023, estimates at acquisition the probability that a loan becomes seriously delinquent within two years. Using origination-time data only, it is trained on the 2015–18 vintages, tested once out of time on 2021–23, and benchmarked against a FICO × LTV pricing grid, a logistic scorecard and XGBoost.",

  "样本外 AUC": "Out-of-time AUC",
  "Logistic 评分卡 0.794": "Logistic scorecard 0.794",
  "剔除最高风险 10% 可拦截的违约": "Defaults removed by excluding the riskiest 10%",
  "Logistic 评分卡 41.6%": "Logistic scorecard 41.6%",
  "风险叠加客群的违约识别率": "Defaults flagged among risk-layered loans",
  "Logistic 评分卡 75%": "Logistic scorecard 75%",
  "全量年份训练提速": "Training speed-up on a full vintage",
  "对比 XGBoost，370 万笔贷款": "vs. XGBoost, 3.7M loans",

  "研究设计": "Research Design",
  "数据来源": "Data",
  "Freddie Mac 单户住房贷款数据集（Release 47）":
    "Freddie Mac Single-Family Loan-Level Dataset (Release 47)",
  "样本": "Sample",
  "2015–2023 年发放的 410,630 笔贷款": "410,630 loans originated in 2015–2023",
  "预测目标": "Target",
  "首次还款后 24 个月内严重违约（逾期 90 天以上或信用事件终止）":
    "Serious delinquency within 24 months of first payment (90+ days delinquent or a credit-event termination)",
  "特征": "Features",
  "只用贷款发放时的信息，共 24 个（11 个数值型，13 个类别型）":
    "Origination-time fields only: 24 in total (11 numeric, 13 categorical)",
  "单调约束": "Monotone constraints",
  "违约概率随 FICO 下降而不减，随 CLTV、LTV、DTI 上升而不减":
    "PD never falls as FICO falls, or as CLTV, LTV or DTI rises",
  "调参与训练": "Tuning and training",
  "Optuna 搜索 60 组参数，早停，5 个随机种子取平均":
    "60 Optuna trials, early stopping, predictions averaged over 5 seeds",
  "发放年份": "Vintages",
  "贷款数": "Loans",
  "违约数": "Defaults",
  "违约率": "Default rate",
  "训练集": "Train",
  "验证集": "Validation",
  "压力测试集": "Stress test",
  "测试集（只用一次）": "Test (touched once)",
  "按发放年份切分训练、验证和测试集，测试集只在最后评估一次，模拟模型上线后面对未来贷款的真实情况。":
    "Train, validation and test sets are split by origination vintage, and the test set is evaluated only once at the end, mimicking how the model would face future loans in production.",

  "违约标签的设定": "Defining the Default Label",
  "各发放年份的 24 个月违约率，原始标签与主标签对比":
    "24-month default rate by vintage, raw label vs. main label",
  "新冠疫情期间的还款宽限（forbearance）会让原始违约标签失真。2019 年发放的贷款中有 4.7% 曾逾期 90 天以上，大多发生在服务商标记为宽限或灾害的月份。":
    "COVID-era forbearance distorts the raw default label. 4.7% of loans originated in 2019 were ever 90+ days delinquent, mostly in months that servicers flagged as forbearance or disaster-related.",
  "主标签因此不计入宽限期和灾害月份中的逾期，信用事件终止仍算违约，2019 年的违约率回到 0.55%。如果直接用原始标签训练，测试集 AUC 会从 0.810 降到 0.763。":
    "The main label therefore ignores delinquency in forbearance and disaster months while still counting credit-event terminations, bringing the 2019 default rate back to 0.55%. Training on the raw label instead cuts test AUC from 0.810 to 0.763.",

  "为什么需要树模型：风险会叠加": "Why Trees: Risk Layering",
  "按 FICO 与 CLTV 分组的实际违约率热力图，分 DTI 高低两组":
    "Heatmap of realised default rate by FICO and CLTV, split by DTI",
  "现有的 FICO × LTV 定价网格和 Logistic 评分卡都是加法结构，每个风险因子的贡献固定，不随其他因子变化。":
    "The incumbent FICO × LTV pricing grid and logistic scorecard are both additive: each risk factor contributes a fixed amount, regardless of the others.",
  "但房贷风险会叠加。FICO 700–739、CLTV 90–95 的借款人，DTI 不超过 43 时违约率为 0.88%，超过 43 时升到 2.36%；而在 FICO 780 以上，同样的 DTI 变化几乎没有影响。梯度提升树可以直接从数据中学到这类交互效应。":
    "Mortgage risk compounds. A borrower with FICO 700–739 and CLTV 90–95 defaults at 0.88% when DTI is 43 or below, but at 2.36% above 43, while the same DTI step barely matters at FICO 780+. Gradient-boosted trees learn such interactions directly from the data.",

  "样本外模型对比（2021–2023 测试集）": "Out-of-Time Model Comparison (2021–2023 Test Set)",
  "模型": "Model",
  "相对评分卡的 ΔAUC [95% CI]": "ΔAUC vs. scorecard [95% CI]",
  "B0 定价网格（FICO × LTV）": "B0 Pricing grid (FICO × LTV)",
  "B1 Logistic 评分卡": "B1 Logistic scorecard",
  "B2 Logistic + 高基数类别变量": "B2 Logistic + high-cardinality fields",
  "M3 LightGBM（单调约束）": "M3 LightGBM-monotone",
  "测试集共 141,543 笔贷款、1,609 笔违约；置信区间来自 1,000 次配对 bootstrap 重抽样。":
    "Test set: 141,543 loans and 1,609 defaults. Confidence intervals from 1,000 paired bootstrap resamples.",
  "M3 在全部 1,000 次 bootstrap 抽样中 AUC 都高于评分卡，而且优势逐年扩大，2021、2022、2023 年分别领先 0.010、0.021、0.026。":
    "M3 beats the scorecard on AUC in every one of the 1,000 bootstrap draws, and its lead widens each year: +0.010 on the 2021 vintage, +0.021 on 2022 and +0.026 on 2023.",
  "B2 给评分卡加入了更多变量，表现反而略差，说明提升来自模型的灵活性，而不是更多的信息。":
    "B2, which gives the scorecard more variables, is slightly worse, so the gain comes from model flexibility rather than from more information.",
  "测试集精确率–召回率曲线与按十分位的校准图":
    "Test-set precision–recall curves and calibration by score decile",
  "左图是测试集的精确率–召回率曲线，M3 在大部分召回区间都位于最上方。右图按评分十分位比较预测和实际违约率，用 2019 年数据做 isotonic 校准后，M3 的实际违约率随分位单调上升，从 0.08% 到 5.1%。":
    "The left panel shows test-set precision–recall curves, with M3 on top across most of the recall range. The right panel compares predicted and realised default rates by score decile: after isotonic calibration on 2019, M3's realised default rate rises monotonically from 0.08% to 5.1%.",
  "但所有模型都把 2022–23 年的违约水平低估了约一半（实际 1.38–1.50%，预测均值 0.65–0.68%）。这是加息后违约水平整体上移，不是排序失效，用于计提减值准备（CECL）之前需要按年份重新校准。":
    "Every model, however, under-predicts 2022–23 defaults by about half (realised 1.38–1.50% against a mean PD of 0.65–0.68%). This is a shift in the level of default under higher rates, not a ranking failure, and it calls for vintage-level recalibration before any use in CECL loss reserving.",

  "经济价值": "Economic Value",
  "剔除最高风险 10% 的贷款后可拦截的违约占比":
    "Share of defaults removed by excluding the riskiest 10% of loans",
  "B0 定价网格": "B0 Pricing grid",
  "风险叠加客群（FICO < 700、CLTV > 85、DTI > 43）中被排进最高风险 10% 的违约占比":
    "Risk-layered loans (FICO < 700, CLTV > 85, DTI > 43): share of defaults placed in the riskiest decile",
  "客群违约率": "Segment default rate",
  "按训练期 16.7% 的平均损失率计算，每 10 亿美元新收购的贷款可避免的预期损失从 68 万美元升到 75 万美元。GSE 本身的损失率较低，因此价值主要体现在更准确的风险分层和更少的逆向选择，而不是损失金额。":
    "At the 16.7% mean loss severity of the training period, the expected loss avoided rises from $0.68m to $0.75m per $1bn of acquisitions. GSE losses are low to begin with, so the value lies mainly in sharper risk tiering and less adverse selection rather than in headline loss savings.",

  "模型解释：SHAP 与消融实验": "Model Explanation: SHAP and Ablation",
  "单调约束 LightGBM 的 SHAP 特征重要性与 FICO、DTI 效应图":
    "SHAP feature importance and FICO and DTI effects for the monotone LightGBM model",
  "SHAP 显示，信号主要来自 FICO、借款人数量（单一借款人的风险更高）、利率利差（贷款利率减去同月同期限贷款的中位利率）和 DTI，影响方向都符合经济直觉。":
    "SHAP attributes most of the signal to FICO, the number of borrowers (single-borrower loans are riskier), the rate spread (note rate minus the median rate of loans with the same month and term) and DTI, each with the economically expected direction.",
  "消融实验把 M3 相对评分卡的 0.016 AUC 提升拆开，约 0.007 来自非线性主效应，约 0.010 来自变量间的交互；去掉单调约束会损失 0.005；地理变量的贡献在 ±0.001 以内。":
    "An ablation splits M3's +0.016 AUC over the scorecard into about 0.007 from non-linear main effects and about 0.010 from interactions. Removing the monotone constraints costs 0.005, and geography contributes within ±0.001.",

  "为什么选 LightGBM：全量数据下的训练效率": "Why LightGBM: Training Efficiency at Full Scale",
  "训练样本": "Training loans",
  "耗时倍数（XGB / LGBM）": "Time ratio (XGB / LGBM)",
  "模型大小倍数": "Model size ratio",
  "10 万": "100k",
  "370 万（全量年份）": "3.7M (full vintage)",
  "200 万，ZIP3 one-hot（715 列）": "2.0M, ZIP3 one-hot (715 columns)",
  "LightGBM 与 XGBoost 在 2021 全量年份上的训练时间、内存与样本外 AUC":
    "LightGBM vs. XGBoost on the full 2021 vintage: training time, memory and out-of-time AUC",
  "两者精度相当，选择 LightGBM 的理由在运营层面。在 17.7 万笔的训练集上 XGBoost 反而更快，优势要到生产规模才出现。":
    "The two libraries are equally accurate, so the case for LightGBM is operational. On the 177k-loan training set XGBoost is actually faster; the advantage appears only at production scale.",
  "用 2021 年全量 370 万笔贷款各训练 500 轮，LightGBM 快 4.5 倍；把 ZIP3 做 one-hot 编码后快 22.6 倍，因为 LightGBM 的互斥特征捆绑会先把互斥的哑变量合并。两者的样本外 AUC 在每个规模下相差都不到 0.004。":
    "Trained for 500 rounds on all 3.7 million loans of the 2021 vintage, LightGBM is 4.5 times faster, and 22.6 times faster with one-hot ZIP3, because exclusive feature bundling merges the mutually exclusive dummies first. Out-of-time AUC differs by less than 0.004 at every size.",

  "模型风险与使用建议": "Model Risk and Recommendation",
  "主要风险": "Key risks",
  "排序准确但水平偏低。2022 年加息后实际违约率翻倍，模型的预测没有跟着上升，用更新的数据重训也无法修正。":
    "Level, not ranking. After the 2022 rate shock realised default doubled but the PDs did not move, and retraining on more recent data did not fix it.",
  "利率外推。2023 年 94.5% 的贷款利率高于训练样本的 99 分位（5.6%），树模型在训练范围之外只能平推，应重点监控同月利率利差。":
    "Rate extrapolation. 94.5% of 2023 loans carry a note rate above the 99th percentile of the training range (5.6%). Trees extrapolate flat, so the same-month rate spread is the safer signal to monitor.",
  "公平借贷。ZIP3、MSA 等地理变量可能成为受保护特征的代理，而去掉全部地理变量不影响精度，生产版本应剔除。":
    "Fair lending. Geography such as ZIP3 or MSA can proxy for protected characteristics, and removing all of it leaves accuracy unchanged, so the production version should exclude it.",
  "监控与治理（SR 11-7）": "Monitoring and governance (SR 11-7)",
  "每季度监控评分和关键输入的 PSI，超过 0.25 触发复核。":
    "Quarterly PSI on the score and key inputs, with a review above 0.25.",
  "实际与预测违约之比超出 0.8–1.25 区间时，用最新的成熟年份重新校准截距。":
    "Refit the intercept on the latest seasoned vintages when the ratio of realised to predicted defaults leaves the 0.8–1.25 band.",
  "评分卡继续作为主模型和备用方案，连续两个成熟年份都支持新模型后再切换。":
    "The scorecard stays champion and fallback until two consecutive seasoned vintages favour the new model.",
  "建议把单调约束 LightGBM 作为挑战者模型，与评分卡并行，用于贷款收购的风险分层和担保费定价；在完成按年份校准和宏观情景叠加之前，不用于计提减值准备。":
    "Deploy the monotone LightGBM model as a challenger alongside the scorecard for acquisition risk tiering and guarantee-fee pricing, but not for loss reserving until it has vintage-level recalibration and a macro overlay.",
  "下一步可以改用贷款–月度面板，把违约和提前还款作为竞争风险建模，并加入房价和利率路径，把时点 PD 扩展为可用于 CECL 和压力测试的全周期 PD。":
    "A natural next step is a loan-month panel that treats default and prepayment as competing risks and conditions on house-price and rate paths, turning the point-in-time PD into a lifetime PD usable for CECL and stress testing.",

  // ── 通用 UI ─────────────────────────────────────────────────────
  "返回首页": "Back to home",
  "项目未找到": "Project not found",
};
