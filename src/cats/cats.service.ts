import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
@Injectable()
export class CatsService {

  constructor(@InjectRepository(Cat)private readonly catRepository: Repository<Cat>,
  @InjectRepository(Breed) private readonly breedRepository: Repository<Breed>){   //Instanciamos la propiedad repository ya que nos permite usar metodos para hacer consultas entre 2 modulos

  }

  

  async create(createCatDto: CreateCatDto) {

    const breed = await this.breedRepository.findOneBy({name: createCatDto.breed})  //Aca obtenemos la informacion de la raza en la tabla breed, por medio de lo que manda el usuario
   
    if (!breed) throw new BadRequestException('Breed not found')

    return await this.catRepository.save({
      ...createCatDto,
      breed 
    })
    
    
  }

  async findAll() {
    return await this.catRepository.find();
  }

  async findOne(id: number) {
    return await this.catRepository.findOneBy({id});
  }

  async update(id: number, updateCatDto: UpdateCatDto) {  //En este caso se pone de referencia una clase de update, debido a que si queremos actualizar solo un elemento, con la clase createDTO no se puede, sino que se tiene que actualizar todos los campos
    //return await this.catRepository.update(id,updateCatDto)
    return
  }

  async remove(id: number) {
    return await this.catRepository.softDelete({id}); //Se le pasa id
    //return await this.catRepository.softRemove({id}) se le pasa la instancia
  }
}
