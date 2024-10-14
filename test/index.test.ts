import * as cdk from 'aws-cdk-lib'
import { describe, expect, test } from 'vitest'
import { z } from 'zod'

import { getValidatedContext } from '../src/index.js'

describe('validated context', () => {
  test('get string context value', () => {
    const app = new cdk.App({ context: { foo: 'bar' } })
    const { foo } = getValidatedContext(app.node, { foo: z.string() })
    expect(foo).toEqual('bar')
  })

  test('get number context value', () => {
    const app = new cdk.App({ context: { foo: '99' } })
    const values = getValidatedContext(app.node, { foo: z.coerce.number() })

    expect(values).toEqual({ foo: 99 })
  })

  test("pass when optional value doesn't exist in context", () => {
    const app = new cdk.App({ context: {} })
    const values = getValidatedContext(app.node, { buzz: z.string().optional() })
    expect(values).toEqual({})
  })

  test("throw when required value doesn't exist in context", () => {
    const app = new cdk.App({ context: {} })
    expect(() => getValidatedContext(app.node, { buzz: z.string() })).toThrow()
  })
})
