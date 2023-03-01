import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

export abstract class AbstractService {
  protected constructor(
    protected readonly repository: Repository<any>,
    protected readonly client: ClientProxy,
    protected readonly evt: string,
  ) {}

  async save(options) {
    const dataSaved = this.repository.save(options);
    await lastValueFrom(this.client.emit(this.evt, { ...options }));
    return dataSaved;
  }
  async find(options) {
    return this.repository.find(options);
  }
  async findOne(options) {
    return this.repository.findOne(options);
  }
  async update(id: number, options) {
    return this.repository.update(id, options);
  }
}
