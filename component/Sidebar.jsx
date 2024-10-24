"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import DashboardIcon from "../component/icons/Dashboard";
import ResourcesIcon from "../component/icons/Resources";
import UploadsIcon from "../component/icons/Uploads";
import LogoutIcon from "../component/icons/Logout";
import AccountIcon from "../component/icons/Account";
import MyListIcon from "../component/icons/MyList";

const SidebarPanel = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    router.push("/auth/login");
  };

  return (
    <div className="flex flex-col justify-between border border-r-2 rounded-r-md h-screen py-4">
      <div>
        <div className="sidebar-menu">
          <DashboardIcon />
          <Link href="/home" className="font-medium text-lg">
            Dashboard
          </Link>
        </div>
        <div className="sidebar-menu">
          <ResourcesIcon />
          <Link href="/notes" className="font-medium text-lg">
            All Resources
          </Link>
        </div>
        <div className="sidebar-menu">
          <UploadsIcon />
          <Link href="/uploads" className="font-medium text-lg">
            Uploads
          </Link>
        </div>
        <div className="sidebar-menu">
          <MyListIcon />
          <Link href="/mylist" className="font-medium text-lg">
            My List
          </Link>
        </div>
      </div>
      <div>
        <div className="sidebar-menu">
          <AccountIcon />
          <Link href="/account" className="font-medium text-lg">
            My Account
          </Link>
        </div>
        <div className="mt-2">
          <button
            onClick={handleLogout}
            className="font-medium text-lg flex justify-center border px-5 py-2 mx-auto rounded-md bg-blue-600 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarPanel;
