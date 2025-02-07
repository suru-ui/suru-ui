/**
 * 文字列にシリアライズすることが可能なプリミティブ型
 */
export type SerializablePrimitive =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined;

/**
 * 文字列にシリアライズすることが可能なプリミティブになれる型
 */
export type SerializablePrimitiveObject =
  | { readonly toString: () => string }
  | { readonly toPrimitive: () => SerializablePrimitive };

/**
 * 文字列にシリアライズすることが可能な配列
 */
export type SerializableArray = readonly SerializableValue[];

/**
 * 文字列にシリアライズすることが可能なオブジェクト
 */
export type SerializableObject = { readonly [P in string]?: SerializableValue };

/**
 * 文字列にシリアライズすることが可能な値の型
 */
export type SerializableValue =
  | SerializablePrimitive
  | SerializablePrimitiveObject
  | SerializableArray
  | SerializableObject;
