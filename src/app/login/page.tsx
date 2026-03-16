'use client';

import { ChevronLeft, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-spiritual-navy text-white flex flex-col p-6 selection:bg-spiritual-gold/30 relative overflow-hidden">
      {/* Premium Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-spiritual-gold/10 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-spiritual-gold/5 blur-[100px] rounded-full -z-10" />

      <header className="py-6">
        <Link href="/" className="w-12 h-12 glass-card flex items-center justify-center active:scale-90 transition-transform">
          <ChevronLeft size={24} />
        </Link>
      </header>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full pb-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <div className="font-serif text-5xl font-bold text-spiritual-gold mb-3 text-glow-gold">HDL</div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Ecossistema Devocional</p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          onSubmit={handleLogin} 
          className="space-y-5"
        >
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-2xl text-[10px] font-black tracking-widest uppercase text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="relative group">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-spiritual-gold transition-colors" size={20} />
            <input 
              type="email" 
              placeholder="E-mail de acesso"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-[2rem] py-5 pl-14 pr-6 focus:border-spiritual-gold/30 outline-none transition-all placeholder:text-white/10 text-sm font-medium"
              required
              disabled={loading}
            />
          </div>
          
          <div className="relative group">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-spiritual-gold transition-colors" size={20} />
            <input 
              type="password" 
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-[2rem] py-5 pl-14 pr-6 focus:border-spiritual-gold/30 outline-none transition-all placeholder:text-white/10 text-sm font-medium"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full gold-gradient text-spiritual-navy py-5 rounded-[2rem] flex items-center justify-center gap-3 group shadow-[0_15px_35px_rgba(212,175,55,0.2)] active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all font-black text-xs tracking-widest uppercase"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                ENTRAR NO APP
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </>
            )}
          </button>
        </motion.form>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center space-y-6"
        >
          <button className="text-[10px] text-white/20 hover:text-spiritual-gold transition-colors uppercase tracking-[0.2em] font-black">Esqueceu sua senha?</button>
          <div className="h-px w-12 bg-white/10 mx-auto" />
          <p className="text-xs text-white/40 leading-relaxed font-light">
            Ainda não tem acesso? <br />
            <Link href="/" className="text-spiritual-gold font-black hover:text-white transition-colors">Ver Planos de Assinatura</Link>
          </p>
        </motion.div>
      </div>

      <footer className="py-8 text-center mt-auto">
        <p className="text-[8px] text-white/10 uppercase tracking-[0.4em] font-black">Powered by Synkra AIOS • Supabase Integration</p>
      </footer>
    </div>
  );
}
