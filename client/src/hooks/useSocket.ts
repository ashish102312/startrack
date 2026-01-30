import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:5001";

export const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const socketInstance = io(SERVER_URL, {
            transports: ["websocket", "polling"],
        });

        // eslint-disable-next-line
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return socket;
};
