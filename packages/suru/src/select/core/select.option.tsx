import { Slot } from "@suru-ui/slot";
import { useComposeRefs } from "@suru-ui/utils";
import clsx from "clsx";
import * as React from "react";
import { useScope, useSetState, useStateValueWithSelector } from "../../scope";
import { useContext } from "./select.context";
import { SelectEvent } from "./select.internal";

type OptionParams = {
  value: string | number | readonly string[];

  asChild?: boolean | undefined;
  disabled?: boolean | undefined;
  label?: string | undefined;
  selected?: boolean | undefined;
};

export type OptionProps =
  & Omit<React.ComponentProps<"button">, keyof OptionParams | "type">
  & OptionParams;

export default function SuiSelectOption(props: OptionProps): React.ReactElement {
  const scope = useScope();
  const {
    size,
    color,
    conform,
    disabled: disabledCtx,
    multiple,
    selectedContentId: selectEventId = conform.id,
  } = useContext();
  const {
    ref: userRef = null,
    value: valueProp,
    asChild,
    onClick,
    disabled = disabledCtx,
    className,
    "aria-selected": ariaSelected,
    ...otherOptionProps
  } = props;
  const Comp = asChild ? Slot : "button";
  const value = React.useMemo(
    () => typeof valueProp === "object" ? [...valueProp] : valueProp,
    [valueProp],
  );
  const compRef = React.useRef<HTMLButtonElement>(null);
  const dispatch = useSetState<SelectEvent>(scope, SelectEvent.channel(selectEventId));
  const optionId = React.useId();
  const handleClick = React.useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    e => {
      onClick?.(e);

      if (e.isDefaultPrevented()) {
        return;
      }

      dispatch(se => {
        if (se === null) {
          se = {
            type: "ON",
            pkey: "",
            index: new Set(),
            options: [],
          };
        } else {
          se = { ...se };

          if (!multiple) {
            se.index.clear();
            se.options = [];
          }
        }

        if (multiple && se.index.has(optionId)) {
          se.type = "OFF";
          se.pkey = optionId;
          se.index.delete(optionId);
          se.options = se.options.filter(opt => opt.pkey !== optionId);
        } else {
          se.type = "ON";
          se.pkey = optionId;
          se.index.add(optionId);
          se.options = se.options.concat({
            ref: compRef,
            pkey: optionId,
            value,
          });
        }

        return se;
      });
    },
    [
      value,
      onClick,
      dispatch,
      // multiple は不変
    ],
  );
  const isSelected = useStateValueWithSelector<SelectEvent, boolean>(
    scope,
    SelectEvent.channel(selectEventId),
    React.useCallback(se => !!se && se.index.has(optionId), []), // optionId は不変
  );

  return (
    <Comp
      {...otherOptionProps}
      ref={useComposeRefs(userRef, compRef)}
      type="button"
      value={value}
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        className,
        "SuiSelectOption",
        `SuiSelectOption-size-${size}`,
        `SuiSelectOption-color-${color}`,
      )}
      aria-selected={ariaSelected ?? isSelected}
    />
  );
}
