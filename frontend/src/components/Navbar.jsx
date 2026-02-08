import { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import { Palette, CodeXml, LogOut, User, X, Menu, Code } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
    dracula: "bg-neutral-500/10",
    sunset: "bg-neutral-500/10"
  }
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.4, ease: "easeIn" }}
        className={`sticky top-0 md:top-4  w-full md:w-[82%] mx-auto ${navbarBg[theme]} backdrop-blur-xl p-2 px-4 shadow-lg md:rounded-xl z-50`}>
        <div className="flex justify-between items-center px-2">
          <Link to="/">
            <div className="flex gap-2 items-center ">
              <span><CodeXml className="size-10 text-primary" />
              </span>
              <span className="hidden md:inline text-2xl font-bold font-mono">CodeLab</span>
            </div>
          </Link>
          {/* Desktop Nav Menu*/}
          <nav>
            <ul className="hidden md:flex gap-6">
              {navItems.map(({ id, path, label }) => {
                return <li key={id}><NavLink to={path} className={({ isActive }) => `${isActive ? "text-primary" : ""} hover:text-primary`}>{label}</NavLink></li>
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
                          to="/add-problem"
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
          <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
            <motion.span
              key={isOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X /> : <Menu />}
            </motion.span>
          </button>
        </div>
      </motion.header >
      <AnimatePresence>
        {isOpen && <motion.aside
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed md:hidden top-15 inset-x-0 bottom-0 backdrop-blur-lg origin-top-right z-100 p-6"
          onClick={() => setIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} >
            {authUser &&
              <>
                <div className="flex gap-7 border-2 border-base-100 items-center px-6 rounded-xl py-2">
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
                  <p className="text-base font-semibold ">

                    {authUser?.name}

                  </p>
                </div>
                <ul className="mt-4">
                  {/* Admin Option */}


                  {/* Common Options */}
                  <li className="mb-2.5 bg-base-100/50 p-2.5 rounded-sm">
                    <Link
                      to="/profile"
                      className="text-lg font-medium "
                    >

                      My Profile
                    </Link>
                  </li>
                  {authUser?.role === "ADMIN" && (
                    <li className="mb-2.5 bg-base-100/50 p-2.5 rounded-sm">
                      <Link
                        to="/add-problem"
                        className="text-lg font-medium "
                      >

                        Add Problem
                      </Link>
                    </li>
                  )}
                </ul>
              </>
            }
            <ul className="space-y-6 text-lg font-medium">
              {navItems.map(({ id, path, label }) => {
                return <li key={id} className=" mt-4"><Link to={path}>{label}</Link></li>
              })}
            </ul>
            <div className="py-8">
              <h2 className="text-lg font-medium mb-4">Theme</h2>
              <div className="flex flex-wrap gap-4 justify-center items-center mb-10">
                <button onClick={() => setTheme("corporate")} className={`btn btn-sm ${theme === "corporate" ? "btn-primary" : "bg-base-100 border-primary"}`}>Light</button>
                <button onClick={() => setTheme("dark")} className={`btn btn-sm ${theme === "dark" ? "btn-primary" : "bg-base-100 border-primary"}`}>Dark</button>
                <button onClick={() => setTheme("lemonade")} className={`btn btn-sm ${theme === "lemonade" ? "btn-primary" : "bg-base-100 border-primary"}`}>Lemonade</button>
                <button onClick={() => setTheme("dim")} className={`btn btn-sm ${theme === "dim" ? "btn-primary" : "bg-base-100 border-primary"}`}>Dim</button>
              </div>

              {authUser ? (
                <LogoutButton className="w-full" >
                  <LogOut className="w-4 h-4 mr-2 " />
                  Logout
                </LogoutButton>
              ) : (
                <>
                  <Link to="/login">
                    <button className="btn btn-primary text-white w-full mb-3">Login</button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn btn-primary text-white w-full">Sign Up</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.aside>}
      </AnimatePresence>
    </>
  )
}

export default Navbar