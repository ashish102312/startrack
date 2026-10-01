# Startrack Production Deployment Guide

Startrack consists of two components:
1. **Frontend (Client)**: React 19 + Vite SPA (Static web app).
2. **Backend (Server)**: Node.js + Express + Socket.IO (Persistent WebSocket server) + MongoDB.

---

## ⚠️ Important Hosting Notice: WebSockets
The server utilizes **Socket.IO** for live incident streaming and real-time active user counts (`ONLINE_COUNT`, `ISSUE_ADDED`, etc.). 

> **Important**: Vercel Serverless Functions do NOT support persistent WebSockets.
> - **Frontend (Client)**: Best hosted on **Vercel** or **Netlify**.
> - **Backend (Server)**: Must be hosted on a persistent Node.js runtime host such as **[Render](https://render.com)**, **[Railway](https://railway.app)**, or **Fly.io**.

---

## Part 1: Database Setup (MongoDB Atlas)

1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a free M0 cluster (e.g., `startrack-cluster`).
3. Under **Database Access**, create a database user (e.g. `startrack_user`) and a secure password.
4. Under **Network Access**, add IP address `0.0.0.0/0` (Allow Access from Anywhere) so cloud hosting platforms can connect.
5. Click **Connect** -> **Drivers** -> Copy your connection string:
   ```env
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/incident_tracker?retryWrites=true&w=majority
   ```

---

## Part 2: Backend (Server) Deployment on Render

1. Log into [Render.com](https://render.com) and click **New +** -> **Web Service**.
2. Connect your GitHub repository (`startrack`).
3. Configure the service settings:
   - **Name**: `startrack-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
4. Add the following **Environment Variables** in Render settings:
   | Key | Value / Example | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production mode |
   | `PORT` | `5001` (or leave default for Render) | Service port |
   | `MONGO_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection URI |
   | `JWT_SECRET` | `generate_a_random_64_char_secret_string` | Secret key for JWT signing |
   | `CLIENT_URL` | `https://your-frontend.vercel.app` | URL of your deployed frontend (for CORS) |
   | `ADMIN_SECRET` | `choose_a_strong_admin_password` | Protects database reset endpoint |
5. Click **Create Web Service**. Once deployed, Render will provide a public URL:
   `https://startrack-api.onrender.com`

---

## Part 3: Frontend (Client) Deployment on Vercel

1. Log into [Vercel.com](https://vercel.com) and click **Add New...** -> **Project**.
2. Import your GitHub repository (`startrack`).
3. Configure the project:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Edit to `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. In the **Environment Variables** section, add:
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `VITE_API_URL` | `https://startrack-api.onrender.com` | Your backend URL from Part 2 |
   | `VITE_SOCKET_URL` | `https://startrack-api.onrender.com` | Same as backend URL for WebSockets |
5. Click **Deploy**. Vercel will build and publish your frontend in seconds.

---

## Part 4: Verification Checklist

Once both services are deployed:
1. **API Health Check**: Visit `https://your-backend.onrender.com/api/health` in your browser. You should receive:
   ```json
   { "status": "healthy", "database": "connected", "uptime": 12.34 }
   ```
2. **Frontend Loading**: Visit your Vercel URL (`https://your-frontend.vercel.app`). The landing page should load immediately.
3. **Authentication**: Sign up with a test account and log in. Verify the profile avatar and name appear in the top-right header.
4. **Real-time Sync**: Open the dashboard in two different browser windows side by side. Click **New Issue** in one tab and watch it appear instantly in the second tab via WebSockets.
