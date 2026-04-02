const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { collection, query, where, getDocs } = require('firebase/firestore');
const { db } = require('../config/firebase');

router.get('/history', auth, async (req, res) => {
    try {
        const q = query(collection(db, 'diagnostics'), where('userId', '==', req.user));
        const snapshot = await getDocs(q);
        
        const history = [];
        snapshot.forEach(doc => {
            history.push({ id: doc.id, ...doc.data() });
        });

        // Sort by createdAt descending natively in JS
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json(history);
    } catch (err) {
        console.error('History fetch error:', err);
        res.status(500).json({ error: 'Server error while fetching history' });
    }
});

module.exports = router;
