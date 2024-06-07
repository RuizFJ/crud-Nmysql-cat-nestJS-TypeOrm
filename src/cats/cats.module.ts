import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { Cat } from './entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';
import { BreedsModule } from 'src/breeds/breeds.module';
import { BreedsService } from 'src/breeds/breeds.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cat]),BreedsModule], //En esta identidad usamos en patron de diseño repositorio, se necesita importar al modulo principal, app.module, importamos el modulo Breed ya que lo necesitamos para la db
  controllers: [CatsController],
  providers: [CatsService,BreedsService],   //Traemos los servicios de Breed para poder hacer relaciones con cat
  
})
export class CatsModule {}
