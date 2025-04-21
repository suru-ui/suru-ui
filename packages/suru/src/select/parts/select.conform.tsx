import clsx from "clsx";
import * as React from "react";
import classes from "../../classes";
import { SelectProps } from "../../conform";
import { useScope, useStateValueWithSelector } from "../../scope";
import { useContext } from "./select.context";
import { SelectEvent } from "./select.internal";

export type ConformProps = {};

export default function SuiSelectConform(_: ConformProps): React.ReactElement {
  const scope = useScope();
  const {
    formId,
    fieldId,
    invalid,
    disabled,
    multiple,
    required,
    fieldName,
    defaultValue,
    selectedContentId: selectEventId = fieldId,
  } = useContext();
  const conform: Required<Omit<SelectProps, `aria-${string}`>> = {
    id: fieldId,
    form: formId,
    name: fieldName,
    multiple,
    required,
    defaultValue,
  };
  const options = useStateValueWithSelector(
    scope,
    SelectEvent.channel(selectEventId),
    sliceSelectEvent,
  );

  // const ref = React.useRef<HTMLSelectElement>(null);
  // React.useEffect(
  //   () => {
  //     if (selectEvent === null || ref.current === null) {
  //       return;
  //     }

  //     const options = ref.current.getElementsByTagName("option");

  //     for (const opt of options) {
  //       opt.selected = true;
  //     }
  //   },
  //   [selectEvent],
  // );

  return (
    <select
      {...conform}
      // ref={ref}
      disabled={disabled}
      className={clsx("SuiSelectConform", {
        [classes.invalid]: invalid,
        [classes.disabled]: disabled,
        [classes.required]: required,
      })}
      aria-hidden
    >
      {options?.map(opt => <option key={opt.pkey} value={opt.value} />)}
    </select>
  );
}

function sliceSelectEvent(e: SelectEvent | null) {
  if (e === null) {
    return null;
  }

  return e.options;
}
