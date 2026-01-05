import { Tooltip } from "@base-ui/react/tooltip";
import * as React from "react";
import partialize, { Partialized } from "../../shared/partialize.js";
import splitProps from "../../shared/split-props.js";
import toBaseUiProps from "../../shared/to-base-ui-props.js";
import type { Padding, Rect, SuiComponentProps, VirtualElement } from "../../shared/types.js";
import useBaseUiProps from "../../shared/use-base-ui-props.js";
import useSingleton from "../../shared/use-singleton.js";
import GroupContext from "../tooltip-group/tooltip-group-context.js";

import "./use-tooltip.css";

/**************************************************************************************************/

/**
 * ツールチップのトリガーが保持する状態の定義です。
 */
export type TooltipTriggerState = {
  /**
   * ツールチップが開いているかどうかです。
   */
  open: boolean;
};

/**
 * ツールチップのトリガーに関する内部的なプロパティーの定義です。
 */
type SuiTooltipTriggerProps = {
  /**
   * ツールチップを閉じるまでの待機時間です。ミリ秒単位で指定します。
   *
   * @default 0
   */
  closeDelay?: number | undefined;

  /**
   * ツールチップを開くまでの待機時間です。ミリ秒単位で指定します。
   *
   * @default 600
   */
  delay?: number | undefined;
};

/**
 * ツールチップのトリガーコンポーネントに渡すプロパティーの型定義です。
 *
 * `button` 要素の基本属性と、ツールチップ固有のプロパティーを結合しています。
 */
export type TooltipTriggerProps =
  & Omit<SuiComponentProps<"button", TooltipTriggerState>, keyof SuiTooltipTriggerProps>
  & SuiTooltipTriggerProps;

/**
 * ツールチップの表示・非表示を制御するトリガーコンポーネントのインターフェースです。
 */
export interface TooltipTrigger extends React.FC<TooltipTriggerProps> {}

/**************************************************************************************************/

/**
 * ツールチップを命令的に操作するためのアクションの型定義です。
 */
export type TooltipActions = {
  /**
   * ツールチップを閉じます。
   */
  close(): void;

  /**
   * ツールチップをアンマウントします。
   */
  unmount(): void;
};

/**
 * ポップアップを配置する側面（上下左右）を表す型です。
 */
export type Side = "top" | "bottom" | "left" | "right" | "inline-end" | "inline-start";

/**
 * ポップアップを配置する際の整列位置（開始、中央、終了）を表す型です。
 */
export type Align = "start" | "center" | "end";

/**
 * ポップアップの表示領域を制限する境界の種類を表す型です。
 */
export type Boundary = "clipping-ancestors" | Element | Element[] | Rect;

/**
 * オフセットを計算する関数に渡されるデータの型定義です。
 */
export type OffsetFunctionData = {
  /**
   * ポジショナーが配置されているアンカー要素の側面です。
   */
  side: Side;

  /**
   * 指定された側面に対するポジショナーの配置位置です。
   */
  align: Align;

  /**
   * アンカー要素のサイズ（`width`, `height`）です。
   */
  anchor: {
    /**
     * アンカー要素の横幅です。
     */
    width: number;

    /**
     * アンカー要素の縦幅です。
     */
    height: number;
  };

  /**
   * ポジショナー要素のサイズ（`width`, `height`）です。
   */
  positioner: {
    /**
     * ポジショナー要素の横幅です。
     */
    width: number;

    /**
     * ポジショナー要素の縦幅です。
     */
    height: number;
  };
};

/**
 * 数値を返すことでオフセットを動的に決定する関数の型定義です。
 */
export interface OffsetFunction {
  /**
   * オフセットを動的に決定します。
   *
   * @param data オフセットを計算する関数に渡されるデータです。
   * @returns オフセットです。
   */
  (data: OffsetFunctionData): number;
}

/**
 * 配置の反転（Flip）を用いた衝突回避の設定です。
 */
export type CollisionAvoidanceSideFlipMode = {
  /**
   * サイド軸（配置面）での衝突回避方法です。
   *
   * "flip" を指定すると、反対側に反転して配置します。
   */
  side?: "flip" | "none" | undefined;

  /**
   * アライメント軸（整列方向）での衝突回避方法です。
   *
   * "flip" は反転、"shift" は表示領域内に収まるよう位置をずらします。
   */
  align?: "flip" | "shift" | "none" | undefined;

  /**
   * 優先された軸の両側に収まらない場合、垂直方向の軸（隣接する側面）に切り替えるかどうか、およびどちらの論理的な側を優先するかを決定します。
   */
  fallbackAxisSide?: "start" | "end" | "none" | undefined;
};

