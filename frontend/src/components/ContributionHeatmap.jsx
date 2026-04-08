import {useThemeStore} from "../store/useThemeStore.js"
const ContributionHeatmap = ({ problems = [] }) => {
  const {theme} = useThemeStore();
  const map = {};

  problems.forEach((p) => {
    const date = new Date(p.updatedAt).toISOString().split("T")[0];
    map[date] = (map[date] || 0) + 1;
  });

  const days = [];
  const today = new Date();

  for (let i = 0; i < 322; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split("T")[0];
    days.unshift({ date: key, count: map[key] || 0 }); 
  }

  return (
    <div className="overflow-x-auto ">
      <div className="grid grid-rows-7 grid-flow-col gap-1">
        {days.map((day, i) => {
          let bg = `${theme === "dark" || theme === "dim" ? "bg-gray-600" : "bg-base-300"}`

          if (day.count > 0) bg = "bg-green-300";
          if (day.count > 2) bg = "bg-green-500";
          if (day.count > 4) bg = "bg-green-700";

          return (
            <div
              key={i}
              className={`w-3 h-3 rounded-sm ${bg}`}
              title={`${day.date} - ${day.count} problems`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ContributionHeatmap;