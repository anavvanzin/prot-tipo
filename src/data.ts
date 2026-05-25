import { PersonaDetail, CaseAnalysis } from "./types";

export const BOARD_PERSONAS: PersonaDetail[] = [
  {
    id: "lucas_mendes",
    name: "Dr. Lucas Mendes",
    role: "Defensor Público da União",
    avatar: "⚖️",
    reference: "Tavares, Bitencourt & Cristóvam",
    axis: "Contraditório Prévio Algorítmico, Devido Processo e Ampla Defesa",
    color: "emerald"
  },
  {
    id: "clara_santos",
    name: "Profª Clara Santos",
    role: "Cientista de Dados & Auditora Algorítmica",
    avatar: "📊",
    reference: "Salgado & Saito",
    axis: "Transparência Estatística, Qualidade da Base de Dados e Discriminação Indireta",
    color: "blue"
  },
  {
    id: "ricardo_hahn",
    name: "Dr. Ricardo Hahn",
    role: "Especialista em Gestão e Legalidade Administrativa",
    avatar: "🏢",
    reference: "Cristóvam & Hahn",
    axis: "Eficiência Administrativa Legal, Governança e Custos da Litigância Reversa",
    color: "amber"
  },
  {
    id: "arnaldo_rocha",
    name: "Sr. Arnaldo Rocha",
    role: "Representante da Cidadania e Sociedade Civil",
    avatar: "👤",
    reference: "Sarlet & Molinaro",
    axis: "Literacia Algorítmica, Inteligibilidade e Direito à 'Notícia Humana'",
    color: "rose"
  }
];

