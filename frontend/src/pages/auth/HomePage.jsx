import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../libraries/axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar";
import PostCreation from "../../components/PostCreation";

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
        return res.data;
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
        <PostCreation user={authUser}/>

      </div>
    </div>
  );
};

export default HomePage;
