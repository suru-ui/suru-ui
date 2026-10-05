import { Menu } from "@base-ui/react/menu";

/**
 * メニューを命令的に制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export type MenuHandle<TPayload = any> = Menu.Handle<TPayload>;

export interface ICreateMenuHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns メニューを命令的に制御するハンドルです。
   */
  <TPayload = any>(): MenuHandle<TPayload>;
}

/**
 * メニューを制御するハンドルを新しく作成します。
 */
export const createMenuHandle: ICreateMenuHandle = function createSuiMenuHandle() {
  return Menu.createHandle();
};

export { type MenuHandle as Handle, createMenuHandle as createHandle };