/**
 * 配置の移動（Shift）を用いた衝突回避の設定です。
 */
export type CollisionAvoidanceSideShiftMode = {
  /**
   * サイド軸（配置面）での衝突回避方法です。
   *
   * "shift" を指定すると、表示領域内に収まるよう位置をずらします。
   */
  side?: "shift" | "none" | undefined;

  /**
   * アライメント軸（整列方向）での衝突回避方法です。
   */
  align?: "shift" | "none" | undefined;

  /**
   * 優先された軸の両側に収まらない場合、垂直方向の軸（隣接する側面）に切り替えるかどうか、およびどちらの論理的な側を優先するかを決定します。
   */
  fallbackAxisSide?: "start" | "end" | "none" | undefined;
};

/**
 * ツールチップの表示位置が衝突した際の回避戦略をまとめた型定義です。
 */
export type CollisionAvoidance = CollisionAvoidanceSideFlipMode | CollisionAvoidanceSideShiftMode;

/**
 * ツールチップの開閉状態が変化した際の詳細情報の型定義です。
 */
export type TooltipOpenChangeEventDetails = {
  /**
   * イベントが発生した理由です。
   */
  reason:
    | "disabled"
    | "escape-key"
    | "imperative-action"
    | "none"
    | "outside-press"
    | "trigger-focus"
    | "trigger-hover"
    | "trigger-press";

  /**
   * このカスタムイベントに関連付けられたネイティブイベントです。
   */
  event:
    | Event
    | FocusEvent
    | KeyboardEvent
    | MouseEvent
    | PointerEvent
    | TouchEvent;

  /**
   * Base UI によるイベント処理をキャンセルします。
   */
  cancel(): void;

  /**
   * Base UI がイベントの伝播を停止させるケースにおいて、伝播を許可します。
   */
  allowPropagation(): void;

  /**
   * イベントがキャンセルされたかどうかを示します。
   */
  isCanceled: boolean;

  /**
   * イベントの伝播が許可されているかどうかを示します。
   */
  isPropagationAllowed: boolean;

  /**
   * イベントを発生させた要素（該当する場合のみ）です。
   */
  trigger: Element | undefined;

  /**
   * 閉じる際にコンポーネントがアンマウントされるのを防ぎます。
   */
  preventUnmountOnClose(): void;
};

/**
 * ツールチップの開閉状態が変化したときに呼び出される関数の型定義です。
 */
export interface TooltipOpenChangeHandler {
  /**
   * @param open ツールチップが現在開いているかどうかです。
   * @param eventDetails 詳細情報です。
   */
  (open: boolean, eventDetails: TooltipOpenChangeEventDetails): void;
}

/**
 * ツールチップの開閉アニメーションが完了したときに呼び出される関数の型定義です。
 */
export interface TooltipOpenChangeCompleteHandler {
  /**
   * @param open ツールチップが現在開いているかどうかです。
   */
  (open: boolean): void;
}

/**
 * CSS アニメーションのステータス文字列です。
 */
export type TransitionStatus = "starting" | "ending" | "idle" | undefined;

/**
 * ツールチップの状態を表す型定義です。
 */
export type TooltipContentState = {
  /**
   * ツールチップが開いているかどうかを表すフラグです。
   */
  open: boolean;

  /**
   * ツールチップが表示されている側面（上下左右）です。
   */
  side: Side;

  /**
   * ツールチップの配置位置（開始、中央、終了）の整列状態です。
   */
  align: Align;

  /**
   * 即座に状態が切り替わる原因となったアクションの種別です。
   *
   * 遅延実行、フォーカス、または破棄（非表示）などを表します。
   */
  instant: "delay" | "focus" | "dismiss" | undefined;

  /**
   * CSS アニメーションのステータス文字列です。
   */
  transitionStatus: TransitionStatus;
};

