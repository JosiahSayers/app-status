import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => res.status(200));
router.get('/', (req, res) => res.status(200));
router.get('/:appId', (req, res) => res.status(200));
router.delete('/:appId', (req, res) => res.status(200));
router.patch('/:appId', (req, res) => res.status(200));

export default router;
