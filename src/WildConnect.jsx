import { useState } from 'react'
import qrCodeImage from './assets/qrcode.png'

const COLORS = {
  maroon: '#7a1818',
  maroonDark: '#5a1010',
  gold: '#d4a843',
  white: '#ffffff',
  text: '#3a3a3a',
  textLight: '#666666',
  goldBg: '#fffbf0',
}

const FONTS = {
  primary: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  mono: 'monospace',
}

// ===== QR Code Generator =====
function generateQRCode(text, size = 200) {
  // Simple QR code pattern generator
  // This creates a basic visual QR-like pattern with the WiFi data encoded
  const encoded = encodeURIComponent(text)
  const hash = Math.abs(Array.from(encoded).reduce((a, b) => a + b.charCodeAt(0), 0))
  
  // Generate a pattern based on the text
  const patterns = []
  for (let i = 0; i < 21; i++) {
    for (let j = 0; j < 21; j++) {
      const val = (hash + i * 7 + j * 11) % 256
      patterns.push(val < 128 ? 1 : 0)
    }
  }
  
  const cellSize = size / 21
  let svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">`
  svg += `<rect width="${size}" height="${size}" fill="white"/>`
  
  for (let i = 0; i < patterns.length; i++) {
    if (patterns[i] === 1) {
      const row = Math.floor(i / 21)
      const col = i % 21
      const x = col * cellSize
      const y = row * cellSize
      svg += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="black"/>`
    }
  }
  
  svg += '</svg>'
  return 'data:image/svg+xml;base64,' + btoa(svg)
}

// ===== Header Component =====
function Header({ onLogout }) {
  return (
    <header style={{
      background: COLORS.maroonDark,
      padding: '0 28px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '14px',
      borderBottom: '3px solid ' + COLORS.gold,
      boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
    }}>
      {/* Title on left */}
      <div>
        <div style={{
          color: COLORS.gold,
          fontSize: '15px',
          fontWeight: '800',
          letterSpacing: '2.5px',
          textTransform: 'uppercase',
          lineHeight: 1.15,
        }}>
          Cebu Institute of Technology
        </div>
        <div style={{
          color: '#e8c878',
          fontSize: '10px',
          fontWeight: '500',
          letterSpacing: '5px',
          textTransform: 'uppercase',
          opacity: 0.85,
        }}>
          University
        </div>
      </div>

      {/* Logout button on right */}
      <button
        onClick={onLogout}
        style={{
          background: COLORS.gold,
          color: COLORS.maroonDark,
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '13px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.target.style.background = '#e8c878'
        }}
        onMouseLeave={e => {
          e.target.style.background = COLORS.gold
        }}
      >
        Logout
      </button>
    </header>
  )
}

// ===== Sidebar Progress Component =====
function Sidebar({ currentStep }) {
  const steps = [
    { num: 1, label: 'Student ID' },
    { num: 2, label: 'Library Card' },
    { num: 3, label: 'WiFi Access' },
    { num: 4, label: 'Complete' },
  ]

  return (
    <div style={{
      width: '200px',
      background: COLORS.maroon,
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}>
      {steps.map(step => (
        <div key={step.num} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: step.num <= currentStep ? COLORS.gold : 'rgba(255,255,255,0.2)',
            color: step.num <= currentStep ? COLORS.maroonDark : COLORS.gold,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            flexShrink: 0,
          }}>
            {step.num <= currentStep ? '✓' : step.num}
          </div>
          <div style={{
            color: COLORS.gold,
            fontSize: '13px',
            fontWeight: step.num <= currentStep ? '700' : '500',
            opacity: step.num <= currentStep ? 1 : 0.6,
          }}>
            {step.label}
          </div>
        </div>
      ))}
    </div>
  )
}

// ===== Page 1: Welcome Page =====
function WelcomePage({ onStart }) {
  const steps = [
    { num: 1, title: 'Scan Student ID', desc: 'Place your student ID barcode under the scanner' },
    { num: 2, title: 'Scan Card', desc: 'Scan the barcode on your card' },
    { num: 3, title: 'Get WiFi Access', desc: 'Receive your WiFi credentials and connect' },
  ]

  return (
    <div style={{ textAlign: 'center', maxWidth: '500px' }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>📶</div>
      <h1 style={{ fontSize: '24px', color: COLORS.maroon, marginBottom: '10px' }}>
        Welcome to Campus WiFi Service
      </h1>
      <p style={{ color: COLORS.textLight, marginBottom: '30px', fontFamily: FONTS.mono, fontSize: '14px' }}>
        Get complimentary high-speed WiFi access by scanning your student credentials
      </p>

      <div style={{ marginBottom: '30px' }}>
        {steps.map(step => (
          <div
            key={step.num}
            style={{
              background: step.num === 2 ? '#f5d0d0' : step.num === 3 ? '#fff8d0' : '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: step.num === 2 ? COLORS.maroon : step.num === 3 ? COLORS.gold : '#e8e8e8',
                color: step.num === 2 ? COLORS.white : step.num === 3 ? COLORS.maroonDark : COLORS.text,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              {step.num}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 'bold', color: COLORS.text }}>{step.title}</div>
              <div style={{ fontSize: '12px', color: COLORS.textLight, fontFamily: FONTS.mono }}>{step.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        style={{
          background: COLORS.maroon,
          color: COLORS.gold,
          border: `2px solid ${COLORS.gold}`,
          padding: '14px 40px',
          fontSize: '16px',
          fontWeight: 'bold',
          borderRadius: '6px',
          cursor: 'pointer',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.target.style.background = COLORS.gold
          e.target.style.color = COLORS.maroonDark
        }}
        onMouseLeave={e => {
          e.target.style.background = COLORS.maroon
          e.target.style.color = COLORS.gold
        }}
      >
        START
      </button>
    </div>
  )
}

// ===== Page 2: Scan Student ID Page =====
function ScanStudentIDPage({ onBack, onDone }) {
  const [mode, setMode] = useState('scanner')
  const [manual, setManual] = useState('')

  return (
    <div style={{ maxWidth: '500px', width: '100%' }}>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: COLORS.maroon,
          cursor: 'pointer',
          fontSize: '18px',
          marginBottom: '20px',
        }}
      >
        ← Back
      </button>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>⬛</div>
        <h2 style={{ fontSize: '18px', color: COLORS.maroon, margin: '0 0 8px 0' }}>
          Step 1: Scan Student ID
        </h2>
        <p style={{ fontSize: '13px', color: COLORS.textLight, fontFamily: FONTS.mono, margin: 0 }}>
          Place your student ID barcode under the scanner
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <button
          onClick={() => setMode('scanner')}
          style={{
            background: mode === 'scanner' ? COLORS.maroon : '#f0f0f0',
            color: mode === 'scanner' ? COLORS.gold : COLORS.text,
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📷 Scanner Mode
        </button>
        <button
          onClick={() => setMode('manual')}
          style={{
            background: mode === 'manual' ? COLORS.maroon : '#f0f0f0',
            color: mode === 'manual' ? COLORS.gold : COLORS.text,
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ⌨️ Manual Entry
        </button>
      </div>

      <div style={{
        background: COLORS.white,
        borderRadius: '8px',
        padding: '30px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
        {mode === 'scanner' ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto 20px' }}>
              {[
                { top: 0, left: 0, borderTop: '4px solid #222', borderLeft: '4px solid #222' },
                { top: 0, right: 0, borderTop: '4px solid #222', borderRight: '4px solid #222' },
                { bottom: 0, left: 0, borderBottom: '4px solid #222', borderLeft: '4px solid #222' },
                { bottom: 0, right: 0, borderBottom: '4px solid #222', borderRight: '4px solid #222' },
              ].map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: '28px', height: '28px', ...s }} />
              ))}
            </div>
            <p style={{ color: '#888', fontFamily: FONTS.mono, fontSize: '13px', margin: 0 }}>Ready to scan</p>
          </div>
        ) : (
          <div style={{ width: '100%' }}>
            <p style={{ textAlign: 'center', color: '#666', fontFamily: FONTS.mono, fontSize: '13px', marginBottom: '10px' }}>
              Enter Student ID manually
            </p>
            <input
              type="text"
              placeholder="Type student ID..."
              value={manual}
              onChange={e => setManual(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: FONTS.mono,
                background: '#f5f5f5',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>
        )}
      </div>

      <button
        onClick={onDone}
        style={{
          width: '100%',
          background: COLORS.gold,
          color: COLORS.maroonDark,
          border: 'none',
          padding: '12px',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.target.style.background = COLORS.maroon
          e.target.style.color = COLORS.gold
        }}
        onMouseLeave={e => {
          e.target.style.background = COLORS.gold
          e.target.style.color = COLORS.maroonDark
        }}
      >
        Continue
      </button>
    </div>
  )
}

// ===== Page 3: Scan Library Card Page =====
function ScanLibraryCardPage({ onBack, onDone }) {
  const [mode, setMode] = useState('scanner')
  const [manual, setManual] = useState('')

  return (
    <div style={{ maxWidth: '500px', width: '100%' }}>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: COLORS.maroon,
          cursor: 'pointer',
          fontSize: '18px',
          marginBottom: '20px',
        }}
      >
        ← Back
      </button>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>📚</div>
        <h2 style={{ fontSize: '18px', color: COLORS.maroon, margin: '0 0 8px 0' }}>
          Step 2: Scan Library Card
        </h2>
        <p style={{ fontSize: '13px', color: COLORS.textLight, fontFamily: FONTS.mono, margin: 0 }}>
          Scan the barcode on your library card
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <button
          onClick={() => setMode('scanner')}
          style={{
            background: mode === 'scanner' ? COLORS.maroon : '#f0f0f0',
            color: mode === 'scanner' ? COLORS.gold : COLORS.text,
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📷 Scanner Mode
        </button>
        <button
          onClick={() => setMode('manual')}
          style={{
            background: mode === 'manual' ? COLORS.maroon : '#f0f0f0',
            color: mode === 'manual' ? COLORS.gold : COLORS.text,
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ⌨️ Manual Entry
        </button>
      </div>

      <div style={{
        background: COLORS.white,
        borderRadius: '8px',
        padding: '30px',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
        {mode === 'scanner' ? (
          <p style={{ color: '#bbb', fontFamily: FONTS.mono, fontSize: '13px', margin: 0 }}>Camera feed ready</p>
        ) : (
          <div style={{ width: '100%' }}>
            <p style={{ textAlign: 'center', color: '#666', fontFamily: FONTS.mono, fontSize: '13px', marginBottom: '10px' }}>
              Enter Library Card number manually
            </p>
            <input
              type="text"
              placeholder="Type library card number..."
              value={manual}
              onChange={e => setManual(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: FONTS.mono,
                background: '#f5f5f5',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
          </div>
        )}
      </div>

      <button
        onClick={onDone}
        style={{
          width: '100%',
          background: COLORS.gold,
          color: COLORS.maroonDark,
          border: 'none',
          padding: '12px',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.target.style.background = COLORS.maroon
          e.target.style.color = COLORS.gold
        }}
        onMouseLeave={e => {
          e.target.style.background = COLORS.gold
          e.target.style.color = COLORS.maroonDark
        }}
      >
        Continue
      </button>
    </div>
  )
}

// ===== Page 4: WiFi Access Page =====
function WiFiAccessPage({ onBack, onComplete }) {
  const [mode, setMode] = useState('scanner')

  return (
    <div style={{ maxWidth: '500px', width: '100%' }}>
      <button
        onClick={onBack}
        style={{
          background: 'none',
          border: 'none',
          color: COLORS.maroon,
          cursor: 'pointer',
          fontSize: '18px',
          marginBottom: '20px',
        }}
      >
        ← Back
      </button>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔑</div>
        <h2 style={{ fontSize: '18px', color: COLORS.maroon, margin: '0 0 8px 0' }}>
          Step 3: Get WiFi Access
        </h2>
        <p style={{ fontSize: '13px', color: COLORS.textLight, fontFamily: FONTS.mono, margin: 0 }}>
          Scan the QR code to connect to the WiFi network
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
        <button
          onClick={() => setMode('scanner')}
          style={{
            background: mode === 'scanner' ? COLORS.maroon : '#f0f0f0',
            color: mode === 'scanner' ? COLORS.gold : COLORS.text,
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📱 View QR
        </button>
        <button
          onClick={() => setMode('manual')}
          style={{
            background: mode === 'manual' ? COLORS.maroon : '#f0f0f0',
            color: mode === 'manual' ? COLORS.gold : COLORS.text,
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          🔐 Manual Entry
        </button>
      </div>

      <div style={{
        background: COLORS.white,
        borderRadius: '8px',
        padding: '20px',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        gap: '20px',
      }}>
        {mode === 'scanner' ? (
          <>
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
            }}>
              <div style={{ fontSize: '13px', color: '#666', fontFamily: FONTS.mono }}>scan to connect</div>
              <img 
                src={qrCodeImage}
                alt="WiFi QR Code"
                style={{
                  width: '220px',
                  height: '220px',
                  border: `3px solid ${COLORS.gold}`,
                  borderRadius: '8px',
                  padding: '10px',
                  background: COLORS.white,
                }}
              />
            </div>
          </>
        ) : (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <p style={{ color: '#666', fontFamily: FONTS.mono, fontSize: '13px', marginBottom: '15px' }}>
              Network: CITUWildConnect
            </p>
            <div style={{
              background: '#f5f5f5',
              padding: '15px',
              borderRadius: '4px',
              fontFamily: FONTS.mono,
              fontSize: '12px',
              color: COLORS.text,
            }}>
              <div style={{ marginBottom: '10px' }}>Password: WildConnect2024!</div>
              <div>Status: ✓ Ready to Connect</div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onComplete}
        style={{
          width: '100%',
          background: COLORS.maroon,
          color: COLORS.gold,
          border: `2px solid ${COLORS.gold}`,
          padding: '12px',
          borderRadius: '4px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.target.style.background = COLORS.gold
          e.target.style.color = COLORS.maroonDark
        }}
        onMouseLeave={e => {
          e.target.style.background = COLORS.maroon
          e.target.style.color = COLORS.gold
        }}
      >
        Complete Registration
      </button>
    </div>
  )
}

// ===== Page 5: Success Page =====
function SuccessPage({ onLogout }) {
  return (
    <div style={{ textAlign: 'center', maxWidth: '500px' }}>
      <div style={{ fontSize: '56px', marginBottom: '20px' }}>🎉</div>
      <h1 style={{ fontSize: '28px', color: COLORS.maroon, marginBottom: '15px' }}>
        Registration Complete!
      </h1>
      <p style={{ color: COLORS.textLight, marginBottom: '30px', fontFamily: FONTS.mono, fontSize: '14px' }}>
        You are now connected to the CITU WildConnect WiFi network.
      </p>

      <div style={{
        background: COLORS.maroon,
        color: COLORS.gold,
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px',
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>📶 WildConnect</div>
        <div style={{ opacity: 0.8, fontSize: '14px' }}>Connection Active</div>
      </div>

      <button
        onClick={onLogout}
        style={{
          background: COLORS.gold,
          color: COLORS.maroonDark,
          border: 'none',
          padding: '12px 40px',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          e.target.style.background = COLORS.maroon
          e.target.style.color = COLORS.gold
        }}
        onMouseLeave={e => {
          e.target.style.background = COLORS.gold
          e.target.style.color = COLORS.maroonDark
        }}
      >
        Logout
      </button>
    </div>
  )
}

// ===== Main WildConnect Component =====
export default function WildConnect({ onLogout }) {
  const [step, setStep] = useState(0)

  const renderPage = () => {
    switch (step) {
      case 0: return <WelcomePage onStart={() => setStep(1)} />
      case 1: return <ScanStudentIDPage onBack={() => setStep(0)} onDone={() => setStep(2)} />
      case 2: return <ScanLibraryCardPage onBack={() => setStep(1)} onDone={() => setStep(3)} />
      case 3: return <WiFiAccessPage onBack={() => setStep(2)} onComplete={() => setStep(0)} />
      default: return null
    }
  }

  const getCurrentStep = () => {
    if (step === 0) return 0
    return Math.min(step, 3)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: COLORS.goldBg,
      fontFamily: FONTS.primary,
    }}>
      {/* Header */}
      <Header onLogout={onLogout} />

      {/* Main body with sidebar and content */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Sidebar - Only show on registration pages */}
        {step !== 0 && <Sidebar currentStep={getCurrentStep()} />}

        {/* Main content */}
        <main style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          overflowY: 'auto',
        }}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
