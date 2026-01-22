"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FolderCheck, Package, ShoppingBag } from "lucide-react";

// --- Configuration ---
const ENABLE_SOCIAL_PROOF = true;
const NOTIFICATION_INTERVAL_MIN = 8000; // 8 seconds
const NOTIFICATION_INTERVAL_MAX = 15000; // 15 seconds
const NOTIFICATION_DURATION = 6000; // 6 seconds display time

// Pages to hide notifications on
const EXCLUDED_PATHS = [
    "/auth",
    "/api-keys",
    "/profile",
    "/wizard",
    "/create",
    "/generator",
    "/idea"
];

// --- Static Data ---
const NAMES = [
    "Alex Agache", "Mason Dunlap", "Benson Boone",
    "Christopher Grayson", "Mario Gagulić", "Luis Grünhard", "Jonas Poulsen", "Theo Souza Pires",
    "Nikita Erokhin", "Derek Sds", "Tom Charles", "Luan Henrique", "Lacey Andrews",
    "Brett Stafford", "Benjamin Rodemann", "Michael Anthony", "Damian Tull", "Gleb Rudakov",
    "Jesse Watson", "Jake Lockly", "Kumo Oota", "Gustavo Raul Estrada Tejerina", "Ahmad Georgiy",
    "Tristan DeLuna", "Mackenzie Dixon", "Nicholas Endoso", "Srihari Chandrasekar", "Ade Suryanata",
    "Miguel Santos", "Ekene Ilo", "Patryk Kowal", "Michel Goumet", "Samrudh Praveen",
    "Robert Hanus", "Chris Kiplinger", "Fox White", "Sujal Bhalerao", "Ricardo Bernardo",
    "Egor Frolov", "Lucy Mülle", "Akmal Kodirkhujaev", "Dre Bre", "Justin Samonte",
    "Leopold Fitz", "Neha Pal", "Tahmid Foisal", "Len Richter", "Jose Gomes",
    "Godfrey Philip", "Conrad Pankoff", "Rafael Ayala Aguilar", "Mason Hellier", "Joe McGrew",
    "Vinicius Estacio", "Alicia Vigil", "Connor Ellis", "Fernando Jacob Andrio Camacho", "Kimi Abyansyah",
    "Ruxsana Begum", "Peter", "Cristian Jos", "Jimmy Lindgren", "Danylo Vlasov",
    "Aayan Ahmmed", "Jonathan Schackney", "Pedro", "Nigel Ignacio", "Dominic Salas",
    "Enrique Falcon", "Fatih", "Daniel Eiben", "Cristian Campos", "Islam Bissi",
    "Oscar", "Shivam", "Jacob Floyd Joseph", "James", "Jean D’Arson",
    "Hayden", "Yotam Lander", "Juan F. Casanova", "Kevin Mitchell", "Safa Hussain",
    "Jeremy Conrad", "Asia Bianchi", "Slade", "Akmal Ali", "Maximiliano Lopez",
    "Jamal Rakeem", "Reece Johnson", "Jacob Asher", "Hugo Carvalho", "David Rosas",
    "Aadit Bose", "Amaan Patel", "Eduardo Araujo", "Ezekiel Mackelprang", "Desmond Singleton"
];

const PACKS = [
    "Janitor AI Prompt Pack",
    "NSFW-Safe Image + Prompt Pack",
    "Romance Image + Prompt Pack",
    "Anime Character Image + Prompt Pack",
    "Janitor AI Bot Images Pack",
    "Viral Bot Creation & Growth Guide",
    "Professional Bot Image Creation Mastery"
];

const SPECIAL_PACKS = [
    "Single Custom Character",
    "Multi-Character Story Setup",
    "Advanced / Niche Requests Pack"
];

const TIMES = [
    "3 sec ago", "1 min ago", "10 min ago",
    "20 sec ago", "1hr ago", "Just now", "Recently"
];

interface NotificationData {
    id: number;
    message: React.ReactNode;
    subtext: string;
    type: 'regular' | 'special';
}

