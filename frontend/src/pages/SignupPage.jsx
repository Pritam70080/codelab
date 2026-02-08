import React, { useState } from 'react'
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { Eye, EyeOff, Lock, Mail, Loader2, CodeXml, User } from "lucide-react";

import { pageTransition } from '../lib/pageTransition.js'
import AuthImagePattern from '../components/AuthImagePattern'
import { useAuthStore } from '../store/useAuthStore.js';

const SignupSchema = z.object({
  name: z.string().min(3, "Name must be atleast 3 characters."),
  email: z.string().email("Enter a valid email."),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

  confirmPassword: z.string()
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"] // error shows under confirm password field
  });

const SignupPage = () => {
  const { signup, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(SignupSchema) });

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...payload } = data;
      console.log(data, " ", payload);
      await signup(payload);
    } catch (error) {
      console.error("Signup failed", error);
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
        <div className="px-6 md:px-12 pt-2 pb-4 md:shadow-lg rounded-xl">
          {/* Logo */}
          <div className="flex flex-col justify-center items-center">
            <div className="rounded-xl bg-primary/10 hover:bg-primary/20 p-2">
              <Link to="/">
                <CodeXml className="text-primary size-10" />
              </Link>
            </div>
            <h1 className="font-bold text-2xl text-base-content mt-3">Welcome to <span className="text-primary">CodeLab</span></h1>
            <p className="text-base-content/70 mt-2">Create an account</p>
          </div>
          <div className=" sm:px-12 mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control mb-2">
                <label htmlFor="signup-name" className="label mb-2">Name</label>
                <div className="relative">
                  <input type="text" {...register("name")} className={`input input-bordered ${errors.email ? "input-error" : ""} pl-10 w-full`} id="signup-name" placeholder="your name" />
                  <div className=" absolute flex items-center inset-y-0 left-2 pointer-events-none">
                    <User className="text-base-content/50" />
                  </div>
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>
              <div className="form-control mb-2">
                <label htmlFor="signup-email" className="label mb-2">Email</label>
                <div className="relative">
                  <input type="email" {...register("email")} className={`input input-bordered ${errors.email ? "input-error" : ""} pl-10 w-full`} id="signup-email" placeholder="xyz@example.com" />
                  <div className=" absolute flex items-center inset-y-0 left-2 pointer-events-none">
                    <Mail className="text-base-content/50" />
                  </div>
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div className="form-control mb-2">
                <label htmlFor="signup-password" className="label mb-2">Password</label>
                <div className="relative">
                  <input type={`${showPassword ? "text" : "password"}`} {...register("password")} className={`input input-bordered ${errors.password ? "input-error" : ""} px-10 w-full`} id="signup-password" placeholder="••••••••" />
                  <div className=" absolute flex items-center inset-y-0 left-2 pointer-events-none">
                    <Lock className="text-base-content/50" />
                  </div>
                  <button type="button" className="absolute right-2 inset-y-0 text-base-content/40 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <div className="form-control mb-2">
                <label htmlFor="signup-c-password" className="label mb-2">Confirm Password</label>
                <div className="relative">
                  <input type={`${showPassword ? "text" : "password"}`} {...register("confirmPassword")} className={`input input-bordered ${errors.confirmPassword ? "input-error" : ""} px-10 w-full`} id="signup-x-password" placeholder="••••••••" />
                  <div className=" absolute flex items-center inset-y-0 left-2 pointer-events-none">
                    <Lock className="text-base-content/50" />
                  </div>
                  <button type="button" className="absolute right-2 inset-y-0 text-base-content/40 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-full text-white mt-5"
                disabled={isSigningUp}
              >{isSigningUp ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}</button>
            </form>
            {/* Footer */}
            <div className="mt-5 text-center">
              <p>Already have an account.{" "}
                <Link to="/login" className="link link-primary">Login</Link></p>
            </div>
          </div>
        </div>
        <AuthImagePattern title={"Welcome To CodeLab"} subtitle={"Sign up to start your journey with us."} />
      </section>
    </motion.div>
  )
}

export default SignupPage