import express from 'express';
import { login, logout, signup } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getCurrentUser } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)

router.get("/me", protectRoute, getCurrentUser)
export default router;