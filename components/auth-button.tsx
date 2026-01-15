
'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState, useRef } from 'react'
import { User } from '@supabase/supabase-js'
import { User as UserIcon, LogOut, Settings, ChevronDown, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function AuthButton() {
    const [user, setUser] = useState<User | null>(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const supabase = createClient()

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        setUser(null)
        setShowDropdown(false)
    }

    // Get avatar URL from user metadata (Google auth provides this)
    const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture

    return user ? (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-violet-500/50 transition-all"
            >
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Profile"
                        className="w-9 h-9 rounded-full ring-2 ring-border object-cover"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center ring-2 ring-border">
                        <UserIcon className="w-5 h-5 text-white" />
                    </div>
                )}
            </button>

            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-3 w-72 rounded-2xl bg-[#0a0a0f]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 origin-top-right"
                    >
                        {/* User Info Header */}
                        <div className="p-5 border-b border-white/5 bg-gradient-to-br from-violet-500/15 via-transparent to-blue-500/15">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt="Profile"
                                            className="w-12 h-12 rounded-full ring-2 ring-violet-500/30 object-cover shadow-lg"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center shadow-lg">
                                            <UserIcon className="w-6 h-6 text-white" />
                                        </div>
                                    )}
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-[#0a0a0f] rounded-full shadow-lg" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-white text-base truncate leading-tight">
                                        {user?.user_metadata?.full_name || user?.user_metadata?.name || "User"}
                                    </p>
                                    <p className="text-xs text-zinc-400 truncate mt-1">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2 space-y-1">
                            <Link
                                href="/profile"
                                onClick={() => setShowDropdown(false)}
                                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 text-zinc-300 hover:text-white"
                            >
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:text-violet-400 transition-colors">
                                    <UserIcon className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">My Profile</span>
                            </Link>
                            <Link
                                href="/characters"
                                onClick={() => setShowDropdown(false)}
                                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 text-zinc-300 hover:text-white"
                            >
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                                    <Settings className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">My Characters</span>
                            </Link>
                            <Link
                                href="/pricing"
                                onClick={() => setShowDropdown(false)}
                                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 text-zinc-300 hover:text-white"
                            >
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-amber-500/20 group-hover:text-amber-400 transition-colors">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">Subscription</span>
                            </Link>

                            <div className="h-px bg-white/5 my-2 mx-2" />

                            <button
                                onClick={handleSignOut}
                                className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-500/10 transition-all duration-200 text-zinc-400 hover:text-red-400 w-full text-left"
                            >
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                                    <LogOut className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium">Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    ) : (
        <Link
            href="/auth/signin"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
            Sign In
        </Link>
    )
}
