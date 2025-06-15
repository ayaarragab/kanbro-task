import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from "morgan";
import  router  from "./routes/routes.js";
import { connectDB } from "./config/db.js";

const app = express();

dotenv.config()

// app.use(cors());

app.use(morgan('dev'))

app.use(express.json());

app.use('/api/v1/', router);

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => (console.log('Hello User!')));