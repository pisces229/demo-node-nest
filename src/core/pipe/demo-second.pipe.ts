import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class DemoSecondPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('DemoSecondPipe');
    // return value;
    const integer = parseInt(value);
    if (isNaN(integer)) {
      throw new NotAcceptableException('無法解析為數字');
    }
    return integer;
  }
}
