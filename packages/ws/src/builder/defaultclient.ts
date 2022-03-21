import { EventEmitter } from 'node:events';
import { WebSocket } from 'ws';
import { CompressGateway, DefaultGateway, EncodingGateway } from "./../constants";
import { IDefaultShardOptions } from "./defaultsharding";


export class Sharding extends EventEmitter {

  public options: IDefaultShardOptions;
  public ws: WebSocket;
  public event_locked: boolean;
  public configs: Array<string>;

  constructor(options: IDefaultShardOptions) {
    super();
    this.options = options;
    this.configs = [];
    if (options.compress !== undefined) {
      if (typeof options.compress === 'number') {
        if (options.compress > CompressGateway.ETF) throw Error(`ClientBuilder: The compression value has been exceeded!`);
        if (options.compress < -1) throw Error(`ClientBuilder: The compression value is invalid!`);
        switch (options.compress) {
          case CompressGateway.JSON: {
            this.configs.push(`compress=json`);
            break
          }
          case CompressGateway.ETF: {
            this.configs.push(`compress=etf`);
            break
          }
          default:
            this.configs.push(`compress=json`);
        }
      }
    }

    if (options.encoding !== undefined) {
      if (typeof options.encoding === 'number') {
        if (options.encoding > EncodingGateway.ZLIB_STREAM) throw Error(`ClientBuilder: The compression value has been exceeded!`)
        if (options.encoding < -1) throw Error(`ClientBuilder: The compression value is invalid!`)
        switch (options.encoding) {
          case EncodingGateway.ZLIB_STREAM: {
            this.configs.push(`encoding=zlib-stream`);
            break
          }
        }
      }
    }

    this.ws = new WebSocket(`wss://gateway.discord.gg/?v=${options.version == undefined ? DefaultGateway.v : options.version}${this.configs.join('&')}`);
    this.event_locked = false;

    this.ws.on('close', args => this.emit('close', args));
    this.ws.on('error', args => this.emit('error', args));
    this.ws.on('open', () => this.emit('open', this));
    this.ws.on('ping', args => this.emit('ping', args));
    this.ws.on('pong', args => this.emit('pong', args));
    this.ws.on('unexpected-response', args => this.emit('unexpected-response', args));
    this.ws.on('upgrade', args => this.emit('upgrade', args));
    this.ws.on('message', (buffer: Buffer) => {
      if (this.event_locked) return;
      this.emit('in', buffer.byteLength)
      this.emit('message', buffer)
    });
  }
}