import { BaseClient } from './base-client.js';

export class Client extends BaseClient {
  public fetch = fetch;
}
