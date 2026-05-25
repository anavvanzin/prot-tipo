import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { STANDARD_CASES } from "./src/data";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

// Lazy initialization of Gemini client
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not defined or is placeholder. Please configure it in AI Studio Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for default cases
  app.get("/api/cases", (req, res) => {
    res.json(STANDARD_CASES);
  });

  // API endpoint to verify configuration
  app.get("/api/config-status", (req, res) => {
    const active = !!process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY";
    res.json({ apiKeyConfigured: active });
  });

  // API endpoint for dynamic analysis via Gemini
  app.post("/api/analyze-decision", async (req, res) => {
    const { decisionText } = req.body;

    if (!decisionText || decisionText.trim() === "") {
      return res.status(400).json({ error: "O texto da decisão estatal é necessário para a análise." });
    }

    try {
      const ai = getGenAI();

      const systemInstruction = `Você é o Relator e o Conselho de Contestação Algorítmica da Administração Pública Brasileira. Suas respostas devem simular rigorosamente o debate entre 4 personas técnicas e jurídicas sobre decisões estatais automatizadas injustas, conforme os seguintes parâmetros brasileiros de direitos e dados:

1. Dr. Lucas Mendes (Defensoria Pública):
   - Eixo: Contraditório prévio algorítmico (art. 5º, LV, CF), devido processo e ampla defesa.
   - Referência dogmática: Tavares, Bitencourt & Cristóvam. Defende que decisões que afetam direitos fundamentais não podem ser tomadas de forma puramente automatizada sem oportunidade de contraditório prévio.
2. Profª Clara Santos (Cientista de Dados):
   - Eixo: Transparência estatística, viés algorítmico, qualidade de base de dados e discriminação indireta.
   - Referência dogmática: Salgado & Saito. Analisa o viés dos dados de treino, overfiting, e as falhas ao usar cruzamentos frios de bases de dados incompatíveis.
3. Dr. Ricardo Hahn (Gestão e Legalidade):
   - Eixo: Eficiência administrativa que não anule a legalidade, governança pública e o custo da litigância reversa.
   - Referência dogmática: Cristóvam & Hahn. Discute como a automação cega de desfechos sociais gera uma sobrecarga de recursos e processos judiciais que destrói a própria economicidade prometiva.
4. Sr. Arnaldo Rocha (Representante dos Cidadãos):
   - Eixo: Literacia algorítmica, inteligibilidade e o direito à "Notícia Humana".
   - Referência dogmática: Sarlet & Molinaro. Defende que o cidadão vulnerável tem o direito de compreender o motivo da rejeição numa linguagem acessível, afetuosa e clara, em vez de receber códigos de erro gélidos.

Gere também uma deliberação final do Relator com: Síntese, Consenso, Dissenso, Fundamentação jurídica e Recomendações técnicas.

Gere também a Minuta de Recurso Administrativo (formalizado, endereçado) e uma Minuta de Solicitação LAI.

Você DEVE produzir a saída estritamente em Português do Brasil com linguagem clara e focada no cidadão.`;

      const prompt = `Analise a seguinte decisão estatal automatizada: "${decisionText}".

Siga estritamente o esquema JSON requerido para a resposta do Conselho.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Título descritivo resumido do caso (Máximo 6 palavras)" },
              desc: { type: Type.STRING, description: "Breve descrição do problema (1 período curto)" },
              tag: { type: Type.STRING, description: "Categoria curta da decisão (Ex: Previdenciário, Social, Fiscal)" },
              context: { type: Type.STRING, description: "Contextualização detalhada brasileira do caso fático analisado" },
              dados: {
                type: Type.ARRAY,
                description: "Lista de 4 a 5 pontos de checagem do mapa de dados e inconsistências encontradas",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    campo: { type: Type.STRING },
                    fonte: { type: Type.STRING },
                    status: { type: Type.STRING, description: "ok, warn ou bad" },
                    statusLabel: { type: Type.STRING, description: "Status em linguagem amigável (Ex: Verificado, Sem Vistoria, Inconsistente)" }
                  },
                  required: ["campo", "fonte", "status", "statusLabel"]
                }
              },
              vieses: {
                type: Type.ARRAY,
                description: "Lista de 3 a 4 indicadores de viés demográfico gerados pelo algoritmo do caso",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    valor: { type: Type.INTEGER, description: "Porcentagem de 0 a 100 de impacto estimado na exclusão ou erro" },
                    nivel: { type: Type.STRING, description: "low, med ou high" }
                  },
                  required: ["label", "valor", "nivel"]
                }
              },
              personas: {
                type: Type.OBJECT,
                properties: {
                  defensoria: { type: Type.STRING, description: "Parecer detalhado em 1 parágrafo bem redigido de Dr. Lucas Mendes citando o contraditório prévio algorítmico, o devido processo e Ampla Defesa (Tavares, Bitencourt & Cristóvam)." },
                  cientista: { type: Type.STRING, description: "Parecer detalhado em 1 parágrafo bem redigido de Profª Clara Santos sobre viés, overfiting, baixa fidelidade de cruzamentos secos e dados de treino (Salgado & Saito)." },
                  admin: { type: Type.STRING, description: "Parecer detalhado em 1 parágrafo de Dr. Ricardo Hahn sobre custos de litigância reversa e a futilidade fiscal de automatizações que geram contestações judiciais em lote (Cristóvam & Hahn)." },
                  cidadao: { type: Type.STRING, description: "Parecer detalhado em 1 parágrafo de Sr. Arnaldo Rocha focado em exclusão digital, necessidade de explicação acolhedora e inteligível, e o direito à notícia humana (Sarlet & Molinaro)." }
                },
                required: ["defensoria", "cientista", "admin", "cidadao"]
              },
              rankings: {
                type: Type.ARRAY,
                 description: "Avaliação cruzada simulada anônima entre os 4 conselheiros. Sempre liste os 4 e atribua notas/posições com base em quem protegeu melhor o cidadão.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    pos: { type: Type.INTEGER },
                    name: { type: Type.STRING },
                    score: { type: Type.STRING },
                    votes: { type: Type.INTEGER },
                    comment: { type: Type.STRING }
                  },
                  required: ["pos", "name", "score", "votes", "comment"]
                }
              },
              final: {
                type: Type.OBJECT,
                properties: {
                  sintese: { type: Type.STRING, description: "Síntese jurídica do Relator sobre a anomalia do ato (1 a 2 frases)" },
                  consenso: { type: Type.STRING, description: "Pontos unânimes mapeados na sessão administrativa" },
                  dissenso: { type: Type.STRING, description: "Debate ou dissenso conceitual mapeado da sessão" },
                  fundamentacao: { type: Type.STRING, description: "Leis infralegais, constitucionais e referências invocadas no acórdão" },
                  recomendacao: { type: Type.STRING, description: "Recomendações finais técnicas e práticas detalhadas listadas" },
                  alerta: { type: Type.STRING, description: "Alerta severo sobre conformidade estatal" },
                  minutaRecurso: { type: Type.STRING, description: "Minuta textual formal completa do Recurso de anulação" },
                  pedidoLAI: { type: Type.STRING, description: "Minuta textual formal completa da solicitação de informação algorítmica LAI" }
                },
                required: ["sintese", "consenso", "dissenso", "fundamentacao", "recomendacao", "alerta", "minutaRecurso", "pedidoLAI"]
              }
            },
            required: ["title", "desc", "tag", "context", "dados", "vieses", "personas", "rankings", "final"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Nenhuma resposta textual retornada do modelo de inteligência artificial de simulação.");
      }

      const cleanJson = JSON.parse(responseText.trim());
      // Make sure id isn't missing
      cleanJson.id = "custom_" + Date.now();
      res.json(cleanJson);

    } catch (error: any) {
      console.error("Erro na rota de análise do Gemini:", error.message);
      
      // If the API key is missing or failed, we can return a informative mock evaluation simulated on-the-fly, 
      // preventing a frustrating breakout, but clearly flagging that this is a simulated fallback.
      const simulatedResponse = {
        id: "simulated_" + Date.now(),
        title: "Decisão sob Análise (Modo de Simulação Local)",
        desc: "Análise processada através da engine local por ausência de chave de API configurada.",
        tag: "Contestação",
        context: `Análise simulada local do Conselho sobre a entrada: "${req.body.decisionText}". O Conselho de Contestação reuniu-se extraordinariamente para avaliar o caso.`,
        dados: [
          { campo: "Informação do Cidadão", fonte: "Entrada do Usuário", status: "warn", statusLabel: "Análise Assistida" },
          { campo: "Bases Federais (CNIS / eSocial)", fonte: "Cruzamento Frio", status: "bad", statusLabel: "Inconsistência Registrada" },
          { campo: "Rito de Verificação de Legitimidade", fonte: "Administração", status: "bad", statusLabel: "Omissão de Rito Humano" },
          { campo: "Direito à Transparência Processual", fonte: "Ato Estatal", status: "warn", statusLabel: "Explicação Gélida" }
        ],
        vieses: [
          { label: "Assimetria de Conectividade", valor: 85, nivel: "high" },
          { label: "Vulnerabilidade Cadastral", valor: 70, nivel: "high" },
          { label: "Trabalho Autônomo Informal", valor: 45, nivel: "med" }
        ],
        personas: {
          defensoria: `O caso sob apreço demonstra uma flagrante nulidade formal por desrespeito absoluto ao contraditório anterior (art. 5º, LV, CF/88), conforme a dogmática consagrada por Tavares, Bitencourt & Cristóvam. O corte automático sumário fundamentado em inconsistências preliminares priva o cidadão do direito de suprir as irregularidades antes que o dano monetário ocorra, ferindo a presunção de inocência e as salvaguardas mínimas federais.`,
          cientista: `Do ponto de vista científico e computacional (Salgado & Saito), o sistema operou com premissas cegas de correlação pura e bases desatualizadas incompatible semanticamente. Induzir fraudes ou irregularidades cadastrais por cruzamentos unilaterais frios, sem sopesar os inevitáveis desvios e 'overfitting' das variáveis demográficas de bairros e classes vulneráveis, induz a discriminação indireta e erros sistêmicos em cadeia.`,
          admin: `A presente automação 'cega' desmoraliza o dogma de eficiência constitucional, pois, consoante exaustivamente demonstrado por Cristóvam & Hahn, a recusa automática de direitos sem guichê de reconsideração assistida gera taxas aberrantes de judicialização de contestações civis. O custo fiscal de suportar milhares de recursos judiciais excede imensamente qualquer ganho orçamentário aparente de pessoal que motivou a robotização.`,
          cidadao: `A redação do ato notificado é incompreensível para as massas brasileiras, ignorando por completo a 'notícia humana' afetuosa assentada por Sarlet & Molinaro. O cidadão esbarra em canais eletrônicos hostis sem letramento digital capaz de interpretá-los. O fechamento de agências de atendimento presencial em prol da automação total condena as franjas excluídas à invisibilidade jurídica plena.`
        },
        rankings: [
          { pos: 1, name: "Dr. Lucas Mendes (Defensoria)", score: "1.10", votes: 4, comment: "Excelente ênfase na nulidade absoluta decorrente do contraditório ausente." },
          { pos: 2, name: "Sr. Arnaldo Rocha (Cidadão)", score: "1.90", votes: 4, comment: "Ponto certeiro sobre exclusão digital e o sofrimento gerado por notificações frias." },
          { pos: 3, name: "Profª Clara Santos (Dados)", score: "2.80", votes: 4, comment: "Cientificamente brilhante quanto ao descompasso de chaves cadastrais." },
          { pos: 4, name: "Dr. Ricardo Hahn (Gestão)", score: "3.80", votes: 4, comment: "Precisão absoluta no cálculo financeiro das perdas do fisco com litigância." }
        ],
        final: {
          sintese: "Simulação de deferimento de nulidade com base na desatenção ao devido processo legal tributário ou social, face à precariedade dos triggers automatizados empregados contra o administrado.",
          consenso: "Concordância inabalável de que nenhuma decisão estatal automatizada adversa pode subsistir sem canal presencial de auxílio, explicação pormenorizada e revisão humana direta.",
          dissenso: "Divergência técnica estrita referente à adoção de tecnologias inovadoras: se deve haver moratória plena ou se basta fixar guias humanizadas e salvaguardas transparentes concomitantes.",
          fundamentacao: "Fundamentado na incidência cogente imperativa dos princípios da ampla defesa, contraditório prévio (Art. 5º, incisos LIV e LV da CF/88) e dignidade da pessoa humana (Art. 1º, inciso III da CF/88). Aplicação substantiva da teoria da Reserva de Humanidade e o direito subjetivo público à explicabilidade e revisão humana de deliberações puramente automatizadas de que trata o Artigo 20 da Lei Geral de Proteção de Dados (LGPD) e o Artigo 6º, §2º da Lei nº 14.129/21. Alinhamento às lições doutrinárias de Tavares, Bitencourt, Cristóvam e Saito sobre a nulidade absoluta do ato administrativo eletrônico desprovido de contraditório e sobrecarregado por opacidade algorítmica.",
          recomendacao: "1. Fornecer de forma indubitável a anulação do encerramento por vício insanável de publicidade;\n2. Cadastrar imediatamente um agendamento humano para reavaliar a consistência dos dados declarados;\n3. Publicar em canais de fácil compreensão e em rádio/SMS a justificação inteligível do status do usuário.",
          alerta: "Chave de API Gemini não detectada ou inativa no ambiente. Para análises personalizadas em tempo real via IA generativa integrada, configure sua 'GEMINI_API_KEY' no menu do painel lateral de segredos.",
          minutaRecurso: "RECURSO ADMINISTRATIVO DE REVISÃO (MOCK SIMULADO)\n\nAO: Órgão Gestor da Administração Pública Brasileira\n\nAssunto: Pedido de Revisão de Decisão unicamente automatizada\n\nI. DA VIOLAÇÃO AO CONTRADITÓRIO PRÉVIO\nConforme a dogmática jurídica de Tavares e Cristóvam, a decisão administrativa proferida unicamente por máquina que cassa ou restringe direitos fundamentais sem ensejo de contraditório prévio é nula de pleno direito.\n\nII. PEDIDO\nRequer-se a concessão do efeito suspensivo e a imediata revisão por agente humano, promovendo-se o contraditório real e restabelecimento cautelar.",
          pedidoLAI: "REQUERIMENTO DE EXPLICABILIDADE DE CRITÉRIOS (LAI SIMULADO)\n\nAO: Serviço de Informação ao Cidadão do Órgão Gestor\n\nCom suporte nos arts. 20 da LGPD e regulamento da Lei de Acesso à Informação, reclama-se o envio de:\n\n1. Especificação funcional descritiva do algoritmo de decisão encarregado de classificar recursos e cortar perfis.\n2. Margem estatística oficial de tolerância de erros e auditoria de vieses raciais realizada nas bases de controle."
        }
      };

      res.json(simulatedResponse);
    }
  });

  // Serve static assets in production, otherwise mount Vite in development
  if (process.env.NODE_ENV !== "production") {
    console.log("Iniciando Vite em modo de middleware de desenvolvimento...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Servindo arquivos estáticos de produção de `./dist`...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULL-STACK] Servidor rodando com sucesso no endereço: http://localhost:${PORT}`);
    console.log(`[FULL-STACK] Pronto para tráfego externo via proxy do AI Studio.`);
  });
}

startServer();
