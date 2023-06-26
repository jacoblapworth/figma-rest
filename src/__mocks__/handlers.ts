import { rest } from 'msw'
import {
  localVariablesResponse,
  modifyVariablesResponse,
  publishedVariablesResponse,
} from './fixtures/variables.js'
import { reactions } from './fixtures/comments.js'
import { activityLogsResponse } from './fixtures/activityLogs.js'

export const handlers = [
  // v1/files/${fileKey}/variables/local
  rest.get(
    'https://api.figma.com/v1/files/:key/variables/local',
    (req, res, ctx) => res(ctx.json(localVariablesResponse))
  ),

  rest.get(
    'https://api.figma.com/v1/files/:key/variables/published',
    (req, res, ctx) => res(ctx.json(publishedVariablesResponse))
  ),

  rest.post('https://api.figma.com/v1/files/:key/variables', (req, res, ctx) =>
    res(ctx.json(modifyVariablesResponse))
  ),

  rest.get(
    'https://api.figma.com/v1/files/:file/comments/:comment/reactions',
    (req, res, ctx) => res(ctx.json({ reactions }))
  ),

  rest.get('https://api.figma.com/v1/activity_logs', (req, res, ctx) =>
    res(ctx.json(activityLogsResponse))
  ),
]
