import React from 'react'
import {motion} from "motion/react";

import { pageTransition } from '../lib/pageTransition.js';
import CreateProblemForm from '../components/CreateProblemForm.jsx';

const AddProblem = () => {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"

      className="min-h-screen pt-4 px-4"
    >
      
      <CreateProblemForm />
    </motion.div>
  )
}

export default AddProblem