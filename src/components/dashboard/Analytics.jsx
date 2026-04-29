import React from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend
} from 'recharts'
import { mockChartData } from '../../data/mockData'

const COLORS = ['#C9A84C', '#26C6DA', '#66BB6A', '#F59E0B']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-olympus-card border border-olympus-border rounded-xl p-3 shadow-card">
        <p className="text-olympus-text-dim text-xs mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="font-bold text-sm" style={{ color: p.color }}>${p.value.toFixed(2)}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-olympus-text">Analytics</h2>
        <p className="text-olympus-text-dim text-sm mt-1">Detailed performance metrics across all positions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily yield bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-olympus-card border border-olympus-border rounded-2xl p-6"
        >
          <h3 className="text-olympus-text font-bold mb-1">Daily Yield Earned</h3>
          <p className="text-olympus-text-dim text-xs mb-5">Last 14 days</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockChartData.dailyYield}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.06)" />
              <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="yield" fill="#C9A84C" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* APY trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-olympus-card border border-olympus-border rounded-2xl p-6"
        >
          <h3 className="text-olympus-text font-bold mb-1">APY Over Time</h3>
          <p className="text-olympus-text-dim text-xs mb-5">Portfolio-weighted average APY</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={mockChartData.apyHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.06)" />
              <XAxis dataKey="date" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="apy" stroke="#26C6DA" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Allocation pie */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-olympus-card border border-olympus-border rounded-2xl p-6"
        >
          <h3 className="text-olympus-text font-bold mb-1">Portfolio Allocation</h3>
          <p className="text-olympus-text-dim text-xs mb-5">By vault strategy</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={mockChartData.allocation}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={3}
                dataKey="value"
              >
                {mockChartData.allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              <Legend formatter={(val) => <span style={{ color: '#94A3B8', fontSize: '12px' }}>{val}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Multi-vault APY comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-olympus-card border border-olympus-border rounded-2xl p-6"
        >
          <h3 className="text-olympus-text font-bold mb-1">Vault APY Comparison</h3>
          <p className="text-olympus-text-dim text-xs mb-5">7-day average</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockChartData.vaultComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.06)" />
              <XAxis type="number" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#94A3B8', fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar dataKey="apy" fill="#C9A84C" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Compound growth projection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-olympus-card border border-olympus-border rounded-2xl p-6"
      >
        <h3 className="text-olympus-text font-bold mb-1">Compound Growth Projection</h3>
        <p className="text-olympus-text-dim text-xs mb-5">Estimated value if current APY is sustained (12 months)</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockChartData.projection}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(201,168,76,0.06)" />
            <XAxis dataKey="month" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
            <Line type="monotone" dataKey="value" stroke="#C9A84C" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="noCompound" stroke="#94A3B8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-olympus-text-dim text-xs mt-3 text-center">
          <span className="text-olympus-gold font-semibold">—</span> With auto-compound &nbsp;
          <span className="text-olympus-text-dim font-semibold">- -</span> Without compounding
        </p>
      </motion.div>
    </div>
  )
}
