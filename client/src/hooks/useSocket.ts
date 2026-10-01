import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config";

let sharedSocket: Socket | null = null;

const getOrCreateSocket = (): Socket | null => {
    if (typeof window === "undefined" || !SOCKET_URL) return null;
    if (!sharedSocket) {
        sharedSocket = io(SOCKET_URL, {
            transports: ["websocket", "polling"],
            reconnectionAttempts: 5,
            reconnectionDelay: 2000,
            timeout: 10000,
        });

        sharedSocket.on("connect_error", (err) => {
            console.warn("Socket connection warning:", err.message);
        });
    }
    return sharedSocket;
};

export const useSocket = () => {
    const [socket] = useState<Socket | null>(() => getOrCreateSocket());

    useEffect(() => {
        // Ensure connection is maintained
        if (socket && !socket.connected) {
            socket.connect();
        }
    }, [socket]);

    return socket;
};
