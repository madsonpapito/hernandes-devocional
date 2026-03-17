import { Play, BookOpen, ShieldCheck, Star } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="font-serif text-2xl font-bold text-spiritual-gold">HDL <span className="text-white">DEVOCIONAL</span></div>
        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors text-sm font-semibold">
          ENTRAR
        </button>
      </nav>

      {/* Experience the App (Mockup Section) - Now 1st Section */}
      <section className="py-16 pb-24 px-6 bg-black/20 overflow-hidden border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 text-center md:text-left">
             <div className="inline-block bg-spiritual-gold/10 text-spiritual-gold px-4 py-1 rounded-full text-[10px] font-black tracking-widest mb-6 uppercase">
              O Teu Devocional, Onde Você Estiver
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-8 leading-tight">
              A Palavra de Deus <span className="text-spiritual-gold">na palma da sua mão</span>
            </h2>
            <p className="text-lg text-white/60 mb-10 leading-relaxed">
              O ecossistema HDL Devocional foi projetado para ser intuitivo, rápido e profundo. Com uma interface minimalista que remove as distrações e foca no que importa: a sua comunhão com o Senhor.
            </p>
            <ul className="space-y-4 mb-10 text-left">
              {["Acesso offline para meditação em qualquer lugar", "Progresso sincronizado entre dispositivos", "Interface dark mode para leitura confortável"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-2 h-2 rounded-full bg-spiritual-gold"></div>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <a href="#pricing" className="btn-gold text-lg uppercase tracking-wider w-full md:w-auto px-12 py-6 text-center">
                Quero sentir a palavra queimar no meu coração
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
             <div className="relative w-full max-w-[400px]">
                <div className="absolute inset-0 bg-spiritual-gold/20 blur-[120px] rounded-full -z-10"></div>
                <img 
                  src="/members_area_mobile_mockup.png" 
                  alt="HDL Devocional Mobile Mockup" 
                  className="w-full h-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.8)]"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Pain Section (TSL Style) - Now 2nd Section */}
      <section className="px-6 py-24 text-center max-w-4xl mx-auto border-b border-white/5">
        <div className="inline-block bg-spiritual-gold/10 text-spiritual-gold px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] mb-8 uppercase">
          Acesso Exclusivo à Profundidade Bíblica
        </div>
        <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-8">
          Você sente que sua vida espiritual <span className="text-spiritual-gold italic">tem esfriado?</span>
        </h2>
        
        <div className="space-y-8 text-center max-w-3xl mx-auto leading-relaxed font-light">
          <p className="text-xl md:text-2xl font-bold text-white">
            Você anda sem tempo de fazer suas leituras diárias?
          </p>
          
          <div className="p-6 bg-spiritual-gold/5 border border-spiritual-gold/20 rounded-2xl">
            <p className="text-lg text-white/80">
              Com o devocional HDL você vai ter reflexões diárias e meditação na palavra, gastando apenas poucos minutos do seu dia, enquanto você faz suas tarefas.
            </p>
          </div>
          
          <p className="text-white/60">
            Chega de fé superficial. O Método Expositivo do Reverendo Hernandes Dias Lopes agora está organizado para que você possa mergulhar nas profundezas da Palavra todos os dias, sem comprometer sua rotina.
          </p>
        </div>

        <div className="mt-16">
          <a href="#pricing" className="inline-block bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full transition-all uppercase tracking-widest text-xs font-bold border border-white/10">
            Quero Iniciar Minha Jornada Profunda
          </a>
        </div>
      </section>


      {/* Modules / Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">O Que Você Vai Encontrar</h2>
          <p className="text-white/60 max-w-2xl mx-auto">Uma experiência completa de crescimento espiritual, organizada por quem dedica a vida ao estudo da Palavra.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Jornada do Novo Testamento", desc: "Comentários verso a verso de Mateus a Apocalipse.", icon: <BookOpen /> },
            { title: "Biblioteca de Sermões", desc: "Milhares de horas de pregação expositiva em áudio e texto.", icon: <Play /> },
            { title: "Devocionais em Áudio", desc: "Perfeito para ouvir no carro ou enquanto faz suas tarefas.", icon: <Play /> },
            { title: "Comunidade HDL", desc: "Espaço para pedidos de oração e compartilhamento de aprendizado.", icon: <Star /> }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-spiritual-gold/50 transition-colors">
              <div className="text-spiritual-gold mb-4">{item.icon}</div>
              <h3 className="font-serif text-2xl mb-2">{item.title}</h3>
              <p className="text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About the Author */}
      <section className="bg-spiritual-gold/5 py-24 px-6 border-y border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 aspect-[3/4] bg-white/10 rounded-2xl overflow-hidden relative group">
             <img 
               src="/hernandes-speaking.jpg" 
               alt="Hernandes Dias Lopes" 
               className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
             />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">Conheça o Seu <span className="text-spiritual-gold">Guia Teológico</span></h2>
            <p className="text-lg text-white/70 mb-6 italic">
              "Meu objetivo é que você não apenas leia a Bíblia, mas que a Palavra de Deus habite ricamente em você."
            </p>
            <p className="text-white/60 mb-8">
              Reverendo Hernandes Dias Lopes é pastor, conferencista e autor de mais de 150 livros. Conhecido como o "Príncipe dos Pregadores", sua voz tem guiado milhões de pessoas a uma compreensão mais profunda das Escrituras através da pregação expositiva.
            </p>
            <div className="flex gap-8 border-t border-white/10 pt-8">
              <div>
                <div className="text-2xl font-bold font-serif text-spiritual-gold">+150</div>
                <div className="text-xs uppercase tracking-widest text-white/40">Livros Publicados</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-serif text-spiritual-gold">+40 Anos</div>
                <div className="text-xs uppercase tracking-widest text-white/40">De Ministério</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section id="pricing" className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl mb-6 italic">Comece Hoje sua Jornada</h2>
        <p className="text-white/60 mb-12">Escolha o plano que melhor se adapta ao seu momento.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10 flex flex-col items-center">
            <h3 className="uppercase tracking-widest text-sm text-white/40 mb-4">Mensal</h3>
            <div className="text-4xl font-serif font-bold mb-4">R$ 19,90</div>
            <p className="text-xs text-white/40 mb-8 italic">Ideal para experimentar</p>
            <a href="https://pay.kiwify.com.br/JqHaE4N" className="w-full py-4 border border-white/20 rounded-lg hover:bg-white/10 transition-colors uppercase tracking-widest text-sm font-bold block text-center">
              Assinar Agora
            </a>
          </div>
          <div className="p-8 bg-spiritual-navy rounded-2xl border-2 border-spiritual-gold flex flex-col items-center relative overflow-hidden">
            <div className="absolute top-4 right-[-35px] bg-spiritual-gold text-spiritual-navy text-[10px] font-bold py-1 px-10 rotate-45">POPULAR</div>
            <h3 className="uppercase tracking-widest text-sm text-spiritual-gold mb-4">Anual</h3>
            <div className="text-4xl font-serif font-bold mb-4">R$ 147,00</div>
            <p className="text-xs text-white/40 mb-8 italic">Menos de R$ 0,40 por dia</p>
            <a href="https://pay.kiwify.com.br/JqHaE4N" className="w-full btn-gold py-4 rounded-lg uppercase tracking-widest text-sm font-bold block text-center">
              Garantir Desconto
            </a>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-white/40 text-sm">
            <ShieldCheck size={16} />
            7 Dias de Garantia Incondicional
          </div>
          <div className="text-white/20 text-[10px] uppercase tracking-[0.2em]">Pagamento Seguro via Kiwify</div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 italic text-spiritual-gold">Perguntas Frequentes</h2>
          <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Tire suas dúvidas antes de começar</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "O App é compatível com meu celular?",
              a: "Sim! O App HDL Devocional é um PWA (Progressive Web App), o que significa que ele funciona perfeitamente em qualquer smartphone (iOS ou Android) sem ocupar espaço excessivo na memória. Você receberá as instruções de instalação logo após a assinatura."
            },
            {
              q: "Como recebo o acesso após o pagamento?",
              a: "O acesso é imediato. Assim que sua assinatura for confirmada pela Kiwify, você receberá um e-mail com seus dados de login e o link exclusivo para acessar o ecossistema devocional."
            },
            {
              q: "O conteúdo é atualizado diariamente?",
              a: "Sim. Todos os dias você terá um novo comentário expositivo e uma nova jornada guiada pelo Reverendo Hernandes Dias Lopes, seguindo um cronograma bíblico estruturado."
            },
            {
              q: "Posso cancelar minha assinatura quando quiser?",
              a: "Com certeza. No plano mensal, você pode cancelar a qualquer momento sem fidelidade. No plano anual, você garante o desconto máximo e tem acesso por 12 meses."
            },
            {
              q: "O aplicativo oferece garantia?",
              a: "Sim, oferecemos 7 dias de garantia incondicional. Se você sentir que o conteúdo não está ajudando sua jornada espiritual, devolvemos 100% do seu investimento sem perguntas."
            },
            {
              q: "Os áudios são narrações reais do Hernandes Dias Lopes?",
              a: "Sim. O projeto foca na autoridade e voz real do Reverendo, trazendo a experiência das suas pregações e estudos para dentro do seu tempo devocional."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-spiritual-gold/30 transition-colors">
              <h4 className="font-serif text-xl mb-4 text-spiritual-gold flex items-center gap-3">
                <span className="opacity-30">0{i+1}.</span> {faq.q}
              </h4>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-white/40 mb-8">Ainda tem alguma dúvida específica?</p>
          <button className="border border-white/20 px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-white/10 transition-colors">
            Falar com o Suporte no WhatsApp
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/20 py-16 px-6 text-center border-t border-white/10">
        <p className="text-white/20 text-xs tracking-widest uppercase">
          © 2026 Hernandes Dias Lopes - Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
