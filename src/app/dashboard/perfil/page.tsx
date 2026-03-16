'use client';

import { motion } from 'framer-motion';
import { Settings, Flame, Star, Award, LogOut, ChevronRight, Bell, Shield, User } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';

const BADGE_DATA = [
  { id: 'first-drop', title: 'Primeira Gota', icon: Star, color: 'text-blue-400' },
  { id: 'streak-7', title: 'Guerreiro', icon: Flame, color: 'text-orange-400' },
  { id: 'devotional-10', title: 'Teólogo', icon: Award, color: 'text-spiritual-gold' },
];

export default function Perfil() {
  const { streakCount, totalBuildHours, badges } = useUserProgress();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="px-6 pb-12">
      <header className="flex justify-between items-center mb-12">
        <h1 className="font-serif text-3xl font-bold">Perfil</h1>
        <button className="w-12 h-12 glass-card flex items-center justify-center active:scale-90 transition-transform">
          <Settings size={22} className="text-white/40" />
        </button>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10"
      >
        {/* User Card */}
        <motion.section variants={itemVariants} className="flex flex-col items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-spiritual-gold blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <div className="w-32 h-32 premium-gradient rounded-[3rem] p-1 mb-6 relative border border-white/10 group-hover:scale-105 transition-transform duration-500">
              <div className="w-full h-full bg-spiritual-navy rounded-[2.8rem] flex items-center justify-center border border-white/5 font-serif text-4xl font-bold text-spiritual-gold">
                D
              </div>
            </div>
            <div className="absolute bottom-5 right-0 w-10 h-10 bg-spiritual-navy border border-white/10 rounded-2xl flex items-center justify-center shadow-xl">
               <Award size={20} className="text-spiritual-gold" />
            </div>
          </div>
          <h2 className="font-serif text-2xl font-bold mb-1">Discípulo</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-black">Assinante Premium</p>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <motion.section variants={itemVariants} className="grid grid-cols-2 gap-4">
          <div className="glass-card p-8 text-center border-white/5">
             <div className="flex justify-center mb-4">
               <div className="w-12 h-12 rounded-2xl bg-spiritual-gold/10 flex items-center justify-center">
                 <Flame size={24} fill="#D4AF37" className="text-spiritual-gold" />
               </div>
             </div>
             <div className="text-3xl font-serif font-bold mb-1">{streakCount}</div>
             <div className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">Dias Seguidos</div>
          </div>
          <div className="glass-card p-8 text-center border-white/5">
             <div className="flex justify-center mb-4 text-spiritual-gold">
               <div className="w-12 h-12 rounded-2xl bg-spiritual-gold/10 flex items-center justify-center">
                 <Star size={24} />
               </div>
             </div>
             <div className="text-3xl font-serif font-bold mb-1">{totalBuildHours.toFixed(1)}</div>
             <div className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black">Horas de Edificação</div>
          </div>
        </motion.section>

        {/* Badges Grid */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/20">Minhas Conquistas</h3>
            <span className="text-[10px] text-spiritual-gold font-bold">{badges.length} / {BADGE_DATA.length}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {BADGE_DATA.map((badge) => {
              const isEarned = badges.includes(badge.id);
              const Icon = badge.icon;
              
              return (
                <div 
                  key={badge.id} 
                  className={`relative glass-card p-6 flex flex-col items-center gap-3 transition-all duration-500 ${
                    isEarned ? 'border-spiritual-gold/30' : 'opacity-40 grayscale'
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${isEarned ? 'bg-spiritual-gold/10 ' + badge.color : 'bg-white/5 text-white/20'}`}>
                    <Icon size={24} fill={isEarned ? "currentColor" : "none"} />
                  </div>
                  <p className="text-[9px] font-bold text-center leading-tight">{badge.title}</p>
                  
                  {isEarned && (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 rounded-full bg-spiritual-gold shadow-[0_0_10px_#D4AF37]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Menu Options */}
        <motion.section variants={itemVariants} className="space-y-3">
          {[
            { icon: <Bell size={20} />, label: "Notificações", sub: "Ativado para 07:00", color: "text-blue-400" },
            { icon: <Shield size={20} />, label: "Dados e Segurança", sub: "Gerenciar conta", color: "text-green-400" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-6 glass-card hover:bg-white/[0.06] transition-all cursor-pointer group">
              <div className="flex items-center gap-5">
                 <div className={`${item.color} bg-white/5 p-3 rounded-2xl group-hover:bg-white/10 transition-colors`}>
                   {item.icon}
                 </div>
                 <div>
                   <p className="text-sm font-bold tracking-tight">{item.label}</p>
                   <p className="text-[10px] text-white/30 font-medium">{item.sub}</p>
                 </div>
              </div>
              <ChevronRight size={18} className="text-white/20 group-hover:text-white transition-colors" />
            </div>
          ))}
        </motion.section>

        {/* Logout Button */}
        <motion.section variants={itemVariants}>
          <button className="w-full flex items-center justify-center gap-3 p-6 glass-card border-red-500/10 text-red-500 hover:bg-red-500/5 transition-all group active:scale-95">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Encerrar Sessão</span>
          </button>
        </motion.section>
      </motion.div>
    </div>
  );
}
