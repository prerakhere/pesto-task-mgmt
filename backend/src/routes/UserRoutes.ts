import express from 'express';
import {
  getUserData,
} from "../controllers/UserControllers";


const router = express.Router({ mergeParams: true });

router.get('/user', getUserData);

export default router;