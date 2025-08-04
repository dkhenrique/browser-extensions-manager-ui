# Frontend Mentor - Browser Extensions Manager UI Solution

Esta é uma solução para o [desafio Browser Extensions Manager UI do Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Os desafios do Frontend Mentor ajudam você a melhorar suas habilidades de codificação construindo projetos realistas.

## Índice

- [Visão Geral](#visão-geral)
  - [O Desafio](#o-desafio)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [Meu Processo](#meu-processo)
  - [Construído Com](#construído-com)
  - [O Que Aprendi](#o-que-aprendi)
  - [Funcionalidades Implementadas](#funcionalidades-implementadas)
  - [Como Executar](#como-executar)
- [Autor](#autor)

## Visão Geral

### O Desafio

Os usuários devem ser capazes de:

- ✅ Alternar extensões entre estados ativo e inativo
- ✅ Filtrar extensões ativas e inativas
- ✅ Remover extensões da lista
- ✅ Selecionar tema de cores (claro/escuro)
- ✅ Ver o layout ideal para a interface dependendo do tamanho da tela do dispositivo
- ✅ Ver estados de hover e foco para todos os elementos interativos na página
- ✅ Adicionar novas extensões (funcionalidade extra)
- ✅ Persistência de dados via API simulada

### Screenshot

![Preview do projeto](./preview.jpg)

### Links

- URL da Solução: [GitHub Repository](https://github.com/your-username/browser-extensions-manager-ui)
- URL do Site: [Live Demo](https://your-live-site-url.com)

## Meu Processo

### Construído Com

- **HTML5** semântico
- **CSS3** com propriedades customizadas (CSS Variables)
- **Flexbox** e **CSS Grid** para layouts
- **JavaScript ES6+** vanilla
- **JSON Server** para simulação de API REST
- **Fetch API** para requisições HTTP
- **LocalStorage** para persistência de tema
- Design **Mobile-first**
- Princípios de **Design Responsivo**

### O Que Aprendi

Durante este projeto, aprofundei conhecimentos em várias áreas importantes do desenvolvimento frontend:

#### 1. Sistema de Temas Dinâmicos

```css
:root {
  --neutral-900: hsl(227, 75%, 14%);
  --neutral-0: hsla(200, 60%, 99%, 1);
}

body.light-theme {
  background: var(--light-gradient);
  color: var(--neutral-900);
}
```

#### 2. Manipulação Avançada de DOM

```javascript
const renderExtensions = (extensionsToRender = extensions) => {
  const extensionsGrid = document.querySelector(".extensions");
  extensionsGrid.innerHTML = "";

  extensionsToRender.forEach((extension) => {
    const listItem = createExtensionCard(extension);
    extensionsGrid.appendChild(listItem);
  });
};
```

#### 3. API REST com JSON Server

```javascript
export const updateExtensionStatus = async (id, isActive) => {
  try {
    const response = await fetch(`${API_BASE_URL}/data/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive }),
    });
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
  }
};
```

### Funcionalidades Implementadas

#### ✨ Gerenciamento de Extensões

- **Visualização**: Grid responsivo com cards informativos
- **Filtros**: All, Active, Inactive com transições suaves
- **Toggle Status**: Switch animado para ativar/desativar extensões
- **Remoção**: Botão de exclusão com confirmação visual

#### 🎨 Sistema de Temas

- **Tema Escuro**: Design principal com gradientes escuros
- **Tema Claro**: Versão clara com contrastes otimizados
- **Persistência**: Salva preferência no localStorage
- **Transições**: Animações suaves na troca de temas

#### 📱 Design Responsivo

- **Mobile-first**: Otimizado para dispositivos móveis
- **Breakpoints**: 480px, 768px para diferentes telas
- **Grid Flexível**: Auto-ajuste baseado no tamanho da tela

#### 🔗 API Simulada

- **CRUD Completo**: Create, Read, Update, Delete
- **JSON Server**: Simulação de backend real
- **Error Handling**: Tratamento de erros de rede
- **Loading States**: Feedback visual durante operações

### Como Executar

1. **Clone o repositório**

```bash
git clone https://github.com/your-username/browser-extensions-manager-ui.git
cd browser-extensions-manager-ui
```

2. **Instale o JSON Server** (se não tiver)

```bash
npm install -g json-server
```

3. **Inicie o servidor de dados**

```bash
json-server --watch backend/data.json --port 3000
```

4. **Abra o projeto**

- Use um servidor local (Live Server no VS Code)
- Ou abra `index.html` diretamente no navegador

5. **URLs importantes**

- Frontend: `http://localhost:5500` (ou porta do seu servidor)
- API: `http://localhost:3000/data`

### Estrutura do Projeto

```
├── index.html              # Estrutura principal da página
├── css/
│   └── style.css          # Estilos completos com temas
├── js/
│   ├── main.js           # Lógica principal da aplicação
│   └── api.js            # Funções de comunicação com API
├── backend/
│   └── data.json         # Dados das extensões para JSON Server
├── assets/
│   ├── images/           # Ícones e logos
│   └── fonts/            # Fontes do projeto
└── design/               # Arquivos de design de referência
```

### Recursos Úteis

- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - Excelente para entender layouts em grid
- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Referência completa para requisições HTTP
- [JSON Server](https://github.com/typicode/json-server) - Ferramenta para criar APIs REST fake
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) - Guia sobre variáveis CSS

## Autor

- Website - [Daniel Henrique](https://github.com/dkhenrique)
- Frontend Mentor - [@dkhenrique](https://www.frontendmentor.io/profile/danielhenrique)
- LinkedIn - [Daniel Henrique](https://www.linkedin.com/in/daniel-henrique-d-santos/)

--
