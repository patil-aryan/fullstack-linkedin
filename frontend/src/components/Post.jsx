import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { axiosInstance } from "../libraries/axios";

const Post = ({ post }) => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const isOwner = authUser?._id === post.author._id;
  const isLiked = post.likes.includes(authUser?._id);

  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete/${post._id}`);
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Failed to delete post");
    },
  });

  const { mutate: createComment, isPending: isCreatingComment } = useMutation({
    mutationFn: async (newComment) => {
      await axiosInstance.post(`/posts/comment/${post._id}`, {
        content: newComment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Failed to add comment");
    },
  });

  const { mutate: likePost, isPending: isLikingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/posts/${post._id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Failed to like post");
    },
  });

  // const handleDeletePost = () => {
  //     // Show confirmation toast styled with LinkedIn colors
  //     toast((t) => (
  //       <div style={{
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //           gap: '8px',
  //           padding: '16px',
  //           borderRadius: '8px',
  //           backgroundColor: '#f3f2ef',
  //           color: '#333333',
  //           fontFamily: 'Arial, sans-serif'
  //         }}
  //       >
  //         <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
  //           Are you sure you want to delete this post?
  //         </p>
  //         <div style={{ display: 'flex', gap: '8px' }}>
  //           <button
  //             onClick={() => {
  //               toast.dismiss(t.id);
  //               deletePost();
  //             }}
  //             style={{
  //               backgroundColor: '#0a66c2',
  //               color: '#ffffff',
  //               border: 'none',
  //               padding: '8px 12px',
  //               borderRadius: '5px',
  //               cursor: 'pointer',
  //               fontWeight: 'bold',
  //               transition: 'background-color 0.3s',
  //             }}
  //             onMouseEnter={(e) => (e.target.style.backgroundColor = '#004182')}
  //             onMouseLeave={(e) => (e.target.style.backgroundColor = '#0a66c2')}
  //           >
  //             Confirm
  //           </button>
  //           <button
  //             onClick={() => toast.dismiss(t.id)}
  //             style={{
  //               backgroundColor: '#e0e0e0',
  //               color: '#333333',
  //               border: 'none',
  //               padding: '8px 12px',
  //               borderRadius: '5px',
  //               cursor: 'pointer',
  //               fontWeight: 'bold',
  //               transition: 'background-color 0.3s',
  //             }}
  //             onMouseEnter={(e) => (e.target.style.backgroundColor = '#cfcfcf')}
  //             onMouseLeave={(e) => (e.target.style.backgroundColor = '#e0e0e0')}
  //           >
  //             Cancel
  //           </button>
  //         </div>
  //       </div>
  //     ), { duration: 5000 });
  //   };

  const handleDeletePost = () => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-lg">
          <p className="text-gray-800 font-semibold text-sm">
            Are you sure you want to delete this post?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                deletePost();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 transition ease-in-out duration-200"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md font-semibold hover:bg-gray-400 transition ease-in-out duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };

  return (
    <>
      <div className="bg-secondary rounded-lg shadow mb-4">
        <div className="p-4">
          <div className="flex items-cente justify-between mb-4">
            <div className="flex items-center">
              <Link to={`/profile/${post?.author?.username}`}>
                <img
                  className="size-10 rounded-full mr-3"
                  src={post.author.profileImage || "./avatar.png"}
                  alt={post.author.name}
                />
              </Link>

              <div>
                <Link to={`/profile/${post?.author?.username}`}>
                  <h2 className="font-semibold text-lg">{post.author.name}</h2>
                </Link>
                <p className="text-xs text-info">{post.author.headline}</p>
              </div>
            </div>
            {isOwner && (
              <button
                onClick={handleDeletePost}
                className="text-red-400 hover:text-red-600"
              >
                {isDeleting ? (
                  <Loader size={18} className="animate-spin" />
                ) : (
                  <Trash2 size={18} />
                )}
              </button>
            )}
          </div>
          <p className="mb-4">{post.content}</p>
          {post.image && (
            <img src={post.image} alt="Post Content" className="w-full rounded-lg mb-4" />
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
