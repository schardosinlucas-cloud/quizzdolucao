
const perguntas = [
  {
    categoria: "História",
    pergunta: "Qual acontecimento é tradicionalmente usado para marcar a queda do Império Romano do Ocidente?",
    alternativas: [
      "A conquista de Constantinopla",
      "A deposição de Rômulo Augústulo",
      "A assinatura da Magna Carta",
      "O início das Cruzadas"
    ],
    correta: 1,
    dica: "Aconteceu em 476 d.C., quando o último imperador ocidental foi deposto."
  },
  {
    categoria: "Ciências",
    pergunta: "Qual organela celular é a principal responsável pela produção de ATP na respiração celular?",
    alternativas: [
      "Ribossomo",
      "Lisossomo",
      "Mitocôndria",
      "Complexo golgiense"
    ],
    correta: 2,
    dica: "É conhecida como a 'usina de energia' da célula."
  },
  {
    categoria: "Matemática",
    pergunta: "Se x² − 5x + 6 = 0, quais são as raízes da equação?",
    alternativas: [
      "1 e 6",
      "−2 e −3",
      "2 e 3",
      "−1 e −6"
    ],
    correta: 2,
    dica: "Procure dois números cuja soma seja 5 e cujo produto seja 6."
  },
  {
    categoria: "Geografia",
    pergunta: "Qual linha imaginária corresponde à latitude de 0°?",
    alternativas: [
      "Trópico de Capricórnio",
      "Meridiano de Greenwich",
      "Círculo Polar Ártico",
      "Linha do Equador"
    ],
    correta: 3,
    dica: "Ela divide a Terra em hemisférios Norte e Sul."
  },
  {
    categoria: "Física",
    pergunta: "No Sistema Internacional, qual é a unidade de medida da potência?",
    alternativas: [
      "Joule",
      "Watt",
      "Pascal",
      "Newton"
    ],
    correta: 1,
    dica: "Seu símbolo é W, em homenagem a James Watt."
  },
  {
    categoria: "Literatura",
    pergunta: "Quem escreveu o romance brasileiro Dom Casmurro?",
    alternativas: [
      "José de Alencar",
      "Machado de Assis",
      "Aluísio Azevedo",
      "Graciliano Ramos"
    ],
    correta: 1,
    dica: "É também o autor de Memórias Póstumas de Brás Cubas."
  },
  {
    categoria: "Química",
    pergunta: "Qual é o número atômico de um elemento que possui 11 prótons?",
    alternativas: [
      "10",
      "11",
      "12",
      "22"
    ],
    correta: 1,
    dica: "O número atômico é igual à quantidade de prótons."
  },
  {
    categoria: "Astronomia",
    pergunta: "Qual planeta do Sistema Solar tem o período de rotação mais longo que seu período de translação?",
    alternativas: [
      "Marte",
      "Júpiter",
      "Vênus",
      "Mercúrio"
    ],
    correta: 2,
    dica: "Esse planeta gira muito lentamente e no sentido retrógrado."
  },
  {
    categoria: "Biologia",
    pergunta: "Na síntese de proteínas, qual molécula transporta aminoácidos até o ribossomo?",
    alternativas: [
      "DNA",
      "RNA mensageiro",
      "RNA transportador",
      "ATP sintase"
    ],
    correta: 2,
    dica: "Seu nome abreviado é RNAt."
  },
  {
    categoria: "Matemática",
    pergunta: "Uma população de bactérias dobra a cada hora. Começando com 500 bactérias, quantas haverá após 6 horas, se nada limitar o crescimento?",
    alternativas: [
      "3.000",
      "16.000",
      "32.000",
      "64.000"
    ],
    correta: 2,
    dica: "Multiplique 500 por 2 seis vezes, ou calcule 500 × 2⁶."
  }
];

// Prêmios por pergunta. O valor alcançado é mantido ao errar.
const premios = [
  1000, 5000, 10000, 25000, 50000,
  100000, 200000, 300000, 500000, 1000000
];

let perguntaAtual = 0;
let premioAtual = 0;
let vidas = 3;
let respondeu = false;
let jogoFinalizado = false;
let multiplicadorAtivo = false;
let poderesUsados = {
  dica: false,
  eliminar: false,
  dobrar: false
};

const usos = {
  dica: 2,
  eliminar: 2,
  dobrar: 2
};

const $ = (id) => document.getElementById(id);

const el = {
  jogo: $("jogo"),
  final: $("final"),
  numero: $("numero-pergunta"),
  premio: $("premio"),
  vidas: $("vidas"),
  progresso: $("progresso"),
  categoria: $("categoria"),
  pergunta: $("pergunta"),
  alternativas: $("alternativas"),
  mensagem: $("mensagem"),
  dica: $("dica"),
  eliminar: $("eliminar"),
  dobrar: $("dobrar"),
  usosDica: $("usos-dica"),
  usosEliminar: $("usos-eliminar"),
  usosDobrar: $("usos-dobrar"),
  textoDica: $("texto-dica"),
  proxima: $("proxima"),
  parar: $("parar"),
  musica: $("musica"),
  tituloFinal: $("titulo-final"),
  motivoFinal: $("motivo-final"),
  premioFinal: $("premio-final"),
  linkPix: $("link-pix"),
  gerarQr: $("gerar-qr"),
  areaQr: $("area-qr"),
  qrCode: $("qr-code"),
  abrirLink: $("abrir-link"),
  reiniciar: $("reiniciar")
};

