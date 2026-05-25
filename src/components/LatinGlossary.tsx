import React, { useState } from "react";
import { 
  BookOpen, 
  X, 
  Sparkles, 
  Search, 
  Check, 
  Copy, 
  HelpCircle,
  Cpu,
  Bookmark
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LatinTerm {
  expression: string;
  translation: string;
  meaning: string;
  algorithmicJustice: string;
  category: "Contraditório" | "Indícios" | "Procedimental" | "Herança";
}

const LATIN_TERMS: LatinTerm[] = [
  {
    expression: "Audi Alteram Partem",
    translation: "Ouvir a outra parte (grito do contraditório)",
    meaning: "Nenhuma autoridade pública pode decidir ou impor restrições graves sem dar ampla oportunidade de o acusado ou interessado se manifestar previamente.",
    algorithmicJustice: "PROIBIÇÃO DE 'BLIND CORTES': Impede que um robô (ex. INSS) indefira ou cancele um benefício apenas flagrando cruzamentos de dados, sem abrir prazo prévio para justificativa pelo cidadão.",
    category: "Contraditório"
  },
  {
    expression: "Fumus Boni Iuris",
    translation: "Fumaça do bom direito (plausibilidade jurídica)",
    meaning: "A fumaça do bom direito exprime indícios seguros de que o cidadão lesado possui de fato o direito sustentado no recurso, justificando suspender a sanção de imediato.",
    algorithmicJustice: "DEVER DE PRESUNÇÃO FAVORÁVEL: Havendo inconsistência no cadastro (proxy), presume-se a plausibilidade do direito do cidadão e suspende-se o corte arbitrário até a conferência manual.",
    category: "Indícios"
  },
  {
    expression: "Periculum in Mora",
    translation: "Perigo na demora (urgência alimentar)",
    meaning: "A iminência de dano severo de difícil ou impossível reparação ao cidadão, caso precise esperar todo o desenrolar moroso dos recursos formais.",
    algorithmicJustice: "TUTELA DE AUXÍLIO SOCIAL: No corte de bolsas acadêmicas ou auxílios rurais por código de bloqueio instantâneo, o perigo na demora exige o restabelecimento imediato sob pena de mendicância forçada.",
    category: "Procedimental"
  },
  {
    expression: "Cognitio Extraordinaria",
    translation: "Exame extraordinário (sindicância humana)",
    meaning: "Doutrina clássica de exame aprofundado, que exige do julgador ir além das aparências burocráticas exaurindo as nuances do caso em concreto.",
    algorithmicJustice: "DESVIAR DA ESTEIRA DO ROBÔ: O dever do Estado de extrair o caso suspeito da fila cega parametrizada e delegá-lo a um técnico humano para análise artesanal criteriosa (art. 20 da LGPD).",
    category: "Procedimental"
  },
  {
    expression: "In Dubio Pro Miserabili",
    translation: "Na dúvida, decida pelo necessitado",
    meaning: "Princípio social pelo qual, diante de fatos ambíguos ou inconsistências na apuração burocrática, interpreta-se a situação jurídica em favor de quem é economicamente hipossuficiente.",
    algorithmicJustice: "VETO AO PRECONCEITO ALGORÍTMICO: Se o robô acusa 'fraude' porque o agricultor rural não tem movimentação bancária digital clássica, a dúvida em favor do hipossuficiente invalida a acusação fria do sistema.",
    category: "Contraditório"
  },
  {
    expression: "Devictum Iuris Dictio",
    translation: "Devido rito ou jurisdição vinculada",
    meaning: "Exigência de que o processo estatal siga de ponta a ponta as ordens expressas da lei, sem criar etapas inventadas ou omitir garantias.",
    algorithmicJustice: "CONTRA OS DECRETOS SECRETOS DO SERVIDOR: O robô público não pode julgar baseado em portarias reservadas, critérios não publicados ou instruções de engenharia de software confidenciais.",
    category: "Herança"
  },
  {
    expression: "Pas de Nullité Sans Grief",
    translation: "Não há nulidade sem prejuízo provado",
    meaning: "Mesmo que tenha ocorrido um vício formal menor, só será anulado o processo se aquele vício causou um dano fático concreto de defesa.",
    algorithmicJustice: "A MUTAÇÃO SILENCIOSA: Quando o robô altera o critério classificatório por trás das telas e não comunica o cidadão, o prejuízo é absoluto, pois anula a capacidade de se defender.",
    category: "Herança"
  }
];

export default function LatinGlossary() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const categories = ["Todos", "Contraditório", "Indícios", "Procedimental", "Herança"];

  const filteredTerms = LATIN_TERMS.filter(term => {
    const matchesSearch = 
      term.expression.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.algorithmicJustice.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "Todos" || term.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (expression: string) => {
    navigator.clipboard.writeText(expression);
    setCopiedText(expression);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 left-64 z-50 md:left-auto md:right-6 md:bottom-24">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900 border border-amber-500/40 text-amber-400 hover:text-amber-300 hover:bg-slate-950 hover:border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all duration-300 group font-mono text-[11px] font-bold"
          id="latin-glossary-floating-btn"
          title="Glossário de Expressões Latinas"
        >
          <BookOpen size={16} className="text-amber-400 animate-pulse group-hover:scale-110 duration-200" />
          <span>CIVILIS RATIO • LATIM JURÍDICO</span>
          <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {LATIN_TERMS.length} EXPRESSÕES
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-end">
            
            {/* Backdrop Area to click outside and close */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            {/* Sidebar drawer panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative w-full max-w-lg h-full bg-slate-900 border-l border-slate-800 flex flex-col shadow-2xl z-10"
            >
              {/* Glowing Cyber Accent Line */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500 via-yellow-500 to-transparent" />
              
              {/* Header */}
              <div className="p-6 border-b border-slate-800/80 bg-slate-950/40 flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="p-1 px-2 rounded text-[9px] font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Sparkles size={10} className="text-amber-500" />
                      Garantias Clássicas Impostas ao Algoritmo
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-display">
                    Glossário de Latim Administrativo
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-normal font-sans">
                    Use estas expressões em suas defesas constitucionais para embasar a contestação jurídica dos atos estatais baseados em robôs opacos.
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-400 cursor-pointer transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Filtering Controls */}
              <div className="p-5 border-b border-slate-800 bg-slate-950/10 space-y-3 shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Filtrar brocardo ou tradução..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
                </div>

                <div className="flex flex-wrap gap-1 items-center">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all font-semibold ${
                        activeCategory === cat
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "bg-slate-950 text-slate-400 border border-slate-900/40 hover:border-slate-800 hover:text-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Terms list container */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
                {filteredTerms.length > 0 ? (
                  filteredTerms.map((term, index) => (
                    <div 
                      key={index} 
                      className="bg-slate-950/50 border border-slate-850 hover:border-amber-500/30 rounded-xl p-4.5 transition-all duration-300 relative group overflow-hidden"
                    >
                      {/* Interactive background neon line on hover */}
                      <div className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                      <div className="flex justify-between items-start gap-3">
                        <div className="space-y-1">
                          <span className="text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500">
                            {term.category}
                          </span>
                          <h4 className="text-sm font-bold text-amber-400 font-sans tracking-tight focus:text-amber-300">
                            {term.expression}
                          </h4>
                          <span className="text-[10.5px] italic text-slate-350 font-medium block">
                            Trad: {term.translation}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCopy(term.expression)}
                          className="p-1 px-1.5 rounded bg-slate-900 text-slate-450 border border-slate-850 hover:border-amber-500/20 hover:text-amber-400 hover:bg-slate-950 text-[9px] font-mono flex items-center gap-1 transition"
                          title="Copiar expressão em Latim"
                        >
                          {copiedText === term.expression ? (
                            <>
                              <Check size={10} className="text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy size={10} />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="mt-3.5 space-y-2 text-xs">
                        {/* Legal Definition */}
                        <div className="p-2.5 bg-slate-900/60 border border-slate-900/50 rounded-lg">
                          <p className="text-slate-400 text-[11px] leading-relaxed">
                            {term.meaning}
                          </p>
                        </div>

                        {/* Algorithmic application */}
                        <div className="p-2.5 bg-amber-500/5 border border-amber-500/10 rounded-lg flex gap-1.5 items-start">
                          <Cpu size={12} className="text-amber-500 shrink-0 mt-0.5" />
                          <div className="text-[10.5px] text-amber-200/90 leading-relaxed font-sans">
                            <span className="font-mono text-[9px] text-amber-400 block font-bold tracking-wider uppercase">Aplicação no Devido Rito Digital:</span>
                            <span className="mt-0.5 block">{term.algorithmicJustice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 space-y-2">
                    <p className="text-slate-500 italic text-xs font-sans">Nenhuma expressão latina encontrada para a busca.</p>
                  </div>
                )}
              </div>

              {/* Drawer footer */}
              <div className="p-4.5 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 font-mono flex items-center justify-between shrink-0">
                <span className="flex items-center gap-1">
                  <Bookmark size={10} className="text-amber-500" />
                  PROT. CONSTITUCIONAL V.26
                </span>
                <span>Seminário VIII PPGD/UFSC</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
