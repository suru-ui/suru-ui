import * as theme from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../../.config/storybook/preview.js";
import { Pagination } from "./index.js";

const COLORS: readonly Pagination.Color[] = theme.COLORS;
const RADII: readonly Pagination.Radius[] = ["none", ...theme.SIZES, "full"];
const SIZES: readonly Pagination.Size[] = theme.SIZES;

const meta = preview.meta({
  title: "Pagination",
  component: Pagination,
});

export default meta;

const ctrl = controls(Pagination, {
  size: {
    control: "select",
    options: SIZES,
  },
  color: {
    control: "select",
    options: COLORS,
  },
  radius: {
    control: "select",
    options: RADII,
  },
  disabled: {
    control: "boolean",
  },
  totalPages: {
    control: "number",
  },
  defaultPage: {
    control: "number",
  },
  siblingCount: {
    control: "number",
  },
  boundaryCount: {
    control: "number",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "md",
    disabled: false,
    totalPages: 20,
    defaultPage: 5,
    siblingCount: 1,
    boundaryCount: 1,
  }),
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "md",
    disabled: false,
    totalPages: 20,
    siblingCount: 1,
    boundaryCount: 1,
  }),
  render(props) {
    const [page, setPage] = React.useState(1);
    const [reason, setReason] = React.useState<string | null>(null);

    return (
      <div className="flex flex-col gap-2">
        <Pagination
          {...props}
          page={page}
          onPageChange={(nextPage, details) => {
            setPage(nextPage);
            setReason(details.reason);
          }}
        />
        <span>
          現在のページ: {page}
          {reason !== null && ` (きっかけ: ${reason})`}
        </span>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    size: "md",
    radius: "md",
    disabled: false,
    totalPages: 20,
    defaultPage: 5,
    siblingCount: 1,
    boundaryCount: 1,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {COLORS.map((color) => (
          <div key={color} className="flex flex-col items-center gap-2">
            <span>{color}</span>
            <Pagination {...props} color={color} />
          </div>
        ))}
      </div>
    );
  },
});

export const Radii = meta.story({
  name: "角丸",
  ...ctrl({
    size: "md",
    color: "grey",
    disabled: false,
    totalPages: 20,
    defaultPage: 5,
    siblingCount: 1,
    boundaryCount: 1,
  }),
  render(props) {
    return (
      <div className="flex flex-wrap gap-3">
        {RADII.map((radius) => (
          <div key={radius} className="flex flex-col items-center gap-2">
            <span>{radius}</span>
            <Pagination {...props} radius={radius} />
          </div>
        ))}
      </div>
    );
  },
});

export const Sizes = meta.story({
  name: "大きさ",
  ...ctrl({
    color: "grey",
    radius: "md",
    disabled: false,
    totalPages: 20,
    defaultPage: 5,
    siblingCount: 1,
    boundaryCount: 1,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-3">
        {SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <span>{size}</span>
            <Pagination {...props} size={size} />
          </div>
        ))}
      </div>
    );
  },
});

export const PageRange = meta.story({
  name: "表示するページ範囲",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "md",
    disabled: false,
    totalPages: 100,
    defaultPage: 50,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <span>既定 (先頭末尾1、前後1)</span>
          <Pagination {...props} siblingCount={1} boundaryCount={1} />
        </div>
        <div className="flex flex-col gap-2">
          <span>広い範囲 (先頭末尾2、前後2)</span>
          <Pagination {...props} siblingCount={2} boundaryCount={2} />
        </div>
        <div className="flex flex-col gap-2">
          <span>省略なし (先頭末尾3、前後3)</span>
          <Pagination
            {...props}
            totalPages={10}
            defaultPage={5}
            siblingCount={3}
            boundaryCount={3}
          />
        </div>
      </div>
    );
  },
});

export const EllipsisJump = meta.story({
  name: "省略記号でページ移動",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "md",
    disabled: false,
    totalPages: 100,
    defaultPage: 50,
    siblingCount: 1,
    boundaryCount: 1,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-2">
        <Pagination {...props} />
        <span>省略記号（…）を押すと入力欄が開き、番号の入力で直接移動できます。</span>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "md",
    totalPages: 20,
    defaultPage: 5,
    siblingCount: 1,
    boundaryCount: 1,
  }),
  render(props) {
    return <Pagination {...props} disabled />;
  },
});

export const FewPages = meta.story({
  name: "ページ数が少ない場合",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "md",
    disabled: false,
    totalPages: 7,
    siblingCount: 1,
    boundaryCount: 1,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 7].map((totalPages) => (
          <div key={totalPages} className="flex flex-col gap-2">
            <span>全{totalPages}ページ</span>
            <Pagination {...props} totalPages={totalPages} defaultPage={1} />
          </div>
        ))}
      </div>
    );
  },
});

export const WithList = meta.story({
  name: "一覧との組み合わせ",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "md",
    disabled: false,
    totalPages: 10,
    siblingCount: 1,
    boundaryCount: 1,
  }),
  render(props) {
    const items = React.useMemo(
      () => Array.from({ length: 97 }, (_, index) => `項目 ${index + 1}`),
      [],
    );
    const perPage = 10;
    const totalPages = Math.ceil(items.length / perPage);
    const [page, setPage] = React.useState(1);
    const visibleItems = items.slice((page - 1) * perPage, page * perPage);

    return (
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-1">
          {visibleItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Pagination
          {...props}
          page={page}
          totalPages={totalPages}
          onPageChange={(nextPage) => setPage(nextPage)}
        />
        <span>
          {page} / {totalPages} ページ
        </span>
      </div>
    );
  },
});

export const Accessibility = meta.story({
  name: "アクセシビリティ",
  ...ctrl({
    size: "md",
    color: "grey",
    radius: "md",
    disabled: false,
    totalPages: 20,
    defaultPage: 5,
    siblingCount: 1,
    boundaryCount: 1,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-2">
        <Pagination {...props} aria-label="検索結果のページ移動" />
        <span>
          全体は nav 要素とラベルで示し、現在のページは aria-current で示します。ボタンは Tab
          で移動して Enter または Space で操作でき、省略記号の入力欄は Enter で決定して Escape
          で取り消せます。
        </span>
      </div>
    );
  },
});
