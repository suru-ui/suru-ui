import * as React from "react";
import { useScope, useStateValueWithSelector } from "../../scope";
import { useContext } from "./select.context";
import { SelectEvent } from "./select.internal";

export type ConformProps = {};

export default function SuiSelectConform(_: ConformProps): React.ReactElement {
  const scope = useScope();
  const {
    conform,
    multiple,
    selectedContentId: selectEventId = conform.id,
  } = useContext();
  // const ref = React.useRef<HTMLSelectElement>(null);
  const options = useStateValueWithSelector(
    scope,
    SelectEvent.channel(selectEventId),
    sliceSelectEvent,
  );

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
      multiple={multiple}
      className="SuiSelectConform"
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
