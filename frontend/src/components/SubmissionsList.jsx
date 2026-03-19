import {
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick as Memory,
  Calendar,
} from "lucide-react";

import { useThemeStore } from "../store/useThemeStore";

const SubmissionsList = ({ submissions, isLoading }) => {
    const {theme} = useThemeStore();
  // Helper function to safely parse JSON strings
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing data:", error);
      return [];
    }
  };

  // Helper function to calculate average memory usage
  const calculateAverageMemory = (memoryData) => {
    const memoryArray = safeParse(memoryData).map((m) =>
      parseFloat(m.split(" ")[0])
    );
    if (memoryArray.length === 0) return 0;
    return (
      memoryArray.reduce((acc, curr) => acc + curr, 0) / memoryArray.length
    );
  };

  // Helper function to calculate average runtime
  const calculateAverageTime = (timeData) => {
    const timeArray = safeParse(timeData).map((t) =>
      parseFloat(t.split(" ")[0])
    );
    if (timeArray.length === 0) return 0;
    return timeArray.reduce((acc, curr) => acc + curr, 0) / timeArray.length;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // No submissions state
  if (!submissions?.length) {
    return (
      <div className="text-center p-8">
        <div className="text-base-content/70">No submissions yet</div>
      </div>
    );
  }

  return (
    <div className="">
      {submissions.map((submission) => {
        const avgMemory = calculateAverageMemory(submission.memory);
        const avgTime = calculateAverageTime(submission.time);

        return (
          <div
            key={submission.id}
            className="card bg-base-200/80 shadow-sm hover:shadow-md transition-shadow rounded-lg"
          >
            <div className="card-body p-2.5">
              <div className="flex items-center justify-between">
                {/* Left Section: Status and Language */}
                <div className="flex items-center gap-4">
                  {submission.status === "Accepted" ? (
                    <div className={`flex items-center gap-2 ${theme === "lemonade" ? "text-green-400" : "text-success" }`}>
                      <CheckCircle2 className="size-4" />
                      <span className="font-semibold">Accepted</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-error">
                      <XCircle className="size-4" />
                      <span className="font-semibold">{submission.status}</span>
                    </div>
                  )}
                  <div className="badge badge-neutral badge-sm">{submission.language[0].toUpperCase() + submission.language.slice(1).toLowerCase()}</div>
                </div>

                {/* Right Section: Runtime, Memory, and Date */}
                <div className="flex items-center gap-4 text-base-content/70 ">
                  <div className="flex items-center gap-1">
                    <Clock className="size-4" />
                    <span className="text-sm">{avgTime.toFixed(3)} s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Memory className="size-4" />
                    <span className="text-sm">{avgMemory.toFixed(0)} KB</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="size-4" />
                    <span className="text-sm">
                      {new Date(submission.createdAt).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubmissionsList;