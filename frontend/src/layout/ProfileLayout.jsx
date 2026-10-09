import { Outlet } from "react-router-dom";

import ProfileSidebar from "../components/ProfileSidebar.jsx";
import { useAuthStore } from "../store/useAuthStore.js";

const ProfileLayout = () => {
  const { authUser } = useAuthStore();

  return (
    <section className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-cols-1 gap-4 px-4 py-5 md:grid-cols-12 md:px-6">
      <div className="md:col-span-4 lg:col-span-3">
        <ProfileSidebar user={authUser} />
      </div>
      <main className="card min-w-0 border border-base-300/70 bg-base-200/30 p-4 md:col-span-8 md:p-5 lg:col-span-9">
        <Outlet />
      </main>
    </section>
  );
};

export default ProfileLayout;
