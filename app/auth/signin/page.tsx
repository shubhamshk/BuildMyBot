'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'

type Provider = 'google' | 'discord' | null

export default function SignIn() {
    const [loadingProvider, setLoadingProvider] = useState<Provider>(null)
    const supabase = createClient()

    const handleOAuthLogin = async (provider: 'google' | 'discord') => {
        setLoadingProvider(provider)
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${location.origin}/auth/callback`,
                ...(provider === 'google' && {
                    queryParams: { access_type: 'offline', prompt: 'consent' },
                }),
            },
        })
        if (error) {
            alert(error.message)
            setLoadingProvider(null)
        }
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#030308] overflow-hidden perspective-[1000px]">
            {/* Animated floating background orbs */}
            <motion.div
                animate={{
                    y: [0, -30, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[130px] -top-32 -left-32 pointer-events-none"
            />
            <motion.div
                animate={{
                    y: [0, 40, 0],
                    x: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute w-[400px] h-[400px] rounded-full bg-blue-600/20 blur-[110px] -bottom-24 -right-24 pointer-events-none"
            />
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    x: [0, -40, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute w-[300px] h-[300px] rounded-full bg-fuchsia-600/15 blur-[100px] top-1/2 left-2/3 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            />

            {/* Main Floating Card Wrapper */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-sm mx-4"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Floating animation for the card itself */}
                <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative rounded-[2rem] p-8 overflow-hidden backdrop-blur-3xl"
                    style={{
                        background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                    }}
                >
                    {/* Glass reflections */}
                    <div className="absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                    <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white/5 blur-[50px] rounded-full pointer-events-none mix-blend-overlay" />

                    {/* Header */}
                    <div className="mb-8 text-center relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
                            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/5 border border-white/10 shadow-xl mb-5 backdrop-blur-sm"
                            style={{
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 30px -5px rgba(0,0,0,0.5)'
                            }}
                        >
                            <Sparkles className="w-6 h-6 text-white" />
                        </motion.div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-zinc-400 mt-2">Sign in to continue</p>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-4 relative z-10">
                        {/* Google */}
                        <motion.button
                            whileHover={{ scale: loadingProvider ? 1 : 1.02, y: -2 }}
                            whileTap={{ scale: loadingProvider ? 1 : 0.98 }}
                            onClick={() => handleOAuthLogin('google')}
                            disabled={loadingProvider !== null}
                            className="group relative w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-white/10 overflow-hidden"
                            style={{
                                background: 'rgba(255,255,255,0.95)',
                                color: '#000',
                            }}
                        >
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            <AnimatePresence mode="wait">
                                {loadingProvider === 'google' ? (
                                    <motion.div
                                        key="spin"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-800 rounded-full animate-spin relative z-10"
                                    />
                                ) : (
                                    <motion.div key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 w-full relative z-10">
                                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                        </svg>
                                        <span>Continue with Google</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Discord */}
                        <motion.button
                            whileHover={{ scale: loadingProvider ? 1 : 1.02, y: -2 }}
                            whileTap={{ scale: loadingProvider ? 1 : 0.98 }}
                            onClick={() => handleOAuthLogin('discord')}
                            disabled={loadingProvider !== null}
                            className="group relative w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:cursor-not-allowed shadow-lg hover:shadow-indigo-500/30 overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
                                color: '#fff',
                            }}
                        >
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <AnimatePresence mode="wait">
                                {loadingProvider === 'discord' ? (
                                    <motion.div
                                        key="spin"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin relative z-10"
                                    />
                                ) : (
                                    <motion.div key="label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3 w-full relative z-10">
                                        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                        </svg>
                                        <span>Continue with Discord</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-zinc-500 mt-8 relative z-10">
                        By continuing, you agree to our{' '}
                        <span className="text-zinc-300 hover:text-white cursor-pointer transition-colors border-b border-white/10 hover:border-white/30 pb-px">Terms</span>
                        {' '}and{' '}
                        <span className="text-zinc-300 hover:text-white cursor-pointer transition-colors border-b border-white/10 hover:border-white/30 pb-px">Privacy</span>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    )
}
