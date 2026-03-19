import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bookmark, Check, ChevronRight, Clock, Code2, FileText, Home, Lightbulb, Loader2, MessageSquare, Play, Share2, Terminal, ThumbsUp, } from 'lucide-react';
import { useParams, Link } from "react-router-dom";
import Editor from "@monaco-editor/react";

import { pageTransition } from "../lib/pageTransition.js";
import {getJudge0LanguageId} from "../lib/lang.js";
import { useProblemStore } from '../store/useProblemStore.js';
import { useSubmissionStore } from "../store/useSubmissionStore.js";
import { useThemeStore } from '../store/useThemeStore.js';
import { useExecutionStore } from "../store/useExecutionStore.js";
import SubmissionsList from '../components/SubmissionsList.jsx';
import SubmissionResults from '../components/SubmissionResults.jsx';

const ProblemPage = () => {
  const { id } = useParams();
  const { problem, getProblemById, isProblemLoading } = useProblemStore();
  const { theme } = useThemeStore();
  const { submissionCount, submissionsForProblem, isSubmissionLoading, getSubmissionCountForProblem, getSubmissionForProblem } = useSubmissionStore();
  const { isExecuting, submission, executeCode, submitCode, clearSubmission } = useExecutionStore();

  {/* States */ }
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [code, setCode] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [activeTab, setActiveTab] = useState("description");

  const editorTheme = {
    corporate: "vs-light",
    dark: "vs-dark",
    lemonade: "vs-light",
    dim: "vs-dark",
  }


  useEffect(() => {
    getProblemById(id);
    getSubmissionCountForProblem(id);
    clearSubmission();
  }, [id, getProblemById]);

  useEffect(() => {
    if (problem) {
      setCode(problem.codeSnippets?.[selectedLanguage] || "")
      setTestCases(problem.testCases?.map((tc) => ({
        input: tc.input,
        output: tc.output
      })) || [])
    }
  }, [problem, selectedLanguage])

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id])

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(problem.codeSnippets?.[lang] || "");
  }

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getJudge0LanguageId(selectedLanguage);
      const stdin = problem.testCases.map((tc) => tc.input);
      const expected_outputs = problem.testCases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs);
    } catch (error) {
      console.error("Error execution", error);
    }
  }

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    try {
      const language_id = getJudge0LanguageId(selectedLanguage);
      const stdin = problem.testCases.map((tc) => tc.input);
      const expected_outputs = problem.testCases.map((tc) => tc.output);
      await submitCode(code, language_id, stdin, id, expected_outputs );
      setActiveTab("submissions");
    } catch (error) {
      console.error("Error submission", error);
    }
  }

  if (isProblemLoading) {
    return (<motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen w-full flex items-center justify-center">
      <Loader2 className="size-12 animate-spin text-base-content" />
    </motion.div>)
  }

  if (!problem) {
    return (<motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen w-full flex justify-center items-center"
    >
      <h1 className="text-6xl fonnt-bold text-base-content text-shadow-2xs">
        404
      </h1>
      <p className="text-justify text-base-content/70">Required Problem doesn't exist</p>
    </motion.div>)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (<div className="prose max-w-none">
          <p className="text-md text-base-content mb-4">{problem?.description}</p>

          {problem.examples && (
            <>
              <h3 className="text-md font-bold mb-2">Examples:</h3>
              {Object.entries(problem.examples).map(
                ([lang, example], idx) => (
                  <div
                    key={lang}
                    className="bg-base-200 p-3 rounded-xl mb-2.5 font-mono"
                  >
                    <div className="mb-2.5">
                      <div className="text-indigo-400 mb-1 font-semibold">
                        Input:
                      </div>
                      <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                        {example.input}
                      </span>
                    </div>
                    <div className="mb-2.5">
                      <div className="text-indigo-400 mb-1 font-semibold">
                        Output:
                      </div>
                      <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                        {example.output}
                      </span>
                    </div>
                    {example.explanation && (
                      <div>
                        <div className="text-emerald-400 mb-1 font-semibold">
                          Explanation:
                        </div>
                        <p className="text-base-content/60  font-semibold">
                          {example.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )
              )}
            </>
          )}

          {problem.constraints && (
            <>
              <h3 className="text-md font-bold mb-2.5">Constraints:</h3>
              <div className="bg-base-200 p-4 rounded-xl mb-6">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-justify text-sm">
                  {problem.constraints}
                </span>
              </div>
            </>
          )}
        </div>)
      case "submissions":
        return (<SubmissionsList
          submissions={submissionsForProblem}
          isLoading={isSubmissionLoading}
        />);
      case "discussion":
        return (
          <div className="p-4 text-center text-base-content/70">
            No discussions yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {problem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints available
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen px-2 w-full"
    >
      <nav className="pt-2 px-2 w-full pb-1.5 shadow-sm bg-base-100 rounded-xl">
        {/* Back button with Problem Title */}
        <div className="flex gap-2">
          <Link to="/problems" className="text-primary flex gap-1 items-center hover:text-primary/80">
            <Home className="size-6" />
            <ChevronRight className="size6" />
          </Link>
          <span className="text-primary text-lg">{problem?.title}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-base-content/70 mt-1 gap-1.5 text-sm">
            <Clock className="hidden md:inline size-4" />
            <span className="hidden md:inline">
              Updated{" "}{new Date(problem?.updatedAt).toLocaleString("en-Us", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="hidden md:inline text-base-content/30">•</span>
            <Check className="size-5 md:size-4" />
            <span>{submissionCount} Submissions</span>
            <span className="hidden md:inline text-base-content/30">•</span>
            <ThumbsUp className="hidden md:inline w-4 h-4" />
            <span className="hidden md:inline">95% Success Rate</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-4 pr-2 lg:pr-10">
            <button
              className={`btn btn-ghost btn-circle ${isBookmarked ? "text-primary" : ""
                }`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className="size-5" />
            </button>
            <button className="btn btn-ghost btn-circle">
              <Share2 className="size-5" />
            </button>
            <select
              className="select select-bordered select-primary w-40"
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {Object.keys(problem?.codeSnippets || {}).map((lang) => (
                <option key={lang} value={lang}>
                  {lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </nav>
      <div className="container p-2 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
          {/* Left Side Description */}
          <div className="card bg-base-100 shadow-xl ">
            <div className="card-body p-0">
              {/* Tabs */}
              <div className="tabs tabs-bordered shadow-sm bg-base-200/80 rounded-t-lg">
                <button className={`tab gap-2 ${activeTab === "description" ? "tab-active" : ""}`}
                  onClick={() => setActiveTab("description")}
                ><FileText className="size-4" /> Description</button>
                <button
                  className={`tab gap-2 ${activeTab === "submissions" ? "tab-active" : ""
                    }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "discussion" ? "tab-active" : ""
                    }`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
                <button
                  className={`tab gap-2 ${activeTab === "hints" ? "tab-active" : ""
                    }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>
              {/* Tab Content */}
              <div className="p-4 overflow-x-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ type: "spring", damping: 30, stiffness: 700 }}
                    className="w-full"
                  >
                    {renderTabContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          {/* Right Side Code Part */}
          <div className="card bg-base-200 shadow-xl rounded-t-lg">
            <div className="">
              <div className="tabs tabs-bordered bg-base-200/80 rounded-t-lg">
                <button className="tab tab-active gap-2">
                  <Terminal className="w-4 h-4" />
                  Code Editor
                </button>
              </div>
              <div className="h-90 w-full shadow-md">
                <Editor
                  height="100%"
                  language={selectedLanguage.toLowerCase()}
                  theme={editorTheme[theme]}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: true,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    automaticLayout: true,
                    padding: { top: 8 },
                  }}
                />
              </div>
              <div className="border-t-2 py-1.5 px-4 border-base-300 bg-base-200/80">
                <div className="flex gap-2 items-center justify-end">
                  <button className={`btn btn-sm btn-secondary rounded-lg ${isExecuting ? "loading" : ""}`}
                    disabled={isExecuting}
                    onClick={handleRunCode}
                  >{isExecuting ? "" : <Play className="size-4" />}</button>
                  <button className="btn btn-sm btn-primary rounded-lg"
                    disabled={isExecuting}
                    onClick={handleSubmitCode}
                  >{isExecuting ? "judging..." : "Submit"}</button>
                </div>
              </div>
            </div>
            {/* TestCase Result */}
            <div className="card bg-base-200/80 rounded-b-lg shadow-lg">
              {submission ? (<SubmissionResults submission={submission} />) :
                (<><div className="flex items-center justify-between pt-2.5 px-4">
                  <h3 className="text-sm font-bold">Test Cases</h3>
                </div>
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                      <thead>
                        <tr>
                          <th className="text-sm">Input</th>
                          <th className="text-sm">Expected Output</th>
                        </tr>
                      </thead>
                      <tbody>
                        {testCases.map((testCase, index) => (
                          <tr key={index}>
                            <td className="font-mono text-white"><span className="bg-black/80 px-2 py-0.5 rounded-lg">{testCase.input}</span></td>
                            <td className="font-mono text-white"><span className="bg-black/80 px-2 py-0.5 rounded-lg">{testCase.output}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProblemPage