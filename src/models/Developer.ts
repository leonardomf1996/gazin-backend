import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('developers')
class Developer {
   @PrimaryColumn()
   readonly id: string;

   @Column()
   nome: string;

   @Column()
   sexo: string;

   @Column()
   idade: number;

   @Column()
   hobby: string;

   @Column()
   datanascimento: Date;

   @CreateDateColumn()
   created_at: Date;

   constructor() {
      if (!this.id) {
         this.id = uuid();
      }
   }
}

export { Developer };