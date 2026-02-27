import { Router } from 'express';
import { addAddress, deleteAddress, getAddresses } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = Router();
router.use(protect);
router.post('/address', addAddress);
router.get('/address', getAddresses);
router.delete('/address/:id', deleteAddress);

export default router;
