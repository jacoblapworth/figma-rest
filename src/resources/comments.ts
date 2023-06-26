import { Reaction, ReactionEmoji } from '../models/api.js'
import {
  FrameOffset,
  FrameOffsetRegion,
  Region,
  Vector,
} from '../models/ast.js'
import type { PaginatedResponse } from '../models/response.js'
import { BaseResource } from './base.js'

import { paginate } from './pagination.js'

type GetCommentsParams = {
  /**
   * If enabled, will return comments as their markdown equivalents when applicable.
   */
  as_md?: boolean
}

interface PostCommentsParams {
  /**
   * The text contents of the comment to post
   */
  message: string
  /**
   * The comment to reply to, if any. This must be a root comment, that is, you cannot reply to a comment that is a reply itself (a reply has a parent_id).
   */
  comment_id?: string
  /**
   * The position of where to place the comment.
   */
  client_meta?: Vector | FrameOffset | Region | FrameOffsetRegion
}

type CommentsResponse = {
  comments: Comment[]
}

type ReactionsParams = {
  cursor?: string
}

interface ReactionsResponse
  extends PaginatedResponse<{
    reactions: Reaction[]
  }> {}

type ReactParams = {
  emoji: ReactionEmoji
}

/**
 * Projects are collections of files that belong to a user, or more commonly a team.
 * They can be accessed by collaborators and can be made up of multiple files.
 *
 * @beta
 * @see https://www.figma.com/developers/api#comments
 */
export class CommentsResource extends BaseResource {
  /**
   * Gets a list of comments left on the file.
   */
  public async get(
    file: string,
    searchParams: GetCommentsParams
  ): Promise<Comment[]> {
    const response = await this._client.request
      .get(`v1/files/${file}/comments`, { searchParams })
      .json<CommentsResponse>()
    return response.comments
  }

  /**
   * Gets a list of comments left on the file. //TODO: Update docs
   */
  public async post(file: string, json: PostCommentsParams) {
    return this._client.request.post(`v1/files/${file}/comments`, { json })
  }

  /**
   * Deletes a specific comment. Only the person who made the comment is allowed to delete it.
   */
  public async delete(file_key: string, comment_id: string) {
    return this._client.request.delete(
      `v1/files/${file_key}/comments/${comment_id}`
    )
  }

  /**
   * Gets a paginated list of reactions left on the comment.
   */
  public reactions(
    file_key: string,
    comment_id: string,
    searchParams: ReactionsParams = {}
  ): AsyncIterableIterator<Reaction> {
    this._client.request.paginate.each
    return this._client.request.paginate<Reaction, ReactionsResponse>(
      `v1/files/${file_key}/comments/${comment_id}/reactions`,
      {
        resolveBodyOnly: true,
        responseType: 'json',
        searchParams,
        pagination: {
          transform: (response) => {
            if (response.request.options.responseType === 'json') {
              return response.body.reactions
            }

            return []
          },
          paginate,
        },
      }
    )
  }

  /**
   * Posts a new comment reaction on a file comment.
   */
  public async react(file_key: string, comment_id: string, json: ReactParams) {
    return this._client.request.post(
      `v1/files/${file_key}/comments/${comment_id}/reactions`,
      {
        json,
      }
    )
  }

  /**
   * Deletes a specific comment reaction. Only the person who made the comment reaction is allowed to delete it.
   */
  public async deleteReaction(
    file_key: string,
    comment_id: string,
    searchParams: ReactParams
  ) {
    return this._client.request.delete(
      `v1/files/${file_key}/comments/${comment_id}/reactions`,
      { searchParams }
    )
  }
}
