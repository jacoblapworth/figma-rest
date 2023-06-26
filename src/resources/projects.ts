import { Branch } from '../models/ast.js'
import { BaseResource } from './base.js'

type FilesParams = {
  branchData?: boolean
}

type ProjectResponse = {
  name: String
  projects: {
    id: Number
    name: String
  }[]
}

type File = {
  key: String
  name: String
  thumbnail_url: String
  last_modified: String
  branches: Branch[]
}

type FilesResponse = {
  name: String
  files: File[]
}

/**
 * Projects are collections of files that belong to a user, or more commonly a team.
 * They can be accessed by collaborators and can be made up of multiple files.
 *
 * @beta
 * @see https://www.figma.com/developers/api#projects
 */
export class ProjectsResource extends BaseResource {
  /**
   * You can use this Endpoint to get a list of all the Projects within the specified team.
   * This will only return projects visible to the authenticated user or owner of the developer token.
   * Note: it is not currently possible to programmatically obtain the team id of a user just from a token.
   * To obtain a team id, navigate to a team page of a team you are a part of.
   * The team id will be present in the URL after the word team and before your team name.
   */
  public async get(teamId: string): Promise<ProjectResponse> {
    return this._client.request
      .get(`v1/teams/${teamId}/projects`)
      .json<ProjectResponse>()
  }

  /**
   * You can use this Endpoint to get a list of all the Projects within the specified team.
   * This will only return projects visible to the authenticated user or owner of the developer token.
   * Note: it is not currently possible to programmatically obtain the team id of a user just from a token.
   * To obtain a team id, navigate to a team page of a team you are a part of.
   * The team id will be present in the URL after the word team and before your team name.
   */
  public async files(
    projectId: string,
    { branchData }: FilesParams
  ): Promise<FilesResponse> {
    return this._client.request
      .get(`v1/projects/${projectId}/files`, {
        searchParams: {
          branch_data: branchData,
        },
      })
      .json<FilesResponse>()
  }
}
