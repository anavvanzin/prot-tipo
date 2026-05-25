import React, { useState, useRef, useEffect } from "react";
import { Info, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ExplainableTermProps {
  term: string;
  customDefinition?: string;
  children?: React.ReactNode;
}

const TERM_DEFINITIONS: { [key: string]: { simple: string; title: string } } = {
  "contraditório": {
    title: "Contraditório Prévio",
    simple: "Seu direito garantido de se explicar e apresentar documentos ANTES de sofrer qualquer punição ou corte."
  },
  "ampla defesa": {
    title: "Ampla Defesa",
    simple: "Seu direito de usar qualquer prova legal (fotos, papéis antigos, testemunhas) para contestar decisões erradas."
  },
  "viés de proxy": {
    title: "Viés de Proxy",
    simple: "Quando um robô tira conclusões erradas sobre você baseando-se em dados indiretos (como o e-mail ou o CEP onde você reside)."
  },
  "notícia humana": {
    title: "Notícia Humana",
    simple: "O dever ético do Estado de comunicar cortes importantes pessoalmente com calor humano e simplicidade, sem mensagens frias de erro técnico."
  },
  "litigância reversa": {
    title: "Litigância Reversa",
    simple: "Quando o governo usa sistemas automáticos ruins para supostamente poupar custos, mas o tiro sai pela culatra gerando milhares de novos processos judiciais caros."
  },
  "erário": {
    title: "Erário Público",
    simple: "O cofrinho público do Estado, composto pelo arrecadamento de impostos pagos pelo povo brasileiro."
  },
  "acórdão": {
    title: "Acórdão",
    simple: "A decisão oficial feita em grupo (colegiado) por juízes ou conselheiros de um conselho administrativo."
  },
  "súmula": {
    title: "Súmula / Súmula Vinculante",
    simple: "Uma diretriz que resume regras consagradas e serve de instrução obrigatória para os órgãos do governo seguirem."
  },
  "falso positivo": {
    title: "Falso Positivo",
    simple: "Quando o algoritmo aponta uma suspeição de erro ou fraude que na verdade é totalmente inocente."
  },
  "lgpd": {
    title: "Lei Geral de Proteção de Dados (Art. 20)",
    simple: "Garante que você pode exigir que uma pessoa real e qualificada revise uma decisão desfavorável tomada unicamente por robôs."
  },
  "fundamentação": {
    title: "Fundamentação Jurídica",
    simple: "A demonstração lógica, conceitual e substancial das leis, princípios constitucionais e teses doutrinárias aplicados à decisão de um caso, legitimando de forma clara o acórdão."
  },
  "dogmática": {
    title: "Dogmática Jurídica",
    simple: "O estudo científico estruturado do Direito que analisa as normas e regras constitucionais para impor limites ao poder absoluto do Estado e, hoje, garantir que robôs públicos não cometam abusos automatizados."
  }
};

export default function ExplainableTerm({ term, customDefinition, children }: ExplainableTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Match corresponding translation or use custom description
  const key = Object.keys(TERM_DEFINITIONS).find(k => term.toLowerCase().includes(k)) || "default";
  const def = customDefinition 
    ? { title: term, simple: customDefinition } 
    : TERM_DEFINITIONS[key] || { title: term, simple: "Termo jurídico que exprime direitos e ritos garantidos pela constituição." };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span 
      ref={containerRef} 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4 decoration-dotted decoration-amber-500/80 cursor-help transition-all duration-150 inline-flex items-center gap-0.5"
      >
        {children || term}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 left-1/2 -translate-x-1/2 bottom-full mb-2 w-72 bg-slate-900 border border-slate-800 text-slate-100 p-4 rounded-xl shadow-2xl pointer-events-auto block"
            id={`tooltip-term-${key}`}
          >
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono border-b border-slate-800 pb-1.5 mb-1.5 block">
              <Sparkles size={11} className="text-amber-400 shrink-0" />
              {def.title} (Descomplicado)
            </span>
            <span className="text-xs text-slate-300 leading-relaxed block font-sans font-normal">
              {def.simple}
            </span>
            <span className="text-[9px] text-slate-500 block text-right mt-1.5 font-mono">
              Clique para fixar · Passe o mouse
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
