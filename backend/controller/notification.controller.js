import Notification from "../models/notification.model.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notification = await Notification.find({ recepient: req.user._id })
      .sort({ createdAt: -1 })
      .populate("relatedUser", "name username profileImage")
      .populate("relatedPost", "content image");
    res.status(200).json(notification);
  } catch (error) {
    console.error("Error in getUserNotifications Controller", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await Notification.findById(
      {
        _id: notificationId,
        recepient: req.user._id,
      },
      { read: true },
      { new: true }
    );

    res.json(notification);
  } catch (error) {
    console.error("Error in markNotificationAsRead Controller", error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const deleteNotification = async (req, res) => {
    const notificationId = req.params.id;
    try {
        await Notification.findByIdAndDelete({
            _id: notificationId,
            recepient: req.user._id
        });

        res.status(200).json({message: "Notification deleted successfully"});

    } catch (error) {
        
        console.error("Error in deleteNotification Controller", error);
        res.status(500).json({ message: "Server Error" });
    }
};
