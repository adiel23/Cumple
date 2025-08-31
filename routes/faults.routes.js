import express from 'express';

import faultsController from '../controllers/faults.controller.js';

const router = express.Router();

router.get('/faults', faultsController.get);

// router.post('/faults', faultsController.create);

// router.get('/faults', faultsController.getByFilters);

export default router;