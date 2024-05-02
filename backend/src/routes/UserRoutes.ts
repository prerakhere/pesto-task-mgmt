import express from 'express';
import {
  getUserData,
  saveUser
} from "../controllers/UserControllers";


const router = express.Router({ mergeParams: true });

router.get('/', getUserData);
router.post('/', saveUser);

export default router;