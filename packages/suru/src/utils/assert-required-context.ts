export default function assertRequiredContext<T>(
  name: string,
  value: T | undefined,
): asserts value is T {
  if (value !== undefined) {
    return value as any;
  }

  const ctx = `${name}Context`;
  const err = new Error(
    `suru-ui(suru): ${ctx} の値が \`undefined\` でした。<${ctx} /> で囲う必要があります。`,
  );
  Error.captureStackTrace?.(err, assertRequiredContext);
  throw err;
}
