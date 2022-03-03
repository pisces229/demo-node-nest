import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
      database: 'd:/Database/SQLite/DemoNodeNest.db',
      // database: ':memory:',
      // entities
      // entities: [__dirname + '/src/common/database/entity/*.entity{.ts,.js}'],
      // entities: [First],
      autoLoadEntities: true,
      // synchronize: true,
      // logger: new DatabaseLogger(),
    }),
  ],
})
export class DatabaseModule {}
