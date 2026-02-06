import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButton } from "@/components/auth-button";
import { APIKeyIndicator } from "@/components/api-key-indicator";
import { Sparkles, ShoppingBag, LayoutGrid, GraduationCap, Crown, Zap, Mic } from "lucide-react";

export function ResponsiveNavbar({ scrolled = false }: { scrolled?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-3 px-6 transition-all duration-300 backdrop-blur-xl ${scrolled
        ? "bg-white/70 dark:bg-neutral-900/80 border-b border-border shadow-lg"
        : "bg-white/40 dark:bg-neutral-900/60"
        }`}
      style={{
        boxShadow: scrolled
          ? '0 4px 24px 0 rgba(0,0,0,0.08)' : '0 2px 8px 0 rgba(0,0,0,0.04)',
        WebkitBackdropFilter: 'blur(16px)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/30 to-violet-600/20 flex items-center justify-center shadow-md border border-amber-500/20">
            <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.2)]" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white drop-shadow-sm select-none">Characteria</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/#family-packs"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/#family-packs')
              ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/10"
              : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60"
              }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Family Packs
          </Link>

          <Link
            href="/courses"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/courses')
              ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10"
              : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60"
              }`}
          >
            <GraduationCap className="w-4 h-4" />
            Bot Creation
          </Link>
          <Link
            href="/voice"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/voice')
              ? "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/10"
              : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60"
              }`}
          >
            <Mic className="w-4 h-4 text-rose-500" />
            Janitor Voice
          </Link>

          <Link
            href="/#custom-requests"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/#custom-requests')
              ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10"
              : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60"
              }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            Custom Requests
          </Link>

          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-2" />

          <ThemeToggle />
          <AuthButton />

          <Link
            href="/pricing"
            className="ml-2 px-5 py-2 rounded-lg font-semibold shadow transition-all text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-400 flex items-center gap-2"
            style={{ boxShadow: '0 2px 12px 0 rgba(245,158,11,0.2)' }}
          >
            <Crown className="w-4 h-4" />
            Subscribe
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-xl bg-white/70 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 shadow"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-neutral-900 dark:text-white"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 bg-white/95 dark:bg-neutral-900/95 rounded-2xl p-5 shadow-2xl border border-neutral-200 dark:border-neutral-700">
          <Link
            href="/#family-packs"
            className="px-3 py-2 rounded-lg text-base font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 transition-colors flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingBag className="w-4 h-4" />
            Family Packs
          </Link>

          <Link
            href="/courses"
            className="px-3 py-2 rounded-lg text-base font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 transition-colors flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <GraduationCap className="w-4 h-4" />
            Courses
          </Link>
          <Link
            href="/voice"
            className="px-3 py-2 rounded-lg text-base font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 transition-colors flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Mic className="w-4 h-4 text-rose-500" />
            Janitor Voice
          </Link>
          <Link
            href="/#custom-requests"
            className="px-3 py-2 rounded-lg text-base font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 transition-colors flex items-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            Custom Requests
          </Link>

          <div className="h-px w-full bg-neutral-200 dark:bg-neutral-800 my-1" />

          <div className="flex items-center justify-between px-3">
            <span className="text-sm font-medium text-neutral-500">Theme</span>
            <ThemeToggle />
          </div>

          <AuthButton />

          <Link
            href="/pricing"
            className="mt-2 px-5 py-2 rounded-lg font-semibold shadow text-base text-white bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all flex items-center justify-center gap-2"
            style={{ boxShadow: '0 2px 12px 0 rgba(245,158,11,0.2)' }}
            onClick={() => setMenuOpen(false)}
          >
            <Crown className="w-4 h-4" />
            Subscribe
          </Link>
        </div>
      )}
    </nav>
  );
}
