import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Req,
  Res,
  Scope,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef, REQUEST } from '@nestjs/core';
import { Request, Response } from 'express';
import { Agent } from 'https';
import { firstValueFrom, of } from 'rxjs';
import { DefaultParamDecorator } from 'src/core/decorator/default-param.decorator';
import { DefaultRoleDecorator } from 'src/core/decorator/default-role.decorator';
import { DefaultCasbinGuard } from 'src/core/guard/default-casbin.guard';
import { DefaultGuard } from 'src/core/guard/default.guard';
import { DefaultInterceptor } from 'src/core/interceptor/default.interceptor';
import { WinstonDefaultLogger } from 'src/core/logger/winston-default.logger';
import { DefaultTestService } from './default-test.service';

@Controller({ path: 'default-test', scope: Scope.REQUEST })
@UseGuards(DefaultCasbinGuard)
// @UseGuards(DefaultGuard)
// @UseInterceptors(DefaultInterceptor)
export class DefaultTestController {
  private readonly logger = new Logger(DefaultTestController.name);
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly moduleRef: ModuleRef,
    private readonly httpService: HttpService,
    private readonly winstonDefaultLogger: WinstonDefaultLogger,
    private readonly defaultTestService: DefaultTestService,
  ) {
    this.logger.log('DefaultTestController');
    this.winstonDefaultLogger.info('DefaultTestController');
  }
  @Get('case01')
  // @Get('case*1')
  @Header('X-Test-headers', '1')
  @HttpCode(HttpStatus.OK)
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @HttpCode(HttpStatus.NOT_FOUND)
  // @UseFilters(DefaultExceptionFilter)
  async case01() {
    // throw new Error('Error');
    // throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    // throw new HttpException(
    //   {
    //     code: HttpStatus.BAD_REQUEST,
    //     msg: 'Error',
    //   },
    //   HttpStatus.BAD_REQUEST,
    // );
    // throw new BadRequestException('Error');
    // throw new BadRequestException({ msg: 'Error' });
    this.defaultTestService.encrypt();
    this.defaultTestService.jwt();
    return of({
      content: `case01`,
      ...(await firstValueFrom(this.defaultTestService.get())),
    });
  }
  @Get('case02')
  async case02(@Req() request: Request, @Res() response: Response) {
    this.logger.log(request);
    this.logger.log(response);
    response.send({ content: `case02` });
  }
  @Get('case03')
  async case03(@Res({ passthrough: true }) response: Response) {
    // response.send({ content: `case03` });
    return of({ content: `case03` });
  }
  @Get('case04')
  async case04(@DefaultParamDecorator() value: any) {
    return of({ content: `case04 [${JSON.stringify(value)}]` });
  }
  @Get('case05')
  //@DemoRoleDecorator('admin')
  @DefaultRoleDecorator('staff')
  async case05() {
    return of({ content: `case05` });
  }
  @Get('case06')
  async case06() {
    // this.moduleRef.get(DefaultTestService);
    // this.moduleRef.get(DefaultTestService, { strict: false });
    // this.moduleRef.resolve(DefaultTestService);
    // this.moduleRef.create(DefaultTestService);
    // this.logger.log(`ContextIdFactory.create():[${ContextIdFactory.create().id}]`);
    // const identifier = ContextIdFactory.create();
    // this.moduleRef.registerRequestByContextId(this.request, identifier);
    const identifier = ContextIdFactory.getByRequest(this.request);
    const [instance1, instance2] = await Promise.all([
      this.moduleRef.resolve(DefaultTestService, identifier),
      this.moduleRef.resolve(DefaultTestService, identifier),
    ]);
    this.logger.log(this.defaultTestService === instance1);
    this.logger.log(this.defaultTestService === instance2);
    this.logger.log(instance1 === instance2);
    return of({ content: `case06` });
  }
  @Get('case07')
  async case07() {
    const httpsAgent = new Agent({ rejectUnauthorized: false });
    const response = await firstValueFrom(
      this.httpService.get(
        'https://my-json-server.typicode.com/pisces229/typicode/posts',
        {
          httpsAgent,
        },
      ),
    );
    this.logger.log(JSON.stringify(response.data));
    return of({ content: `case07 [${JSON.stringify(response.data)}]` });
  }
}
