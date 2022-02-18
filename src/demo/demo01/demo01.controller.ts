import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Inject,
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
import { AppService } from 'src/app.service';
import { DemoParamDecorator } from 'src/decorator/demo-param.decorator';
import { DemoRoleDecorator } from 'src/decorator/demo-role.decorator';
import { DemoDynamicService } from 'src/demo-dynamic.service';
import { DemoCasbinGuard } from 'src/guard/demo-casbin.guard';
import { DemoFirstGuard } from 'src/guard/demo-first.guard';
import { DemoFirstInterceptor } from 'src/interceptor/demo-first.interceptor';
import { Demo01Service } from './demo01.service';

@Controller({ path: 'demo01', scope: Scope.REQUEST })
@UseGuards(DemoCasbinGuard)
// @UseGuards(DemoFirstGuard)
// @UseInterceptors(DemoFirstInterceptor)
export class Demo01Controller {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly moduleRef: ModuleRef,
    private readonly httpService: HttpService,
    private readonly demoDynamicService: DemoDynamicService,
    private readonly demo01Service: Demo01Service,
  ) {
    console.log('Demo01Controller');
  }
  @Get('case01')
  // @Get('case*1')
  @Header('X-Test-headers', '1')
  @HttpCode(HttpStatus.OK)
  // @HttpCode(HttpStatus.NO_CONTENT)
  // @HttpCode(HttpStatus.NOT_FOUND)
  // @UseFilters(TestExceptionFilter)
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
    this.demoDynamicService.run();
    this.demo01Service.encrypt();
    this.demo01Service.jwt();
    return of({
      content: `case01`,
      ...(await firstValueFrom(this.demo01Service.get())),
    });
  }
  @Get('case02')
  async case02(@Req() request: Request, @Res() response: Response) {
    console.log(request);
    console.log(response);
    response.send({ content: `case02` });
  }
  @Get('case03')
  async case03(@Res({ passthrough: true }) response: Response) {
    // response.send({ content: `case03` });
    return of({ content: `case03` });
  }
  @Get('case04')
  async case04(@DemoParamDecorator() value: any) {
    return of({ content: `case04 [${JSON.stringify(value)}]` });
  }
  @Get('case05')
  //@DemoRoleDecorator('admin')
  @DemoRoleDecorator('staff')
  async case05() {
    return of({ content: `case05` });
  }
  @Get('case06')
  async case06() {
    // this.moduleRef.get(Demo01Service);
    // this.moduleRef.get(Demo01Service, { strict: false });
    // this.moduleRef.resolve(Demo01Service);
    // this.moduleRef.create(Demo01Service);
    // console.log(`ContextIdFactory.create():[${ContextIdFactory.create().id}]`);
    // const identifier = ContextIdFactory.create();
    // this.moduleRef.registerRequestByContextId(this.request, identifier);
    const identifier = ContextIdFactory.getByRequest(this.request);
    const [instance1, instance2] = await Promise.all([
      this.moduleRef.resolve(Demo01Service, identifier),
      this.moduleRef.resolve(Demo01Service, identifier),
    ]);
    console.log(this.demo01Service === instance1);
    console.log(this.demo01Service === instance2);
    console.log(instance1 === instance2);
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
    console.log(JSON.stringify(response.data));
    return of({ content: `case07 [${JSON.stringify(response.data)}]` });
  }
}
