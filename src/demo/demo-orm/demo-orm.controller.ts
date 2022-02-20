import { Controller, Get, Logger as NestLogger } from '@nestjs/common';
import { of } from 'rxjs';
import { DemoOrmService } from './demo-orm.service';

@Controller('demo-orm')
export class DemoOrmController {
  private readonly logger = new NestLogger(DemoOrmController.name);
  constructor(private readonly demoOrmService: DemoOrmService) {
    this.logger.debug('DemoOrmController');
    console.log('DemoOrmController');
  }
  @Get('create')
  async create() {
    await this.demoOrmService.create();
    return of({ Success: true });
  }
  @Get('insert')
  async insert() {
    await this.demoOrmService.insert();
    return of({ Success: true });
  }
  @Get('save')
  async save() {
    await this.demoOrmService.save();
    return of({ Success: true });
  }
  @Get('update')
  async update() {
    await this.demoOrmService.update();
    return of({ Success: true });
  }
  @Get('remove')
  async remove() {
    await this.demoOrmService.remove();
    return of({ Success: true });
  }
  @Get('delete')
  async delete() {
    await this.demoOrmService.delete();
    return of({ Success: true });
  }
  @Get('find')
  async find() {
    await this.demoOrmService.find();
    return of({ Success: true });
  }
  @Get('query')
  async query() {
    // await this.demoOrmService.query01();
    // await this.demoOrmService.query02();
    await this.demoOrmService.query03();
    return of({ Success: true });
  }
}
