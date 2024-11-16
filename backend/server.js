import express from "express"
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import notificationRoutes from "./routes/notification.route.js"
import connectionRoutes from "./routes/connection.route.js"
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";

dotenv.config()


const app = express();

app.use(express.json());  
app.use(cookieParser());


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/notifications', notificationRoutes)
app.use('/api/v1/connections', connectionRoutes)

const PORT = process.env.PORT


// app.post('/api/v1/auth', router)
// app.get('/api/v1/auth', (req,res) => {
//     res.send("Hello World")
// })

// app.use('/', (req, res) => {
//     console.log("HELLo")
// })

app.listen(PORT, () => {
    console.log("Sever is running")
    connectDB();
})