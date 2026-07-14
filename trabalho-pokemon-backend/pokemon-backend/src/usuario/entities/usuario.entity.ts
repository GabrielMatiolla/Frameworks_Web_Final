import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  senha!: string;

  @Column({ default: 'Kanto' })
  regiao!: string;

  @Column({ default: 'Treinador Novato' })
  titulo!: string;

  // NOVA COLUNA PARA A FOTO DE PERFIL
  @Column({ default: 'https://i.imgur.com/x18vUBA.png' }) // Uma pokebola padrão caso ele não coloque foto
  avatar!: string;
}