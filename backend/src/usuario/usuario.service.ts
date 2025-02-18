import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entity/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async obtenerUsuarioPorNombre(nombre: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { nombre } });
  }

  async crearUsuario(nombre: string): Promise<Usuario> {
    const usuario = this.usuarioRepository.create({ nombre });
    return this.usuarioRepository.save(usuario);
  }
}