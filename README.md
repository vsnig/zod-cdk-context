
Get and validate AWS CDK context against Zod schema. Get typed, validated context as a result, or error will be thrown.

```typescript
// {foo: string; bar?: string; baz: number}
const {foo, bar, baz} = getValidatedContext(app.node, {
  foo: z.string(),
  bar: z.string().optional(),
  baz: z.coerce.number(),
})
```