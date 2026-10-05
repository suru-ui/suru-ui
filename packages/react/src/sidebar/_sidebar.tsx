import type { SidebarSide, SidebarVariant, SidebarCollapsible } from "./sidebar.jsx";
import { Sidebar } from "./sidebar.jsx";

/**
 * {@link FullSidebar} に渡す props です。
 */
export type FullSidebarProps = {
  /**
   * 折りたたみの方法です。
   */
  collapsible?: SidebarCollapsible | undefined;

  /**
   * 初期の開閉状態です。
   */
  defaultOpen?: boolean | undefined;

  /**
   * 開閉状態が変化したときに呼び出されます。
   */
  onOpenChange?: ((open: boolean) => void) | undefined;

  /**
   * 制御する開閉状態です。
   */
  open?: boolean | undefined;

  /**
   * 配置する辺です。
   */
  side?: SidebarSide | undefined;

  /**
   * 外観バリアントです。
   */
  variant?: SidebarVariant | undefined;
};

/**
 * 公開パーツをすべて配置したサイドバーです。
 * パーツの描画・状態クラス・配置の検証で共通して使用します。
 */
export function FullSidebar(props: FullSidebarProps) {
  const {
    open,
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    defaultOpen,
    onOpenChange,
  } = props;

  return (
    <Sidebar open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <Sidebar.Root side={side} variant={variant} collapsible={collapsible}>
        <Sidebar.Header>ヘッダー</Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>ラベル</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
              <a href="#item">項目</a>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>フッター</Sidebar.Footer>
        <Sidebar.Rail />
      </Sidebar.Root>
      <Sidebar.Inset>
        <Sidebar.Trigger />
        <p>本文</p>
      </Sidebar.Inset>
    </Sidebar>
  );
}
