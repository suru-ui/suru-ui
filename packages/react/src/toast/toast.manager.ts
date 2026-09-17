import { type ToastManager, Toast } from "@base-ui/react/toast";

/**
 * Provider の外から通知を管理するマネージャーです。
 *
 * @template TData 通知に含める追加データの型です。
 */
export interface IToastManager<TData extends object = any> extends ToastManager<TData> {}

/**
 * Provider の外から通知を管理するマネージャーを作成します。
 *
 * 作成したマネージャーは {@link Provider} の `toastManager` に渡します。
 *
 * @template TData 通知に含める追加データの型です。
 * @returns 通知を管理するマネージャーです。
 */
export function createToastManager<TData extends object = any>(): IToastManager<TData> {
  return Toast.createToastManager<TData>();
}
