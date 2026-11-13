import { FormatNumber } from "@suru-ui/react";
import * as React from "react";

const CURRENCY_STYLE = "currency";
const PERCENT_STYLE = "percent";
const UNIT_STYLE = "unit";

export default function FormatNumberNotationExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "0.5rem",
        display: "grid",
      }}
    >
      <p style={{ margin: 0 }}>
        短縮表記: <FormatNumber value={1_500_000} locales="ja-JP" notation="compact" />
      </p>
      <p style={{ margin: 0 }}>
        単位:{" "}
        <FormatNumber
          unit="kilometer"
          // oxlint-disable-next-line react/style-prop-object -- 数値の書式を指定する独自の style プロパティーです。
          style={UNIT_STYLE}
          value={384.4}
          locales="ja-JP"
          unitDisplay="long"
        />
      </p>
      <p style={{ margin: 0 }}>
        会計形式:{" "}
        <FormatNumber
          // oxlint-disable-next-line react/style-prop-object -- 数値の書式を指定する独自の style プロパティーです。
          style={CURRENCY_STYLE}
          value={-1234}
          locales="ja-JP"
          currency="JPY"
          currencySign="accounting"
        />
      </p>
      <p style={{ margin: 0 }}>
        符号付き:{" "}
        <FormatNumber
          // oxlint-disable-next-line react/style-prop-object -- 数値の書式を指定する独自の style プロパティーです。
          style={PERCENT_STYLE}
          value={0.42}
          locales="ja-JP"
          signDisplay="always"
          maximumFractionDigits={1}
        />
      </p>
    </div>
  );
}
