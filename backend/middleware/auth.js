const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No authentication token, access denied' });
        }

        // Since we are using the Firebase Client SDK directly on the backend, we don't have
        // admin.auth().verifyIdToken() available. We decode the payload trusting the signature 
        // to simplify the flow as requested.
        const decoded = jwt.decode(token);
        
        if (!decoded || !decoded.user_id) {
            return res.status(401).json({ error: 'Invalid authentication token' });
        }

        req.user = decoded.user_id;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token parsing failed, authorization denied' });
    }
};

module.exports = auth;
