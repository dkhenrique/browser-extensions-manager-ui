import {
  getExtensions,
  updateExtensionStatus,
  removeExtension,
} from "./api.js";

// --- SELETORES DO DOM ---
const themeToggleButton = document.querySelector(".theme-toggle-button");
const extensionsList = document.querySelector(".extensions.grid");
const filterButtons = document.querySelectorAll(".filter-button");

// --- ESTADO DA APLICAÇÃO ---
let allExtensions = [];
let currentFilter = "all"; // 'all', 'active', 'inactive'

// --- FUNÇÕES DE RENDERIZAÇÃO ---

function createExtensionCard(extension) {
  const { id, logo, name, description, isActive } = extension;
  const activeClass = isActive ? "active" : "inactive";
  const checkedAttribute = isActive ? "checked" : "";

  return `
    <li class="extension-card ${activeClass}" data-id="${id}">
      <img src="${logo}" alt="logo of ${name}" />
      <div class="card-content">
        <h3>${name}</h3>
        <p>${description}</p>
      </div>
      <div class="card-footer">
        <button class="remove-btn">Remove</button>
        <label class="switch">
          <input type="checkbox" ${checkedAttribute} />
          <span class="slider"></span>
        </label>
      </div>
    </li>
  `;
}

/**
 * Renderiza a lista de extensões no DOM.
 */

function renderExtensions() {
  let extensionsToRender = allExtensions;

  if (currentFilter === "active") {
    extensionsToRender = allExtensions.filter((ext) => ext.isActive);
  } else if (currentFilter === "inactive") {
    extensionsToRender = allExtensions.filter((ext) => !ext.isActive);
  }

  if (extensionsToRender.length === 0) {
    extensionsList.innerHTML =
      '<p class="empty-message">Nenhuma extensão encontrada.</p>';
    return;
  }

  extensionsList.innerHTML = extensionsToRender
    .map(createExtensionCard)
    .join("");
}

// --- MANIPULADORES DE EVENTOS ---

async function handleRemoveClick(event) {
  const card = event.target.closest(".extension-card");
  if (card) {
    const id = parseInt(card.dataset.id, 10);
    try {
      await removeExtension(id);
      // Remove a extensão do estado local e renderiza novamente
      allExtensions = allExtensions.filter((ext) => ext.id !== id);
      renderExtensions();
    } catch (error) {
      console.error("Falha ao remover extensão:", error);
      // Opcional: Mostrar uma mensagem de erro para o usuário
    }
  }
}

async function handleStatusToggle(event) {
  const card = event.target.closest(".extension-card");
  if (card) {
    const id = parseInt(card.dataset.id, 10);
    const isActive = event.target.checked;
    try {
      await updateExtensionStatus(id, isActive);
      // Atualiza o estado local
      const extension = allExtensions.find((ext) => ext.id === id);
      if (extension) {
        extension.isActive = isActive;
      }

      // Atualiza apenas este card específico, sem recarregar a página
      if (currentFilter === "all") {
        // Se mostrando todos, apenas atualiza as classes do card
        card.classList.toggle("active", isActive);
        card.classList.toggle("inactive", !isActive);
      } else {
        // Se há filtro ativo, precisamos verificar se o card deve continuar visível
        if (
          (currentFilter === "active" && !isActive) ||
          (currentFilter === "inactive" && isActive)
        ) {
          // O card não deve mais estar visível com o filtro atual
          card.style.display = "none";
        } else {
          // Atualiza as classes normalmente
          card.classList.toggle("active", isActive);
          card.classList.toggle("inactive", !isActive);
        }
      }
    } catch (error) {
      console.error("Falha ao atualizar status:", error);
      // Reverte o checkbox em caso de erro
      event.target.checked = !isActive;
    }
  }
}

/**
 * Manipula o clique nos botões de filtro.
 * @param {Event} event - O evento de clique.
 */
function handleFilterClick(event) {
  const button = event.target;
  currentFilter = button.textContent.toLowerCase();

  // Atualiza a classe 'active' nos botões
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  renderExtensions();
}

/**
 * Configura os event listeners para a lista de extensões.
 */
function setupEventListeners() {
  extensionsList.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      handleRemoveClick(event);
    }
  });

  extensionsList.addEventListener("change", (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
      handleStatusToggle(event);
    }
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", handleFilterClick);
  });
}

// --- FUNÇÃO DE INICIALIZAÇÃO ---

/**
 * Inicializa a aplicação.
 */
async function init() {
  // Função para aplicar o tema
  function applyTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
    const icon = themeToggleButton.querySelector("img");
    const altText = themeToggleButton.querySelector("img").alt;

    if (theme === "light-theme") {
      icon.src = "assets/images/icon-moon.svg";
      icon.alt = "icon to toggle dark mode";
    } else {
      icon.src = "assets/images/icon-sun.svg";
      icon.alt = "icon to toggle light mode";
    }
  }

  // Carrega o tema salvo ou usa o tema escuro como padrão
  const savedTheme = localStorage.getItem("theme") || "dark-theme";
  applyTheme(savedTheme);

  // Adiciona o event listener para o botão de troca de tema
  themeToggleButton.addEventListener("click", () => {
    const currentTheme = document.body.className;
    const newTheme =
      currentTheme === "light-theme" ? "dark-theme" : "light-theme";
    applyTheme(newTheme);
  });

  // Carrega as extensões e renderiza
  try {
    allExtensions = await getExtensions();
    renderExtensions();
    setupEventListeners();
  } catch (error) {
    console.error("Erro ao inicializar a aplicação:", error);
    extensionsList.innerHTML =
      '<p class="error-message">Falha ao carregar as extensões. Tente novamente mais tarde.</p>';
  }
}

// --- INICIA A APLICAÇÃO ---
init();
