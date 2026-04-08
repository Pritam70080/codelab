const ProfileStats = ({ problems = [], isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3 animate-pulse">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="card p-3 bg-base-200 h-16 flex flex-col justify-center items-center"
          >
            <div className="h-4 w-8 bg-base-300 rounded mb-2"></div>
            <div className="h-3 w-12 bg-base-300 rounded"></div>
          </div>
        ))}

        <div className="card p-3 bg-base-200 col-span-3 h-16 flex flex-col justify-center items-center">
          <div className="h-4 w-10 bg-base-300 rounded mb-2"></div>
          <div className="h-3 w-16 bg-base-300 rounded"></div>
        </div>
      </div>
    );
  }

  const total = problems.length;

  const easy = problems.filter(p => p.difficulty === "EASY").length;
  const medium = problems.filter(p => p.difficulty === "MEDIUM").length;
  const hard = problems.filter(p => p.difficulty === "HARD").length;

  return (
    <div className="grid grid-cols-3 gap-3">

      {/* Easy */}
      <div className="card p-3 text-center bg-green-100 border border-green-500/30">
        <p className="font-bold text-green-500 text-lg">{easy}</p>
        <p className="text-xs text-black font-medium">Easy</p>
      </div>

      {/* Medium */}
      <div className="card p-3 text-center bg-orange-100 border border-yellow-500/30">
        <p className="font-bold text-yellow-500 text-lg">{medium}</p>
        <p className="text-xs text-black font-medium">Medium</p>
      </div>

      {/* Hard */}
      <div className="card p-3 text-center bg-red-100 border border-red-500/30">
        <p className="font-bold text-red-500 text-lg">{hard}</p>
        <p className="text-xs text-black font-medium">Hard</p>
      </div>

      {/* Total */}
      <div className="card p-3 text-center border border-base-300/50 bg-base-200/50 col-span-3">
        <p className="font-bold text-xl">{total}</p>
        <p className="text-xs text-base-content/70 font-medium">Solved</p>
      </div>

    </div>
  );
};

export default ProfileStats;