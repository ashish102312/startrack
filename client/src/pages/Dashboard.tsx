import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useIssues } from "../hooks/useIssues";
import { Header, FilterBar } from "../components/layout/Header";
import { Stats } from "../components/Stats";
import { IssueList } from "../components/IssueList";
import { VideoSection } from "../components/VideoSection";
import { ArticlesSection } from "../components/ArticlesSection";
import { FeedbackSection } from "../components/FeedbackSection";
import { ResolvedHistory } from "../components/ResolvedHistory";
import { useSocket } from "../hooks/useSocket";

import type { Issue } from "../types";

export const Dashboard = () => {
    const { issues, fetchIssues, createTestIssue } = useIssues();
    const [filter, setFilter] = useState("");
    const [onlineCount, setOnlineCount] = useState(1);
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('ONLINE_COUNT', (count: number) => {
            setOnlineCount(count);
        });

        return () => {
            socket.off('ONLINE_COUNT');
        }
    }, [socket]);

    const filteredIssues = issues.filter(
        (i) =>
            i.title.toLowerCase().includes(filter.toLowerCase()) ||
            (i._id && i._id.toLowerCase().includes(filter.toLowerCase()))
    );

    const handleIssueClick = (issue: Issue) => {
        toast.info(`Opening ${issue._id}`, {
            description: "Full edit details would open in a modal here.",
        });
    };

    return (
        <div className="p-8 max-w-6xl mx-auto min-h-screen">
            <Header onRefresh={() => {
                fetchIssues();
                toast.success("Dashboard refreshed");
            }} onCreate={createTestIssue} onlineCount={onlineCount} />
            <Stats issues={issues} />
            <FilterBar filter={filter} setFilter={setFilter} />
            <IssueList issues={filteredIssues.filter(i => i.status !== 'resolved')} onEdit={handleIssueClick} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 my-8">
                <VideoSection />
                <ArticlesSection />
            </div>
            <ResolvedHistory issues={issues} />
            <FeedbackSection />
        </div>
    );
};
