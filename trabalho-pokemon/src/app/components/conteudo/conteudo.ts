import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conteudo.html',
  styleUrls: ['./conteudo.css']
})
export class ConteudoComponent implements OnInit {
abaAtiva: 'catalogo' | 'favoritos' | 'time' | 'perfil' | 'arena' = 'catalogo';  
  pokemons: any[] = [];
  catalogoCompleto: any[] = [];
  pokemonSelecionado: any = null;
  
  // Variáveis do CRUD
  modoEdicaoPokemon: boolean = false;
  dadosEdicaoPokemon: any = {};
  modoCadastro: boolean = false;
  novoPokemon: any = this.gerarPokemonVazio();

  // Variáveis de Autenticação e Favoritos
  usuarioLogado: any = null;
  token: string | null = null;
  modoAuth: 'login' | 'cadastro' = 'login';
  dadosLogin = { email: '', senha: '' };
  dadosCadastro = { nome: '', email: '', senha: '', regiao: 'Kanto', avatar: '' };
  
  favoritosUsuario: any[] = [];
  // Variáveis da Arena (VS)
  lutador1: any = null;
  lutador2: any = null;
  resultadoBatalha: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const tokenSalvo = localStorage.getItem('token');
    const userSalvo = localStorage.getItem('usuario');
    
    if (tokenSalvo && userSalvo) {
      this.token = tokenSalvo;
      this.usuarioLogado = JSON.parse(userSalvo);
      this.carregarFavoritos();
    }
    
