import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownToLine, ArrowUpFromLine, Repeat, CheckCircle2, Clock, ExternalLink } from 'lucide-react'
import { mockActivity } from '../../data/mockData'

const TX_ICONS = {
  deposit: <ArrowDownToLine size={16} />,
  withdraw: <ArrowUpFromLine size={16} />,
  compound: <Repeat size={16} />,
  harvest: <CheckCircle2 size={16} />,
}

const TX_COLORS = {
  deposit: 'text-olympus-green bg-olympus-green/10 border-olympus-green/20',
  withdraw: 'text-red-400 bg-red-500/10 border-red-500/20',
  compound: 'text-olympus-cyan bg-olympus-cyan/10 border-olympus-cyan/20',
  harvest: 'text-olympus-amber bg-olympus-amber/10 border-olympus-amber/20',
}

const FILTERS = ['All', 'Deposits', 'Withdrawals', 'Compounds', 'Harvests']

export default function Activity() {
  const [filter, setFilter] = useState('All')

  const filtered = mockActivity.filter((tx) => {
    if (filter === 'All') return true
    if (filter === 'Deposits') return tx.type === 'deposit'
    if (filter === 'Withdrawals') return tx.type === 'withdraw'
    if (filter === 'Compounds') return tx.type === 'compound'
    if (filter === 'Harvests') return tx.type === 'harvest'
    return true
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-olympus-text">Transaction History</h2>
        <p className="text-olympus-text-dim text-sm mt-1">All on-chain activity across your Olympus positions</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              filter === f
                ? 'bg-olympus-gold/15 text-olympus-gold border-olympus-gold/30'
                : 'bg-olympus-card text-olympus-text-dim border-olympus-border hover:border-olympus-gold/20 hover:text-olympus-text'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Deposits', value: '$12,450', color: 'text-olympus-green' },
          { label: 'Total Harvested', value: '$1,234.50', color: 'text-olympus-amber' },
          { label: 'Total Compounds', value: '47', color: 'text-olympus-cyan' },
          { label: 'Total Txs', value: mockActivity.length.toString(), color: 'text-olympus-gold' },
        ].map((stat) => (
          <div key={stat.label} className="bg-olympus-card border border-olympus-border rounded-xl p-4">
            <p className="text-olympus-text-dim text-xs mb-1">{stat.label}</p>
            <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Transaction list */}
      <div className="space-y-2">
        {filtered.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="flex items-center gap-4 p-4 bg-olympus-card border border-olympus-border rounded-xl hover:border-olympus-gold/20 transition-all"
          >
            {/* Icon */}
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border flex-shrink-0 ${TX_COLORS[tx.type]}`}>
              {TX_ICONS[tx.type]}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-olympus-text font-semibold text-sm capitalize">{tx.type}</p>
                <span className="text-olympus-text-dim text-xs">·</span>
                <p className="text-olympus-text-dim text-xs truncate">{tx.vault}</p>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <Clock size={10} className="text-olympus-text-dim" />
                <p className="text-olympus-text-dim text-xs">{tx.time}</p>
              </div>
            </div>

            {/* Amount */}
            <div className="text-right flex-shrink-0">
              <p className={`font-bold text-sm ${tx.type === 'withdraw' ? 'text-red-400' : 'text-olympus-green'}`}>
                {tx.type === 'withdraw' ? '-' : '+'}{tx.amount} {tx.token}
              </p>
              <p className="text-olympus-text-dim text-xs">${tx.usdValue.toFixed(2)}</p>
            </div>

            {/* Explorer link */}
            <a
              href={`https://solscan.io/tx/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-olympus-text-dim hover:text-olympus-gold transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-olympus-text-dim">
          <CheckCircle2 size={40} className="mx-auto mb-4 opacity-30" />
          <p>No transactions match your filter.</p>
        </div>
      )}
    </div>
  )
}
