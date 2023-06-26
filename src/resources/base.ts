import type { FigmaClient } from '../client.js'

/**
 * @internal
 */
export class BaseResource {
  protected readonly _client: FigmaClient

  /**
   * @internal
   */
  constructor(client: FigmaClient) {
    this._client = client
  }
}
