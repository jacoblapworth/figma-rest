import { rest } from 'msw'
import { describe, expect, test } from 'vitest'
import { FigmaClient } from '../client.js'
import { Reaction } from '../models/api.js'
import { server } from '../__mocks__/server.js'
import { reactions } from '../__mocks__/fixtures/comments.js'

describe('comments', () => {
  const client = new FigmaClient({ personalAccessToken: 'abc' })

  test('reactions', async () => {
    server.use(
      rest.get(
        'https://api.figma.com/v1/files/:file/comments/:comment/reactions',
        (req, res, ctx) => {
          return res.once(
            ctx.json({ pagination: { next_page: '123' }, reactions })
          )
        }
      )
    )

    let items: Reaction[] = []

    for await (let reaction of client.comments.reactions('123', '456')) {
      items.push(reaction)
    }

    expect(items).toMatchSnapshot()
    expect(items.length).toBe(4)
  })
})
