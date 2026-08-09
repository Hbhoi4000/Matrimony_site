import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './pages/Footer'
import { ABOUT_ROUTE, BRIDES_ROUTE, CONTACT_ROUTE, GROOMS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, WIDOWS_ROUTE, profileRoute } from './constants/routes'

import './App.css'
import './css/Footer.css'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Bride = lazy(() => import('./pages/Bride'))
const Groom = lazy(() => import('./pages/Groom'))
const Widow = lazy(() => import('./pages/Widow'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Profile = lazy(() => import('./pages/Profile'))

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <main className="page-container">
          <Suspense fallback={<div className="page-loading" role="status">Loading page...</div>}>
            <Routes>
              <Route path={HOME_ROUTE} element={<Home />} />
              <Route path={LOGIN_ROUTE} element={<Login />} />
              <Route path={REGISTER_ROUTE} element={<Register />} />
              <Route path={BRIDES_ROUTE} element={<Bride />} />
              <Route path={GROOMS_ROUTE} element={<Groom />} />
              <Route path={WIDOWS_ROUTE} element={<Widow />} />
              <Route path={ABOUT_ROUTE} element={<About />} />
              <Route path={CONTACT_ROUTE} element={<Contact />} />
              <Route path={profileRoute(':id')} element={<Profile />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
