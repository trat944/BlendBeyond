import express from 'express'
import userRouter from './routes/user.routes';
import likeRouter from './routes/like.routes';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload'
import dislikeRouter from './routes/dislike.routes';
import userFilteringRouter from './routes/userFiltering.routes';

require('dotenv').config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(cookieParser());

app.use(fileUpload({useTempFiles: true, tempFileDir: './uploads'}))

app.use(express.json())
app.use("/users", userRouter )
app.use("/filteredUsers", userFilteringRouter )
app.use("/likes", likeRouter )
app.use("/dislikes", dislikeRouter )


export default app;