import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { First } from 'src/entities/first.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class DemoOrmService {
  constructor(
    @InjectConnection('DemoConnection') private readonly connection: Connection,
    @InjectRepository(First, 'DemoConnection')
    private firstRepository: Repository<First>,
  ) {
    console.log('DemoOrmService');
    console.log(connection.name);
  }
  async create() {
    const data = await this.firstRepository.create({
      TEXT: 'create',
    });
    console.log(await this.firstRepository.save(data));
  }
  async insert() {
    const data = <First>{ TEXT: 'insert' };
    console.log(await this.firstRepository.insert(data));
  }
  async save() {
    const data = <First>{ ROW: 1, TEXT: 'save' };
    console.log(await this.firstRepository.save(data));
  }
  async update() {
    const data = (await this.firstRepository.find()).pop();
    data.TEXT = 'update';
    console.log(await this.firstRepository.update(data.ROW, data));
  }
  async remove() {
    const data = (await this.firstRepository.find()).pop();
    console.log(await this.firstRepository.remove(data));
  }
  async delete() {
    console.log(await this.firstRepository.delete({ ROW: 999 }));
  }
  async find() {
    console.log(await this.firstRepository.find());
    console.log(await this.firstRepository.find({ TEXT: 'insert' }));
  }
  async query01() {
    // this.connection.query
    console.log(
      <First[]>(
        await this.connection.query(
          `SELECT ? AS P0, ? AS P1, ? AS P2, ? AS P3`,
          ['A', 'B', 'C', 'D'],
        )
      ),
    );
    console.log(
      <First[]>(
        await this.connection.query(
          `SELECT :p0 AS P0, :p1 AS P1, :p0 AS P2, :p1 AS P4`,
          ['1%', '%3'],
        )
      ),
    );
    console.log(
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
    console.log(
      <First[]>(
        await queryRunner.manager.query(
          `SELECT ? AS P0, ? AS P1, ? AS P2, ? AS P3`,
          ['A', 'B', 'C', 'D'],
        )
      ),
    );
    console.log(
      <First[]>(
        await queryRunner.manager.query(
          `SELECT :p0 AS P0, :p1 AS P1, :p0 AS P2, :p1 AS P4`,
          ['1%', '%3'],
        )
      ),
    );
    console.log(
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
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
  async query03() {
    console.log(await this.connection.query('delete from FIRST'));
  }
}
