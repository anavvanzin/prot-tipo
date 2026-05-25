import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CaseSelector from "./components/CaseSelector";
import InteractiveTutorial from "./components/InteractiveTutorial";
import CitizenToolbox from "./components/CitizenToolbox";
import EducativeFramework from "./components/EducativeFramework";
import DoctoralLab from "./components/DoctoralLab";
import ExplainableTerm from "./components/ExplainableTerm";
import BiasHistoricalChart from "./components/BiasHistoricalChart";
import ReportAbuseForm from "./components/ReportAbuseForm";
import AlgorithmicPipelineInfographic from "./components/AlgorithmicPipelineInfographic";
import AlgorithmicSeverityCalculator from "./components/AlgorithmicSeverityCalculator";
import AlgorithmicBackground from "./components/AlgorithmicBackground";
import { motion } from "motion/react";
import { CaseAnalysis, PersonaDetail } from "./types";
import { BOARD_PERSONAS } from "./data";
import { 
  FileText, 
  Scale, 
  Database, 
  UserCheck, 
  ShieldAlert, 
  TrendingUp, 
  Check, 
  Copy, 
  Users, 
  Play, 
  AlertTriangle,
  Info,
  Layers,
  FileCheck,
  RotateCcw,
  Sparkles,
  BarChart2
} from "lucide-react";

