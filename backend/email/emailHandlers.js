import { client, sender } from "../mailtrap.js";
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, profilUrl) => {
  const recepients = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recepients,
      subject: "Welcome to Unlinked",
      html: createWelcomeEmailTemplate(name, profilUrl),
      category: "Welcome",
    });

    console.log("Welcome Email Sent", response);
  } catch (error) {
    throw error;
  }
};

export const sendCommentNotification = async (
  recepientEmail,
  recepientName,
  commenterName,
  postUrl,
  commentContent
) => {
  const recepient = [{ email: recepientEmail }];

  try {
    const response = await client.send({
      from: sender,
      to: recepients,
      subject: "New Comment on Your Post",
      html: createCommentNotificationEmailTemplate(
        recepientName,
        commenterName,
        postUrl,
        commentContent
      ),
      category: "Comment Notification",
    });
    console.log("Comment Notification Email Sent", response);
  } catch (error) {
    throw error;
  }
};


export const sendConnectionAcceptedEmail = async (senderEmail, senderName, recepientName, profileUrl) => {
    const recepient = [{ email: senderEmail }];

    try {
        const response = await client.send({
            from: sender,   
            to: recepient,
            subject: `${recepientName} has accepted your connection request`, 
            html: createConnectionAcceptedEmailTemplate(senderName, recepientName, profileUrl),
            category: "Connection_Accepted",
        })
    } catch (error) {
        
    }
}