function formatarDinheiro(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
  });
}

function atualizarStatus() {
  el.numero.textContent = `${perguntaAtual + 1}/10`;
  el.premio.textContent = formatarDinheiro(premioAtual);
  el.vidas.textContent = "❤️ ".repeat(vidas).trim() || "💔";
  el.progresso.style.width = `${(perguntaAtual / perguntas.length) * 100}%`;

  el.usosDica.textContent = `${usos.dica} usos`;
  el.usosEliminar.textContent = `${usos.eliminar} usos`;
  el.usosDobrar.textContent = `${usos.dobrar} usos`;

  el.dica.disabled = usos.dica <= 0 || respondeu || jogoFinalizado;
  el.eliminar.disabled = usos.eliminar <= 0 || respondeu || jogoFinalizado;
  el.dobrar.disabled = usos.dobrar <= 0 || respondeu ||
    jogoFinalizado || multiplicadorAtivo;

  el.parar.disabled = jogoFinalizado;
}

function carregarPergunta() {
  if (perguntaAtual >= perguntas.length) {
    terminarJogo("Você respondeu às 10 perguntas! Parabéns!");
    return;
  }

  respondeu = false;
  multiplicadorAtivo = false;
  poderesUsados = { dica: false, eliminar: false, dobrar: false };

  const p = perguntas[perguntaAtual];

  el.categoria.textContent = p.categoria;
  el.pergunta.textContent = p.pergunta;
  el.alternativas.innerHTML = "";
  el.mensagem.textContent = "";
  el.textoDica.textContent = "";
  el.proxima.disabled = true;
  el.proxima.textContent = perguntaAtual === 9
    ? "Ver resultado 🏆"
    : "Próxima pergunta →";

  p.alternativas.forEach((texto, indice) => {
    const botao = document.createElement("button");
    botao.className = "resposta";
    botao.innerHTML =
      `<span class="letra">${String.fromCharCode(65 + indice)}.</span> `;

    botao.append(document.createTextNode(texto));
    botao.addEventListener("click", () => verificarResposta(indice));
    el.alternativas.appendChild(botao);
  });

  atualizarStatus();
}

function verificarResposta(indice) {
  if (respondeu || jogoFinalizado) return;

  respondeu = true;
  const p = perguntas[perguntaAtual];
  const botoes = [...el.alternativas.querySelectorAll(".resposta")];

  botoes.forEach((botao, i) => {
    botao.disabled = true;
    if (i === p.correta) botao.classList.add("correta");
    if (i === indice && i !== p.correta) {
      botao.classList.add("errada");
    }
  });

  if (indice === p.correta) {
    let valorGanho = premios[perguntaAtual];

    if (multiplicadorAtivo) {
      valorGanho *= 2;
    }

    premioAtual = Math.min(1000000, valorGanho);
    el.mensagem.textContent =
      `✅ Acertou! Seu prêmio agora é ${formatarDinheiro(premioAtual)}.`;
    el.mensagem.style.color = "#28d99a";
    tocarNota(660, 0.18);
    el.progresso.style.width =
      `${((perguntaAtual + 1) / perguntas.length) * 100}%`;
    el.proxima.disabled = false;

    if (perguntaAtual === perguntas.length - 1) {
      el.proxima.textContent = "Finalizar quiz 🏆";
    }
  } else {
    vidas--;
    el.mensagem.textContent =
      `❌ Resposta errada! Você perdeu uma vida, mas manteve ${formatarDinheiro(premioAtual)}.`;
    el.mensagem.style.color = "#ff7185";
    tocarNota(180, 0.3);

    if (vidas <= 0) {
      atualizarStatus();
      terminarJogo("Suas 3 vidas acabaram! Você mantém o prêmio conquistado nas perguntas anteriores.");
      return;
    }

    el.proxima.disabled = false;
  }

  atualizarStatus();
}

function usarDica() {
  if (respondeu || usos.dica <= 0 || jogoFinalizado) return;

  usos.dica--;
  poderesUsados.dica = true;
  el.textoDica.textContent = `💡 Dica: ${perguntas[perguntaAtual].dica}`;
  atualizarStatus();
}

