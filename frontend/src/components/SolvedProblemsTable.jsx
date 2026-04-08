import { ListChecks } from "lucide-react";
import { Link } from "react-router-dom";

// Helper: time ago
const getTimeAgo = (dateString) => {
  const now = new Date();
  const past = new Date(dateString);
  const diff = Math.floor((now - past) / 1000); // seconds

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;

  return past.toLocaleDateString();
};

// Helper: difficulty color
const getDifficultyStyle = (difficulty) => {
  switch (difficulty) {
    case "EASY":
      return "bg-green-100 text-green-700";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";
    case "HARD":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const SolvedProblemsTable = ({ problems = [], isLoading }) => {
  const sortedProblems = [...problems].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">Loading...</div>
    );
  }

  return (
    <div className="bg-base-100 shadow-md rounded-2xl pb-4 px-4">
      
      {/* Header */}
      <div className="flex items-center pb-3 border-b border-base-300 mb-3 justify-between">
        <div className="flex items-center gap-2">
          <ListChecks className="size-5 text-primary" />
        <span className="font-semibold text-md text-base-content px-4 bg-primary/30 rounded-lg">Recent AC</span>
        </div>
        <Link to="/submissions" className="hover:link text-xs text-base-content">View all Submissions</Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            {sortedProblems.map((problem) => (
              <tr
                key={problem.id}
              >
                {/* Title */}
                <td className="font-medium text-base-content">
                  <Link
                    to={`/problem/${problem.id}`}
                    className="hover:text-primary transition"
                  >
                    {problem.title}
                  </Link>

                  {/* Tags */}
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {problem.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="badge badge-sm badge-soft rounded-xl"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>

                {/* Difficulty */}
                <td>
                  <span
                    className={`text-xs px-2 py-1 rounded-md font-medium ${getDifficultyStyle(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty.charAt(0)  + problem.difficulty.slice(1).toLowerCase()}
                  </span>
                </td>

                {/* Time Ago */}
                <td className="text-sm text-base-content/70 whitespace-nowrap">
                  {getTimeAgo(problem.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedProblems.length === 0 && (
          <div className="text-center text-base-content/70 py-6">
            No solved problems yet 🚀
          </div>
        )}
      </div>
    </div>
  );
};

export default SolvedProblemsTable;