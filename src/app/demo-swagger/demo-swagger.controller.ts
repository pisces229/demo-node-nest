import { Body, Controller, HttpStatus, Logger, Post } from '@nestjs/common';
import { of } from 'rxjs';
import {
  ApiTags,
  ApiHeader,
  ApiBody,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import {
  DemoSwagger01InputModel,
  DemoSwagger02InputModel,
} from './demo-swagger.model';

@ApiTags('Demo Swagger')
@Controller('demo-swagger')
export class DemoSwaggerController {
  private readonly logger = new Logger(DemoSwaggerController.name);
  @Post('case01')
  async case01(@Body() model: DemoSwagger01InputModel) {
    return of({});
  }
  @ApiBody({ type: [DemoSwagger02InputModel] })
  @Post('case02')
  async case02() {
    return of({});
  }
  @ApiHeader({
    name: 'X-Custom',
    description: 'Try to set custom header.',
  })
  @ApiOkResponse()
  // @ApiResponse({
  //   status: HttpStatus.CREATED,
  //   description: 'The todo has been successfully created.',
  // })
  @Post('case03')
  async case03() {
    return of({});
  }
}
