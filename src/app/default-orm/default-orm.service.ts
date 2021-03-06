import { Injectable, Logger, Scope } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { DatabaseName } from 'src/common/database/database.name';
import { FirstEntity } from 'src/common/database/entity/first.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class DefaultOrmService {
  private readonly logger = new Logger(DefaultOrmService.name);
  // private readonly firstEntityRepository: Repository<FirstEntity>;
  constructor(
    @InjectConnection(DatabaseName.DefaultConnection)
    private readonly connection: Connection,
    @InjectRepository(FirstEntity, DatabaseName.DefaultConnection)
    private firstEntityRepository: Repository<FirstEntity>,
  ) {
    this.logger.log('DefaultOrmService');
    this.logger.log(connection.name);
    // this.firstEntityRepository = connection.getRepository(FirstEntity);
  }
  async create() {
    const data = await this.firstEntityRepository.create({
      TEXT: 'create',
    });
    this.logger.log(await this.firstEntityRepository.save(data));
  }
  async insert() {
    const data = <FirstEntity>{ TEXT: 'insert' };
    this.logger.log(await this.firstEntityRepository.insert(data));
  }
  async save() {
    const data = <FirstEntity>{ ROW: 1, TEXT: 'save' };
    this.logger.log(await this.firstEntityRepository.save(data));
  }
  async update() {
    const data = (await this.firstEntityRepository.find()).pop();
    data.TEXT = 'update';
    this.logger.log(await this.firstEntityRepository.update(data.ROW, data));
  }
  async remove() {
    const data = (await this.firstEntityRepository.find()).pop();
    this.logger.log(await this.firstEntityRepository.remove(data));
  }
  async delete() {
    this.logger.log(await this.firstEntityRepository.delete({ ROW: 999 }));
  }
  async find() {
    this.logger.log(await this.firstEntityRepository.find());
    this.logger.log(await this.firstEntityRepository.find({ TEXT: 'insert' }));
  }
  async query01() {
    // this.connection.query
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
  }
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
  }
  async transaction02() {
    await this.connection.transaction(async (manager) => {
      await manager.save(FirstEntity, {
        TEXT: 'transaction01-1',
      });
      await manager.save(FirstEntity, {
        TEXT: 'transaction01-2',
      });
    });
  }
  async query03() {
    this.logger.log(await this.connection.query(`delete from FIRST`));
  }
}
