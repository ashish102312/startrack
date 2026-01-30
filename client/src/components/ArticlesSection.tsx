import { ExternalLink, BookOpen, Bug, Shield, Cpu } from "lucide-react";

const articles = [
    {
        id: 1,
        title: "The Art of Debugging",
        excerpt: "Learn the systematic approach to finding and fixing complex bugs in distributed systems.",
        image: "from-blue-500 to-indigo-600",
        icon: <Bug className="text-white" size={24} />,
        readTime: "5 min read",
        link: "#"
    },
    {
        id: 2,
        title: "Secure by Design",
        excerpt: "Best practices for implementing security protocols in your incident management workflow.",
        image: "from-emerald-500 to-teal-600",
        icon: <Shield className="text-white" size={24} />,
        readTime: "7 min read",
        link: "#"
    },
    {
        id: 3,
        title: "Scaling Websockets",
        excerpt: "How we handle real-time updates for thousands of concurrent users with minimal latency.",
        image: "from-purple-500 to-pink-600",
        icon: <Cpu className="text-white" size={24} />,
        readTime: "6 min read",
        link: "#"
    }
];

export const ArticlesSection = () => {
    return (
        <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <BookOpen className="text-slate-400" size={20} />
                    <h2 className="text-xl font-bold text-slate-800">Recommended Reading</h2>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center gap-1">
                    View all <ExternalLink size={14} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="glass-card bg-white group cursor-pointer overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border-t-0"
                    >
                        <div className={`h-32 bg-gradient-to-br ${article.image} relative flex items-center justify-center overflow-hidden`}>
                            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/0 transition-colors" />
                            <div className="transform group-hover:scale-110 transition-transform duration-500">
                                {article.icon}
                            </div>
                            <div className="absolute bottom-3 left-3 bg-black/20 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium">
                                {article.readTime}
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{article.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4">{article.excerpt}</p>
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider group-hover:underline">Read Article</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
