'use client';

import { Home, BookOpen, User, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserProgress } from '@/hooks/useUserProgress';
import { AchievementModal } from '@/components/AchievementModal';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { newBadge, clearNewBadge } = useUserProgress();

  const navItems = [
    { icon: Home, label: 'Início', path: '/dashboard' },
    { icon: BookOpen, label: 'Jornada', path: '/dashboard/biblioteca' },
    { icon: PlayCircle, label: 'Áudio', path: '/dashboard/audio' },
    { icon: User, label: 'Perfil', path: '/dashboard/perfil' },
  ];

  return (
    <div className="min-h-screen bg-spiritual-navy text-white selection:bg-spiritual-gold/30">
      <AchievementModal badgeId={newBadge} onClose={clearNewBadge} />
      <div className="max-w-md mx-auto min-h-screen relative">
        <main className="pb-32 pt-4">
          {children}
        </main>
        
        {/* Safe Area padding for bottom nav */}
        <div className="h-24" />
      </div>
      
      {/* Premium Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
        <div className="max-w-md mx-auto glass-panel rounded-[2.5rem] px-8 py-3 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex justify-between items-center border border-white/5">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className="relative flex flex-col items-center gap-1 group py-1"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`relative p-2 rounded-2xl transition-all duration-300 ${
                    isActive ? 'text-spiritual-gold' : 'text-white/30 group-hover:text-white/60'
                  }`}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  
                  {isActive && (
                    <motion.div 
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-spiritual-gold/15 rounded-2xl blur-md -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
                <span className={`text-[9px] uppercase tracking-[0.2em] font-black transition-colors ${
                  isActive ? 'text-spiritual-gold' : 'text-white/20'
                }`}>
                  {item.label}
                </span>
                
                {isActive && (
                  <motion.div 
                    layoutId="nav-dot"
                    className="absolute -bottom-1 w-1 h-1 bg-spiritual-gold rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
