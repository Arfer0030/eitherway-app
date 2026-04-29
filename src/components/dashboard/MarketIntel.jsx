import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, TrendingUp, TrendingDown, AlertCircle, BarChart2, RefreshCw } from 'lucide-react'
import { mockWhales, mockSignals, mockTokenStats } from '../../data/mockData'

export default function MarketIntel() {
  const [activeSignal, setActiveSignal] = useState(0)

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold text-olympus-text">Market Intelligence</h2>
          <span className="text-xs px-2.5 py-1 rounded-full bg-olympus-cyan/10 text-olympus-cyan border border-olympus-cyan/20 font-semibold">
            Birdeye Powered
          </span>
        </div>
        <p className="text-olympus-text-dim text-sm">Real-time whale tracking and smart money signals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: signals feed */}
        <div className="lg:col-span-2 space-y-4">
          {/* Token stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {mockTokenStats.map((tok, i) => (
              <motion.div
                key={tok.symbol}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-olympus-card border border-olympus-border rounded-xl p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-olympus-text font-bold text-sm">{tok.symbol}</span>
                  <span className={`text-xs font-semibold flex items-center gap-0.5 ${tok.change >= 0 ? 'text-olympus-green' : 'text-red-400'}`}>
                    {tok.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {Math.abs(tok.change)}%
                  </span>
                </div>
                <p className="text-olympus-text-dim text-xs">${tok.price.toLocaleString()}</p>
                <div className="mt-2 h-1 bg-olympus-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${tok.change >= 0 ? 'bg-olympus-green' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(Math.abs(tok.change) * 10, 100)}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Signal cards */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-olympus-text font-bold">Smart Money Signals</h3>
              <button className="flex items-center gap-1.5 text-olympus-text-dim hover:text-olympus-gold text-xs transition-colors">
                <RefreshCw size={12} /> Refresh
              </button>
            </div>

            <div className="space-y-3">
              {mockSignals.map((signal, i) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setActiveSignal(i)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    activeSignal === i
                      ? 'bg-olympus-card border-olympus-gold/30'
                      : 'bg-olympus-surface/50 border-olympus-border hover:border-olympus-gold/15'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      signal.type === 'bullish' ? 'bg-olympus-green/15 text-olympus-green' :
                      signal.type === 'bearish' ? 'bg-red-500/15 text-red-400' :
                      'bg-olympus-amber/15 text-olympus-amber'
                    }`}>
                      {signal.type === 'bullish' ? <TrendingUp size={16} /> :
                       signal.type === 'bearish' ? <TrendingDown size={16} /> :
                       <AlertCircle size={16} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-olympus-text font-semibold text-sm truncate">{signal.title}</p>
                        <span className="text-olympus-text-dim text-xs flex-shrink-0">{signal.time}</span>
                      </div>
                      <p className="text-olympus-text-dim text-xs mt-1 leading-relaxed">{signal.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className={`text-xs font-semibold ${
                          signal.type === 'bullish' ? 'text-olympus-green' :
                          signal.type === 'bearish' ? 'text-red-400' : 'text-olympus-amber'
                        }`}>
                          {signal.impact}
                        </span>
                        <span className="text-olympus-text-dim text-xs">{signal.token}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: whale tracker */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Eye size={16} className="text-olympus-cyan" />
              <h3 className="text-olympus-text font-bold">Whale Tracker</h3>
            </div>

            <div className="space-y-3">
              {mockWhales.map((whale, i) => (
                <motion.div
                  key={whale.address}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-3 bg-olympus-card border border-olympus-border rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${whale.type === 'buy' ? 'bg-olympus-green' : 'bg-red-400'}`} />
                      <span className="font-mono text-olympus-text text-xs">{whale.address}</span>
                    </div>
                    <span className="text-olympus-text-dim text-xs">{whale.time}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`text-sm font-bold ${whale.type === 'buy' ? 'text-olympus-green' : 'text-red-400'}`}>
                        {whale.type === 'buy' ? '↑ Buy' : '↓ Sell'}
                      </span>
                      <span className="text-olympus-text text-sm ml-2">{whale.token}</span>
                    </div>
                    <span className="text-olympus-text font-bold text-sm">${whale.amount.toLocaleString()}</span>
                  </div>

                  {whale.vault && (
                    <div className="mt-1.5 flex items-center gap-1">
                      <BarChart2 size={10} className="text-olympus-text-dim" />
                      <span className="text-olympus-text-dim text-xs">{whale.vault}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fear/Greed */}
          <div className="p-4 bg-olympus-card border border-olympus-border rounded-xl">
            <p className="text-olympus-text-dim text-xs mb-3 font-semibold uppercase tracking-wider">Solana DeFi Sentiment</p>
            <div className="flex items-center justify-between mb-2">
              <span className="text-olympus-text font-bold text-2xl">73</span>
              <span className="text-olympus-green text-sm font-semibold">Greed</span>
            </div>
            <div className="h-2 bg-olympus-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-olympus-amber to-olympus-green"
                style={{ width: '73%' }}
              />
            </div>
            <div className="flex justify-between text-xs text-olympus-text-dim mt-1">
              <span>Fear</span>
              <span>Neutral</span>
              <span>Greed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
