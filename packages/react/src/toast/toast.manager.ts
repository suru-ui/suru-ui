import { type ToastManager, Toast } from "@base-ui/react/toast";

export interface IToastManager<TData extends object = any> extends ToastManager<TData> {}

/**
 * Provider の外から通知を管理するマネージャーを作成します。
 *
 * 作成したマネージャーは {@link Provider} の `toastManager` に渡します。
 */
export function createToastManager<TData extends object = any>(): IToastManager<TData> {
  return Toast.createToastManager();
}
