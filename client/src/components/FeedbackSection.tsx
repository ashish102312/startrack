import { useState, useEffect } from "react";
import { MessageSquare, Star, Send, User, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config";

interface Feedback {
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

export const FeedbackSection = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [averageRating, setAverageRating] = useState(0);

    // Fetch feedbacks
    const fetchFeedbacks = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/feedback`);
            setFeedbacks(res.data);

            // Calculate average
            if (res.data.length > 0) {
                const sum = res.data.reduce((acc: number, curr: Feedback) => acc + curr.rating, 0);
                setAverageRating(Number((sum / res.data.length).toFixed(1)));
            }
        } catch (error) {
            console.error("Failed to fetch feedback", error);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const handleSubmit = async () => {
        if (!user) {
            toast.error("Please login to submit feedback.");
            return;
        }
        if (!comment.trim()) {
            toast.error("Please enter your feedback first.");
            return;
        }
        if (rating === 0) {
            toast.error("Please give us a rating.");
            return;
        }

        setIsSubmitting(true);
        try {
            await axios.post(`${API_BASE_URL}/api/feedback`, {
                rating,
                comment
            });

            toast.success("Thank you for your feedback!", {
                description: "Your input has been shared with the community."
            });

            setComment("");
            setRating(0);
            fetchFeedbacks(); // Refresh list
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit feedback. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-12">
            {/* Feedback Form Section */}
            <section className="mt-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 relative overflow-hidden text-white shadow-2xl">
                {/* Decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
                                <MessageSquare className="text-blue-400" size={24} />
                            </div>
                            <h2 className="text-2xl font-bold">Help us improve</h2>
                        </div>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Encountered a bug? Or have a suggestion for a new feature?
                            We read every piece of feedback to make Startrack the best incident management tool for you.
                        </p>

                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">Rate your experience</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(star)}
                                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                    >
                                        <Star
                                            size={32}
                                            className={`transition-colors duration-200 ${star <= (hoverRating || rating)
                                                ? "fill-amber-400 text-amber-400"
                                                : "text-slate-600"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Tell us what you think..."
                            className="w-full h-32 bg-slate-950/50 border border-white/10 rounded-xl p-4 text-slate-200 placeholder:text-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all resize-none mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 flex items-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
                            >
                                {isSubmitting ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send Feedback <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Public Community Feedback List */}
            <section className="mb-20">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Community Feedback</h2>
                        <p className="text-slate-500">See what others are saying about Startrack</p>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                        <Star className="fill-amber-400 text-amber-400" size={20} />
                        <span className="font-bold text-slate-900">{averageRating || "0.0"}</span>
                        <span className="text-slate-400 text-sm">/ 5.0</span>
                    </div>
                </div>

                {feedbacks.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                        No feedback yet. Be the first to share your thoughts!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {feedbacks.map((item) => (
                            <div key={item._id} className="glass-card p-6 bg-white hover:-translate-y-1 transition-transform duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 overflow-hidden border border-slate-100">
                                            {item.user?.profilePic ? (
                                                <img src={item.user.profilePic} alt={item.user.username} className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-sm font-semibold text-slate-900">{item.user?.username || "Anonymous"}</span>
                                                {item.user?.isVerified && <CheckCircle size={14} className="text-blue-500 fill-blue-50" />}
                                                <span className="text-[10px] text-slate-400 font-medium ml-1">
                                                    {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>
                                            <div className="flex gap-0.5 mt-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        className={`${i < item.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed">
                                    "{item.comment}"
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};
