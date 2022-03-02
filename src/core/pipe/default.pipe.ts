import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class DefaultPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('DefaultPipe');
    return value;
  }
}