export default function App() {
  const [cases, setCases] = useState<CaseAnalysis[]>([]);
  const [activeCaseId, setActiveCaseId] = useState<string | number | null>("inss_rural");
  const [customCase, setCustomCase] = useState<CaseAnalysis | null>(null);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customText, setCustomText] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);
  
  // Current session phase: 1 (Pareceres), 2 (Avaliações Cruzadas), 3 (Acórdão Final)
  const [sessionPhase, setSessionPhase] = useState<1 | 2 | 3>(1);
  const [activeCounselorId, setActiveCounselorId] = useState<string>("lucas_mendes");
  const [endorsedOpinions, setEndorsedOpinions] = useState<Record<string, boolean>>({});
  
  // Custom generated document view: "recurso" | "lai"
  const [activeDocTab, setActiveDocTab] = useState<"recurso" | "lai">("recurso");
  const [copiedText, setCopiedText] = useState(false);

  const scrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const toggleEndorsement = (personId: string) => {
    setEndorsedOpinions((prev) => ({
      ...prev,
      [personId]: !prev[personId]
    }));
  };

  // Fetch standard cases and API status
  useEffect(() => {
    const fetchData = async () => {
      try {
        const caseRes = await fetch("/api/cases");
        if (caseRes.ok) {
          const list = await caseRes.json();
          setCases(list);
        }
        
        const configRes = await fetch("/api/config-status");
        if (configRes.ok) {
          const statusObj = await configRes.json();
          setApiKeyConfigured(statusObj.apiKeyConfigured);
        }
      } catch (err) {
        console.error("Falha ao comunicar com o servidor full-stack:", err);
      }
    };
    fetchData();
  }, []);

  const handleSelectCase = (id: string | number) => {
    if (id === "custom-form") {
      setActiveCaseId("custom-form");
    } else {
      setActiveCaseId(id);
      setCustomCase(null);
      setSessionPhase(1); // Reset to Phase 1 on switch
    }
  };

  const handleSubmitCustom = async (decisionText: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/analyze-decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decisionText })
      });
      if (res.ok) {
        const payload = await res.json();
        setCustomCase(payload);
        setActiveCaseId(payload.id);
        setSessionPhase(1); // Start custom case at Phase 1
      }
    } catch (err) {
      console.error("Erro ao analisar com o Gemini:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Find active case object
  const activeCase: CaseAnalysis | undefined = 
    activeCaseId && String(activeCaseId) === String(customCase?.id)
      ? customCase
      : cases.find(c => c.id === activeCaseId) || cases[0];

  // Calculate dynamic stats for active case
  const calculateStats = (c: CaseAnalysis) => {
    if (!c) return { opacity: 0, vulnerability: 0, annulProbability: 0 };
    
    // 1. Opacity: Percentage of checkpoints having 'bad' or 'warn' status
    const totalDataPoints = c.dados?.length || 1;
    const nonOkPoints = c.dados?.filter(d => d.status === "bad" || d.status === "warn" || d.statusLabel.toLowerCase().includes("ignorado") || d.statusLabel.toLowerCase().includes("ausente")).length || 0;
    const opacityScore = Math.min(100, Math.round((nonOkPoints / totalDataPoints) * 100));

    // 2. Vulnerability / Bias Level: Mean of vias items
    const totalBiases = c.vieses?.length || 1;
    const sumBiases = c.vieses?.reduce((sum, v) => sum + v.valor, 0) || 0;
    const vulnerabilityScore = Math.min(100, Math.round(sumBiases / totalBiases));

    // 3. Probability of Annulment: combined weight
    const annulProbability = Math.min(100, Math.max(45, Math.round((opacityScore * 0.55) + (vulnerabilityScore * 0.45))));

    return {
      opacity: opacityScore,
      vulnerability: vulnerabilityScore,
      annulProbability: annulProbability
    };
  };

  const activeStats = activeCase ? calculateStats(activeCase) : { opacity: 0, vulnerability: 0, annulProbability: 0 };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Background animado de estética algorítmica linear e binária */}
      <AlgorithmicBackground />

      {/* Upper Brand Header */}
      <Header apiKeyConfigured={apiKeyConfigured} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Intro Banner */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-2xl relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
          
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider font-mono">
              <Sparkles size={12} />
              Seminário de Direito Administrativo Digital 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-display max-w-2xl leading-tight">
              A decisão estatal automatizada na mesa de julgamento.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed font-sans text-[14px]">
              O mesmo <ExplainableTerm term="erário">erário</ExplainableTerm> que edita os decretos de transparência pública, <ExplainableTerm term="lgpd">LGPD</ExplainableTerm> e devido rito de processo (Regulador) impõe sistemas algorítmicos herméticos contra o cidadão necessitado (Regulado). O <strong className="text-amber-400">Conselho de Contestação Algorítmica</strong> é uma proposta teórica materializada para devolver o <ExplainableTerm term="contraditório">contraditório</ExplainableTerm> à arena digital.
            </p>
          </div>
        </section>

        {/* Core Control / Selector */}
        <CaseSelector 
          cases={cases}
          activeCaseId={activeCaseId}
          onSelectCase={handleSelectCase}
          onSubmitCustom={handleSubmitCustom}
          isAnalyzing={isAnalyzing}
          customText={customText}
          setCustomText={setCustomText}
          showCustomForm={showCustomForm}
          setShowCustomForm={setShowCustomForm}
        />

        {activeCase && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Interactive Decision Pipeline / Dynamic Visual Simulator */}
            <AlgorithmicPipelineInfographic activeCase={activeCase} />
            
            {/* Case Background & Context Card */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative shadow-inner">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">
                    Ato sob Contestação:
                  </span>
                  <h3 className="text-lg font-bold text-white font-display mt-0.5">
                    {activeCase.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-red-950/80 text-red-400 border border-red-800/50 flex items-center gap-1.5 font-mono">
                    <ShieldAlert size={13} />
                    INDEFERIDO AUTOMATICAMENTE
                  </span>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    Prot: {String(activeCase.id).toUpperCase().replace("_", "-")}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Info size={14} className="text-blue-400" />
                  Contexto Fático e Narrativa:
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/60 p-4 rounded-xl border border-slate-900">
                  {activeCase.context}
                </p>
              </div>
            </section>

            {/* Painel de Indicadores de Gravidade Geral (Severity indicators with SVG Radial Gauges) */}
            <motion.div 
              key={activeCaseId || "none"}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { 
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {/* Index Card 1 (Radial Dial format) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
                }}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-amber-500/40 hover:shadow-[0_4px_30px_rgba(245,158,11,0.04)] transition-all duration-300 flex items-center gap-5"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />
                
                {/* Radial Gauge Ring */}
                <div className="relative w-22 h-22 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="44" cy="44" r="32" className="stroke-slate-950 fill-none" strokeWidth="5" />
                    <circle 
                      cx="44" 
                      cy="44" 
                      r="32" 
                      className="stroke-amber-400 fill-none transition-all duration-1000 ease-out" 
                      strokeWidth="6" 
                      strokeDasharray={2 * Math.PI * 32} 
                      strokeDashoffset={(2 * Math.PI * 32) - (activeStats.annulProbability / 100) * (2 * Math.PI * 32)} 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-slate-100 font-mono select-none">{activeStats.annulProbability}%</span>
                    <span className="text-[8px] text-amber-400 font-mono font-bold tracking-widest select-none uppercase">ÊXITO</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Previsibilidade
                    </span>
                    <span className="p-1 px-1.5 rounded text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono font-bold">
                      ⚖️ ALTA CHANCE
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans mt-1">
                    Avaliação estimada da procedência de eventual anulação judicial, amparada no rito e regras do Art. 5º (LV) da CF.
                  </p>
                </div>
              </motion.div>

              {/* Index Card 2 (Radial Dial format) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
                }}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-rose-500/40 hover:shadow-[0_4px_30px_rgba(239,68,68,0.04)] transition-all duration-300 flex items-center gap-5"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-3xl rounded-full pointer-events-none" />
                
                {/* Radial Gauge Ring */}
                <div className="relative w-22 h-22 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="44" cy="44" r="32" className="stroke-slate-950 fill-none" strokeWidth="5" />
                    <circle 
                      cx="44" 
                      cy="44" 
                      r="32" 
                      className="stroke-rose-500 fill-none transition-all duration-1000 ease-out" 
                      strokeWidth="6" 
                      strokeDasharray={2 * Math.PI * 32} 
                      strokeDashoffset={(2 * Math.PI * 32) - (activeStats.opacity / 100) * (2 * Math.PI * 32)} 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-slate-100 font-mono select-none">{activeStats.opacity}%</span>
                    <span className="text-[7.5px] text-rose-400 font-mono font-bold tracking-widest select-none uppercase">OPACO</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Opacidade
                    </span>
                    <span className="p-1 px-1.5 rounded text-[8px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono font-bold">
                      ⚫ CAIXA PRETA
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans mt-1">
                    Mapeia carência de revisão humana e processos decisórios robóticos opacos sem justificação devida.
                  </p>
                </div>
              </motion.div>

              {/* Index Card 3 (Radial Dial format) */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
                }}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_4px_30px_rgba(59,130,246,0.04)] transition-all duration-300 flex items-center gap-5"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
                
                {/* Radial Gauge Ring */}
                <div className="relative w-22 h-22 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="44" cy="44" r="32" className="stroke-slate-950 fill-none" strokeWidth="5" />
                    <circle 
                      cx="44" 
                      cy="44" 
                      r="32" 
                      className="stroke-blue-400 fill-none transition-all duration-1000 ease-out" 
                      strokeWidth="6" 
                      strokeDasharray={2 * Math.PI * 32} 
                      strokeDashoffset={(2 * Math.PI * 32) - (activeStats.vulnerability / 100) * (2 * Math.PI * 32)} 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-slate-100 font-mono select-none">{activeStats.vulnerability}%</span>
                    <span className="text-[8px] text-blue-400 font-mono font-bold tracking-widest select-none uppercase">VIÉS</span>
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Risco de Viés
                    </span>
                    <span className="p-1 px-1.5 rounded text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-bold">
                      👥 DEVIATION
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans mt-1">
                    Nível de impacto do viés automatizado penalizando parcelas historicamente hipossuficientes.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Grid: Left Column (Data Auditing & Bias Map) vs Right Column (Tribunal Session / Live Council) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (40% width on wide displays) */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Data Auditing Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 mb-4 font-sans uppercase tracking-wider">
                    <Database size={16} className="text-blue-400" />
                    Mapa de Dados e Inconsistências
                  </h3>
                  
                  <div className="space-y-3 text-xs">
                    {activeCase.dados && activeCase.dados.length > 0 ? (
                      activeCase.dados.map((d, index) => {
                        let statusColor = "bg-slate-800 text-slate-400 border-slate-700";
                        if (d.status === "ok") statusColor = "bg-emerald-950/60 text-emerald-400 border-emerald-900/50";
                        if (d.status === "warn") statusColor = "bg-amber-950/60 text-amber-400 border-amber-900/50";
                        if (d.status === "bad") statusColor = "bg-red-950/60 text-red-400 border-red-900/50";

                        return (
                          <div key={index} className="p-3 bg-slate-950/40 border border-slate-900 rounded-lg flex justify-between items-start gap-3">
                            <div>
                              <p className="font-semibold text-slate-200">{d.campo}</p>
                              <span className="text-[10px] text-slate-500 font-mono">Fonte: {d.fonte}</span>
                            </div>
                            <span className={`px-2 py-0.5 text-[10px] font-mono leading-tight border rounded-full ${statusColor} shrink-0`}>
                              {d.statusLabel}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-slate-500 italic">Nenhum mapeamento de variáveis estruturado.</p>
                    )}
                  </div>
                </div>

                {/* Bias Indicator Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 mb-4 font-sans uppercase tracking-wider">
                    <TrendingUp size={16} className="text-rose-400" />
                    Risco de Viés Estatístico Estimado
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-4 leading-relaxed font-sans">
                    Demonstração de taxas de erro indireto decorrentes da carência de dados locais, penalizando faixas de vulnerabilidade.
                  </p>
                  
                  <div className="space-y-3.5 border-b border-slate-800 pb-5">
                    {activeCase.vieses && activeCase.vieses.length > 0 ? (
                      activeCase.vieses.map((v, index) => {
                        let fillAccent = "bg-blue-500";
                        if (v.nivel === "high") fillAccent = "bg-rose-500";
                        if (v.nivel === "med") fillAccent = "bg-amber-500";
                        if (v.nivel === "low") fillAccent = "bg-emerald-500";

                        return (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-slate-300 font-medium">{v.label}</span>
                              <span className="font-mono text-slate-500 text-[11px]">{v.valor}%</span>
                            </div>
                            <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800/50">
                              <div className={`h-full ${fillAccent} rounded-full transition-all duration-500`} style={{ width: `${v.valor}%` }} />
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-slate-500 italic">Não há indicadores de viés computados.</p>
                    )}
                  </div>

                  {/* Histórico Comparativo de Viés por Município */}
                  <div className="pt-4 space-y-2">
                    <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider flex items-center gap-1.5">
                      <BarChart2 size={13} className="text-teal-400" strokeWidth={2.5} />
                      Histórico e Evolução por Município
                    </h4>
                    <p className="text-[10.5px] text-slate-400 leading-normal font-sans">
                      Taxas históricas reais auditadas no rito do conselho. Clique nas abas abaixo para alternar o tipo de viés sob análise:
                    </p>
                    <BiasHistoricalChart />
                  </div>
                </div>

                {/* Seção do Observatório de Abusos Algorítmicos */}
                <ReportAbuseForm />

              </div>

              {/* Right Column / Live Session (80% width or 7/12 area) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* Deliberative Council Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                  
                  {/* Session Header */}
                  <div className="p-5 border-b border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-amber-500 font-mono text-[10px] uppercase font-bold tracking-widest">
                        <Users size={12} />
                        Colegiado Universitário extraordinário
                      </div>
                      <h3 className="text-base font-bold text-white font-sans mt-0.5">
                        Deliberações Administrativas
                      </h3>
                    </div>

                    {/* Stage selector (Phases) */}
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto shrink-0 font-mono text-[10px]">
                      <button 
                        onClick={() => setSessionPhase(1)}
                        className={`px-2.5 py-1.5 rounded-md font-medium transition ${sessionPhase === 1 ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-100"}`}
                      >
                        1. Pareceres
                      </button>
                      <button 
                        onClick={() => setSessionPhase(2)}
                        className={`px-2.5 py-1.5 rounded-md font-medium transition ${sessionPhase === 2 ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-100"}`}
                      >
                        2. Cruzada
                      </button>
                      <button 
                        onClick={() => setSessionPhase(3)}
                        className={`px-2.5 py-1.5 rounded-md font-medium transition ${sessionPhase === 3 ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-100"}`}
                      >
                        3. Acórdão
                      </button>
                    </div>
                  </div>

                  {/* Rendering Active Phase */}
                  <div className="p-6">
                    {sessionPhase === 1 && (
                      <div className="space-y-6">
                        <div className="p-3.5 bg-blue-950/20 border border-blue-900/30 text-blue-300 rounded-lg text-xs leading-relaxed flex gap-2.5 font-mono">
                          <Info size={16} className="shrink-0 mt-0.5 text-blue-400" />
                          <span>Fase d'Assentada: Interaja com o Colegiado abaixo. Clique nas cadeiras da Mesa de Deliberação para inspecionar os pareceres individuais oficiais e assinar as petições conjuntamente.</span>
                        </div>

                        {/* Interactive Courthouse Roundtable Visual Console */}
                        <div className="relative p-5 bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800/85 rounded-2xl overflow-hidden shadow-inner">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-500/5 blur-3xl rounded-full pointer-events-none" />
                          
                          {/* Section Title */}
                          <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-5">
                            <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
                              Mesa Consultiva de Votação (Clique p/ Selecionar Conselheiro)
                            </span>
                            <span className="text-[9.5px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800/50">
                              Quórum: 4/4 Conselheiros Ativos
                            </span>
                          </div>

                          {/* Chambers layout */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
                            {BOARD_PERSONAS.map((person) => {
                              const isSelected = activeCounselorId === person.id;
                              const isSubscribed = endorsedOpinions[person.id];
                              
                              let themeColor = "border-emerald-500/40 text-emerald-400 bg-emerald-950/20";
                              if (person.id === "clara_santos") themeColor = "border-blue-500/40 text-blue-400 bg-blue-950/20";
                              if (person.id === "ricardo_hahn") themeColor = "border-amber-500/40 text-amber-400 bg-amber-950/20";
                              if (person.id === "arnaldo_rocha") themeColor = "border-rose-500/40 text-rose-400 bg-rose-950/20";

                              return (
                                <button
                                  key={person.id}
                                  onClick={() => setActiveCounselorId(person.id)}
                                  className={`p-3 rounded-xl border transition-all duration-300 text-left relative flex flex-col justify-between h-32 select-none ${
                                    isSelected 
                                      ? "bg-slate-900 ring-2 ring-amber-500/60 shadow-[0_4px_20px_rgba(245,158,11,0.1)] border-amber-500/80 scale-[1.02]" 
                                      : "bg-slate-950/50 border-slate-900 hover:border-slate-800 hover:bg-slate-950/90"
                                  }`}
                                >
                                  {/* Active Spotlight Effect */}
                                  {isSelected && (
                                    <span className="absolute top-1 right-2 flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                    </span>
                                  )}

                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xl">{person.avatar}</span>
                                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-mono font-bold uppercase tracking-wider ${themeColor}`}>
                                        Assento {person.id === "lucas_mendes" ? "01" : person.id === "clara_santos" ? "02" : person.id === "ricardo_hahn" ? "03" : "04"}
                                      </span>
                                    </div>
                                    <h4 className="text-xs font-black text-slate-100 font-sans tracking-tight block truncate">
                                      {person.name}
                                    </h4>
                                    <p className="text-[9px] text-slate-400 font-mono tracking-tight leading-normal h-6 line-clamp-2">
                                      {person.role}
                                    </p>
                                  </div>

                                  <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[8px] font-mono">
                                    <span className="text-slate-500">Voto Concluído</span>
                                    {isSubscribed ? (
                                      <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                                        ✓ SUB-ASSINADO
                                      </span>
                                    ) : (
                                      <span className="text-amber-500/70">CLIQUE P/ PARECER</span>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {/* Desktop graphical round table connector graphic */}
                          <div className="hidden md:flex justify-stretch items-center gap-1.5 mt-5 px-10">
                            <div className="h-[1.5px] bg-gradient-to-r from-transparent to-slate-800 flex-1" />
                            <div className="p-1 px-3 bg-slate-950 border border-slate-800 rounded-full text-[8.5px] text-slate-400 font-mono tracking-wider text-center flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                              Mesa de Deliberações do Supremo Colegiado
                            </div>
                            <div className="h-[1.5px] bg-gradient-to-l from-transparent to-slate-800 flex-1" />
                          </div>
                        </div>

                        {/* Rendering Expanded Counselors Dossier styled as an official court decree */}
                        {(() => {
                          const activePerson = BOARD_PERSONAS.find(p => p.id === activeCounselorId) || BOARD_PERSONAS[0];
                          const isSubscribed = endorsedOpinions[activePerson.id];
                          const opKeys = {
                            lucas_mendes: activeCase.personas.defensoria,
                            clara_santos: activeCase.personas.cientista,
                            ricardo_hahn: activeCase.personas.admin,
                            arnaldo_rocha: activeCase.personas.cidadao
                          };
                          const opinionText = opKeys[activePerson.id as keyof typeof opKeys] || "Nenhum parecer disponível.";

                          let deptTitle = "PROCURADORIA GERAL DA UNIÃO DE DIREITOS INDIVIDUAIS";
                          let dossierSeal = "⚖️ DPU-1";
                          let signatureName = "Lucas Mendes de Oliveira Salles";
                          let sealColor = "border-emerald-500/30 text-emerald-400 bg-emerald-950/25";
                          
                          if (activePerson.id === "clara_santos") {
                            deptTitle = "DEPARTAMENTO DE ENGENHARIA DE SOFTWARE E AUDITORIA MATEMÁTICA";
                            dossierSeal = "📊 LAB-AUDIT";
                            signatureName = "Profª Dra. Clara Heloísa Santos";
                            sealColor = "border-blue-500/30 text-blue-400 bg-blue-950/25";
                          } else if (activePerson.id === "ricardo_hahn") {
                            deptTitle = "SECRETARIA ESPECIAL DE LEGALIDADE E PROVIMENTO ADMINISTRATIVO";
                            dossierSeal = "🏢 SGP-LEG";
                            signatureName = "Dr. Ricardo Guilherme Hahn";
                            sealColor = "border-amber-500/30 text-amber-400 bg-amber-950/25";
                          } else if (activePerson.id === "arnaldo_rocha") {
                            deptTitle = "COMISSÃO REPRESENTATIVA DE DEFESA DOS USUÁRIOS CIVIS";
                            dossierSeal = "👥 SOC-CIV";
                            signatureName = "Conselheiro Arnaldo Alves da Rocha";
                            sealColor = "border-rose-500/30 text-rose-400 bg-rose-950/25";
                          }

                          return (
                            <motion.div
                              key={activePerson.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
                            >
                              {/* Dossier Watermark */}
                              <div className="absolute -bottom-12 -right-12 text-slate-800/10 text-[110px] select-none font-bold">
                                ASSENTADA
                              </div>

                              {/* Dossier Header */}
                              <div className="border-b border-slate-800 pb-5 mb-5">
                                <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">
                                  Documento Público Certificado • Assentada de Voto
                                </span>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1.5">
                                  <div>
                                    <span className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest font-black block">
                                      {deptTitle}
                                    </span>
                                    <h4 className="text-sm font-extrabold text-white mt-1">
                                      PARECER TÉCNICO-ADMINISTRATIVO • ID {activePerson.id.toUpperCase()}-26
                                    </h4>
                                  </div>
                                  <span className={`self-start sm:self-auto px-2.5 py-1 rounded text-[10px] font-mono font-bold border ${sealColor}`}>
                                    {dossierSeal}
                                  </span>
                                </div>
                              </div>

                              {/* Core Content Layout resembling real judicial statement */}
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="space-y-4 md:col-span-1 border-r border-slate-800/80 pr-4 md:block hidden font-mono text-[10px] text-slate-400">
                                  <div className="space-y-1">
                                    <span className="text-slate-500 block uppercase">Eixo Temático:</span>
                                    <span className="text-slate-300 font-sans leading-normal block font-semibold">{activePerson.axis}</span>
                                  </div>
                                  <div className="space-y-1 pt-3 border-t border-slate-950">
                                    <span className="text-slate-500 block uppercase">Tese Defendida:</span>
                                    <span className="text-slate-300 font-sans leading-normal block">Prevalência do letramento e dignidade humana contra a burocracia do robô opaco.</span>
                                  </div>
                                </div>

                                <div className="md:col-span-3 space-y-4">
                                  <div className="bg-slate-950/40 border border-slate-950 rounded-xl p-4 border-l-2 border-amber-500">
                                    <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium whitespace-pre-line italic">
                                      "{opinionText}"
                                    </p>
                                  </div>

                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-950 text-[10.5px]">
                                    <div className="space-y-0.5">
                                      <span className="text-slate-500 font-mono text-[9px] block">Doutrina e Precedente de Apoio:</span>
                                      <span className="text-slate-300 font-sans max-w-sm block leading-normal leading-relaxed">
                                        Fundamenta-se em estudos acadêmicos correlacionados a <strong className="text-slate-200 font-sans font-medium">{activePerson.reference}</strong>.
                                      </span>
                                    </div>

                                    {/* Action button to endorse opinion with signature effect */}
                                    <button
                                      onClick={() => toggleEndorsement(activePerson.id)}
                                      className={`px-3.5 py-2 rounded-lg font-mono font-bold text-[11px] select-none transition-all duration-300 shrink-0 flex items-center gap-1.5 border border-l-2 ${
                                        isSubscribed
                                          ? "bg-emerald-950/80 text-emerald-400 border-emerald-500 shadow-md scale-95"
                                          : "bg-slate-950 text-slate-300 border-slate-800 hover:border-amber-500/70 hover:text-white"
                                      }`}
                                    >
                                      {isSubscribed ? (
                                        <>
                                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                                          PARECER SUB-ASSINADO
                                        </>
                                      ) : (
                                        <>
                                          <span className="h-2 w-2 rounded-full bg-amber-500" />
                                          ASSINAR EM CONJUNTO
                                        </>
                                      )}
                                    </button>
                                  </div>

                                  {/* Formal Signature representation */}
                                  <div className="flex flex-col items-end pt-3 border-t border-slate-950/50">
                                    <span className="text-[14px] text-teal-400 font-serif font-semibold italic opacity-85">
                                      {signatureName}
                                    </span>
                                    <span className="text-[8px] text-slate-500 font-mono mt-0.5 uppercase tracking-wider block">
                                      Assinado eletronicamente via sistema SEI/Conselho Extraordinário-26
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })()}
                      </div>
                    )}

                    {sessionPhase === 2 && (
                      <div className="space-y-6">
                        <div className="p-3 bg-amber-950/20 border border-amber-900/30 text-amber-300 rounded-lg text-xs leading-relaxed flex gap-2 font-mono">
                          <Info size={16} className="shrink-0 mt-0.5" />
                          <span>Fase 2: Votação anônima cruzada simulada. Conselheiros definem quem melhor salvaguardou a dignidade do indivíduo.</span>
                        </div>

                        {/* Ranking Board */}
                        <div className="bg-slate-950/80 border border-slate-900 rounded-xl p-5 space-y-4">
                          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">
                            Ranking Consolidado da Sessão
                          </h4>
                          
                          <div className="space-y-2 font-sans text-xs">
                            {activeCase.rankings && activeCase.rankings.length > 0 ? (
                              activeCase.rankings.map((rank, idx) => (
                                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-900/30 border border-slate-900 rounded-lg">
                                  <div className="flex items-center gap-2.5">
                                    <span className="h-6 w-6 rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold font-mono text-xs flex items-center justify-center">
                                      #{rank.pos}
                                    </span>
                                    <div>
                                      <p className="font-semibold text-slate-300">{rank.name}</p>
                                      <p className="text-[10px] text-slate-500 italic mt-0.5">{rank.comment}</p>
                                    </div>
                                  </div>
                                  <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-2 py-1 rounded">
                                    Pontuação Média: {rank.score}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <p className="text-slate-500 italic">Ranking em elaboração.</p>
                            )}
                          </div>
                        </div>

                        {/* Critique statements */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-950/30 border border-slate-900 rounded-xl text-xs space-y-2">
                            <span className="text-[9px] font-mono uppercase font-bold text-emerald-400">Dr. Lucas mendes avalia:</span>
                            <p className="text-slate-400 italic font-serif">
                              "O parecer de Dados (Clara) traz precisão fática preciosa, mas o de Gestão (Ricardo) arrisca rebaixar direitos por teses utilitaristas de escala fiscal, o que rejeito."
                            </p>
                          </div>
                          <div className="p-4 bg-slate-950/30 border border-slate-900 rounded-xl text-xs space-y-2">
                            <span className="text-[9px] font-mono uppercase font-bold text-blue-400">Profª Clara santos avalia:</span>
                            <p className="text-slate-400 italic font-serif">
                              "O parecer jurídico (Lucas) consubstancia perfeitamente o vício do contraditório, embora eu reforce que a ausência de vistoria valida a falha na qualidade de dados de treino."
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {sessionPhase === 3 && (
                      <div className="space-y-6">
                        {/* Acórdão Header */}
                        <div className="text-center py-4 border-b border-slate-800">
                          <span className="text-amber-500 font-mono text-xs uppercase tracking-widest block font-bold">
                            Tribunal de Contestabilidade Algorítmica
                          </span>
                          <h4 className="text-xl font-serif text-white mt-1">
                            <ExplainableTerm term="acórdão">Acórdão</ExplainableTerm> de Julgamento Coletivo
                          </h4>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Documento Acadêmico · Emissão de Nulidade Administrativa
                          </span>
                        </div>

                        {/* Acórdão Elements */}
                        <div className="space-y-5 text-xs font-sans text-slate-300">
                          
                          <div className="space-y-1 bg-slate-950/40 p-3.5 rounded-lg border border-slate-900">
                            <h5 className="font-mono uppercase text-amber-500 text-[10px] font-bold tracking-widest">
                              1. Síntese do Julgado
                            </h5>
                            <p className="text-slate-300 leading-relaxed font-sans">
                              {activeCase.final.sintese}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <h5 className="font-mono uppercase text-slate-400 text-[10px] font-bold tracking-widest">
                              2. Consenso Técnico-Jurídico
                            </h5>
                            <p className="text-slate-400 leading-relaxed">
                              {activeCase.final.consenso}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <h5 className="font-mono uppercase text-slate-400 text-[10px] font-bold tracking-widest">
                              3. Dissenso no Colegiado
                            </h5>
                            <p className="text-slate-400 leading-relaxed">
                              {activeCase.final.dissenso}
                            </p>
                          </div>

                          <div className="space-y-1 bg-slate-950/40 p-3.5 rounded-lg border border-slate-900">
                            <h5 className="font-mono uppercase text-slate-400 text-[10px] font-bold tracking-widest flex items-center gap-1">
                              4. <ExplainableTerm term="dogmática">Fundamentação e Dogmática Jurídica</ExplainableTerm>
                            </h5>
                            <p className="text-slate-300 leading-relaxed font-sans text-xs mt-1">
                              {activeCase.final.fundamentacao}
                            </p>
                          </div>

                          <div className="space-y-1">
                            <h5 className="font-mono uppercase text-amber-500 text-[10px] font-bold tracking-widest">
                              5. Dispositivo & Recomendações
                            </h5>
                            <div className="text-slate-300 space-y-2 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-900">
                              {activeCase.final.recomendacao.split('\n').map((bullet, bIdx) => (
                                <p key={bIdx} className="flex items-start gap-1.5 leading-relaxed text-slate-300">
                                  <span className="text-amber-500 mt-1 shrink-0">▸</span>
                                  <span>{bullet.trim()}</span>
                                </p>
                              ))}
                            </div>
                          </div>

                          {/* Compliance state alert */}
                          <div className="p-4 bg-red-950/25 border-l-4 border-red-500 text-red-300 rounded-r-lg">
                            <div className="flex items-center gap-2 font-mono text-xs uppercase font-bold text-red-400">
                              <ShieldAlert size={16} />
                              alerta de conformidade estatal
                            </div>
                            <p className="mt-1 font-serif text-slate-400 leading-relaxed text-xs">
                              {activeCase.final.alerta}
                            </p>
                          </div>

                        </div>
                      </div>
                    )}

                  </div>

                </div>

                {/* Minutas de Resistência / Documents Section */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white font-sans flex items-center gap-2">
                        <FileCheck size={18} className="text-amber-400" />
                        Minutas de Resistência Administrativa
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Utilize estas minutas pré-formuladas e fustigue os desmandos burocráticos eletrônicos.
                      </p>
                    </div>

                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto font-mono text-[9px]">
                      <button 
                        onClick={() => setActiveDocTab("recurso")}
                        className={`px-3 py-1.5 rounded-md font-medium transition ${activeDocTab === "recurso" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold" : "text-slate-500 hover:text-slate-300"}`}
                      >
                        Recurso Anulando Falso Positivo
                      </button>
                      <button 
                        onClick={() => setActiveDocTab("lai")}
                        className={`px-3 py-1.5 rounded-md font-medium transition ${activeDocTab === "lai" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold" : "text-slate-500 hover:text-slate-300"}`}
                      >
                        Requisição de Algoritmo (LAI)
                      </button>
                    </div>
                  </div>

                  {/* Document preview block */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-950 px-4 py-2 border-t border-x border-slate-800 rounded-t-xl text-[10px] text-slate-500 font-mono">
                      <span>{activeDocTab === "recurso" ? "RECURSO-ANULACAO-DRAFT.txt" : "SOLICITACAO-LAI-DRAFT.txt"}</span>
                      <button 
                        onClick={() => handleCopyText(activeDocTab === "recurso" ? activeCase.final.minutaRecurso : activeCase.final.pedidoLAI)}
                        className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:text-white rounded transition"
                      >
                        {copiedText ? (
                          <>
                            <Check size={12} className="text-emerald-400 font-bold" />
                            <span className="text-emerald-400 font-bold">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copiar Minuta</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="font-mono text-xs bg-slate-950 text-slate-300 p-5 rounded-b-xl border-b border-x border-slate-800 h-[220px] overflow-y-auto leading-relaxed whitespace-pre-line select-all scrollbar-thin">
                      {activeDocTab === "recurso" ? activeCase.final.minutaRecurso : activeCase.final.pedidoLAI}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Citizen Interactive Defenses & Empowerment Tool */}
        <CitizenToolbox />

        {/* Laboratório Digital de Contestação Qualitativa (Calculadora de Impacto Interativa) */}
        <div className="w-full">
          <AlgorithmicSeverityCalculator />
        </div>

        {/* Interactive Step-by-Step User Tutorial */}
        <InteractiveTutorial 
          sessionPhase={sessionPhase} 
          setSessionPhase={setSessionPhase} 
          scrollToAnchor={scrollToAnchor} 
        />

        {/* Laboratório Avançado de Doutorado & Simulação de Crises Regulatórias */}
        <DoctoralLab />

        {/* Educative Section */}
        <EducativeFramework />

        {/* Dynamic Democratic Tension Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
              <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">
                Eficiência Administrativa
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                O Estado promove o processamento digital ágil que extingue filas e economiza papel físico. Contudo, sem acompanhamento e transparência, o e-gov flerta com o totalitarismo burocrático, gerando o isolamento e anulação processual automática.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
              <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest font-mono">
                Dignidade & Exclusão Digital
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Portais fechados que forçam o necessitado de baixa renda ao celular pré-pago inadequado sem computador, excluindo de fato dezenas de milhões de cidadãos que não possuem conectividade significativa no interior do país.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
              <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest font-mono">
                O Custo da Litigância Reversa
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                A automatização 'cega' que não prevê salvaguardas e callbacks de revisão humana força a judicialização de contestações em massa pela Defensoria Pública. O erário consome o quádruplo de recursos do contribuinte no Judiciário judicializando contencioso social desnecessário.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Academic Citation Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-xs text-slate-500 font-mono mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
          <p className="leading-relaxed">
            © 2026 Conselho de Contestação Algorítmica · Seminário VIII PPGD/UFSC.
          </p>
          <p className="mt-2 sm:mt-0 italic">
            Co-Apresentação: Ana Vitória Vanzin & Vinícius Oliveira.
          </p>
        </div>
      </footer>

    </div>
  );
}
