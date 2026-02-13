import React from 'react'
import { motion } from "motion/react"
import { Link } from 'react-router-dom'
import { pageTransition } from '../lib/pageTransition.js'
import { StickyNote, Code, ChevronDown } from "lucide-react";

const codeSnippet = 
`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`;



const LandingPage = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"

      className="min-h-screen relative pt-20 text-center border border-transparent px-3 origin-bottom"
    >
      <div className="absolute top-22 -left-20 bg-primary blur-3xl opacity-30 h-1/8 w-1/3 rounded-lg"></div>
      <main>
        <div className="w-67 mx-auto bg-primary/20 rounded-full mt-10 md:mt-15 flex items-center gap-1.5 p-1 px-2 ">
          <div className="size-2.5 animate-pulse bg-primary rounded-full"></div>
          Every expert was once a beginner
        </div>
        <h1 className="text-4xl md:text-7xl font-semibold forn-mono mt-8 tracking-wide leading-tight">Start Your <span className="text-primary underline ">DSA</span> Journey With <br /><span className="text-primary ">CodeLab</span></h1>
        <p className="md:text-lg mt-5">Learn, practice, and master coding with <span className="text-primary">structured sheets</span> and <span className="text-primary">real-world problems</span> — all in one place.</p>
        <div className="flex flex-col md:flex-row gap-5 justify-center mt-8 md:mt-5">
          <Link to="/home">
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="btn btn-primary rounded-xl text-white ">Start Coding<Code /></motion.button>
          </Link>
          <Link to="/sheets">
            <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="btn border-2 border-primary rounded-xl bg-base-100">Explore Sheets<StickyNote /></motion.button>
          </Link>
        </div>
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
          className="btn btn-ghost rounded-full text-2xl mt-8 hover:bg-base-100 hover:border-base-100 cursor-default"><ChevronDown /></motion.button>
      </main>
      <section className="mt-36 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-semibold font-mono">
              Practice DSA with <span className="text-primary">clarity</span>, not chaos
            </h2>

            <p className="mt-6 text-base md:text-lg text-base-content/80">
              CodeLab helps you master Data Structures & Algorithms through
              structured sheets and hand-picked problems — designed to build
              confidence, not confusion.
            </p>

            <p className="mt-4 text-base-content/70">
              Every problem has a purpose. Every sheet has a progression.
              You always know <span className="text-primary">what to solve next</span>.
            </p>
          </motion.div>

          {/* Animated Coding Pattern */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative hidden md:block"
          >
            {/* Background grid */}
            <div className="absolute inset-0 rounded-2xl bg-base-200/40 backdrop-blur-xl overflow-hidden">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, hsl(var(--bc)/0.15) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--bc)/0.15) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
            </div>

            {/* Animated Code Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative hidden md:block"
            >
              <div className="relative rounded-2xl border border-base-300 bg-base-100 shadow-xl overflow-hidden">

                {/* Editor header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-base-200 border-b border-base-300">
                  <span className="h-3 w-3 rounded-full bg-error" />
                  <span className="h-3 w-3 rounded-full bg-warning" />
                  <span className="h-3 w-3 rounded-full bg-success" />
                  <span className="ml-3 text-sm opacity-70 font-mono">practice.js</span>
                </div>

                {/* Code content */}
                <motion.pre
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="py-4 px-12 text-justify text-sm font-mono leading-relaxed text-base-content whitespace-pre"
                >
                  {codeSnippet}
                </motion.pre>

              </div>
            </motion.div>


            {/* Ambient glow */}
            <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-primary/20 blur-3xl rounded-full" />
          </motion.div>


        </div>
      </section>
      <section className="mt-40 px-4">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold font-mono">
            Why developers choose <span className="text-primary">CodeLab</span>
          </h2>

          <p className="mt-6 text-base md:text-lg text-base-content/80">
            Because learning should feel structured, motivating, and rewarding.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {[
            {
              title: "Structured Sheets",
              desc: "Curated paths that take you from fundamentals to advanced topics without overwhelm."
            },
            {
              title: "Real Problem Solving",
              desc: "Interview-style questions that improve logic, speed, and confidence."
            },
            {
              title: "Stay Consistent",
              desc: "Track progress, revisit weak topics, and build a daily coding habit."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="card bg-base-100/70 backdrop-blur-xl shadow-lg p-8 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-primary">
                {item.title}
              </h3>
              <p className="mt-4 text-base-content/80">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className="mt-40 px-4 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-primary/10 rounded-3xl p-12"
        >
          <h2 className="text-3xl md:text-5xl font-semibold font-mono">
            Build confidence, one problem at a time
          </h2>

          <p className="mt-6 text-base md:text-lg text-base-content/80">
            Start your DSA journey with a platform designed to help you grow —
            step by step.
          </p>

          <div className="mt-8">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary text-white rounded-xl px-8"
              >
                Start Coding Today
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>


    </motion.div>
  )
}

export default LandingPage