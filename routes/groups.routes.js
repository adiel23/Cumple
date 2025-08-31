import express from 'express';
import groupsController from '../controllers/groups.controller.js';

const router = express.Router();

router.get('/groups', groupsController.get);

export default router;