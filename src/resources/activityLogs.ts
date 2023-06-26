import { BaseResource } from './base.js'

type ActivityLogEvents =
  | 'branch_archive'
  | 'branch_create'
  | 'branch_delete'
  | 'branch_member_add'
  | 'branch_member_permission_change'
  | 'branch_member_remove'
  | 'branch_unarchive'
  | 'community_hub_file_delete'
  | 'community_hub_file_publish'
  | 'community_hub_file_update'
  | 'community_plugin_delete'
  | 'community_plugin_publish'
  | 'community_plugin_update'
  | 'community_widget_delete'
  | ''
  | ''
  | 'org_user_create'
  | 'org_user_delete'

type ActivityLogEvent = {
  /**
   * Action is the task or activity the actor performed.
   * The type tells us the kind of action, and the details represent the associated metadata.
   * Each action type supports its own metadata attributes.
   */
  action: {
    // TODO: add discriminated types for details
    details: Record<string, string>
    type: ActivityLogEvent
  }
  /**
   * Actor is the user who performed the action. There are three attributes to identify the user: email, id and name.
   * The actor field can be empty if an anonymous request triggers the event.
   * For example: the Figma server performs a daily background job. Or, an anonymous user views a public file link. */
  actor: ActivityLogActor
  /** Context is where you can find other contextual information about the event */
  context: ActivityLogContext
  /** Entity is the resource the actor took the action on.
   * It can be a user, file, project or other resource types.  */
  entity: ActivityLogEntity
  id: string
  timestamp: number
}

type ActivityLogActor = {
  email: string
  id: string
  name: string
  type: string
}

type ActivityLogContext = {
  /** The third-party application that triggered the event, if applicable. */
  client_name?: string
  /** The IP address from of the client that sent the event request. */
  ip_address: string
  /**  If Figma's Support team triggered the event. This is either true or false. */
  is_figma_support_team_action: boolean
  /** The id of the organization where the event took place. */
  org_id: string
  /** The id of the team where the event took place—if this took place in a specific team. */
  team_id?: string
}

type ActivityLogEntity =
  | UserEntity
  | FileEntity
  | FileRepoEntity
  | ProjectEntity
  | TeamEntity
  | WorkspaceEntity
  | OrgEntity
  | PluginEntity
  | WidgetEntity

/** A Figma user */
type UserEntity = {
  /** Unique stable id of the user. */
  id: string
  /** Name of the user */
  name: string
  /** Email associated with the user's account. */
  email: string
}

/** A Figma Design or FigJam file */
type FileEntity = {
  key: string
  /** Unique identifier of the file. */
  name: string
  /** Name of the file. */
  editor_type: string
  /** Indicates if the object is a file on Figma Design or FigJam. Can be figma or figjam. */
  link_access: string
  /** Access policy for users who have the link to the file. Can be view, edit, org_view, org_edit or inherit. */
  proto_link_access: string
  /** Access policy for users who have the link to the file's prototype. Can be view, org_view or inherit. */
}

/** A file branch that diverges from and can be merged back into the main file */
type FileRepoEntity = {
  /**  */
  id: string
}

/** A project that a collection of Figma files are grouped under */
type ProjectEntity = {
  /** Unique identifier of the project. */
  id: string
  /** Name of the project. */
  name: string
}

/** A Figma team that contains multiple users and projects */
type TeamEntity = {
  /** Unique identifier of the team. */
  id: string
  /** Name of the team. */
  name: string
}

/** Part of the organizational hierarchy of managing files and users within Figma, only available on the Enterprise Plan */
type WorkspaceEntity = {
  /** Unique identifier of the workspace.
   */
  id: string
  /** Name of the workspace. */
  name: string
}

/** A Figma organization */
type OrgEntity = {
  /** Unique identifier of the org. */
  id: string
  /** Name of the org. */
  name: string
}

/** A Figma plugin */
type PluginEntity = {
  /** Unique identifier of the plugin. */
  id: string
  /** Name of the plugin */
  name: string
  /** Indicates if the object is a plugin is available on Figma Design or FigJam. */
  editor_type: 'figma' | 'figjam'
}

/** A Figma widget */
type WidgetEntity = {
  /** Unique identifier of the widget.  */
  id: string
  /** Name of the widget. */
  name: string
  /** Indicates if the widget is available on Figma Design or FigJam */
  editor_type: 'figma' | 'figjam'
}

type ActivityLogParams = {
  /**
   * Event type(s) to include in the response. Can have multiple values separated by comma. All events are returned by default.
   */
  events?: ActivityLogEvents[]
  /**
   * Unix timestamp of the least recent event to include. This param defaults to one year ago if unspecified. Events prior to one year ago are not available.
   */
  starts_time?: number
  /**
   * Unix timestamp of the most recent event to include. This param defaults to the current timestamp if unspecified.
   */
  end_time?: number
  /**
   * Maximum number of events to return. This param defaults to 1000 if unspecified.
   * @default 1000
   */
  limit?: number
  /**
   * Event order by timestamp. This param can be either "asc" (default) or "desc".
   * @default 'asc'
   */
  order?: 'asc' | 'desc'
  cursor?: string
}

export type ActivityLogResponse = {
  error: false
  i18n?: string
  meta: {
    activity_logs: ActivityLogEvent[]
    cursor?: string
    next_page?: boolean
  }
  status: 200
}

/**
 * Track what's happening in your organization with the Activity Logs API.
 *
 * Who can use the Activity Logs API
 * - The Activity Logs API is currently in beta. Features and functions may change as we respond to feedback.
 * - The Activity Logs API is only available to organizations on the Enterprise plan.
 * - Only organization admins can access activity logs. Only share what you build with this API with organization admins.
 *
 * The Activity Logs API provides programmatic access to your organization's activity logs. Activity logs allow you to see how people are accessing and using your organization. You can use the Activity Logs API to build your own custom applications.
 *
 * In order to use the Activity Logs API, you’ll need to authenticate your request using an OAuth 2 token in order to act on behalf of the organization whose activity logs you want to access.
 *
 * Note:
 * 1. Tokens used with the Activity Logs API must have org:activity_log_read as their scope. A token with a different scope will not be authorized to access this endpoint.
 * 2. Make sure you only share what you build with this API with Enterprise organization admins. Only organization admins in Figma Enterprise organizations can authenticate OAuth 2 requests on behalf of their organizations.
 * 3. Currently, this API can only be used by Figma Enterprise organizations building internal applications.
 *
 * @beta
 * @see https://www.figma.com/developers/api#activity_logs
 */
export class ActivityLogsResource extends BaseResource {
  /**
   * Returns a list of activity log events
   */
  public get({
    events,
    ...rest
  }: ActivityLogParams = {}): AsyncIterableIterator<ActivityLogEvent> {
    const searchParams = { ...rest, events: events?.join(',') }
    return this._client.request.paginate<ActivityLogEvent, ActivityLogResponse>(
      `v1/activity_logs`,
      {
        resolveBodyOnly: true,
        responseType: 'json',
        searchParams,
        pagination: {
          transform: (response) => {
            return response.body.meta.activity_logs
          },
          paginate: ({ response }) => {
            const cursor = response.body.meta.cursor

            if (cursor) {
              return { searchParams: { ...searchParams, cursor } }
            }

            return false
          },
        },
      }
    )
  }
}
