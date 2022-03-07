import { Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonDatabaseLogger } from 'src/core/logger/winston-database.logger';
import { DatabaseName } from './database.name';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: DatabaseName.DefaultConnection,
      // mssql
      // type: 'mssql',
      // host: 'localhost',
      // port: 1433,
      // username: 'username',
      // password: 'password',
      // database: 'database',
      // sqlite
      type: 'sqlite',
      database: process.env.DATABASE_DEFAULT_DATABASE,
      // database: ':memory:',
      // entities
      // entities: [__dirname + '/src/common/database/entity/*.entity{.ts,.js}'],
      // entities: [First],
      autoLoadEntities: true,
      // synchronize: true,
      logger: new WinstonDatabaseLogger(),
    }),
  ],
})
export class DatabaseModule {}
