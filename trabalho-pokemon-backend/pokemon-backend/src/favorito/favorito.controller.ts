import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { FavoritoService } from './favorito.service';

@Controller('favorito')
export class FavoritoController {
  constructor(private readonly favoritoService: FavoritoService) {}

  // Rota para favoritar/desfavoritar
  @Post()
  async favoritar(@Body() dados: { usuarioId: number; pokemonNome: string }) {
    return this.favoritoService.alternarFavorito(dados.usuarioId, dados.pokemonNome);
  }

  // Rota para buscar os favoritos de um usuário específico
  @Get(':usuarioId')
  async listar(@Param('usuarioId') usuarioId: number) {
    return this.favoritoService.listarFavoritos(usuarioId);
  }
}