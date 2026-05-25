import React, { useState, useEffect } from "react";
import { 
  Send, 
  Loader2, 
  CheckCircle, 
  ShieldCheck, 
  Hourglass, 
  Users, 
  Copy, 
  Check, 
  Terminal, 
  ExternalLink,
  ChevronRight,
  Hash,
  AlertTriangle,
  Play
} from "lucide-react";
import { motion } from "motion/react";
import ExplainableTerm from "./ExplainableTerm";

interface DpoOrgan {
  id: string;
  name: string;
  dpoName: string;
  email: string;
  lawGround: string;
}

const ORGANS: DpoOrgan[] = [
  {
    id: "inss",
    name: "Encarregado Geral de Proteção de Dados - INSS",
    dpoName: "Dr. André Santos (Encarregado DPO)",
    email: "dpo@inss.gov.br",
    lawGround: "Art. 20, § 1º da LGPD combinada com a IN-INSS nº 121"
  },
  {
    id: "ssp",
    name: "Coordenadoria Temática de IA - Secretaria de Segurança Pública (SSP)",
    dpoName: "Dra. Mariana Costa (Gestora Geral DPO)",
    email: "lgpd.ssp@estado.gov.br",
    lawGround: "Art. 20 da LGPD sob escrutínio da ANPD e rito do devido processo administrativo municipal"
  },
  {
    id: "prefeitura",
    name: "Comitê de Governança Fiscal - Prefeitura Municipal",
    dpoName: "Consultor Técnico Geral (DPO Municipal)",
    email: "ouvidoria.lgpd@prefeitura.gov.br",
    lawGround: "Art. 20 da LGPD c/c Instrução Normativa Tributária nº 45"
  }
];

