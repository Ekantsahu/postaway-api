
import express from "express";
import cors from 'cors';
import { loggerMiddleware } from "./src/middleware/logger.middleware.js";
import { errorHandler } from "./src/middleware/error.middleware.js";
import { authMiddleware } from "./src/middleware/auth.middleware.js";

import userRoutes from "./src/features/user/user.routes.js";
import postRoutes from "./src/features/post/post.routes.js";
import commentRoutes from "./src/features/comment/comment.routes.js";
import likeRoutes from "./src/features/like/like.routes.js";
const app = express();


// Middlewares
app.use(express.json());
app.use(cors());

// Logger
app.use(loggerMiddleware)

//routes

app.use("/api", userRoutes);

app.use(authMiddleware);

app.use("/api/posts",postRoutes);

app.use("/api/comments" , commentRoutes);

app.use("/api/likes",likeRoutes);

// app.use("/api/posts", (req, res, next) => {
//   console.log("Post route hit");
//   next();
// }, postRoutes);

// Test route
app.get("/",(req ,res)=>{
    res.json({
        success:true,
        message:"Postaway API is running"
    })
});

// temporary routes


// Error Handler
app.use(errorHandler);

const PORT = 3200;

app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`)
})
