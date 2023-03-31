import { BaseClient } from './base-client';

export class Client extends BaseClient {
  public fetch = fetch;

  test() {
    return 'test';
  }
}