type SuiTooltipContentProps = {
  /**
   * 命令的なアクション（メソッド実行）のための ref です。
   *
   * - `unmount`: これを指定すると、閉じたときにツールチップが自動的にアンマウントされなくなります。代わりに、`unmount` 関数を呼び出して手動でアンマウントする必要があります。外部ライブラリでツールチップのアニメーションを制御する場合などに便利です。
   */
  actionsRef?: React.RefObject<TooltipActions> | undefined;

  /**
   * 指定した側（side）に対して、ポップアップをどのように整列させるかを指定します。
   *
   * @default "center"
   */
  align?: Align | undefined;

  /**
   * アライメント軸（整列方向）に沿った追加のオフセット（ピクセル単位）です。
   *
   * アンカー要素やポジショナー要素のサイズ、配置されている側、アライメントなどの情報を読み取り、それに応じたオフセットを返す関数を指定することもできます。
   *
   * 関数の引数である `data` オブジェクトには以下のプロパティが含まれます：
   * - `data.anchor`: アンカー要素のサイズ（`width`, `height`）
   * - `data.positioner`: ポジショナー要素のサイズ（`width`, `height`）
   * - `data.side`: ポジショナーが配置されているアンカー要素の側
   * - `data.align`: 指定された側に対するポジショナーのアライメント
   *
   * @default 0
   */
  alignOffset?: number | OffsetFunction | undefined;

  /**
   * ポップアップの配置基準となる要素（アンカー要素）です。
   *
   * デフォルトでは、トリガー要素が基準となります。
   */
  anchor?:
    | Element
    | VirtualElement
    | React.RefObject<Element | null>
    | { (): Element | VirtualElement | null }
    | null
    | undefined;

  /**
   * ポップアップ配置時の衝突回避（Collision Avoidance）の方法を決定します。
   */
  collisionAvoidance?: CollisionAvoidance | undefined;

  /**
   * ポップアップの表示領域を制限する境界要素、または矩形領域です。
   *
   * @default "clipping-ancestors"
   */
  collisionBoundary?: Boundary | undefined;

  /**
   * 衝突境界（collision boundary）の端から維持すべき追加の余白です。
   *
   * @default 5
   */
  collisionPadding?: Padding | undefined;

  /**
   * ツールチップが初期状態で開いているかどうかです。
   *
   * 制御状態としてツールチップをレンダリングする場合は、代わりに `open` プロパティを使用してください。
   *
   * @default false
   */
  defaultOpen?: boolean | undefined;

  /**
   * ツールチップに関連付けられたトリガーの ID です。
   *
   * `defaultOpen` プロパティと併用して、初期状態で開いているツールチップを作成する際に便利です。
   */
  defaultTriggerId?: string | null | undefined;

  /**
   * ツールチップを無効化するかどうかです。
   *
   * @default false
   */
  disabled?: boolean | undefined | undefined;

  /**
   * アンカー要素のレイアウトシフト（位置ズレ）に対する追従を無効にするかどうかです。
   *
   * @default false
   */
  disableAnchorTracking?: boolean | undefined;

  /**
   * ツールチップの内容（ポップアップ部分）をホバーしたときに、ツールチップを閉じないようにするかどうかです。
   *
   * @default false
   */
  disableHoverablePopup?: boolean | undefined;

  /**
   * ポップアップが非表示になっている間にポータルを DOM にマウントしたままにするかどうか。
   *
   * @default false
   */
  keepMounted?: boolean | undefined;

  /**
   * ツールチップが現在開いているかどうかです。
   */
  open?: boolean | undefined;

  /**
   * 使用する CSS の `position` プロパティ（absolute または fixed）です。
   *
   * @default "absolute"
   */
  positionMethod?: "absolute" | "fixed" | undefined;

  /**
   * アンカー要素のどの側にポップアップを配置するかを指定します。
   *
   * 画面端での衝突を避けるために、自動的に変更される場合があります。
   *
   * @default "top"
   */
  side?: Side | undefined;

  /**
   * アンカーとポップアップの間の距離（ピクセル単位）です。
   *
   * アンカー要素やポジショナー要素のサイズ、配置されている側、アライメントなどの情報を読み取り、それに応じた距離を返す関数を指定することもできます。
   *
   * @default 0
   */
  sideOffset?: number | OffsetFunction | undefined;

  /**
   * アンカー要素がスクロールされて画面外に出た後も、ポップアップをビューポート内に維持するかどうかです。
   *
   * @default false
   */
  sticky?: boolean | undefined;

  /**
   * ツールチップがカーソルの動きに追従する軸を指定します。
   *
   * @default "none"
   */
  trackCursorAxis?: "none" | "x" | "y" | "both" | undefined;

  /**
   * ツールチップに関連付けられたトリガーの ID です。
   *
   * `open` プロパティと併用して、制御状態のツールチップを作成する際に便利です。非制御状態（`open` プロパティが未設定）の場合は、このプロパティを指定する必要はありません。
   */
  triggerId?: string | null | undefined;

  /**
   * ツールチップの開閉状態が変化したときに呼び出されるイベントハンドラーです。
   */
  onOpenChange?: TooltipOpenChangeHandler | undefined;

  /**
   * ツールチップの開閉に伴うアニメーションが完了した後に呼び出されるイベントハンドラーです。
   */
  onOpenChangeComplete?: TooltipOpenChangeCompleteHandler | undefined;
};

