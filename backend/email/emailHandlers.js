import { client, sender } from "../mailtrap.js";
import {
  createCommentNotificationEmailTemplate,
  createConnectionAcceptedEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, profilUrl) => {
  const recipients = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
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
  recipientEmail,
  recipientName,
  commenterName,
  postUrl,
  commentContent
) => {
  const recepient = [{ email: recipientEmail }];

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: "New Comment on Your Post",
      html: createCommentNotificationEmailTemplate(
        recipientName,
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


export const sendConnectionAcceptedEmail = async (senderEmail, senderName, recipientName, profileUrl) => {
    const recepient = [{ email: senderEmail }];

    try {
        const response = await client.send({
            from: sender,   
            to: recepient,
            subject: `${recipientName} has accepted your connection request`, 
            html: createConnectionAcceptedEmailTemplate(senderName, recipientName, profileUrl),
            category: "Connection_Accepted",
        })
    } catch (error) {
        
    }
}