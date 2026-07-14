import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pokemons')
export class PokemonEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nome!: string;

  @Column()
  imagem!: string;

  @Column({ type: 'int', default: 0 })
  altura!: number;

  @Column({ type: 'int', default: 0 })
  peso!: number;

  // Atributos base
  @Column({ type: 'int', default: 0 })
  hp!: number;

  @Column({ type: 'int', default: 0 })
  attack!: number;

  @Column({ type: 'int', default: 0 })
  defense!: number;

  @Column({ type: 'int', default: 0 })
  spAttack!: number;

  @Column({ type: 'int', default: 0 })
  spDefense!: number;

  @Column({ type: 'int', default: 0 })
  speed!: number;
}