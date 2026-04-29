import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, TrendingUp, Shield, Zap } from 'lucide-react'
import VaultCard from './VaultCard'
import { mockVaults } from '../../data/mockData'

const CATEGORIES = ['All', 'Stable', 'Blue Chip', 'LST', 'Degen']
const SORTS = [
  { label: 'Highest APY', key: 'apy', dir: -1 },
  { label: 'Lowest Risk', key: 'risk', dir: 1, order: ['Low', 'Medium', 'High'] },
  { label: 'Highest TVL', key: 'tvl', dir: -1 },
  { label: 'My Positions', key: 'myDeposit', dir: -1 },
]

export default function VaultsList({ onZap, onManage }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortIdx, setSortIdx] = useState(0)

  const filtered = mockVaults
    .filter((v) => {
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
        v.tokens.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchCat = category === 'All' || v.category === category
      return matchSearch && matchCat
    })
    .sort((a, b) => {
      const sort = SORTS[sortIdx]
      if (sort.order) {
        return (sort.order.indexOf(a[sort.key]) - sort.order.indexOf(b[sort.key])) * sort.dir
      }
      return (a[sort.key] - b[sort.key]) * sort.dir
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-olympus-text">Kamino Vaults</h2>
        <p className="text-olympus-text-dim text-sm mt-1">Curated auto-rebalancing vaults powered by Kamino Finance</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-olympus-text-dim" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search vaults, tokens..."
            className="w-full pl-10 pr-4 py-2.5 bg-olympus-card border border-olympus-border rounded-xl text-olympus-text text-sm placeholder:text-olympus-text-dim focus:outline-none focus:border-olympus-gold/40 transition-colors"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1 p-1 bg-olympus-card border border-olympus-border rounded-xl">
          <SlidersHorizontal size={14} className="text-olympus-text-dim ml-2 flex-shrink-0" />
          {SORTS.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setSortIdx(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                sortIdx === i
                  ? 'bg-olympus-gold/20 text-olympus-gold'
                  : 'text-olympus-text-dim hover:text-olympus-text'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              category === cat
                ? 'bg-olympus-gold/15 text-olympus-gold border-olympus-gold/30'
                : 'bg-olympus-card text-olympus-text-dim border-olympus-border hover:border-olympus-gold/20 hover:text-olympus-text'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: <Zap size={14} />, label: `${filtered.length} Vaults`, color: 'text-olympus-gold' },
          { icon: <TrendingUp size={14} />, label: `${(filtered.reduce((a, v) => a + v.apy, 0) / filtered.length).toFixed(1)}% Avg APY`, color: 'text-olympus-green' },
          { icon: <Shield size={14} />, label: `$${(filtered.reduce((a, v) => a + v.tvl, 0) / 1000000).toFixed(1)}M Total TVL`, color: 'text-olympus-cyan' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-olympus-card border border-olympus-border">
            <span className={item.color}>{item.icon}</span>
            <span className={`text-xs font-semibold ${item.color}`}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Vault grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((vault, i) => (
          <motion.div
            key={vault.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <VaultCard vault={vault} onZap={onZap} onManage={onManage} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-olympus-text-dim">
          <Shield size={40} className="mx-auto mb-4 opacity-30" />
          <p>No vaults match your filters.</p>
        </div>
      )}
    </div>
  )
}
