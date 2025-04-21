export {};

// import { Slot } from "@suru-ui/slot";
// import clsx from "clsx";
// import * as React from "react";
// import { useContext } from "./select.context";

// type OptionGroupParams = {
//   asChild?: boolean | undefined;
// };

// export type OptionGroupProps =
//   & Omit<React.ComponentProps<"div">, keyof OptionGroupParams>
//   & OptionGroupParams;

// export default function SuiSelectOptionGroup(props: OptionGroupProps): React.ReactElement {
//   const {
//     size,
//     color,
//   } = useContext();
//   const {
//     asChild,
//     className,
//     ...otherOptionGroupProps
//   } = props;
//   const Comp = asChild ? Slot : "div";

//   return (
//     <Comp
//       {...otherOptionGroupProps}
//       className={clsx(
//         className,
//         "SuiSelectOptionGroup",
//         `SuiSelectOptionGroup-size-${size}`,
//         `SuiSelectOptionGroup-color-${color}`,
//       )}
//     />
//   );
// }
