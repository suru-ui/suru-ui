import { Radio, RadioGroup } from "@suru-ui/react";
import * as React from "react";

export default function BasicRadioGroupExample(): React.ReactNode {
  return (
    <RadioGroup style={{ gap: "0.625rem" }} defaultValue="weekly" aria-label="通知の頻度">
      <label
        style={{
          gap: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Radio value="daily" />
        毎日
      </label>
      <label
        style={{
          gap: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Radio value="weekly" />
        毎週
      </label>
      <label
        style={{
          gap: "0.5rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Radio value="monthly" />
        毎月
      </label>
    </RadioGroup>
  );
}
