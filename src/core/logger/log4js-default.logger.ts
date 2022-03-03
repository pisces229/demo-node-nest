import { Injectable } from '@nestjs/common';

@Injectable()
class Log4jsDefaultLogger {
  constructor() {
    console.log('Log4jsDefaultLogger');
  }
}
export default Log4jsDefaultLogger;
