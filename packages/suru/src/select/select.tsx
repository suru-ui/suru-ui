import "./select.css";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import * as Select from "./parts";

export type Props = Omit<Select.RootProps, "asChild"> & {
  placeholder?: string | undefined;
  renderItem?: Select.RenderItem | undefined;
};

function SuiSelect(props: Props): React.ReactElement {
  const {
    children,
    renderItem,
    placeholder,
    ...otherProps
  } = props;

  return (
    <Select.Root
      {...otherProps}
      asChild={false}
    >
      <Select.Button>
        <Select.SelectedContent
          renderItem={renderItem}
          placeholder={placeholder}
        />
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
