import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    private jwtService: JwtService,
  ) {}

  async cadastrar(dados: any) {
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { email: dados.email } });
    if (usuarioExistente) throw new HttpException('Esse email já está cadastrado!', HttpStatus.BAD_REQUEST);

    const salt = await bcrypt.genSalt(10);
    const senhaCriptografada = await bcrypt.hash(dados.senha, salt);

    const novoUsuario = this.usuarioRepository.create({
      nome: dados.nome,
      email: dados.email,
      senha: senhaCriptografada,
      regiao: dados.regiao || 'Kanto',
      titulo: dados.titulo || 'Treinador Novato',
      avatar: dados.avatar || 'https://i.imgur.com/x18vUBA.png' // <-- Salva o avatar
    });
    

    await this.usuarioRepository.save(novoUsuario);
    const { senha, ...resultado } = novoUsuario;
    return { sucesso: true, usuario: resultado };
  }

  // --- NOVA FUNÇÃO DE LOGIN ---
  async login(dados: any) {
    // 1. Busca o usuário pelo email
    const usuario = await this.usuarioRepository.findOne({ where: { email: dados.email } });
    if (!usuario) {
      throw new HttpException('Email não encontrado', HttpStatus.UNAUTHORIZED);
    }

    // 2. Compara a senha digitada com o Hash salvo no banco
    const senhaValida = await bcrypt.compare(dados.senha, usuario.senha);
    if (!senhaValida) {
      throw new HttpException('Senha incorreta', HttpStatus.UNAUTHORIZED);
    }

    // 3. Gera o crachá digital (Token JWT)
    const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome };
    const token = this.jwtService.sign(payload);

    return {
      sucesso: true,
      mensagem: 'Login realizado com sucesso!',
      access_token: token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        avatar: usuario.avatar // <-- Devolve a foto pro Angular
      }
    };
  }
}