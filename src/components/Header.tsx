import React from "react";
import { ShieldCheck, Scale, FileText } from "lucide-react";

interface HeaderProps {
  apiKeyConfigured: boolean;
}

export default function Header({ apiKeyConfigured }: HeaderProps) {
  return (
    <header className="bg-slate-900/80 backdrop-blur-md text-slate-100 border-b border-slate-800/80 shadow-xl sticky top-0 z-30 relative overflow-hidden" id="main-header">
      {/* Decorative Federal Banner */}
      <div className="h-1 w-full bg-gradient-to-r from-green-600 via-yellow-400 to-blue-600" />
      
      <div className="max-w-7xl mx-auto px-4 py-4.5 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="h-11 w-11 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-slate-950 font-black text-lg shadow-[0_0_15px_rgba(245,158,11,0.2)] border border-yellow-300/30 font-display">
            CCA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white leading-tight font-display">
                Conselho de Contestação Algorítmica
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full uppercase tracking-wider font-mono">
                Contestabilidade Cidadã
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Auditoria de Decisões Estatais Automatizadas · Direitos Fundamentais (Art. 5º, LV & LGPD Art. 20)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto font-mono text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 rounded-lg border border-slate-700/50">
            <span className={`h-2 w-2 rounded-full ${apiKeyConfigured ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 shadow-[0_0_8px_#f59e0b]'}`} />
            <span className="text-slate-300">
              {apiKeyConfigured ? "Gemini Ativo" : "Simulação Local"}
            </span>
          </div>
          <a 
            href="#doc-framework" 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg border border-slate-800 transition duration-150"
          >
            <Scale size={14} className="text-amber-500" />
            <span>Fundamentos Jurídicos</span>
          </a>
        </div>
      </div>
    </header>
  );
}
