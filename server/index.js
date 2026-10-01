const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const issueRoutes = require('./routes/issueRoutes');

// --- Initialization ---
const app = express();
const server = http.createServer(app);

// --- CORS Configuration ---
const allowedOrigins = process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(',').map(url => url.trim())
    : ['*'];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        // In development, permit localhost ports
        if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
            return callback(null, true);
        }
        return callback(null, true); // Fallback to allow connection, but log if needed
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
};

const io = new Server(server, {
    cors: {
        origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
    }
});

// Make IO accessible to routes via app.set
app.set('io', io);

// Trust proxy - Required for cloud proxies (Vercel, Render, Railway, Heroku)
app.set('trust proxy', 1);

// --- Middleware ---
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// Rate Limiting (100 reqs / 15 min)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);

// --- JWT Secret Validation ---
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
    console.error("⚠️  WARNING: JWT_SECRET environment variable is missing in production! Please define it in your cloud provider's environment variables.");
}

// --- Database Connection ---
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/incident_tracker";

if (process.env.NODE_ENV === 'production' && MONGO_URI.includes('localhost')) {
    console.warn("⚠️  WARNING: You are using 'localhost' MongoDB URI in production. Please set MONGO_URI to a hosted database (e.g. MongoDB Atlas) in your cloud deployment settings.");
}

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected successfully'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err.message);
    });

// --- Health Check & Root Route ---
app.get('/', (req, res) => {
    res.json({
        name: 'Startrack Incident Tracker API',
        status: 'online',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        uptime: process.uptime()
    });
});

// --- Routes ---
app.use('/api/issues', issueRoutes);
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// --- Socket Logic ---
let connectedClients = 0;

io.on('connection', (socket) => {
    connectedClients++;
    io.emit('ONLINE_COUNT', connectedClients);
    console.log(`Client connected: ${socket.id} (Total: ${connectedClients})`);

    socket.on('disconnect', () => {
        connectedClients = Math.max(0, connectedClients - 1);
        io.emit('ONLINE_COUNT', connectedClients);
        console.log(`Client disconnected: ${socket.id} (Total: ${connectedClients})`);
    });
});

// --- Start Server ---
const PORT = process.env.PORT || 5001;

// Only start the server if not imported by another file (e.g., tests or serverless runner)
if (process.env.NODE_ENV !== 'test') {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
module.exports.server = server;
