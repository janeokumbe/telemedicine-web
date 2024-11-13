class Doctor {
    constructor(name, email, specialization, schedule) {
        this.name = name;
        this.email = email;
        this.specialization = specialization;
        this.schedule = schedule; // Could be an array of availability times
        this.isActive = true; // To indicate if the doctor is active
    }

    static doctors = []; // In-memory storage

    static addDoctor(name, email, specialization, schedule) {
        const newDoctor = new Doctor(name, email, specialization, schedule);
        Doctor.doctors.push(newDoctor);
        return newDoctor;
    }

    static findAll() {
        return Doctor.doctors.filter(doctor => doctor.isActive); // Only return active doctors
    }

    static findByEmail(email) {
        return Doctor.doctors.find(doctor => doctor.email === email);
    }

    static updateDoctor(email, updatedInfo) {
        const doctor = this.findByEmail(email);
        if (doctor) {
            Object.assign(doctor, updatedInfo);
            return doctor;
        }
        return null;
    }

    static deleteByEmail(email) {
        const doctor = this.findByEmail(email);
        if (doctor) {
            doctor.isActive = false; // Deactivate instead of deleting
            return true;
        }
        return false;
    }
}

module.exports = Doctor;
