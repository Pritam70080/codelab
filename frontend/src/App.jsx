import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from 'motion/react';

import Layout from "./layout/Layout.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import LandingPage from './pages/LandingPage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ProblemPage from './pages/ProblemPage.jsx';

import { useThemeStore } from './store/useThemeStore.js';
import { useAuthStore } from './store/useAuthStore.js';
import { Loader2 } from 'lucide-react';

const App = () => {
  const {authUser, isCheckingAuth, checkAuth} = useAuthStore();
  const location = useLocation();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    checkAuth();
  }, []);

  if( isCheckingAuth ) {
    return (
      <div className="max-w-6xl mx-auto container flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-base-content" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto container">
      <Toaster />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/problems" />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/problems" />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="/problems" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
          <Route path="/problem/:id" element={authUser ? <ProblemPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App