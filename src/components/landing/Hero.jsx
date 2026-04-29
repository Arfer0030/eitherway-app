import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap, TrendingUp, Shield, ChevronRight, Play } from 'lucide-react'
import GoldButton from '../ui/GoldButton'

const FLOATING_STATS = [
  { label: 'Total TVL', value: '$217.3M', color: 'text-olympus-gold', icon: '◎' },
  { label: 'Avg APY', value: '52.4%', color: 'text-olympus-green', icon: '↑' },
  { label: 'Active Vaults', value: '24', color: 'text-olympus-cyan', icon: '⚡' },
]

export default function Hero({ walletConnected, onConnect }) {
  const [currentStat, setCurrentStat] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((p) => (p + 1) % FLOATING_STATS.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-olympus-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-olympus-blue/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-olympus-amber/5 blur-3xl pointer-events-none" />

      {/* Animated grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-olympus-gold/40"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 4) * 15}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-olympus-gold/30 bg-olympus-gold/10 text-olympus-gold text-sm font-medium mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-olympus-green animate-pulse" />
          Live on Solana Mainnet
          <span className="text-olympus-gold-dim">•</span>
          Powered by Kamino × DFlow × Birdeye
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6"
        >
          The Intelligent{' '}
          <br className="hidden sm:block" />
          <span className="text-gold-gradient">Yield Router</span>
          <br className="hidden sm:block" />
          <span className="text-olympus-text-dim text-4xl sm:text-5xl font-bold">for Solana DeFi</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-olympus-text-dim text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Deposit any token, earn optimized Kamino vault yields. One-click Zap routing via DFlow,
          powered by real-time Birdeye intelligence and Quicknode infrastructure.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {walletConnected ? (
            <Link to="/dashboard">
              <GoldButton size="xl" icon={<ChevronRight size={20} />}>
                Open Dashboard
              </GoldButton>
            </Link>
          ) : (
            <GoldButton size="xl" onClick={onConnect} icon={<Zap size={20} />}>
              Connect Solflare & Start
            </GoldButton>
          )}
          <GoldButton variant="outline" size="xl" icon={<Play size={16} />}>
            Watch Demo
          </GoldButton>
        </motion.div>

        {/* Live stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          {FLOATING_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-olympus-surface/80 border border-olympus-border backdrop-blur-sm"
            >
              <span className={`text-lg font-bold ${stat.color}`}>{stat.icon}</span>
              <div className="text-left">
                <p className="text-olympus-text-dim text-xs">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-olympus-text-dim text-xs">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-olympus-border flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-olympus-gold" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
