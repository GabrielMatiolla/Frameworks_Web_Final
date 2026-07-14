import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonEntity } from './entities/pokemon.entity';

@Module({
  // Importamos a entidade para que o Service consiga usar o repositório do MySQL depois
  imports: [TypeOrmModule.forFeature([PokemonEntity])],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}