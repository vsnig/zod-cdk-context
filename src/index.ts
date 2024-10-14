import type { Node } from 'constructs'

import { z } from 'zod'

export const getValidatedContext = <
  T extends z.ZodObject<{ [key: string]: z.ZodString | z.ZodOptional<z.ZodString> }>,
>(
  node: Node,
  schema: T,
): z.infer<T> => {
  const obj = Object.fromEntries(
    Object.keys(schema.shape).map((key) => [key, node.tryGetContext(key)]),
  )

  return schema.parse(obj)
}
