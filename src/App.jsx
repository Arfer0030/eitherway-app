import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'

export default function App() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress] = useState('8xKf...9mNp')

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing
            walletConnected={walletConnected}
            onConnect={() => setWalletConnected(true)}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <Dashboard
            walletConnected={walletConnected}
            walletAddress={walletAddress}
            onConnect={() => setWalletConnected(true)}
          />
        }
      />
    </Routes>
  )
}
