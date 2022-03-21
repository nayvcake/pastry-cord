import { EventOptions, GatewayEvent } from './gatewayevent';

export class GatewayEventHello extends GatewayEvent {
  constructor(options: EventOptions) {
    super({
      name: 'HELLO',
      description: 'defines the heartbeat interval',
      shard: options.shard,
      defaultBuilder: options.defaultBuilder
    });
  }
  
}