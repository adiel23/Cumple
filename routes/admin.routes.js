import express from 'express';
import requireAuth from '../middlewares/auth.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get('/admin/dashboard', requireAuth('admin'), (req, res) => {
    const filePath = path.join(__dirname, '../views/admin/dashboard.html');
    res.sendFile(filePath);
});

export default router;