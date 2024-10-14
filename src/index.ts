import type { Node } from 'constructs'

import { z } from 'zod'

export const getValidatedContext = <
  T extends { [key: string]: z.ZodString | z.ZodOptional<z.ZodString> },
>(
  node: Node,
  schemaObject: T,
): z.infer<z.ZodObject<T>> => {
  const schema = z.object(schemaObject)
  const obj = Object.fromEntries(
    Object.keys(schema.shape).map((key) => [key, node.tryGetContext(key)]),
  )

  return schema.parse(obj)
}
