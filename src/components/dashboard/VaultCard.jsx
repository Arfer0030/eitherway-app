import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Shield, Zap, ChevronDown, ExternalLink, Info } from 'lucide-react'
import TokenBadge from '../ui/TokenBadge'

const RISK_STYLES = {
  Low: 'text-olympus-green bg-olympus-green/10 border-olympus-green/20',
  Medium: 'text-olympus-amber bg-olympus-amber/10 border-olympus-amber/20',
  High: 'text-red-400 bg-red-500/10 border-red-500/20',
}

const APY_COLOR = (apy) => {
  if (apy >= 80) return 'text-red-400'
  if (apy >= 40) return 'text-olympus-amber'
  if (apy >= 20) return 'text-olympus-green'
  return 'text-olympus-cyan'
}

export default function VaultCard({ vault, onZap, onManage }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      className="bg-olympus-card border border-olympus-border rounded-2xl overflow-hidden hover:border-olympus-gold/30 transition-all duration-300 hover:shadow-card"
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {vault.tokens.map((token) => (
                <TokenBadge key={token} token={token} size="xs" />
              ))}
            </div>
            <div>
              <h3 className="text-olympus-text font-bold text-sm">{vault.name}</h3>
              <p className="text-olympus-text-dim text-xs">{vault.strategy}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${RISK_STYLES[vault.risk]}`}>
              {vault.risk}
            </span>
            <div className="flex items-center gap-1 w-2 h-2 rounded-full bg-olympus-green">
              <div className="w-2 h-2 rounded-full bg-olympus-green animate-ping absolute" style={{ opacity: 0.6 }} />
            </div>
          </div>
        </div>

        {/* APY display */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className={`text-3xl font-black ${APY_COLOR(vault.apy)}`}>
              {vault.apy}%
              <span className="text-sm font-semibold text-olympus-text-dim ml-1">APY</span>
            </div>
            <div className="flex gap-3 mt-1 text-xs text-olympus-text-dim">
              <span>Base: <span className="text-olympus-text">{vault.apyBase}%</span></span>
              <span>Rewards: <span className="text-olympus-gold">{vault.apyReward}%</span></span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-olympus-text-dim text-xs">TVL</p>
            <p className="text-olympus-text font-bold text-sm">
              ${(vault.tvl / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>

        {/* Utilization */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-olympus-text-dim">Utilization</span>
            <span className="text-olympus-text font-medium">{vault.utilization}%</span>
          </div>
          <div className="h-1.5 bg-olympus-border rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                vault.utilization > 85 ? 'bg-olympus-amber' : 'bg-gradient-to-r from-olympus-gold to-olympus-amber'
              }`}
              style={{ width: `${vault.utilization}%` }}
            />
          </div>
        </div>

        {/* My position (if any) */}
        {vault.myDeposit > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-olympus-gold/5 border border-olympus-gold/15">
            <p className="text-olympus-gold text-xs font-semibold mb-1">Your Position</p>
            <div className="flex justify-between text-sm">
              <span className="text-olympus-text">${vault.myDeposit.toLocaleString()}</span>
              <span className="text-olympus-green">+${vault.myEarned.toFixed(2)} earned</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onZap(vault)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-olympus-gold to-olympus-amber text-olympus-bg font-bold text-sm hover:shadow-gold transition-all"
          >
            <Zap size={14} /> Zap Deposit
          </button>
          {vault.myDeposit > 0 && (
            <button
              onClick={() => onManage(vault)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-olympus-border text-olympus-text-dim hover:text-olympus-gold hover:border-olympus-gold/30 text-sm transition-all"
            >
              Manage
            </button>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center px-3 py-2.5 rounded-xl border border-olympus-border text-olympus-text-dim hover:text-olympus-gold hover:border-olympus-gold/30 transition-all"
          >
            <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
              <ChevronDown size={16} />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-olympus-border p-5 space-y-4">
              <p className="text-olympus-text-dim text-sm leading-relaxed">{vault.description}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-olympus-surface border border-olympus-border">
                  <p className="text-olympus-text-dim text-xs mb-1">Protocol</p>
                  <p className="text-olympus-text font-semibold text-sm">{vault.protocol}</p>
                </div>
                <div className="p-3 rounded-xl bg-olympus-surface border border-olympus-border">
                  <p className="text-olympus-text-dim text-xs mb-1">Category</p>
                  <p className="text-olympus-text font-semibold text-sm">{vault.category}</p>
                </div>
                <div className="p-3 rounded-xl bg-olympus-surface border border-olympus-border">
                  <p className="text-olympus-text-dim text-xs mb-1">Range</p>
                  <p className="text-olympus-text font-semibold text-sm">{vault.range}</p>
                </div>
                <div className="p-3 rounded-xl bg-olympus-surface border border-olympus-border">
                  <p className="text-olympus-text-dim text-xs mb-1">24h Change</p>
                  <p className={`font-semibold text-sm ${vault.change24h >= 0 ? 'text-olympus-green' : 'text-red-400'}`}>
                    {vault.change24h >= 0 ? '+' : ''}{vault.change24h}%
                  </p>
                </div>
              </div>

              <a
                href="https://kamino.finance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-olympus-gold text-xs font-medium hover:opacity-80 transition-opacity"
              >
                View on Kamino <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
