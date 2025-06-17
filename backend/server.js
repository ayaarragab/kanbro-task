import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";
import  router  from "./routes/routes.js";
import { connectDB } from "./config/db.js";
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config()

app.use(cors({
  origin: "http://localhost:8080",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'))

app.use(express.json());

app.use('/taskManager/api/v1/', router);

app.use(cookieParser());


connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => (console.log('Hello User!')));