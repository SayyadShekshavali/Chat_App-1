import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../lib/api";
import { BellIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ShipWheelIcon } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import ThemeSelector from "./ThemeSelector.jsx";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatpage = location.pathname?.startsWith("/chat");
  const queryClient = useQueryClient();
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center px-4 sm:px-6 lg:px-8">
      <div className="flex items-center w-full">
        {/* Left (only shows on chat page) */}
        {isChatpage && (
          <Link to="/" className="flex items-center gap-2.5">
            <ShipWheelIcon className="size-9 text-primary " />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </Link>
        )}

        {/* Right (always aligned to end) */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <Link to="/notifications">
            <button
              className="btn  !text-gray-800 !dark:text-gray-200 
 "
            >
              <BellIcon className="h-6 w-6 " />
            </button>
          </Link>

          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src={authUser?.Profilepic} alt="Profile" />
            </div>
          </div>

          <button
            className="btn !text-gray-800 !dark:text-gray-200 
  "
            onClick={logoutMutation}
          >
            <LogOutIcon className="h-6 w-6 " />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
