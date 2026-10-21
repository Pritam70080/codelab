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
import Profile from './pages/Profile.jsx';
import ProfileUpdate from './pages/ProfileUpdate.jsx';
import ProfileLayout from './layout/ProfileLayout.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import AddProblem from './pages/AddProblem.jsx';
import AdminRoute from './components/AdminRoute.jsx';

import { useThemeStore } from './store/useThemeStore.js';
import { useAuthStore } from './store/useAuthStore.js';
import { Code2, Terminal } from 'lucide-react';
import EmailVerificationPage from './pages/EmailVerificationPage.jsx';
import SheetsPage from './pages/SheetsPage.jsx';
import SheetPage from './pages/SheetPage.jsx';

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
      <div className="min-h-screen w-full bg-base-200 px-5 flex items-center justify-center">
        <section
          className="w-full max-w-lg overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-xl"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 border-b border-base-300 px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Code2 size={22} aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-base-content">CodeLab</p>
              <p className="text-xs text-base-content/60">Your DSA practice space</p>
            </div>
            <span className="flex items-center gap-2 rounded-full bg-base-200 px-3 py-1.5 text-xs text-base-content/70">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              Connecting
            </span>
          </div>

          <div className="px-6 pb-7 pt-8 sm:px-8">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/20">
              <Terminal size={28} aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-base-content">
              Getting your DSA practice ready
            </h1>
            <p className="mt-2 text-sm leading-6 text-base-content/65">
              Checking your session so your structured sheets and coding problems are ready when you are.
            </p>

            <div className="mt-7 overflow-hidden rounded-xl border border-base-300 bg-base-200/70">
              <div className="flex items-center gap-1.5 border-b border-base-300 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-error/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
                <span className="ml-2 font-mono text-xs text-base-content/50">codelab — practice</span>
              </div>
              <div className="space-y-2.5 px-4 py-4 font-mono text-xs sm:text-sm">
                <p><span className="text-primary">const</span> nextStep = <span className="text-success">"solve a problem"</span>;</p>
                <p><span className="text-primary">await</span> loadYourProgress();</p>
                <p className="flex items-center gap-2 text-base-content/60">
                  <span className="text-primary">&gt;</span>
                  <span>Opening your DSA practice session</span>
                  <span className="h-4 w-1 animate-pulse bg-primary" />
                </p>
              </div>
            </div>

            <div
              className="auth-loading-progress mt-6 h-1 overflow-hidden rounded-full bg-base-300"
              aria-hidden="true"
            >
              <div className="h-full w-2/5 rounded-full bg-primary" />
            </div>
            <p className="mt-3 text-center text-xs text-base-content/50">
              Your next problem is just a moment away
            </p>
          </div>
        </section>
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
            <Route path="/sheets" element={authUser ? <SheetsPage /> : <Navigate to="/login" />} />
            <Route path="/sheets/:sheetId" element={authUser ? <SheetPage /> : <Navigate to="/login" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/profile" element={authUser ? <ProfileLayout /> : <Navigate to="/login" />}>
              <Route index element={<Profile />} />
              <Route path="update" element={<ProfileUpdate />} />
            </Route>
          </Route>
          <Route path="/problem" element={<AdminRoute/>}>
            <Route path="add-problem" element={authUser ? <AddProblem/>: <Navigate to="/login" />}/>
          </Route>
          <Route path="/problem/:id" element={authUser ? <ProblemPage /> : <Navigate to="/login" />} />
          <Route path="/verify-email/:token" element={ <EmailVerificationPage/>} />
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App