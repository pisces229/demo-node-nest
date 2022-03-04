import { Module } from '@nestjs/common';
import { DefaultAppController } from './default-app.controller';
import { DefaultAppRepository } from './default-app.repository';
import { DefaultAppService } from './default-app.service';

@Module({
  controllers: [DefaultAppController],
  providers: [DefaultAppService, DefaultAppRepository],
})
export class DefaultAppModule {}
