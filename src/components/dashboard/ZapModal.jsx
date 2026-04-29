import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Zap, ArrowDown, ChevronDown, CheckCircle2, AlertTriangle, Loader2
} from 'lucide-react'
import { mockVaults, mockTokenBalances } from '../../data/mockData'

const ZAP_STEPS = [
  { id: 'idle', label: '' },
  { id: 'simulating', label: 'Simulating transaction...' },
  { id: 'approving', label: 'Awaiting wallet approval...' },
  { id: 'routing', label: 'Routing via DFlow...' },
  { id: 'depositing', label: 'Depositing to Kamino vault...' },
  { id: 'success', label: 'Deposit successful!' },
  { id: 'error', label: 'Transaction failed.' },
]

export default function ZapModal({ isOpen, onClose, preselectedVault }) {
  const [selectedToken, setSelectedToken] = useState(mockTokenBalances[0])
  const [selectedVault, setSelectedVault] = useState(preselectedVault || mockVaults[0])
  const [amount, setAmount] = useState('')
  const [step, setStep] = useState('idle')
  const [showTokenPicker, setShowTokenPicker] = useState(false)
  const [showVaultPicker, setShowVaultPicker] = useState(false)
  const [slippage, setSlippage] = useState('0.5')

  useEffect(() => {
    if (preselectedVault) setSelectedVault(preselectedVault)
  }, [preselectedVault])

  const maxAmount = selectedToken.balance
  const amountNum = parseFloat(amount) || 0
  const estimatedOut = amountNum * selectedToken.usdPrice / (selectedVault.tokens[0] === 'USDC' ? 1 : 20)
  const priceImpact = amountNum > 1000 ? 0.12 : 0.04
  const fee = amountNum * selectedToken.usdPrice * 0.001

  const handleZap = async () => {
    if (!amountNum || amountNum > maxAmount) return
    const steps = ['simulating', 'approving', 'routing', 'depositing', 'success']
    for (const s of steps) {
      setStep(s)
      await new Promise((r) => setTimeout(r, s === 'approving' ? 1500 : 900))
    }
    setTimeout(() => {
      setStep('idle')
      setAmount('')
      onClose()
    }, 2500)
  }

  const usdValue = amountNum * selectedToken.usdPrice

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-md bg-olympus-bg border border-olympus-border rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-olympus-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-olympus-gold/15 flex items-center justify-center">
                  <Zap size={16} className="text-olympus-gold" />
                </div>
                <div>
                  <h2 className="text-olympus-text font-bold">Zap Deposit</h2>
                  <p className="text-olympus-text-dim text-xs">Powered by DFlow routing</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg border border-olympus-border flex items-center justify-center text-olympus-text-dim hover:text-olympus-text transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Success state */}
              {step === 'success' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-olympus-green/15 border border-olympus-green/30 flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-olympus-green" />
                  </div>
                  <h3 className="text-olympus-text text-xl font-bold mb-2">Deposit Successful!</h3>
                  <p className="text-olympus-text-dim text-sm">
                    Your funds are now earning in the <span className="text-olympus-gold font-semibold">{selectedVault.name}</span> vault.
                  </p>
                  <p className="text-olympus-green font-bold mt-3">{selectedVault.apy}% APY</p>
                </motion.div>
              ) : (
                <>
                  {/* Source token input */}
                  <div className="p-4 bg-olympus-card border border-olympus-border rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-olympus-text-dim text-xs">You deposit</span>
                      <button
                        onClick={() => setAmount(String(maxAmount))}
                        className="text-xs text-olympus-gold hover:underline font-medium"
                      >
                        Max: {maxAmount} {selectedToken.symbol}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="flex-1 bg-transparent text-2xl font-bold text-olympus-text placeholder:text-olympus-text-dim focus:outline-none"
                      />

                      {/* Token picker trigger */}
                      <div className="relative">
                        <button
                          onClick={() => setShowTokenPicker(!showTokenPicker)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-olympus-surface border border-olympus-border hover:border-olympus-gold/30 transition-all"
                        >
                          <span className="text-lg">{selectedToken.icon}</span>
                          <span className="text-olympus-text font-bold text-sm">{selectedToken.symbol}</span>
                          <ChevronDown size={14} className="text-olympus-text-dim" />
                        </button>

                        <AnimatePresence>
                          {showTokenPicker && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute right-0 top-full mt-1 w-48 bg-olympus-bg border border-olympus-border rounded-xl overflow-hidden shadow-xl z-20"
                            >
                              {mockTokenBalances.map((tok) => (
                                <button
                                  key={tok.symbol}
                                  onClick={() => { setSelectedToken(tok); setShowTokenPicker(false) }}
                                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-olympus-card text-left transition-colors"
                                >
                                  <div className="flex items-center gap-2">
                                    <span>{tok.icon}</span>
                                    <span className="text-olympus-text text-sm font-medium">{tok.symbol}</span>
                                  </div>
                                  <span className="text-olympus-text-dim text-xs">{tok.balance}</span>
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {amountNum > 0 && (
                      <p className="text-olympus-text-dim text-xs mt-1">≈ ${usdValue.toFixed(2)} USD</p>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <div className="w-9 h-9 rounded-xl border border-olympus-border bg-olympus-card flex items-center justify-center text-olympus-gold">
                      <ArrowDown size={18} />
                    </div>
                  </div>

                  {/* Target vault */}
                  <div className="p-4 bg-olympus-card border border-olympus-border rounded-2xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-olympus-text-dim text-xs">Into vault</span>
                      <span className="text-olympus-gold text-xs font-bold">{selectedVault.apy}% APY</span>
                    </div>

                    <div className="relative">
                      <button
                        onClick={() => setShowVaultPicker(!showVaultPicker)}
                        className="w-full flex items-center justify-between p-3 bg-olympus-surface border border-olympus-border rounded-xl hover:border-olympus-gold/30 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-olympus-gold/10 flex items-center justify-center">
                            <span className="text-olympus-gold font-bold text-xs">K</span>
                          </div>
                          <div className="text-left">
                            <p className="text-olympus-text font-semibold text-sm">{selectedVault.name}</p>
                            <p className="text-olympus-text-dim text-xs">{selectedVault.tokens.join(' / ')}</p>
                          </div>
                        </div>
                        <ChevronDown size={14} className="text-olympus-text-dim" />
                      </button>

                      <AnimatePresence>
                        {showVaultPicker && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute left-0 right-0 top-full mt-1 bg-olympus-bg border border-olympus-border rounded-xl overflow-hidden shadow-xl z-20 max-h-56 overflow-y-auto"
                          >
                            {mockVaults.map((v) => (
                              <button
                                key={v.id}
                                onClick={() => { setSelectedVault(v); setShowVaultPicker(false) }}
                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-olympus-card text-left transition-colors"
                              >
                                <span className="text-olympus-text text-sm font-medium">{v.name}</span>
                                <span className="text-olympus-gold font-bold text-sm">{v.apy}%</span>
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Route summary */}
                  {amountNum > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 bg-olympus-surface/50 border border-olympus-border rounded-xl space-y-2 text-xs"
                    >
                      <div className="flex justify-between">
                        <span className="text-olympus-text-dim">Route</span>
                        <span className="text-olympus-text">
                          {selectedToken.symbol} → {selectedVault.tokens[0]} via DFlow
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-olympus-text-dim">Price Impact</span>
                        <span className={priceImpact > 0.1 ? 'text-olympus-amber' : 'text-olympus-green'}>
                          {priceImpact}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-olympus-text-dim">Protocol Fee</span>
                        <span className="text-olympus-text">${fee.toFixed(4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-olympus-text-dim">Slippage</span>
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={slippage}
                            onChange={(e) => setSlippage(e.target.value)}
                            className="w-10 bg-transparent text-olympus-text text-right focus:outline-none"
                          />
                          <span className="text-olympus-text-dim">%</span>
                        </div>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-olympus-border">
                        <span className="text-olympus-text font-semibold">You earn est.</span>
                        <span className="text-olympus-green font-bold">
                          ~${((usdValue * selectedVault.apy) / 100 / 365).toFixed(4)}/day
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit button */}
                  <button
                    onClick={handleZap}
                    disabled={!amountNum || amountNum > maxAmount || step !== 'idle'}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-olympus-gold to-olympus-amber text-olympus-bg font-bold text-base hover:shadow-gold-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {step !== 'idle' ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {ZAP_STEPS.find((s) => s.id === step)?.label}
                      </>
                    ) : (
                      <>
                        <Zap size={18} />
                        {amountNum > maxAmount ? 'Insufficient Balance' : `Zap ${amount || '0'} ${selectedToken.symbol}`}
                      </>
                    )}
                  </button>

                  {/* Safety notice */}
                  <p className="flex items-center gap-1.5 text-olympus-text-dim text-xs text-center justify-center">
                    <AlertTriangle size={12} className="flex-shrink-0" />
                    Transaction is simulated before signature via Solflare
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
