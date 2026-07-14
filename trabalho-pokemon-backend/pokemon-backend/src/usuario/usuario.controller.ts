import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('cadastrar')
  async cadastrar(@Body() dados: any) {
    return this.usuarioService.cadastrar(dados);
  }

  // --- NOVA ROTA DE LOGIN ---
  @Post('login')
  async login(@Body() dados: any) {
    return this.usuarioService.login(dados);
  }
}