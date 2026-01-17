"use client";

import { motion } from "framer-motion";
import { Service } from "@/lib/packs/data";
import { ArrowRight, Clock, Star } from "lucide-react";

interface ServiceCardProps {
    service: Service;
    onClick: (service: Service) => void;
    index: number;
}

export function ServiceCard({ service, onClick, index }: ServiceCardProps) {
    const isPremium = service.price >= 50;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="h-full"
        >
            <motion.div
                className={`relative h-full flex flex-col p-8 rounded-3xl border transition-all duration-300 group
                    ${isPremium
                        ? "bg-gradient-to-b from-neutral-900/80 to-black/80 border-fuchsia-500/30 hover:border-fuchsia-500/60 shadow-[0_0_30px_-10px_rgba(192,38,211,0.15)]"
                        : "bg-white/5 dark:bg-neutral-900/40 border-white/10 hover:border-violet-500/30 backdrop-blur-sm"
                    }`}
                whileHover={{ y: -5 }}
            >
                {/* Background Glow for Premium */}
                {isPremium && (
                    <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-500/5 to-transparent rounded-3xl opacity-50" />
                )}

                <div className="relative z-10 flex flex-col h-full">
                    {/* Image */}
                    {service.image && (
                        <div className="w-full aspect-video rounded-2xl mb-6 overflow-hidden border border-white/10">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    )}

                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className={`text-2xl font-bold mb-2 ${isPremium ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-fuchsia-200' : 'text-white'}`}>
                                {service.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-neutral-400">
                                <Clock className="w-4 h-4" />
                                <span>{service.deliveryTime}</span>
                            </div>
                        </div>
                        <div className={`px-4 py-2 rounded-xl border ${isPremium ? 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-300' : 'bg-white/5 border-white/10 text-white'}`}>
                            <span className="text-xl font-bold">${service.priceLabel || service.price}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white/5 mb-6" />

                    {/* Features/Description */}
                    <p className="text-neutral-300 leading-relaxed mb-8 flex-grow">
                        {service.description}
                    </p>

                    {/* CTA */}
                    <button
                        onClick={() => onClick(service)}
                        className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all 
                            ${isPremium
                                ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 hover:from-fuchsia-400 hover:to-violet-500 text-white shadow-lg shadow-fuchsia-900/20"
                                : "bg-white text-black hover:bg-neutral-200"
                            }`}
                    >
                        Request This <ArrowRight className="w-4 h-4" />
                    </button>

                    {isPremium && (
                        <div className="absolute top-0 right-0 p-3">
                            <Sparkles className="w-6 h-6 text-fuchsia-400 opacity-50" />
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

function Sparkles({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" />
        </svg>
    );
}
