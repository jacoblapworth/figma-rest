import { BaseResource } from './base.js'
import {
  LocalVariables,
  PublishedVariables,
  Variable,
  VariableCollection,
  VariableMode,
  VariableModeValue,
} from '../models/variables.js'
import { FigmaSuccessResponse } from '../models/response.js'

export type LocalVariablesResponse = FigmaSuccessResponse<LocalVariables>

export type PublishedVariablesResponse =
  FigmaSuccessResponse<PublishedVariables>

type ModifyVariablesResponse = FigmaSuccessResponse<{
  tempIdToRealId: Record<string, string>
}>

type ModifyVariablesBody = {
  variableCollections?: VariableCollection[]
  variableModes?: VariableMode[]
  variables?: Variable[]
  variableModeValues?: VariableModeValue[]
}

/**
 * The Variables REST API includes endpoints for querying, creating, updating, and deleting variables.
 * Variables in Figma store reusable values that can be applied to all kinds of design properties and prototyping actions.
 *
 * @beta
 * @see https://www.figma.com/developers/api#variables
 */
export class VariablesResource extends BaseResource {
  /**
   * Get the local variables created in the file and remote variables used in the file.
   *
   * Lets you enumerate local variables created in the file and remote variables used in the file.
   * Remote variables are referenced by their `subscribed_id`
   *
   * GET /v1/files/:file_key/variables/local */
  public async getLocal(fileKey: string): Promise<LocalVariables> {
    const response = await this._client.request
      .get(`v1/files/${fileKey}/variables/local`)
      .json<LocalVariablesResponse>()

    return response.meta
  }

  /**
   * Get the variables published from this file.
   *
   * - Each variable and variable collection contains a `subscribed_id`.
   * - Modes are omitted for published variable collections
   *
   * Published variables have two ids: an id that is assigned in the file where it is created (`id`),
   * and an id that is used by subscribing files (`subscribed_id`).
   * The `id` and `key` are stable over the lifetime of the variable.
   * The `subscribed_id` changes every time the variable is modified and published.
   * The same is true for variable collections.
   *
   * GET /v1/files/:file_key/variables/published
   * */
  public async getPublished(fileKey: string): Promise<PublishedVariables> {
    const response = await this._client.request
      .get(`v1/files/${fileKey}/variables/published`)
      .json<PublishedVariablesResponse>()

    return response.meta
  }

  /**
   * Bulk create, update, and delete local variables and variable collections.
   *
   * The request body supports the following 4 top-level arrays.
   * Changes from these arrays will be applied in the below order, and within each array, by array order.
   *
   * POST /v1/files/:file_key/variables
   * */
  public async modify(fileKey: string, variables: ModifyVariablesBody) {
    const response = await this._client.request
      .post(`v1/files/${fileKey}/variables`, {
        json: variables,
      })
      .json<ModifyVariablesResponse>()

    return response.meta.tempIdToRealId
  }
}
