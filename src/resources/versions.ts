import { Version } from '../models/api.js'
import { PaginatedResponse } from '../models/response.js'
import { BaseResource } from './base.js'

type VersionsResponse = PaginatedResponse<{
  versions: Version[]
}>

/**
 * Figma allows you to distinguish different stages or Versions of a file, as the file evolves over time.
 * This is all recorded in the Version history, which allows users to view, track and restore previous versions of a File.
 *
 * @see https://www.figma.com/developers/api#version-history
 */
export class VersionsResource extends BaseResource {
  /**
   * This endpoint fetches the version history of a file, allowing you to see the progression of a file over time.
   * You can then use this information to render a specific version of the file, via another endpoint.
   */
  public async get(file: string) {
    const response = await this._client.request
      .get(`v1/files/${file}/versions`)
      .json<VersionsResponse>()

    return response.versions
  }
}
