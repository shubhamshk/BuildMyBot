
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
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-64 rounded-xl glass border border-border shadow-2xl overflow-hidden z-50"
                    >
                        {/* User Info Header */}
                        <div className="p-4 border-b border-border bg-gradient-to-br from-violet-500/10 to-blue-500/10">
                            <div className="flex items-center gap-3">
                                {avatarUrl ? (
                                    <img
                                        src={avatarUrl}
                                        alt="Profile"
                                        className="w-12 h-12 rounded-full ring-2 ring-white/10 object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center">
                                        <UserIcon className="w-6 h-6 text-white" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-foreground truncate">
                                        {user?.user_metadata?.full_name || user?.user_metadata?.name || "User"}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                            <Link
                                href="/profile"
                                onClick={() => setShowDropdown(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-foreground"
                            >
                                <UserIcon className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">My Profile</span>
                            </Link>
                            <Link
                                href="/profile"
                                onClick={() => setShowDropdown(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-foreground"
                            >
                                <Settings className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">My Characters</span>
                            </Link>
                            <Link
                                href="/pricing"
                                onClick={() => setShowDropdown(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors text-foreground"
                            >
                                <Zap className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Subscription</span>
                            </Link>
                            <div className="h-px bg-border my-2" />
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 transition-colors text-red-400 w-full"
                            >
                                <LogOut className="w-4 h-4" />
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
