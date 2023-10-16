import { describe, expect, test } from 'vitest'
import { FigmaClient } from './client.js'
import { server } from './__mocks__/server.js'
import { HttpResponse, http } from 'msw'

describe('client', async () => {
  test('createClient', async () => {
    const client = new FigmaClient({ personalAccessToken: 'abc' })
    expect(client).toBeDefined()
  })

  test('personalAccessToken', async () => {
    server.use(
      http.get('https://api.figma.com/', ({ request, params }) => {
        const token = request.headers.get('x-figma-token')
        if (token !== 'personal') {
          return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        return new HttpResponse(null, { status: 200 })
      })
    )

    const client = new FigmaClient({ personalAccessToken: 'personal' })
    const { statusCode } = await client.request('', { resolveBodyOnly: false })
    expect(statusCode).toBe(200)
  })

  test('oAauthToken', async () => {
    server.use(
      http.get('https://api.figma.com/', ({ request }) => {
        const token = request.headers.get('authorization')
        if (token !== 'Bearer oAuth') {
          return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }
        return new HttpResponse(null, { status: 200 })
      })
    )

    const client = new FigmaClient({ oAuthToken: 'oAuth' })
    const { statusCode } = await client.request('', { resolveBodyOnly: false })
    expect(statusCode).toBe(200)
  })
})
