import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthButton } from "@/components/auth-button";
import { APIKeyIndicator } from "@/components/api-key-indicator";
import { Sparkles } from "lucide-react";

export function ResponsiveNavbar({ scrolled }: { scrolled: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ${
        scrolled ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">Characteria</span>
        </div>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <ThemeToggle />
          <APIKeyIndicator />
          <AuthButton />
          <Link
            href="/idea"
            className="px-4 py-2 rounded-lg glass hover:bg-white/5 transition-colors text-sm font-medium"
          >
            Start Creating
          </Link>
        </div>
        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg glass border border-border"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-foreground"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2 bg-background/95 rounded-xl p-4 shadow-lg border border-border">
          <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            How It Works
          </Link>
          <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setMenuOpen(false)}>
            Pricing
          </Link>
          <ThemeToggle />
          <APIKeyIndicator />
          <AuthButton />
          <Link
            href="/idea"
            className="px-4 py-2 rounded-lg glass hover:bg-white/5 transition-colors text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Start Creating
          </Link>
        </div>
      )}
    </nav>
  );
}
