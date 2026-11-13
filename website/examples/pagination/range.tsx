import { Pagination } from "@suru-ui/react";
import * as React from "react";

export default function PaginationRangeExample(): React.ReactNode {
  return (
    <div
      style={{
        gap: "1.25rem",
        display: "grid",
      }}
    >
      <div
        style={{
          gap: "0.375rem",
          display: "grid",
        }}
      >
        <span
          style={{
            color: "#71717a",
            fontSize: "0.75rem",
          }}
        >
          前後 1 ページ、先頭と末尾 1 ページ
        </span>
        <Pagination totalPages={40} defaultPage={20} siblingCount={1} boundaryCount={1} />
      </div>
      <div
        style={{
          gap: "0.375rem",
          display: "grid",
        }}
      >
        <span
          style={{
            color: "#71717a",
            fontSize: "0.75rem",
          }}
        >
          前後 2 ページ、先頭と末尾 2 ページ
        </span>
        <Pagination totalPages={40} defaultPage={20} siblingCount={2} boundaryCount={2} />
      </div>
    </div>
  );
}
