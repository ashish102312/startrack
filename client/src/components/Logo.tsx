import { motion } from "framer-motion";

export const Logo = () => {
    return (
        <div className="relative w-10 h-10 flex items-center justify-center">
            {/* Outer rotating ring */}
            <motion.svg
                viewBox="0 0 50 50"
                className="absolute w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
                <defs>
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <circle
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="url(#ringGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="80 40"
                />
            </motion.svg>

            {/* Inner pulsing core */}
            <motion.div
                className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Crosshair accents */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-blue-300/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-purple-300/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-blue-300/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-purple-300/50"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                />
            </div>
        </div>
    );
};
