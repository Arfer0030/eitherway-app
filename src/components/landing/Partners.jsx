import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const PARTNERS = [
  {
    name: 'Kamino Finance',
    role: 'Vault Provider',
    description: 'Automated concentrated liquidity management. All Olympus vaults are Kamino auto-vaults — battle-tested, audited, and managing $200M+ TVL.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: '🏦',
    link: 'https://kamino.finance',
    tvl: '$200M+ TVL',
  },
  {
    name: 'DFlow',
    role: 'Swap Routing',
    description: 'MEV-protected order flow. DFlow routes Zap deposits to find best prices while protecting you from sandwich attacks and front-running.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    icon: '⚡',
    link: 'https://dflow.net',
    tvl: '$50M+ Volume',
  },
  {
    name: 'Birdeye',
    role: 'Market Intelligence',
    description: 'Real-time on-chain analytics. Whale tracking, smart money signals, and protocol metrics power every Olympus vault recommendation.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: '🦅',
    link: 'https://birdeye.so',
    tvl: '100K+ Tokens',
  },
  {
    name: 'Quicknode',
    role: 'RPC Infrastructure',
    description: 'Enterprise Solana node infrastructure. Ultra-low latency RPC ensures every Olympus transaction broadcasts instantly with zero dropped txs.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: '🔥',
    link: 'https://quicknode.com',
    tvl: '99.99% Uptime',
  },
  {
    name: 'Solflare',
    role: 'Wallet Integration',
    description: 'Native wallet integration with full transaction simulation. Olympus uses Solflare\'s deep API for pre-flight checks before every signature.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    icon: '🔆',
    link: 'https://solflare.com',
    tvl: '2M+ Users',
  },
  {
    name: 'Jito',
    role: 'MEV Infrastructure',
    description: 'Jito block engine integration for priority fee optimization and MEV rebates. Olympus users automatically benefit from Jito tip auctions.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: '🏅',
    link: 'https://jito.network',
    tvl: 'Block Engine',
  },
]

export default function Partners() {
  return (
    <section id="partners" className="py-24 relative">
      <div className="absolute left-0 top-1/2 w-[500px] h-[500px] rounded-full bg-olympus-gold/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-olympus-gold text-sm font-semibold uppercase tracking-widest mb-4 block">
            Ecosystem
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Built on the{' '}
            <span className="text-gold-gradient">Best of Solana</span>
          </h2>
          <p className="text-olympus-text-dim text-lg max-w-2xl mx-auto">
            Every Olympus component is powered by the top-tier protocols in the Solana ecosystem, integrated natively for maximum performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`group relative bg-olympus-card border rounded-2xl p-6 overflow-hidden transition-all duration-300 hover:shadow-card ${partner.border} hover:scale-[1.02]`}
            >
              <div className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${partner.bg}`} style={{ opacity: 0 }} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${partner.bg} border ${partner.border}`}>
                    {partner.icon}
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${partner.bg} ${partner.color} border ${partner.border}`}>
                    {partner.tvl}
                  </span>
                </div>

                <div className="mb-3">
                  <h3 className={`text-lg font-bold ${partner.color}`}>{partner.name}</h3>
                  <p className="text-olympus-text-dim text-xs font-medium mt-0.5">{partner.role}</p>
                </div>

                <p className="text-olympus-text-dim text-sm leading-relaxed mb-4">{partner.description}</p>

                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-xs font-medium ${partner.color} hover:opacity-80 transition-opacity`}
                >
                  Learn more <ExternalLink size={10} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 relative overflow-hidden rounded-3xl border border-olympus-gold/30 bg-olympus-card p-10 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-olympus-gold/5 via-transparent to-olympus-gold/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-olympus-gold to-transparent" />

          <div className="relative z-10">
            <div className="text-4xl mb-4">🏛️</div>
            <h3 className="text-2xl font-bold text-olympus-text mb-3">
              One Platform. Six Protocol Integrations.
            </h3>
            <p className="text-olympus-text-dim max-w-xl mx-auto text-sm leading-relaxed">
              Olympus is not a bridge or a wrapper — it is a native integration layer that orchestrates all six protocols in a single, seamless flow. Your capital flows through the best infrastructure Solana has built.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
