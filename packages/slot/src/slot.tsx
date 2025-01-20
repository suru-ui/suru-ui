import { type AllProps, mergeProps, useMemoMap } from "@suru-ui/utils";
import * as React from "react";
import isSlottable, { type SlottableElement } from "./is-slottable";
import Slottable from "./slottable";

function SlotClone(props: SlotProps): React.ReactElement | null {
  const { children, ...slotProps } = props;

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

export type SlotProps = AllProps;

export default function Slot(props: SlotProps): React.ReactElement {
  const { children, ...slotProps } = props;
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

  // 子要素に Slottable がある限り、その Slottable を展開する。
  while (
    (
      slottableChildIndex = (slottableChildren = React.Children.toArray(slottable.props.children))
        .findIndex(isSlottable)
    ) !== -1
  ) {
    newChildren.push(...slottableChildren.slice(slottableChildIndex + 1));
    newChildren.unshift(...slottableChildren.slice(0, slottableChildIndex));
    slottable = slottableChildren[slottableChildIndex] as SlottableElement;
    // newChildren の slottable の場所が変更されているので、それを更新する。
    slottableIndex += slottableChildIndex;
  }

  const newElement = slottable.props.children;
  newChildren[slottableIndex] =
    !isValidElementOnly<React.PropsWithChildren<{ asChild?: unknown }>>(newElement)
      ? null // TODO(tai-kun): 警告を出す？
      : newElement.type !== Slot && !newElement.props.asChild
      ? newElement.props.children
      // Slottable の子要素が Slot の場合、Slottable の前後の要素を
      // その Slot の子要素内に展開する。
      : React.Children.toArray(newElement.props.children).find(isSlottable)
      // Slot 内にすでに Slottable がある場合、その Slottable を使う。
      ? newElement.props.children
      // Slot 内に Slottable がない場合、新たに Slottable を作成する。
      : <Slottable>{newElement.props.children}</Slottable>;

  return (
    <SlotClone {...slotProps}>
      {React.isValidElement(newElement)
        ? React.cloneElement(newElement, undefined, ...newChildren)
        : null}
    </SlotClone>
  );
}
