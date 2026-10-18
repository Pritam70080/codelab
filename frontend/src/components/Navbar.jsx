import { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import { Palette, CodeXml, LogOut, User, X, Menu, Code } from "lucide-react";
import { motion as Motion, AnimatePresence } from "motion/react";

import { useAuthStore } from '../store/useAuthStore.js';
import { useThemeStore } from '../store/useThemeStore.js';
import LogoutButton from './LogoutButton.jsx';

const Navbar = () => {
  const { authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {
      id: 1,
      path: "/",
      label: "Home"
    },
    {
      id: 2,
      path: "/problems",
      label: "Problems"
    },
    {
      id: 3,
      path: "/sheets",
      label: "Sheets"
    },
    {
      id: 4,
      path: "/pricing",
      label: "Pricing"
    }
  ]
  const navbarBg = {
    corporate: "bg-neutral-100/40",
    dark: "bg-neutral-500/10",
    lemonade: "bg-neutral-100/30",
    dim: "bg-neutral-500/10",
  }
  return (
    <>
      <Motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.4, ease: "easeIn" }}
        className={`sticky top-0 md:top-4 w-full md:w-[82%] mx-auto ${navbarBg[theme]} backdrop-blur-xl p-2 px-4 shadow-lg md:rounded-xl z-50`}>
        <div className="flex items-center justify-between px-2">
          <Link to="/">
            <div className="flex items-center gap-2">
              <span><CodeXml className="size-10 text-primary" />
              </span>
              <span className="text-xl font-bold font-mono md:text-2xl">CodeLab</span>
            </div>
          </Link>
          {/* Desktop Nav Menu*/}
          <nav>
            <ul className="hidden md:flex gap-6">
              {navItems.map(({ id, path, label }) => {
                return (<li key={id}>
                  <NavLink to={path} className={({ isActive }) => `${isActive ? "text-primary" : ""} hover:text-primary`}>{label}</NavLink>
                  </li>)
              })}
            </ul>
          </nav>
          <div className="hidden md:flex gap-1.5 items-center">
            <div className="dropdown dropdown-bottom dropdown-end">
              <button className="btn btn-ghost rounded-xl">
                <Palette className="size-6" />
              </button>
              <ul className="dropdown-content menu bg-base-100 rounded-box
                             z-50 w-42 p-2 shadow-lg">
                <li><button onClick={() => setTheme("corporate")}>Light</button></li>
                <li><button onClick={() => setTheme("dark")}>Dark</button></li>
                <li><button onClick={() => setTheme("lemonade")}>Lemonade</button></li>
                <li><button onClick={() => setTheme("dim")}>Dim</button></li>
              </ul>
            </div>
            {!authUser ?
              <Link to="/login">
                <button className="btn btn-primary text-white rounded-xl">Login</button>
              </Link> :
              <div className="flex items-center gap-8">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar flex flex-row ">
                    <div className="w-10 rounded-full ">
                      <img
                        src={
                          authUser?.image ||
                          "https://avatar.iran.liara.run/public/boy"
                        }
                        alt="User Avatar"
                        className="object-cover"
                      />
                    </div>

                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
                  >
                    {/* Admin Option */}


                    {/* Common Options */}
                    <li>
                      <p className="text-base-content text-sm font-semibold border-b-2 border-gray-200/10">

                        {authUser?.name}

                      </p>
                    </li>
                    <li>
                      <Link
                        to="/profile"
                        className="hover:bg-primary hover:text-white text-base-content text-sm font-semibold"
                      >
                        <User className="w-4 h-4 mr-2" />
                        My Profile
                      </Link>
                    </li>
                    {authUser?.role === "ADMIN" && (
                      <li>
                        <Link
                          to="/problem/add-problem"
                          className="hover:bg-primary hover:text-white text-base font-semibold"
                        >
                          <Code className="w-4 h-4 mr-1" />
                          Add Problem
                        </Link>
                      </li>
                    )}
                    <li>
                      <LogoutButton >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </LogoutButton>
                    </li>
                  </ul>
                </div>
              </div>
            }
          </div>
          {/* Mobile Menu */}
          <button
            className="btn btn-ghost btn-circle min-h-11 min-w-11 p-0 text-primary md:hidden"
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Motion.span
              key={isOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X /> : <Menu />}
            </Motion.span>
          </button>
        </div>
      </Motion.header >
      <AnimatePresence>
        {isOpen && <Motion.aside
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -8, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 top-16 z-[100] overflow-y-auto bg-base-content/10 p-3 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="mx-auto max-w-sm rounded-2xl border border-base-content/10 bg-base-100 p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {authUser &&
              <>
                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-base-content/10 px-3 py-3">
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-base-200">
                    <img
                      src={
                        authUser?.image ||
                        "https://avatar.iran.liara.run/public/boy"
                      }
                      alt="User Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="truncate text-base font-semibold">
                    {authUser?.name}
                  </p>
                </div>
                <ul className="mt-4 space-y-2">
                  {/* Admin Option */}


                  {/* Common Options */}
                  <li className="rounded-lg bg-base-200/60 px-3 py-2.5">
                    <Link
                      to="/profile"
                      className="block text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >

                      My Profile
                    </Link>
                  </li>
                  {authUser?.role === "ADMIN" && (
                    <li className="rounded-lg bg-base-200/60 px-3 py-2.5">
                      <Link
                        to="/problem/add-problem"
                        className="block text-base font-medium"
                        onClick={() => setIsOpen(false)}
                      >

                        Add Problem
                      </Link>
                    </li>
                  )}
                </ul>
              </>
            }
            <ul className="space-y-1 text-base font-medium">
              {navItems.map(({ id, path, label }) => {
                return <li key={id}>
                  <NavLink
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => `block rounded-lg px-3 py-2.5 ${isActive ? "bg-primary/10 font-semibold text-primary" : "hover:bg-base-200"}`}
                  >
                    {label}
                  </NavLink>
                </li>
              })}
            </ul>
            <div className="mt-4 border-t border-base-content/20 pt-4">
              <h2 className="mb-3 text-base font-semibold">Theme</h2>
              <div className="mb-4 grid grid-cols-2 gap-2">
                <button onClick={() => setTheme("corporate")} className={`btn btn-sm w-full text-base-content ${theme === "corporate" ? "btn-primary " : "bg-base-100 border-primary"}`}>Light</button>
                <button onClick={() => setTheme("dark")} className={`btn btn-sm w-full text-base-content ${theme === "dark" ? "btn-primary " : "bg-base-100 border-primary"}`}>Dark</button>
                <button onClick={() => setTheme("lemonade")} className={`btn btn-sm w-full text-base-content ${theme === "lemonade" ? "btn-primary " : "bg-base-100 border-primary"}`}>Lemonade</button>
                <button onClick={() => setTheme("dim")} className={`btn btn-sm w-full text-base-content ${theme === "dim" ? "btn-primary " : "bg-base-100 border-primary"}`}>Dim</button>
              </div>

              {authUser ? (
                <LogoutButton className="w-full" >
                  <LogOut className="w-4 h-4 mr-2 " />
                  Logout
                </LogoutButton>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn btn-primary mb-2 w-full text-white" onClick={() => setIsOpen(false)}>Login</button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn btn-primary w-full text-white" onClick={() => setIsOpen(false)}>Sign Up</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </Motion.aside>}
      </AnimatePresence>
    </>
  )
}

export default Navbar