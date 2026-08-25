import type { IComponent } from "../types.js";
import {
  type ListRootSize,
  type ListItemProps,
  type ListRootProps,
  type ListRootState,
  type ListItemIndicatorProps,
  ListItem,
  ListRoot,
  ListItemIndicator,
} from "./list.parts.jsx";

/**
 * {@link ListRootSize} です。
 */
export type ListSize = ListRootSize;

/**
 * {@link List} の各パーツに渡すプロパティーです。
 */
export type ListPartsProps = {
  /**
   * {@link ListRoot} に渡すプロパティーです。
   */
  readonly root: ListRootProps;
};

/**
 * {@link List} の状態です。
 */
export type ListState = ListRootState;

/**
 * {@link List} コンポーネントのプロパティーです。
 */
export type ListProps = ListRootProps;

/**
 * {@link List} の各パーツに渡すプロパティーを作るフックです。
 */
export function useList(props: ListProps): ListPartsProps {
  return {
    root: props,
  };
}

interface ListComponentType extends IComponent<ListProps> {
  /**
   * {@link ListIndicator} です。
   */
  readonly Indicator: IComponent<ListItemIndicatorProps>;

  /**
   * {@link ListItem} です。
   */
  readonly Item: IComponent<ListItemProps>;
}

/**
 * 項目を一覧表示するリストコンポーネントです。
 *
 * {@link List.Item} で項目を、{@link List.Indicator} で項目の先頭に表示するマーカーやアイコンを指定します。
 */
export const List: ListComponentType = /*#__PURE__*/ Object.assign(
  function SuiList(props: ListProps) {
    const partsProps = useList(props);

    return <ListRoot {...partsProps.root} />;
  },
  {
    Item: ListItem,
    Indicator: ListItemIndicator,
  },
);

/**
 * {@link List} の状態やプロパティーをまとめた型名前空間です。
 */
export namespace List {
  /**
   * {@link ListState} です。
   */
  export type State = ListState;

  /**
   * {@link ListProps} です。
   */
  export type Props = ListProps;

  /**
   * {@link ListSize} です。
   */
  export type Size = ListSize;
}
