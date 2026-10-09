import React, { useEffect } from 'react'
import {useProblemStore} from "../store/useProblemStore.js";
import { Loader2 } from 'lucide-react';
import ProblemTable from '../components/ProblemTable.jsx';
import { Link } from 'react-router-dom';
import { useSheetStore } from '../store/useSheetStore.js';
import SheetCards from '../components/SheetCards.jsx';

const HomePage = () => {
  const {problems, isProblemsLoading, getAllProblems} = useProblemStore();
  const {sheets, isLoadingSheets, getSheets} = useSheetStore();

  useEffect(() => {
    getAllProblems();
    getSheets();
  }, [getAllProblems, getSheets]);

  if(isProblemsLoading && isLoadingSheets) {
    return (
      <div
      className="min-h-screen w-full flex items-center justify-center">
        <Loader2 className="size-12 animate-spin text-base-content"/>
      </div>
    )
  }
  return (
    <div
      className="min-h-[calc(100vh-5rem)] px-4 pb-8 pt-4"
    >
      <section className="mb-5">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Learning sheets</h1>
            <p className="text-sm text-base-content/60">Curated paths to build your problem-solving skills.</p>
          </div>
          <Link to="/sheets" className="btn btn-ghost btn-sm text-primary">Browse all</Link>
        </div>
        <SheetCards sheets={sheets.filter((sheet) => sheet.isPublished).slice(0, 3)} isLoading={isLoadingSheets} emptyMessage="No published sheets yet." />
      </section>
      <section>
        <div className="mb-0.5 flex items-center justify-between">
          <h2 className="text-lg font-bold">Problems</h2>
        </div>
        {problems.length > 0 ? <ProblemTable problems={problems} /> : <div className="text-center mt-8">
          <span className="text-8xl">👀</span>
          <p className="text-base-content text-2xl mt-4">No Problems found. Sorry for inconvenience</p>
        </div>}
      </section>
    </div>
  )
}

export default HomePage