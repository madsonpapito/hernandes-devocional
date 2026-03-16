'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AchievementModalProps {
  badgeId: string | null;
  onClose: () => void;
}

const BADGE_MAP: Record<string, { title: string; desc: string; icon: any }> = {
  'first-drop': {
    title: 'Primeira Gota',
    desc: 'Você concluiu seu primeiro devocional. Que seja a primeira de muitas gotas de sabedoria!',
    icon: Star
  },
  'streak-7': {
    title: 'Guerreiro da Oração',
    desc: '7 dias seguidos buscando a presença de Deus. Sua constância é inspiradora!',
    icon: Award
  },
  'devotional-10': {
    title: 'Teólogo em Construção',
    desc: '10 meditações concluídas. Aprofundando raízes na Palavra.',
    icon: Star
  }
};

export function AchievementModal({ badgeId, onClose }: AchievementModalProps) {
  const badge = badgeId ? BADGE_MAP[badgeId] : null;

  return (
    <AnimatePresence>
      {badgeId && badge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-spiritual-navy/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="relative w-full max-w-sm glass-card p-10 overflow-hidden border-spiritual-gold/20"
          >
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-spiritual-gold blur-[100px] opacity-20 pointer-events-none" />

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/20 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col items-center text-center relative z-10">
              <motion.div
                initial={{ rotate: -10, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 12 }}
                className="w-24 h-24 premium-gradient rounded-[2.5rem] flex items-center justify-center mb-8 border border-white/20 shadow-[0_0_40px_rgba(212,175,55,0.3)]"
              >
                <badge.icon size={48} className="text-spiritual-gold" />
              </motion.div>

              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-spiritual-gold mb-2">Conquista Desbloqueada</p>
              <h2 className="font-serif text-3xl font-bold mb-4">{badge.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                {badge.desc}
              </p>

              <button
                onClick={onClose}
                className="w-full py-5 premium-gradient rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
              >
                Glória a Deus
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
