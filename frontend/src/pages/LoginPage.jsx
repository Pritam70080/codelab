import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Eye, EyeOff, Lock, Mail, Loader2, CodeXml } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useAuthStore } from "../store/useAuthStore.js"
import { pageTransition } from '../lib/pageTransition.js';
import AuthImagePattern from '../components/AuthImagePattern.jsx';

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be atleast of 6 characters"),
})

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(LoginSchema)
  })

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await login(data);
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen pt-20"
    >
      <section className="grid lg:grid-cols-2">
        <div className="px-6 md:px-12 py-4 md:shadow-lg rounded-xl">
          {/* Logo */}
          <div className="flex flex-col justify-center items-center">
            <div className="rounded-xl bg-primary/10 hover:bg-primary/20 p-2">
              <Link to="/">
                <CodeXml className="text-primary size-10" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl text-base-content mt-3">Welcome back to <span className="text-primary">CodeLab</span></h1>
            <p className="text-base-content/70 mt-2">Login to your account</p>
          </div>
          <div className=" sm:px-12 mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mb-4">
                <label htmlFor="login-email" className="label mb-2">Email</label>
                <div className="relative">
                  <input type="email" {...register("email")} className={`input input-bordered ${errors.email ? "input-error" : ""} pl-10 w-full`} id="login-email" placeholder="xyz@example.com" />
                  <div className=" absolute flex items-center inset-y-0 left-2 pointer-events-none">
                    <Mail className="text-base-content/50" />
                  </div>
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="form-control mb-4">
                <label htmlFor="login-password" className="label mb-2">Password</label>
                <div className="relative">
                  <input type={`${showPassword ? "text" : "password"}`} {...register("password")} className={`input input-bordered ${errors.password ? "input-error" : ""} px-10 w-full`} id="login-password" placeholder="••••••••" />
                  <div className=" absolute flex items-center inset-y-0 left-2 pointer-events-none">
                    <Lock className="text-base-content/50" />
                  </div>
                  <button type="button" className="absolute right-2 inset-y-0 text-base-content/50 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full text-white mt-5"
                disabled={isLoggingIn}
              >{isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}</button>
            </form>
            {/* Footer */}
            <div className="mt-5 text-center">
              <p>Don't have an account.{" "}
                <Link to="/signup" className="link link-primary">Sign up</Link></p>
            </div>
          </div>
        </div>
        <AuthImagePattern title={"Welcome back!"} subtitle={"Sign in to continue your journey with us."} />
      </section>
    </motion.div>
  )
}

export default LoginPage