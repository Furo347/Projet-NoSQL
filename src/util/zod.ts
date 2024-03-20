import { z } from "zod"

export const zodEnumFromObjValues =  function<K extends string> ( obj: Record<string, K> ): z.ZodEnum<[ K, ...K[] ]> {
  const [ firstKey, ...otherKeys ] = Object.values( obj )
  return z.enum( [ firstKey, ...otherKeys ] )
}

export const zodEnumFromObjKeys =  function<K extends string> ( obj: Record<K, unknown> ): z.ZodEnum<[ K, ...K[] ]> {
  const [ firstKey, ...otherKeys ] = Object.keys( obj ) as K[]
  return z.enum( [ firstKey, ...otherKeys ] )
}