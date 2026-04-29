import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Layers,
  Zap,
  BarChart3,
  Activity,
  TrendingUp,
  Settings,
  ChevronLeft,
  Bell,
} from 'lucide-react'

const NAV_ITEMS = [
  { icon: <LayoutDashboard size={18} />, label: 'Overview', tab: 'overview' },
  { icon: <Layers size={18} />, label: 'Vaults', tab: 'vaults' },
  { icon: <Zap size={18} />, label: 'Zap Deposit', tab: 'zap' },
  { icon: <BarChart3 size={18} />, label: 'Analytics', tab: 'analytics' },
  { icon: <TrendingUp size={18} />, label: 'Market Intel', tab: 'intel' },
  { icon: <Activity size={18} />, label: 'Activity', tab: 'activity' },
]

export default function Sidebar({ activeTab, setActiveTab, collapsed, setCollapsed }) {
  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 220 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="flex-shrink-0 h-full bg-olympus-surface border-r border-olympus-border flex flex-col relative overflow-hidden"
    >
      {/* Logo area */}
      <div className={`h-16 flex items-center border-b border-olympus-border px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-olympus-gold to-olympus-amber flex items-center justify-center">
              <span className="text-olympus-bg font-bold text-xs">Ω</span>
            </div>
            <span className="font-bold text-sm text-olympus-text">Olympus</span>
          </div>
        )}
        {collapsed && (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-olympus-gold to-olympus-amber flex items-center justify-center">
            <span className="text-olympus-bg font-bold text-xs">Ω</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-olympus-text-dim hover:text-olympus-gold transition-colors p-1"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }}>
            <ChevronLeft size={14} />
          </motion.div>
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === item.tab
                ? 'bg-olympus-gold/15 text-olympus-gold border border-olympus-gold/20'
                : 'text-olympus-text-dim hover:text-olympus-text hover:bg-olympus-card'
            }`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="truncate"
              >
                {item.label}
              </motion.span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="p-2 border-t border-olympus-border space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-olympus-text-dim hover:text-olympus-text hover:bg-olympus-card transition-all">
          <Bell size={18} />
          {!collapsed && <span>Notifications</span>}
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-olympus-text-dim hover:text-olympus-text hover:bg-olympus-card transition-all">
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </button>
        {!collapsed && (
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-olympus-text-dim hover:text-olympus-text hover:bg-olympus-card transition-all"
          >
            <ChevronLeft size={18} />
            <span>Back to Home</span>
          </Link>
        )}
      </div>
    </motion.aside>
  )
}