export const STANDARD_CASES: CaseAnalysis[] = [
  {
    id: "inss_rural",
    title: "INSS — Aposentadoria Rural Deferida p/ 'Atividade Urbana'",
    desc: "Aposentadoria de segurada especial indeferida de forma puramente automatizada sem verificação presencial.",
    tag: "Previdenciário",
    context: "Uma trabalhadora rural idosa (segurada especial) solicitou sua aposentadoria rural por idade. O robô do INSS consultou bases como CNIS, CAR e geolocalização. Por encontrar que o proprietário das terras possuía veículo registrado na zona urbana e por lacunas formais nas bases, o sistema inferiu automaticamente que ela exercia atividade urbana, indeferindo o pedido sem notificar para sanar dúvidas ordinarizadas pela IN INSS 128/2022.",
    dados: [
      { campo: "Autodeclaração de Segurado Especial", fonte: "Segurada (Meu INSS)", status: "ok", statusLabel: "Desconsiderada" },
      { campo: "Histórico Contributivo", fonte: "CNIS (cruzamento)", status: "warn", statusLabel: "Intermitente" },
      { campo: "Vínculo Patronal de Proprietário", fonte: "CAR / ITR", status: "bad", statusLabel: "Inferido como Urbano" },
      { campo: "Relação de Homonímia", fonte: "Receita Federal", status: "warn", statusLabel: "Conflito de Nomes" },
      { campo: "Rito de Justificação Manual", fonte: "IN 128/2022 (INSS)", status: "bad", statusLabel: "Ignorado pelo Robô" }
    ],
    vieses: [
      { label: "Informalidade no campo", valor: 92, nivel: "high" },
      { label: "Mulheres na agricultura", valor: 78, nivel: "high" },
      { label: "Idosos sem letramento digital", valor: 85, nivel: "high" },
      { label: "Controle de terras (Proxy)", valor: 64, nivel: "med" }
    ],
    personas: {
      defensoria: "O indeferimento puramente automatizado da aposentadoria rural viola frontalmente o contraditório e a ampla defesa prévios (art. 5º, LV, da Constituição Federal). O INSS sumariamente desrespeitou a sua própria Instrução Normativa nº 128/2022, que estabelece um rito de concessão e instrução humana antes de qualquer ato de indeferimento. Não se admite que a eficiência tecnológica sirva de pretexto para soterrar o mínimo existencial de uma trabalhadora vulnerável sem direito a se opor previamente à inferência maquinal de atividade 'urbana'.",
      cientista: "Sob a ótica científica, o robô operou sob a falácia do viés de proxy e do cruzamento frio de bases com semânticas distintas. Vínculos e cadastros agrários pontuais do proprietário físico da terra foram erroneamente acoplados à trabalhadora, transformando correlações demográficas em nexo causal falso. O algoritmo ignorou a autodeclaração – dado primário e de robustez comprovada – em detrimento de inferências automatizadas de baixíssimo nível de precisão estatística para classes agrícolas informais.",
      admin: "Discutindo governança, a automação 'cega' que gera indeferimentos em lote para depois forçar o cidadão vulnerável à via recursal ou judicial constitui litigância reversa predatória. Cristóvam & Hahn demonstram que o custo real de processar milhares de ações judiciais e mandados de segurança destrói a economicidade prometida na folha de planejamento de TI. O INSS, ao se omitir da supervisão humana direta requerida pelo art. 20 da LGPD, transfere ineficientemente seu custo de triagem para a Defensoria Pública e o Poder Judiciário.",
      cidadao: "Na ponta vulnerável, a pessoa sequer compreende o que é um algoritmo ou por que um robô decidiu seu destino. Sarlet & Molinaro defendem o direito à 'notícia humana' afetuosa e compreensível, em vez de textos gélidos de erro no Meu INSS que dizem apenas 'Ausência de Qualidade de Segurado'. É ultrajante que uma trabalhadora rural idosa precise viajar quilômetros em busca de sinal de internet para encontrar uma portal digital hostil que cancela seus direitos fundamentais sem qualquer mediação humana."
    },
    rankings: [
      { pos: 1, name: "Dr. Lucas Mendes (Defensoria)", score: "1.12", votes: 4, comment: "Argumentação irrespondível quanto à preternaturalidade do contraditório prévio." },
      { pos: 2, name: "Sr. Arnaldo Rocha (Cidadão)", score: "1.95", votes: 4, comment: "Sensibilidade total ao peso da exclusão digital e ao direito à notícia humana." },
      { pos: 3, name: "Profª Clara Santos (Dados)", score: "2.80", votes: 4, comment: "Excelente demonstração da fragilidade estatística das proxies de agricultura." },
      { pos: 4, name: "Dr. Ricardo Hahn (Gestão)", score: "3.70", votes: 4, comment: "Focou lucidamente no custo operacional e na ruína da economicidade por litigância interna." }
    ],
    final: {
      sintese: "Indeferimento automático de benefício previdenciário rural com arrimo em cruzamento indireto de dados (viés de proxy), em contrariedade expressa ao devido processo administrativo delineado na IN 128/2022 do INSS.",
      consenso: "Unanimidade estabelecida de que: 1) O contraditório precisa ser prévio e não meramente recursal; 2) Inferências cadastrais indiretas não gozam de presunção de veracidade absoluta contra autodeclarações físicas; 3) Mensagens automáticas incompreensíveis anulam a publicidade e a dignidade do cidadão.",
      dissenso: "Debate focado na justificativa de escala do INSS. O administrador pondera que a fila de milhões de benefícios força a triagem mecânica, enquanto a Defensoria e a representação dos cidadãos opõem que o direito fundamental ao sustento não se submete a métricas de throughput corporativo.",
      fundamentacao: "Artigo 5º, incisos LIV e LV da CF/88 (Devido Processo e Ampla Defesa); Artigo 20 da Lei Geral de Proteção de Dados (LGPD) garantindo revisão humana e transparência; Artigo 6º, §2º da Lei 14.129/2021 (Princípio da explicabilidade); e ritos imperativos da Instrução Normativa INSS nº 128/2022.",
      recomendacao: "1. Nulidade absoluta do indeferimento por ausência de contraditório prévio e descumprimento do rito de instrução ordinário;\n2. Restabelecimento imediato do processo administrativo com abertura de prazo para produção de testemunhos e contraditas;\n3. Desativação do trigger automatizado de indeferimento de segurados especiais por mero fuzzy match de cadastros rurais;\n4. Criação de canal de comunicação humana assistida com vocabulário acolhedor e inteligível.",
      alerta: "O próprio INSS atua na perversa contradição de ser o REGULADOR que edita a IN 128/2022 e a governança, e simultaneamente o REGULADO infracional que implementa algoritmos de corte em total descumprimento do rito que ele mesmo pactuou.",
      minutaRecurso: "RECURSO ADMINISTRATIVO DE ANULAÇÃO DE ATO\nINTERESSADO: Segurada Especial Rural\nAO: CONSELHO DE RECURSOS DA PREVIDÊNCIA SOCIAL (CRPS)\n\nAssunto: Anulação de Decisão Automatizada de Indeferimento de Aposentadoria por Idade Rural\n\nFundamentação Legal: Art. 5º, LV, CF/88 c/c Art. 20, §1º, LGPD e Art. 6º, Lei 14.129/21\n\n1. DA NULIDADE POR AUSÊNCIA DE CONTRADITÓRIO PRÉVIO\nA decisão denegatória foi proferida de maneira unicamente automatizada por algoritmo sem a necessária abertura de prazo prévio para que a segurada pudesse contraditar as inferências cadastrais urbanas imputadas ao seu perfil.\n\n2. DA VIOLAÇÃO DA IN/INSS 128/2022\nO próprio regulamento do órgão prevê o rito de verificação e comprovação assistida para trabalhadores informais do campo, rito este sumariamente anulado pelo fluxo automático.\n\n3. PEDIDOS\nDiante do exposto, requer-se a ANULAÇÃO do indeferimento com o restabelecimento do processo administrativo de concessão, determinando-se a revisão por servidor humano e o restabelecimento com efeitos financeiros retroativos à data do requerimento.",
      pedidoLAI: "SOLICITAÇÃO DE EXPLICABILIDADE ALGORÍTMICA (LAI)\n\nAO: SERVIÇO DE INFORMAÇÕES AO CIDADÃO do INSS / DATAPREV\n\nAssunto: Solicitação de relatórios sobre critérios, parâmetros e bases de dados do algoritmo de triagem de Segurado Especial\n\nCom amparo na Lei nº 12.527/2011 (LAI) e no Artigo 20 da LGPD, solicita-se:\n\n1. Cópia integral do código-fonte ou especificação de regras lógicas do algoritmo utilizado para avaliar a conformidade de autodeclarações de atividade rural.\n2. Listagem completa de todas as bases de dados governamentais e privadas cruzadas no respectivo processamento do requerimento.\n3. Indicação da taxa de erro e falsos positivos do referido modelo computacional para populações de baixa renda e atividade informal."
    }
  },
  {
    id: "bolsa_familia",
    title: "Bolsa Família — Cancelamento Automático por Inconsistência",
    desc: "Cancelamento de benefício sem contraditório prévio devido a descompasso em base fria da Receita.",
    tag: "Social",
    context: "Família composta por mãe solo e três filhos menores teve o benefício do Cadastro Único (Bolsa Família) subitamente cancelado por uma suposta inconsistência cadastral. O algoritmo cruzou a declaração da Receita Federal com bases da RAIS e detectou uma variação nominal temporária decorrente de divórcio, bloqueando o sustento sem direito a manifestação prévia.",
    dados: [
      { campo: "Cadastro Único", fonte: "MDS (CadÚnico)", status: "ok", statusLabel: "Verificado" },
      { campo: "Relação Nominal de CPF", fonte: "Receita Federal", status: "bad", statusLabel: "Conflito de Divórcio" },
      { campo: "Renda Declarada", fonte: "RAIS / eSocial", status: "ok", statusLabel: "Zero" },
      { campo: "Vínculo de Emprego", fonte: "CNIS", status: "ok", statusLabel: "Sem Registro Ativo" }
    ],
    vieses: [
      { label: "Mães solteiras divorciadas", valor: 84, nivel: "high" },
      { label: "Renda informal", valor: 75, nivel: "high" },
      { label: "Variação grafonímica", valor: 68, nivel: "high" }
    ],
    personas: {
      defensoria: "Excluir uma família de baixa renda do Bolsa Família através de trigger automático, sem oportunidade de saneamento prévio, é uma violência processual. Conforme Tavares e Bitencourt, decisões estatais que afetam severamente direitos de sobrevivência não podem ser automatizadas em bloco. O contraditório precisa preceder o corte de recursos alimentares, garantindo a ampla defesa prevista constitucionalmente.",
      cientista: "O caso expõe a falácia metodológica do cruzamento frio de bases incompatíveis. A base da Receita Federal possui ritmo de atualização distinto da base do CadÚnico. Um desalinhamento no nome de casada/solteira após divórcio foi lido pelo algoritmo como uma fraude potencial ou omissão de dados. Trata-se de um 'overfitting' interpretativo, punindo a vítima por inconsistências sistêmicas do próprio Estado.",
      admin: "A pretexto de sanar fraudes de forma barata, a administração produziu um aumento exponencial na litigância de contestação. Cristóvam & Hahn advertem sobre o custo da litigância reversa: o que o Ministério economizou teoricamente em servidores para análise física, agora gastará multiplicadamente com mandados de segurança oriundos da Defensoria Pública. A governança baseada em custos é fustigada pela ineficácia do algoritmo.",
      cidadao: "O aviso recebido foi apenas um código frio: 'Inconsistência Cadastral - Benefício Excluído'. Como uma mãe solo desprovida de meios digitais decifra isso? Sarlet & Molinaro relembram o direito à publicidade inteligível. O silêncio do robô é segregador. Ela precisa de uma explicação humana, afetuosa e desburocratizada, de preferência presencial ou falada, em vez de se esbarrar em chatbots inacessíveis.",
    },
    rankings: [
      { pos: 1, name: "Dr. Lucas Mendes (Defensoria)", score: "1.25", votes: 4, comment: "Foco humanitário e constitucional insuperável." },
      { pos: 2, name: "Sr. Arnaldo Rocha (Cidadão)", score: "1.80", votes: 4, comment: "Pôs o dedo na ferida da exclusão digital extrema das mães de periferia." },
      { pos: 3, name: "Profª Clara Santos (Dados)", score: "2.90", votes: 4, comment: "Análise crucial do delay e dessincronização de bancos de dados estatais." },
      { pos: 4, name: "Dr. Ricardo Hahn (Gestão)", score: "3.95", votes: 4, comment: "Identificou no avesso a ineficiência do corte automático 'grosso'." }
    ],
    final: {
      sintese: "Bloqueio automático de transferência de renda constitucionalmente informada, motivado por divergência grafonímica pós-divórcio apurada em cruzamento automatizado frio de bases governamentais.",
      consenso: "Todos os conselheiros convergem que: 1) O cruzamento automático de bases não deve induzir presunção de má-fé ordinária; 2) Divergência cadastral de registro civil de divórcio (nome anterior/atual) é um falso positivo estatístico clássico que exige revisão humana obrigatória antes da suspensão monetária.",
      dissenso: "Incongruência pontual sobre a responsabilização individual: o conselheiro de gestão pondera que o cidadão também deve buscar manter cadastros uniformes, o que é rejeitado energicamente pela cidadania que acusa a desconexão estrutural das agências brasileiras de registro.",
      fundamentacao: "Artigo 1º, III (Dignidade Humana) e Artigo 5º, LV da Constituição Federal; Artigo 20, §1º da LGPD; e princípios norteadores das políticas públicas de combate à fome.",
      recomendacao: "1. Desbloqueio imediato do Bolsa Família sob efeito de liminar administrativa;\n2. Cadastramento de exceção reguladora para não corte por divergência gráfica em nomes femininos com histórico de divórcios;\n3. Instauração de guichês físicos acolhedores no CRAS para auxílio e letramento dos vulneráveis.",
      alerta: "Cruzar bases de dados da União sem chaves unificadas robustas agrava a exclusão de famílias matrifocais, onde os cartórios de registro civil falham sistematicamente em propagar averbações.",
      minutaRecurso: "RECURSO ADMINISTRATIVO DE REESTABELECIMENTO DE BOLSA FAMÍLIA\n\nAO: MINISTÉRIO DO DESENVOLVIMENTO E ASSISTÊNCIA SOCIAL, FAMÍLIA E COMBATE À FOME (MDS)\n\nAssunto: Impugnação de Corte Automatizado de Benefício do Bolsa Família\n\nFundamento: Art. 5º, LIV e LV da CF/88 c/c Lei 14.129/21\n\n1. DOS FATOS E DO FALSO POSITIVO CADAUal\nO benefício da recorrente foi cancelado por divergência no sobrenome (nome de casada com nome de solteira) em cruzamento de dados com a Receita Federal, sem ocorrência de incremento de renda ou fraude.\n\n2. DA IRREVERSIBILIDADE DO DANO À SUBSISTÊNCIA\nA exclusão do Bolsa Família sem notificação humana prévia condena a família à vulnerabilidade imediata alimentar, ferindo o princípio do mínimo existencial.\n\n3. DO PEDIDO\nRequer-se a reativação imediata do benefício alimentar da família, com pagamento das parcelas retroativas e a suspensão de novos triggers automatizados até auditoria da base.",
      pedidoLAI: "SERVIÇO DE INFORMAÇÃO AO CIDADÃO (LAI)\n\nAO: Ministério do Desenvolvimento Social / Gestão do Cadastro Único\n\nAssunto: Pedido de acesso a histórico e critérios do cruzamento de dados eSocial/Receita Federal\n\nCom fulcro na Lei de Acesso à Informação, requisita-se detalhamento técnico sob pena de descumprimento do artigo 20 da LGPD:\n\n1. Qual especificação técnica determina a divergência cadastral como trigger definitivo de corte em lote sem necessidade de análise manual.\n2. Estatísticas semestrais de benefícios cancelados cumulados com divórcios ou alterações de nome civil na base do CadÚnico."
    }
  },
  {
    id: "iptu_triplicado",
    title: "IPTU SP — Reclassificação Territorial Automatizada",
    desc: "Aumento suplementar de 300% no IPTU baseado em cruzamento frio de MEIs e matrículas.",
    tag: "Tributário",
    context: "Um contribuinte de classe média-baixa em bairro periférico teve o IPTU de sua residência triplicado após um algoritmo municipal reclassificar o uso de seu imóvel de 'residencial' para 'misto (comercial)'. O sistema cruzou dados de registro de Microempreendedor Individual (MEI) e matrículas escolares para inferir a existência de atividade comercial no endereço, sem qualquer vistoria presencial ou notificação fiscal prévia.",
    dados: [
      { campo: "Inscrição de Matrícula de IPTU", fonte: "Cadastro Imobiliário Municipal", status: "ok", statusLabel: "Residencial" },
      { campo: "Endereço Fiscal de MEI", fonte: "Receita Federal (CNPJ Cadastro)", status: "warn", statusLabel: "MEI no Mesmo Imóvel" },
      { campo: "Censo de Matrículas Escolares", fonte: "Secretaria de Educação", status: "ok", statusLabel: "Uso Familiar" },
      { campo: "Vistoria Fiscal Presencial", fonte: "Secretaria de Finanças", status: "bad", statusLabel: "Inexistente" }
    ],
    vieses: [
      { label: "Bairros de uso misto periférico", valor: 78, nivel: "high" },
      { label: "Uso residencial-comercial informal", valor: 85, nivel: "high" },
      { label: "Auto-emprego informal", valor: 62, nivel: "med" }
    ],
    personas: {
      defensoria: "O lançamento tributário suplementar apoiado de forma única em inferência algorítmica, sem contraditório ou vistoria fiscal prévia, afronta o postulado estrito da legalidade tributária e o princípio da não-surpresa do contribuinte. O lançamento suplementar exige processo regular de impugnação anterior e fundamentação real da atividade econômica exercida, em vez de cobrança sumária baseada em presunção eletrônica de comércio.",
      cientista: "Eis o caso de falácia de correlação vs causalidade. Ter o endereço residencial catalogado como o domicílio legal de um microempreendedor individual de serviços digitais ou de costura não significa que a estrutura física do prédio tenha sofrido alteração de destinação urbanística ou uso comercial. O algoritmo do município realizou inferências frias em dados inconclusivos para imputar ilegalmente obrigações fiscais exorbitantes.",
      admin: "Sob os reflexos da Lei de Responsabilidade Fiscal e da eficiência, o uso de IA pelo erário para calibrar a arrecadação é benéfico, mas o ato unilateral sem publicidade destrói a confiança legítima no poder público. O custo de gestão para atuar na anulação de milhares de contestações tributárias na Secretaria Municipal de Finanças aniquila a agilidade operacional inicial que justificou a robotização. É a litigância reversa contra a eficiência.",
      cidadao: "O contribuinte periférico abre seu aplicativo fiscal e recebe o carnê três vezes mais caro sob a chancela 'Reclassificação por Robô'. Sequer se publicou em linguajar cidadão os parâmetros de peso dessa modificação unilateral. O direito à notícia inteligível e humana do ato administrativo de aumento tributário foi ceifado por trás de uma máquina arrecadatória inacessível e muda do município, gerando angústia de despejo fiscal.",
    },
    rankings: [
      { pos: 1, name: "Dr. Lucas Mendes (Defensoria)", score: "1.40", votes: 4, comment: "Excelente arrazoado sobre estrita legalidade e devido rito de lançamento fiscal." },
      { pos: 2, name: "Dr. Ricardo Hahn (Gestão)", score: "2.10", votes: 4, comment: "Ponto chave ao mostrar o desperdício em contestação administrativa para o fisco." },
      { pos: 3, name: "Profª Clara Santos (Dados)", score: "2.85", votes: 4, comment: "Precisão na demolição das falsas inferências de MEIs como endereços de comércio ativo." },
      { pos: 4, name: "Sr. Arnaldo Rocha (Cidadão)", score: "3.65", votes: 4, comment: "Bons insights sobre desumanização do IPTU em áreas comunitárias mista." }
    ],
    final: {
      sintese: "Lançamento de IPTU suplementar com reclassificação de uso residencial para comercial, fundamentado apenas em monitoramento estatístico cruzado de MEIs virtuais.",
      consenso: "Convergência integral sobre a ilegalidade tributária do lançamento sem verificação e perícia humana local. A mera correspondência eletrônica de sede de MEI de prestação de serviço não tem o condão de autorizar alteração de zoneamento fiscal e onerar o patrimônio domiciliar sem contraditório amplo.",
      dissenso: "O especialista de gestão defende que o município deve buscar atualizar bases de modo célere contra a especulação imobiliária de comércios de fato não cadastrados, embora reconheça de pronto que a falta de vistoria prévia macula de insanável nulidade o ato administrativo.",
      fundamentacao: "Artigos 145, 150 da Constituição Federal (Capacidade Contributiva e Legalidade Tributária); Artigo 20 da LGPD; e normas de devido processo da Fazenda Municipal.",
      recomendacao: "1. Declaração de nulidade do lançamento fiscal suplementar de IPTU comercial;\n2. Retorno do imóvel à categoria estrita de residencial com reemissão imediata da guia tributária anterior;\n3. Proibição ao município de empregar cruzamento unilateral automático de MEIs virtuais para majoração abusiva de alíquotas sem perícia humana presencial prévia.",
      alerta: "Majorações tributárias apoiadas unicamente em algoritmos informativos contornam ilegitimamente o debate parlamentar e violam a não-surpresa do administrado.",
      minutaRecurso: "IMPUGNAÇÃO DE LANÇAMENTO TRIBUTÁRIO DE IPTU\n\nAO: SECRETÁRIO INDEPENDENTE DE FINANÇAS DO MUNICÍPIO\n\nAssunto: Impugnação de Lançamento Tributário Suplementar de IPTU por Desvio de Código\n\n1. DA INEXISTÊNCIA DE FATO GERADOR DE ZONA MISTO-COMERCIAL\nO imóvel objeto da autuação suplementar é estritamente residencial. A existência de um registro de MEI de prestador de serviços puramente virtuais no endereço fiscal da morada não constitui comércio ativo ou alteração de uso da edificação.\n\n2. DO VÍCIO DE PROCEDIMENTO - AUSÊNCIA DE VISTORIA FISCAL\nInexiste no histórico de lançamentos qualquer auditoria ou vistoria humana realizada localmente pelo fisco que ampare tecnicamente a majoração automatizada exercida.\n\n3. DO PEDIDO\nRequer-se o acolhimento do presente recurso administrativo para ANULAR e cancelar em definitivo o débito excedente ilegal.",
      pedidoLAI: "PEDIDO DE TRANSPARÊNCIA FISCAL (LAI)\n\nAO: CONTROLADORIA GERAL DO MUNICÍPIO e SECRETARIA DE FINANÇAS\n\nAssunto: Solicitação de relatórios sobre regras de reclassificação automática de IPTU por algoritmos de inteligência espacial\n\nNos termos da Lei 12.527/11, demanda-se a disponibilização de:\n\n1. Memória técnica do sistema de inteligência municipal que induz a reclassificação de imóveis residenciais baseada em MEIs e e-commerce.\n2. Relatório de margem de acerto e taxa de correlação em bairros periféricos vs bairros nobres territoriais."
    }
  },
  {
    id: "auxilio_negado",
    title: "Auxílio Emergencial — Negado por Registro Fantasma",
    desc: "Benefício indeferido de forma automatizada devido a dados de baixa qualidade do CNIS.",
    tag: "Social",
    context: "Um trabalhador informal em situação de extrema vulnerabilidade teve seu auxílio governamental de subsistência negado sob o escopo automatizado de possuir 'Vínculo Empregatício Ativo'. Trata-se, contudo, de um registro de emprego do passado que não foi devidamente baixado pelo empregador original no banco de dados do CNIS, gerando uma barreira digital incontornável.",
    dados: [
      { campo: "Status CadÚnico", fonte: "Cadastro Único do Governo Federal", status: "ok", statusLabel: "Elegível" },
      { campo: "Relação de Carteira Assinada", fonte: "CNIS (cruzamento do Dataprev)", status: "bad", statusLabel: "Registro Fantasma Ativo (2012)" },
      { campo: "Cruzamento Informatizado de CNPJ", fonte: "Dataprev", status: "warn", statusLabel: "Fuzzy Match de Homonímia" },
      { campo: "Canais Físicos de Apelação", fonte: "Ausentes no Aplicativo", status: "bad", statusLabel: "Bloqueio Total" }
    ],
    vieses: [
      { label: "Informalidade crônica de periferia", valor: 88, nivel: "high" },
      { label: "Trabalhadores em transição de emprego", valor: 72, nivel: "high" },
      { label: "Problemas de homonímia brasileira", valor: 58, nivel: "med" }
    ],
    personas: {
      defensoria: "O direito fundamental ao sustento (Art. 6º, CF/88) foi abruptamente retirado do cidadão a partir de dados reconhecidamente falhos sem direito a contraditório administrativo ou revisão humana. O indeferimento automatizado baseia-se em um 'estado de coisas ilegal' onde o Estado opera bancos de dados cronicamente desatualizados (CNIS) e os impõe de forma absoluta contra a pessoa, gerando miséria em lote e violência sistêmica.",
      cientista: "A auditoria técnica de dados governamentais demonstra que o CNIS possui mais de 2 milhões de registros sem baixa formal de contratos de trabalho (constatação do próprio TCU). Usar um ground truth reconhecidamente de baixa qualidade para triagens automatizadas inflexíveis, desprovidas de saneamento de homônimos e de fuzzy matching imprecisos, é um desastre metodológico crônico de ciência de dados pública.",
      admin: "Sob os reflexos de custos, prender o cidadão ao silêncio algorítmico do aplicativo Dataprev gera uma avalanche de mandados de segurança e contestações judiciais. O custo unitário do contencioso da DPU e das varas de assistência social suplanta de longe o custo de prever um simples callback humano de revisão de registros trabalhistas. A pseudo-eficiência do algoritmo cobra um preço judicial destruidor.",
      cidadao: "O aplicativo indicava uma resposta insensível e genérica: 'Auxílio Negado - Possui Vínculo Empregatício'. O cidadão sequer dispunha de canais para carregar uma carteira de trabalho física para provar o desemprego perpétuo. Sem letramento e acesso adequado, a exclusão processual é plena. O Estado nega comida ao faminto através de uma mensagem de erro na tela de um celular desprovido de rede.",
    },
    rankings: [
      { pos: 1, name: "Dr. Lucas Mendes (Defensoria)", score: "1.15", votes: 4, comment: "Focou lucidamente no drama alimentar e na inversão do ônus da prova de desemprego." },
      { pos: 2, name: "Profª Clara Santos (Dados)", score: "2.15", votes: 4, comment: "Excelente uso de dados empíricos do TCU provando as fraudes e erros de registro do CNIS." },
      { pos: 3, name: "Sr. Arnaldo Rocha (Cidadão)", score: "2.55", votes: 4, comment: "Descreveu perfeitamente a barreira intransponível do Meu INSS para os informais." },
      { pos: 4, name: "Dr. Ricardo Hahn (Gestão)", score: "3.95", votes: 4, comment: "Denunciou a paralisia e o estouro do contencioso judicial de assistência." }
    ],
    final: {
      sintese: "Negativa e bloqueio automático de benefício fundamental emergencial decorrente de incoerência na base de dados de vínculos trabalhistas ativos no CNIS (registro fantasma).",
      consenso: "Convergência integral sobre a ilegalidade de manter filtros automáticos de corte que empreguem bases reconhecidamente desatualizadas. O ônus de provar a inexistência de vínculo fantasma (fato negativo) não pode recair sobre o trabalhador informal desprovido de auxílio técnico.",
      dissenso: "Debate focado na responsabilização do empregador que não informou a baixa: o orientador em gestão aponta que o fisco depende das declarações privadas, enquanto a ciência de dados e a defensoria rebatem que o cidadão não pode sofrer a punição por omissões de terceiros na burocracia patronal.",
      fundamentacao: "Artigo 6º CF/88 (Mínimo Existencial); Artigos 20 e 46 da LGPD (Segurança e Qualidade dos Dados); e Princípio da Razoabilidade Administrativa.",
      recomendacao: "1. Deferimento cautelar e pagamento emergencial do auxílio fundamentado na autodeclaração de desemprego sob pena de multa diária;\n2. Abertura imediata de canal para inserção de fotos da carteira de trabalho física na plataforma digital;\n3. Instauração de força-tarefa da Dataprev para baixar automaticamente em lote os vínculos trabalhistas de CNPJs extintos ou paralisados há mais de 5 anos.",
      alerta: "Sistemas federais que gerenciam a fome não podem automatizar cortes baseados no CNIS sem previsão de rito simplificado de refutação.",
      minutaRecurso: "RECURSO ADMINISTRATIVO POR INDEFERIMENTO DE AUXÍLIO EMERGENCIAL\n\nAO: MINISTÉRIO DA CIDADANIA / DATAPREV\n\nAssunto: Impugnação de Indeferimento por Vínculo Empregatício Fantasma\n\n1. DA VERDADE FÁTICA - DESEMPREGO PERPÉTUO\nA recorrente encontra-se desempregada, inexistindo qualquer renda formal ou vínculo ativo. O suposto vínculo apontado pelo CNIS refere-se à empresa (CNPJ extinto), onde o empregador faleceu sem proceder à necessária anotação eletrônica.\n\n2. DA IMPOSSIBILIDADE DA PROVA DO FATO NEGATIVO\nExigir que o necessitado produza provas complexas de que NÃO trabalha extrapola os liames da legalidade, devendo prevalecer a autodeclaração com análise fática posterior.\n\n3. DO PEDIDO\nRequer-se o provimento do recurso para conceder e autorizar o depósito do benefício de amparo social.",
      pedidoLAI: "REQUERIMENTO DE RETIFICAÇÃO DE REGISTRO E DADOS PESSOAIS\n\nAO: GERENTE EXECUTIVO DO INSS / MINISTÉRIO DO TRABALHO E EMPREGO\n\nAssunto: Pedido de retificação e baixa em banco de dados do CNIS / Dataprev - Artigo 18 e 19 da LGPD\n\nCom fulcro nos direitos do titular previstos na Lei Geral de Proteção de Dados (Lei 13.709/18), solicita-se a retificação e correção imediata com baixa do registro de trabalho cadastrado incorretamente com status ativo, anexando-se cópia em imagem da carteira de trabalho física do cidadão."
    }
  },
  {
    id: "reconhecimento_facial",
    title: "Segurança Pública — Falso Positivo em Reconhecimento Facial (Salvador/RJ)",
    desc: "Detenção indevida e constrangedora de cidadão inocente em Salvador devido a viés racial de algoritmo de vigilância.",
    tag: "Segurança",
    context: "Um jovem trabalhador negro foi abordado e cercado de forma coercitiva por policiais militares ao sair do metrô em Salvador, sob alegação de possuir mandado de prisão em aberto. O alerta de semelhança biométrica partiu das câmeras inteligentes de monitoramento urbano. O sistema de reconhecimento facial operava com threshold (limiar de precisão) perigosamente relaxado, gerando um 'fuzzy match' errôneo motivado pelo enviesamento de cor intrínseco aos bases estrangeiras de treino da solução.",
    dados: [
      { campo: "Alerta de Semelhança Facial", fonte: "Câmera de Monitoramento Público (IA Privada)", status: "bad", statusLabel: "Match Forçado (90%)" },
      { campo: "Cadastro Biométrico Estadual", fonte: "Instituto de Identificação (SSP-BA)", status: "warn", statusLabel: "Qualidade de Imagem Baixa" },
      { campo: "Verificação de Prontuário de Mandado", fonte: "BNMP / CNJ (Base de Mandados)", status: "ok", statusLabel: "Sem Registro Válido" },
      { campo: "Saneamento Prévio de Identidade", fonte: "Delegacia de Polícia", status: "bad", statusLabel: "Ignorado na Abordagem" }
    ],
    vieses: [
      { label: "Viés fenotípico (pessoas negras)", valor: 94, nivel: "high" },
      { label: "Vulnerabilidade em locais públicos", valor: 85, nivel: "high" },
      { label: "Margem de erro tolerada na IA", valor: 75, nivel: "high" }
    ],
    personas: {
      defensoria: "A condução sob custódia amparada exclusivamente em similaridade estatística inverte o ônus probatório e aniquila a presunção de inocência (Art. 5º, LVII da CF). Conforme Tavares & Bitencourt, a privação de locomoção corporal exige fundada suspeita individualizada e humana, e nunca ordens matemáticas cruas emanadas do banco de imagens sem controle humano prévio.",
      cientista: "Consoante as premissas de Salgado & Saito, sistemas de vigilância baseados em redes neurais convolucionais importadas sofrem de erro no gradiente devido à grave assimetria de representatividade amostral da população negra nos sets de teste originais. O erro estatístico gerou um falso positivo flagrante pela incapacidade do discriminador técnico em diferenciar texturas fenotípicas nacionais.",
      admin: "A desgovernança é nítida. O atalho administrativo de automatizar alertas repressivos sem triagem delegada prévia acarreta milionários processos de indenização de responsabilidade civil contra o erário, além do desvio de recursos materiais policiais em diligências fúteis. Cristóvam & Hahn advertem que transferir o ônus de validação para a rua custa cinco vezes mais que uma arquitetura responsável.",
      cidadao: "Sarlet & Molinaro defendem o direito à notícia compreensível, que no caso assume o aspecto de dignidade na abordagem. O cidadão vulnerabilizado e algemado em público não recebeu qualquer justificativa intelligível, mas o silêncio hostil de um código de alerta na tela policial. É a concretização física da perversa expropriação civil imposta por máquinas sob tutela estatal.",
    },
    rankings: [
      { pos: 1, name: "Dr. Lucas Mendes (Defensoria)", score: "1.08", votes: 4, comment: "Focou irrespondivelmente na violação da liberdade corporal e no devido processo penal." },
      { pos: 2, name: "Profª Clara Santos (Dados)", score: "2.12", votes: 4, comment: "Excelente arrazoado sobre viés algorítmico e sub-representação demográfica." },
      { pos: 3, name: "Sr. Arnaldo Rocha (Cidadão)", score: "2.65", votes: 4, comment: "Tratou com brilhantismo a desumanização e humilhação social da abordagem." },
      { pos: 4, name: "Dr. Ricardo Hahn (Gestão)", score: "3.90", votes: 4, comment: "Expôs o prejuízo pecuniário e o desperdício preventivo do erário com indenizações." }
    ],
    final: {
      sintese: "Restrição indevida do direito de ir e vir decorrente de cruzamento biométrico equivocado gerado por algoritmo de inteligência de videomonitoramento sem controle prévio de homônimos.",
      consenso: "Convergência integral de que: 1) Alarmes de similaridade facial de IA não produzem presunção fundada de culpa para busca policial; 2) Limiares matemáticos configurados por entes privados para monitoramento de segurança pública ferem a reserva jurídica de soberania; 3) O cidadão tem direito à retratação humana digna imediata.",
      dissenso: "Dissenso procedimental: o orientador em gestão julga que a câmera é insubstituível para localização de foragidos de extrema gravidade, embora reconheça de pronto que no presente caso a ausência do devido processo e a falha de triagem fulminaram o ato administrativo criminal.",
      fundamentacao: "Artigos 1º, III, 5º, XV e LXI da CF/88; Resoluções de Governança de IA do Conselho Nacional de Justiça (CNJ); Lei de Proteção de Dados de Segurança Pública (LGPD-Penal/projeto); e tese fixada pelo Superior Tribunal de Justiça (STJ).",
      recomendacao: "1. Implosão imediata das consequências fáticas da abordagem policial com exclusão de eventual registro de incidência eletrônica;\n2. Determinação para que a Secretaria de Segurança Pública desative temporariamente a ferramenta de triagem até auditoria de conformidade racial do modelo;\n3. Rigorosa fixação de threshold mínimo de match de similaridade em 99,5% sob pena de imediata responsabilização do fornecedor do software.",
      alerta: "Softwares de policiamento preditivo e repressão biométrica adquiridos sem homologação e auditoria prévia de impacto aos direitos fundamentais reproduzem a herança do racismo estrutural computorizado.",
      minutaRecurso: "REQUERIMENTO DE RETRATAÇÃO E CANCELAMENTO DE ATALHO DE OCORRÊNCIA\n\nAO: CORREGEDOR-GERAL DA POLÍCIA MILITAR E COMANDO DE OPERAÇÕES METROPOLITANAS\n\nAssunto: Impugnação de Abordagem Policial e Autuação decorrente de Alerta Falso Positivo de Reconhecimento Facial\n\n1. DO ERRO DO ALGORITMO INTEGRADO DE SEGURANÇA\nO requerente restou indevidamente detido e sofrendo cerceamento do livre trânsito nas dependências do metrô por erro estatístico decorrente de semelhança biométrica de rosto captada em câmera municipal com mandado em aberto em nome de terceiro.\n\n2. DA RESPONSABILIDADE CIVIL E RETIRADA DE REGISTRO\nRequer-se a declaração imediata da inocência da conduta e exclusão do prontuário, com a anulação de eventuais relatórios digitais que imputem suspeição futura.\n\n3. DO PEDIDO\nAcolhimento para anular os efeitos do ato arbitrário assistido tecnologicamente.",
      pedidoLAI: "REQUISIÇÃO DETALHADA DE EXPLICABILIDADE BIOMÉTRICA (LAI)\n\nAO: SECRETARIA DE SEGURANÇA PÚBLICA DO ESTADO\n\nAssunto: Solicitação de relatórios de precisão estatística e viés em reconhecimento facial inteligente\n\nCom fundamento na LAI e no Art. 20 da LGPD, requer-se o envio de:\n\n1. Descrição dos algoritmos de convolução utilizados no sistema de videomonitoramento instalado.\n2. Estatísticas semestrais de abordagens de rua que resultaram em falsos positivos desglosadas por raça e localidade geográfica da câmera."
    }
  },
  {
    id: "pente_fino_bpc",
    title: "Pente-Fino em Lote do INSS — Suspensão de BPC sem Perícia",
    desc: "Corte automático de Benefício de Prestação Continuada (LOAS) de deficiente físico fundamentado em cruzamento de bases cadastrais frias.",
    tag: "Previdenciário",
    context: "Uma cidadã cadeirante de baixa renda teve o pagamento de seu Benefício de Prestação Continuada (BPC/LOAS) sumariamente cortado por um algoritmo do INSS que realizou análise de cruzamento em lote. O eSocial indicou que sua filha, habitante de uma moradia de quintal de fundos do terreno, obteve emprego temporário. O algoritmo procedeu ao cálculo de renda per capita em lote de forma seca, presumindo renda familiar unificada contra o cadastro de coabitação informal, cancelando o mantimento físico sem perícia social.",
    dados: [
      { campo: "Informação Tributária eSocial", fonte: "Ministério do Trabalho (eSocial)", status: "ok", statusLabel: "Renda Apurada de Terceiro" },
      { campo: "Localização Domiciliar de Terreno", fonte: "Geolocalização / Cadastro Único", status: "warn", statusLabel: "Coabitação Presumida" },
      { campo: "Histórico de Assistência e Saúde", fonte: "Perícias Médicas do INSS", status: "ok", statusLabel: "Deficiência Confirmada" },
      { campo: "Avaliação Social Humanizada", fonte: "Serviço Social do Município", status: "bad", statusLabel: "Sumariamente Omitida" }
    ],
    vieses: [
      { label: "Moradias complexas de fundo / cortiços", valor: 89, nivel: "high" },
      { label: "Agregados familiares vulneráveis", valor: 78, nivel: "high" },
      { label: "Necessidades materiais especiais", valor: 75, nivel: "high" }
    ],
    personas: {
      defensoria: "O corte do BPC de uma pessoa hipossuficiente sem notificação prévia de contraditório e abertura de prazo para justificação social ofende a dignidade e a vedação ao retrocesso (art. 1º, III, CF). Tavares & Bitencourt assinalam que a amparo constitucional de sobrevivência não se submete à velocidade do processamento fiscal de corte automático.",
      cientista: "Conforme indicam Salgado & Saito, a modelagem que imputa economia partilhada pela mera proximidade de chaves territoriais em lote de fundo de quintal padece de absoluto desconhecimento fático. A inconsistência reside no uso de algoritmos 'cegos' que negligenciam a segregação alimentar e fiduciária interna de agregados habitacionais informais no Brasil.",
      admin: "Discutindo governança, a suspensão em lote sob a ilusão estatística de eficiência fiscal acarreta uma enxurrada de contestações judiciais perante as Varas Previdenciárias Estaduais. Cristóvam & Hahn comprovam que as economias fantasmas de cortes em lote são de longe anuladas pelas polpudas condenações retroativas judiciais com honorários acumulados de sucumbência.",
      cidadao: "Sarlet & Molinaro relembram que a dignidade exige o direito à notícia humana clara. O aplicativo gerou apenas um aviso enigmático de erro: 'Benefício Cessado por Renda Acima do Limite'. Sem letramento jurídico ou acesso digital, o deficiente se esbarra na indisponibilidade material do Meu INSS, gerando fome e profunda exclusão administrativa.",
    },
    rankings: [
      { pos: 1, name: "Dr. Lucas Mendes (Defensoria)", score: "1.20", votes: 4, comment: "Excelente defesa da irreversibilidade alimentar do benefício de amparo social." },
      { pos: 2, name: "Sr. Arnaldo Rocha (Cidadão)", score: "1.92", votes: 4, comment: "Focou impecavelmente no desespero físico e na barreira de locomoção do cadeirante." },
      { pos: 3, name: "Profª Clara Santos (Dados)", score: "2.68", votes: 4, comment: "Perfeita refutação científica das premissas espaciais de moradia unificada." },
      { pos: 4, name: "Dr. Ricardo Hahn (Gestão)", score: "3.95", votes: 4, comment: "Mostrou com clareza o estoiro de custos operacionais com mandados de segurança." }
    ],
    final: {
      sintese: "Suspensão de benefício assistencial BPC motivada por inferência unilateral de renda familiar, suprimindo o rito do contraditório processual e laudo social biopsicossocial.",
      consenso: "Convergência integral estabelecida pelo tribunal de que: 1) O auxílio do BPC constitui mínimo de dignidade e não sofre cortes automáticos por cruzamento cego de bases cadastrais; 2) Núcleos habitacionais de fundo de terreno não presumem contabilidade unificada; 3) A perícia socioassistencial humana é etapa insubstituível do ato legal.",
      dissenso: "Incongruência mínima sobre as exigências de contrapartidas cadastrais do beneficiário, minorada pelo reconhecimento de todos de que a falência no fluxo de triagem e a falta de rito prévio inquinam o ato de impermanência constitucional.",
      fundamentacao: "Artigo 203, V da Constituição Federal; Artigo 20 da LGPD (direito de revisão humana de atos automatizados); Lei Orgânica da Assistência Social (LOAS); e jurisprudência pacificada do Supremo Tribunal Federal (STF) sobre a independência socioeconômica de lares multifamiliares.",
      recomendacao: "1. Restabelecimento imediato dos pagamentos mensais do BPC sob pena de crime de desobediência e multa diária para o INSS;\n2. Determinação de realização de perícia social humana e presencial assistida pelo Centro de Referência de Assistência Social (CRAS) no prazo de 30 dias para análise da real economia domiciliar;\n3. Exclusão definitiva de novas rotinas algorítmicas de suspensão automática que operem análise territorial agregada de lotes sem laudo médico-social humano.",
      alerta: "Sistemas federais de controle previdenciário que automatizam o cancelamento de direitos fundamentais sem callback de revisão humana institucionalizam a exclusão civil dos hipossuficientes.",
      minutaRecurso: "RECURSO ADMINISTRATIVO DE REESTABELECIMENTO DE BPC / LOAS\n\nAO: GERENTE EXECUTIVO DA AGÊNCIA DA PREVIDÊNCIA SOCIAL (INSS)\n\nAssunto: Impugnação de Corte Automatizado de Benefício de Amparo à Pessoa com Deficiência (BPC)\n\n1. DA SEGREGRAÇÃO ECONÔMICA DE COABITAÇÃO\nA requerente é portadora de severa deficiência física e reside de forma independente no lote do terreno. A renda familiar do eSocial apontada pelo robô é originária de parentes em moradia diversa que não participam na compra de remédios ou sobrevivência da reclamante.\n\n2. DA IMPRESCINDIBILIDADE DO LAUDO SOCIAL HUMANO\nO cancelamento carece de qualquer verificação assistida presencial, ofendendo as garantias fundamentais da ampla defesa e o rito obrigatório delineado na LOAS.\n\n3. DO PEDIDO\nRequer-se o restabelecimento urgente do amparo pecuniário sob pena de dano irreparável à vida.",
      pedidoLAI: "PEDIDO DE EXPLICABILIDADE DE PENTE-FINO PREVIDENCIÁRIO (LAI)\n\nAO: CONTROLADORIA DO INSS / MINISTÉRIO DA PREVIDÊNCIA\n\nRequer-se a divulgação das seguintes informações sob amparo da Lei 12.527/11 e Artigo 20 da LGPD:\n\n1. Relação completa de chaves e variáveis territoriais de localização geocodificada integradas no sistema automatizado de pente-fino.\n2. Estatísticas nacionais de benefícios assistenciais restabelecidos judicialmente após suspensão por cruzamento de CNIS e eSocial."
    }
  }
];
