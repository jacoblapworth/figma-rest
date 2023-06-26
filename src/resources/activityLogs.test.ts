import { describe, expect, test } from 'vitest'
import { FigmaClient } from '../client.js'

describe('variables', () => {
  const client = new FigmaClient({ personalAccessToken: 'abc' })

  test('logs', async () => {
    const result = await client.activityLogs.get()
    expect(result).toMatchSnapshot()
  })
})
