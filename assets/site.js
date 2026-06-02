const WA_NUMBER = "5521978479229";

function openWhatsApp(message) {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function sendIntake(event) {
  event.preventDefault();
  const name = document.getElementById("nome")?.value.trim();
  const plan = document.getElementById("plano")?.value.trim();
  const situation = document.getElementById("situacao")?.value;
  const details = document.getElementById("descricao")?.value.trim();

  let message = "Olá, gostaria de uma análise inicial sobre um caso de Direito da Saúde.";
  message += `\n\nNome: ${name || "Não informado"}`;
  message += `\nPlano/operadora: ${plan || "Não informado"}`;
  message += `\nSituação: ${situation || "Não informada"}`;
  message += `\nResumo: ${details || "Vou enviar o resumo por áudio no WhatsApp."}`;

  openWhatsApp(message);
}

function sendTopic(event, topic) {
  event.preventDefault();
  openWhatsApp(`Olá! Gostaria de informações sobre ${topic}.`);
}
