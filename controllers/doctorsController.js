const Doctor = require('../models/doctor');

exports.getAllDoctors = (req, res) => {
    // Logic to get all doctors
    res.send('List of all doctors');
};

exports.createDoctor = (req, res) => {
    // Logic to create a new doctor
    res.send('Doctor created');
};

exports.addDoctor = (req, res) => {
    const { name, email, specialization, schedule } = req.body;

    // Optionally add validation to check for existing doctors

    const newDoctor = Doctor.addDoctor(name, email, specialization, schedule);
    res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });
};

exports.getAllDoctors = (req, res) => {
    const doctors = Doctor.findAll();
    res.json(doctors);
};

exports.updateDoctor = (req, res) => {
    const { email } = req.params; // Assuming email is passed as a URL parameter
    const updatedInfo = req.body;

    const updatedDoctor = Doctor.updateDoctor(email, updatedInfo);
    if (updatedDoctor) {
        res.json({ message: 'Doctor updated successfully', doctor: updatedDoctor });
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
};

exports.deleteDoctor = (req, res) => {
    const { email } = req.params; // Assuming email is passed as a URL parameter

    const deleted = Doctor.deleteByEmail(email);
    if (deleted) {
        res.json({ message: 'Doctor deactivated successfully' });
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
};
