import { sendConnectionAcceptedEmail } from "../email/emailHandlers.js";
import ConnectionRequest from "../models/connection.model.js"
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const sendConnectionRequest = async (req, res) => {
    try {
        const { userId } = req.params;
        const senderId = req.user._id;
        
        if (senderId.toString() === userId) {
            return res.status(400).json({ message: "You cannot send a connection request to yourself" });
            
        }

        if (req.user.connection.includes(userId)) {
            return res.status(400).json({ message: "You are already connected with this user" });
            
        }

        const exisitingRequest = await ConnectionRequest.findOne({
            sender: senderId,
            recepient: userId,
            status: "pending"
        })

        if (exisitingRequest) {
            return res.status(400).json({ message: "You have already sent a connection request to this user" });
        }

        const newRequest = new ConnectionRequest({
            sender: senderId,
            recepient: userId,
        })

        await newRequest.save();

        res.status(200).json({ message: "Connection request sent successfully" });

    } catch (error) {
        
        console.error("Error in sendConnectionRequest Controller", error);
        res.status(500).json({ message: "Server Error" });
        
    }



}

export const acceptConnectionRequest = async (req, res) => {
    try {

        const { requestId } = req.params;
        const userId = req.user._id;

        const request = await ConnectionRequest.findById(requestId).populate("sender", "name username email").populate("recepient", "name username");

        if (!request) {
            return res.status(404).json({ message: "Connection request not found" });
        }

        if (request.recepient._id.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized Access" });
        }
        
        if (request.status !== "pending") {
            return res.status(400).json({ message: "This request has already been processed" });
        }

        request.status = "accepted";

        await request.save();

        await User.findByIdAndUpdate(request.sender._id, {$addToSet: {connection: userId}});
        await User.findByIdAndUpdate(userId, {$addToSet: {connection: request.sender._id}});

        const notification = new Notification({
            recipient: request.sender._id,
            type: "connectionAccepted", 
            relatedUser: userId,
            
        })

        await notification.save();

        res.status(200).json({ message: "Connection request accepted successfully" });

        const senderEmail = request.sender.email;
        const senderName = request.sender.name;
        // const recipientEmail = request.recepient.email;
        const recipientName = request.recepient.name;
        const profileUrl = process.env.CLIENT_URL + "/profile/" + request.recepient.username;

        try {
            await sendConnectionAcceptedEmail(senderEmail, senderName, recipientName, profileUrl);
            
        } catch (error) {
            
            console.error("Error in sending email", error); 
            res.status(500).json({ message: "Server Error" });
            
        }

    } catch (error) {
        
        console.error("Error in acceptConnectionRequest Controller", error);
        res.status(500).json({ message: "Server Error" });
        
    }
}

export const rejectConnectionRequest = async (req, res) => {

    try {
        const { requestId } = req.params;
        const userId = req.user._id;

        const request = await ConnectionRequest.findById(requestId);

        if(request.recepient._id.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized Access" });
    } 

        if (request.status !== "pending") {
            return res.status(400).json({ message: "This request has already been processed" });
        }

        request.status = "rejected";
        await request.save();

        res.status(200).json({ message: "Connection request rejected successfully" });

    } catch (error) {
        
        console.error("Error in rejectConnectionRequest Controller", error);
        res.status(500).json({ message: "Server Error" });
        
    }
}

export const getConnectionRequests = async (req, res) => {
    try {
        const userId = req.user._id;

        const requests = await ConnectionRequest.find({ recepient: userId, status: "pending" }).populate("sender", "name username profileImage headline connection");

        res.status(200).json({requests});
    } catch (error) {
        
        console.error("Error in getConnectionRequests Controller", error);
        res.status(500).json({ message: "Server Error" });
        
    }
}

export const getUserConnections = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate("connection", "name username profileImage headline connection");

        res.status(200).json(user.connection);
    } catch (error) {

        console.error("Error in getUserConnections Controller", error);
        res.status(500).json({ message: "Server Error" });
        
    }
}

export const removeConnection = async (req, res) => {
    try {
        const myId = req.user._id;
        const {userId} = req.params;

        await User.findByIdAndUpdate(myId, {$pull: {connection: userId}})
        await User.findByIdAndUpdate(userId, {$pull: {connection: myId}})

        res.status(200).json({ message: "Connection removed successfully" });
    } catch (error) {
        
        console.error("Error in removeConnection Controller", error);
        res.status(500).json({ message: "Server Error" });
        

    }
}

export const getConnectionStatus = async (req, res) => {
    try {
        const targetUserId = req.params.userId;
        const currentUserId = req.user._id;

        const currentUser = req.user;

        if (currentUser.connection.includes(targetUserId)) {
            return res.status(200).json({ status: "connected" });
        } 

        const pendingRequest = await ConnectionRequest.findOne({
            $or: [
                { sender: currentUserId, recepient: targetUserId,},
                { sender: targetUserId, recepient: currentUserId,}
            ],
            status: "pending",
        });

        if (pendingRequest) {
            if (pendingRequest.sender.toString() === currentUserId.toString()) {
                return res.status(200).json({ status: "pending" });
            } else {
                return res.status(200).json({ status: "received", requestId: pendingRequest._id });
            }
        }

        // res.json({ message: "Not Connected" });
        res.json({ status: "not_connected" });


    } catch (error) {
        console.error("Error in getConnectionStatus Controller", error);
        res.status(500).json({ message: "Server Error" });
         
    }
}