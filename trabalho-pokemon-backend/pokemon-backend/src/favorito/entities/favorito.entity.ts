import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('favoritos')
export class FavoritoEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  usuarioId!: number;

  @Column()
  pokemonNome!: string;
}