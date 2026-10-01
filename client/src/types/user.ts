export interface UserProfile {
    id: string;
    username: string;
    email: string;
    profilePic: string;
    bio?: string;
    isVerified: boolean;
    createdAt?: string;
}
