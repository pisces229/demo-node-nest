import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class TestPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const integer = parseInt(value);
    if (isNaN(integer)) {
      throw new NotAcceptableException('TestParseIntePipe:無法解析為數字');
    }
    return integer;
  }
}
