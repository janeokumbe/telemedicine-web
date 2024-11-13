exports.getAllPatients = (req, res) => {
    // Logic to get all patients
    res.send('List of all patients');
};

exports.createPatient = (req, res) => {
    // Logic to create a new patient
    res.send('Patient created');
};

const Patient = require('../models/patient');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingPatient = await Patient.findByEmail(email);
        if (existingPatient) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newPatient = await Patient.register(name, email, password);
        res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
    } catch (error) {
        res.status(500).json({ message: 'Error registering patient', error });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const patient = await Patient.findByEmail(email);
        if (!patient || !(await bcrypt.compare(password, patient.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Start session
        req.session.patientId = patient.email; // You might want to store an ID instead
        res.json({ message: 'Logged in successfully', patient });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.getProfile = (req, res) => {
    const patientId = req.session.patientId;
    if (!patientId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const patient = Patient.findByEmail(patientId);
    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    res.json({ name: patient.name, email: patient.email }); // Return profile info
};

exports.updateProfile = (req, res) => {
    const patientId = req.session.patientId;
    const { name } = req.body; // Allow updating name, but not email or password

    if (!patientId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const patient = Patient.findByEmail(patientId);
    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    patient.name = name; // Update name
    res.json({ message: 'Profile updated', patient });
};


exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.json({ message: 'Logged out successfully' });
    });
};

exports.getAllPatients = async (req, res) => {
    // Admin-only access
    const isAdmin = req.session.isAdmin; // Assuming isAdmin is set in session for admins
    if (!isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }

    const patients = await Patient.findAll();
    res.json(patients);
};

exports.deleteAccount = async (req, res) => {
    const patientId = req.session.patientId; // Assuming this is the logged-in patient's email

    if (!patientId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const deleted = await Patient.deleteByEmail(patientId);
    if (deleted) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Could not log out after account deletion' });
            }
            res.clearCookie('connect.sid');
            res.json({ message: 'Account deleted successfully' });
        });
    } else {
        res.status(404).json({ message: 'Patient not found' });
    }
};


