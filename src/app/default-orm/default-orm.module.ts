import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseName } from 'src/common/database/database.name';
import { FirstEntity } from 'src/common/database/entity/first.entity';
import { DatabaseEntitySubscriber } from 'src/common/database/database-entity-subscriber';
import { DefaultOrmController } from './default-orm.controller';
import { DefaultOrmService } from './default-orm.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FirstEntity], DatabaseName.DefaultConnection),
  ],
  controllers: [DefaultOrmController],
  providers: [DefaultOrmService, DatabaseEntitySubscriber],
})
export class DefaultOrmModule {}
