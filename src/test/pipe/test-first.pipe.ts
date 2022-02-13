import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TestFirstPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('TestFirstPipe');
    return value;
  }
}
