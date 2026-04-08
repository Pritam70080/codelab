import React, { useEffect } from 'react'
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import { pageTransition } from '../lib/pageTransition.js';
import { ChevronLeft, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore.js';
import LogoutButton from '../components/LogoutButton.jsx';
import SolvedProblemsTable from '../components/SolvedProblemsTable.jsx';
import { useProblemStore } from '../store/useProblemStore.js';
import ProfileStats from '../components/ProfileStats.jsx';
import ContributionHeatmap from '../components/ContributionHeatMap.jsx';
import { useThemeStore } from '../store/useThemeStore.js';

const Profile = () => {
  const { authUser } = useAuthStore();
  const { solvedProblems, isProblemsLoading, getSolvedProblems } = useProblemStore();
  const {theme} = useThemeStore();

  useEffect(() => {
    getSolvedProblems();
  }, []);



  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"

      className="min-h-screen pt-5"
    >
      <section className="grid grid-cols-1 md:grid-cols-12 gap-0.5 px-4 md:px-2">
        <aside className="col-span-4 lg:col-span-3 card md:h-full p-2 gap-2">
          <div className="flex mb-4 items-center ">
            <Link to="/problems" className="btn btn-sm btn-ghost">
              <ChevronLeft className="size-6" />
            </Link>
          </div>
          {/* Profile Image */}
          <div className="px-6">
            <div className="border-5 border-primary/80 rounded-full md:rounded-sm size-25 flex justify-center items-center bg-primary/10 hover:bg-primary/15">
              {authUser.image ? <img src={authUser.image} alt="User Profile" className="avatar" /> :
                <div className="text-5xl font-bold ">{authUser.name.charAt(0).toUpperCase()}</div>
              }</div>
          </div>
          {/* Profile Details */}
          <div className="card-body">
            <div className="flex items-center gap-3.5">
              <h1 className="card-title">{authUser.name}</h1>
              {authUser.role === "ADMIN" && <span className="badge badge-sm badge-primary">Admin</span>}
            </div>
            <h2 className="text-md text-base-content/70 ">{authUser.email}</h2>
            <Link to="/profile/edit" className="w-full">
              <button className="btn btn-primary btn-outline btn-sm mt-1.5 w-full">Edit Profile</button>
            </Link>
            <LogoutButton className="mt-4" >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </LogoutButton>
          </div>

        </aside>
        <main className="col-span-9 card pt-4">
          {/* Analytics */}
          <div className="p-4 grid md:grid-cols-3 gap-4">
            {/* Stats */}
            <div className="col-span-1">
              <ProfileStats problems={solvedProblems} isLoading={isProblemsLoading} />
            </div>

          </div>
          {/* Heatmap */}
          <div className="w-full card px-3">
            <h2 className="font-semibold mb-2">Activity</h2>
            <ContributionHeatmap problems={solvedProblems} />
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span>Less</span>
              <div className={`w-3 h-3 ${theme === "dark" || theme === "dim" ? "bg-gray-600" : "bg-base-300"}`}></div>
              <div className="w-3 h-3 bg-green-300"></div>
              <div className="w-3 h-3 bg-green-500"></div>
              <div className="w-3 h-3 bg-green-700"></div>
              <span>More</span>
            </div>
          </div>
          {/* Submissions */}
          <div className="overflow-x-hidden p-4">
            <SolvedProblemsTable problems={solvedProblems} isLoading={isProblemsLoading} />
          </div>
        </main>
      </section>
    </motion.div>
  )
}

export default Profile