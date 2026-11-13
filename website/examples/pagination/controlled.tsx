import { Pagination } from "@suru-ui/react";
import * as React from "react";

export default function ControlledPaginationExample(): React.ReactNode {
  const [page, setPage] = React.useState(1);
  const [reason, setReason] = React.useState<string | null>(null);

  return (
    <div
      style={{
        gap: "0.75rem",
        display: "grid",
      }}
    >
      <Pagination
        page={page}
        totalPages={30}
        onPageChange={(nextPage, details) => {
          setPage(nextPage);
          setReason(details.reason);
        }}
        aria-label="検索結果のページ"
      />
      <span
        style={{
          color: "#52525b",
          fontSize: "0.875rem",
        }}
      >
        {page} ページ目
        {reason !== null && ` (移動のきっかけ: ${reason})`}
      </span>
    </div>
  );
}
