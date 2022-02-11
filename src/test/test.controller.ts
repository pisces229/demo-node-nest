import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { of } from 'rxjs';
import { TestService } from './test.service';
import { TestExceptionFilter } from './test-exception.filter';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  @Get('Async01')
  async Async01(@Query('millisecond') millisecond = 0) {
    return new Promise((resolve, reject) =>
      setTimeout(() => resolve({ title: `Async01`, millisecond }), millisecond),
    );
  }
  @Get('Async02')
  async Async02() {
    return of({ title: `Async02` });
  }
  @Get('example01')
  @Header('X-Test-headers', '1')
  @HttpCode(HttpStatus.OK)
  //@HttpCode(HttpStatus.NO_CONTENT)
  //@HttpCode(HttpStatus.NOT_FOUND)
  @UseFilters(TestExceptionFilter)
  async example01() {
    // throw new Error('Error');
    // throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    // throw new HttpException(
    //   {
    //     code: HttpStatus.BAD_REQUEST,
    //     msg: 'Error',
    //   },
    //   HttpStatus.BAD_REQUEST,
    // );
    throw new BadRequestException('Error');
    // throw new BadRequestException({ msg: 'Error' });
    return this.testService.getData();
  }
  @Get('example02')
  async example02(@Res() res: Response) {
    res.send({
      title: `example02`,
      description: `description`,
    });
  }
  @Get('example03')
  async example03(@Res({ passthrough: true }) res: Response) {
    // res.send({
    //   title: `example03`,
    //   description: `description01`,
    // });
    return {
      title: `example03`,
      description: `description02`,
    };
  }
  @Get('get01')
  //@Get('get*1')
  async get01() {
    return {
      title: `get01`,
      description: `description`,
    };
  }
  @Get('get02/:id')
  async get02(@Param() params: { id: string }) {
    const { id } = params;
    return {
      title: `get02`,
      description: `description id:[${id}]`,
    };
  }
  @Get('get03/:text/:value')
  async get03(@Param() params: { text: string; value: string }) {
    const { text, value } = params;
    return {
      title: `get03`,
      description: `description text:[${text}] value:[${value}]`,
    };
  }
  @Get('get04')
  async get04(@Query() query: { start: number; end: number }) {
    const { start = 0, end = 10 } = query;
    const list = [
      {
        title: `get04`,
        description: 'description 1',
      },
      {
        title: `get04`,
        description: 'description 2',
      },
      {
        title: `get04`,
        description: 'description 3',
      },
    ];
    return list.slice(start, end);
  }
  @Get('get05')
  async get05(@Query('start') start = 0, @Query('end') end = 10) {
    const list = [
      {
        title: `get05`,
        description: 'description 1',
      },
      {
        title: `get05`,
        description: 'description 2',
      },
      {
        title: `get05`,
        description: 'description 3',
      },
    ];
    return list.slice(start, end);
  }
  @Post('post01')
  async post01(@Body() data: { text: string; value?: string }) {
    return { title: `post01`, ...data };
  }
  @Post('post02')
  async post02(@Body('text') text: string, @Body('value') value?: string) {
    return { title: `post02`, text, value };
  }
  @Post('post03')
  async post03(@Body() model: TestBodyModel) {
    return { title: `post03`, ...model };
  }
}
interface TestBodyModel {
  text: string;
  value?: string;
}
