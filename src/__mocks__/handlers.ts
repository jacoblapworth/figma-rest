import { http, HttpResponse } from 'msw'
import {
  localVariablesResponse,
  modifyVariablesResponse,
  publishedVariablesResponse,
} from './fixtures/variables.js'
import { reactions } from './fixtures/comments.js'
import { activityLogsResponse } from './fixtures/activityLogs.js'

export const handlers = [
  // v1/files/${fileKey}/variables/local
  http.get('https://api.figma.com/v1/files/:key/variables/local', () =>
    HttpResponse.json(localVariablesResponse)
  ),

  http.get('https://api.figma.com/v1/files/:key/variables/published', () =>
    HttpResponse.json(publishedVariablesResponse)
  ),

  http.post('https://api.figma.com/v1/files/:key/variables', () =>
    HttpResponse.json(modifyVariablesResponse)
  ),

  http.get(
    'https://api.figma.com/v1/files/:file/comments/:comment/reactions',
    () => HttpResponse.json({ reactions })
  ),

  http.get('https://api.figma.com/v1/activity_logs', () =>
    HttpResponse.json(activityLogsResponse)
  ),
]
