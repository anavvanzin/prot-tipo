import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CaseSelector from "./components/CaseSelector";
import InteractiveTutorial from "./components/InteractiveTutorial";
import CitizenToolbox from "./components/CitizenToolbox";
import EducativeFramework from "./components/EducativeFramework";
import ExplainableTerm from "./components/ExplainableTerm";
import BiasHistoricalChart from "./components/BiasHistoricalChart";
import ReportAbuseForm from "./components/ReportAbuseForm";
import AlgorithmicPipelineInfographic from "./components/AlgorithmicPipelineInfographic";
import AlgorithmicSeverityCalculator from "./components/AlgorithmicSeverityCalculator";
import DpoComplianceTracker from "./components/DpoComplianceTracker";
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
  
  // Custom generated document view: "recurso" | "lai"
  const [activeDocTab, setActiveDocTab] = useState<"recurso" | "lai">("recurso");
  const [copiedText, setCopiedText] = useState(false);

  const scrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* Upper Brand Header */}
      <Header apiKeyConfigured={apiKeyConfigured} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
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

            {/* Painel de Indicadores de Gravidade Geral (Severity indicators) */}
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
              className="grid grid-cols-1 sm:grid-cols-3 gap-5"
            >
              {/* Index Card 1 */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
                }}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-amber-500/40 hover:shadow-[0_4px_30px_rgba(245,158,11,0.04)] transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-3xl rounded-full" />
                <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Previsibilidade de Nulidade
                  </span>
                  <span className="p-1 px-1.5 rounded text-[8.5px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono font-bold">
                    ⚖️ ALTA CHANCE
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-amber-550 font-display bg-gradient-to-b from-white to-amber-200 bg-clip-text text-transparent">
                    {activeStats.annulProbability}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans font-medium">Expectativa de Êxito</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mt-3.5 border border-slate-800/80">
                  <div className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full transition-all duration-700" style={{ width: `${activeStats.annulProbability}%` }} />
                </div>
                <p className="text-[10.5px] text-slate-400 leading-normal mt-3 font-sans">
                  Avaliação estimada da procedência de eventual anulação judicial, amparada no rito e regras do Art. 5º (LV) da CF e premissas do conselho.
                </p>
              </motion.div>

              {/* Index Card 2 */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
                }}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-rose-500/40 hover:shadow-[0_4px_30px_rgba(239,68,68,0.04)] transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 blur-3xl rounded-full" />
                <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Coeficiente de Opacidade
                  </span>
                  <span className="p-1 px-1.5 rounded text-[8.5px] bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono font-bold">
                    ⚫ CAIXA PRETA
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-rose-455 font-display bg-gradient-to-b from-white to-rose-200 bg-clip-text text-transparent">
                    {activeStats.opacity}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans font-medium">Omissão de Auditoria</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mt-3.5 border border-slate-800/80">
                  <div className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-rose-400 rounded-full transition-all duration-700" style={{ width: `${activeStats.opacity}%` }} />
                </div>
                <p className="text-[10.5px] text-slate-400 leading-normal mt-3 font-sans">
                  Mapeia carência de revisão humana, vício de cruzamento cego de bases incompatíveis municipais/federais e processos decisórios robóticos opacos.
                </p>
              </motion.div>

              {/* Index Card 3 */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } }
                }}
                className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden group hover:border-blue-500/40 hover:shadow-[0_4px_30px_rgba(59,130,246,0.04)] transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-3xl rounded-full" />
                <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Inequalidade e Risco de Viés
                  </span>
                  <span className="p-1 px-1.5 rounded text-[8.5px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono font-bold">
                    👥 SOCIAL DEVIATION
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-blue-455 font-display bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent">
                    {activeStats.vulnerability}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans font-medium">Impacto Populacional</span>
                </div>
                <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mt-3.5 border border-slate-800/80">
                  <div className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full transition-all duration-700" style={{ width: `${activeStats.vulnerability}%` }} />
                </div>
                <p className="text-[10.5px] text-slate-400 leading-normal mt-3 font-sans">
                  Nível de impacto do viés automatizado penalizando idosos sem letramento eletrônico, mulheres gerentes solo ou moradores de moradias periféricas.
                </p>
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
                        <div className="p-3 bg-blue-950/30 border border-blue-900/30 text-blue-300 rounded-lg text-xs leading-relaxed flex gap-2 font-mono">
                          <Info size={16} className="shrink-0 mt-0.5" />
                          <span>Fase 1: Cada conselheiro opina sobre a validade com base rigorosa em suas referências de seminário.</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {BOARD_PERSONAS.map((person) => {
                            let avatarBg = "bg-emerald-950 border-emerald-900 text-emerald-400";
                            if (person.id === "clara_santos") avatarBg = "bg-blue-950 border-blue-900 text-blue-400";
                            if (person.id === "ricardo_hahn") avatarBg = "bg-amber-950 border-amber-900 text-amber-400";
                            if (person.id === "arnaldo_rocha") avatarBg = "bg-rose-950 border-rose-900 text-rose-400";

                            // opinion keys mapping
                            const opKeys = {
                              lucas_mendes: activeCase.personas.defensoria,
                              clara_santos: activeCase.personas.cientista,
                              ricardo_hahn: activeCase.personas.admin,
                              arnaldo_rocha: activeCase.personas.cidadao
                            };

                            const opinionText = opKeys[person.id as keyof typeof opKeys] || "Nenhum parecer emitido por esta persona técnica.";

                            return (
                              <div key={person.id} className="p-4 bg-slate-950/50 border border-slate-900 hover:border-slate-800 rounded-xl transition flex flex-col justify-between space-y-3">
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2.5">
                                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm ${avatarBg}`}>
                                      {person.avatar}
                                    </div>
                                    <div>
                                      <h4 className="text-xs font-bold text-white font-sans">{person.name}</h4>
                                      <p className="text-[9px] text-slate-400 tracking-wider uppercase font-mono">{person.role}</p>
                                    </div>
                                  </div>
                                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                                    {opinionText}
                                  </p>
                                </div>

                                <div className="pt-2 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                                  <span>Ref: {person.reference}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
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
                            <h5 className="font-mono uppercase text-slate-400 text-[10px] font-bold tracking-widest">
                              4. Fundamentação de Dogma
                            </h5>
                            <p className="text-slate-400 leading-relaxed font-mono text-[11px]">
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

        {/* Laboratório Digital de Contestação Qualitativa (Opções 1 e 3 selecionadas) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AlgorithmicSeverityCalculator />
          <DpoComplianceTracker />
        </div>

        {/* Interactive Step-by-Step User Tutorial */}
        <InteractiveTutorial 
          sessionPhase={sessionPhase} 
          setSessionPhase={setSessionPhase} 
          scrollToAnchor={scrollToAnchor} 
        />

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
