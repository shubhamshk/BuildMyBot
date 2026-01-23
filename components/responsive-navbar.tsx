import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButton } from "@/components/auth-button";
import { APIKeyIndicator } from "@/components/api-key-indicator";
import { Sparkles } from "lucide-react";

export function ResponsiveNavbar({ scrolled }: { scrolled: boolean }) {
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400/30 to-fuchsia-400/20 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-blue-500 dark:text-fuchsia-400 drop-shadow-[0_2px_8px_rgba(80,0,120,0.12)]" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white drop-shadow-sm select-none">Characteria</span>
        </Link>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="#how-it-works" className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition-colors">
            How It Works
          </Link>
          <Link href="#features" className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60 transition-colors">
            Pricing
          </Link>
          <Link
            href="/packs"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/packs')
              ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/10"
              : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60"
              }`}
          >
            Packs
          </Link>
          <Link
            href="/vault"
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/vault')
              ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10"
              : "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/60"
              }`}
          >
            Vault
          </Link>
          <ThemeToggle />
          <APIKeyIndicator />
          <AuthButton />
          <Link
            href="/create-choice"
            className="ml-2 px-5 py-2 rounded-lg font-semibold shadow transition-all text-sm text-white bg-gradient-to-r from-blue-600 via-sky-400 to-fuchsia-500 hover:from-blue-700 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            style={{ boxShadow: '0 2px 8px 0 rgba(37,99,235,0.10)' }}
          >
            Start Creating
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
          <Link href="#how-it-works" className="px-3 py-2 rounded-lg text-base font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 transition-colors" onClick={() => setMenuOpen(false)}>
            How It Works
          </Link>
          <Link href="#features" className="px-3 py-2 rounded-lg text-base font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 transition-colors" onClick={() => setMenuOpen(false)}>
            Features
          </Link>
          <Link href="/pricing" className="px-3 py-2 rounded-lg text-base font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60 transition-colors" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <Link
            href="/packs"
            className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${isActive('/packs')
              ? "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/10"
              : "text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60"
              }`}
            onClick={() => setMenuOpen(false)}
          >
            Packs
          </Link>
          <Link
            href="/vault"
            className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${isActive('/vault')
              ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/10"
              : "text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/60"
              }`}
            onClick={() => setMenuOpen(false)}
          >
            Vault
          </Link>
          <ThemeToggle />
          <Link
            href="/api-keys"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-blue-500 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-800/60 transition-colors"
            style={{ marginTop: 4 }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="material-symbols-outlined text-lg"></span>
            Add API Key
          </Link>
          <AuthButton />
          <Link
            href="/create-choice"
            className="mt-2 px-5 py-2 rounded-lg font-semibold shadow text-base text-white bg-gradient-to-r from-blue-600 via-sky-400 to-fuchsia-500 hover:from-blue-700 hover:to-fuchsia-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            style={{ boxShadow: '0 2px 8px 0 rgba(37,99,235,0.10)' }}
            onClick={() => setMenuOpen(false)}
          >
            Start Creating
          </Link>
        </div>
      )}
    </nav>
  );
}
