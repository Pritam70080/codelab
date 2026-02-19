import React from 'react'
import {motion} from "motion/react";
import { pageTransition } from '../lib/pageTransition.js';
import {Link} from "react-router-dom";

const PageNotFound = () => {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"

      className=" min-h-screen pt-20 px-4 text-center"
    >
      <h1 className="text-9xl text-base-content font-bold mt-40">404</h1>
      <p className="text-base-content/70">Looks like you are lost. <Link to="/" className="text-primary font-semibold hover:link">Home</Link></p>
    </motion.div>
  )
}

export default PageNotFound