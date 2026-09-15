import { Drawer } from "@base-ui/react/drawer";

/**
 * ドロワーを命令的に制御するハンドルです。
 *
 * @template TPayload トリガーが送信するデータの型です。
 */
export interface DrawerHandle<TPayload = any> extends Drawer.Handle<TPayload> {}

interface ICreateHandle {
  /**
   * @template TPayload トリガーが送信するデータの型です。
   * @returns ドロワーを命令的に制御するハンドルです。
   */
  <TPayload = any>(): DrawerHandle<TPayload>;
}

/**
 * {@link DrawerHandle} を作成する関数です。
 */
export const createDrawerHandle: ICreateHandle = function createSuiDrawerHandle() {
  return Drawer.createHandle();
};

export { type DrawerHandle as Handle, createDrawerHandle as createHandle };
