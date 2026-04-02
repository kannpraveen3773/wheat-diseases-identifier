const express = require('express');
const router = express.Router();
const { auth, db } = require('../config/firebase');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } = require('firebase/auth');
const { collection, addDoc } = require('firebase/firestore');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Let Firebase handle the password hashing and user creation mapping
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (name) {
            await updateProfile(user, { displayName: name });
        }

        // Log registration
        try {
            await addDoc(collection(db, 'user_logs'), {
                uid: user.uid,
                email: user.email,
                action: 'register',
                timestamp: new Date().toISOString(),
                userAgent: req.headers['user-agent'] || 'unknown',
                ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress
            });
        } catch (logErr) {
            console.error('Logging error:', logErr.message);
        }

        res.status(201).json({ message: 'User registered successfully', uid: user.uid });
    } catch (err) {
        console.error('Registration error:', err.message);
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Authenticate with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Store the login details in Firestore
        try {
            await addDoc(collection(db, 'user_logs'), {
                uid: user.uid,
                email: user.email,
                action: 'login',
                timestamp: new Date().toISOString(),
                userAgent: req.headers['user-agent'] || 'unknown',
                ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress
            });
        } catch (logErr) {
            console.error('Logging error:', logErr.message);
        }

        // Set token in HTTP-only cookie for session-based auth
        const token = await user.getIdToken();
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const options = { maxAge: expiresIn, httpOnly: true, secure: true, sameSite: 'none' };
        res.cookie('session_token', token, options);

        res.json({ success: true, uid: user.uid, email: user.email });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

router.post('/log-external-login', async (req, res) => {
    try {
        const { uid, email, provider, token } = req.body;
        
        // Log action
        await addDoc(collection(db, 'user_logs'), {
            uid: uid || 'unknown',
            email: email || 'unknown',
            action: 'external_login',
            provider: provider || 'unknown',
            timestamp: new Date().toISOString(),
            userAgent: req.headers['user-agent'] || 'unknown',
            ip: req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress
        });

        // If token is provided, set it as cookie
        if (token) {
            const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
            const options = { maxAge: expiresIn, httpOnly: true, secure: true, sameSite: 'none' };
            res.cookie('session_token', token, options);
        }

        res.json({ message: 'Log created successfully' });
    } catch (err) {
        console.error('External logging error:', err.message);
        res.status(500).json({ error: 'Failed to log external login.' });
    }
});

module.exports = router;
