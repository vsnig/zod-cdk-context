
Get and validate AWS CDK context against Zod schema. Get typed, validated context as a result, or error will be thrown.

```typescript
// {foo: string, bar?: string}
const {foo, bar} = getValidatedContext(app.node, { 
    foo: z.string(), 
    bar: z.string().optional(), 
  })
```