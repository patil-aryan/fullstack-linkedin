import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { acceptConnectionRequest, getConnectionRequests, getConnectionStatus, rejectConnectionRequest, removeConnection, sendConnectionRequest } from "../controller/connection.controller.js";

const router = express.Router();

router.post("/request", protectRoute, sendConnectionRequest);
router.put("/accept/:requestId", protectRoute, acceptConnectionRequest);
router.put("/reject/:requestId", protectRoute, rejectConnectionRequest);

router.get("/requests", protectRoute, getConnectionRequests);

router.get("/", protectRoute, getConnectionStatus);
router.delete("/:userId", protectRoute, removeConnection);
router.get("/status/:userId", protectRoute, getConnectionStatus); 


export default router;