import { Sharding } from '../../src/builder/defaultclient';
import { DefaultShardingBuilder } from './../builder/defaultsharding';

export interface RawData {}

export interface EventOptions {
  shard: Sharding;
  defaultBuilder: DefaultShardingBuilder;
}

export interface GatewayEventOptions {
  name: string;
  description: string;
  shard: Sharding;
  defaultBuilder: DefaultShardingBuilder;
}

export class GatewayEvent {
  public options: GatewayEventOptions;

  constructor(options: GatewayEventOptions) {
    this.options = options;

    if (this.options.name == undefined) throw Error('GatewayEvent: You must have the name of the event.');
    if (this.options.description == undefined) throw Error('GatewayEvent: You must have the description of the event.');
    if (this.options.shard == undefined) throw Error('GatewayEvent: Could not read shard.');
    if (this.options.defaultBuilder == undefined) throw Error('GatewayEvent: Could not read defaultBuilder.');
  }

  public async eventRun(_: RawData) { }
}