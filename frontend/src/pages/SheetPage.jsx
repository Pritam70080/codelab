import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowDown, ArrowUp, BookOpen, CheckCircle2, ChevronLeft, Loader2, LockKeyhole, Plus, Send } from "lucide-react";

import AddProblemsToSheetModal from "../components/AddProblemsToSheetModal.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useSheetStore } from "../store/useSheetStore.js";

const SheetPage = () => {
  const { sheetId } = useParams();
  const { authUser } = useAuthStore();
  const {
    currentSheet: sheet,
    currentSheetProgress,
    isLoadingSheet,
    isSavingSheet,
    getSheetDetails,
    getSheetProgress,
    updateSheet,
    addProblemsToSheet,
    reorderSheetProblems,
    clearCurrentSheet,
  } = useSheetStore();
  const [isAddProblemsOpen, setIsAddProblemsOpen] = useState(false);
  const isAdmin = authUser.role === "ADMIN";
  const isOwner = sheet?.createdById === authUser.id;
  const canManage = isAdmin && isOwner;

  const loadSheet = useCallback(async () => {
    const loadedSheet = await getSheetDetails(sheetId);
    if (loadedSheet?.hasAccess) await getSheetProgress(sheetId);
  }, [getSheetDetails, getSheetProgress, sheetId]);

  useEffect(() => {
    loadSheet();
    return clearCurrentSheet;
  }, [loadSheet, clearCurrentSheet]);

  const handleAddProblems = async (problemIds) => {
    const added = await addProblemsToSheet(sheetId, problemIds);
    if (added) await loadSheet();
    return added;
  };

  const moveProblem = async (index, direction) => {
    const problemIds = sheet.problems.map(({ problemId }) => problemId);
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= problemIds.length) return;
    [problemIds[index], problemIds[targetIndex]] = [problemIds[targetIndex], problemIds[index]];
    if (await reorderSheetProblems(sheetId, problemIds)) await loadSheet();
  };

  if (isLoadingSheet) {
    return <div className="flex min-h-[60vh] items-center justify-center"><Loader2 className="size-10 animate-spin text-primary" /></div>;
  }
  if (!sheet) return <Navigate to="/sheets" replace />;

  const progress = currentSheetProgress;
  const locked = !sheet.hasAccess && !isAdmin;
  const totalProblems = sheet._count?.problems ?? sheet.problems.length;
  const solvedCount = progress?.solved ?? 0;

  return (
    <main className="min-h-[calc(100vh-5rem)] px-4 pb-10 pt-5">
      <Link to="/sheets" className="btn btn-ghost btn-sm mb-3"><ChevronLeft className="size-4" /> All sheets</Link>

      <section className="relative overflow-hidden rounded-3xl border border-base-content/10 bg-gradient-to-br from-indigo-500/20 via-primary/10 to-cyan-400/20 p-5 sm:p-8">
        <div className="absolute -right-12 -top-16 size-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`badge ${sheet.isPaid ? "badge-secondary" : "badge-success"}`}>{sheet.isPaid ? "Paid" : "Free"}</span>
            {!sheet.isPublished && isAdmin && <span className="badge badge-warning">Draft</span>}
          </div>
          <h1 className="max-w-3xl text-3xl font-bold sm:text-4xl">{sheet.title}</h1>
          {sheet.description && <p className="mt-2 max-w-2xl text-base-content/70">{sheet.description}</p>}

          {!locked && (
            <div className="mt-6 max-w-xl">
              <div className="mb-2 flex justify-between text-sm">
                <span>{solvedCount} of {totalProblems} problems solved</span>
                <span>{progress?.percentage ?? 0}%</span>
              </div>
              <progress className="progress progress-primary h-3 w-full" value={progress?.percentage ?? 0} max="100" />
            </div>
          )}
        </div>
      </section>

      {locked ? (
        <section className="relative mt-5 overflow-hidden rounded-3xl border border-base-300">
          <div aria-hidden="true" className="pointer-events-none select-none space-y-3 p-5 blur-md" inert>
            {[0, 1, 2].map((item) => (
              <div key={item} className="flex h-16 items-center gap-4 rounded-xl bg-base-200 px-4">
                <div className="size-8 rounded-full bg-primary/30" />
                <div className="h-4 w-1/2 rounded bg-base-content/20" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-base-100/65 p-5 text-center backdrop-blur-[2px]">
            <div className="mb-3 flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary"><LockKeyhole className="size-7" /></div>
            <h2 className="text-xl font-bold">Unlock this sheet</h2>
            <p className="mt-1 max-w-md text-sm text-base-content/70">Purchase access to view its problems, solve them, and track your progress.</p>
            <p className="mt-3 text-2xl font-extrabold">{sheet.currency || "INR"} {sheet.price}</p>
            <Link to={`/payment?sheetId=${encodeURIComponent(sheet.id)}`} className="btn btn-primary mt-3">
              <LockKeyhole className="size-4" /> Continue to payment
            </Link>
          </div>
        </section>
      ) : (
        <section className="mt-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Problems <span className="text-base-content/50">({totalProblems})</span></h2>
            {canManage && (
              <div className="flex flex-wrap gap-2">
                <button className="btn btn-outline btn-sm" onClick={() => setIsAddProblemsOpen(true)}><Plus className="size-4" /> Add problems</button>
                <button
                  className="btn btn-primary btn-sm"
                  disabled={isSavingSheet}
                  onClick={async () => {
                    if (await updateSheet(sheet.id, { isPublished: !sheet.isPublished })) await loadSheet();
                  }}
                >
                  {isSavingSheet ? <Loader2 className="size-4 animate-spin" /> : sheet.isPublished ? <BookOpen className="size-4" /> : <Send className="size-4" />}
                  {sheet.isPublished ? "Unpublish" : "Publish"}
                </button>
              </div>
            )}
          </div>
          {sheet.problems.length ? (
            <div className="space-y-2">
              {sheet.problems.map(({ id, problemId, problem, order }, index) => {
                const solved = progress?.problems?.find((item) => item.id === problemId)?.solved;
                const problemRow = (
                  <>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{order}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{problem.title}</span>
                      <span className="text-xs text-base-content/60">{problem.difficulty}</span>
                    </span>
                    {solved && <CheckCircle2 className="size-5 shrink-0 text-success" />}
                  </>
                );

                return (
                  <div key={id} className="flex items-center gap-2 rounded-xl border border-base-300 bg-base-100 p-3 shadow-sm transition hover:border-primary/40">
                    <Link to={`/problem/${problemId}`} className="flex min-w-0 flex-1 items-center gap-3">
                      {problemRow}
                    </Link>
                    {canManage && (
                      <div className="flex shrink-0 gap-1">
                        <button className="btn btn-ghost btn-xs" onClick={() => moveProblem(index, -1)} disabled={index === 0} aria-label="Move problem up"><ArrowUp className="size-4" /></button>
                        <button className="btn btn-ghost btn-xs" onClick={() => moveProblem(index, 1)} disabled={index === sheet.problems.length - 1} aria-label="Move problem down"><ArrowDown className="size-4" /></button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-base-300 p-8 text-center text-base-content/60">
              <BookOpen className="mx-auto mb-2 size-8 opacity-50" />
              This sheet does not have any problems yet.
            </div>
          )}
        </section>
      )}

      {canManage && (
        <AddProblemsToSheetModal
          isOpen={isAddProblemsOpen}
          onClose={() => setIsAddProblemsOpen(false)}
          onSubmit={handleAddProblems}
          isSaving={isSavingSheet}
          existingProblemIds={sheet.problems.map(({ problemId }) => problemId)}
        />
      )}
    </main>
  );
};

export default SheetPage;
