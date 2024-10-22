import express from 'express';
import { test, signOut } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test);
router.post("/signout", signOut);

export default router;