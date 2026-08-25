import { SIZES, COLORS } from "@suru-ui/theme";
import * as React from "react";

import { preview, controls } from "../.config/storybook/preview.js";
import { Pagination } from "../src/pagination/index.js";

const RADII = ["none", ...SIZES, "full"] as const;

const meta = preview.meta({
  title: "Pagination",
  component: Pagination,
});

export default meta;

const ctrl = controls(Pagination, {
  boundaryCount: {
    control: "number",
  },
  color: {
    options: COLORS,
    control: "select",
  },
  defaultPage: {
    control: "number",
  },
  disabled: {
    control: "boolean",
  },
  radius: {
    options: RADII,
    control: "select",
  },
  siblingCount: {
    control: "number",
  },
  size: {
    options: SIZES,
    control: "select",
  },
  totalPages: {
    control: "number",
  },
});

export const Usage = meta.story({
  name: "使い方",
  ...ctrl({
    totalPages: 20,
    defaultPage: 5,
    boundaryCount: 1,
    siblingCount: 1,
    color: "grey",
    size: "md",
    radius: "md",
    disabled: false,
  }),
});

export const Controlled = meta.story({
  name: "制御",
  ...ctrl({
    totalPages: 20,
    boundaryCount: 1,
    siblingCount: 1,
    color: "grey",
    size: "md",
    radius: "md",
    disabled: false,
  }),
  render(props) {
    const [page, setPage] = React.useState(1);

    return (
      <div className="flex flex-col gap-2">
        <Pagination {...props} page={page} onPageChange={(nextPage) => setPage(nextPage)} />
        <span>現在のページ: {page}</span>
      </div>
    );
  },
});

export const Colors = meta.story({
  name: "色",
  ...ctrl({
    totalPages: 20,
    defaultPage: 5,
    size: "md",
    radius: "md",
    disabled: false,
    boundaryCount: 1,
    siblingCount: 1,
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
    totalPages: 20,
    defaultPage: 5,
    color: "grey",
    size: "md",
    disabled: false,
    boundaryCount: 1,
    siblingCount: 1,
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
    totalPages: 20,
    defaultPage: 5,
    color: "grey",
    radius: "md",
    disabled: false,
    boundaryCount: 1,
    siblingCount: 1,
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

export const EllipsisJump = meta.story({
  name: "省略記号でページ移動",
  ...ctrl({
    totalPages: 100,
    defaultPage: 50,
    color: "grey",
    size: "md",
    radius: "md",
    disabled: false,
    boundaryCount: 1,
    siblingCount: 1,
  }),
  render(props) {
    return (
      <div className="flex flex-col gap-2">
        <Pagination {...props} />
        <span>省略記号（…）をクリックすると入力欄が表示され、ページ番号で移動できます。</span>
      </div>
    );
  },
});

export const Disabled = meta.story({
  name: "無効",
  ...ctrl({
    totalPages: 20,
    defaultPage: 5,
    color: "grey",
    size: "md",
    radius: "md",
    boundaryCount: 1,
    siblingCount: 1,
  }),
  render(props) {
    return <Pagination {...props} disabled />;
  },
});
