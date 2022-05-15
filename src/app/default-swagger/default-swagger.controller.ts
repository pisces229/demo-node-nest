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
  DefaultSwagger01InputModel,
  DefaultSwagger02InputModel,
} from './default-swagger.model';

@ApiTags('Default Swagger')
@Controller('default-swagger')
export class DefaultSwaggerController {
  private readonly logger = new Logger(DefaultSwaggerController.name);
  @Post('case01')
  async case01(@Body() model: DefaultSwagger01InputModel) {
    this.logger.log(model);
    return of({});
  }
  @ApiBody({ type: [DefaultSwagger02InputModel] })
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
