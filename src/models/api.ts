import {
  Branch,
  Component,
  ComponentSet,
  FrameOffset,
  FrameOffsetRegion,
  Region,
  Style,
  Vector,
} from './ast.js'

// 'files:read,file_variables:read,file_variables:write,file_comments:write,file_dev_resources:read,file_dev_resources:write,webhooks:write'
/** Scopes for personal access tokens and OAuth 2 tokens determine which endpoints can be accessed. */
export enum Scopes {
  /**
   * Read files, projects, users, versions, comments, components & styles, and webhooks.
   */
  'files:read',
  /**
   * Read variables in Figma file. Note: this is only available to members in Enterprise organizations.
   */
  'file_variables:read',
  /**
   * Read and write to variables in Figma file. Note: this is only available to members in Enterprise organizations.
   */
  'file_variables:write',
  /**
   * Post and delete comments and comment reactions in files.
   */
  'file_comments:write',
  /**
   * Read dev resources in files.
   */
  'file_dev_resources:read',
  /**
   * Read and write to dev resources in files.
   */
  'file_dev_resources:write',
  /** Create and manage webhooks. */
  'webhooks:write',
}

/** A comment or reply left by a user */
export interface Comment {
  /** Unique identifier for comment */
  id: string
  /** Positioning information of the comment. Includes information on the location of the comment pin, which is either the absolute coordinates on the canvas or a relative offset within a frame. If the comment is a region, it will also contain the region height, width, and position of the anchor in regards to the region. */
  client_meta: Vector | FrameOffset | Region | FrameOffsetRegion
  /** The file in which the comment lives */
  file_key: string
  /** If present, the id of the comment to which this is the reply */
  parent_id: string
  /** The user who left the comment */
  user: User
  /** The UTC ISO 8601 time at which the comment was left */
  created_at: string
  /** If set, the UTC ISO 8601 time the comment was resolved */
  resolved_at: string
  /** Only set for top level comments. The number displayed with the comment in the UI */
  order_id?: number
  /** Comment message */
  message: string
  /** An array of reactions to the comment */
  reactions: Reaction[]
}

/** A description of a user */
export interface User {
  /** Unique stable id of the user */
  id: string
  /** Name of the user */
  handle: string
  /** URL link to the user's profile image */
  img_url: string
  /** Email associated with the user's account. This will only be present on the /v1/me endpoint */
  email?: string
}

/** A version of a file */
export interface Version {
  /** Unique identifier for version */
  id: string
  /** The UTC ISO 8601 time at which the version was created */
  created_at: string
  /** The label given to the version in the editor */
  label: string
  /** The description of the version as entered in the editor */
  description: string
  /** The user that created the version */
  user: User
}

/** A Project can be identified by both the Project name, and the ProjectID. */
export interface Project {
  /** The ID of the project */
  id: number
  /** The name of the project */
  name: string
}

export type ReactionEmoji =
  | ':eyes:'
  | ':heart_eyes:'
  | ':heavy_plus_sign:'
  | ':+1:'
  | ':-1:'
  | ':joy:'
  | ':fire:'

export interface Reaction {
  /** The user who left the reaction */
  user: User
  /** The emoji type of reaction as a string */
  emoji: ReactionEmoji
  /** The UTC ISO 8601 time at which the reaction was left */
  created_at: string
}

export interface File {
  name: string
  role: string
  lastModified: string
  editorType: string
  thumbnailUrl: string
  version: String
  document: Node
  components: Record<string, Component>
  componentSets: Record<string, ComponentSet>
  schemaVersion: 0
  styles: Record<string, Style>
  mainFileKey: string
  branches: Branch[]
}
