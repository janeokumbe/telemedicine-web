const express = require('express');
const session = require('express-session')
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(session({
    secret:'',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

// Import Routes
const patientsRoutes = require('./routes/patients');
const doctorsRoutes = require('./routes/doctors');
const appointmentsRoutes = require('./routes/appointments');
const adminRoutes = require('./routes/admin');

// Use Routes
app.use('/patients', patientsRoutes);
app.use('/doctors', doctorsRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/admin', adminRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
