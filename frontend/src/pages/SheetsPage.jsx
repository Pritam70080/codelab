import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";

import SheetCards from "../components/SheetCards.jsx";
import CreateSheetModal from "../components/CreateSheetModal.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useSheetStore } from "../store/useSheetStore.js";

const SheetsPage = () => {
  const { authUser } = useAuthStore();
  const { sheets, isLoadingSheets, isSavingSheet, getSheets, createSheet, addProblemsToSheet, updateSheet } = useSheetStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const isAdmin = authUser.role === "ADMIN";

  useEffect(() => {
    getSheets({ mine: isAdmin });
  }, [getSheets, isAdmin]);

  const handleCreateSheet = async ({ problemIds, publish, ...sheetFields }) => {
    const sheet = await createSheet(sheetFields);
    if (!sheet) return false;

    let problemsAdded = true;
    if (problemIds.length) {
      problemsAdded = await addProblemsToSheet(sheet.id, problemIds);
    }

    if (publish && problemsAdded) {
      await updateSheet(sheet.id, { isPublished: true });
    }

    await getSheets({ mine: isAdmin });
    return true;
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] px-4 pb-10 pt-5">
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Coding sheets</h1>
          <p className="mt-1 text-sm text-base-content/60">
            {isAdmin ? "Manage your learning paths and publication status." : "Pick a guided path and keep track of your progress."}
          </p>
        </div>
        {isAdmin && (
          <button className="btn btn-primary btn-sm sm:btn-md" onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="size-4" /> Create sheet
          </button>
        )}
      </div>

      {isLoadingSheets ? (
        <div className="flex min-h-48 items-center justify-center"><Loader2 className="size-10 animate-spin text-primary" /></div>
      ) : (
        <SheetCards
          sheets={sheets}
          emptyMessage={isAdmin ? "You have not created any sheets yet." : "No published sheets are available yet."}
        />
      )}

      <CreateSheetModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateSheet}
        isSaving={isSavingSheet}
      />
    </main>
  );
};

export default SheetsPage;
