# ⚡ Pokedex Full-Stack (Angular + NestJS)

Projeto final da disciplina de Frameworks Web do curso de Análise e Desenvolvimento de Sistemas da Uni Senac. Esta aplicação Full-Stack consiste em um catálogo de Pokémons interativo com sistema de usuários, autenticação, favoritos e uma arena de batalhas virtual.

**Autor:** Gabriel Tadeu Matiolla
**Instituição:** Uni Senac

---

## 🛠️ Tecnologias Utilizadas

**Front-end:**
* Angular (v17+)
* TypeScript, HTML5, CSS3
* Integração via Fetch API

**Back-end:**
* NestJS
* TypeORM
* JWT (JSON Web Token) & Bcrypt (Autenticação e Criptografia)

**Banco de Dados:**
* MySQL (Relacional)

---

## 🚀 Funcionalidades Implementadas

* **CRUD Completo de Pokémons:** Adição, listagem, edição e exclusão persistidos no MySQL.
* **Autenticação de Usuários:** Cadastro e Login com criptografia de senhas e geração de Token JWT.
* **Perfil do Treinador:** Gerenciamento de sessão com foto de perfil (avatar) personalizada e balão fixo na interface.
* **Sistema de Favoritos:** Relacionamento entre Usuários e Pokémons (1:N), permitindo "curtir" e listar favoritos salvos no banco.
* **Arena VS:** Lógica de front-end que permite selecionar dois Pokémons e compará-los matematicamente com base na soma de seus atributos base para declarar o vencedor.

---

## ⚙️ Como executar o projeto na máquina local

Para rodar este projeto na sua máquina (ou na da faculdade), você precisará de 3 coisas rodando simultaneamente: o Banco de Dados, o Back-end e o Front-end. Siga os passos abaixo:

### Passo 1: Preparar o Banco de Dados
1. Abra o seu gerenciador do MySQL.
2. Crie um banco de dados vazio chamado `pokedex_db`.
   * *Comando SQL:* `CREATE DATABASE pokedex_db;`
3. **Atenção:** Verifique no arquivo `pokemon-backend/src/app.module.ts` se o usuário (`username`) e a senha (`password`) estão corretos de acordo com a máquina que você está usando.

### Passo 2: Iniciar o Back-end (NestJS)
1. Abra um terminal e navegue até a pasta do servidor:
   ```bash
   cd pokemon-backend
   ```
2. Instale as dependências (necessário apenas na primeira vez):
   ```bash
   npm install
   ```
3. Inicie o servidor:
   ```bash
   npm run start:dev
   ```
4. *Nota:* Ao iniciar, o TypeORM irá sincronizar e criar todas as tabelas automaticamente (`usuarios`, `pokemons`, `favoritos`) no seu MySQL. Aguarde a mensagem verde: `Nest application successfully started`. O backend rodará na **porta 3000**.

### Passo 3: Iniciar o Front-end (Angular)
1. Abra um **novo terminal** (deixe o backend rodando) e navegue até a pasta do front-end:
   ```bash
   cd trabalho-pokemon
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor do Angular:
   ```bash
   npx ng serve
   ```
4. Aguarde a mensagem verde: `Compiled successfully`. O frontend rodará na **porta 4200**.

### Passo 4: Acessar a Aplicação
Com os dois servidores rodando, abra o seu navegador e acesse:
👉 **http://localhost:4200**

---

## 🧪 Como testar a aplicação

1. Ao abrir o sistema, navegue até a aba **Treinador**.
2. Vá em **Cadastro** e crie uma conta nova (insira uma URL válida para sua foto de perfil).
3. Faça o **Login** com a conta recém-criada. O balão do usuário deve aparecer no canto superior direito.
4. Adicione novos Pokémons pelo botão **➕ Novo Pokémon**.
5. Abra o card de um Pokémon e clique no botão de **Adicionar aos Favoritos**.
6. Vá na aba **Favoritos** para garantir que a persistência no banco de dados funcionou.
7. Vá na aba **Arena**, selecione dois lutadores e inicie a batalha!