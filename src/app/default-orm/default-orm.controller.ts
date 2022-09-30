import { Controller, Get, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { DatabaseName } from 'src/common/database/database.name';
import { FirstEntity } from 'src/common/database/entity/first.entity';
import { Connection, Repository } from 'typeorm';

@Controller('default-orm')
export class DefaultOrmController {
  private readonly logger = new Logger(DefaultOrmController.name);
  constructor(
    @InjectConnection(DatabaseName.DefaultConnection)
    private readonly connection: Connection,
    @InjectRepository(FirstEntity, DatabaseName.DefaultConnection)
    private firstEntityRepository: Repository<FirstEntity>,
  ) {
    this.logger.log('DefaultOrmController');
  }
  @Get('create')
  async create() {
    const data = await this.firstEntityRepository.create({
      TEXT: 'create',
    });
    this.logger.log(await this.firstEntityRepository.save(data));
    return of({ Success: true });
  }
  @Get('insert')
  async insert() {
    const data = <FirstEntity>{ TEXT: 'insert' };
    this.logger.log(await this.firstEntityRepository.insert(data));
    return of({ Success: true });
  }
  @Get('save')
  async save() {
    const data = <FirstEntity>{ ROW: 1, TEXT: 'save' };
    this.logger.log(await this.firstEntityRepository.save(data));
    return of({ Success: true });
  }
  @Get('update')
  async update() {
    const data = (await this.firstEntityRepository.find()).pop();
    data.TEXT = 'update';
    this.logger.log(await this.firstEntityRepository.update(data.ROW, data));
    return of({ Success: true });
  }
  @Get('remove')
  async remove() {
    const data = (await this.firstEntityRepository.find()).pop();
    this.logger.log(await this.firstEntityRepository.remove(data));
    return of({ Success: true });
  }
  @Get('delete')
  async delete() {
    this.logger.log(await this.firstEntityRepository.delete({ ROW: 999 }));
    return of({ Success: true });
  }
  @Get('find')
  async find() {
    this.logger.log(await this.firstEntityRepository.find());
    this.logger.log(await this.firstEntityRepository.find({ TEXT: 'insert' }));
    return of({ Success: true });
  }
  @Get('query01')
  async query01() {
    this.logger.log(
      <FirstEntity[]>(
        await this.connection.query(
          `SELECT ? AS P0, ? AS P1, ? AS P2, ? AS P3`,
          ['A', 'B', 'C', 'D'],
        )
      ),
    );
    this.logger.log(
      <FirstEntity[]>(
        await this.connection.query(
          `SELECT :p0 AS P0, :p1 AS P1, :p0 AS P2, :p1 AS P4`,
          ['1%', '%3'],
        )
      ),
    );
    this.logger.log(
      <FirstEntity[]>(
        await this.connection.query(
          `SELECT $0 AS P0, $1 AS P1, $0 AS P2, $1 AS P4`,
          ['1%', '%3'],
        )
      ),
    );
    return of({ Success: true });
  }
  @Get('query02')
  async query02() {
    const queryRunner = this.connection.createQueryRunner();
    this.logger.log(
      <FirstEntity[]>(
        await queryRunner.manager.query(
          `SELECT ? AS P0, ? AS P1, ? AS P2, ? AS P3`,
          ['A', 'B', 'C', 'D'],
        )
      ),
    );
    this.logger.log(
      <FirstEntity[]>(
        await queryRunner.manager.query(
          `SELECT :p0 AS P0, :p1 AS P1, :p0 AS P2, :p1 AS P4`,
          ['1%', '%3'],
        )
      ),
    );
    this.logger.log(
      <FirstEntity[]>(
        await queryRunner.manager.query(
          `SELECT $0 AS P0, $1 AS P1, $0 AS P2, $1 AS P4`,
          ['1%', '%3'],
        )
      ),
    );
    return of({ Success: true });
  }
  @Get('query03')
  async query03() {
    this.logger.log(await this.connection.query(`delete from FIRST`));
    return of({ Success: true });
  }
  @Get('transaction01')
  async transaction01() {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // await queryRunner.manager.save(data[0]);
      // await queryRunner.manager.save(data[1]);
      // insert
      // await queryRunner.manager.insert(First, {
      //   TEXT: 'transaction01-1',
      // });
      // await queryRunner.manager.insert(First, {
      //   TEXT: 'transaction01-2'',
      // });
      // save
      await queryRunner.manager.save(FirstEntity, {
        TEXT: 'transaction01-1',
      });
      await queryRunner.manager.save(FirstEntity, {
        TEXT: 'transaction01-2',
      });
      // queryRunner.query(`delete from FIRST`);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return of({ Success: true });
  }
  @Get('transaction02')
  async transaction02() {
    await this.connection.transaction(async (manager) => {
      await manager.save(FirstEntity, {
        TEXT: 'transaction01-1',
      });
      await manager.save(FirstEntity, {
        TEXT: 'transaction01-2',
      });
    });
    return of({ Success: true });
  }
}
