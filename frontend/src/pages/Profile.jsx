import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ContributionHeatmap from "../components/ContributionHeatmap.jsx";
import ProfileStats from "../components/ProfileStats.jsx";
import SheetCards from "../components/SheetCards.jsx";
import SolvedProblemsTable from "../components/SolvedProblemsTable.jsx";
import SubmissionsList from "../components/SubmissionsList.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useProblemStore } from "../store/useProblemStore.js";
import { useSheetStore } from "../store/useSheetStore.js";
import { useSubmissionStore } from "../store/useSubmissionStore.js";
import { useThemeStore } from "../store/useThemeStore.js";

const difficultyColors = {
  Easy: "#22c55e",
  Medium: "#f59e0b",
  Hard: "#ef4444",
};

const Profile = () => {
  const { authUser } = useAuthStore();
  const { solvedProblems, isProblemsLoading, getSolvedProblems } = useProblemStore();
  const { submissions, isSubmissionLoading, getAllSubmissions } = useSubmissionStore();
  const { sheets, isLoadingSheets, getSheets } = useSheetStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    getSolvedProblems();
    getAllSubmissions();
    getSheets({ mine: authUser.role === "ADMIN" });
  }, [authUser.role, getSolvedProblems, getAllSubmissions, getSheets]);

  const recentSubmissions = [...submissions]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  const recentSolvedProblems = [...solvedProblems]
    .sort((a, b) => new Date(b.solvedBy?.[0]?.createdAt ?? b.updatedAt) - new Date(a.solvedBy?.[0]?.createdAt ?? a.updatedAt))
    .slice(0, 5);

  const difficultyData = ["Easy", "Medium", "Hard"].map((difficulty) => ({
    difficulty,
    solved: solvedProblems.filter((problem) => problem.difficulty === difficulty.toUpperCase()).length,
  }));

  const now = new Date();
  const submissionActivity = Array.from({ length: 6 }, (_, index) => {
    const month = new Date(now.getFullYear(), now.getMonth() - 5 + index, 1);
    const monthSubmissions = submissions.filter((submission) => {
      const createdAt = new Date(submission.createdAt);
      return createdAt.getFullYear() === month.getFullYear() && createdAt.getMonth() === month.getMonth();
    });
    return {
      month: month.toLocaleString(undefined, { month: "short" }),
      submissions: monthSubmissions.length,
      accepted: monthSubmissions.filter((submission) => submission.status === "Accepted").length,
    };
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Your workspace</p>
          <h1 className="mt-1 text-3xl font-bold">Profile overview</h1>
          <p className="mt-1 text-sm text-base-content/65">Your problem-solving activity and progress in one place.</p>
        </div>
        <Link to="/problems" className="btn btn-primary btn-sm">Solve a problem</Link>
      </header>

      <ProfileStats
        problems={solvedProblems}
        submissions={submissions}
        sheets={sheets}
        isLoading={isProblemsLoading || isSubmissionLoading || isLoadingSheets}
      />

      <section className="card border border-base-300/70 bg-base-100 p-4 sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Activity</h2>
            <p className="text-sm text-base-content/60">Your solved problems over the past year</p>
          </div>
          <span className="badge badge-outline">{solvedProblems.length} solved</span>
        </div>
        <ContributionHeatmap problems={solvedProblems} />
        <div className="mt-3 flex items-center justify-end gap-2 text-xs text-base-content/60">
          <span>Less</span>
          <div className={`size-3 rounded-sm ${theme === "dark" || theme === "dim" ? "bg-gray-600" : "bg-base-300"}`} />
          <div className="size-3 rounded-sm bg-green-300" />
          <div className="size-3 rounded-sm bg-green-500" />
          <div className="size-3 rounded-sm bg-green-700" />
          <span>More</span>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="card min-w-0 border border-base-300/70 bg-base-100 p-4 sm:p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Solved by difficulty</h2>
            <p className="text-sm text-base-content/60">Breakdown of your completed problems</p>
          </div>
          <div className="h-64 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={difficultyData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-base-300)" />
                <XAxis dataKey="difficulty" tick={{ fill: "var(--color-base-content)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: "var(--color-base-content)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-base-100)", borderColor: "var(--color-base-300)", borderRadius: 12 }}
                  labelStyle={{ color: "var(--color-base-content)" }}
                />
                <Bar dataKey="solved" name="Solved" radius={[6, 6, 0, 0]}>
                  {difficultyData.map((entry) => <Cell key={entry.difficulty} fill={difficultyColors[entry.difficulty]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card min-w-0 border border-base-300/70 bg-base-100 p-4 sm:p-5">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Submission activity</h2>
            <p className="text-sm text-base-content/60">Attempts and accepted submissions over six months</p>
          </div>
          <div className="h-64 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={submissionActivity} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-base-300)" />
                <XAxis dataKey="month" tick={{ fill: "var(--color-base-content)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: "var(--color-base-content)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-base-100)", borderColor: "var(--color-base-300)", borderRadius: 12 }}
                  labelStyle={{ color: "var(--color-base-content)" }}
                />
                <Legend />
                <Bar dataKey="submissions" name="Attempts" fill="#6366f1" radius={[5, 5, 0, 0]} />
                <Bar dataKey="accepted" name="Accepted" fill="#22c55e" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{authUser.role === "ADMIN" ? "Sheets you created" : "Your sheet progress"}</h2>
            <p className="text-sm text-base-content/60">Keep track of the learning paths you are working through.</p>
          </div>
          <Link to="/sheets" className="link link-primary text-sm">Browse sheets</Link>
        </div>
        <SheetCards
          sheets={sheets}
          isLoading={isLoadingSheets}
          emptyMessage={authUser.role === "ADMIN" ? "You have not created any sheets yet." : "No published sheets are available yet."}
        />
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Recently solved</h2>
          <p className="text-sm text-base-content/60">The latest problems you completed</p>
        </div>
        <SolvedProblemsTable problems={recentSolvedProblems} isLoading={isProblemsLoading} />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Recent submissions</h2>
            <p className="text-sm text-base-content/60">Your latest coding attempts</p>
          </div>
          <Link to="/submissions" className="link link-primary text-sm">View all</Link>
        </div>
        <SubmissionsList submissions={recentSubmissions} isLoading={isSubmissionLoading} />
      </section>
    </div>
  );
};

export default Profile;