/**
 * ツールチップのコンテンツコンポーネントのプロパティー型定義です。
 */
export type TooltipContentProps =
  & Omit<SuiComponentProps<"div", TooltipContentState>, keyof SuiTooltipContentProps>
  & SuiTooltipContentProps;

/**
 * ツールチップの浮遊するコンテンツ部分を表示するコンポーネントです。
 */
export interface TooltipContent extends React.FC<TooltipContentProps> {}

/**************************************************************************************************/

/**
 * ツールチップを構成するための Trigger と Content コンポーネントを生成するカスタムフックです。
 *
 * @returns トリガーとコンテンツコンポーネントを含むタプルおよびオブジェクトを返します。
 */
export default function useTooltip():
  & readonly [
    Trigger: TooltipTrigger,
    Content: TooltipContent,
  ]
  & Readonly<{
    Trigger: TooltipTrigger;
    Content: TooltipContent;
  }>
{
  const ctx = React.use(GroupContext);
  const groupHandle = ctx?.handle;
  const aloneHandle = useSingleton(() => Tooltip.createHandle());
  const handle = groupHandle || aloneHandle;
  const Trigger = React.useCallback<TooltipTrigger>(
    function TooltipTrigger(props) {
      return <Tooltip.Trigger {...toBaseUiProps(props)} handle={handle} />;
    },
    [handle],
  );
  const Content = React.useCallback<TooltipContent>(
    function TooltipContent(props) {
      const [
        rootPropsInput,
        portalPropsInput,
        {
          collisionPadding: collisionPaddingInput,
          collisionAvoidance: collisionAvoidanceInput,
          ...otherPositionerPropsInput
        },
        {
          children,
          ...other
        },
      ] = splitProps(props, [
        [
          "open",
          "disabled",
          "triggerId",
          "actionsRef",
          "defaultOpen",
          "onOpenChange",
          "trackCursorAxis",
          "defaultTriggerId",
          "onOpenChangeComplete",
          "disableHoverablePopup",
        ],
        [
          "keepMounted",
        ],
        [
          "side",
          "align",
          "anchor",
          "sticky",
          "sideOffset",
          "alignOffset",
          "positionMethod",
          "collisionPadding",
          "collisionBoundary",
          "collisionAvoidance",
          "disableAnchorTracking",
        ],
      ]);
      const rootProps: Tooltip.Root.Props = {
        ...toBaseUiProps(rootPropsInput),
        handle,
      };
      const portalProps: Tooltip.Portal.Props = partialize(portalPropsInput);
      const positionerProps: Tooltip.Positioner.Props = {
        ...partialize({
          ...otherPositionerPropsInput,
          collisionPadding: React.useMemo(
            () => (
              typeof collisionPaddingInput === "object"
                ? partialize(collisionPaddingInput)
                : collisionPaddingInput
            ),
            [collisionPaddingInput],
          ),
          collisionAvoidance: React.useMemo(
            () => (
              typeof collisionAvoidanceInput === "object"
                ? partialize(collisionAvoidanceInput) as (
                  | Partialized<CollisionAvoidanceSideFlipMode>
                  | Partialized<CollisionAvoidanceSideShiftMode>
                )
                : collisionAvoidanceInput
            ),
            [collisionAvoidanceInput],
          ),
        }),
        sideOffset: 8,
        arrowPadding: 5,
      };
      const popupProps: Tooltip.Popup.Props = useBaseUiProps(other, {
        className: "sui_tooltip",
      });

      return (
        <Tooltip.Root {...rootProps}>
          <Tooltip.Portal {...portalProps}>
            <Tooltip.Positioner {...positionerProps}>
              <Tooltip.Popup {...popupProps}>
                <Tooltip.Arrow className="sui_tooltip_arrow" />
                {children}
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      );
    },
    [handle],
  );
  const tooltip = React.useMemo(
    () => (Object.assign([Trigger, Content] as const, {
      Trigger,
      Content,
    })),
    [
      Trigger,
      Content,
    ],
  );

  return tooltip;
}
