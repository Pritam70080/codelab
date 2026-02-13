import React,{useState, useMemo} from 'react';
import {motion} from "motion/react";
import {Link} from "react-router-dom";
import {Plus} from "lucide-react";

import {useAuthStore} from "../store/useAuthStore.js";
import { useThemeStore } from '../store/useThemeStore.js';

const ProblemTable = ({problems}) => {
  const {authUser} = useAuthStore();
  const {theme} = useThemeStore();
  const [difficulty, setDifficulty] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedTag, setselectedTag] = useState("ALL");
  const [currentPageNo, setCurrentPageNo] = useState(1);

  const tableBg = {
    corporate: "bg-neutral-50/20",
    dark: "bg-base-200",
    lemonade: "bg-neutral-50/20",
    dim: "bg-base-200"
  }
  const theadBg= {
    corporate: "bg-primary/50",
    dark: "bg-base-300",
    lemonade: "bg-primary/50",
    dim: "bg-base-300"
  }

  const difficulties = ["EASY", "MEDIUM", "HARD"];
  const allTags = useMemo(() => {
    if(!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((problem) => problem.tags?.forEach((tag) => tagsSet.add(tag)));
    return Array.from(tagsSet);
  }, [problems])

  const filteredProblems = useMemo(() => {
    return (problems || [])
    .filter((problem) => problem.title.toLowerCase().includes(search.toLowerCase()))
    .filter((problem) => difficulty === "ALL" ? true: problem.difficulty === difficulty)
    .filter((problem) => selectedTag === "ALL"? true: problem.tags.includes(selectedTag))
  }, [problems, search, difficulty, selectedTag])


  return (
    <motion.div
    initial={{opacity: 0, scale: 0.95}}
    animate={{opacity: 1, scale: 1}}
    transition={{duration: 0.3, delay: 0.2, ease: "easeOut"}}
    className="mt-10 px-2">
      <div className="md:text-right">
        <button className="btn btn-outline btn-primary rounded-xl">
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-center mt-4">
        <input type="text" placeholder="Search by title" className="input input-sm focus:ring-2 focus:ring-primary/80 border-1.5  focus:border-0 md:w-1/3 bg-base-200" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="select select-sm bg-base-200" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="ALL">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>{diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase()}</option>
          ))}
        </select>
        <select className="select select-sm bg-base-200" value={selectedTag} onChange={(e) => setselectedTag(e.target.value)}>
          <option value="ALL">All Tags</option>
           {allTags.map((tag) => (
            <option key={tag} value={tag}>{tag.toString().toLowerCase()}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto mt-4 rounded-lg shadow-md">
        <table className={`table table-md table-zebra ${tableBg[theme]}`}>
          <thead className={`${theadBg[theme]} text-base-content` }>
            <tr>
              <th>Solved</th>
              <th>Title</th>
              <th>Tags</th>
              <th>Difficulty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProblems.map((problem) => (
              <tr key={problem.id}>
                <td></td>
                <td>
                  <Link to={`/problems/${problem.id}`} className="font-semibold hover:underline">{problem.title}</Link>
                </td>
                <td>{problem.tags.map((tag) => (
                  <span className="badge mx-3 badge-accent badge-outline">{tag}</span>
                ))}</td>
                <td>{problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1).toLowerCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default ProblemTable