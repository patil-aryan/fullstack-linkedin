import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../libraries/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, UserPlus, X } from "lucide-react";

const RecommendedUser = ({user}) => {
  const queryClient = useQueryClient();

  const { data: connectionStatus, isLoading } = useQuery({
    queryKey: ["connectionStatus", user._id],
    queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
  });

  const { mutate: sendConnectionRequest } = useMutation({
    mutationFn: (userId) => {
      console.log("sendConnectionRequest mutationFn called, userId:", userId);
      console.log("status", connectionStatus?.data?.status)
      return axiosInstance.post(`/connections/request/${userId}`)},
    onSuccess: () => {
      toast.success("Connection request sent successfully");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted successfully");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const { mutate: rejectRequest } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request rejected successfully");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Something went wrong");
    },
  });

  const renderButton = () => {
		if (isLoading) {
			return (
				<button className='px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500' disabled>
					Loading...
				</button>
			);
		}

		switch (connectionStatus?.data?.status) {
			case "pending":
				return (
          console.log("Connection Status Data:", connectionStatus?.data),
					<button
						className='px-3 py-1 rounded-full text-sm bg-yellow-500 text-white flex items-center'
						disabled
					>
						<Clock size={16} className='mr-1' />
						Pending
					</button>
				);
			case "received":
				return (
          console.log("Connection Status Data:", connectionStatus?.data),
					<div className='flex gap-2 justify-center'>
						<button
							onClick={() => acceptRequest(connectionStatus.data.requestId)}
							className={`rounded-full p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white`}
						>
							<Check size={16} />
						</button>
						<button
							onClick={() => rejectRequest(connectionStatus.data.requestId)}
							className={`rounded-full p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white`}
						>
							<X size={16} />
						</button>
					</div>
				);
			case "connected":
				return (
					<button
						className='px-3 py-1 rounded-full text-sm bg-green-500 text-white flex items-center'
						disabled
					>
						<UserCheck size={16} className='mr-1' />
						Connected
					</button>
				);
			default:
				return (
					<button
						className='px-3 py-1 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 flex items-center'
						onClick={handleConnect}
            disabled={isLoading}
					>
						<UserPlus size={16} className='mr-1' />
						Connect
					</button>
				);
		}
	};

  const handleConnect = () => {
    console.log("Connection Status Data:", connectionStatus?.data);
    // console.log("Status", connectionStatus?.data?.status);

    console.log("handleConnect triggered!");
    console.log("Current connectionStatus:", connectionStatus);
		if (connectionStatus?.data?.status === "not_connected") {
      console.log("  if condition is true, calling sendConnectionRequest")
			sendConnectionRequest(user._id)
		}else {
      console.log("  if condition is false (connectionStatus is not 'not_connected')");
    }
	};

  return (
    <div className="flex items-center justify-between mb-4">
      <Link
        to={`/profile/${user.username}`}
        className="flex items-center flex-grow"
      >
        <img
          src={user.profilePicture || "./avatar.png"}
          alt={user.name}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold text-sm">{user.name}</h3>
          <p className="text-xs text-info">{user.headline}</p>
        </div>
      </Link>

      {renderButton()}
    </div>
  );
};

export default RecommendedUser;
