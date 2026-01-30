import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config";

const SERVER_URL = SOCKET_URL;

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
