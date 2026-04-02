require('dotenv').config();
const express = require('express');
// Mongoose replaced with Firebase
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const app = express();
app.set('trust proxy', 1);
app.use(cors({
    origin: function(origin, callback) {
        callback(null, true);
    },
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api', aiRoutes);
app.use('/api', userRoutes);
app.use('/api', chatRoutes);

const PORT = process.env.PORT || 5000;

// Initialize Firebase
require('./config/firebase');

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
