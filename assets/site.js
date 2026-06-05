const WA_NUMBER = "5521978479229";

function trackEvent(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, {
    page_path: window.location.pathname,
    page_title: document.title,
    ...params
  });
}

function openWhatsApp(message, source = "site", topic = "atendimento") {
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;

  trackEvent("click_whatsapp", {
    event_category: "contact",
    contact_method: "whatsapp",
    link_url: url,
    source,
    topic
  });

  window.open(url, "_blank", "noopener,noreferrer");
}

function sendIntake(event) {
  event.preventDefault();
  const name = document.getElementById("nome")?.value.trim();
  const plan = document.getElementById("plano")?.value.trim();
  const situation = document.getElementById("situacao")?.value;
  const details = document.getElementById("descricao")?.value.trim();

  trackEvent("generate_lead", {
    event_category: "lead",
    method: "whatsapp_form",
    form_name: "triagem_direito_saude",
    lead_area: "direito_da_saude",
    health_plan_informed: Boolean(plan),
    situation: situation || "nao_informada"
  });

  let message = "Olá, gostaria de uma análise inicial sobre um caso de Direito da Saúde.";
  message += `\n\nNome: ${name || "Não informado"}`;
  message += `\nPlano/operadora: ${plan || "Não informado"}`;
  message += `\nSituação: ${situation || "Não informada"}`;
  message += `\nResumo: ${details || "Vou enviar o resumo por áudio no WhatsApp."}`;

  openWhatsApp(message, "intake_form", "direito_da_saude");
}

function sendTopic(event, topic) {
  event.preventDefault();
  trackEvent("select_content", {
    event_category: "contact_intent",
    content_type: "whatsapp_topic",
    item_id: topic
  });
  openWhatsApp(`Olá! Gostaria de informações sobre ${topic}.`, "topic_button", topic);
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href") || "";

  if (href.startsWith("mailto:")) {
    trackEvent("click_email", {
      event_category: "contact",
      contact_method: "email",
      link_url: href
    });
    return;
  }

  if (href && !href.startsWith("#") && !href.startsWith("mailto:")) {
    trackEvent("select_content", {
      event_category: "navigation",
      content_type: "internal_link",
      link_text: link.textContent.trim(),
      link_url: href
    });
  }
});
