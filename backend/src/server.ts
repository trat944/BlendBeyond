import express from 'express'
import userRouter from './routes/user.routes';
import cors from 'cors'

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use("/users", userRouter )


export default app;