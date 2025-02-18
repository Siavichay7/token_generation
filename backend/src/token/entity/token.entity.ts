import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entity/usuario.entity';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column({ default: false })
  usado: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaGeneracion: Date;

  @Column({ nullable: true })
  fechaUso: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.tokens, { eager: true })
  usuario: Usuario;
}