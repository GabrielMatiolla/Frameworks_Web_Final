import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necessário para o Formulário
import Chart from 'chart.js/auto'; // Biblioteca de Gráficos

@Component({
  selector: 'app-conteudo',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule adicionado aqui!
  templateUrl: './conteudo.html',
  styleUrls: ['./conteudo.css']
})
export class ConteudoComponent implements OnInit {
  abaAtiva: 'catalogo' | 'favoritos' | 'time' | 'arena' | 'perfil' = 'catalogo';
  
  pokemons: any[] = [];
  catalogoCompleto: any[] = [];
  pokemonSelecionado: any = null;
  listaFavoritos: any[] = []; 
  listaTime: any[] = []; 

  lutador1: any = null;
  lutador2: any = null;

  // Variáveis do Perfil
  treinador: any = { nome: '', regiao: '', titulo: '' };
  mensagemSalvar: string = '';
  graficoInstancia: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarTodos();
    this.atualizarListasEmSegundoPlano();
    this.carregarTreinador();
  }

  // --- MÉTODOS EXISTENTES MANTIDOS ---
  carregarTodos() { this.abaAtiva = 'catalogo'; fetch('http://localhost:3000/pokemon?limit=20').then(r => r.json()).then(d => { this.pokemons = d; this.catalogoCompleto = d; this.cdr.detectChanges(); }); }
  mostrarFavoritos() { this.abaAtiva = 'favoritos'; fetch('http://localhost:3000/pokemon/favoritos').then(r => r.json()).then(d => { this.pokemons = d; this.cdr.detectChanges(); }); }
  mostrarTime() { this.abaAtiva = 'time'; fetch('http://localhost:3000/pokemon/time').then(r => r.json()).then(d => { this.pokemons = d; this.cdr.detectChanges(); }); }
  mostrarArena() { this.abaAtiva = 'arena'; this.cdr.detectChanges(); }
  atualizarListasEmSegundoPlano() {
    fetch('http://localhost:3000/pokemon/favoritos').then(r => r.json()).then(d => this.listaFavoritos = d);
    fetch('http://localhost:3000/pokemon/time').then(r => r.json()).then(d => this.listaTime = d);
  }
  abrirDetalhes(pokemon: any) { fetch(`http://localhost:3000/pokemon/${pokemon.nome}`).then(r => r.json()).then(d => { this.pokemonSelecionado = d; this.cdr.detectChanges(); }); }
  fecharDetalhes() { this.pokemonSelecionado = null; this.cdr.detectChanges(); }
  checarSeEFavorito(nome: string): boolean { return this.listaFavoritos.some(p => p.nome === nome); }
  adicionarFavorito(nome: string) { fetch(`http://localhost:3000/pokemon/favoritos/${nome}`, { method: 'POST' }).then(() => this.atualizarListasEmSegundoPlano()); }
  removerFavorito(nome: string) { fetch(`http://localhost:3000/pokemon/favoritos/${nome}`, { method: 'DELETE' }).then(() => { this.atualizarListasEmSegundoPlano(); if (this.abaAtiva === 'favoritos') { this.mostrarFavoritos(); this.fecharDetalhes(); } }); }
  checarSeEdoTime(nome: string): boolean { return this.listaTime.some(p => p.nome === nome); }
  adicionarAoTime(nome: string) { fetch(`http://localhost:3000/pokemon/time/${nome}`, { method: 'POST' }).then(async (res) => { if (!res.ok) { const erro = await res.json(); alert(erro.message); } else { this.atualizarListasEmSegundoPlano(); } }); }
  removerDoTime(nome: string) { fetch(`http://localhost:3000/pokemon/time/${nome}`, { method: 'DELETE' }).then(() => { this.atualizarListasEmSegundoPlano(); if (this.abaAtiva === 'time') { this.mostrarTime(); this.fecharDetalhes(); } }); }
  selecionarLutadorParaArena(lado: number, evento: any) { const nome = evento.target.value; if (!nome) return; fetch(`http://localhost:3000/pokemon/${nome}`).then(r => r.json()).then(dados => { if (lado === 1) this.lutador1 = dados; else this.lutador2 = dados; this.cdr.detectChanges(); }); }
  verificarVencedor(statName: string): number { if (!this.lutador1 || !this.lutador2) return 0; const stat1 = this.lutador1.stats.find((s:any) => s.stat.name === statName)?.base_stat || 0; const stat2 = this.lutador2.stats.find((s:any) => s.stat.name === statName)?.base_stat || 0; if (stat1 > stat2) return 1; if (stat2 > stat1) return 2; return 0; }

  // --- NOVOS MÉTODOS DO PERFIL E GRÁFICOS ---
  mostrarPerfil() {
    this.abaAtiva = 'perfil';
    this.cdr.detectChanges();
    this.desenharGrafico(); // Desenha o gráfico assim que a aba abre
  }

  carregarTreinador() {
    fetch('http://localhost:3000/pokemon/treinador')
      .then(r => r.json())
      .then(d => { this.treinador = d; this.cdr.detectChanges(); });
  }

  salvarPerfil() {
    fetch('http://localhost:3000/pokemon/treinador', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.treinador)
    }).then(() => {
      this.mensagemSalvar = 'Perfil atualizado com sucesso!';
      setTimeout(() => this.mensagemSalvar = '', 3000); // Apaga a mensagem após 3 seg
      this.cdr.detectChanges();
    });
  }

  desenharGrafico() {
    const canvas = document.getElementById('meuGrafico') as HTMLCanvasElement;
    if (!canvas) return;

    if (this.graficoInstancia) {
      this.graficoInstancia.destroy(); // Limpa o gráfico anterior se existir
    }

    // Calcula uma média fictícia com base na quantidade de Pokémons no time
    const forcaTotal = this.listaTime.length * 15;

    this.graficoInstancia = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: ['HP', 'Ataque', 'Defesa', 'Velocidade', 'Ataque Sp.', 'Defesa Sp.'],
        datasets: [{
          label: 'Poder Médio do seu Time',
          data: [50 + forcaTotal, 60 + forcaTotal, 45 + forcaTotal, 70 + forcaTotal, 65 + forcaTotal, 55 + forcaTotal],
          backgroundColor: 'rgba(239, 68, 68, 0.4)',
          borderColor: '#ef4444',
          pointBackgroundColor: '#fff',
          pointBorderColor: '#ef4444',
        }]
      },
      options: {
        responsive: true,
        scales: { r: { angleLines: { color: 'rgba(255,255,255,0.2)' }, grid: { color: 'rgba(255,255,255,0.2)' }, pointLabels: { color: '#fff', font: { size: 14 } }, ticks: { display: false } } },
        plugins: { legend: { labels: { color: '#fff' } } }
      }
    });
  }
}