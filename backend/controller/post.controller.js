import Post from "../models/post.model.js";
import cloudinary from "../cloudinary.js";
import Notification from "../models/notification.model.js";
import { sendCommentNotification } from "../email/emailHandlers.js";

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: { $in: req.user.connections } })
      .populate("author", "name username profileImage, headline")
      .populate("comments.user", "name profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error in getFeedPosts Controller", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;

    let newPost;

    if (image) {
      const result = await cloudinary.uploader.upload(image);
      newPost = new Post({
        author: req.user._id,
        content,
        image: result.secure_url,
      });
    } else {
      newPost = new Post({ author: req.user._id, content });
    }

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error in createPost Controller", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized Access" });
    }

    if (post.image) {
      await cloudinary.uploader.destroy(
        post.image.split("/").pop().split(".")[0]
      );
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost Controller", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId)
      .populate("author", "name username profileImage, headline")
      .populate("comments.user", "name profileImage");

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in getPostById Controller", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const post = await Post.findById(
      postId,
      {
        $push: {
          comments: {
            user: req.user._id,
            content,
          },
        },
      },
      { new: true }
    )
      .populate("author", "name username email profileImage headline")
      .populate("comments.user", "name profileImage");

    if (post.author.toString() !== req.user._id.toString()) {
      const newNotification = new Notification({
        recipient: post.author,
        type: "comment",
        relatedUser: req.user._id,
        relatedPost: postId,
      });

      await newNotification.save();

      try {
        const postUrl = processs.env.CLIENT_URL + "/post/" + postId;
        await sendCommentNotification(post.author, post.author.name, req.user.name, postUrl, content);
      } catch (error) {
        console.error("Error in sendCommentNotification", error);
        res.status(500).json({ message: "Server Error" });
        
      }

    }

    res.status(200).json(post);

  } catch (error) {
    console.error("Error in createComment Controller", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        const userId = req.user._id;

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    }else{
        post.likes.push(userId);

        if (post.author.toString() !== userId.toString()) {
            const newNotification = new Notification({
                recipient: post.author,
                type: "like",
                relatedUser: userId,   
                relatedPost: postId,    
            });

            await newNotification.save();
    }

    await post.save();
    }
    
    } catch (error) {
        console.error("Error in likePost Controller", error);
        res.status(500).json({ message: "Server Error" });
        
    }
}