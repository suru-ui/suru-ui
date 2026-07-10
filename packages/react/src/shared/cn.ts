import type { StyleRenderProps } from "react-aria-components";

type Falsy = 0 | null | false | undefined;

type StaticClassName = string | Falsy;

type ClassNameOrFunction<TValues> = NonNullable<StyleRenderProps<TValues>["className"]>;

type DynamicClassNameArgs<TValues> = Parameters<Extract<ClassNameOrFunction<TValues>, Function>>;

interface DynamicClassName<TValues> {
  (...args: DynamicClassNameArgs<TValues>): StaticClassName | Falsy;
}

export type ClassName<TValues = Record<string, unknown>> =
  | DynamicClassName<TValues>
  | StaticClassName;

function cn(...classNames: Exclude<ClassName<never>, Function>[]): string;

function cn<TValues>(...classNames: ClassName<TValues>[]): ClassNameOrFunction<TValues>;

function cn<TValues>(...classNames: ClassName<TValues>[]): ClassNameOrFunction<TValues> {
  const parts: Exclude<ClassName<TValues>, Falsy>[] = [];
  let classNameBuffer = "";
  let containsFunction = false;

  function flush(): void {
    if (classNameBuffer) {
      parts.push(classNameBuffer);
      classNameBuffer = "";
    }
  }

  for (let i = 0, n = classNames.length, part; i < n; i++) {
    part = classNames[i];
    if (!part) {
      continue;
    }

    switch (typeof part) {
      case "string":
        classNameBuffer += (classNameBuffer && " ") + part;
        break;

      case "function":
        flush();
        parts.push(part);
        containsFunction = true;
        break;

      default:
        part satisfies never;
    }
  }

  if (!containsFunction) {
    return classNameBuffer;
  }

  flush();

  return function className(values) {
    let result = "";
    for (
      let i = 0,
        n = parts.length,
        part: Exclude<ClassName<TValues>, Falsy>,
        temp: string,
        returns: unknown;
      i < n;
      i++
    ) {
      part = parts[i]!;
      temp = "";
      switch (typeof part) {
        case "string":
          temp = part;
          break;

        case "function":
          returns = part(values);
          if (typeof returns === "string" && returns) {
            temp = returns;
          }

          break;

        default:
          part satisfies never;
      }

      if (temp) {
        result += (result && " ") + temp;
      }
    }

    return result;
  };
}

export default cn;
