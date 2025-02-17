import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente: string;

  @Column()
  token: string;

  @Column()
  usado: boolean;

  @Column()
  fechaGeneracion: Date;

  @Column()
  fechaUso: Date;
}
