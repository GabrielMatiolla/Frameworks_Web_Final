import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritoEntity } from './entities/favorito.entity';
import { FavoritoService } from './favorito.service';
import { FavoritoController } from './favorito.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritoEntity])],
  controllers: [FavoritoController],
  providers: [FavoritoService],
})
export class FavoritoModule {}