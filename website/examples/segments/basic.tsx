import { Segments } from "@suru-ui/react";
import * as React from "react";

const PERIODS = [
  {
    label: "日",
    value: "day",
  },
  {
    label: "週",
    value: "week",
  },
  {
    label: "月",
    value: "month",
  },
];

export default function BasicSegmentsExample(): React.ReactNode {
  return <Segments items={PERIODS} defaultValue="week" />;
}
