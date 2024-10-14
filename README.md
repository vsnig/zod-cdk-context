Get and validate [AWS CDK](https://aws.amazon.com/cdk/) context against [Zod](https://zod.dev/) schema. Get typed, validated context as a result, or error will be thrown.

```typescript
// {foo: string; bar?: string; baz: number}
const { foo, bar, baz } = getValidatedContext(app.node, {
  foo: z.string().min(1),
  bar: z.string().min(1).optional(),
  baz: z.coerce.number(),
})
```

[Article](https://dev.to/shtuper/aws-cdk-context-validation-4ej) with some implementation details
