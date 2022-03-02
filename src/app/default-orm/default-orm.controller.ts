import { Controller, Get, Logger } from '@nestjs/common';
import { of } from 'rxjs';
import { DefaultOrmService } from './default-orm.service';

@Controller('default-orm')
export class DefaultOrmController {
  private readonly logger = new Logger(DefaultOrmController.name);
  constructor(private readonly defaultOrmService: DefaultOrmService) {
    this.logger.log('DefaultOrmController');
  }
  @Get('create')
  async create() {
    await this.defaultOrmService.create();
    return of({ Success: true });
  }
  @Get('insert')
  async insert() {
    await this.defaultOrmService.insert();
    return of({ Success: true });
  }
  @Get('save')
  async save() {
    await this.defaultOrmService.save();
    return of({ Success: true });
  }
  @Get('update')
  async update() {
    await this.defaultOrmService.update();
    return of({ Success: true });
  }
  @Get('remove')
  async remove() {
    await this.defaultOrmService.remove();
    return of({ Success: true });
  }
  @Get('delete')
  async delete() {
    await this.defaultOrmService.delete();
    return of({ Success: true });
  }
  @Get('find')
  async find() {
    await this.defaultOrmService.find();
    return of({ Success: true });
  }
  @Get('query')
  async query() {
    // await this.defaultOrmService.query01();
    // await this.defaultOrmService.query02();
    await this.defaultOrmService.query03();
    return of({ Success: true });
  }
}
