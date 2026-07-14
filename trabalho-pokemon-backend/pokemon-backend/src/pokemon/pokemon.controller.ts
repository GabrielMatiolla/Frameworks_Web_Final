import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async criar(@Body() dados: any) {
    return this.pokemonService.criar(dados);
  }

  @Get()
  async buscarTodos() {
    return this.pokemonService.buscarTodos();
  }

  // A rota de busca precisa vir ANTES da rota ':name' para não dar conflito
  @Get('busca')
  async pesquisar(@Query('termo') termo: string) {
    return this.pokemonService.pesquisar(termo);
  }

  @Get(':name')
  async buscarPorNome(@Param('name') name: string) {
    return this.pokemonService.buscarPorNome(name);
  }

  @Put(':name')
  async atualizar(@Param('name') name: string, @Body() dados: any) {
    return this.pokemonService.atualizar(name, dados);
  }

  @Delete(':name')
  async deletar(@Param('name') name: string) {
    return this.pokemonService.deletar(name);
  }
}