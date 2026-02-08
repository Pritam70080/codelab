import React from 'react'
import {motion} from "motion/react";
import { pageTransition } from '../lib/pageTransition.js';

const AboutPage = () => {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="hidden"

      className="border min-h-screen relative pt-14"
    >
      
      About
    </motion.div>
  )
}

export default AboutPage