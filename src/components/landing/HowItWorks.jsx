import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, ArrowRight, RefreshCw, TrendingUp, CheckCircle2 } from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: 'Connect Your Wallet',
    description: 'Connect Solflare in one click. Olympus reads your token balances and simulates every transaction before you sign. Your keys never leave your wallet.',
    icon: <Wallet size={32} />,
    detail: 'Supported: Solflare, Phantom, Backpack, Ledger',
    color: 'from-olympus-gold to-olympus-amber',
    accent: 'text-olympus-gold',
    bg: 'bg-olympus-gold/10',
  },
  {
    step: '02',
    title: 'Pick a Vault & Zap In',
    description: 'Browse curated Kamino vaults sorted by APY, risk, and strategy. Choose any source token — BONK, SOL, USDC — and Zap deposits route automatically through DFlow.',
    icon: <ArrowRight size={32} />,
    detail: 'Any-to-vault routing via DFlow in < 2 seconds',
    color: 'from-olympus-blue to-olympus-cyan',
    accent: 'text-olympus-cyan',
    bg: 'bg-olympus-cyan/10',
  },
  {
    step: '03',
    title: 'Vaults Auto-Rebalance',
    description: 'Kamino\'s concentrated liquidity vaults continuously adjust ranges, harvest fees, and compound rewards. You stay in range while markets move.',
    icon: <RefreshCw size={32} />,
    detail: 'Rebalancing happens on-chain with no gas from you',
    color: 'from-olympus-green to-olympus-cyan',
    accent: 'text-olympus-green',
    bg: 'bg-olympus-green/10',
  },
  {
    step: '04',
    title: 'Harvest & Compound',
    description: 'Claim your accumulated yield at any time or set auto-compound intervals. Birdeye alerts you to market intelligence that affects your positions.',
    icon: <TrendingUp size={32} />,
    detail: 'Auto-compound + Birdeye smart alerts included',
    color: 'from-olympus-amber to-olympus-gold',
    accent: 'text-olympus-amber',
    bg: 'bg-olympus-amber/10',
  },
]

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-[600px] h-[600px] rounded-full bg-olympus-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-olympus-gold text-sm font-semibold uppercase tracking-widest mb-4 block">
            Step By Step
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            From Any Token to{' '}
            <span className="text-gold-gradient">Optimized Yield</span>
          </h2>
          <p className="text-olympus-text-dim text-lg max-w-xl mx-auto">
            Four steps. One transaction. Maximum yield.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: step list */}
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setActiveStep(i)}
                className={`flex gap-5 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  activeStep === i
                    ? 'bg-olympus-card border-olympus-gold/40 shadow-gold'
                    : 'bg-olympus-surface/50 border-olympus-border hover:border-olympus-gold/20'
                }`}
              >
                {/* Step number */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${step.bg} ${step.accent} font-black text-sm`}>
                  {step.step}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-olympus-text font-bold mb-1">{step.title}</h3>
                  <p className="text-olympus-text-dim text-sm leading-relaxed line-clamp-2">{step.description}</p>
                  {activeStep === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-2 flex items-center gap-1.5 text-xs ${step.accent} font-medium`}
                    >
                      <CheckCircle2 size={12} />
                      {step.detail}
                    </motion.div>
                  )}
                </div>

                <div className={`flex-shrink-0 transition-transform duration-300 ${activeStep === i ? 'scale-110' : 'scale-100'} ${step.accent} opacity-${activeStep === i ? '100' : '30'}`}>
                  {step.icon}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: visual diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl bg-olympus-card border border-olympus-border p-8 overflow-hidden">
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${STEPS[activeStep].color} opacity-5 transition-all duration-500`} />

              <div className="relative z-10">
                {/* Active step visualization */}
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className={`inline-flex p-6 rounded-2xl mb-6 ${STEPS[activeStep].bg} ${STEPS[activeStep].accent}`}>
                    {STEPS[activeStep].icon}
                  </div>

                  <div className={`text-6xl font-black mb-4 bg-gradient-to-r ${STEPS[activeStep].color} bg-clip-text text-transparent`}>
                    {STEPS[activeStep].step}
                  </div>

                  <h3 className="text-olympus-text text-xl font-bold mb-4">{STEPS[activeStep].title}</h3>
                  <p className="text-olympus-text-dim text-sm leading-relaxed">{STEPS[activeStep].description}</p>

                  {/* Detail badge */}
                  <div className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium border ${STEPS[activeStep].bg} ${STEPS[activeStep].accent} border-current border-opacity-20`}>
                    <CheckCircle2 size={12} />
                    {STEPS[activeStep].detail}
                  </div>
                </motion.div>

                {/* Step dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeStep === i ? 'w-6 bg-olympus-gold' : 'bg-olympus-border'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating labels */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-olympus-gold/20 border border-olympus-gold/30 rounded-xl px-3 py-2"
            >
              <span className="text-olympus-gold text-xs font-bold">APY up to 127%</span>
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-olympus-cyan/20 border border-olympus-cyan/30 rounded-xl px-3 py-2"
            >
              <span className="text-olympus-cyan text-xs font-bold">Zero MEV risk</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
