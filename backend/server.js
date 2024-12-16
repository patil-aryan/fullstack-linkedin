import express from "express"
// import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"
import notificationRoutes from "./routes/notification.route.js"
import connectionRoutes from "./routes/connection.route.js"
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
// console.log("MONGO_URI:", process.env.MONGO_URI);

// console.log(process.env.MONGO_URI);


const app = express();


app.use(express.json({limit: "10mb"}));  
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/notifications', notificationRoutes)
app.use('/api/v1/connections', connectionRoutes)

const PORT = process.env.PORT;
// const PORT = process.env.PORT || 5000;


// app.post('/api/v1/auth', router)
// app.get('/api/v1/auth', (req,res) => {
//     res.send("Hello World")
// })

// app.use('/', (req, res) => {
//     console.log("HELLo")
// })

app.listen(PORT, () => {
    console.log("Sever is running on", PORT)
    // console.log("MONGO_URI:", process.env.MONGO_URI);
    connectDB();
})