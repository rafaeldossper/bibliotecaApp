import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

 @Column()
  genero: string;

  @Column()
  autor: string;

  @Column()
  dataPublicacao: string;
}
