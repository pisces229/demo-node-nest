import { FirstEntity } from './entity/first.entity';
import { Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Any,
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  LoadEvent,
  RemoveEvent,
  TransactionCommitEvent,
  TransactionRollbackEvent,
  TransactionStartEvent,
  UpdateEvent,
} from 'typeorm';
import { RecoverEvent } from 'typeorm/subscriber/event/RecoverEvent';
import { SoftRemoveEvent } from 'typeorm/subscriber/event/SoftRemoveEvent';
import { DatabaseName } from './database.name';

@EventSubscriber()
export class DatabaseEntitySubscriber implements EntitySubscriberInterface {
  private readonly logger = new Logger(DatabaseEntitySubscriber.name);
  constructor(
    @InjectConnection(DatabaseName.DefaultConnection)
    private readonly connection: Connection,
  ) {
    this.logger.log('DefaultEntitySubscriber');
    connection.subscribers.push(this);
  }
  // listenTo() {
  //   return Entity;
  // }
  afterLoad(entity: any, event?: LoadEvent<any>): void {
    this.logger.log('afterLoad');
    // this.logger.log(typeof event, entity, event.entity);
  }
  beforeInsert(event: InsertEvent<any>): void {
    this.logger.log('beforeInsert');
    // this.logger.log(typeof event, event.entity);
  }
  afterInsert(event: InsertEvent<any>): void {
    this.logger.log('afterInsert');
    // this.logger.log(typeof event, event.entity);
  }
  beforeUpdate(event: UpdateEvent<any>): void {
    this.logger.log('beforeUpdate');
    // this.logger.log(typeof event, event.entity);
  }
  afterUpdate(event: UpdateEvent<any>): void {
    this.logger.log('afterUpdate');
    // this.logger.log(typeof event, event.entity);
  }
  beforeRemove(event: RemoveEvent<any>): void {
    this.logger.log('beforeRemove');
    // this.logger.log(typeof event, event.entity);
  }
  beforeSoftRemove(event: SoftRemoveEvent<any>): void {
    this.logger.log('beforeSoftRemove');
    // this.logger.log(typeof event, event.entity);
  }
  beforeRecover(event: RecoverEvent<any>): void {
    this.logger.log('beforeRecover');
    // this.logger.log(typeof event, event.entity);
  }
  afterRemove(event: RemoveEvent<any>): void {
    this.logger.log('afterRemove');
    // this.logger.log(typeof event, event.entity);
  }
  afterSoftRemove(event: SoftRemoveEvent<any>): void {
    this.logger.log('afterSoftRemove');
    // this.logger.log(typeof event, event.entity);
  }
  afterRecover(event: RecoverEvent<any>): void {
    this.logger.log('afterRecover');
    // this.logger.log(typeof event, event.entity);
  }
  beforeTransactionStart(event: TransactionStartEvent): void {
    this.logger.log('beforeTransactionStart');
    // this.logger.log(typeof event, event);
  }
  afterTransactionStart(event: TransactionStartEvent): void {
    this.logger.log('afterTransactionStart');
    // this.logger.log(typeof event, event);
  }
  beforeTransactionCommit(event: TransactionCommitEvent): void {
    this.logger.log('beforeTransactionCommit');
    // this.logger.log(typeof event, event);
  }
  afterTransactionCommit(event: TransactionCommitEvent): void {
    this.logger.log('afterTransactionCommit');
    // this.logger.log(typeof event, event);
  }
  beforeTransactionRollback(event: TransactionRollbackEvent): void {
    this.logger.log('beforeTransactionRollback');
    // this.logger.log(typeof event, event);
  }
  afterTransactionRollback(event: TransactionRollbackEvent): void {
    this.logger.log('afterTransactionRollback');
    // this.logger.log(typeof event, event);
  }
}
