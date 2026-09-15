import { type UseToastManagerReturnValue, Toast } from "@base-ui/react/toast";

export interface IToastClient<
  TData extends object = any,
> extends UseToastManagerReturnValue<TData> {}

/**
 * 通知を管理するフックです。
 *
 * {@link Provider} の配下で、通知一覧と追加、更新、削除の操作を取得します。
 */
export function useToastClient<TData extends object = any>(): IToastClient<TData> {
  return Toast.useToastManager();
}
