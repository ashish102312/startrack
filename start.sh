#!/bin/bash
echo "Starting Incident Tracker..."
(cd server && npm start) &
(cd client && npm run dev) &
wait
