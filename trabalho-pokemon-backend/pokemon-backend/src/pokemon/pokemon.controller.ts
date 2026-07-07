import { Controller, Get, Param, Query, Post, Delete, Put, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // 1. Rota do Catálogo Principal
  @Get()
  async obterPokemons(@Query('limit') limit?: string) {
    const limiteNumerico = limit ? parseInt(limit, 10) : 20;
    return this.pokemonService.buscarTodos(limiteNumerico);
  }

  // 2. Rotas do Treinador (Perfil)
  @Get('treinador')
  async obterTreinador() {
    return this.pokemonService.obterTreinador();
  }

  @Put('treinador')
  async atualizarTreinador(@Body() dados: any) {
    return this.pokemonService.atualizarTreinador(dados);
  }

  // 3. Rotas de Favoritos
  @Get('favoritos')
  async obterFavoritos() {
    return this.pokemonService.obterFavoritos();
  }

  @Post('favoritos/:name')
  async favoritar(@Param('name') name: string) {
    return this.pokemonService.favoritar(name);
  }

  @Delete('favoritos/:name')
  async removerFavorito(@Param('name') name: string) {
    return this.pokemonService.removerFavorito(name);
  }

  // 4. Rotas do Time (Team Builder)
  @Get('time')
  async obterTime() {
    return this.pokemonService.obterTime();
  }

  @Post('time/:name')
  async adicionarAoTime(@Param('name') name: string) {
    return this.pokemonService.adicionarAoTime(name);
  }

  @Delete('time/:name')
  async removerDoTime(@Param('name') name: string) {
    return this.pokemonService.removerDoTime(name);
  }

  // 5. Rota de Detalhes Específicos (IMPORTANTE: Tem de ficar sempre em último!)
  @Get(':name')
  async obterDetalhes(@Param('name') name: string) {
    return this.pokemonService.buscarPorNome(name);
  }
}