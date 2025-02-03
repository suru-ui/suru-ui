import "./select.css";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import * as Select from "./core";

export type Props = Omit<Select.RootProps, "asChild">;

function SuiSelect(props: Props): React.ReactElement {
  const {
    children,
    ...otherProps
  } = props;

  return (
    <Select.Root
      {...otherProps}
      asChild={false}
    >
      <Select.Button>
        <Select.SelectedContent />
        <ChevronDown />
      </Select.Button>
      <Select.ListBox>
        {children}
      </Select.ListBox>
    </Select.Root>
  );
}

export type OptionProps = Select.OptionProps;

export default /* @__PURE__ */ Object.assign(SuiSelect, {
  Option: Select.Option,
});
