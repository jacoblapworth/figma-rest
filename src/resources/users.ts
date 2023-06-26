import { User } from '../models/api.js'
import { BaseResource } from './base.js'

type UserResponse = User

/**
 * A user is a Figma account of an individual that has signed up for Figma and created an account.
 *
 * @beta
 * @see https://www.figma.com/developers/api#users
 */
export class UsersResource extends BaseResource {
  /**
   * If you are using OAuth for authentication, this endpoint can be used to get user information for the authenticated user.
   */
  public async me(): Promise<User> {
    return this._client.request.get(`v1/me`).json<UserResponse>()
  }
}
