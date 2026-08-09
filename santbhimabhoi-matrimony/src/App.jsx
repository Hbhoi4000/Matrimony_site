import { BrowserRouter, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Bride from './pages/Bride'
import Groom from './pages/Groom'
import Widow from './pages/Widow'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Search from './pages/Search'
import Footer from './pages/Footer'
import ForgotPassword from './pages/ForgotPassword'
import MyProfile from './pages/MyProfile'
import ProfilePdf from './pages/ProfilePdf'
import LandingPage from './pages/LandingPage'

import './App.css'
import './css/Footer.css'

// Protected Route Component: Only logged-in users can pass
function ProtectedRoute() {
  const location = useLocation();
  const reduxUser = useSelector((state) => state.login?.user);
  const isAuthenticated = Boolean(reduxUser?.user || reduxUser);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

function App() {
  const reduxUser = useSelector((state) => state.login?.user);
  const isAuthenticated = Boolean(reduxUser?.user || reduxUser);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <main className="page-container">
          <Routes>
            {/* ROOT ROUTE: Show Landing Page for guests, Home feed for logged-in users */}
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />} 
            />

            {/* PUBLIC GUEST ROUTES */}
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />
            <Route path="/register" element={isAuthenticated ? <Navigate to="/home" replace /> : <Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* ALL PROTECTED ROUTES (Requires Login) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/bride" element={<Bride />} />
              <Route path="/groom" element={<Groom />} />
              <Route path="/widow" element={<Widow />} />
              <Route path="/search" element={<Search />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              <Route path="/profile-pdf/:id" element={<ProfilePdf />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App