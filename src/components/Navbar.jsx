import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap, ChevronRight } from 'lucide-react'
import GoldButton from './ui/GoldButton'

export default function Navbar({ walletConnected, onConnect }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isLanding
          ? 'glass border-b border-olympus-border shadow-card'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-olympus-gold to-olympus-amber flex items-center justify-center shadow-gold">
                <span className="text-olympus-bg font-bold text-sm">Ω</span>
              </div>
              <div className="absolute inset-0 rounded-lg bg-olympus-gold/30 blur-sm group-hover:blur-md transition-all" />
            </div>
            <div>
              <span className="font-bold text-olympus-text text-lg tracking-tight">Olympus</span>
              <span className="text-olympus-gold font-bold text-lg tracking-tight"> Finance</span>
            </div>
          </Link>

          {/* Desktop nav */}
          {isLanding && (
            <nav className="hidden md:flex items-center gap-6">
              {['Features', 'How It Works', 'Partners'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-olympus-text-dim hover:text-olympus-gold text-sm font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
          )}

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {walletConnected ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-olympus-surface border border-olympus-border">
                  <div className="w-2 h-2 rounded-full bg-olympus-green animate-pulse" />
                  <span className="text-olympus-text-dim text-xs font-mono">8xKf...9mNp</span>
                </div>
                <Link to="/dashboard">
                  <GoldButton size="sm" icon={<ChevronRight size={14} />}>
                    Dashboard
                  </GoldButton>
                </Link>
              </div>
            ) : (
              <GoldButton size="sm" onClick={onConnect} icon={<Zap size={14} />}>
                Connect Solflare
              </GoldButton>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-olympus-text-dim hover:text-olympus-gold p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-olympus-border"
          >
            <div className="px-4 py-4 space-y-3">
              {isLanding && ['Features', 'How It Works', 'Partners'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-olympus-text-dim hover:text-olympus-gold text-sm font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-2">
                {walletConnected ? (
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                    <GoldButton size="sm" className="w-full">
                      Open Dashboard
                    </GoldButton>
                  </Link>
                ) : (
                  <GoldButton size="sm" onClick={() => { onConnect(); setMobileOpen(false) }} className="w-full" icon={<Zap size={14} />}>
                    Connect Solflare
                  </GoldButton>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
