import { Module } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedsController } from './breeds.controller';
import { Breed } from './entities/breed.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Breed])],
  controllers: [BreedsController],
  providers: [BreedsService],
  exports: [TypeOrmModule]  //Necesitamos importar este modulo a los modulos que lo ocuparan, en este caso a Cats
})
export class BreedsModule {}
