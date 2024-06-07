import { Cat } from "src/cats/entities/cat.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Breed {

    @Column({primary: true, generated:true})
    id:number

    @Column({length:50})
    name: string

    @OneToMany(() => Cat, (cat)=> cat.breed) 
    cats: Cat[]     //Parametro de la entidad-clase que se relacionara(Cat)   -- declaramos un 2do parametro que sera: igual a la llave foranea de la entidad-clase de nuestra entidad (cat = cat.breed.id) 
}
