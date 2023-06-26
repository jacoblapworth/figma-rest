import { describe, expect, test } from 'vitest'
import { FigmaClient } from '../client.js'

describe('variables', () => {
  const client = new FigmaClient({ personalAccessToken: 'abc' })

  test('local', async () => {
    const result = await client.variables.getLocal('123')
    expect(result).toMatchSnapshot()
  })

  test('published', async () => {
    const result = await client.variables.getPublished('123')
    expect(result).toMatchSnapshot()
  })

  test('modify', async () => {
    const result = await client.variables.modify('123', {})
    expect(result).toMatchSnapshot()
  })
})
