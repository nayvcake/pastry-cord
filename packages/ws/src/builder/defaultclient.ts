import EventEmitter from 'node:events';

export interface IDefaultClientOptions {
  version: number;
  compress: boolean;
  token: string;
}


export class DefaultClientBuilder extends EventEmitter {
  public options: IDefaultClientOptions;

  constructor(options: IDefaultClientOptions) {
    super()
    this.options = options;
  }

  public disconnect() { }

  public send(_: any) { }
}