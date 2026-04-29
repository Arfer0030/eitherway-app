import React from 'react'

const TOKEN_COLORS = {
  SOL: { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/30' },
  USDC: { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/30' },
  USDT: { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-500/30' },
  BONK: { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/30' },
  JitoSOL: { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/30' },
  mSOL: { bg: 'bg-sky-500/20', text: 'text-sky-300', border: 'border-sky-500/30' },
  WIF: { bg: 'bg-pink-500/20', text: 'text-pink-300', border: 'border-pink-500/30' },
}

const TOKEN_ICONS = {
  SOL: '◎',
  USDC: '$',
  USDT: '₮',
  BONK: '🐕',
  JitoSOL: '⚡',
  mSOL: '🌊',
  WIF: '🐶',
}

export default function TokenBadge({ token, size = 'sm' }) {
  const colors = TOKEN_COLORS[token] || { bg: 'bg-gray-500/20', text: 'text-gray-300', border: 'border-gray-500/30' }
  const icon = TOKEN_ICONS[token] || '◉'

  const sizes = {
    xs: 'text-xs px-1.5 py-0.5 gap-1',
    sm: 'text-xs px-2 py-1 gap-1',
    md: 'text-sm px-3 py-1.5 gap-1.5',
  }

  return (
    <span className={`inline-flex items-center rounded-lg border font-medium ${colors.bg} ${colors.text} ${colors.border} ${sizes[size]}`}>
      <span className="text-xs">{icon}</span>
      {token}
    </span>
  )
}
