import { createElement } from "react";
import { BookOpenCheck, CheckCircle2, Code2, Target } from "lucide-react";

const ProfileStats = ({ problems = [], submissions = [], sheets = [], isLoading }) => {
  const acceptedSubmissions = submissions.filter((submission) => submission.status === "Accepted").length;
  const sheetTotals = sheets.reduce((totals, sheet) => ({
    solved: totals.solved + (sheet.progress?.solved ?? 0),
    total: totals.total + (sheet.progress?.total ?? sheet._count?.problems ?? 0),
  }), { solved: 0, total: 0 });
  const acceptanceRate = submissions.length
    ? Math.round((acceptedSubmissions / submissions.length) * 100)
    : 0;
  const sheetProgress = sheetTotals.total
    ? Math.round((sheetTotals.solved / sheetTotals.total) * 100)
    : 0;

  const stats = [
    { label: "Problems solved", value: problems.length, icon: CheckCircle2, color: "text-success" },
    { label: "Submissions", value: submissions.length, icon: Code2, color: "text-primary" },
    { label: "Acceptance rate", value: `${acceptanceRate}%`, icon: Target, color: "text-secondary" },
    { label: "Sheet progress", value: `${sheetProgress}%`, icon: BookOpenCheck, color: "text-warning" },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card h-28 animate-pulse border border-base-300/70 bg-base-100 p-4">
            <div className="h-3 w-24 rounded bg-base-300" />
            <div className="mt-4 h-7 w-16 rounded bg-base-300" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article key={stat.label} className="card border border-base-300/70 bg-base-100 p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-base-content/65">{stat.label}</p>
            {createElement(stat.icon, { className: `size-5 ${stat.color}` })}
          </div>
          <p className="mt-3 text-3xl font-bold tracking-tight">{stat.value}</p>
        </article>
      ))}
    </div>
  );
};

export default ProfileStats;
