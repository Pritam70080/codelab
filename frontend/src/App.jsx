import {useEffect} from 'react'
import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import { AnimatePresence } from 'motion/react';

import Layout from "./layout/Layout.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import LandingPage from './pages/LandingPage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import AboutPage from './pages/AboutPage.jsx';

import { useThemeStore } from './store/useThemeStore.js';

const App = () => {
  const authUser = null;
  const location = useLocation();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <div className="max-w-6xl mx-auto container">
      <Toaster />
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/home" />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />}/>
          <Route path="/problems" element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App