import { ActivityLogResponse } from '../../resources/activityLogs.js'

export const activityLogsResponse: ActivityLogResponse = {
  error: false,
  meta: {
    activity_logs: [],
    cursor: undefined,
    next_page: undefined,
  },
  status: 200,
}
