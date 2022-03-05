import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from 'config/ormconfig';
import { RepositoryModule } from './modules/repository/repository.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    } as any),
    RepositoryModule,
  ],
})
export class AppModule {}
