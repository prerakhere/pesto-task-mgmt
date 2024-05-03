import express from 'express';
import {
  getUserId,
  saveUser
} from "../controllers/UserControllers";


const router = express.Router({ mergeParams: true });

router.get('/', getUserId);
router.post('/', saveUser);

export default router;