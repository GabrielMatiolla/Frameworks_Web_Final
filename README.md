# 🚀 Pokedex Full-Stack & Team Builder

Este é o projeto final da disciplina de **Frameworks Web**, desenvolvido como um sistema completo de gerenciamento de Pokémons. O projeto utiliza uma arquitetura Full-Stack, integrando uma API robusta em **NestJS** com um Frontend interativo em **Angular**.

## 📋 Funcionalidades Principais
* **Catálogo:** Listagem dinâmica consumida de API local.
* **Favoritos:** Sistema de salvamento em memória com rotas `POST` e `DELETE`.
* **Team Builder:** Montagem de time com limite de 6 integrantes e validação de regras de negócio.
* **Arena VS:** Comparação estatística entre dois Pokémons com destaque para atributos superiores.
* **Perfil & Status:** CRUD completo (incluindo `PUT`) para dados do treinador e análise gráfica do time via **Chart.js**.

---

## 🛠 Pré-requisitos
Certifique-se de ter instalado:
* [Node.js](https://nodejs.org/) (v18 ou superior)
* [Git](https://git-scm.com/)

---

## 🚀 Tutorial de Instalação e Execução

### 1. Configurando o Backend (NestJS)
O backend gerencia toda a lógica de persistência em memória e as regras de negócio.

1.  Abra um terminal na pasta do backend:
    ```bash
    cd trabalho-pokemon-backend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run start:dev
    ```
    *A API estará rodando em: `http://localhost:3000`*

### 2. Configurando o Frontend (Angular)
O frontend consome a API do NestJS e oferece uma interface visual rica utilizando *glassmorphism* e gráficos dinâmicos.

1.  Abra um **novo terminal** na pasta do frontend:
    ```bash
    cd trabalho-pokemon
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Instale a biblioteca de gráficos:
    ```bash
    npm install chart.js
    ```
4.  Inicie o projeto Angular:
    ```bash
    ng serve
    ```
    *Acesse o sistema em: `http://localhost:4200`*

---

## ⚙️ Arquitetura Técnica



* **Frontend:** Angular (Standalone Components), TypeScript, Chart.js.
* **Backend:** NestJS, TypeScript, fs (File System para leitura do JSON).
* **Comunicação:** API RESTful (GET, POST, PUT, DELETE).

---

## 👨‍💻 Desenvolvedor
* **Gabriel Tadeu Matiolla**
* Projeto acadêmico para o curso de Análise e Desenvolvimento de Sistemas (Uni Senac).