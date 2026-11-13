import { FormatNumber } from "@suru-ui/react";
import * as React from "react";

const CURRENCY_STYLE = "currency";
const PERCENT_STYLE = "percent";

export default function BasicFormatNumberExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.5rem",
        display: "grid",
      }}
    >
      <p style={{ margin: 0 }}>
        数量: <FormatNumber value={1450.45} locales="ja-JP" />
      </p>
      <p style={{ margin: 0 }}>
        金額:{" "}
        {/* oxlint-disable-next-line react/style-prop-object -- 数値の書式を指定する独自の style プロパティーです。 */}
        <FormatNumber style={CURRENCY_STYLE} value={1234} locales="ja-JP" currency="JPY" />
      </p>
      <p style={{ margin: 0 }}>
        達成率:{" "}
        {/* oxlint-disable-next-line react/style-prop-object -- 数値の書式を指定する独自の style プロパティーです。 */}
        <FormatNumber
          // oxlint-disable-next-line react/style-prop-object -- 数値の書式を指定する独自の style プロパティーです。
          style={PERCENT_STYLE}
          value={0.145}
          locales="ja-JP"
          minimumFractionDigits={1}
        />
      </p>
    </div>
  );
}
