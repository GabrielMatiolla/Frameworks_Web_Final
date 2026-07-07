import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PokemonService {
  private readonly caminhoArquivo = path.join(process.cwd(), 'pokemons.json');
  
  // Variáveis em memória (Simulando uma base de dados)
  private favoritos: any[] = []; 
  private meuTime: any[] = []; 
  
  // O perfil padrão inicial do treinador
  private treinador = { 
    nome: 'Gabriel Tadeu Matiolla', 
    regiao: 'Kanto', 
    titulo: 'Desenvolvedor Full-Stack' 
  };

  private obterDadosLocais(): any[] {
    try {
      const conteudo = fs.readFileSync(this.caminhoArquivo, 'utf-8');
      return JSON.parse(conteudo);
    } catch (error) {
      throw new HttpException('Erro ao ler a base de dados local de Pokémons', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // --- CATÁLOGO GERAL ---
  async buscarTodos(limit: number = 20) {
    const listaCompleta = this.obterDadosLocais();
    return listaCompleta.slice(0, limit).map(pokemon => ({
      nome: pokemon.nome,
      imagem: pokemon.imagem
    }));
  }

  async buscarPorNome(nome: string) {
    const listaCompleta = this.obterDadosLocais();
    const pokemonEncontrado = listaCompleta.find(p => p.nome.toLowerCase() === nome.toLowerCase());

    if (!pokemonEncontrado) {
      throw new HttpException('Pokémon não encontrado na base local', HttpStatus.NOT_FOUND);
    }
    return pokemonEncontrado;
  }

  // --- LÓGICA DE FAVORITOS ---
  async obterFavoritos() {
    return this.favoritos.map(pokemon => ({
      nome: pokemon.nome,
      imagem: pokemon.imagem
    }));
  }

  async favoritar(nome: string) {
    const pokemon = await this.buscarPorNome(nome);
    const jaExiste = this.favoritos.some(p => p.nome === pokemon.nome);
    
    if (!jaExiste) {
      this.favoritos.push(pokemon);
    }
    return { sucesso: true, mensagem: `${nome} favoritado com sucesso!` };
  }

  async removerFavorito(nome: string) {
    this.favoritos = this.favoritos.filter(p => p.nome !== nome);
    return { sucesso: true, mensagem: `${nome} removido dos favoritos!` };
  }

  // --- LÓGICA DE MONTAGEM DE TIME (MAX 6) ---
  async obterTime() {
    return this.meuTime.map(pokemon => ({
      nome: pokemon.nome,
      imagem: pokemon.imagem
    }));
  }

  async adicionarAoTime(nome: string) {
    if (this.meuTime.length >= 6) {
      throw new HttpException('O seu time já está cheio (Máximo de 6 Pokémons)!', HttpStatus.BAD_REQUEST);
    }
    
    const pokemon = await this.buscarPorNome(nome);
    const jaExiste = this.meuTime.some(p => p.nome === pokemon.nome);
    
    if (!jaExiste) {
      this.meuTime.push(pokemon);
    }
    return { sucesso: true, mensagem: `${nome} adicionado ao time!` };
  }

  async removerDoTime(nome: string) {
    this.meuTime = this.meuTime.filter(p => p.nome !== nome);
    return { sucesso: true, mensagem: `${nome} removido do time!` };
  }

  // --- LÓGICA DO PERFIL DO TREINADOR (CRUD COMPLETO) ---
  async obterTreinador() {
    return this.treinador;
  }

  async atualizarTreinador(dados: any) {
    // Mescla os dados atuais com os novos dados recebidos do Angular
    this.treinador = { ...this.treinador, ...dados };
    return this.treinador;
  }
}