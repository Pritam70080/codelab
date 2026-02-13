import React from 'react'
import {pageTransition} from "../lib/pageTransition.js";
import { motion } from 'motion/react';

const ProblemPage = () => {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"

      className="border min-h-screen pt-20"
    >
      ProblemPage
    </motion.div>
  )
}

export default ProblemPage