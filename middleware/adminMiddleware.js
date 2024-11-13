module.exports = (req, res, next) => {
    if (!req.session.isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};
