import { BaseResource } from './base.js'

/** An object that contains data such as the URL and name of the dev resource. */
type DevResource = {
  /** Required if you're creating a dev resource. The file key where the dev resource belongs. */
  file_key?: string
  /** Required if you're creating a dev resource. The target node to attach the dev resource to. */
  node_id?: string
  /** Required if you're updating a dev resource. The ID of the dev resource that you want to update. */
  id?: string
  /** Required. The name of the dev resource. */
  name: string
  /** Required. The URL of the dev resource. */
  url: string
}

type DevResourcesResponse = {
  dev_resources: DevResource[]
}

type DevResourceError = {
  file_key?: string
  node_id?: string
  error: string
}

type CreateDevResources = {
  /** A list of dev resources that you want to create. */
  dev_resources: DevResource[]
}

type CreateDevResourcesResponse = {
  links_created: DevResource[]
  errors: DevResourceError[]
}

type UpdateDevResources = {
  /** A list of dev resources that you want to update.  */
  dev_resources: DevResource[]
}

type UpdateDevResourcesResponse = {
  links_dates: DevResource[]
  errors: { id: string; error: string }[]
}

export class DevResourcesResource extends BaseResource {
  /** Get all dev resources in a file. */
  public async get(fileKey: string) {
    return this._client.request
      .get(`v1/files/${fileKey}/dev_resources`)
      .json<DevResourcesResponse>()
  }

  /**
   * Bulk create dev resources across multiple files.
   *
   * Dev resources that are successfully created will show up in the `links_created` array in the response.
   *
   * If there are any dev resources that cannot be created, you may still get a `200` response.
   * These resources will show up in the `errors` array.
   * Some reasons a dev resource cannot be created include:
   * - Resource points to a `file_key` that cannot be found.
   * - The node already has the maximum of 10 dev resources.
   * - Another dev resource for the node has the same url.
   */
  public async create(fileKey: string, json: CreateDevResources) {
    return this._client.request
      .post(`v1/files/${fileKey}/dev_resources`, { json })
      .json<CreateDevResourcesResponse>()
  }

  /**
   * Bulk update dev resources across multiple files.
   *
   * Ids for dev resources that are successfully updated will show up in the `links_updated` array in the response.
   * If there are any dev resources that cannot be updated, you may still get a `200` response. These resources will show up in the `errors` array.
   */
  public async update(fileKey: string, json: UpdateDevResources) {
    return this._client.request
      .put(`v1/files/${fileKey}/dev_resources`, { json })
      .json<UpdateDevResourcesResponse>()
  }
}
