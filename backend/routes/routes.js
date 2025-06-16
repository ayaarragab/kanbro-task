import express from 'express';
import { register, login, regenerateAccessToken } from "../controllers/userController.js";
import { authenticate } from '../auth/authenticate.js';


const router = express.Router();

// auth endpoints
router.post('/auth/login', login);
router.post('/auth/register', register);
router.post('/auth/refresh', regenerateAccessToken)

export default router;