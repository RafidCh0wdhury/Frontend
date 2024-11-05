"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardIcon from "../component/icons/Dashboard";
import ResourcesIcon from "../component/icons/Resources";
import UploadsIcon from "../component/icons/Uploads";
import AccountIcon from "../component/icons/Account";
import MyListIcon from "../component/icons/MyList";
import { useEffect, useState } from "react";

const noNavbarRoutes = ["/auth/login", "/auth/signup"];

const SidebarPanel = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("userDetails");
      if (JSON.parse(authStatus)) {
        setIsAuthenticated(true);
      }
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    router.push("/auth/login");
  };

  if (noNavbarRoutes.includes(pathname) || !isAuthenticated) {
    return null;
  }

  const isActive = (route) => pathname === route;

  return (
    <div className="h-full flex flex-col justify-between py-4">
      <div>
        <div className={`sidebar-menu ${isActive("/home") ? "active" : ""}`}>
          <DashboardIcon />
          <Link href="/home" className="font-medium text-lg">
            Dashboard
          </Link>
        </div>
        <div className={`sidebar-menu ${isActive("/notes") ? "active" : ""}`}>
          <ResourcesIcon />
          <Link href="/notes" className="font-medium text-lg">
            All Resources
          </Link>
        </div>
        <div className={`sidebar-menu ${isActive("/uploads") ? "active" : ""}`}>
          <UploadsIcon />
          <Link href="/uploads" className="font-medium text-lg">
            Uploads
          </Link>
        </div>
        <div className={`sidebar-menu ${isActive("/mylist") ? "active" : ""}`}>
          <MyListIcon />
          <Link href="/mylist" className="font-medium text-lg">
            My List
          </Link>
        </div>
      </div>
      <div>
        <div className={`sidebar-menu ${isActive("/account") ? "active" : ""}`}>
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
