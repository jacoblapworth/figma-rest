import { http, HttpResponse } from 'msw'
import {
  localVariablesResponse,
  modifyVariablesResponse,
  publishedVariablesResponse,
} from './fixtures/variables.js'
import { reactions } from './fixtures/comments.js'
import { activityLogsResponse } from './fixtures/activityLogs.js'

const BASE_URL = 'https://api.figma.com/v1'

export const handlers = [
  http.get(`${BASE_URL}/files/:key/variables/local`, () =>
    HttpResponse.json(localVariablesResponse)
  ),

  http.get(`${BASE_URL}/files/:key/variables/published`, () =>
    HttpResponse.json(publishedVariablesResponse)
  ),

  http.post(`${BASE_URL}/files/:key/variables`, () =>
    HttpResponse.json(modifyVariablesResponse)
  ),

  http.get(`${BASE_URL}/files/:file/comments/:comment/reactions`, () =>
    HttpResponse.json({ reactions })
  ),

  http.get(`${BASE_URL}/activity_logs`, () =>
    HttpResponse.json(activityLogsResponse)
  ),
]
