import { useState, useEffect } from "react";
import { X, Save, Camera, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "sonner";
import { API_BASE_URL } from "../config";

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
    const { user, updateUser } = useAuth();
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setUsername(user.username);
            setBio(user.bio || "");
            setProfilePic(user.profilePic);
        }
    }, [user, isOpen]);

    if (!isOpen || !user) return null;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.put(`${API_BASE_URL}/api/auth/me`, {
                username,
                bio,
                profilePic
            });
            updateUser(res.data);
            toast.success("Profile updated successfully!");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                    >
                        <X size={18} />
                    </button>
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <div className="relative group">
                            <img
                                src={profilePic || user.profilePic}
                                alt={username}
                                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg bg-white"
                            />
                            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="text-white" size={24} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-16 pb-8 px-8">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
                            {user.username}
                            {user.isVerified && <CheckCircle size={18} className="text-blue-500 fill-blue-50" />}
                        </h2>
                        <p className="text-slate-500 text-sm">{user.email}</p>
                    </div>

                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Bio</label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avatar URL</label>
                            <input
                                type="text"
                                value={profilePic}
                                onChange={(e) => setProfilePic(e.target.value)}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-slate-900 text-sm font-mono"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                            >
                                {loading ? "Saving..." : <><Save size={18} /> Save Changes</>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
