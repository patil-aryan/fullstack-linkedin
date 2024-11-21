import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../libraries/axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import PostCreation from "../../components/PostCreation";
import Post from "../../components/Post";
import { User } from "lucide-react";
import RecommendedUser from "../../components/RecommendedUser";

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/users/suggestions");
        return res.data;
      } catch (error) {
        toast.error(
          err.response.data.message || "An error occurred. Please try again"
        );
      }
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/posts");
        return res.data.posts;
      } catch (error) {
        toast.error(
          err.response.data.message || "An error occurred. Please try again"
        );
      }
    },
  });

  console.log(recommendedUsers, posts);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
      <div className="col span-1 lg:col-span-2 order-first lg:order-none">
        <PostCreation user={authUser} />

        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}

        {posts?.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <User size={64} className="mx-auto text-blue-500" />
            </div>
            <h2 className="text-2xl mb-4 text-gray-800">No Posts Yet</h2>
            <p className="text-gray-600 mb-6">Connect with others now!</p>
          </div>
        )}
      </div>

      {recommendedUsers?.length > 0 && (
        <div className="col-span-1 lg:col-span-1 hidden lg:block">
          <div className="bg-secondary rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4"> People you may know </h2>
            {recommendedUsers.map((user) => (
              <RecommendedUser key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
