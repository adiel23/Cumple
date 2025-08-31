import express from 'express';

import session from 'express-session';

const app = express();

app.use(express.json());

app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('./public'));

import faultRoutes from './routes/faults.routes.js';
import studentRoutes from './routes/students.routes.js';
import studentFaultRoutes from './routes/studentFaults.routes.js';
import groupRoutes from './routes/groups.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import reportRoutes from './routes/reports.routes.js';

app.use(faultRoutes);
app.use(studentRoutes);
app.use(studentFaultRoutes);
app.use(groupRoutes);
app.use(authRoutes);
app.use(adminRoutes);
app.use(reportRoutes);

app.listen(3000, () => {
    console.log('servidor corriendo en puerto 3000');
});