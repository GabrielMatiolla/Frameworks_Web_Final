import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritoEntity } from './entities/favorito.entity';

@Injectable()
export class FavoritoService {
  constructor(
    @InjectRepository(FavoritoEntity)
    private favoritoRepository: Repository<FavoritoEntity>,
  ) {}

  async alternarFavorito(usuarioId: number, pokemonNome: string) {
    // Verifica se já está favoritado
    const existe = await this.favoritoRepository.findOne({ where: { usuarioId, pokemonNome } });
    
    if (existe) {
      // Se já existe, remove (Desfavorita)
      await this.favoritoRepository.remove(existe);
      return { favoritado: false, mensagem: `${pokemonNome} removido dos favoritos.` };
    }
    
    // Se não existe, cria (Favorita)
    const novoFavorito = this.favoritoRepository.create({ usuarioId, pokemonNome });
    await this.favoritoRepository.save(novoFavorito);
    return { favoritado: true, mensagem: `${pokemonNome} adicionado aos favoritos.` };
  }

  async listarFavoritos(usuarioId: number) {
    return await this.favoritoRepository.find({ where: { usuarioId } });
  }
}