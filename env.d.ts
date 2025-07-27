declare const __DEV__: boolean;

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: "development" | "production" | "test" | (string & {}) | undefined;
  }
}

declare global {
  interface ArrayConstructor {
    isArray(arg: readonly any[] | any): arg is readonly any[];
  }
}
