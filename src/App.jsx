
import { useState } from 'react'
import Login from './Login'
import WildConnect from './WildConnect'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />
  }

  return <WildConnect onLogout={() => setIsLoggedIn(false)} />
}
