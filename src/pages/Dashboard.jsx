import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, ChevronRight, Bell } from 'lucide-react'
import Sidebar from '../components/dashboard/Sidebar'
import PortfolioOverview from '../components/dashboard/PortfolioOverview'
import VaultsList from '../components/dashboard/VaultsList'
import ZapModal from '../components/dashboard/ZapModal'
import Analytics from '../components/dashboard/Analytics'
import MarketIntel from '../components/dashboard/MarketIntel'
import Activity from '../components/dashboard/Activity'

export default function Dashboard({ walletConnected, walletAddress, onConnect }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [zapOpen, setZapOpen] = useState(false)
  const [zapVault, setZapVault] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [manageVault, setManageVault] = useState(null)

  const handleZapOpen = (vault = null) => {
    setZapVault(vault)
    setZapOpen(true)
  }

  const handleZapClose = () => {
    setZapOpen(false)
    setZapVault(null)
  }

  const handleManage = (vault) => {
    setManageVault(vault)
  }

  const TAB_LABELS = {
    overview: 'Overview',
    vaults: 'Vaults',
    zap: 'Zap Deposit',
    analytics: 'Analytics',
    intel: 'Market Intel',
    activity: 'Activity',
  }

  return (
    <div className="flex h-screen bg-olympus-bg overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            if (tab === 'zap') {
              handleZapOpen()
            } else {
              setActiveTab(tab)
            }
          }}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            <motion.div
              initial={{ x: -220 }}
              animate={{ x: 0 }}
              exit={{ x: -220 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 md:hidden"
            >
              <Sidebar
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  if (tab === 'zap') {
                    handleZapOpen()
                  } else {
                    setActiveTab(tab)
                  }
                  setMobileMenuOpen(false)
                }}
                collapsed={false}
                setCollapsed={() => setMobileMenuOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 h-16 bg-olympus-surface border-b border-olympus-border flex items-center justify-between px-4 sm:px-6">
          {/* Left: mobile menu + breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-olympus-text-dim hover:text-olympus-gold p-1"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-olympus-text-dim">Dashboard</span>
              <ChevronRight size={14} className="text-olympus-text-dim" />
              <span className="text-olympus-gold font-semibold">{TAB_LABELS[activeTab]}</span>
            </div>
          </div>

          {/* Right: wallet + actions */}
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-lg border border-olympus-border flex items-center justify-center text-olympus-text-dim hover:text-olympus-gold hover:border-olympus-gold/30 transition-all">
              <Bell size={15} />
            </button>

            {walletConnected ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-olympus-card border border-olympus-border">
                <div className="w-2 h-2 rounded-full bg-olympus-green animate-pulse" />
                <span className="text-olympus-text-dim text-xs font-mono hidden sm:block">{walletAddress}</span>
                <span className="text-olympus-text-dim text-xs font-mono sm:hidden">Connected</span>
              </div>
            ) : (
              <button
                onClick={onConnect}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-olympus-gold to-olympus-amber text-olympus-bg font-bold text-sm hover:shadow-gold transition-all"
              >
                <Zap size={14} /> Connect
              </button>
            )}

            <button
              onClick={() => handleZapOpen()}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-olympus-gold/10 border border-olympus-gold/30 text-olympus-gold font-bold text-sm hover:bg-olympus-gold/15 transition-all"
            >
              <Zap size={14} /> Zap
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {activeTab === 'overview' && (
                  <PortfolioOverview
                    onZapOpen={() => handleZapOpen()}
                    setActiveTab={setActiveTab}
                  />
                )}
                {activeTab === 'vaults' && (
                  <VaultsList
                    onZap={handleZapOpen}
                    onManage={handleManage}
                  />
                )}
                {activeTab === 'analytics' && <Analytics />}
                {activeTab === 'intel' && <MarketIntel />}
                {activeTab === 'activity' && <Activity />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Zap Modal */}
      <ZapModal
        isOpen={zapOpen}
        onClose={handleZapClose}
        preselectedVault={zapVault}
      />

      {/* Manage vault modal (basic) */}
      <AnimatePresence>
        {manageVault && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setManageVault(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md bg-olympus-bg border border-olympus-border rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-olympus-border">
                <div>
                  <h2 className="text-olympus-text font-bold">Manage Position</h2>
                  <p className="text-olympus-text-dim text-xs mt-0.5">{manageVault.name}</p>
                </div>
                <button
                  onClick={() => setManageVault(null)}
                  className="w-8 h-8 rounded-lg border border-olympus-border flex items-center justify-center text-olympus-text-dim hover:text-olympus-text transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4">
                {/* Position summary */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Deposited', value: `$${manageVault.myDeposit.toLocaleString()}`, color: 'text-olympus-gold' },
                    { label: 'Earned', value: `$${manageVault.myEarned.toFixed(2)}`, color: 'text-olympus-green' },
                    { label: 'Current APY', value: `${manageVault.apy}%`, color: 'text-olympus-cyan' },
                    { label: 'Utilization', value: `${manageVault.utilization}%`, color: 'text-olympus-amber' },
                  ].map((item) => (
                    <div key={item.label} className="p-3 bg-olympus-card border border-olympus-border rounded-xl">
                      <p className="text-olympus-text-dim text-xs mb-1">{item.label}</p>
                      <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button
                    onClick={() => { handleZapOpen(manageVault); setManageVault(null) }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-olympus-gold to-olympus-amber text-olympus-bg font-bold text-sm hover:shadow-gold transition-all"
                  >
                    <Zap size={16} /> Add More via Zap
                  </button>
                  <button
                    onClick={() => setManageVault(null)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-olympus-border text-olympus-text-dim hover:text-olympus-text hover:border-olympus-gold/30 text-sm font-medium transition-all"
                  >
                    Withdraw Position
                  </button>
                </div>

                <p className="text-olympus-text-dim text-xs text-center">
                  Range: <span className="text-olympus-text font-medium">{manageVault.range}</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
