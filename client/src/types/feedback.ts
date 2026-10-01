export interface FeedbackEntry {
    _id: string;
    rating: number;
    comment: string;
    createdAt: string;
    user?: {
        _id: string;
        username: string;
        profilePic: string;
        isVerified: boolean;
    };
}
