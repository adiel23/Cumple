import express from 'express';
import studentFaultsController from '../controllers/studentFaults.controller.js';
import requireAuth from '../middlewares/auth.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get('/student-faults/student-faults-view', requireAuth('admin'), (req, res) => {
    res.sendFile(path.join(__dirname, '../views/faults/faults.html'));
});

router.get('/student-faults', studentFaultsController.get);

router.post('/student-faults', studentFaultsController.create);

export default router;