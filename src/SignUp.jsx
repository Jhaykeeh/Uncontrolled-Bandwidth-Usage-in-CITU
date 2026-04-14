import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    schoolId: '',
    email: '',
    password: '',
    confirm: '',
  });

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const set = (key) => (e) =>
    setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSignup = (e) => {
    e.preventDefault();
    const { firstName, lastName, schoolId, email, password, confirm } = form;
    if (!firstName || !lastName || !schoolId || !email || !password || !confirm) {
      alert('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }
    alert('Account created successfully!');
    navigate("/login", { replace: true }); 
  };

  const inputStyle = {
    width: '100%',
    padding: '11px 14px',
    border: '1.5px solid #d4a843',
    borderRadius: '4px',
    fontSize: '14px',
    background: '#fff',
    color: '#3a3a3a',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const focusIn = (e) => {
    e.target.style.borderColor = '#7a1818'
    e.target.style.boxShadow =
      '0 0 0 3px rgba(122,24,24,0.12)'
  }

  const focusOut = (e) => {
    e.target.style.borderColor = '#d4a843'
    e.target.style.boxShadow = 'none'
  }

  const labelStyle = {
    display: 'block',
    fontSize: '11px',
    fontWeight: '600',
    color: '#7a1818',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    marginBottom: '5px',
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#FFFFFF',
      fontFamily:
        "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>

      {/* Header */}
      <header style={{
        background: '#5a1010',
        padding: '0 28px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        borderBottom: '3px solid #d4a843',
        boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
      }}>

        <div>
          <div style={{
            color: '#d4a843',
            fontSize: '15px',
            fontWeight: '800',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
          }}>
            Cebu Institute of Technology
          </div>

          <div style={{
            color: '#e8c878',
            fontSize: '10px',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            opacity: 0.85,
          }}>
            University
          </div>
        </div>

      </header>

      {/* Main */}
      <main style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
      }}>

        {/* Card */}
        <div style={{
          background: '#fff',
          borderRadius: '6px',
          width: '100%',
          maxWidth: '340px',
          boxShadow:
            '0 10px 40px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          border: '1px solid #d4a843',
        }}>

          {/* Card Header */}
          <div style={{
            background: '#5a1010',
            padding: '16px 24px',
            borderBottom: '3px solid #d4a843',
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '700',
              color: '#d4a843',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}>
              Create Account
            </h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSignup}
            style={{ padding: '24px' }}
          >

            {/* Names */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '12px'
            }}>

              <div>
                <label style={labelStyle}>
                  First Name
                </label>

                <input
                  type="text"
                  value={form.firstName}
                  onChange={set('firstName')}
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Last Name
                </label>

                <input
                  type="text"
                  value={form.lastName}
                  onChange={set('lastName')}
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>

            </div>

            {/* School ID */}
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>
                School ID
              </label>

              <input
                type="text"
                value={form.schoolId}
                onChange={set('schoolId')}
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                style={inputStyle}
                onFocus={focusIn}
                onBlur={focusOut}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>
                Password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={set('password')}
                style={inputStyle}
              />
            </div>

            {/* Confirm */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>
                Confirm Password
              </label>

              <input
                type={showConfirm ? "text" : "password"}
                value={form.confirm}
                onChange={set('confirm')}
                style={inputStyle}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                background:
                  'linear-gradient(135deg, #7a1818, #9b2020)',
                color: '#d4a843',
                border: '1.5px solid #d4a843',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Create Account
            </button>

            {/* 🔥 STEP 4 FIX — Back to Login */}
            <p style={{
              textAlign: 'center',
              marginTop: '18px',
              fontSize: '13px',
              color: '#777',
              fontFamily: 'monospace',
            }}>
              Already have an account?{' '}

              <Link
                to="/login"
                style={{
                  color: '#7a1818',
                  fontWeight: '700',
                  textDecoration: 'none',
                }}
              >
                Log in
              </Link>

            </p>

          </form>

        </div>

      </main>

    </div>
  )
}