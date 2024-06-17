import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { IUserActive } from 'src/common/interfaces/user-activate.interface';
import { Role } from 'src/common/enums/rol.enum';
@Injectable()
export class CatsService {

  constructor(@InjectRepository(Cat)private readonly catRepository: Repository<Cat>,
  @InjectRepository(Breed) private readonly breedRepository: Repository<Breed>){   //Instanciamos la propiedad repository ya que nos permite usar metodos para hacer consultas entre 2 modulos

  }

  

  async create(createCatDto: CreateCatDto, user: IUserActive) {

    const breed = await this.validateBreed(createCatDto.breed)  //Aca obtenemos la informacion de la raza en la tabla breed, por medio de lo que manda el usuario
   

    return await this.catRepository.save({
      ...createCatDto,
      breed: breed,
      userEmail: user.email 
    })
    
    
  }

  async findAll(user: IUserActive) {

    if(user.role === Role.ADMIN){
        return await this.catRepository.find();
    }

    return await this.catRepository.find({
      where: {userEmail: user.email}
    });

    
  }

  async findOne(id: number, user: IUserActive) {

    const cat = await this.catRepository.findOneBy({id})

    if(!cat) throw new BadRequestException('Cat not found')

    this.validateOwnership(cat, user)

    return cat;
  
  }

  async update(id: number, updateCatDto: UpdateCatDto, user: IUserActive ) {  //En este caso se pone de referencia una clase de update, debido a que si queremos actualizar solo un elemento, con la clase createDTO no se puede, sino que se tiene que actualizar todos los campos
    
    await this.findOne(id, user) //Se valida si el usuario es dueño del gato//


    

    return await this.catRepository.update( id ,{
     
      ...updateCatDto,
      breed: updateCatDto.breed ? await this.validateBreed(updateCatDto.breed) : undefined, //Se valida si la raza se modifico y si no, se mantiene la misma
      userEmail: user.email
    })
 
  }

  async remove(id: number, user: IUserActive ) {

    await this.findOne(id, user)

    return await this.catRepository.softDelete({id}); //Se le pasa id
    //return await this.catRepository.softRemove({id}) se le pasa la instancia
  }

  /////////////////////////////////////////////////////////////////

  private validateOwnership(cat: Cat, user: IUserActive){
    if(user.role !== Role.ADMIN && cat.userEmail !== user.email){

      throw new UnauthorizedException('You are not allowed to see this cat')
    }
  }

  private async validateBreed(breed: string){

    const breedFound = await this.breedRepository.findOneBy({name: breed})

    if(!breedFound) throw new NotFoundException('Breed not found')

    return breedFound;
  }
}
