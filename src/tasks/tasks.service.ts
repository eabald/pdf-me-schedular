import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject('LIMITS_SERVICE') private limitsService: ClientProxy,
    @Inject('FILES_SERVICE') private filesService: ClientProxy,
  ) {}

  @Cron('* * * * *')
  ping() {
    this.logger.debug('Task running every minute');
  }

  @Cron('0 * * * *')
  async pruneFiles() {
    await this.filesService.send({ cmd: 'files-prune' }, null).toPromise();
  }

  @Cron('0 * * * *')
  async resetLimits() {
    await this.limitsService.send({ cmd: 'limits-reset' }, null).toPromise();
  }
}
