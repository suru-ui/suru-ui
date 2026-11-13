import { Pagination } from "@suru-ui/react";
import * as React from "react";

export default function BasicPaginationExample(): React.ReactNode {
  return <Pagination totalPages={18} defaultPage={7} aria-label="検索結果のページ" />;
}
