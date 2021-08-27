import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject('LIMITS_SERVICE') private limitsService: ClientProxy,
    @Inject('FILES_SERVICE') private filesService: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  ping() {
    this.logger.debug('Task running every minute');
  }

  @Cron(CronExpression.EVERY_HOUR)
  async pruneFiles() {
    await this.filesService.send({ cmd: 'files-prune' }, null).toPromise();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async resetLimits() {
    await this.limitsService.send({ cmd: 'limits-reset' }, null).toPromise();
  }
}
