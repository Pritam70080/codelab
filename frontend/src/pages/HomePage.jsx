import React, { useEffect } from 'react'
import { motion } from 'motion/react';

import {pageTransition} from "../lib/pageTransition.js";
import {useProblemStore} from "../store/useProblemStore.js";
import { Loader2 } from 'lucide-react';
import ProblemTable from '../components/ProblemTable.jsx';

const HomePage = () => {
  const {problems, isProblemsLoading, getAllProblems} = useProblemStore();

  useEffect(() => {
    getAllProblems();
  }, []);

  if(isProblemsLoading) {
    return (
      <motion.div 
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen w-full flex items-center justify-center">
        <Loader2 className="size-12 animate-spin text-base-content"/>
      </motion.div>
    )
  }
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"

      className="min-h-screen pt-14 px-4"
    >
    <div className="text-center">
      <h1 className="font-bold text-4xl text-base-content">Welcome to <span className="text-primary">CodeLab</span></h1>
      
    </div>
    {problems.length > 0 ? <ProblemTable problems={problems} /> : <div className="text-center mt-14">
          <span className="text-8xl">👀</span>
          <p className="text-base-content text-2xl mt-4">No Problems found. Sorry for inconvenience</p>
      </div>}
    </motion.div>
  )
}

export default HomePage