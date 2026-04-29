import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import HowItWorks from '../components/landing/HowItWorks'
import Partners from '../components/landing/Partners'
import Footer from '../components/landing/Footer'

export default function Landing({ walletConnected, onConnect }) {
  return (
    <div className="min-h-screen bg-olympus-bg">
      <Navbar walletConnected={walletConnected} onConnect={onConnect} />
      <Hero walletConnected={walletConnected} onConnect={onConnect} />
      <Features />
      <HowItWorks />
      <Partners />
      <Footer />
    </div>
  )
}
