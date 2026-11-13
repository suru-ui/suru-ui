import { Slider } from "@suru-ui/react";
import * as React from "react";

export default function BasicSliderExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.5rem",
        width: "20rem",
        display: "grid",
        maxWidth: "100%",
      }}
    >
      <Slider label="音量" renderValue defaultValue={40} />
      <Slider label="不透明度" renderValue={(formatted) => `${formatted[0]} %`} defaultValue={72} />
    </div>
  );
}