export default function DpoComplianceTracker() {
  const [selectedOrganId, setSelectedOrganId] = useState(ORGANS[0].id);
  const [citizenName, setCitizenName] = useState("");
  const [incidentDetails, setIncidentDetails] = useState("");
  
  // UI States
  const [isSending, setIsSending] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Dynamic dates
  const [generationDate, setGenerationDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [blockchainHash, setBlockchainHash] = useState("");

  const activeOrgan = ORGANS.find(o => o.id === selectedOrganId) || ORGANS[0];

  useEffect(() => {
    // Standard and law-regulated dates setup
    const today = new Date();
    const formattedToday = today.toLocaleDateString("pt-BR");
    
    // 15 business days roughly equivalent to 21 normal days
    const deadline = new Date();
    deadline.setDate(today.getDate() + 21);
    const formattedDeadline = deadline.toLocaleDateString("pt-BR");

    setGenerationDate(formattedToday);
    setExpiryDate(formattedDeadline);
  }, []);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citizenName.trim()) return;

    setIsSending(true);

    // Simulate safe API dispatch
    setTimeout(() => {
      // Simulate real cryptographic SHA signature
      const randomHash = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join("");
      setBlockchainHash(randomHash);
      setIsSending(false);
      setIsDispatched(true);
    }, 2200);
  };

  const handleGeneratePlea = () => {
    const nome = citizenName.trim() || "[Seu Nome Completo]";
    return `AO ENCARREGADO DE PROTEÇÃO DE DADOS (DPO)
ÓRGÃO: ${activeOrgan.name}
CONTATO DPO: ${activeOrgan.dpoName} (${activeOrgan.email})

REQUISIÇÃO FORMAL DE TRANSPARÊNCIA E AUDITORIA INDIVIDUAL
Base Legal: Artigo 20, Caput e § 1º da Lei Geral de Proteção de Dados (LGPD)

Prezado Encarregado,

Eu, ${nome}, na condição de titular dos dados e afetado direto por decisão puramente automatizada emitida pelo sistema computacional deste órgão, venho requerer a revisão humana e prestação de esclarecimentos cabíveis:

1. Objeto da Decisão Automatizada: Indeferimento unilateral fático embasado em modelos estatísticos ou correlacionamento frio de dados.
2. Fundamento na LGPD: O Artigo 20 consagra o meu direito de obter informações claras e inteligíveis a respeito dos critérios e dos procedimentos utilizados para a decisão automatizada.
3. Exigências Solicitadas:
   a) Identificação das variáveis de ponderação empregadas pela IA.
   b) Relatório de conformidade atestando se houve revisão de funcionário antes do ato administrativo desfavorável.
   c) Abertura de prazo regulamentar para contraprova e exercício de contraditório fático substancial.

Aguardamos dilação do decurso legal de 15 dias úteis estabelecidos sob pena de notificação formal ao conselho gestor da ANPD.

Submetido com data de: ${generationDate}
Protocolado sob a chancela da Contestabilidade Constitucional.`;
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(handleGeneratePlea());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl space-y-6" id="dpo-compliance-tracker">
      
      {/* Title */}
      <div className="border-b border-slate-800 pb-3">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#22c55e] flex items-center gap-1.5 font-bold">
          <ShieldCheck size={14} />
          Módulo Prático II: Defesa ao DPO
        </span>
        <h3 className="text-sm font-bold text-white font-sans mt-0.5">
          Gerador & Rastreador de Petições ao DPO (Art. 20 LGPD)
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed font-sans">
          Crie sua petição personalizada direcionada ao Encarregado de Proteção de Dados (<ExplainableTerm term="dpo" />) e simule o envio direto com monitoramento de prazos regulamentares da ANPD.
        </p>
      </div>

      {!isDispatched ? (
        <form onSubmit={handleDispatch} className="space-y-4 text-xs font-sans">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Citizen Name Field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Nome Completo do Afetado
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Maria de Fátima de Sousa"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              />
            </div>

            {/* Select Target Organ */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                Órgão Estatal Destinatário
              </label>
              <select
                value={selectedOrganId}
                onChange={(e) => setSelectedOrganId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
              >
                {ORGANS.map((organ) => (
                  <option key={organ.id} value={organ.id}>
                    {organ.name.slice(0, 48)}...
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* DPO Reference Info Preview */}
          <div className="bg-slate-950/50 border border-slate-955 p-3 rounded-lg text-[11px] leading-relaxed space-y-1">
            <p className="text-slate-500 font-mono text-[9px] uppercase tracking-wider">Dados Técnico de Endereçamento:</p>
            <p className="text-slate-300">
              <strong>Nome do DPO de Destino:</strong> {activeOrgan.dpoName}
            </p>
            <p className="text-slate-300">
              <strong>E-mail Corporativo LGPD:</strong> <span className="text-emerald-400 select-all font-mono">{activeOrgan.email}</span>
            </p>
            <p className="text-slate-350">
              <strong>Base de Efeito Legal:</strong> {activeOrgan.lawGround}
            </p>
          </div>

          {/* Optional Incident details */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Assunto Adicional (Opcional)
            </label>
            <input
              type="text"
              placeholder="Ex: Erro no cruzamento de dados de atividade rural CNIS"
              value={incidentDetails}
              onChange={(e) => setIncidentDetails(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 px-3 text-slate-200 placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
            />
          </div>

          {/* Visual Petition block before dispatch */}
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-slate-950 px-3 py-1.5 border-t border-x border-slate-800 rounded-t-lg text-[10px] text-slate-500 font-mono">
              <span>PETIÇÃO_DPO_CONTRA_IA.txt</span>
              <button
                type="button"
                onClick={handleCopyText}
                className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-300 hover:text-white hover:bg-slate-800 transition"
              >
                {copied ? <Check size={11} className="text-[#22c55e]" /> : <Copy size={11} />}
                {copied ? "Copiado!" : "Copiar Petição"}
              </button>
            </div>
            <div className="font-mono text-[10px] bg-slate-950 text-slate-400 p-3 rounded-b-lg border-b border-x border-slate-800 h-[110px] overflow-y-auto leading-normal whitespace-pre scrollbar-thin select-all">
              {handleGeneratePlea()}
            </div>
          </div>

          {/* Submission and Dispatch Action */}
          <button
            type="submit"
            disabled={isSending}
            className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-slate-950 font-bold rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSending ? (
              <>
                <Loader2 size={13} className="animate-spin text-slate-950" />
                Validando Protocolo e Assinando Digitalmente...
              </>
            ) : (
              <>
                <Send size={13} className="text-slate-950" />
                Despachar Protocolo ao Encarregado (Simulado)
              </>
            )}
          </button>

        </form>
      ) : (
        <div className="space-y-5">
          
          {/* Dispatch Certificate */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-555/40 rounded-2xl space-y-4 shadow-xl relative overflow-hidden group">
            {/* Glowing cyber dot indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2.5 py-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-[9px] font-mono font-bold text-emerald-400 tracking-wider">PROTOCOLADO</span>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shrink-0">
                <CheckCircle size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-emerald-300 font-sans">Notificação Administrativa Autuada!</h4>
                <p className="text-[10.5px] text-slate-400 leading-relaxed max-w-md font-sans">
                  A petição de retificação e explicações baseadas no Artigo 20 da LGPD foi devidamente expedida e enfileirada no painel de conciliação.
                </p>
              </div>
            </div>

            {/* Simulated Protocol Block */}
            <div className="bg-slate-950/90 border border-slate-800/80 p-4 rounded-xl space-y-2.5 text-[10.5px] font-mono">
              <div className="flex justify-between border-b border-slate-900 pb-1.5 text-slate-400 text-[10px] font-bold tracking-wider">
                <span>CERTIFICADO DIGITAL DE TRANSMISSÃO:</span>
                <span className="text-emerald-400 font-black">OK / SECURE_WS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-350">
                <div className="flex justify-between sm:justify-start gap-1">
                  <span className="text-slate-500">Protocolante:</span>
                  <span className="text-slate-200 font-semibold">{citizenName}</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-1">
                  <span className="text-slate-500">Prazo Estimado:</span>
                  <span className="text-emerald-400 font-bold">{expiryDate}</span>
                </div>
                <div className="flex justify-between sm:justify-start gap-1">
                  <span className="text-slate-500">Chancelamento DPO:</span>
                  <span className="text-slate-300 underline underline-offset-2 truncate max-w-[170px]">{activeOrgan.email}</span>
                </div>
                <div className="flex justify-between sm:justify-end gap-1">
                  <span className="text-slate-500">Rito Regulamentar:</span>
                  <span className="text-slate-300 font-bold">15 Dias Úteis</span>
                </div>
              </div>
              
              <div className="text-[9px] text-slate-500 pt-2 border-t border-slate-900/60 flex items-center justify-between gap-3 overflow-hidden">
                <div className="flex items-center gap-1.5 truncate">
                  <Hash size={12} className="text-emerald-500 shrink-0" />
                  <span className="select-all truncate text-[8.5px] font-mono text-slate-450">{blockchainHash}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(blockchainHash);
                    alert("Chave do protocolo copiada!");
                  }}
                  className="text-[9px] text-emerald-400 hover:text-emerald-300 font-sans hover:underline shrink-0"
                >
                  Copiar Protocolo
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Tracking Flow */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Terminal size={12} className="text-emerald-400" />
              Rastreamento de Trâmite de Controle
            </h4>

            {/* Horizontal Timeline cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              
              <div className="p-3 bg-slate-950 border border-emerald-950/50 rounded-lg text-left relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-emerald-500 w-full" />
                <span className="text-[8.5px] font-mono font-bold text-emerald-400 block mb-1">Passo 1</span>
                <p className="font-bold text-slate-200">Autuado</p>
                <p className="text-[10px] text-slate-550 mt-1 leading-tight">Canal de comunicação ao DPO inicializado.</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-left relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-blue-500/80 w-full animate-pulse" />
                <span className="text-[8.5px] font-mono font-bold text-blue-400 block mb-1">Passo 2</span>
                <p className="font-bold text-slate-200">Processado</p>
                <p className="text-[10px] text-slate-550 mt-1 leading-tight">Protocolado via WebHook regulamentar.</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-left relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 bg-amber-500/30 w-1/3" />
                <span className="text-[8.5px] font-mono font-bold text-slate-500 block mb-1">Passo 3</span>
                <p className="font-bold text-slate-400 flex items-center gap-1">
                  <Hourglass size={10} className="text-amber-500 animate-spin" />
                  Decurso Legal
                </p>
                <p className="text-[10px] text-slate-600 mt-1 leading-tight">Prazo correndo até o dia {expiryDate}.</p>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-900 rounded-lg text-left relative overflow-hidden opacity-60">
                <span className="text-[8.5px] font-mono font-bold text-slate-500 block mb-1">Passo 4</span>
                <p className="font-bold text-slate-400">ANPD Sync</p>
                <p className="text-[10px] text-slate-600 mt-1 leading-tight">Caso escalado automaticamente para autuação federal.</p>
              </div>

            </div>
          </div>

          <div className="flex gap-2 text-xs pt-1">
            <button
              onClick={() => setIsDispatched(false)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg font-medium transition"
            >
              Protocolar Nova Contestação de Ouvidoria
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
