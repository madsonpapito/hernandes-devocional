'use client';

import { motion } from 'framer-motion';
import { Play, BookOpen, Clock, Heart, Share2, Search, Flame } from 'lucide-react';
import Link from 'next/link';
import devotionalsData from '@/data/initial-devotionals.json';
import { useUserProgress } from '@/hooks/useUserProgress';

export default function Dashboard() {
  const { streakCount } = useUserProgress();
  const featured = devotionalsData[0];
  const categories = ['Novo Testamento', 'Salmos', 'Liderança', 'Família'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="px-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Bendizer hoje</h2>
          <h1 className="font-serif text-3xl font-bold">Olá, <span className="text-spiritual-gold">Discípulo</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white/5 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2">
            <Flame size={16} className="text-spiritual-gold" fill="#D4AF37" />
            <span className="font-black text-sm text-spiritual-gold">{streakCount}</span>
          </div>
          <button className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 active:scale-90 transition-transform">
            <Search size={20} className="text-white/60" />
          </button>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {/* Daily Hero Card (Glorify Style) */}
        <motion.section variants={itemVariants}>
          <Link href={`/dashboard/devocional/${featured.slug}`}>
            <div className="relative aspect-[4/5.5] rounded-[3.5rem] overflow-hidden group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-white/5">
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-opacity group-hover:opacity-80"></div>
              
              {/* Content Holder (Simulating Immersive Image) */}
              <div className="absolute inset-0 premium-gradient group-hover:scale-105 transition-transform duration-[2s]">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-spiritual-gold"></div>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.9, 1, 0.9] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 rounded-full bg-spiritual-gold/10 backdrop-blur-xl border border-spiritual-gold/30 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                >
                  <div className="w-16 h-16 rounded-full bg-spiritual-gold flex items-center justify-center text-spiritual-navy shadow-xl">
                    <Play fill="currentColor" size={28} className="translate-x-0.5" />
                  </div>
                </motion.div>
              </div>

              <div className="absolute bottom-10 left-10 right-10 z-30">
                <div className="flex items-center gap-2 text-spiritual-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                   <Clock size={12} strokeWidth={3} />
                   <span>8 MIN • JORNADA DIÁRIA</span>
                </div>
                <h3 className="font-serif text-4xl font-bold leading-tight mb-6 drop-shadow-2xl">
                  {featured.title}
                </h3>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-6 py-3 rounded-2xl glass-card text-xs font-bold border-white/20 active:scale-95 transition-transform">
                    <BookOpen size={16} className="text-spiritual-gold" /> LER
                  </div>
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl glass-card border-white/20 active:scale-95 transition-transform">
                    <Heart size={18} className="text-white/60" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.section>

        {/* Horizontal Category Chips */}
        <motion.section variants={itemVariants} className="overflow-x-auto no-scrollbar -mx-6 px-6">
          <div className="flex gap-3 pb-2">
            {categories.map((cat, i) => (
              <button key={i} className={`whitespace-nowrap px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all active:scale-95 ${
                i === 0 ? 'bg-spiritual-gold text-spiritual-navy border-spiritual-gold shadow-lg shadow-spiritual-gold/20' : 'bg-white/5 text-white/30 border-white/5 hover:border-white/10'
              }`}>
                {cat}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Secondary Content Loop */}
        <motion.section variants={itemVariants}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-serif text-2xl font-bold">Mais de Hoje</h2>
            <button className="text-spiritual-gold text-[10px] font-black uppercase tracking-[0.2em]">Ver tudo</button>
          </div>
          
          <div className="space-y-4">
            {devotionalsData.slice(1, 4).map((dev, i) => (
              <Link key={i} href={`/dashboard/devocional/${dev.slug}`}>
                <div className="glass-card p-6 flex items-center gap-6 group hover:bg-white/[0.06] transition-all">
                  <div className="shrink-0 w-16 h-16 rounded-[1.25rem] premium-gradient border border-white/5 flex items-center justify-center text-spiritual-gold group-hover:scale-110 transition-transform">
                    <Play size={24} fill="currentColor" className="opacity-80" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-lg font-bold truncate mb-1">{dev.title}</h4>
                    <div className="flex items-center gap-3 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                      <span>Reflexão</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span>5 MIN</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Quote / Reflection Box */}
        <motion.section variants={itemVariants} className="relative p-12 rounded-[3.5rem] bg-gradient-to-br from-spiritual-navy to-black border border-white/5 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Share2 size={120} />
          </div>
          <div className="relative z-10 text-center">
             <div className="flex justify-center mb-8">
               <div className="w-12 h-1 px-1 bg-spiritual-gold/20 rounded-full flex gap-1">
                 <div className="w-full h-full bg-spiritual-gold rounded-full"></div>
               </div>
             </div>
             <p className="font-serif text-2xl italic leading-relaxed text-white/90 mb-8">
               "A fé não é a ausência de dúvidas, é a presença de Deus no meio delas."
             </p>
             <div className="text-[10px] font-black uppercase tracking-[0.4em] text-spiritual-gold">Hernandes Dias Lopes</div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
