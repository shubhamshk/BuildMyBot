
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNav = true }) => {
  const { theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setIsMenuOpen(false), [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark selection:bg-primary selection:text-white">
      {showNav && (
        <nav 
          className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
            scrolled ? 'py-3 glass shadow-lg' : 'py-5 bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.02 }}
            >
              <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform group-hover:rotate-12">
                <span className="material-symbols-outlined text-2xl">magic_button</span>
              </div>
              <h2 className="text-xl font-black tracking-tighter uppercase dark:text-white hidden sm:block">AniSoul</h2>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink label="Home" active={location.pathname === '/'} onClick={() => navigate('/')} />
              <NavLink label="Gallery" active={false} onClick={() => {}} />
              <NavLink label="About" active={false} onClick={() => {}} />
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="size-10 rounded-full flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-400"
                aria-label="Toggle Theme"
              >
                <span className="material-symbols-outlined">
                  {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
              </button>
              
              <button 
                onClick={() => navigate('/wizard/basics')}
                className="hidden sm:flex bg-primary hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 transition-all items-center gap-2"
              >
                <span>Forge Soul</span>
                <span className="material-symbols-outlined text-sm">bolt</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden size-10 flex flex-col items-center justify-center gap-1.5"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                <motion.span 
                  animate={isMenuOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-slate-900 dark:bg-white block"
                />
                <motion.span 
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-slate-900 dark:bg-white block"
                />
                <motion.span 
                  animate={isMenuOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-slate-900 dark:bg-white block"
                />
              </button>
            </div>
          </div>

          {/* Mobile Nav Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden absolute top-full left-0 right-0 glass shadow-2xl p-6 flex flex-col gap-4 border-t border-white/5"
              >
                <MobileNavLink label="Home" onClick={() => navigate('/')} />
                <MobileNavLink label="Gallery" onClick={() => {}} />
                <MobileNavLink label="About" onClick={() => {}} />
                <button 
                  onClick={() => navigate('/wizard/basics')}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/30"
                >
                  Start Forging
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-1 w-full"
      >
        <div className="pt-24 md:pt-32 min-h-screen">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

const NavLink = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`text-sm font-bold tracking-tight transition-colors hover:text-primary ${
      active ? 'text-primary' : 'text-slate-500 dark:text-slate-400'
    }`}
  >
    {label}
  </button>
);

const MobileNavLink = ({ label, onClick }: { label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="text-2xl font-black uppercase tracking-tighter text-left py-2 hover:text-primary transition-colors"
  >
    {label}
  </button>
);

export default Layout;
