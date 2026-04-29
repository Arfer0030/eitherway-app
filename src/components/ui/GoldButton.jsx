import React from 'react'
import { motion } from 'framer-motion'

export default function GoldButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  icon,
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  }

  const variants = {
    primary: `
      bg-gradient-to-r from-olympus-gold via-olympus-gold-light to-olympus-gold
      text-olympus-bg font-bold
      hover:from-olympus-gold-light hover:via-olympus-gold hover:to-olympus-gold-light
      shadow-gold hover:shadow-gold-lg
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    outline: `
      border border-olympus-gold text-olympus-gold
      hover:bg-olympus-gold hover:text-olympus-bg
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    ghost: `
      text-olympus-gold-light hover:bg-olympus-gold/10
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-500
      text-white font-bold
      hover:from-red-500 hover:to-red-400
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center gap-2 justify-center
        rounded-xl font-semibold transition-all duration-200
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.button>
  )
}
