Get and validate [AWS CDK](https://aws.amazon.com/cdk/) context against [Zod](https://zod.dev/) schema. Get typed, validated context as a result, or error will be thrown.

```typescript
import { getValidatedContext, z } from 'zod-cdk-context'

// {
//   foo: string;
//   bar?: string;
//   baz: number;
//   env: "prd" | "dev"
// }
const { foo, bar, baz, env } = getValidatedContext(app.node, {
  foo: z.string().min(1),
  bar: z.string().min(1).optional(),
  baz: z.coerce.number(),
  env: z.enum(['prd', 'dev']),
})
```

[Article](https://dev.to/shtuper/aws-cdk-context-validation-4ej) with some implementation details
