import { useComposeRefs } from "@suru-ui/utils";
import clsx from "clsx";
import * as React from "react";
import { useScope, useStateValueWithSelector } from "../../scope";
import type { Color, Sizing } from "../../theme";
import { useContext } from "./select.context";
import { type CloneableNode, SelectEvent } from "./select.internal";

export interface ItemElement extends Pick<Element, "replaceChildren"> {}

export type RenderItemProps = {
  ref: React.RefCallback<ItemElement | null>;
  value: string | number | readonly string[];
};

export interface RenderItem extends React.FC<RenderItemProps> {}

type SelectedContentParams = {
  color?: Color | undefined;
  renderItem?: RenderItem | undefined;
  placeholder?: string | undefined;
  size?: Sizing | undefined;
};

export type SelectedContentProps =
  & Omit<React.ComponentProps<"span">, keyof SelectedContentParams | "children">
  & SelectedContentParams;

export default function SuiSelectSelectedContent(props: SelectedContentProps): React.ReactElement {
  const scope = useScope();
  const context = useContext({ optional: true });
  const {
    id,
    ref: userRef = null,
    size: sizeProp,
    color: colorProp,
    className,
    renderItem = defaultRenderItem,
    placeholder,
    ...otherSelectedContentProps
  } = props;
  const size = sizeProp ?? context?.size ?? "md";
  const color = colorProp ?? context?.color ?? "blue";
  const selectEventId = context?.fieldId ?? id ?? "<invalid>";
  const compRef = React.useRef<HTMLDivElement>(null);
  const selectEvent = useStateValueWithSelector(
    scope,
    SelectEvent.channel(selectEventId),
    sliceSelectEvent,
    isSameSelectEventSlice,
  );

  if (__DEV__) {
    if (context === undefined && id === undefined) {
      console.error(
        "suru-ui(suru/select): <SelectedContent /> は <Root /> の外側にある場合、id 属性が必須です。",
      );
    }
  }

  const selectedOptions = selectEvent?.options.map(opt => (
    <Item
      key={opt.pkey}
      value={opt.value}
      Render={renderItem}
      update={opt.pkey === selectEvent.pkey}
      optionRef={opt.ref}
    />
  )) || [];

  return (
    <span
      {...otherSelectedContentProps}
      id={id}
      ref={useComposeRefs(userRef, compRef)}
      className={clsx(
        className,
        "SuiSelectSelectedContent",
        `SuiSelectSelectedContent-size-${size}`,
        `SuiSelectSelectedContent-color-${color}`,
        {
          "SuiSelectSelectedContent-noContent": selectedOptions.length === 0,
        },
      )}
    >
      {selectedOptions.length ? selectedOptions : placeholder}
    </span>
  );
}

function defaultRenderItem(props: RenderItemProps) {
  const {
    ref,
    value,
  } = props;

  return (
    <span
      ref={ref}
      data-value={value}
    />
  );
}

function Item(
  props: {
    optionRef: React.RefObject<CloneableNode | null>;
    Render: RenderItem;
    update: boolean;
    value: string | number | readonly string[];
  },
) {
  const {
    value,
    Render,
    update,
    optionRef,
  } = props;
  const src = React.useRef<ItemElement>(null);
  const ref = React.useCallback<React.RefCallback<ItemElement>>(elem => {
    src.current = elem;
  }, []);

  React.useLayoutEffect(
    () => {
      if (!update || src.current === null || optionRef.current === null) {
        return;
      }

      src.current.replaceChildren(...optionRef.current.cloneNode(true).childNodes);
    },
    [update],
  );

  return (
    <Render
      ref={ref}
      value={value}
    />
  );
}

type SelectEventSlice = null | {
  readonly pkey: string;
  readonly options: readonly SelectEvent.Option[];
};

function sliceSelectEvent(e: SelectEvent | null): SelectEventSlice {
  if (e === null) {
    return null;
  }

  return {
    pkey: e.pkey,
    options: e.options,
  };
}

function isSameSelectEventSlice(a: SelectEventSlice, b: SelectEventSlice) {
  return a === b || (a !== null && b !== null && a.pkey === b.pkey && a.options === b.options);
}
