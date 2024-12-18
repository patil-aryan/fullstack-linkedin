import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../libraries/axios";
import { Link } from "react-router-dom";
import {
  Bell,
  BriefcaseBusiness,
  Home,
  Lock,
  LogOut,
  Search,
  User,
  Users,
} from "lucide-react";

const Navbar = () => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
  });
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => await axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => await axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const unreadNotificationCount = notifications?.data.filter(
    (notification) => !notification.read
  ).length;

  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  return (
    <>
      {/* <div className="flex justify-between px-4 py-4">
        <div>
          <img className="w-12 h-12" src="./small-logo.png" alt="" />
        </div>
        <div className="flex justify-evenly gap-4 flex-grow-0">
          <span>Home</span>
          <span>My Network</span>
          <span>Notifications</span>
          <span>Me</span>
          <span>
            <button>Logout</button>
          </span>
        </div>
      </div> */}
      <nav className="bg-secondary shadow-md sticky top-0 z-10">
        {/* <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <img
                  className="h-8 rounded"
                  src="/small-logo.png"
                  alt="LinkedIn"
                />
              </Link>

              {authUser && (
                <>
                  <div className="flex justify-center">
                    
                    <input
                      type="text"
                      placeholder="Search"
                      className="bg-base-100 text-sm px-8 py-2 rounded focus:outline-none w-full max-w-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                  </div>
                </>
              )}
            </div> */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <img
                  className="h-8 rounded"
                  src="/small-logo.png"
                  alt="LinkedIn"
                />
              </Link>

              {authUser && (
                <>
                  <div className="relative max-w-lg">
                    <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </span>
                    <input
                      type="text"
                      placeholder="Search"
                      className="bg-base-100 text-sm pl-10 pr-4 py-2 rounded focus:outline-none w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-6">
              {authUser ? (
                <>
                  <Link
                    to={"/"}
                    className="text-neutral flex flex-col items-center"
                  >
                    <Home size={20} />
                    <span className="text-xs hidden md:block">Home</span>
                  </Link>

                  <Link
                    to="/network"
                    className="text-neutral flex flex-col items-center relative"
                  >
                    <Users size={20} />
                    <span className="text-xs hidden md:block">My Network</span>
                    {unreadConnectionRequestsCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center"
                      >
                        {unreadConnectionRequestsCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/jobs"
                    className="text-neutral flex flex-col items-center relative"
                  >
                    <BriefcaseBusiness size={20} />
                    <span className="text-xs hidden md:block">Jobs</span>
                  </Link>

                  <Link
                    to="/notifications"
                    className="text-neutral flex flex-col items-center relative"
                  >
                    <Bell size={20} />
                    <span className="text-xs hidden md:block">
                      Notifications
                    </span>
                    {unreadNotificationCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
										rounded-full size-3 md:size-4 flex items-center justify-center"
                      >
                        {unreadNotificationCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    to={`/profile/${authUser.username}`}
                    className="text-neutral flex flex-col items-center"
                  >
                    <User size={20} />
                    <span className="text-xs hidden md:block">Me</span>
                  </Link>
                  <button
                    className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
                    onClick={() => logout()}
                  >
                    <LogOut size={20} />
                    <span className="hidden md:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-ghost">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    Join now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
