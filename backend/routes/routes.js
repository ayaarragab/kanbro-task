import express from 'express';
import { register, login, regenerateAccessToken } from "../controllers/userController.js";
import { authenticate } from '../auth/authenticate.js';


const router = express.Router();

// auth endpoints
router.post('/auth/login', login);
router.post('/auth/register', register);
router.post('/auth/refresh', regenerateAccessToken)

// CRUD endpoints
router.get('/tasks', authenticate, getTasks);
router.post('/tasks', authenticate, createTask);
router.get('/tasks/:taskId', authenticate, getOneTask);
router.put('/tasks/:taskId', authenticate, updateTask);
router.delete('/tasks/:taskId', authenticate, deleteTask);

export default router;