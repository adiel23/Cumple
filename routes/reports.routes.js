import express from 'express';
import reportsController from '../controllers/reports.controller.js';

const router = express.Router();

// aqui debo de recibir queryParameters

router.get('/reports/faults', reportsController.generateFaultsPDF);

router.get('/reports/students/:studentId/faults', reportsController.generateStudentFaultsHistoryPDF);

export default router;