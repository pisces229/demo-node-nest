import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Logger,
  Req,
  Res,
  Scope,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { Request, Response } from 'express';
import { Agent } from 'https';
import { firstValueFrom, of } from 'rxjs';
import { DefaultParamDecorator } from 'src/core/decorator/default-param.decorator';
import { DefaultRoleDecorator } from 'src/core/decorator/default-role.decorator';
import { DefaultCasbinGuard } from 'src/core/guard/default-casbin.guard';
import { DefaultGuard } from 'src/core/guard/default.guard';
import { DefaultInterceptor } from 'src/core/interceptor/default.interceptor';
import { DefaultLogger } from 'src/core/logger/default.logger';

@Controller({ path: 'default-test', scope: Scope.REQUEST })
@UseGuards(DefaultCasbinGuard)
// @UseGuards(DefaultGuard)
// @UseInterceptors(DefaultInterceptor)
export class DefaultTestController {
  private readonly logger = new Logger(DefaultTestController.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly defaultLogger: DefaultLogger,
    private readonly jwtService: JwtService,
  ) {
    this.logger.log('DefaultTestController');
    this.defaultLogger.info('DefaultTestController');
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

    this.logger.log('encrypt start');
    const value = '1qaz@WSX';
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(value, salt, 1000, 64, 'sha256').toString('hex');
    this.logger.log(`encrypt:${hash}`);
    this.logger.log('encrypt end');

    this.logger.log('jwt start');
    const payload = { id: '1234567890', username: 'Pete' };
    const jwtEncode = await this.jwtService.signAsync(payload);
    this.logger.log(`jwtEncode:${jwtEncode}`);
    const jwtDecode = this.jwtService.decode(jwtEncode);
    this.logger.log(`jwtDecode:${JSON.stringify(jwtDecode)}`);
    try {
      const jwtVerify = await this.jwtService.verifyAsync(jwtEncode, {
        // ignoreExpiration: true,
      });
      this.logger.log(`jwtVerify:${JSON.stringify(jwtVerify)}`);
    } catch (e) {
      this.logger.log(e);
    }
    this.logger.log('jwt end');

    return of({
      content: `case01`,
      ...{ service: 'Service', method: 'Method' },
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
