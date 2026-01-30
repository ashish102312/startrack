# Deployment Guide

To deploy this application, you generally need to deploy the Client (React) and the Server (Node.js) separately.

## Client (Frontend)

1.  **Build**: Run `npm run build` to generate the `dist` folder.
2.  **Environment Variables**:
    *   Create a `.env` file based on `.env.example` (if testing locally with a production build).
    *   Set `VITE_API_URL` to your backend URL (e.g., `https://your-api.onrender.com`).
    *   Set `VITE_SOCKET_URL` to your backend URL (usually the same as `VITE_API_URL`).
3.  **Deploy**: Upload the `dist` folder to a static host like Vercel, Netlify, or AWS S3.

## Server (Backend)

1.  **Environment Variables**:
    *   `MONGO_URI`: Your MongoDB connection string.
    *   `JWT_SECRET`: A secret key for JWT tokens.
    *   `PORT`: Port to run on (default 5000/5001).
2.  **Deploy**: Push the `server` folder to a Node.js host like Render, Heroku, or Railway.

## Important Notes

*   Ensure your server's CORS configuration allows requests from your frontend domain. Currently, it allows all (`*`).
*   If your frontend and backend are on different domains, you **MUST** set `VITE_API_URL` and `VITE_SOCKET_URL` in your frontend deployment settings.
