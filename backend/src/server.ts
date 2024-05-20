import express from 'express'
import userRouter from './routes/user.routes';
import cors from 'cors'
import fileUpload from 'express-fileupload'

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(fileUpload({useTempFiles: true, tempFileDir: './uploads'}))

app.use(express.json())
app.use("/users", userRouter )


export default app;