    this.carregarTodos();
  }

  // --- MÉTODOS DE FAVORITOS ---
  carregarFavoritos() {
    if (!this.usuarioLogado) return;
    
    fetch(`http://localhost:3000/favorito/${this.usuarioLogado.id}`)
      .then(r => r.json())
      .then(favs => {
        const nomesFavoritos = favs.map((f: any) => f.pokemonNome);
        this.favoritosUsuario = this.catalogoCompleto.filter(p => nomesFavoritos.includes(p.nome));
        this.cdr.detectChanges();
      });
  }

  alternarFavorito(pokemon: any) {
    if (!this.usuarioLogado) {
      alert('Você precisa estar logado para favoritar!');
      return;
    }

    fetch('http://localhost:3000/favorito', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuarioId: this.usuarioLogado.id,
        pokemonNome: pokemon.nome
      })
    })
    .then(async (r) => {
      if (r.ok) {
        this.carregarFavoritos(); // Atualiza a lista se deu certo
      } else {
        // Mostra o erro do backend na tela
        const erro = await r.json();
        alert('Erro ao favoritar: ' + erro.message);
      }
    })
    .catch(e => {
      alert('Erro de conexão com o banco de dados.');
      console.error(e);
    });
  }

  isFavorito(nome: string): boolean {
    return this.favoritosUsuario.some(p => p.nome === nome);
  }

  // --- MÉTODOS DE AUTENTICAÇÃO ---
  fazerLogin() {
    fetch('http://localhost:3000/usuario/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.dadosLogin)
    })
    .then(async (r) => {
      const resposta = await r.json();
      if (r.ok) {
        this.token = resposta.access_token;
        this.usuarioLogado = resposta.usuario;
        localStorage.setItem('token', this.token as string);
        localStorage.setItem('usuario', JSON.stringify(this.usuarioLogado));
        
        alert('Bem-vindo, ' + this.usuarioLogado.nome + '!');
        this.carregarFavoritos();
        this.abaAtiva = 'catalogo';
      } else {
        alert(resposta.message || 'Erro ao fazer login.');
      }
    });
  }

  fazerCadastro() {
    fetch('http://localhost:3000/usuario/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.dadosCadastro)
    })
    .then(async (r) => {
      if (r.ok) {
        alert('Treinador cadastrado com sucesso! Faça seu login.');
        this.modoAuth = 'login';
      } else {
        const resposta = await r.json();
        alert(resposta.message || 'Erro ao cadastrar.');
      }
    });
  }

  fazerLogout() {
    this.token = null;
    this.usuarioLogado = null;
    this.favoritosUsuario = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.abaAtiva = 'perfil';
  }

  // --- MÉTODOS DO CRUD ---
  gerarPokemonVazio() {
    return { nome: '', imagem: '', altura: 0, peso: 0, hp: 0, attack: 0, defense: 0, spAttack: 0, spDefense: 0, speed: 0 };
  }

  carregarTodos() { 
    fetch('http://localhost:3000/pokemon')
      .then(r => r.json())
      .then(d => { 
        this.pokemons = d; 
        this.catalogoCompleto = d;
        if (this.usuarioLogado) {
          this.carregarFavoritos();
        } else {
          this.cdr.detectChanges(); 
        }
      }); 
  }

  abrirDetalhes(pokemon: any) { 
    fetch(`http://localhost:3000/pokemon/${pokemon.nome}`)
      .then(r => r.json())
      .then(d => { 
        this.pokemonSelecionado = d; 
        this.cdr.detectChanges(); 
      }); 
  }
  
  fecharDetalhes() { 
    this.pokemonSelecionado = null; 
    this.modoEdicaoPokemon = false; 
    this.cdr.detectChanges(); 
  }

  abrirCadastro() {
    this.novoPokemon = this.gerarPokemonVazio();
    this.modoCadastro = true;
  }

  fecharCadastro() { this.modoCadastro = false; }

  salvarNovoPokemon() {
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.novoPokemon)
    }).then(r => {
      if(r.ok) { alert('Pokémon adicionado!'); this.fecharCadastro(); this.carregarTodos(); }
    });
  }

  habilitarEdicaoPokemon() {
    this.modoEdicaoPokemon = true;
    this.dadosEdicaoPokemon = JSON.parse(JSON.stringify(this.pokemonSelecionado));
  }

  cancelarEdicaoPokemon() { this.modoEdicaoPokemon = false; }

  salvarEdicaoPokemon() {
    fetch(`http://localhost:3000/pokemon/${this.pokemonSelecionado.nome}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.dadosEdicaoPokemon)
    }).then(r => r.json()).then(resposta => {
      this.pokemonSelecionado = resposta;
      this.modoEdicaoPokemon = false;
      this.carregarTodos();
    });
  }

  deletarPokemon(nome: string) {
    if (confirm(`Excluir permanentemente o ${nome}?`)) {
      fetch(`http://localhost:3000/pokemon/${nome}`, { method: 'DELETE' })
      .then(() => { alert('Excluído!'); this.fecharDetalhes(); this.carregarTodos(); });
    }
  }
  // --- MÉTODOS DA ARENA VS ---
  selecionarLutador(lado: number, event: any) {
    const nome = event.target.value;
    const pokemon = this.catalogoCompleto.find(p => p.nome === nome);
    
    if (lado === 1) this.lutador1 = pokemon;
    if (lado === 2) this.lutador2 = pokemon;
    
    this.resultadoBatalha = ''; // Limpa o resultado anterior se trocar o lutador
  }

  batalhar() {
    if (!this.lutador1 || !this.lutador2) {
      alert('Você precisa selecionar dois Pokémons para iniciar a batalha!');
      return;
    }

    // Calcula o Poder de Combate (PC) somando todos os atributos
    const poder1 = this.lutador1.hp + this.lutador1.attack + this.lutador1.defense + this.lutador1.spAttack + this.lutador1.spDefense + this.lutador1.speed;
    const poder2 = this.lutador2.hp + this.lutador2.attack + this.lutador2.defense + this.lutador2.spAttack + this.lutador2.spDefense + this.lutador2.speed;

    if (poder1 > poder2) {
      this.resultadoBatalha = `🏆 ${this.lutador1.nome.toUpperCase()} VENCEU! (${poder1} vs ${poder2} de poder)`;
    } else if (poder2 > poder1) {
      this.resultadoBatalha = `🏆 ${this.lutador2.nome.toUpperCase()} VENCEU! (${poder2} vs ${poder1} de poder)`;
    } else {
      this.resultadoBatalha = `⚔️ EMPATE ÉPICO! Ambos possuem ${poder1} de poder total.`;
    }
  }
}