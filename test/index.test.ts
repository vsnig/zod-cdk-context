import * as cdk from 'aws-cdk-lib'
import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { getValidatedContext } from '../src/index.js'

describe('validated context', () => {
  test('get and validate context', () => {
    const app = new cdk.App({ context: { foo: 'bar' } })
    const { foo } = getValidatedContext(app.node, { foo: z.string() })
    expect(foo).toEqual('bar')
  })

  test('get and validate context', () => {
    const app = new cdk.App({ context: { foo: '99' } })
    const { foo } = getValidatedContext(app.node, { foo: z.coerce.number() })

    expect(foo).toEqual(99)
  })

  test('throws on wrong key', () => {
    const app = new cdk.App({ context: { foo: 'bar' } })
    // @ts-expect-error foo indeed is not in object
    expect(() => getValidatedContext(app.node, { buzz: z.string() }).foo).toThrow()
  })
})
