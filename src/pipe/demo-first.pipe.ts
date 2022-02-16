import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DemoFirstPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('DemoFirstPipe');
    return value;
  }
}
