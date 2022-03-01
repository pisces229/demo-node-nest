import { DynamicModule, Module } from '@nestjs/common';
import { DemoDynamicService } from './demo-dynamic.service';

@Module({})
export class DemoDynamicModule {
  static register(): DynamicModule {
    return {
      providers: [DemoDynamicService],
      exports: [DemoDynamicService],
      module: DemoDynamicModule,
      //global: true,
    };
  }
}
