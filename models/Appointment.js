class Appointment {
    constructor(patientEmail, doctorEmail, date, time) {
        this.patientEmail = patientEmail;
        this.doctorEmail = doctorEmail;
        this.date = date; // Date of the appointment
        this.time = time; // Time of the appointment
        this.status = 'scheduled'; // Status can be scheduled, canceled
    }

    static appointments = []; // In-memory storage

    static bookAppointment(patientEmail, doctorEmail, date, time) {
        const newAppointment = new Appointment(patientEmail, doctorEmail, date, time);
        Appointment.appointments.push(newAppointment);
        return newAppointment;
    }

    static findAllForPatient(email) {
        return Appointment.appointments.filter(appointment => appointment.patientEmail === email);
    }

    static findAllForDoctor(email) {
        return Appointment.appointments.filter(appointment => appointment.doctorEmail === email);
    }

    static updateAppointment(email, updatedInfo) {
        const appointment = Appointment.appointments.find(app => app.patientEmail === email && app.status === 'scheduled');
        if (appointment) {
            Object.assign(appointment, updatedInfo);
            return appointment;
        }
        return null;
    }

    static cancelAppointment(patientEmail, appointmentId) {
        const appointment = Appointment.appointments.find(app => app.patientEmail === patientEmail && app.status === 'scheduled' && app.id === appointmentId);
        if (appointment) {
            appointment.status = 'canceled';
            return true;
        }
        return false;
    }
}

module.exports = Appointment;
