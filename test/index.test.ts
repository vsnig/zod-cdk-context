import * as cdk from 'aws-cdk-lib'
import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { getValidatedContext } from '../src/index.js'

describe('validated context', () => {
  const app = new cdk.App({ context: { foo: 'bar' } })

  test('get and validate context', () => {
    expect(getValidatedContext(app.node, { foo: z.string() }).foo).toEqual('bar')
  })

  test('throws on wrong key', () => {
    // @ts-expect-error foo indeed is not in object 
    expect(() => getValidatedContext(app.node, { buzz: z.string() }).foo).toThrow()
  })
})
