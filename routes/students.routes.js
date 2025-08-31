import express from 'express';
import studentsController from '../controllers/students.controller.js';
import requireAuth from '../middlewares/auth.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import path from 'path';

const router = express.Router();

router.get('/students/students-view', requireAuth('admin'), (req, res) => {
    console.log('Ruta /students-view llamada');
    res.sendFile(path.join(__dirname, '../views/students/students.html'));
});

router.get('/students/faults-view', requireAuth('admin'), (req, res) => {
    console.log('Ruta /students-view llamada');
    res.sendFile(path.join(__dirname, '../views/students/faults.html'));
});

router.get('/students/add-fault-view', requireAuth('docente'), (req, res) => {
    console.log('Ruta /students-view llamada');
    res.sendFile(path.join(__dirname, '../views/students/add-fault.html'));
});

router.get('/students', studentsController.getByFilters);

router.get('/students/:id', studentsController.getById);

router.get('/students/:id/faults', studentsController.getFaults);


export default router;