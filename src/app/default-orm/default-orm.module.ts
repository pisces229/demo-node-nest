import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseName } from 'src/common/database/database.name';
import { First } from 'src/common/database/entity/first.entity';
import { DefaultOrmController } from './default-orm.controller';
import { DefaultOrmService } from './default-orm.service';

@Module({
  imports: [TypeOrmModule.forFeature([First], DatabaseName.DefaultConnection)],
  controllers: [DefaultOrmController],
  providers: [DefaultOrmService],
})
export class DefaultOrmModule {}
