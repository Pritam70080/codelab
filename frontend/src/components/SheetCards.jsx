import { ArrowUpRight, BookOpenCheck, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

const gradients = [
  "from-indigo-500/20 via-blue-500/10 to-cyan-400/20",
  "from-fuchsia-500/20 via-purple-500/10 to-indigo-400/20",
  "from-emerald-500/20 via-teal-500/10 to-sky-400/20",
  "from-amber-500/20 via-orange-500/10 to-rose-400/20",
];

const SheetCards = ({ sheets = [], isLoading = false, emptyMessage = "No sheets available yet." }) => {
  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="h-40 animate-pulse rounded-2xl bg-base-200" />
        ))}
      </div>
    );
  }

  if (!sheets.length) {
    return <div className="rounded-2xl border border-dashed border-base-300 p-6 text-center text-sm text-base-content/60">{emptyMessage}</div>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {sheets.map((sheet, index) => {
        const total = sheet.progress?.total ?? sheet._count?.problems ?? 0;
        const solved = sheet.progress?.solved ?? 0;
        const progress = total ? Math.round((solved / total) * 100) : 0;
        const locked = sheet.isPaid && !sheet.hasAccess;

        return (
          <Link
            key={sheet.id}
            to={`/sheets/${sheet.id}`}
            className={`group relative flex min-h-40 flex-col overflow-hidden rounded-2xl border border-base-content/10 bg-gradient-to-br ${gradients[index % gradients.length]} p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary`}
          >
            <div className="pointer-events-none absolute -right-10 -top-12 size-36 rounded-full bg-white/10 blur-2xl transition group-hover:scale-125" />
            <div className="relative flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="line-clamp-2 text-lg font-bold">{sheet.title}</h3>
                {sheet.description && <p className="mt-1 line-clamp-2 text-sm text-base-content/70">{sheet.description}</p>}
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-base-content/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>

            <div className="relative mt-auto flex items-center justify-between gap-2 pt-4">
              <div className="flex items-center gap-2">
                <span className={`badge badge-sm ${sheet.isPaid ? "badge-secondary" : "badge-success"}`}>
                  {sheet.isPaid ? "Paid" : "Free"}
                </span>
                {!sheet.isPublished && <span className="badge badge-sm badge-warning">Draft</span>}
                {locked && <span className="inline-flex items-center gap-1 text-xs font-medium text-base-content/70"><LockKeyhole className="size-3.5" />Locked</span>}
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                <BookOpenCheck className="size-4" />
                {solved} / {total} solved
              </span>
            </div>

            <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-base-content/10">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default SheetCards;
