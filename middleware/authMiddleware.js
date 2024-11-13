module.exports = (req, res, next) => {
    if (!req.session.patientId) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
};
