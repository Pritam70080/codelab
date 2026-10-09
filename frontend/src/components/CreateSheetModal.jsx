import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Loader2, X } from "lucide-react";

import { useProblemStore } from "../store/useProblemStore.js";

const CreateSheetSchema = z.object({
  title: z.string().trim().min(2, "Enter a sheet title."),
  description: z.string().optional(),
  slug: z.string().optional(),
  isPaid: z.boolean(),
  price: z.string(),
}).superRefine(({ isPaid, price }, context) => {
  if (isPaid && (!price || !Number.isInteger(Number(price)) || Number(price) <= 0)) {
    context.addIssue({
      code: "custom",
      path: ["price"],
      message: "Enter a positive whole-number price.",
    });
  }
});

const CreateSheetModal = ({ isOpen, onClose, onSubmit, isSaving }) => {
  const { problems, isProblemsLoading, getAllProblems } = useProblemStore();
  const [selectedProblemIds, setSelectedProblemIds] = useState([]);
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(CreateSheetSchema),
    defaultValues: { title: "", description: "", slug: "", isPaid: false, price: "" },
  });
  const isPaid = useWatch({ control, name: "isPaid" });

  useEffect(() => {
    if (isOpen) getAllProblems();
  }, [isOpen, getAllProblems]);

  const closeModal = () => {
    reset();
    setSelectedProblemIds([]);
    onClose();
  };

  const submit = async (values, publish) => {
    const succeeded = await onSubmit({
      title: values.title,
      description: values.description || null,
      ...(values.slug.trim() ? { slug: values.slug.trim().toLowerCase() } : {}),
      isPaid: values.isPaid,
      ...(values.isPaid ? { price: Number(values.price) } : {}),
      currency: "INR",
      problemIds: selectedProblemIds,
      publish,
    });
    if (succeeded) closeModal();
  };

  const toggleProblem = (problemId) => {
    setSelectedProblemIds((current) => current.includes(problemId)
      ? current.filter((id) => id !== problemId)
      : [...current, problemId]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="card my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto bg-base-100 p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Create a sheet</h2>
                <p className="text-sm text-base-content/60">Add problems now or continue editing the draft later.</p>
              </div>
              <button type="button" onClick={closeModal} className="btn btn-ghost btn-sm" aria-label="Close">
                <X className="size-4" />
              </button>
            </header>

            <form className="space-y-3" onSubmit={handleSubmit((values) => submit(values, false))}>
              <div className="form-control">
                <label htmlFor="sheet-title" className="label font-medium">Title</label>
                <input id="sheet-title" className={`input input-bordered w-full ${errors.title ? "input-error" : ""}`} {...register("title")} placeholder="e.g. Data Structures Essentials" />
                {errors.title && <p className="mt-1 text-sm text-error">{errors.title.message}</p>}
              </div>
              <div className="form-control">
                <label htmlFor="sheet-description" className="label font-medium">Description</label>
                <textarea id="sheet-description" className="textarea textarea-bordered w-full" {...register("description")} rows={2} placeholder="What will learners practice?" />
              </div>
              <div className="form-control">
                <label htmlFor="sheet-slug" className="label font-medium">URL slug <span className="font-normal text-base-content/50">(optional)</span></label>
                <input id="sheet-slug" className={`input input-bordered w-full ${errors.slug ? "input-error" : ""}`} {...register("slug")} placeholder="data-structures-essentials" />
                {errors.slug && <p className="mt-1 text-sm text-error">{errors.slug.message}</p>}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-base-300 p-3">
                  <span className="font-medium">Paid sheet</span>
                  <input type="checkbox" className="toggle toggle-primary" {...register("isPaid")} />
                </label>
                {isPaid && (
                  <div className="form-control">
                    <label htmlFor="sheet-price" className="label font-medium">Price (INR)</label>
                    <input id="sheet-price" type="number" min="1" step="1" className={`input input-bordered w-full ${errors.price ? "input-error" : ""}`} {...register("price")} placeholder="499" />
                    {errors.price && <p className="mt-1 text-sm text-error">{errors.price.message}</p>}
                  </div>
                )}
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">Add problems <span className="font-normal text-base-content/60">({selectedProblemIds.length} selected)</span></h3>
                </div>
                <div className="max-h-44 overflow-y-auto rounded-xl border border-base-300">
                  {isProblemsLoading ? (
                    <div className="flex justify-center p-4"><Loader2 className="size-5 animate-spin text-primary" /></div>
                  ) : problems.length ? problems.map((problem) => (
                    <label key={problem.id} className="flex cursor-pointer items-center gap-3 border-b border-base-300/60 px-3 py-2 last:border-0 hover:bg-base-200">
                      <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" checked={selectedProblemIds.includes(problem.id)} onChange={() => toggleProblem(problem.id)} />
                      <span className="min-w-0 flex-1 truncate text-sm">{problem.title}</span>
                      <span className="badge badge-ghost badge-sm">{problem.difficulty}</span>
                    </label>
                  )) : (
                    <p className="p-4 text-center text-sm text-base-content/60">No problems available to add.</p>
                  )}
                </div>
              </div>

              <footer className="flex flex-col-reverse gap-2 border-t border-base-300 pt-4 sm:flex-row sm:justify-end">
                <button type="button" onClick={closeModal} className="btn btn-ghost btn-sm">Cancel</button>
                <button type="submit" className="btn btn-outline btn-primary btn-sm" disabled={isSaving}>
                  {isSaving && <Loader2 className="size-4 animate-spin" />} Save draft
                </button>
                <button type="button" className="btn btn-primary btn-sm" disabled={isSaving} onClick={handleSubmit((values) => submit(values, true))}>
                  {isSaving && <Loader2 className="size-4 animate-spin" />} Publish sheet
                </button>
              </footer>
            </form>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateSheetModal;
