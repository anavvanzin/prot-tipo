import React, { useState } from "react";
import { 
  AlertTriangle, 
  Send, 
  Sparkles, 
  FileText, 
  FolderCheck, 
  Hash, 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  Loader2, 
  Info,
  Clock,
  ShieldAlert,
  MapPin,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ExplainableTerm from "./ExplainableTerm";

interface CommunityCase {
  id: string;
  initials: string;
  city: string;
  systemType: string;
  description: string;
  date: string;
  status: "Pendente" | "Processado" | "Em Auditoria";
  hash: string;
}

const PRESET_COMMUNITY_CASES: CommunityCase[] = [
  {
    id: "com-1",
    initials: "M. S. O.",
    city: "Juazeiro (CE)",
    systemType: "Bolsa Família (Cruzamento de CPF)",
    description: "Bloqueio unilateral sob falsa presunção de que o titular da conta recebia auxílio concomitante, confundido pelo robô com o CPF do falecido ex-marido.",
    date: "2026-05-20",
    status: "Em Auditoria",
    hash: "0d5a3ef20a2ccaa964b3c76b709cf88ef39da7cc14c0a59ffd09e2cf3da7d9eb"
  },
  {
    id: "com-2",
    initials: "J. P. N.",
    city: "Salvador (BA)",
    systemType: "Vigilância Facial (Segurança)",
    description: "Alarme falso disparado em estação de metrô devido ao algoritmo ter confundido sua imagem com procurado de pele e traços semelhantes (Viés Racial de Câmera).",
    date: "2026-05-18",
    status: "Processado",
    hash: "f4b00869a1bcf91b29a65d781b0fefcb4829fa2aabcf739b8fae7ea18b5ef213"
  }
];

export default function ReportAbuseForm() {
  const [cases, setCases] = useState<CommunityCase[]>(PRESET_COMMUNITY_CASES);
  
  // Form fields
  const [initials, setInitials] = useState("");
  const [city, setCity] = useState("Salvador (BA)");
  const [systemType, setSystemType] = useState("Previdência (Meu INSS)");
  const [description, setDescription] = useState("");
  const [customSystem, setCustomSystem] = useState("");
  const [fileAttached, setFileAttached] = useState<string | null>(null);
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<CommunityCase | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileAttached(e.dataTransfer.files[0].name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileAttached(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!initials.trim() || !description.trim()) return;

    setIsSubmitting(true);
    
    // Simulate auditing blockchain/database registration overhead
    setTimeout(() => {
      const finalSystem = systemType === "Outro" ? (customSystem || "Sistema Automatizado") : systemType;
      
      const newReport: CommunityCase = {
        id: `com-${Date.now()}`,
        initials: initials.toUpperCase().slice(0, 10),
        city,
        systemType: finalSystem,
        description,
        date: new Date().toISOString().split("T")[0],
        status: "Pendente",
        // Simulated SHA-256 Protocol hash
        hash: Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join("")
      };

      setCases([newReport, ...cases]);
      setIsSubmitting(false);
      setSuccessMessage(newReport);

      // Reset form
      setInitials("");
      setDescription("");
      setCustomSystem("");
      setFileAttached(null);
    }, 1800);
  };

  const handleDeleteCase = (id: string) => {
    setCases(cases.filter(c => c.id !== id));
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-6" id="report-abuse-section">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 text-amber-500 font-mono text-[10px] uppercase font-bold tracking-widest">
          <ShieldAlert size={14} className="text-amber-500" />
          Mecanismo de Escuta Social
        </div>
        <h3 className="text-sm font-bold text-white font-sans mt-0.5 flex items-center gap-1.5">
          Observatório de Abusos Algorítmicos
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed font-sans">
          Catalogação pública autônoma. Reporte incidentes robóticos para fortalecer a fiscalização de IA no <ExplainableTerm term="erário" /> e exigir o <ExplainableTerm term="contraditório" />.
        </p>
      </div>

      {/* Form or Success Block */}
      <AnimatePresence mode="wait">
        {successMessage ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-4 bg-teal-950/25 border border-teal-700/40 rounded-xl space-y-3.5"
          >
            <div className="flex gap-2 items-start">
              <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={18} />
              <div>
                <h4 className="text-xs font-bold text-teal-300 font-sans">Caso de Abuso Autuado com Sucesso</h4>
                <p className="text-[10.5px] text-slate-400 mt-0.5 leading-normal">
                  Seu relato foi inserido anonimizadamente no banco público e submetido aos parâmetros do <ExplainableTerm term="artigo 20 da LGPD" />.
                </p>
              </div>
            </div>

            {/* Protocol certificate box */}
            <div className="bg-slate-950 border border-slate-900/80 p-3 rounded-lg space-y-2 text-[10.5px] font-mono">
              <div className="flex justify-between border-b border-slate-900 pb-1 text-slate-400 text-[10px]">
                <span>PROTOCOLO DE SEGURANÇA:</span>
                <span className="text-teal-400 font-bold">REGISTRADO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Relator(a):</span>
                <span className="text-slate-350 font-bold">{successMessage.initials}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Município / Local:</span>
                <span className="text-slate-350">{successMessage.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sistema Denunciado:</span>
                <span className="text-slate-350 tracking-tight block max-w-[180px] text-right truncate">{successMessage.systemType}</span>
              </div>
              <div className="text-[9px] text-slate-500 pt-1.5 border-t border-slate-900/60 overflow-hidden text-ellipsis whitespace-nowrap">
                <Hash size={9} className="inline mr-1 text-amber-500 pb-0.5" />
                {successMessage.hash}
              </div>
            </div>

            <button
              onClick={() => setSuccessMessage(null)}
              className="w-full text-center py-1.5 bg-teal-900/30 hover:bg-teal-900/50 text-teal-300 border border-teal-800 rounded-lg text-xs font-medium transition"
            >
              Reportar Outro Incidente
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-4 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Initials and City */}
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-slate-400 font-medium mb-1 uppercase text-[9px] font-mono tracking-wider">
                  Iniciais ou Nome Curto
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: M. O. S."
                  maxLength={15}
                  value={initials}
                  onChange={(e) => setInitials(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1 uppercase text-[9px] font-mono tracking-wider">
                  Município de Ocorrência
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="Salvador (BA)">Salvador (BA)</option>
                  <option value="Recife (PE)">Recife (PE)</option>
                  <option value="Brasília (DF)">Brasília (DF)</option>
                  <option value="São Paulo (SP)">São Paulo (SP)</option>
                  <option value="Juazeiro (CE)">Juazeiro (CE)</option>
                  <option value="Porto Alegre (RS)">Porto Alegre (RS)</option>
                  <option value="Belo Horizonte (MG)">Belo Horizonte (MG)</option>
                </select>
              </div>
            </div>

            {/* System select type */}
            <div>
              <label className="block text-slate-400 font-medium mb-1 uppercase text-[9px] font-mono tracking-wider">
                Sistema ou Órgão Responsável
              </label>
              <select
                value={systemType}
                onChange={(e) => setSystemType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="Previdência (Meu INSS)">Meu INSS (Deferimento Automático)</option>
                <option value="Cadastro Único (Bolsa Família)">Cadastro Único / Bolsa Família (Corte de Robô)</option>
                <option value="Reconhecimento Facial (SSP)">Câmeras Inteligentes (Reconhecimento de Segurança)</option>
                <option value="Triagem Tributária (Receita Federal)">Triagem do Fisco (Malha Fina Robótica)</option>
                <option value="Detran (Processamento de Multas)">Detran (Notificação e Bloqueio s/ Contraditório)</option>
                <option value="Outro">Outro Sistema Estatal / Municipal</option>
              </select>
            </div>

            {systemType === "Outro" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  required
                  placeholder="Especifique qual órgão ou sistema automatizado..."
                  value={customSystem}
                  onChange={(e) => setCustomSystem(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-200 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </motion.div>
            )}

            {/* Incident description */}
            <div>
              <label className="block text-slate-400 font-medium mb-1 uppercase text-[9px] font-mono tracking-wider">
                Descrição Sucinta da Inconsistência ou Bloqueio
              </label>
              <textarea
                required
                rows={3}
                placeholder="Explique resumidamente qual erro o computador ou cruzamento automático do governo cometeu e como isso afetou sua vida..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-normal"
              />
            </div>

            {/* Custom file mock upload area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border border-dashed rounded-lg p-3 text-center transition ${
                isDragging 
                  ? "border-amber-500 bg-amber-500/5" 
                  : fileAttached 
                    ? "border-emerald-500/50 bg-emerald-505/5" 
                    : "border-slate-800 hover:border-slate-700 bg-slate-950/20"
              }`}
            >
              <label className="cursor-pointer block">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileInput}
                  accept=".pdf,.jpg,.jpeg,.png,.docx"
                />
                
                {fileAttached ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-400">
                    <FolderCheck size={16} />
                    <span className="font-mono text-[10px] tracking-tight truncate max-w-[200px]">{fileAttached}</span>
                    <span className="text-[9px] text-slate-500 underline font-sans ml-1">(Remover)</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload size={16} className="mx-auto text-slate-500" />
                    <p className="text-[10px] text-slate-400">
                      Solte as telas do erro ou comprovante de benefício aqui, ou <span className="text-amber-400 font-bold underline">navegue</span>
                    </p>
                    <p className="text-[8px] text-slate-500 uppercase font-mono">Suporta PDF, JPG, PNG até 5MB</p>
                  </div>
                )}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-gradient-to-r from-amber-600 to-amber-505 hover:from-amber-500 hover:to-amber-450 text-slate-950 font-bold rounded-lg transition duration-150 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={13} className="animate-spin text-slate-950" />
                  Autuando e Autenticando Relatório...
                </>
              ) : (
                <>
                  <Send size={13} className="text-slate-950" />
                  Submeter Denúncia ao Observatório Público
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Community Cases List Display */}
      <div className="pt-4 border-t border-slate-800/80">
        <h4 className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase mb-3 flex items-center gap-1.5">
          <Clock size={12} className="text-amber-500 animate-pulse" />
          Últimos Registros Auditados ({cases.length})
        </h4>

        <div className="space-y-3 max-h-72 overflow-y-auto pr-1 select-none scrollbar-thin">
          {cases.map((c) => (
            <div 
              key={c.id} 
              className="bg-gradient-to-r from-slate-950 to-slate-900/60 border border-slate-850/80 rounded-xl p-3.5 text-[11px] space-y-1.5 transition-all duration-300 hover:border-slate-700 hover:bg-slate-950 hover:shadow-lg relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-slate-800 group-hover:bg-amber-500 transition-colors duration-300" />
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="font-bold text-slate-200">{c.initials}</span>
                  <span className="text-[10px] text-slate-500 font-mono ml-1.5 flex inline-flex items-center gap-0.5">
                    <MapPin size={10} className="text-teal-500 shrink-0" />
                    {c.city}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className={`px-1.5 py-0.5 text-[8.5px] font-mono font-bold rounded ${
                    c.status === "Pendente" 
                      ? "bg-amber-950/70 text-amber-400 border border-amber-900/40" 
                      : c.status === "Em Auditoria"
                        ? "bg-blue-950/70 text-blue-400 border border-blue-900/40"
                        : "bg-emerald-950/70 text-emerald-400 border border-emerald-900/40"
                  }`}>
                    {c.status}
                  </span>
                  
                  <button 
                    onClick={() => handleDeleteCase(c.id)}
                    className="text-slate-600 hover:text-rose-450 transition p-0.5 rounded ml-1"
                    title="Remover denúncia (simulado)"
                  >
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>

              <div className="text-[10px] font-mono text-teal-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded-md inline-block">
                {c.systemType}
              </div>

              <p className="text-slate-400 leading-normal text-[10.5px]">
                {c.description}
              </p>

              <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono pt-1.5 border-t border-slate-900/40">
                <span>Registrado em: {c.date}</span>
                <span className="truncate max-w-[120px]" title={c.hash}>HASH: {c.hash.slice(0, 16)}...</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
