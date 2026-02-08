import React from 'react'


const HomePage = () => {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="hidden"

      className="border min-h-screen relative pt-14"
    >
      <div className="absolute top-5 -left-12 bg-primary blur-3xl opacity-30 h-1/3 w-1/3 rounded-lg"></div>
      Home
    </motion.div>
  )
}

export default HomePage