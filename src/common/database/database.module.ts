import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseLogger } from 'src/core/logger/database.logger';
import { DefaultConfigService } from 'src/core/service/default-config.service';
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
      inject: [DefaultConfigService],
      useFactory: async (defaultConfigService: DefaultConfigService) => ({
        type: 'sqlite',
        database: defaultConfigService.database(),
        autoLoadEntities: true,
        logger: new DatabaseLogger(),
      }),
    }),
  ],
})
export class DatabaseModule {}
