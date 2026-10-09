import { CalendarDays, ChevronLeft, LogOut, Mail, Pencil, ShieldCheck, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton.jsx";

const ProfileSidebar = ({ user }) => {
  const role = user.role?.toLowerCase() === "admin" ? "Administrator" : "Member";
  const joinedAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })
    : null;

  return (
    <aside className="card h-fit border border-base-300/70 bg-base-100 p-4 shadow-sm md:sticky md:top-24">
      <Link to="/problems" className="btn btn-sm btn-ghost w-fit" aria-label="Back to problems">
        <ChevronLeft className="size-5" />
        Problems
      </Link>

      <div className="mt-3 flex flex-col items-center text-center">
        <div className="flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-primary/70 bg-primary/10">
          {user.image || user.imageUrl ? (
            <img src={user.image || user.imageUrl} alt={`${user.name} profile`} className="h-full w-full object-cover" />
          ) : (
            <span className="text-4xl font-bold">{user.name?.charAt(0).toUpperCase() || <UserRound className="size-10" />}</span>
          )}
        </div>
        <h1 className="mt-3 max-w-full break-words text-xl font-bold">{user.name || "CodeLab member"}</h1>
        <span className={`badge mt-2 ${user.role === "ADMIN" ? "badge-primary" : "badge-ghost"}`}>
          {user.role === "ADMIN" && <ShieldCheck className="mr-1 size-3.5" />}
          {role}
        </span>
      </div>

      <div className="my-4 space-y-3 border-y border-base-300/70 py-4 text-sm">
        <div className="flex min-w-0 items-start gap-3">
          <Mail className="mt-0.5 size-4 shrink-0 text-base-content/55" />
          <span className="break-all text-base-content/75">{user.email}</span>
        </div>
        {joinedAt && (
          <div className="flex items-center gap-3">
            <CalendarDays className="size-4 shrink-0 text-base-content/55" />
            <span className="text-base-content/75">Joined {joinedAt}</span>
          </div>
        )}
      </div>

      <Link to="/profile/update" className="btn btn-primary btn-outline btn-sm w-full">
        <Pencil className="size-4" />
        Edit profile
      </Link>
      <LogoutButton className="mt-2 w-full">
        <LogOut className="mr-2 size-4" />
        Logout
      </LogoutButton>
    </aside>
  );
};

export default ProfileSidebar;
