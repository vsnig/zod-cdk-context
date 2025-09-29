import type { Node } from 'constructs'

import { z, type ZodRawShape } from 'zod/v4'

export { z } from 'zod/v4'

export const parseContext = <T extends ZodRawShape>(
  node: Node,
  schemaObject: T,
): z.infer<z.ZodObject<T>> => {
  const schema = z.object(schemaObject)
  const obj = Object.fromEntries(
    Object.keys(schema.shape).map((key) => [key, node.tryGetContext(key)]),
  )

  return schema.parse(obj)
}
