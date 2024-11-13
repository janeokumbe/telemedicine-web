const bcrypt = require('bcryptjs');

let patients = []; // In-memory storage for simplicity

class Patient {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password; // Hashed password
    }

    static async register(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPatient = new Patient(name, email, hashedPassword);
        patients.push(newPatient);
        return newPatient;
    }

    static async findByEmail(email) {
        return patients.find(patient => patient.email === email);
    }

    static async findAll() {
        return patients; // Returns the list of all patients
    }

    static async deleteByEmail(email) {
        const index = patients.findIndex(patient => patient.email === email);
        if (index !== -1) {
            patients.splice(index, 1); // Removes the patient from the array
            return true;
        }
        return false;
    }
}

module.exports = Patient;