export function SocialProofNotifications() {
    const pathname = usePathname();
    const router = useRouter();
    const [notification, setNotification] = useState<NotificationData | null>(null);
    const dismissTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const nextNotificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const isExcluded = EXCLUDED_PATHS.some(p => pathname?.startsWith(p));

    const scheduleNext = () => {
        if (isExcluded) return;

        const nextInterval = Math.floor(
            Math.random() * (NOTIFICATION_INTERVAL_MAX - NOTIFICATION_INTERVAL_MIN + 1)
        ) + NOTIFICATION_INTERVAL_MIN;

        if (nextNotificationTimeoutRef.current) clearTimeout(nextNotificationTimeoutRef.current);
        nextNotificationTimeoutRef.current = setTimeout(triggerNotification, nextInterval);
    };

    const triggerNotification = () => {
        if (isExcluded) return;

        const name = NAMES[Math.floor(Math.random() * NAMES.length)];
        const time = TIMES[Math.floor(Math.random() * TIMES.length)];

        // 20% chance for special order, 80% for regular pack
        const isSpecial = Math.random() < 0.2;

        let message: React.ReactNode;
        let type: 'regular' | 'special' = 'regular';

        if (isSpecial) {
            const pack = SPECIAL_PACKS[Math.floor(Math.random() * SPECIAL_PACKS.length)];
            message = (
                <span>
                    <span className="font-bold text-white">{name}</span> ordered <span className="text-amber-300 font-medium">{pack}</span>
                </span>
            );
            type = 'special';
        } else {
            const pack = PACKS[Math.floor(Math.random() * PACKS.length)];
            message = (
                <span>
                    <span className="font-bold text-white">{name}</span> bought <span className="text-blue-300 font-medium">{pack}</span>
                </span>
            );
            type = 'regular';
        }

        setNotification({
            id: Date.now(),
            message,
            subtext: time,
            type
        });

        if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
        dismissTimeoutRef.current = setTimeout(() => {
            setNotification(null);
            scheduleNext();
        }, NOTIFICATION_DURATION);
    };

    useEffect(() => {
        if (!ENABLE_SOCIAL_PROOF || isExcluded) {
            setNotification(null);
            return;
        }

        const initialDelay = Math.floor(Math.random() * 4000) + 1000;
        nextNotificationTimeoutRef.current = setTimeout(triggerNotification, initialDelay);

        return () => {
            if (dismissTimeoutRef.current) clearTimeout(dismissTimeoutRef.current);
            if (nextNotificationTimeoutRef.current) clearTimeout(nextNotificationTimeoutRef.current);
        };
    }, [pathname]);

    const handleMouseEnter = () => {
        if (dismissTimeoutRef.current) {
            clearTimeout(dismissTimeoutRef.current);
            dismissTimeoutRef.current = null;
        }
    };

    const handleMouseLeave = () => {
        if (notification) {
            dismissTimeoutRef.current = setTimeout(() => {
                setNotification(null);
                scheduleNext();
            }, NOTIFICATION_DURATION / 2);
        }
    };

    const handleClick = () => {
        router.push('/packs');
    };

    return (
        <AnimatePresence>
            {notification && (
                <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 30, x: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed bottom-6 left-6 z-[100] max-w-[340px] w-full md:w-auto cursor-pointer"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                >
                    <div className="
                        relative overflow-hidden
                        flex items-center gap-4
                        p-4
                        bg-black/60 backdrop-blur-xl
                        border border-white/10
                        rounded-2xl shadow-2xl
                        shadow-black/50
                        group
                    ">
                        {/* Glossy Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none rounded-2xl" />

                        {/* Live Indicator Dot */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-60">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                        </div>

                        {/* Icon Box */}
                        <div className={`
                            flex-shrink-0 flex items-center justify-center
                            w-12 h-12 rounded-xl
                            ${notification.type === 'special'
                                ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/20 border border-amber-500/30'
                                : 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-blue-500/30'}
                        `}>
                            {notification.type === 'special' ? (
                                <Package className="w-6 h-6 text-amber-400 drop-shadow-md" />
                            ) : (
                                <FolderCheck className="w-6 h-6 text-blue-400 drop-shadow-md" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col min-w-0 pr-6">
                            <div className="text-sm text-white/90 leading-snug line-clamp-2 mb-0.5">
                                {notification.message}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                                <ShoppingBag className="w-3 h-3 opacity-70" />
                                {notification.subtext}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
