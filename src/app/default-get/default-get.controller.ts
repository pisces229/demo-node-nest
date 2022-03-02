import {
  Controller,
  Get,
  HttpStatus,
  Logger,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { of } from 'rxjs';

@Controller('default-get')
export class DefaultGetController {
  private readonly logger = new Logger(DefaultGetController.name);
  constructor() {
    this.logger.log('DefaultGetController');
  }
  @Get('case01')
  async case01() {
    return of({ content: `case01` });
  }
  @Get('case02/:id')
  async case02(@Param() params: { id: string }) {
    const { id } = params;
    return of({ content: `case02 id:[${id}]` });
  }
  @Get('case03/:text/:value')
  async case03(@Param() params: { text: string; value: string }) {
    const { text, value } = params;
    return of({ content: `case03 text:[${text}] value:[${value}]` });
  }
  @Get('case04')
  // async case04(@Query() query: { start: number; end: number }) {
  async case04(@Query('start') start = 0, @Query('end') end = 10) {
    const list = [
      {
        content: `case04`,
        description: 'description 1',
      },
      {
        content: `case04`,
        description: 'description 2',
      },
      {
        content: `case04`,
        description: 'description 3',
      },
    ];
    // return of(list.slice(query.start, query.end));
    return of(list.slice(start, end));
  }
  // Pipe
  @Get('case05/:id')
  async case05(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
      // new ParseIntPipe({
      //   exceptionFactory: () => new NotAcceptableException('無法解析為數字'),
      // }),
    )
    id: number,
  ) {
    return of({ content: `case01 id:[${id}]` });
  }
  @Get('case06')
  async case06(
    @Query('ids', new ParseArrayPipe({ items: String, separator: ',' }))
    ids: string[],
  ) {
    return of({ content: `case05 model:[${JSON.stringify(ids)}]` });
  }
}
