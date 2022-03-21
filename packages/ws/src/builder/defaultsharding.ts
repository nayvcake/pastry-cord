import { Sharding } from './defaultclient';
import EventEmitter from 'node:events';

export interface IDefaultShardOptions {
  version: number;
  compress: number;
  encoding: number;
  token: string;
  retry: number;
}


export class DefaultShardingBuilder extends EventEmitter {
  public options: IDefaultShardOptions;
  
  public start: number;
  public end: number;
  public shards: Array<Sharding>;
  constructor(options: IDefaultShardOptions) {
    super()
    this.options = options;
    this.shards = [];
    this.start = -1;
    this.end = 0;
  }

  public create() {
    for (let i = 0; i < 1; i++) {
    }
  }

  public disconnect() { }

  public send(_: any) { }

  public reconnect() {

  }
}