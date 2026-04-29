import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'
import {
  DollarSign, TrendingUp, Zap, Activity, ArrowUpRight
} from 'lucide-react'
import StatCard from '../ui/StatCard'
import { mockPortfolio, mockChartData, mockVaults } from '../../data/mockData'

const PERIODS = ['7D', '30D', 'All']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-olympus-card border border-olympus-border rounded-xl p-3 shadow-card">
        <p className="text-olympus-text-dim text-xs mb-1">{label}</p>
        <p className="text-olympus-gold font-bold text-sm">${payload[0].value.toLocaleString()}</p>
      </div>
    )
  }
  return null
}

export default function PortfolioOverview({ onZapOpen, setActiveTab }) {
  const [period, setPeriod] = useState('30D')
  const activeVaults = mockVaults.filter(v => v.myDeposit > 0)

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Portfolio Value"
          value={`$${mockPortfolio.totalValue.toLocaleString()}`}
          change="+2.4%"
          changePositive={true}
          subValue="Across 3 active vaults"
          icon={<DollarSign size={16} />}
          accent="gold"
          delay={0}
        />
        <StatCard
          label="Total Earned"
          value={`$${mockPortfolio.totalEarned.toLocaleString()}`}
          change={`+${mockPortfolio.totalEarnedPercent}%`}
          changePositive={true}
          subValue="All time yield"
          icon={<TrendingUp size={16} />}
          accent="green"
          delay={0.05}
        />
        <StatCard
          label="Daily Yield"
          value={`$${mockPortfolio.dailyYield}`}
          change="+5.1% vs 7d avg"
          changePositive={true}
          subValue="Current run rate"
          icon={<Activity size={16} />}
          accent="cyan"
          delay={0.1}
        />
        <StatCard
          label="Avg APY"
          value={`${mockPortfolio.avgApy}%`}
          subValue={`${mockPortfolio.activePositions} active positions`}
          icon={<Zap size={16} />}
          accent="amber"
          delay={0.15}
        />
      </div>

      {/* Chart + positions row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-olympus-card border border-olympus-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-olympus-text font-bold">Portfolio Value</h3>
              <p className="text-olympus-text-dim text-xs mt-1">Total assets under management</p>
            </div>
            <div className="flex gap-1">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    period === p
                      ? 'bg-olympus-gold/20 text-olympus-gold border border-olympus-gold/30'
                      : 'text-olympus-text-dim hover:text-olympus-text'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={mockChartData.portfolio}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.06)" />
              <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#C9A84C"
                strokeWidth={2}
                fill="url(#goldGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Active positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-olympus-card border border-olympus-border rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-olympus-text font-bold">Active Positions</h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-olympus-gold/10 text-olympus-gold border border-olympus-gold/20">
              {activeVaults.length} vaults
            </span>
          </div>

          <div className="space-y-4">
            {activeVaults.map((vault) => {
              const pct = (vault.myDeposit / mockPortfolio.totalValue * 100).toFixed(1)
              return (
                <div key={vault.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-olympus-text text-sm font-medium">{vault.name}</span>
                    <span className="text-olympus-gold text-sm font-bold">${vault.myDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-olympus-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-olympus-gold to-olympus-amber rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-olympus-text-dim text-xs w-10 text-right">{pct}%</span>
                  </div>
                  <div className="flex justify-between text-xs text-olympus-text-dim">
                    <span className="text-olympus-green">+${vault.myEarned.toFixed(2)} earned</span>
                    <span className="text-olympus-gold font-medium">{vault.apy}% APY</span>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => setActiveTab('vaults')}
            className="w-full mt-5 py-2.5 rounded-xl border border-olympus-border text-olympus-text-dim hover:text-olympus-gold hover:border-olympus-gold/30 text-sm font-medium transition-all flex items-center justify-center gap-2"
          >
            View All Vaults <ArrowUpRight size={14} />
          </button>
        </motion.div>
      </div>

      {/* Quick action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative overflow-hidden rounded-2xl border border-olympus-gold/30 bg-olympus-card p-6"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-olympus-gold/5 to-transparent" />
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-olympus-gold to-olympus-amber" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-olympus-gold" />
              <h3 className="text-olympus-text font-bold">Quick Zap Deposit</h3>
            </div>
            <p className="text-olympus-text-dim text-sm">
              Deposit any token into the best Kamino vaults in one click. DFlow handles the routing.
            </p>
          </div>
          <button
            onClick={onZapOpen}
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-olympus-gold to-olympus-amber text-olympus-bg font-bold text-sm hover:shadow-gold-lg transition-all flex items-center gap-2"
          >
            <Zap size={16} /> Zap Now
          </button>
        </div>
      </motion.div>
    </div>
  )
}
