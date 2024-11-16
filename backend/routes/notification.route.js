

import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { deleteNotification, getUserNotifications, markNotificationAsRead } from "../controller/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUserNotifications)
router.put("/:id", protectRoute, markNotificationAsRead)
router.delete("/:id", protectRoute, deleteNotification)

export default router;