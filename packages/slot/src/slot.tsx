import * as React from "react";
import mergeProps, { type AllProps } from "./merge-props";
import Slottable, { type SlottableProps } from "./slottable";
import useMemoMap from "./use-memo-map";

/**
 * `Slot` コンポーネントが受け取るプロパティの型を定義します。
 * これは基本的に `AllProps` と同じで、すべての標準 HTML 属性と ref 属性を含みます。
 */
export type SlotProps = AllProps & { readonly [_ in string]?: any };

/**
 * `Slot` コンポーネントは、子要素の中に特定の「スロット」として機能する要素 (`Slottable`) を見つけ、
 * そのスロットに親のプロパティーを結合してレンダリングします。
 * これにより、親コンポーネントが子コンポーネントの内部構造を制御できるようになります。
 *
 * @param props `SlotProps` 型のプロパティ。これには `children` と、
 * スロットされる要素に渡される他のすべてのプロパティが含まれます。
 * @returns スロットされた要素を含む React 要素です。
 */
export default function Slot(props: SlotProps): React.ReactElement {
  const {
    children,
    ...slotProps
  } = props;
  const newChildren: React.ReactNode[] = React.Children.toArray(children);
  let slottableIndex = newChildren.findIndex(isSlottable);
  if (slottableIndex === -1) {
    return (
      <SlotClone {...slotProps}>
        {children}
      </SlotClone>
    );
  }

  let slottable = newChildren[slottableIndex] as SlottableElement;
  let slottableChildren: React.ReactNode[];
  let slottableChildIndex: number;
  // 子要素に `Slottable` がある限り、その `Slottable` を展開します。
  // これはネストされた `Slottable` をフラット化するためのループです。
  while (
    (
      slottableChildIndex = (slottableChildren = React.Children.toArray(slottable.props.children))
        .findIndex(isSlottable)
    ) !== -1
  ) {
    newChildren.push(...slottableChildren.slice(slottableChildIndex + 1));
    newChildren.unshift(...slottableChildren.slice(0, slottableChildIndex));
    slottable = slottableChildren[slottableChildIndex] as SlottableElement;
    // `newChildren` の `slottable` の場所が変更されているので、それを更新します。
    slottableIndex += slottableChildIndex;
  }

  const newElement = slottable.props.children;
  newChildren[slottableIndex] =
    // `newElement` が有効な React 要素ではない場合、`null` を設定します。
    !isValidElementOnly<React.PropsWithChildren<{ asChild?: unknown }>>(newElement)
      ? null // TODO(tai-kun): 警告を出す？
      : newElement.type !== Slot && !newElement.props.asChild
      ? newElement.props.children
      // `Slottable` の子要素が `Slot` `の場合、Slottable` の前後の要素をその Slot の子要素内に展開します。
      : React.Children.toArray(newElement.props.children).find(isSlottable)
      // `Slot` 内にすでに `Slottable` がある場合、その `Slottable` を使します。
      ? newElement.props.children
      // `Slot` 内に `Slottable` がない場合、新たに `Slottable` を作成します。
      : <Slottable>{newElement.props.children}</Slottable>;

  return (
    <SlotClone {...slotProps}>
      {React.isValidElement(newElement)
        ? React.cloneElement(newElement, undefined, ...newChildren)
        : null}
    </SlotClone>
  );
}

/**
 * `Slot` のプロパティをその子要素にマージしてクローンを作成するヘルパーコンポーネントです。
 * `Slot` コンポーネントが直接 `Slottable` を見つけられなかった場合や、最終的な要素をレンダリングする際に使用されます。
 *
 * @param props `SlotProps` 型のプロパティーです。これには `children` と、子要素にマージされる他のプロパティーが含まれます。
 * @returns プロパティがマージされた `React.ReactElement` または `null` です。
 */
function SlotClone(props: SlotProps): React.ReactElement | null {
  const {
    children,
    ...slotProps
  } = props;
  // `children` が有効な React 要素でない場合、エラーをスローし、`null` を返します。
  if (!React.isValidElement(children)) {
    return React.Children.only(children), null;
  }

  using cache = useMemoMap();
  const mergedProps = mergeProps(slotProps, children.props, cache);

  return React.cloneElement(children, mergedProps);
}

function isValidElementOnly<P>(children: React.ReactNode): children is React.ReactElement<P> {
  return React.isValidElement<P>(React.Children.only(children));
}

/**
 * `Slottable` コンポーネントに属する React 要素の型を定義します。
 * これは `SlottableProps` を持ち、`Slottable` コンポーネント自体を型としています。
 */
type SlottableElement = React.ReactElement<SlottableProps, typeof Slottable>;

/**
 * 与えられた React ノードが `Slottable` コンポーネントのインスタンスであるかどうかを判定します。
 * これは、`Slot` コンポーネントが子要素の中でスロットとして機能する要素を見つけるために使用されます。
 *
 * @param node 検査する React がレンダリングできる値です。
 * @returns `node` が有効な React 要素であり、その型が `Slottable` であれば `true`、そうでなければ `false` です。
 */
function isSlottable(node: React.ReactNode): node is SlottableElement {
  return React.isValidElement(node) && node.type === Slottable;
}
