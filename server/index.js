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
const io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST", "PUT", "DELETE", "PATCH"] }
});

// Make IO accessible to routes via app.set
app.set('io', io);

// --- Middleware ---
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json());

// Rate Limiting (100 reqs / 15 min)
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api', limiter);

// --- Database ---
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/incident_tracker";
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// --- Routes ---
app.use('/api/issues', issueRoutes);

// --- Socket Logic ---
let connectedClients = 0;

io.on('connection', (socket) => {
    connectedClients++;
    io.emit('ONLINE_COUNT', connectedClients);
    console.log(`Client connected: ${socket.id} (Total: ${connectedClients})`);

    socket.on('disconnect', () => {
        connectedClients--;
        io.emit('ONLINE_COUNT', connectedClients);
        console.log(`Client disconnected: ${socket.id} (Total: ${connectedClients})`);
    });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
