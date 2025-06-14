import express from 'express';
import { validateGet, validateBody } from '../middlewares/validation';
import { getPets, addPet, updatePet, patchPet } from '../controllers/pets';

const router = express.Router();

router.get('/', validateGet, getPets);
router.post('/', validateBody, addPet);
router.put('/:id', validateBody, updatePet);
router.patch('/:id', validateBody, patchPet);

export default router;
