import React, { useState } from "react";
import { CaseAnalysis } from "../types";
import { FolderGit, CheckCircle, Send, AlertTriangle, Cpu, Search, X } from "lucide-react";

interface CaseSelectorProps {
  cases: CaseAnalysis[];
  activeCaseId: string | number | null;
  onSelectCase: (caseId: string | number) => void;
  onSubmitCustom: (decisionText: string) => void;
  isAnalyzing: boolean;
  customText: string;
  setCustomText: (text: string) => void;
  showCustomForm: boolean;
  setShowCustomForm: (show: boolean) => void;
}

export default function CaseSelector({
  cases,
  activeCaseId,
  onSelectCase,
  onSubmitCustom,
  isAnalyzing,
  customText,
  setCustomText,
  showCustomForm,
  setShowCustomForm
}: CaseSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customText.trim() === "") return;
    onSubmitCustom(customText);
  };

  const filteredCases = cases.filter((c) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return (
      c.title.toLowerCase().includes(term) ||
      (c.tag && c.tag.toLowerCase().includes(term)) ||
      (c.context && c.context.toLowerCase().includes(term)) ||
      (c.desc && c.desc.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6" id="case-selector-module">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 backdrop-blur-sm">
        <div>
          <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2 font-display uppercase tracking-wider">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FolderGit size={16} />
            </span>
            Casos em Discussão no Colegiado
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Selecione um caso brasileiro real ou digite uma decisão personalizada para auditarmos.
          </p>
        </div>

        <button
          onClick={() => {
            setShowCustomForm(!showCustomForm);
            if (!showCustomForm) {
              // Reset selection when editing custom
              onSelectCase("custom-form");
            }
          }}
          className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-300 transform active:scale-95 ${
            showCustomForm
              ? "bg-slate-850 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white"
              : "bg-gradient-to-r from-amber-500 via-amber-550 to-amber-600 hover:from-amber-400 hover:to-amber-500 border-amber-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]"
          }`}
        >
          {showCustomForm ? "📁 Ver Casos Prontos" : "✎ Analisar Outra Decisão"}
        </button>
      </div>

      {!showCustomForm ? (
        <div className="space-y-4">
          {/* Campo de Busca */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={14} className="text-slate-500" />
            </div>
            <input
              type="text"
              placeholder="Filtre os casos por título, tag ou contexto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-8 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-sans transition-all duration-200"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                title="Limpar busca"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCases.map((c) => {
                const isActive = activeCaseId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelectCase(c.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 transform hover:translate-y-[-2px] relative flex flex-col justify-between h-full group ${
                      isActive
                        ? "bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.12)] ring-1 ring-amber-500/20"
                        : "bg-slate-900/45 border-slate-800 hover:border-slate-700/80 hover:bg-slate-900 hover:shadow-lg hover:shadow-amber-500/5"
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="inline-block px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-slate-950 text-slate-400 border border-slate-800 rounded-md">
                          {c.tag}
                        </span>
                        {isActive && (
                          <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-1 font-mono bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                            <CheckCircle size={11} className="text-amber-500" />
                            Sob Julgamento
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-slate-100 mt-3 font-display group-hover:text-amber-400 transition-colors duration-200">
                        {c.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed font-sans">
                        {c.desc}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-800/80 w-full flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Prot: #{String(c.id).toUpperCase().replace("_", "-")}</span>
                      <span className="text-slate-400 font-sans group-hover:translate-x-1 group-hover:text-amber-400 transition-all duration-200 flex items-center gap-0.5">
                        Análise do Caso →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 bg-slate-900/40 border border-slate-800 rounded-xl text-center">
              <p className="text-sm text-slate-400 font-sans">Nenhum caso encontrado para a pesquisa "{searchTerm}".</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-2 text-xs text-amber-500 hover:underline font-mono"
              >
                Limpar busca
              </button>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleCustomSubmit} className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-inner space-y-4">
          <div>
            <label htmlFor="custom-decision-text" className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              Texto ou Notificação da Decisão Estatal Automatizada
            </label>
            <p className="text-xs text-slate-400 mt-0.5">
              Cole abaixo a contestação de auxílio negado, cálculo de imposto, multa ou processo robotizado que queira analisar.
            </p>
            <textarea
              id="custom-decision-text"
              rows={4}
              required
              disabled={isAnalyzing}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder='Exemplo: "Prezado, após cruzamentos de dados do Cadastro Único com a RAIS, informamos que o benefício de auxílio assistencial foi cancelado automaticamente por inconsistências e duplicidades. Para apresentar recurso físico, obtenha agendamento na agência central."'
              className="mt-2 block w-full rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-3 text-sm text-slate-150 placeholder-slate-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:bg-slate-950/40 disabled:text-slate-500 focus:outline-none font-sans leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <Cpu size={14} className="text-amber-500 animate-pulse" />
              <span>Análise processada em tempo real com Gemini 3.5 Flash</span>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing || customText.trim() === ""}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-550 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all transform hover:translate-y-[-1px] active:translate-y-[0px] enabled:hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] disabled:bg-slate-850 disabled:text-slate-500 disabled:border-slate-850"
            >
              {isAnalyzing ? "Processando Sentenças..." : "Submeter ao Conselho"}
              <Send size={12} className={isAnalyzing ? "animate-pulse" : "group-hover:translate-x-1 transition-transform"} />
            </button>
          </div>
        </form>
      )}

      {isAnalyzing && (
        <div className="p-6 bg-slate-950 text-amber-500 rounded-xl border border-amber-500/20 shadow-lg flex flex-col items-center justify-center text-center space-y-3.5 animate-pulse">
          <div className="relative">
            <div className="h-10 w-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
            <Cpu size={18} className="absolute inset-0 m-auto" />
          </div>
          <div>
            <p className="text-sm font-bold font-mono text-white">
              Sessão Extraordinária do Conselho Iniciada
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-lg leading-relaxed font-sans">
              Dr. Lucas Mendes, Profª Clara Santos, Dr. Ricardo Hahn e o Sr. Arnaldo Rocha estão analisando a legalidade da sua decisão estatal automonitorada. Por favor, aguarde enquanto o acórdão é redigido...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
