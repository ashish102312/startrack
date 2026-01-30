import { Play } from "lucide-react";

export const VideoSection = () => {
    return (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6 bg-white flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600">
                        <Play size={20} fill="currentColor" />
                    </div>
                    <div>
                        <a href="https://youtu.be/Dq8l1_-QgAc?si=4FEwSh2QUhAFYo7_" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-blue-600 transition-colors">
                            <h3 className="font-bold text-slate-900">Debugging Masterclass</h3>
                        </a>
                        <p className="text-sm text-slate-500">Learn effective strategies to fix bugs</p>
                    </div>
                </div>

                <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 aspect-video group">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/Dq8l1_-QgAc"
                        title="Debugging Masterclass"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div className="glass-card p-6 bg-white flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        <Play size={20} fill="currentColor" />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">System Architecture</h3>
                        <p className="text-sm text-slate-500">Understanding scalable bug tracking systems</p>
                    </div>
                </div>

                <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-slate-200 aspect-video group">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/xpDnVSmNFX0"
                        title="System Design"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};
