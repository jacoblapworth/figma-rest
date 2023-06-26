import got from 'got'
import type { Got } from 'got'

import { API_PROTOCOL, API_HOST, API_VER } from './config.js'
import { VariablesResource } from './resources/variables.js'
import { ProjectsResource } from './resources/projects.js'
import { CommentsResource } from './resources/comments.js'
import { FilesResource } from './resources/files.js'
import { UsersResource } from './resources/users.js'
import { VersionsResource } from './resources/versions.js'
import { ActivityLogsResource } from './resources/activityLogs.js'
import { PaymentsResource } from './resources/payments.js'
import { DevResourcesResource } from './resources/devResources.js'

type PersonalConfig = {
  personalAccessToken: string
}

type OAuthConfig = {
  oAuthToken: string
}

type SharedConfig = {
  apiVersion?: string
  protocol?: string
  host?: string
}

type ClientConfig = SharedConfig & (PersonalConfig | OAuthConfig)

export class FigmaClient {
  request: Got

  personalAccessToken?: string
  oAuthToken?: string

  activityLogs: ActivityLogsResource
  comments: CommentsResource
  devResources: DevResourcesResource
  files: FilesResource
  payments: PaymentsResource
  projects: ProjectsResource
  users: UsersResource
  variables: VariablesResource
  versions: VersionsResource

  constructor({
    apiVersion = API_VER,
    protocol = API_PROTOCOL,
    host = API_HOST,
    ...config
  }: ClientConfig) {
    this.request = got.extend({
      prefixUrl: new URL(`${protocol}://${host}`),
      responseType: 'json',
      resolveBodyOnly: true,
    })

    if ('personalAccessToken' in config) {
      this.personalAccessToken = config.personalAccessToken
      this.request = this.request.extend({
        headers: { 'X-Figma-Token': this.personalAccessToken },
      })
    }

    if ('oAuthToken' in config) {
      this.oAuthToken = config.oAuthToken
      this.request = this.request.extend({
        headers: { Authorization: `Bearer ${this.oAuthToken}` },
      })
    }

    this.activityLogs = new ActivityLogsResource(this)
    this.comments = new CommentsResource(this)
    this.devResources = new DevResourcesResource(this)
    this.files = new FilesResource(this)
    this.payments = new PaymentsResource(this)
    this.projects = new ProjectsResource(this)
    this.users = new UsersResource(this)
    this.variables = new VariablesResource(this)
    this.versions = new VersionsResource(this)
  }
}
