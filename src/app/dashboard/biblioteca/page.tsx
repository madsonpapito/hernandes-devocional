'use client';

import { motion } from 'framer-motion';
import { Search, BookOpen, Play, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import jornadasData from '@/data/jornadas.json';

export default function Biblioteca() {
  // Convertendo os dados do JSON para o formato esperado pela UI
  const jornadas = jornadasData.map(j => ({
    id: j.id,
    title: j.title,
    desc: j.subtitle,
    progress: 0, // No futuro isso virá do useUserProgress
    total: j.totalDays,
    image: j.imageColor || 'bg-spiritual-gold/20',
    badge: j.badgeId.toUpperCase()
  }));

  const series = [
    { title: "Exposição em Romanos", desc: "A Justiça de Deus", count: 42, color: "from-blue-500/20" },
    { title: "Sermão do Monte", desc: "O Caráter do Reino", count: 12, color: "from-green-500/20" },
    { title: "Os Salmos de Davi", desc: "Orações da Alma", count: 150, color: "from-purple-500/20" },
    { title: "Parábolas", desc: "Verdades Ocultas", count: 24, color: "from-amber-500/20" },
  ];

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
    <div className="px-6 pb-24">
      <header className="mb-10 pt-4">
        <h2 className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Explorar</h2>
        <h1 className="font-serif text-3xl font-bold mb-8">Biblioteca</h1>
        
        {/* Premium Search Bar */}
        <div className="relative group mb-8">
          <div className="absolute inset-0 bg-spiritual-gold/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity -z-10" />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-spiritual-gold transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="O que você quer ouvir hoje?"
            className="w-full bg-white/5 border border-white/5 rounded-[2rem] py-5 pl-14 pr-6 focus:border-spiritual-gold/30 gold-outline outline-none transition-all text-sm font-medium"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6">
          {['Todos', 'Novo Testamento', 'Sermões', 'Tópicos'].map((filter, i) => (
            <button key={i} className={`whitespace-nowrap px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
              i === 0 ? 'bg-white text-spiritual-navy border-white' : 'bg-white/5 border-white/5 text-white/40'
            }`}>
              {filter}
            </button>
          ))}
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-14"
      >
        {/* Jornadas em Destaque */}
        <section>
          <div className="flex justify-between items-end mb-6 text-sm">
            <h2 className="font-serif text-2xl font-bold">Jornadas</h2>
            <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-spiritual-gold">Ver Todas</Link>
          </div>
          <div className="space-y-4">
            {jornadas.map((jornada) => (
              <Link key={jornada.id} href={`/dashboard/jornada/${jornada.id}`}>
                <motion.div 
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                  className="relative glass-card overflow-hidden p-6 flex flex-col gap-6 cursor-pointer group mb-4"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${jornada.image} blur-3xl opacity-30 -z-10`} />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-1 group-hover:text-spiritual-gold transition-colors">{jornada.title}</h3>
                      <p className="text-[10px] text-white/40 uppercase font-black tracking-widest">{jornada.desc}</p>
                    </div>
                    <div className="bg-spiritual-gold/10 px-3 py-1 rounded-lg border border-spiritual-gold/20">
                      <span className="text-[9px] font-black text-spiritual-gold uppercase">{jornada.badge}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                      <span className="text-white/30">Progresso</span>
                      <span className="text-spiritual-gold">{jornada.progress} / {jornada.total} Dias</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(jornada.progress/jornada.total) * 100}%` }}
                        className="h-full premium-gradient"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Grid de Séries */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <h2 className="font-serif text-2xl font-bold">Coleções</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {series.map((item, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="glass-card overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className={`aspect-[4/3] bg-gradient-to-br ${item.color} to-transparent relative flex items-center justify-center p-6 transition-transform group-hover:scale-105`}>
                  <BookOpen size={40} className="text-white/10 group-hover:text-spiritual-gold/20 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                    <div className="bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                      <span className="text-[9px] font-black uppercase tracking-tighter text-spiritual-gold">{item.count} Capítulos</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base font-bold mb-1 leading-snug group-hover:text-spiritual-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Topics List */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl font-bold mb-6">Tópicos</h2>
          <div className="space-y-3">
            {['Vencendo a Ansiedade', 'O Desafio da Oração', 'Liderança Cristã', 'Herança Reformada'].map((topico, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="flex justify-between items-center p-6 glass-card hover:bg-white/[0.06] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-xl bg-spiritual-gold/10 flex items-center justify-center text-spiritual-gold group-hover:bg-spiritual-gold group-hover:text-spiritual-navy transition-colors">
                    <Play size={18} fill="currentColor" />
                  </div>
                  <span className="text-sm font-bold tracking-tight">{topico}</span>
                </div>
                <ChevronRight size={18} className="text-white/20 group-hover:text-spiritual-gold transition-colors" />
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </div>
  );
}
