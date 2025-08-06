// --- تحميل البيانات من JSON (كما في الملف الثاني) ---
let htmlCommands = [];
let cssCommands = [];
let javascriptCommands = [];
let currentTab = 'html';
let filteredCommands = [];

// DOM Elements (تعديل حسب تصميم الملف الأول)
const elements = {
  htmlContainer: document.getElementById("html-commands"),
  cssContainer: document.getElementById("css-commands"),
  jsContainer: document.getElementById("javascript-commands"),
};

// تحميل البيانات
async function loadAllData() {
  await Promise.all([loadHTML(), loadCSS(), loadJS()]);
  displayCommands(currentTab); // عرض أولي
}

async function loadHTML() {
  try {
    const res = await fetch("html-commands.json");
    const data = await res.json();
    htmlCommands = data.html_commands || [];
  } catch (e) {
    console.error("HTML load error", e);
  }
}

async function loadCSS() {
  try {
    const res = await fetch("css-commands.json");
    const data = await res.json();
    cssCommands = data.css_commands || [];
  } catch (e) {
    console.error("CSS load error", e);
  }
}

async function loadJS() {
  try {
    const res = await fetch("javascript-commands.json");
    const data = await res.json();
    javascriptCommands = data.javascript_commands || [];
  } catch (e) {
    console.error("JS load error", e);
  }
}

// عرض الأوامر (باستخدام تصميم الملف الأول)
function displayCommands(tab) {
  let container;
  let data;

  switch (tab) {
    case "html":
      container = elements.htmlContainer;
      data = htmlCommands;
      break;
    case "css":
      container = elements.cssContainer;
      data = cssCommands;
      break;
    case "javascript":
      container = elements.jsContainer;
      data = javascriptCommands;
      break;
    default:
      return;
  }

  filteredCommands = data;
  renderAsCards(container, data);
}

// دمج طريقة العرض من الملف الأول (تصميم كروت مثلاً)
function renderAsCards(container, commands) {
  container.innerHTML = "";

  if (commands.length === 0) {
    container.innerHTML = "<p>لا توجد أوامر متاحة</p>";
    return;
  }

  commands.forEach((command) => {
    const card = document.createElement("div");
    card.className = "command-card";

    card.innerHTML = `
      <h3>${escapeHtml(command.name)}</h3>
      <p><strong>النوع:</strong> ${escapeHtml(command.type)}</p>
      <pre><code>${escapeHtml(command.syntax || "")}</code></pre>
      <p>${escapeHtml(command.description || "")}</p>
    `;

    // إضافة النافذة المنبثقة إذا أردت
    card.addEventListener("click", () => {
      showModal(command);
    });

    container.appendChild(card);
  });
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showModal(command) {
  alert(`تفاصيل: ${command.name}`);
}

// التبويبات
function switchTab(tab) {
  currentTab = tab;
  displayCommands(tab);
}

// بدء التحميل
document.addEventListener("DOMContentLoaded", loadAllData);