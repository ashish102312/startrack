import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useSocket } from "./useSocket";
import { handleError } from "../utils/errorHandler";
import type { Issue } from "../types";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/issues`;

export const useIssues = () => {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [loading, setLoading] = useState(true);
    const socket = useSocket();

    const fetchIssues = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(API_URL);
            setIssues(res.data);
        } catch (err) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createTestIssue = async () => {
        const types = ["incident", "bug", "task"];
        const priorities = ["high", "medium", "low"];
        const type = types[Math.floor(Math.random() * types.length)];
        const priority = priorities[Math.floor(Math.random() * priorities.length)];

        const promise = axios.post(API_URL, {
            title: `Simulated ${type} event`,
            description: "Auto generated test incident for demo purposes.",
            type,
            priority,
            assignedTo: "bot",
            tags: ["simulation", "demo"],
        });

        toast.promise(promise, {
            loading: 'Creating new simulated issue...',
            success: 'New issue injected successfully',
            error: (err) => {
                handleError(err);
                return 'Failed to create issue';
            }
        });
    };

    useEffect(() => {
        fetchIssues();
    }, [fetchIssues]);

    useEffect(() => {
        if (!socket) return;

        socket.on("ISSUE_ADDED", (newIssue: Issue) => {
            setIssues((prev) => [newIssue, ...prev]);
        });

        socket.on("ISSUE_UPDATED", (updatedIssue: Issue) => {
            setIssues((prev) =>
                prev.map((i) => (i._id === updatedIssue._id ? updatedIssue : i))
            );
        });

        socket.on("ISSUE_DELETED", (id: string) => {
            setIssues((prev) => prev.filter((i) => i._id !== id));
        });

        socket.on("REFRESH_ALL", fetchIssues);

        return () => {
            socket.off("ISSUE_ADDED");
            socket.off("ISSUE_UPDATED");
            socket.off("ISSUE_DELETED");
            socket.off("REFRESH_ALL");
        };
    }, [socket, fetchIssues]);

    return { issues, loading, fetchIssues, createTestIssue };
};
