import { Radio, RadioGroup } from "@suru-ui/react";
import * as React from "react";

const plans = [
  {
    label: "スタンダード",
    value: "standard",
    description: "基本的な機能をすべて利用できます。",
  },
  {
    label: "ビジネス",
    value: "business",
    description: "チームでの共有と管理機能が加わります。",
  },
  {
    label: "エンタープライズ",
    value: "enterprise",
    description: "監査や SSO などの高度な機能を利用できます。",
  },
];

export default function BasicRadioExample(): React.ReactNode {
  return (
    <RadioGroup style={{ gap: "0.75rem" }} defaultValue="standard" aria-label="料金プラン">
      {plans.map((plan) => (
        <label
          key={plan.value}
          style={{
            gap: "0.625rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Radio style={{ marginTop: "0.125rem" }} value={plan.value} />
          <span
            style={{
              gap: "0.125rem",
              display: "grid",
            }}
          >
            <span
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
              }}
            >
              {plan.label}
            </span>
            <span
              style={{
                color: "#71717a",
                fontSize: "0.8125rem",
              }}
            >
              {plan.description}
            </span>
          </span>
        </label>
      ))}
    </RadioGroup>
  );
}
