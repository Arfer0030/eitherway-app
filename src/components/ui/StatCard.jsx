import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ label, value, subValue, change, changePositive, icon, accent = 'gold', delay = 0 }) {
  const accentColors = {
    gold: 'text-olympus-gold',
    cyan: 'text-olympus-cyan',
    green: 'text-olympus-green',
    amber: 'text-olympus-amber',
    blue: 'text-olympus-blue',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative bg-olympus-card border border-olympus-border rounded-2xl p-5 overflow-hidden group hover:border-olympus-gold/30 transition-all duration-300"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-card-gradient opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-olympus-gold/3 blur-2xl pointer-events-none group-hover:bg-olympus-gold/8 transition-all duration-500" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <span className="text-olympus-text-dim text-xs font-medium uppercase tracking-wider">{label}</span>
          {icon && (
            <span className={`${accentColors[accent]} opacity-70`}>{icon}</span>
          )}
        </div>

        <div className="flex items-end gap-3">
          <span className={`text-2xl font-bold ${accentColors[accent]}`}>{value}</span>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-xs font-semibold mb-1 ${changePositive ? 'text-olympus-green' : 'text-olympus-red'}`}>
              {changePositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {change}
            </div>
          )}
        </div>

        {subValue && (
          <p className="text-olympus-text-dim text-xs mt-1">{subValue}</p>
        )}
      </div>
    </motion.div>
  )
}
