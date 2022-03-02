import { DynamicModule, Module } from '@nestjs/common';
import { DefaultDynamicService } from './default.dynamic.service';

@Module({})
export class DefaultDynamicModule {
  static register(): DynamicModule {
    return {
      providers: [DefaultDynamicService],
      exports: [DefaultDynamicService],
      module: DefaultDynamicModule,
      //global: true,
    };
  }
}
