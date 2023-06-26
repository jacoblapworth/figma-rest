import { describe, expect, test } from 'vitest'
import { FigmaClient } from './client.js'

describe('client', async () => {
  test('createClient', async () => {
    const client = new FigmaClient({ personalAccessToken: 'abc' })
    expect(client).toBeDefined()
  })
})
