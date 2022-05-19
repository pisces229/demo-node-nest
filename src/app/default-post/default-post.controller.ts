import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  NotAcceptableException,
  ParseArrayPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { of } from 'rxjs';
import {
  DefaultPostCase03Model,
  DefaultPostCase09Model,
} from './default-post.model';

@Controller('default-post')
export class DefaultPostController {
  private readonly logger = new Logger(DefaultPostController.name);
  constructor() {
    this.logger.log('DefaultPostController');
  }
  @Post('case01')
  async case01(@Body() model: { text: string; value?: string }) {
    this.logger.log(JSON.stringify(model));
    return of({ content: `case01` });
  }
  @Post('case02')
  async case02(@Body('text') text = 'aaa', @Body('value') value = 'bbb') {
    return of({ content: `case02`, text, value });
  }
  @Post('case03')
  // async case03(@Body() model: DefaultPostCase03Model) {
  async case03(@Body() model: DefaultPostCase03Model[]) {
    this.logger.log(JSON.stringify(model));
    return of({ content: `case03` });
  }
  @Post('case04')
  @UseInterceptors(FileInterceptor('file'))
  async case04(@UploadedFile() file: Express.Multer.File) {
    this.logger.log(file.path);
    this.logger.log(file.fieldname);
    this.logger.log(file.originalname);
    return of({ content: `case04` });
  }
  @Post('case05')
  @UseInterceptors(FilesInterceptor('files'))
  async case05(@UploadedFiles() files: Express.Multer.File[]) {
    this.logger.log(
      JSON.stringify(
        files.map(({ fieldname, originalname }) => ({
          fieldname,
          originalname,
        })),
      ),
    );
    return of({ content: `case05` });
  }
  @Post('case06')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'first' }, { name: 'second' }]),
  )
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'first', maxCount: 1 },
  //     { name: 'second', maxCount: 1 },
  //   ]),
  // )
  async case06(@UploadedFiles() files: { [x: string]: Express.Multer.File[] }) {
    const { first, second } = files;
    const list = [...first, ...second];
    this.logger.log(
      JSON.stringify(
        list.map(({ fieldname, originalname }) => ({
          fieldname,
          originalname,
        })),
      ),
    );
    return of({ content: `case06` });
  }
  @Post('case07')
  @UseInterceptors(AnyFilesInterceptor())
  async case07(@UploadedFiles() files: Express.Multer.File[]) {
    this.logger.log(
      JSON.stringify(
        files.map(({ fieldname, originalname }) => ({
          fieldname,
          originalname,
        })),
      ),
    );
    return of({ content: `case07` });
  }
  @Post('case08')
  @UseInterceptors(AnyFilesInterceptor())
  async case08(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('text') text: string[],
    @Body('value') value: string[],
  ) {
    this.logger.log(
      JSON.stringify(
        files.map(({ fieldname, originalname }) => ({
          fieldname,
          originalname,
        })),
      ),
    );
    this.logger.log(JSON.stringify(text));
    this.logger.log(JSON.stringify(value));
    return of({ content: `case08` });
  }
  // Pipe
  @Post('case09')
  // @UsePipes(ValidationPipe)
  // @UsePipes(new ValidationPipe({ disableErrorMessages: true }))
  @UsePipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new NotAcceptableException({
          code: HttpStatus.NOT_ACCEPTABLE,
          message: 'format error.',
          errors,
        });
      },
    }),
  )
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // @UsePipes(new ValidationPipe({ transform: true }))
  async case09(@Body() model: DefaultPostCase09Model) {
    this.logger.log(model);
    this.logger.log(`typeof dto:${typeof model}`);
    this.logger.log(`typeof dto.title:${typeof model.text}`);
    this.logger.log(`typeof dto.description:${typeof model.value}`);
    return of({ content: `case09 model:[${JSON.stringify(model)}]` });
  }
  @Post('case10')
  async case10(
    @Body(new ParseArrayPipe({ items: String }))
    model: string[],
  ) {
    return of({ content: `case10 model:[${JSON.stringify(model)}]` });
  }
  @Post('case11')
  async case11(
    @Body(new ParseArrayPipe({ items: DefaultPostCase09Model }))
    model: DefaultPostCase09Model[],
  ) {
    return of({ content: `case11 model:[${JSON.stringify(model)}]` });
  }
}
