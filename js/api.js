const API_URL = "http://localhost:3000/data";

export async function getExtensions() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Não foi possível buscar as extensões.");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar extensões:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}

export async function updateExtensionStatus(id, isActive) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive }),
    });
    if (!response.ok) {
      throw new Error("Não foi possível atualizar a extensão.");
    }
    return await response.json();
  } catch (error) {
    console.error(`Erro ao atualizar a extensão ${id}:`, error);
    throw error;
  }
}

export async function removeExtension(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Não foi possível remover a extensão.");
    }
  } catch (error) {
    console.error(`Erro ao remover a extensão ${id}:`, error);
    throw error;
  }
}
