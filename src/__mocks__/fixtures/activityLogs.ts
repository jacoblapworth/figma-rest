import {
  ActivityLogEvent,
  ActivityLogResponse,
} from '../../resources/activityLogs.js'

export const activity_logs: ActivityLogEvent[] = [
  {
    action: {
      details: {
        permission: 'member',
        figma_paid_status: 'viewer',
        figjam_paid_status: 'viewer',
      },
      type: 'org_user_create',
    },
    actor: {
      email: 'admin@figma.com',
      id: '1099091282752443416',
      name: 'Admin',
      type: 'user',
    },
    context: {
      client_name: undefined,
      ip_address: '172.19.0.1',
      is_figma_support_team_action: false,
      org_id: '1047918802483077121',
      team_id: undefined,
    },
    entity: {
      email: 'member@figma.com',
      id: '1099091282712783786',
      name: 'Member',
      type: 'user',
    },
    id: '1243',
    timestamp: 1650578182,
  },
]

export const activityLogsResponse: ActivityLogResponse = {
  error: false,
  meta: {
    activity_logs,
    cursor: undefined,
    next_page: undefined,
  },
  status: 200,
}
