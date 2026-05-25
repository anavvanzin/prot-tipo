import React, { useState, useMemo } from "react";
import { 
  Calculator, 
  AlertOctagon, 
  HelpCircle, 
  Scale, 
  DollarSign, 
  Zap, 
  Info,
  Shield,
  FileCheck2,
  Users2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ExplainableTerm from "./ExplainableTerm";

type DecisionType = "vital_benefit" | "tax_increase" | "facial_detention" | "minor_rejection";
type HumanReviewType = "zero_human" | "rubber_stamp" | "full_audit";
type DataQualityType = "obsolete_silos" | "partial_match" | "clean_verified";
type VulnerabilityLevel = "high_vulnerable" | "medium_vulnerable" | "low_vulnerable";

export default function AlgorithmicSeverityCalculator() {
  const [decisionType, setDecisionType] = useState<DecisionType>("vital_benefit");
  const [humanReview, setHumanReview] = useState<HumanReviewType>("zero_human");
  const [dataQuality, setDataQuality] = useState<DataQualityType>("obsolete_silos");
  const [vulnerability, setVulnerability] = useState<VulnerabilityLevel>("high_vulnerable");
  const [showExplanation, setShowExplanation] = useState(false);

  // Self-contained Web Audio API synthesizer for clean physical button clicks
  const playSound = (type: "click" | "info") => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "info") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523, now); // C5
        osc.frequency.setValueAtTime(659, now + 0.1); // E5
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      // Audio fallback
    }
  };

  // Compute calculated values based on parameters
  const metrics = useMemo(() => {
    let baseScore = 30;

    // 1. Decision Nature
    if (decisionType === "facial_detention") baseScore += 35;
    else if (decisionType === "vital_benefit") baseScore += 30;
    else if (decisionType === "tax_increase") baseScore += 15;
    else baseScore += 5;

    // 2. Human Review
    if (humanReview === "zero_human") baseScore += 20;
    else if (humanReview === "rubber_stamp") baseScore += 12;
    // full_audit reduces score
    else baseScore -= 15;

    // 3. Data Quality
    if (dataQuality === "obsolete_silos") baseScore += 15;
    else if (dataQuality === "partial_match") baseScore += 8;
    else baseScore -= 5;

    // 4. Vulnerability
    if (vulnerability === "high_vulnerable") baseScore += 15;
    else if (vulnerability === "medium_vulnerable") baseScore += 7;
    else baseScore -= 5;

    // Limit to 100/0 bounds
    const severityScore = Math.max(10, Math.min(100, baseScore));

    // Injunction feasibility (Art. 300 CPC)
    let injunctionGrade: "Extrema" | "Alta" | "Média" | "Baixa" = "Baixa";
    let colorClass = "text-emerald-400";
    let bgMeter = "bg-emerald-500";
    
    if (severityScore >= 85) {
      injunctionGrade = "Extrema";
      colorClass = "text-red-400";
      bgMeter = "bg-red-500";
    } else if (severityScore >= 65) {
      injunctionGrade = "Alta";
      colorClass = "text-amber-400";
      bgMeter = "bg-amber-500";
    } else if (severityScore >= 40) {
      injunctionGrade = "Média";
      colorClass = "text-blue-400";
      bgMeter = "bg-blue-500";
    }

    // Suggested individual redress damages estimation (precedents in R$)
    let estimatedRedress = 0;
    if (decisionType === "facial_detention") {
      estimatedRedress = severityScore * 250; // Max R$ 25,000
    } else if (decisionType === "vital_benefit") {
      estimatedRedress = severityScore * 180; // Max R$ 18,000
    } else {
      estimatedRedress = severityScore * 120; // Max R$ 12,000
    }

    return {
      severityScore,
      injunctionGrade,
      colorClass,
      bgMeter,
      estimatedRedress
    };
  }, [decisionType, humanReview, dataQuality, vulnerability]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-6" id="algorithmic-severity-calculator">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-3 flex flex-col md:flex-row md:items-start justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 flex items-center gap-1.5 font-bold">
            <Calculator size={14} />
            Módulo Prático I: Análise Qualitativa
          </span>
          <h3 className="text-sm font-bold text-white font-sans mt-0.5 flex items-center gap-1.5">
            Calculadora de Impacto Burocrático e Risco Algorítmico
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed font-sans">
            Com base em jurisprudência do STJ e pareceres do <ExplainableTerm term="contraditório" />, avalie o grau de vício burocrático de uma decisão automatizada estatal.
          </p>
        </div>

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="text-xs text-blue-400 hover:text-blue-300 font-mono flex items-center gap-1 self-start"
        >
          <HelpCircle size={13} />
          {showExplanation ? "Omitir Critérios" : "Ver Critérios"}
        </button>
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-slate-950 rounded-xl p-4 border border-slate-850/80 text-[11px] text-slate-400 space-y-2 font-sans"
          >
            <p className="font-bold text-slate-200">Como esta métrica é calculada?</p>
            <p className="leading-relaxed">
              Os pesos e limiares mimetizam as recomendações do Conselho de Transparência da UFSC e teorias de Direito Administrativo Constitucional. O índice aponta se os direitos fundamentais do <ExplainableTerm term="artigo 20 da LGPD" /> (como o direito de explicação e revisão humana) foram gravemente preteridos pelo dogmismo de agilidade algorítmica.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Interactive Selection Panels (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          
          {/* Nature of Automated Decision */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
              1. Natureza do Impacto Material
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDecisionType("vital_benefit")}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all h-[75px] ${
                  decisionType === "vital_benefit"
                    ? "bg-slate-950 border-amber-500/80 text-white shadow-md ring-1 ring-amber-500/30"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <span className="font-bold flex items-center gap-1">
                  📦 Assistencial Vital
                </span>
                <span className="text-[9.5px] text-slate-500 leading-tight">Cortes de Bolsa Família/BPC</span>
              </button>

              <button
                type="button"
                onClick={() => setDecisionType("facial_detention")}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all h-[75px] ${
                  decisionType === "facial_detention"
                    ? "bg-slate-950 border-amber-500/80 text-white shadow-md ring-1 ring-amber-500/30"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <span className="font-bold flex items-center gap-1">
                  👁️ Restrição de Liberdade
                </span>
                <span className="text-[9.5px] text-slate-500 leading-tight">Reconhecimento Facial de Câmera</span>
              </button>

              <button
                type="button"
                onClick={() => setDecisionType("tax_increase")}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all h-[75px] ${
                  decisionType === "tax_increase"
                    ? "bg-slate-950 border-amber-500/80 text-white shadow-md ring-1 ring-amber-500/30"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <span className="font-bold flex items-center gap-1">
                  💰 Reclassificação Fisco
                </span>
                <span className="text-[9.5px] text-slate-500 leading-tight">Elevação de IPTU ou malha da Receita</span>
              </button>

              <button
                type="button"
                onClick={() => setDecisionType("minor_rejection")}
                className={`p-3 rounded-lg border text-left flex flex-col justify-between transition-all h-[75px] ${
                  decisionType === "minor_rejection"
                    ? "bg-slate-950 border-amber-500/80 text-white shadow-md ring-1 ring-amber-500/30"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <span className="font-bold flex items-center gap-1">
                  📄 Negativa Documentos
                </span>
                <span className="text-[9.5px] text-slate-500 leading-tight">Agendamentos, CNH, certidões frias</span>
              </button>
            </div>
          </div>

          {/* Level of Human Review */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
              2. Grau de Revisão Humana Ocorrido
            </label>
            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => setHumanReview("zero_human")}
                className={`w-full p-2.5 rounded-lg border text-left flex justify-between items-center transition-all ${
                  humanReview === "zero_human"
                    ? "bg-slate-950 border-rose-500/80 text-rose-300"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <div className="space-y-0.5">
                  <p className="font-bold">Omissão Humana Absoluta (Ausência total)</p>
                  <p className="text-[10px] text-slate-500">Decisão 100% mecânica por cruzamento direto.</p>
                </div>
                {humanReview === "zero_human" && <span className="w-2 h-2 rounded-full bg-rose-500" />}
              </button>

              <button
                type="button"
                onClick={() => setHumanReview("rubber_stamp")}
                className={`w-full p-2.5 rounded-lg border text-left flex justify-between items-center transition-all ${
                  humanReview === "rubber_stamp"
                    ? "bg-slate-950 border-amber-500/80 text-amber-300"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <div className="space-y-0.5">
                  <p className="font-bold">Revisão Formal Burocrática (Carimbo cego)</p>
                  <p className="text-[10px] text-slate-500">Houve homologação rápida de funcionário sem analisar provas.</p>
                </div>
                {humanReview === "rubber_stamp" && <span className="w-2 h-2 rounded-full bg-amber-500" />}
              </button>

              <button
                type="button"
                onClick={() => setHumanReview("full_audit")}
                className={`w-full p-2.5 rounded-lg border text-left flex justify-between items-center transition-all ${
                  humanReview === "full_audit"
                    ? "bg-slate-950 border-emerald-500/80 text-emerald-300"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <div className="space-y-0.5">
                  <p className="font-bold">Auditoria Individualizada Fática (Ideal)</p>
                  <p className="text-[10px] text-slate-500">O servidor revisou todos os laudos, contrariando o erro de lote.</p>
                </div>
                {humanReview === "full_audit" && <span className="w-2 h-2 rounded-full bg-emerald-500" />}
              </button>
            </div>
          </div>

          {/* Data Quality & Source Silos */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
              3. Origem e Limpeza das Bases Cruzadas
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDataQuality("obsolete_silos")}
                className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all h-[68px] ${
                  dataQuality === "obsolete_silos"
                    ? "bg-slate-950 border-amber-500/80 text-white font-semibold"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <span className="text-[11px]">Bases Obsoletas</span>
                <span className="text-[9px] text-slate-500">CNIS sem baixa / homônimos</span>
              </button>

              <button
                type="button"
                onClick={() => setDataQuality("partial_match")}
                className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all h-[68px] ${
                  dataQuality === "partial_match"
                    ? "bg-slate-950 border-amber-500/80 text-white font-semibold"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <span className="text-[11px]">Cruzamento Parcial</span>
                <span className="text-[9px] text-slate-500">MEI sem faturamento real</span>
              </button>

              <button
                type="button"
                onClick={() => setDataQuality("clean_verified")}
                className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all h-[68px] ${
                  dataQuality === "clean_verified"
                    ? "bg-slate-950 border-amber-500/80 text-white font-semibold"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <span className="text-[11px]">Bases Higienizadas</span>
                <span className="text-[9px] text-slate-500">Dados síncronos e limpos</span>
              </button>
            </div>
          </div>

          {/* Social Vulnerability */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
              4. Nível de Vulnerabilidade Social do Alvo
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setVulnerability("high_vulnerable")}
                className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all h-[68px] ${
                  vulnerability === "high_vulnerable"
                    ? "bg-slate-950 border-amber-500/80 text-white font-semibold"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <span className="text-[11px]">Vulnerabilidade Extrema</span>
                <span className="text-[9px] text-slate-500">Idoso s/ letramento ou área isolada</span>
              </button>

              <button
                type="button"
                onClick={() => setVulnerability("medium_vulnerable")}
                className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all h-[68px] ${
                  vulnerability === "medium_vulnerable"
                    ? "bg-slate-950 border-amber-500/80 text-white font-semibold"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <span className="text-[11px]">Vulnerabilidade Média</span>
                <span className="text-[9px] text-slate-500">Trabalhador autônomo comum</span>
              </button>

              <button
                type="button"
                onClick={() => setVulnerability("low_vulnerable")}
                className={`p-2 rounded-lg border text-left flex flex-col justify-between transition-all h-[68px] ${
                  vulnerability === "low_vulnerable"
                    ? "bg-slate-950 border-amber-500/80 text-white font-semibold"
                    : "bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-900"
                }`}
              >
                <span className="text-[11px]">Baixo Impacto</span>
                <span className="text-[9px] text-slate-500">Empresa estruturada</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Scorecard Report (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 rounded-2xl border border-slate-800 p-5.5 relative overflow-hidden flex flex-col justify-between h-full min-h-[410px] shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl rounded-full" />
          
          <div className="space-y-5">
            <div className="border-b border-slate-800/80 pb-3">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Relatório de Auditoria</span>
              <h4 className="text-xs font-bold text-slate-200">Parecer de Risco Individualizado</h4>
            </div>

            {/* Main Score Indicator with premium progress gauge */}
            <div className="py-4 px-4 bg-slate-900/80 rounded-xl border border-slate-800/50 space-y-3.5 relative overflow-hidden group">
              <div className="absolute -right-3 -top-3 w-16 h-16 bg-gradient-to-br from-amber-500/10 to-transparent blur-xl rounded-full pointer-events-none" />
              
              <div className="text-center space-y-1">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">Índice de Abusividade Algorítmica</span>
                <div className="text-4xl font-extrabold font-display tracking-tight text-white flex items-center justify-center gap-1">
                  <span className="bg-gradient-to-r from-white via-slate-100 to-amber-200 bg-clip-text text-transparent">
                    {metrics.severityScore}%
                  </span>
                </div>
              </div>

              {/* Dynamic Gradient Bar with Needles */}
              <div className="space-y-1.5">
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    className={`h-full rounded-full transition-all duration-700 ease-out ${
                      metrics.severityScore >= 80 
                        ? "bg-gradient-to-r from-amber-500 via-rose-500 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" 
                        : metrics.severityScore >= 55 
                          ? "bg-gradient-to-r from-emerald-500 via-amber-450 to-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]" 
                          : "bg-gradient-to-r from-teal-500 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    }`} 
                    style={{ width: `${metrics.severityScore}%` }} 
                  />
                </div>
                <div className="flex justify-between items-center text-[8px] font-mono text-slate-500 uppercase tracking-wider px-0.5">
                  <span>Conforme</span>
                  <span>Alerta</span>
                  <span>Crítico</span>
                </div>
              </div>

              <div className="text-center">
                <span className={`text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase border ${
                  metrics.severityScore >= 80 
                    ? "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]" 
                    : metrics.severityScore >= 55 
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]" 
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                }`}>
                  {metrics.severityScore >= 80 ? "🚨 GRAVÍSSIMO ABUSO" : metrics.severityScore >= 55 ? "⚠️ GRAVE RISCO" : "✔️ LEVE / MODERADO"}
                </span>
              </div>
            </div>

            {/* Diagnostic Details */}
            <div className="space-y-3 text-xs font-sans">
              
              <div className="flex justify-between items-center border-b border-slate-900/60 pb-2.5">
                <span className="text-slate-400 font-medium">Viabilidade de Liminar:</span>
                <span className={`font-mono font-bold text-xs uppercase tracking-wide bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 ${metrics.colorClass}`}>
                  {metrics.injunctionGrade}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-slate-900/60 pb-2.5">
                <span className="text-slate-400 font-medium">Indenização Estimada:</span>
                <span className="font-mono text-white font-extrabold text-xs bg-slate-900/90 px-2.5 py-0.5 rounded border border-slate-800 shadow-sm flex items-center gap-1 text-amber-400">
                  R$ {metrics.estimatedRedress.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold tracking-wider">Fundamentação Estratégica:</span>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans bg-slate-900/20 p-2.5 rounded-lg border border-slate-900">
                  {metrics.severityScore >= 80 
                    ? "Violação flagrante do devido processo legal e contraditório material. Incorreu em bloqueio sumário de subsistência de sujeito sob hipossuficiência técnica, permitindo pedido de anulação cautelar imediato com esteio no Art. 300 do CPC."
                    : metrics.severityScore >= 55
                      ? "Ausência de clareza informacional (explicabilidade). Recomenda-se pleitear administrativamente por força do encarregado de dados com base no Artigo 20 da LGPD antes de ingressar com lide no Judiciário."
                      : "Dissonância cadastral leve que pode ser sanada pelo simples protocolo digital retificador das bases cruzadas no próprio portal governamental."
                  }
                </p>
              </div>

            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-900 bg-gradient-to-b from-transparent to-slate-950/20">
            <div className="p-3 bg-blue-950/10 border border-blue-900/30 rounded-xl flex gap-2.5 items-start text-[10.5px]">
              <AlertOctagon size={15} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-slate-400 leading-relaxed font-sans">
                <strong>Precedente Jurisprudencial:</strong> REsp repetitivo do STJ consagra nulidade de atos estatais expedidos unicamente por robôs desprovidos de notificação prévia de revisão.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
