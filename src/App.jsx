import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./Login";
import SignUp from "./SignUp";
import WildConnect from "./WildConnect";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>

        {/* Default page */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <Login
              onLogin={() => setIsLoggedIn(true)}
            />
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<SignUp />}
        />

        {/* After Login */}
        <Route
          path="/home"
          element={
            isLoggedIn
              ? <WildConnect onLogout={() => setIsLoggedIn(false)} />
              : <Navigate to="/login" />
          }
        />

      </Routes>
    </Router>
  );
}