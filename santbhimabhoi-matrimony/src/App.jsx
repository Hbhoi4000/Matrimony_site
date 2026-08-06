import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import Footer from './pages/Footer'
import ForgotPassword from './pages/ForgotPassword'
import './App.css'
import './css/Footer.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <main className="page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/bride" element={<Bride />} />
            <Route path="/groom" element={<Groom />} />
            <Route path="/widow" element={<Widow />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Dynamic Route */}
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App