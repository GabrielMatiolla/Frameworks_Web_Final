import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { PokemonEntity } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private pokemonRepository: Repository<PokemonEntity>,
  ) {}

  // 1. C - CREATE (Adicionar novo Pokémon)
  async criar(dados: any) {
    const existe = await this.pokemonRepository.findOne({ where: { nome: dados.nome } });
    if (existe) {
      throw new HttpException('Esse Pokémon já está registrado no banco!', HttpStatus.BAD_REQUEST);
    }

    const novoPokemon = this.pokemonRepository.create(dados);
    return await this.pokemonRepository.save(novoPokemon);
  }

  // 2. R - READ (Listar todos)
  async buscarTodos() {
    return await this.pokemonRepository.find();
  }

  // 3. R - READ (Pesquisar por trecho do nome)
  async pesquisar(termo: string) {
    return await this.pokemonRepository.find({
      where: { nome: Like(`%${termo}%`) } // O Like permite buscar digitando apenas "pika" para achar "pikachu"
    });
  }

  // 4. R - READ (Buscar Específico por nome exato)
  async buscarPorNome(nome: string) {
    const pokemon = await this.pokemonRepository.findOne({ where: { nome } });
    if (!pokemon) {
      throw new HttpException('Pokémon não encontrado no banco', HttpStatus.NOT_FOUND);
    }
    return pokemon;
  }

  // 5. U - UPDATE (Editar um Pokémon)
  async atualizar(nome: string, dados: any) {
    const pokemon = await this.buscarPorNome(nome); // Verifica se existe
    Object.assign(pokemon, dados); // Mescla as alterações
    return await this.pokemonRepository.save(pokemon); // Salva no MySQL
  }

  // 6. D - DELETE (Excluir do banco)
  async deletar(nome: string) {
    const pokemon = await this.buscarPorNome(nome);
    await this.pokemonRepository.remove(pokemon);
    return { sucesso: true, mensagem: `${nome} foi excluído permanentemente do banco!` };
  }
}