import { Injectable } from '@nestjs/common';

@Injectable()
class WinstonDefaultLogger {
  constructor() {
    console.log('WinstonDefaultLogger');
  }
}
export default WinstonDefaultLogger;
