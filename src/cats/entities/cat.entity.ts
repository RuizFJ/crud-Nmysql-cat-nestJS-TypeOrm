import { Breed } from "src/breeds/entities/breed.entity"
import { User } from "src/users/entities/user.entity"
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm"

@Entity()
export class Cat {      //Esto se debe de importar en el modulo cats
    @Column({primary: true, generated:true})
    id: number

    @Column()
    name: string
    
    @Column()
    age: number


    /*@Column()
    breed: string*/

    @DeleteDateColumn()
    deleteAt: Date

    @ManyToOne(() => Breed, (breed) => breed.cats,{   //Le pasamos la clase Breed que esta actuando como tabla, esta seria FK 
        eager: true, //Para que traiga las razas al hacer un findOne
    })//El primer parametro es la clase, el segundo es un parametro que es igual:  la instancia del mismo parametro y el campo que servira como llave forenea
    breed: Breed 
    
    @ManyToOne(() => User)
    @JoinColumn({name: 'userEmail', referencedColumnName: 'email',})
    user: User

    @Column()
    userEmail: string
       
    

} 
