import { preview, controls } from "../../.config/storybook/preview.js";
import { FormatNumber } from "./index.js";

const LOCALES: readonly FormatNumber.Locale[] = ["ja-JP", "de-DE", "en-US"];
const STYLES: readonly FormatNumber.Style[] = ["decimal", "currency", "percent", "unit"];
const NOTATIONS: readonly FormatNumber.Notation[] = [
  "standard",
  "scientific",
  "engineering",
  "compact",
];

const meta = preview.meta({
  title: "FormatNumber",
  component: FormatNumber,
});

export default meta;

const ctrl = controls(FormatNumber, {
  unit: {
    control: "text",
  },
  style: {
    control: "select",
    options: STYLES,
  },
  value: {
    control: "number",
  },
  locales: {
    control: "select",
    options: LOCALES,
  },
  currency: {
    control: "text",
  },
  notation: {
    control: "select",
    options: NOTATIONS,
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    value: 1450.45,
    locales: "ja-JP",
  }),
});

export const Percentage = meta.story({
  name: "パーセント",
  ...ctrl({
    style: "percent",
    value: 0.145,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }),
});

export const Currency = meta.story({
  name: "通貨",
  ...ctrl({
    style: "currency",
    value: 1234.45,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <span>JPY</span>
          <FormatNumber {...props} locales="ja-JP" currency="JPY" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>EUR</span>
          <FormatNumber {...props} locales="de-DE" currency="EUR" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>USD</span>
          <FormatNumber {...props} currency="USD" />
        </div>
      </div>
    );
  },
});

export const Locales = meta.story({
  name: "ロケール",
  ...ctrl({
    value: 1450.45,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        {LOCALES.map((locales) => (
          <div key={String(locales)} className="flex flex-col items-center gap-2">
            <span>{String(locales)}</span>
            <FormatNumber {...props} locales={locales} />
          </div>
        ))}
      </div>
    );
  },
});

export const Unit = meta.story({
  name: "単位",
  ...ctrl({
    unit: "kilometer",
    style: "unit",
    value: 384.4,
  }),
});

export const Compact = meta.story({
  name: "短縮表記",
  ...ctrl({
    value: 0, // 必須だけど使わない。
    notation: "compact",
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-6">
        <div className="flex flex-col items-center gap-2">
          <span>1500000</span>
          <FormatNumber {...props} value={1500000} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span>1500000000</span>
          <FormatNumber {...props} value={1500000000} />
        </div>
      </div>
    );
  },
});
