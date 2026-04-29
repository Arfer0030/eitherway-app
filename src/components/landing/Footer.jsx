import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter, Github, MessageCircle, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-olympus-border bg-olympus-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-olympus-gold to-olympus-amber flex items-center justify-center">
                <span className="text-olympus-bg font-bold">Ω</span>
              </div>
              <span className="font-bold text-xl text-olympus-text">Olympus <span className="text-olympus-gold">Finance</span></span>
            </div>
            <p className="text-olympus-text-dim text-sm leading-relaxed max-w-xs mb-6">
              The intelligent, premium & seamless yield router on Solana. Built for serious DeFi participants who demand the best.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
                { icon: <Github size={16} />, href: '#', label: 'GitHub' },
                { icon: <MessageCircle size={16} />, href: '#', label: 'Discord' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-olympus-border bg-olympus-card flex items-center justify-center text-olympus-text-dim hover:text-olympus-gold hover:border-olympus-gold/40 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-olympus-text font-semibold mb-4 text-sm">Product</h4>
            <ul className="space-y-3">
              {[
                { label: 'Vaults', href: '/dashboard' },
                { label: 'Zap Deposit', href: '/dashboard' },
                { label: 'Market Intel', href: '/dashboard' },
                { label: 'Portfolio', href: '/dashboard' },
                { label: 'Analytics', href: '/dashboard' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-olympus-text-dim hover:text-olympus-gold text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Protocols */}
          <div>
            <h4 className="text-olympus-text font-semibold mb-4 text-sm">Protocols</h4>
            <ul className="space-y-3">
              {[
                { label: 'Kamino Finance', href: 'https://kamino.finance' },
                { label: 'DFlow', href: 'https://dflow.net' },
                { label: 'Birdeye', href: 'https://birdeye.so' },
                { label: 'Quicknode', href: 'https://quicknode.com' },
                { label: 'Solflare', href: 'https://solflare.com' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olympus-text-dim hover:text-olympus-gold text-sm transition-colors inline-flex items-center gap-1"
                  >
                    {link.label} <ExternalLink size={10} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-olympus-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-olympus-text-dim text-xs">
            © 2025 Olympus Finance. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-olympus-text-dim text-xs">Solana Mainnet</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-olympus-green animate-pulse" />
              <span className="text-olympus-green text-xs font-medium">All systems operational</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 rounded-xl bg-olympus-card/50 border border-olympus-border/50">
          <p className="text-olympus-text-dim text-xs leading-relaxed">
            <strong className="text-olympus-text">Risk Disclaimer:</strong> DeFi protocols involve smart contract risk, impermanent loss, and market volatility. Olympus Finance does not guarantee returns. Past APY is not indicative of future performance. Always do your own research and only invest what you can afford to lose. This is not financial advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