function eliminarOpcao() {
  if (respondeu || usos.eliminar <= 0 || jogoFinalizado) return;

  usos.eliminar--;
  poderesUsados.eliminar = true;

  const p = perguntas[perguntaAtual];
  const incorretas = [...el.alternativas.querySelectorAll(".resposta")]
    .filter((botao, indice) =>
      indice !== p.correta && !botao.classList.contains("eliminada")
    );

  if (incorretas.length > 0) {
    const escolha = incorretas[
      Math.floor(Math.random() * incorretas.length)
    ];
    escolha.classList.add("eliminada");
    escolha.disabled = true;
  }

  atualizarStatus();
}

function dobrarPremio() {
  if (respondeu || usos.dobrar <= 0 || jogoFinalizado ||
      multiplicadorAtivo) return;

  usos.dobrar--;
  multiplicadorAtivo = true;
  poderesUsados.dobrar = true;
  el.mensagem.textContent =
    "✨ Prêmio 2× ativado! Se acertar, o valor desta pergunta será dobrado.";
  el.mensagem.style.color = "#d6a5ff";
  atualizarStatus();
}

function terminarJogo(motivo) {
  jogoFinalizado = true;
  el.jogo.classList.add("escondido");
  el.final.classList.remove("escondido");
  el.tituloFinal.textContent = premioAtual >= 1000000
    ? "VOCÊ É O MILIONÁRIO! 🏆"
    : "Fim de jogo!";
  el.motivoFinal.textContent = motivo;
  el.premioFinal.textContent = formatarDinheiro(premioAtual);
  el.progresso.style.width = "100%";
}

function pararELevarMetade() {
  if (jogoFinalizado) return;

  const metade = Math.floor(premioAtual / 2);
  premioAtual = metade;
  terminarJogo(
    `Você decidiu parar e levar metade do prêmio acumulado: ${formatarDinheiro(metade)}.`
  );
}

function proximaPergunta() {
  if (!respondeu || jogoFinalizado) return;

  if (perguntaAtual === perguntas.length - 1) {
    terminarJogo("Você completou todas as 10 perguntas!");
    return;
  }

  perguntaAtual++;
  carregarPergunta();
}

// Música ambiente suave criada com Web Audio API.
// O navegador só inicia o áudio após um clique do usuário.
let contextoAudio = null;
let oscilador = null;
let volumeMusica = null;
let musicaLigada = false;
let intervaloMusica = null;
let notaAtual = 0;

function tocarNota(frequencia, duracao = 0.25) {
  if (!contextoAudio || contextoAudio.state !== "running") return;

  const nota = contextoAudio.createOscillator();
  const volume = contextoAudio.createGain();

  nota.type = "sine";
  nota.frequency.value = frequencia;
  volume.gain.setValueAtTime(0.0001, contextoAudio.currentTime);
  volume.gain.exponentialRampToValueAtTime(
    0.045, contextoAudio.currentTime + 0.03
  );
  volume.gain.exponentialRampToValueAtTime(
    0.0001, contextoAudio.currentTime + duracao
  );

  nota.connect(volume);
  volume.connect(contextoAudio.destination);
  nota.start();
  nota.stop(contextoAudio.currentTime + duracao + 0.03);
}

function alternarMusica() {
  if (!contextoAudio) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    if (!AudioContext) {
      el.musica.textContent = "Áudio indisponível";
      return;
    }

    contextoAudio = new AudioContext();
  }

  if (contextoAudio.state === "suspended") contextoAudio.resume();

  musicaLigada = !musicaLigada;

  if (musicaLigada) {
    el.musica.textContent = "♫ Desligar música";

    const melodia = [261.63, 329.63, 392.00, 329.63, 293.66, 349.23, 392.00, 349.23];

    intervaloMusica = setInterval(() => {
      if (!musicaLigada) return;
      tocarNota(melodia[notaAtual % melodia.length], 0.65);
      notaAtual++;
    }, 700);
  } else {
    el.musica.textContent = "♫ Ligar música";
    clearInterval(intervaloMusica);
  }
}

function gerarQRCode() {
  const link = el.linkPix.value.trim();

  if (!link) {
    alert("Digite primeiro um link para gerar o QR Code.");
    return;
  }

  let url;

  try {
    url = new URL(link);
  } catch {
    alert("Esse link não parece válido. Confira o endereço.");
    return;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") {
    alert("Use um link que comece com http:// ou https://.");
    return;
  }

  // O QR Code codifica o link informado; não cria uma cobrança Pix.
  el.qrCode.src =
    "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=" +
    encodeURIComponent(url.href);

  el.abrirLink.href = url.href;
  el.abrirLink.textContent = "Abrir link informado ↗";
  el.areaQr.classList.remove("escondido");
}

function reiniciarJogo() {
  perguntaAtual = 0;
  premioAtual = 0;
  vidas = 3;
  respondeu = false;
  jogoFinalizado = false;
  multiplicadorAtivo = false;

  usos.dica = 2;
  usos.eliminar = 2;
  usos.dobrar = 2;

  el.final.classList.add("escondido");
  el.jogo.classList.remove("escondido");
  el.areaQr.classList.add("escondido");
  el.linkPix.value = "";

  carregarPergunta();
}