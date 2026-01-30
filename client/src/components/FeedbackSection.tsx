import { useState } from "react";
import { MessageSquare, Star, Send } from "lucide-react";
import { toast } from "sonner";

export const FeedbackSection = () => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        if (!comment.trim()) {
            toast.error("Please enter your feedback first.");
            return;
        }
        if (rating === 0) {
            toast.error("Please give us a rating.");
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setComment("");
            setRating(0);
            toast.success("Thank you for your feedback!", {
                description: "We appreciate your input to make Startrack better."
            });
        }, 1500);
    };

    return (
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
    );
};
