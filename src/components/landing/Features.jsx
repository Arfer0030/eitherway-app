import React from 'react'
import { motion } from 'framer-motion'
import { Zap, BarChart3, Shield, Cpu, Wallet, TrendingUp } from 'lucide-react'

const FEATURES = [
  {
    icon: <Zap size={28} />,
    title: 'One-Click Zap Deposit',
    description: 'Deposit any token you hold — BONK, SOL, USDC — and Olympus automatically routes it to the optimal Kamino vault. No manual swaps, no complexity.',
    accent: 'gold',
    badge: 'Kamino Integration',
  },
  {
    icon: <Shield size={28} />,
    title: 'MEV-Resistant Routing',
    description: 'DFlow infrastructure executes your token swaps with best-price routing and front-running protection. Your trades are always fair.',
    accent: 'blue',
    badge: 'DFlow Powered',
  },
  {
    icon: <BarChart3 size={28} />,
    title: 'Birdeye Intelligence',
    description: 'Real-time smart money tracking, whale wallet analysis, and protocol metrics. Never deposit blind — see where the whales are moving.',
    accent: 'cyan',
    badge: 'Birdeye Data',
  },
  {
    icon: <Cpu size={28} />,
    title: 'Quicknode Infrastructure',
    description: 'Enterprise-grade Solana RPC via Quicknode ensures lightning-fast data fetching and transaction broadcasting with zero delays.',
    accent: 'amber',
    badge: 'Quicknode RPC',
  },
  {
    icon: <Wallet size={28} />,
    title: 'Solflare Deep Integration',
    description: 'Full transaction simulation before you confirm — see exactly what tokens leave and arrive in your wallet. No more surprise outcomes.',
    accent: 'green',
    badge: 'Solflare Native',
  },
  {
    icon: <TrendingUp size={28} />,
    title: 'Auto-Compounding Vaults',
    description: 'Kamino auto-vaults continuously rebalance and compound your positions. Your yield works 24/7 without any manual intervention.',
    accent: 'gold',
    badge: 'Set & Forget',
  },
]

const ACCENT_CLASSES = {
  gold: {
    icon: 'text-olympus-gold bg-olympus-gold/10 border-olympus-gold/20',
    badge: 'bg-olympus-gold/10 text-olympus-gold border-olympus-gold/20',
    glow: 'group-hover:bg-olympus-gold/5',
    border: 'group-hover:border-olympus-gold/30',
  },
  blue: {
    icon: 'text-olympus-blue bg-olympus-blue/10 border-olympus-blue/20',
    badge: 'bg-olympus-blue/10 text-olympus-blue border-olympus-blue/20',
    glow: 'group-hover:bg-olympus-blue/5',
    border: 'group-hover:border-olympus-blue/30',
  },
  cyan: {
    icon: 'text-olympus-cyan bg-olympus-cyan/10 border-olympus-cyan/20',
    badge: 'bg-olympus-cyan/10 text-olympus-cyan border-olympus-cyan/20',
    glow: 'group-hover:bg-olympus-cyan/5',
    border: 'group-hover:border-olympus-cyan/30',
  },
  amber: {
    icon: 'text-olympus-amber bg-olympus-amber/10 border-olympus-amber/20',
    badge: 'bg-olympus-amber/10 text-olympus-amber border-olympus-amber/20',
    glow: 'group-hover:bg-olympus-amber/5',
    border: 'group-hover:border-olympus-amber/30',
  },
  green: {
    icon: 'text-olympus-green bg-olympus-green/10 border-olympus-green/20',
    badge: 'bg-olympus-green/10 text-olympus-green border-olympus-green/20',
    glow: 'group-hover:bg-olympus-green/5',
    border: 'group-hover:border-olympus-green/30',
  },
}

export default function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-olympus-surface/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-olympus-gold text-sm font-semibold uppercase tracking-widest mb-4 block">
            Why Olympus
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Premium DeFi,{' '}
            <span className="text-gold-gradient">Simplified</span>
          </h2>
          <p className="text-olympus-text-dim text-lg max-w-2xl mx-auto">
            Every feature is engineered to give you institutional-grade yield access with the simplicity of a single click.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => {
            const accent = ACCENT_CLASSES[feat.accent]
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`group relative bg-olympus-card border border-olympus-border rounded-2xl p-7 overflow-hidden transition-all duration-300 hover:shadow-card ${accent.border}`}
              >
                {/* Background glow on hover */}
                <div className={`absolute inset-0 transition-colors duration-300 ${accent.glow}`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl border mb-5 ${accent.icon}`}>
                    {feat.icon}
                  </div>

                  {/* Badge */}
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${accent.badge}`}>
                    {feat.badge}
                  </span>

                  <h3 className="text-olympus-text text-lg font-bold mb-3">{feat.title}</h3>
                  <p className="text-olympus-text-dim text-sm leading-relaxed">{feat.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
