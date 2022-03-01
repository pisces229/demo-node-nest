import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseName } from 'src/common/database/database.name';
import { First } from 'src/common/database/entity/first.entity';
import { DemoOrmController } from './demo-orm.controller';
import { DemoOrmService } from './demo-orm.service';

@Module({
  imports: [TypeOrmModule.forFeature([First], DatabaseName.DemoConnection)],
  controllers: [DemoOrmController],
  providers: [DemoOrmService],
})
export class DemoOrmModule {}
