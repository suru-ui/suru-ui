import * as React from "react";

import { MoreIcon } from "../../_icons.jsx";
import { getItemKey, defaultItemToStringLabel } from "../../_item.js";
import { useComboboxAPI } from "../../combobox/combobox.jsx";
import {
  ComboboxItem,
  ComboboxList,
  ComboboxRoot,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxPopup,
  ComboboxPortal,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxInputGroup,
  ComboboxPositioner,
} from "../../combobox/combobox.parts.js";
import {
  ScrollAreaRoot,
  ScrollAreaThumb,
  ScrollAreaCorner,
  ScrollAreaContent,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
} from "../../scroll-area/scroll-area.parts.js";
import type { IComponent } from "../../types.js";
import type { BreadcrumbLinkProps } from "../link/breadcrumb.link.jsx";
import { BreadcrumbLink } from "../link/breadcrumb.link.jsx";
import { useBreadcrumbContext } from "../root/breadcrumb.root.context.js";

/**
 * 省略されたパンくずの項目です。
 *
 * @template TItem 項目の型です。
 */
type BreadcrumbEllipsisItem<TItem = any> = {
  /**
   * 項目の元のインデックスです。
   */
  readonly index: number;

  /**
   * 項目です。
   */
  readonly item: TItem;
};

/**
 * {@link BreadcrumbEllipsis} に渡す props です。
 *
 * @template TItem 項目の型です。
 */
export type BreadcrumbEllipsisProps<TItem = any> = {
  /**
   * 項目の表示内容を取得します。
   */
  readonly getItemLabel: (item: TItem) => React.ReactNode;

  /**
   * 項目のリンク props を取得します。
   *
   * リンクを持たない項目では `null` を返します。
   */
  readonly getItemLinkProps: (item: TItem, index: number) => BreadcrumbLinkProps | null;

  /**
   * 省略された項目の一覧です。
   */
  readonly items: readonly BreadcrumbEllipsisItem<TItem>[];
};

export interface IBreadcrumbEllipsis extends IComponent<BreadcrumbEllipsisProps> {
  /**
   * @template TItem 項目の型です。
   */
  <TItem = any>(props: BreadcrumbEllipsisProps<TItem>): IComponent.Return;
}

/**
 * 省略されたパンくずの項目を検索して選択するためのコンボボックスです。
 *
 * `Combobox` の合成 API でパーツを組み立て、トリガーだけを省略記号のボタンに差し替えます。
 * 検索用の入力欄はポップアップの中に配置します。
 */
export const BreadcrumbEllipsis: IBreadcrumbEllipsis = function SuiBreadcrumbEllipsis<TItem>(
  props: BreadcrumbEllipsisProps<TItem>,
) {
  const ctx = useBreadcrumbContext();
  const { items, getItemLabel, getItemLinkProps } = props;
  const api = useComboboxAPI<BreadcrumbEllipsisItem<TItem>>({
    items,
    slotProps: {
      list: {
        children: (entry) => {
          const { item, index } = entry;
          const key = getItemKey(item) ?? index;
          const linkProps = getItemLinkProps(item, index);

          if (!linkProps) {
            return (
              <ComboboxItem key={key} value={entry}>
                {getItemLabel(item)}
              </ComboboxItem>
            );
          }

          return (
            <ComboboxItem
              key={key}
              value={entry}
              render={<BreadcrumbLink {...linkProps} tabIndex={-1} />}
              disabled={linkProps.disabled}
            >
              {linkProps.children}
            </ComboboxItem>
          );
        },
      },
      input: {
        "aria-label": "項目を検索",
      },
      popup: {
        style: {
          minWidth: "min(14rem, var(--available-width))",
        },
      },
      trigger: {
        className: `sui_breadcrumb_ellipsis sui_breadcrumb_ellipsis-size_${ctx.size}`,
        nativeButton: true,
        "aria-label": "省略された項目を表示",
      },
    },
    placeholder: "項目を検索",
    inputInPopup: true,
    itemToStringLabel: (entry) => defaultItemToStringLabel(entry.item),
  });

  return (
    <ComboboxRoot {...api.getRootProps()}>
      <ComboboxTrigger {...api.getTriggerProps()}>
        {(htmlProps) => (
          <button {...htmlProps} type="button">
            <MoreIcon />
          </button>
        )}
      </ComboboxTrigger>
      <ComboboxPortal {...api.getPortalProps()}>
        <ComboboxPositioner {...api.getPositionerProps()}>
          <ComboboxPopup {...api.getPopupProps()}>
            <ComboboxInputGroup {...api.getInputGroupInPopupProps()}>
              <ComboboxInput {...api.getInputProps()} />
            </ComboboxInputGroup>
            <ScrollAreaRoot {...api.getScrollAreaProps()}>
              <ScrollAreaViewport {...api.getViewportProps()}>
                <ScrollAreaContent {...api.getContentProps()}>
                  <ComboboxStatus {...api.getStatusProps()} />
                  <ComboboxEmpty {...api.getEmptyProps()} />
                  <ComboboxList {...api.getListProps()} />
                </ScrollAreaContent>
              </ScrollAreaViewport>
              <ScrollAreaScrollbar {...api.getScrollbarProps()}>
                <ScrollAreaThumb {...api.getThumbProps()} />
              </ScrollAreaScrollbar>
              <ScrollAreaCorner {...api.getCornerProps()} />
            </ScrollAreaRoot>
          </ComboboxPopup>
        </ComboboxPositioner>
      </ComboboxPortal>
    </ComboboxRoot>
  );
};
