import { Module } from '@nestjs/common';
import { DefaultPostController } from './default-post.controller';

@Module({
  controllers: [DefaultPostController],
  providers: [],
})
export class DefaultPostModule {}
