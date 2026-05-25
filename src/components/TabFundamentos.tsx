import React from "react";
import { Scale } from "lucide-react";
import InteractiveTutorial from "./InteractiveTutorial";
import LegalGlossary from "./LegalGlossary";
import EducativeFramework from "./EducativeFramework";

interface Props {
  sessionPhase: number;
  setSessionPhase: (phase: 1 | 2 | 3) => void;
  scrollToAnchor: (id: string) => void;
}

export default function TabFundamentos({ sessionPhase, setSessionPhase, scrollToAnchor }: Props) {
  return (
    <div className="space-y-8 animate-fadeIn text-xs" id="tab-fundamentos-view">
      
      {/* Interactive Step-by-Step Walkthrough Guide */}
      <InteractiveTutorial 
        sessionPhase={sessionPhase as 1 | 2 | 3} 
        setSessionPhase={setSessionPhase} 
        scrollToAnchor={scrollToAnchor} 
      />

      {/* Traditional Legal Glossary (Comprehensive Law Dictionary) */}
      <LegalGlossary />

      {/* Scholastic and Academic Theories of Due Process */}
      <EducativeFramework />

      {/* Unified Democratic Tension / open government impact section */}
      <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4 mb-4">
          <h3 className="text-lg font-bold text-white font-sans flex items-center gap-2">
            <Scale size={20} className="text-amber-500" />
            Tensão Democrática Constitucional: Eixo de Governo Aberto
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            A subversão das premissas públicas de tecnologia pelo pseudo-dogma da velocidade econômica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-normal">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">
              Eficiência Administrativa
            </h4>
            <p className="text-slate-400 leading-relaxed font-sans">
              O Estado promove o processamento digital ágil que extingue filas e economiza papel físico. Contudo, sem acompanhamento e transparência, o e-gov flerta com o totalitarismo burocrático, gerando o isolamento e anulação processual automática.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
            <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest font-mono">
              Dignidade & Exclusão Digital
            </h4>
            <p className="text-slate-400 leading-relaxed font-sans">
              Portais fechados que forçam o necessitado de baixa renda ao celular pré-pago inadequado sem computador, excluindo de fato dezenas de milhões de cidadãos que não possuem conectividade significativa no interior do país.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
            <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest font-mono">
              O Custo da Litigância Reversa
            </h4>
            <p className="text-slate-400 leading-relaxed font-sans">
              A automatização 'cega' que não prevê salvaguardas e callbacks de revisão humana força a judicialização de contestações em massa pela Defensoria Pública. O erário consome o quádruplo de recursos do contribuinte no Judiciário judicializando contencioso social desnecessário.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
