import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/entities/cat.entity';
import { BreedsModule } from './breeds/breeds.module';
import { Breed } from './breeds/entities/breed.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),

      TypeOrmModule.forFeature([Cat, Breed,User]), // Necesito importar la clase que almacena el schema de la base de datos por medio del orm
      CatsModule,
      BreedsModule,
      UsersModule,
      AuthModule
    
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
