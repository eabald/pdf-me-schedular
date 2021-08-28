import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject('LIMITS_SERVICE') private limitsService: ClientProxy,
    @Inject('FILES_SERVICE') private filesService: ClientProxy,
  ) {
    limitsService.connect();
    filesService.connect();
  }

  @Cron(CronExpression.EVERY_MINUTE)
  ping() {
    this.logger.log('Task running every minute');
  }

  @Cron(CronExpression.EVERY_HOUR)
  async pruneFiles() {
    return await this.filesService.send({ cmd: 'files-prune' }, '').toPromise();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async resetLimits() {
    return await this.limitsService
      .send({ cmd: 'limits-reset' }, '')
      .toPromise();
  }
}
