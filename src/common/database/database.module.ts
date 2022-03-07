import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WinstonDatabaseLogger } from 'src/core/logger/winston-database.logger';
import { DatabaseName } from './database.name';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   name: DatabaseName.DefaultConnection,
    //   // mssql
    //   // type: 'mssql',
    //   // host: 'localhost',
    //   // port: 1433,
    //   // username: 'username',
    //   // password: 'password',
    //   // database: 'database',
    //   // sqlite
    //   type: 'sqlite',
    //   database: `d:/Database/SQLite/DemoNodeNest.db`,
    //   // database: ':memory:',
    //   // entities
    //   // entities: [__dirname + '/src/common/database/entity/*.entity{.ts,.js}'],
    //   // entities: [First],
    //   autoLoadEntities: true,
    //   // synchronize: true,
    //   logger: new WinstonDatabaseLogger(),
    // }),
    TypeOrmModule.forRootAsync({
      name: DatabaseName.DefaultConnection,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DATABASE_DEFAULT_DATABASE'),
        autoLoadEntities: true,
        logger: new WinstonDatabaseLogger(),
      }),
    }),
  ],
})
export class DatabaseModule {}
