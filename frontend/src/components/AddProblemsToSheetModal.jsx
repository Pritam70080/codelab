import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Loader2, X } from "lucide-react";

import { useProblemStore } from "../store/useProblemStore.js";

const AddProblemsToSheetModal = ({ isOpen, onClose, onSubmit, isSaving, existingProblemIds = [] }) => {
  const { problems, isProblemsLoading, getAllProblems } = useProblemStore();
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (isOpen) getAllProblems();
  }, [isOpen, getAllProblems]);

  const closeModal = () => {
    setSelectedIds([]);
    onClose();
  };

  const availableProblems = problems.filter((problem) => !existingProblemIds.includes(problem.id));

  const submit = async (event) => {
    event.preventDefault();
    if (selectedIds.length && await onSubmit(selectedIds)) {
      setSelectedIds([]);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div className="card w-full max-w-lg bg-base-100 p-5" onClick={(event) => event.stopPropagation()}>
            <header className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Add problems to sheet</h2>
              <button type="button" className="btn btn-ghost btn-sm" onClick={closeModal} aria-label="Close"><X className="size-4" /></button>
            </header>
            <form onSubmit={submit}>
              <div className="max-h-72 overflow-y-auto rounded-xl border border-base-300">
                {isProblemsLoading ? (
                  <div className="flex justify-center p-5"><Loader2 className="size-5 animate-spin" /></div>
                ) : availableProblems.length ? availableProblems.map((problem) => (
                  <label key={problem.id} className="flex cursor-pointer items-center gap-3 border-b border-base-300/60 px-3 py-2 last:border-0 hover:bg-base-200">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary"
                      checked={selectedIds.includes(problem.id)}
                      onChange={() => setSelectedIds((ids) => ids.includes(problem.id)
                        ? ids.filter((id) => id !== problem.id)
                        : [...ids, problem.id])}
                    />
                    <span className="min-w-0 flex-1 truncate text-sm">{problem.title}</span>
                    <span className="badge badge-ghost badge-sm">{problem.difficulty}</span>
                  </label>
                )) : <p className="p-5 text-center text-sm text-base-content/60">All available problems are already in this sheet.</p>}
              </div>
              <footer className="mt-4 flex justify-end gap-2">
                <button type="button" className="btn btn-ghost btn-sm" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={!selectedIds.length || isSaving}>
                  {isSaving ? <Loader2 className="size-4 animate-spin" /> : `Add ${selectedIds.length || ""} problems`}
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddProblemsToSheetModal;
