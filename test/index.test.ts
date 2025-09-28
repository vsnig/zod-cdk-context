import * as cdk from 'aws-cdk-lib'
import { describe, expect, test } from 'vitest'

import { parseContext, z } from '../src/index.js'

describe('validated context', () => {
  test('get string context value', () => {
    const app = new cdk.App({ context: { foo: 'bar' } })
    const { foo } = parseContext(app.node, { foo: z.string() })
    expect(foo).toEqual('bar')
  })

  test('get number context value', () => {
    const app = new cdk.App({ context: { foo: '99' } })
    const values = parseContext(app.node, { foo: z.coerce.number() })

    expect(values).toEqual({ foo: 99 })
  })

  test("pass when optional value doesn't exist in context", () => {
    const app = new cdk.App({ context: {} })
    const values = parseContext(app.node, { buzz: z.string().optional() })
    expect(values).toEqual({})
  })

  test("throw when required value doesn't exist in context", () => {
    const app = new cdk.App({ context: {} })
    expect(() => parseContext(app.node, { buzz: z.string() })).toThrow()
  })

  test('enum of strings', () => {
    const app = new cdk.App({ context: { stage: 'prd' } })

    expect(parseContext(app.node, { stage: z.enum(['prd', 'dev']) })).toEqual({
      stage: 'prd',
    })
    expect(() => parseContext(app.node, { stage: z.enum(['foo']) })).toThrow()
  })
})
