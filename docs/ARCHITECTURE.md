# System Architecture

Startrack follows a decoupled client-server architecture:
- **Client**: React 19 Single Page App with Vite and Tailwind CSS
- **Server**: Express.js REST API with Socket.IO WebSocket engine
- **Database**: MongoDB with Mongoose ODM
- **Protocol**: HTTP/2 + WebSocket (WSS)
