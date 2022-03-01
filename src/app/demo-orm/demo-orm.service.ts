import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { First } from 'src/common/database/entity/first.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class DemoOrmService {
  private readonly logger = new Logger(DemoOrmService.name);
  constructor(
    @InjectConnection('DemoConnection') private readonly connection: Connection,
    @InjectRepository(First, 'DemoConnection')
    private firstRepository: Repository<First>,
  ) {
    this.logger.log('DemoOrmService');
    this.logger.log(connection.name);
  }
  async create() {
    const data = await this.firstRepository.create({
      TEXT: 'create',
    });
    this.logger.log(await this.firstRepository.save(data));
  }
  async insert() {
    const data = <First>{ TEXT: 'insert' };
    this.logger.log(await this.firstRepository.insert(data));
  }
  async save() {
    const data = <First>{ ROW: 1, TEXT: 'save' };
    this.logger.log(await this.firstRepository.save(data));
  }
  async update() {
    const data = (await this.firstRepository.find()).pop();
    data.TEXT = 'update';
    this.logger.log(await this.firstRepository.update(data.ROW, data));
  }
  async remove() {
    const data = (await this.firstRepository.find()).pop();
    this.logger.log(await this.firstRepository.remove(data));
  }
  async delete() {
    this.logger.log(await this.firstRepository.delete({ ROW: 999 }));
  }
  async find() {
    this.logger.log(await this.firstRepository.find());
    this.logger.log(await this.firstRepository.find({ TEXT: 'insert' }));
  }
  async query01() {
    // this.connection.query
    this.logger.log(
      <First[]>(
        await this.connection.query(
          `SELECT ? AS P0, ? AS P1, ? AS P2, ? AS P3`,
          ['A', 'B', 'C', 'D'],
        )
      ),
    );
    this.logger.log(
      <First[]>(
        await this.connection.query(
          `SELECT :p0 AS P0, :p1 AS P1, :p0 AS P2, :p1 AS P4`,
          ['1%', '%3'],
        )
      ),
    );
    this.logger.log(
      <First[]>(
        await this.connection.query(
          `SELECT $0 AS P0, $1 AS P1, $0 AS P2, $1 AS P4`,
          ['1%', '%3'],
        )
      ),
    );
  }
  async query02() {
    const queryRunner = this.connection.createQueryRunner();
    this.logger.log(
      <First[]>(
        await queryRunner.manager.query(
          `SELECT ? AS P0, ? AS P1, ? AS P2, ? AS P3`,
          ['A', 'B', 'C', 'D'],
        )
      ),
    );
    this.logger.log(
      <First[]>(
        await queryRunner.manager.query(
          `SELECT :p0 AS P0, :p1 AS P1, :p0 AS P2, :p1 AS P4`,
          ['1%', '%3'],
        )
      ),
    );
    this.logger.log(
      <First[]>(
        await queryRunner.manager.query(
          `SELECT $0 AS P0, $1 AS P1, $0 AS P2, $1 AS P4`,
          ['1%', '%3'],
        )
      ),
    );
  }
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
      await queryRunner.manager.save(First, {
        TEXT: 'transaction01-1',
      });
      await queryRunner.manager.save(First, {
        TEXT: 'transaction01-2',
      });
      // queryRunner.query(`delete from FIRST`);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async query03() {
    this.logger.log(await this.connection.query(`delete from FIRST`));
  }
}
