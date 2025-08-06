// script.js Ø§Ù„Ù…Ø¹Ø¯Ù„ - Ø¯Ù…Ø¬ Ø§Ù„Ø¹Ø±Ø¶ Ù…Ø¹ Ø§Ù„ØªØ­Ù…ÙŠÙ„ Ù…Ù† JSON

let htmlCommands = [];
let cssCommands = [];
let javascriptCommands = [];
let currentTab = 'html';
let filteredCommands = [];

const elements = {
  htmlContainer: document.getElementById("html-commands"),
  cssContainer: document.getElementById("css-commands"),
  jsContainer: document.getElementById("javascript-commands"),
  navButtons: document.querySelectorAll(".nav-btn")
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadAllData();
  switchTab(currentTab);

  elements.navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    });
  });
});

async function loadAllData() {
  await Promise.all([
    loadHTMLCommands(),
    loadCSSCommands(),
    loadJavaScriptCommands()
  ]);
}

async function loadHTMLCommands() {
  try {
    const res = await fetch("html-commands.json");
    const data = await res.json();
    htmlCommands = data.html_commands || [];
  } catch (err) {
    console.error("Error loading HTML commands:", err);
  }
}

async function loadCSSCommands() {
  try {
    const res = await fetch("css-commands.json");
    const data = await res.json();
    cssCommands = data.css_commands || [];
  } catch (err) {
    console.error("Error loading CSS commands:", err);
  }
}

async function loadJavaScriptCommands() {
  try {
    const res = await fetch("javascript-commands.json");
    const data = await res.json();
    javascriptCommands = data.javascript_commands || [];
  } catch (err) {
    console.error("Error loading JS commands:", err);
  }
}

function switchTab(tab) {
  currentTab = tab;

  document.querySelectorAll(".tab-content").forEach(content => {
    content.style.display = "none";
  });

  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  document.getElementById(`${tab}-commands`).parentElement.style.display = "block";
  document.querySelector(`[data-tab="${tab}"]`).classList.add("active");

  let commands = [];

  switch (tab) {
    case "html":
      commands = htmlCommands;
      break;
    case "css":
      commands = cssCommands;
      break;
    case "javascript":
      commands = javascriptCommands;
      break;
  }

  renderCards(tab, commands);
}

function renderCards(tab, commands) {
  const container = document.getElementById(`${tab}-commands`);
  if (!container) return;

  container.innerHTML = "";

  if (commands.length === 0) {
    container.innerHTML = "<p>Ù„Ø§ ØªÙˆØ¬Ø¯ Ø£ÙˆØ§Ù…Ø± Ù„Ø¹Ø±Ø¶Ù‡Ø§.</p>";
    return;
  }

  commands.forEach(cmd => {
    const card = document.createElement("div");
    card.className = "command-card";

    card.innerHTML = `
      <h3>${cmd.name}</h3>
      <pre><code>${cmd.syntax}</code></pre>
      <p>${cmd.description}</p>
      ${cmd.example ? `<div><strong>Ù…Ø«Ø§Ù„:</strong><pre><code>${cmd.example}</code></pre></div>` : ""}
      ${cmd.explanation ? `<div><strong>Ø´Ø±Ø­:</strong><p>${cmd.explanation}</p></div>` : ""}
    `;

    container.appendChild(card);
  });
}