import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonEntity } from './pokemon/entities/pokemon.entity';
import { UsuarioEntity } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { FavoritoEntity } from './favorito/entities/favorito.entity';
import { FavoritoModule } from './favorito/favorito.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // Coloque seu usuário do MySQL Workbench aqui
      password: '',     // Coloque sua senha do MySQL Workbench aqui (se tiver)
      database: 'pokedex_db',
      entities: [PokemonEntity, UsuarioEntity, FavoritoEntity],
      synchronize: true, // Isso faz o TypeORM criar as tabelas automaticamente! (Ideal para dev)
    }),
    PokemonModule,
    UsuarioModule,
    FavoritoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}